import { handleChat } from "../lib/handler";

// Vercel Edge Function — deploy the `chat-api` folder as its own Vercel project
// and set GROQ_API_KEY in the project's Environment Variables.
export const config = { runtime: "edge" };

declare const process: { env: Record<string, string | undefined> };

export default function handler(request: Request) {
  return handleChat(request, {
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    GROQ_MODEL: process.env.GROQ_MODEL,
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
  });
}
