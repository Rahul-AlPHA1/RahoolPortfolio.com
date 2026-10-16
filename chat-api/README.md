# Portfolio chat API

The portfolio is a static GitHub Pages site, so the Groq API key **must not** be shipped in the
browser bundle (anyone could copy it from DevTools). This folder is a tiny serverless proxy that
holds the key, owns the system prompt (`lib/knowledge.ts`) and streams answers back.

## Deploy on Vercel (recommended)
1. Vercel → **Add New Project** → import this repo → set **Root Directory** to `chat-api`.
2. **Environment Variables**: `GROQ_API_KEY` = your key (optional: `GROQ_MODEL`, `ALLOWED_ORIGINS`).
3. Deploy. Your endpoint is `https://<project>.vercel.app/api/chat`.
4. GitHub repo → Settings → Secrets and variables → Actions → **Variables** →
   add `CHAT_ENDPOINT` = that URL. The Pages workflow passes it to the build as `VITE_CHAT_ENDPOINT`.

## Local development
Put `GROQ_API_KEY=...` in `.env.local` at the repo root (git-ignored). `npm run dev` then serves
`/api/chat` through the same handler.

Without an endpoint the widget still works using an on-device answer engine built from
`src/data/portfolioData.ts`.

## Safeguards
Origin allow-list, per-IP rate limit, max 12 messages × 1000 chars, `max_tokens: 600`,
server-side system prompt (clients can't repurpose the key for arbitrary prompts), model fallback.
