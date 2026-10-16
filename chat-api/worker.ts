import { handleChat, ChatEnv } from "./lib/handler";

// Cloudflare Worker alternative: `npx wrangler deploy worker.ts --name rahool-chat`
// then `npx wrangler secret put GROQ_API_KEY`.
export default {
  fetch(request: Request, env: ChatEnv) {
    return handleChat(request, env);
  },
};
