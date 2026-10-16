import { defineConfig, loadEnv, type Connect, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

declare const process: {
  env: Record<string, string | undefined>;
  cwd: () => string;
};

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const githubPagesBase = `/${repoName ?? "RahoolPortfolio.com"}/`;
const base =
  process.env.VITE_SITE_BASE ??
  (process.env.GITHUB_ACTIONS === "true" ? githubPagesBase : "/");

const readBody = (req: Connect.IncomingMessage) =>
  new Promise<string>((resolve, reject) => {
    let data = "";
    req.on("data", (chunk: string) => (data += chunk));
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });

// Serves /api/chat during `npm run dev` with the same handler the serverless proxy uses,
// reading GROQ_API_KEY from .env.local so the key never reaches the browser bundle.
const devChatApi = (env: Record<string, string>): Plugin => ({
  name: "dev-chat-api",
  apply: "serve",
  configureServer(server) {
    server.middlewares.use("/api/chat", async (req, res) => {
      const { handleChat } = await server.ssrLoadModule("/chat-api/lib/handler.ts");
      const body = req.method === "POST" ? await readBody(req) : undefined;
      const headers = new Headers();
      Object.entries(req.headers).forEach(([k, v]) => typeof v === "string" && headers.set(k, v));
      const response: Response = await handleChat(
        new Request(`http://localhost${req.url ?? ""}`, { method: req.method, headers, body }),
        { GROQ_API_KEY: env.GROQ_API_KEY, GROQ_MODEL: env.GROQ_MODEL, ALLOWED_ORIGINS: "*" }
      );
      res.statusCode = response.status;
      response.headers.forEach((value, key) => res.setHeader(key, value));
      if (response.body) {
        const reader = response.body.getReader();
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          res.write(value);
        }
      }
      res.end();
    });
  },
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base,
    plugins: [react(), devChatApi(env)],
  };
});
