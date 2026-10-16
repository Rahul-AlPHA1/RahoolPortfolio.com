import { SYSTEM_PROMPT } from "./knowledge";

// Web-standard (Request → Response) handler so the same code runs on Vercel Edge,
// Cloudflare Workers and the local Vite dev server.

export type ChatEnv = {
  GROQ_API_KEY?: string;
  GROQ_MODEL?: string;
  ALLOWED_ORIGINS?: string; // comma separated, "*" allows any
};

type ChatMessage = { role: "user" | "assistant"; content: string };

const DEFAULT_ORIGINS = [
  "https://rahul-alpha1.github.io",
  "http://localhost:5179",
  "http://localhost:5173",
  "http://localhost:4173",
];

// Tried in order; a decommissioned model falls through to the next one.
const FALLBACK_MODELS = ["llama-3.3-70b-versatile", "openai/gpt-oss-120b", "llama-3.1-8b-instant"];

const MAX_MESSAGES = 12;
const MAX_CHARS = 1000;
const RATE_LIMIT = 20; // requests per IP per window (best effort, per instance)
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, { count: number; reset: number }>();

const corsHeaders = (origin: string | null, env: ChatEnv) => {
  const allowed = env.ALLOWED_ORIGINS
    ? env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
    : DEFAULT_ORIGINS;
  const ok = allowed.includes("*") || (origin !== null && allowed.includes(origin));
  return {
    ok,
    headers: {
      "Access-Control-Allow-Origin": ok && origin ? origin : allowed[0],
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
      Vary: "Origin",
    },
  };
};

const json = (status: number, body: unknown, headers: Record<string, string>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...headers, "Content-Type": "application/json" },
  });

const rateLimited = (ip: string) => {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
};

const sanitize = (raw: unknown): ChatMessage[] | null => {
  if (!Array.isArray(raw) || raw.length === 0) return null;
  const messages = raw
    .slice(-MAX_MESSAGES)
    .filter(
      (m): m is ChatMessage =>
        !!m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));
  if (!messages.length || messages[messages.length - 1].role !== "user") return null;
  return messages;
};

// Turns Groq's SSE stream into a plain-text stream of tokens.
const toTextStream = (body: ReadableStream<Uint8Array>) => {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";
  return body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        buffer += decoder.decode(chunk, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          const data = line.replace(/^data:\s*/, "").trim();
          if (!data || data === "[DONE]" || !line.startsWith("data:")) continue;
          try {
            const token = JSON.parse(data).choices?.[0]?.delta?.content;
            if (token) controller.enqueue(encoder.encode(token));
          } catch {
            /* ignore keep-alive / partial frames */
          }
        }
      },
    })
  );
};

export async function handleChat(request: Request, env: ChatEnv): Promise<Response> {
  const origin = request.headers.get("Origin");
  const cors = corsHeaders(origin, env);

  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors.headers });
  if (request.method !== "POST") return json(405, { error: "Method not allowed" }, cors.headers);
  if (origin && !cors.ok) return json(403, { error: "Origin not allowed" }, cors.headers);
  if (!env.GROQ_API_KEY) return json(503, { error: "Assistant is not configured" }, cors.headers);

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("cf-connecting-ip") ||
    "anon";
  if (rateLimited(ip)) return json(429, { error: "Too many questions — try again in a few minutes." }, cors.headers);

  let payload: { messages?: unknown };
  try {
    payload = await request.json();
  } catch {
    return json(400, { error: "Invalid JSON" }, cors.headers);
  }
  const messages = sanitize(payload.messages);
  if (!messages) return json(400, { error: "Invalid messages" }, cors.headers);

  const models = env.GROQ_MODEL ? [env.GROQ_MODEL, ...FALLBACK_MODELS] : FALLBACK_MODELS;

  for (const model of models) {
    const upstream = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        stream: true,
        temperature: 0.4,
        max_tokens: 600,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      }),
    });

    if (upstream.ok && upstream.body) {
      return new Response(toTextStream(upstream.body), {
        status: 200,
        headers: {
          ...cors.headers,
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store",
          "X-Model": model,
        },
      });
    }

    // Only fall through to the next model when this one is unavailable.
    if (upstream.status !== 404 && upstream.status !== 400) {
      const status = upstream.status === 429 ? 429 : 502;
      return json(status, { error: "The assistant is busy right now." }, cors.headers);
    }
  }

  return json(502, { error: "No model available" }, cors.headers);
}
