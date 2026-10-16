import { Fragment, useEffect, useRef, useState } from "react";
import { MdArrowUpward, MdAutoAwesome, MdClose, MdRefresh } from "react-icons/md";
import { profile } from "../../data/portfolioData";
import { localAnswer } from "./localAnswer";
import "./ChatBot.css";

type Message = { role: "user" | "assistant"; content: string };

const ENDPOINT: string =
  import.meta.env.VITE_CHAT_ENDPOINT || (import.meta.env.DEV ? "/api/chat" : "");
const STORAGE_KEY = "rg-chat-v1";

const GREETING: Message = {
  role: "assistant",
  content: `Hi! I'm Rahool's AI assistant 👋\nAsk me anything about his experience, AI work, projects or availability — I'll answer straight from his profile.`,
};

const SUGGESTIONS = [
  "Why should we hire Rahool?",
  "What's his AI / LLM experience?",
  "Summarize his work experience",
  "What's his notice period?",
  "Full-time or contract?",
  "Open to relocation or remote?",
  "What's his tech stack?",
  "How can I contact him?",
];

const loadHistory = (): Message[] => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as Message[]) : null;
    return Array.isArray(parsed) && parsed.length ? parsed : [GREETING];
  } catch {
    return [GREETING];
  }
};

// Minimal, safe markdown: **bold**, "- " bullets, links. Renders as React nodes (no innerHTML).
const renderInline = (text: string) =>
  text.split(/(\*\*[^*]+\*\*|https?:\/\/[^\s)]+|[\w.+-]+@[\w-]+\.[\w.]+)/g).map((part, i) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (/^https?:\/\//.test(part))
      return (
        <a key={i} href={part} target="_blank" rel="noreferrer">
          {part.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
        </a>
      );
    if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(part))
      return (
        <a key={i} href={`mailto:${part}`}>
          {part}
        </a>
      );
    return <Fragment key={i}>{part}</Fragment>;
  });

const RichText = ({ text }: { text: string }) => {
  const blocks: JSX.Element[] = [];
  let bullets: string[] = [];
  const flush = () => {
    if (!bullets.length) return;
    blocks.push(
      <ul key={`ul-${blocks.length}`}>
        {bullets.map((b, i) => (
          <li key={i}>{renderInline(b)}</li>
        ))}
      </ul>
    );
    bullets = [];
  };
  text.split("\n").forEach((line, i) => {
    const bullet = line.match(/^\s*[-*•]\s+(.*)/);
    if (bullet) {
      bullets.push(bullet[1]);
      return;
    }
    flush();
    if (line.trim()) blocks.push(<p key={`p-${i}`}>{renderInline(line)}</p>);
  });
  flush();
  return <>{blocks}</>;
};

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(loadHistory);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-20)));
    } catch {
      /* storage unavailable */
    }
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 250);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const typeOut = async (text: string) => {
    // Streams the local answer word-by-word so it feels like the live model.
    const words = text.split(/(\s+)/);
    let acc = "";
    for (const w of words) {
      acc += w;
      setMessages((m) => [...m.slice(0, -1), { role: "assistant", content: acc }]);
      await new Promise((r) => setTimeout(r, 14));
    }
  };

  const ask = async (question: string) => {
    const q = question.trim();
    if (!q || busy) return;
    setInput("");
    setBusy(true);
    const history = [...messages, { role: "user" as const, content: q }];
    setMessages([...history, { role: "assistant", content: "" }]);

    const payload = history.filter((m) => m !== GREETING && m.content !== GREETING.content).slice(-10);

    try {
      if (!ENDPOINT) throw new Error("no endpoint");
      abortRef.current = new AbortController();
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payload }),
        signal: abortRef.current.signal,
      });
      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => [...m.slice(0, -1), { role: "assistant", content: acc }]);
      }
      if (!acc.trim()) throw new Error("empty");
    } catch (err) {
      if ((err as Error).name !== "AbortError") await typeOut(localAnswer(q));
    } finally {
      abortRef.current = null;
      setBusy(false);
    }
  };

  const reset = () => {
    abortRef.current?.abort();
    setBusy(false);
    setMessages([GREETING]);
  };

  const onlyGreeting = messages.length === 1;

  return (
    <>
      <button
        type="button"
        className={`chat-launcher ${open ? "is-open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="rg-chat-panel"
        data-cursor="disable"
      >
        <span className="chat-launcher-icon">{open ? <MdClose /> : <MdAutoAwesome />}</span>
        <span className="chat-launcher-text">
          <b>Ask my AI</b>
          <small>Recruiter Q&amp;A</small>
        </span>
      </button>

      <section
        id="rg-chat-panel"
        className={`chat-panel ${open ? "is-open" : ""}`}
        role="dialog"
        aria-label="Chat with Rahool's AI assistant"
        aria-hidden={!open}
        onWheel={(e) => e.stopPropagation()}
      >
        <header className="chat-head">
          <div className="chat-avatar">
            <img src={`${import.meta.env.BASE_URL}images/rahool-profile.jpg`} alt="" />
            <span>
              <MdAutoAwesome />
            </span>
            <i />
          </div>
          <div className="chat-title">
            <b>Rahool's AI Assistant</b>
            <small>Answers from his résumé · usually instant</small>
          </div>
          <button type="button" onClick={reset} aria-label="Start a new conversation" title="New chat" tabIndex={open ? 0 : -1}>
            <MdRefresh />
          </button>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" tabIndex={open ? 0 : -1}>
            <MdClose />
          </button>
        </header>

        <div className="chat-list" ref={listRef} aria-live="polite">
          {messages.map((m, i) => (
            <div className={`chat-msg chat-${m.role}`} key={i}>
              {m.content ? (
                <RichText text={m.content} />
              ) : (
                <span className="chat-typing" aria-label="Assistant is typing">
                  <i />
                  <i />
                  <i />
                </span>
              )}
            </div>
          ))}
          {onlyGreeting && (
            <div className="chat-suggestions">
              {SUGGESTIONS.map((s) => (
                <button type="button" key={s} onClick={() => ask(s)} tabIndex={open ? 0 : -1}>
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        <form
          className="chat-input"
          onSubmit={(e) => {
            e.preventDefault();
            ask(input);
          }}
        >
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            maxLength={600}
            placeholder="Ask about Rahool's experience…"
            aria-label="Your question"
            tabIndex={open ? 0 : -1}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                ask(input);
              }
            }}
          />
          <button type="submit" disabled={busy || !input.trim()} aria-label="Send" tabIndex={open ? 0 : -1}>
            <MdArrowUpward />
          </button>
        </form>
        <p className="chat-foot">
          AI can make mistakes — confirm details with{" "}
          <a href={`mailto:${profile.email}`} tabIndex={open ? 0 : -1}>
            Rahool
          </a>
          .
        </p>
      </section>
    </>
  );
};

export default ChatBot;
