import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, Sparkles } from "lucide-react";

type Msg = {
  id: number;
  role: "user" | "bot";
  text: string;
};

const SUGGESTIONS = [
  "How many years of experience does Usman have?",
  "Is Usman good at building voice agents?",
  "What are Usman's strongest skills?",
];

export const ChatWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idRef = useRef<number>(1);

useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  
  const sendMessage = async (text?: string) => {
     const sessionId = localStorage.getItem("session_id");
    const query = (text ?? input).trim();
    if (!query || loading) return;

    const userId = idRef.current++;
    setMessages((m) => [...m, { id: userId, role: "user", text: query }]);
    setInput("");
    setLoading(true);

    try {


     const res = await fetch(`api/query`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    sessionId,
    query,
  }),
});

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `Request failed with status ${res.status}`);
      }

      if (!res.body) throw new Error("No stream");

      setLoading(false);
      setStreaming(true);

      const botId = idRef.current++;
      setMessages((m) => [...m, { id: botId, role: "bot", text: "" }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        setMessages((m) =>
          m.map((msg) => (msg.id === botId ? { ...msg, text: msg.text + chunk } : msg))
        );
      }

      const finalChunk = decoder.decode();
      if (finalChunk) {
        setMessages((m) =>
          m.map((msg) => (msg.id === botId ? { ...msg, text: msg.text + finalChunk } : msg))
        );
      }
    } catch (err) {
      setLoading(false);
      setMessages((m) => [
        ...m,
        {
          id: Date.now() + 1,
          role: "bot",
          text: "Something went wrong. Try again in a moment.",
        },
      ]);
      console.error(err);
    } finally {
      setLoading(false);
      setStreaming(false);
      inputRef.current?.focus();
    }
  };

  const isLastBotMessage = (id: number) => {
    const botMessages = messages.filter((m) => m.role === "bot");
    return botMessages[botMessages.length - 1]?.id === id;
  };

  // Reset conversation state when closing the widget
  const resetConversation = () => {
    setMessages([]);
    setInput("");
    setLoading(false);
    setStreaming(false);
    idRef.current = 1;
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  };

  const closeWidget = () => {
    setOpen(false);
    resetConversation();
  };

  const toggleWidget = () => {
    if (open) closeWidget();
    else setOpen(true);
  };

  return (
    <div className="chat-widget">
      {/* Floating toggle */}
      <button
        className={`chat-fab ${open ? "chat-fab--open" : ""}`}
        onClick={toggleWidget}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        <span className="chat-fab__glow" aria-hidden="true" />
        <span className="chat-fab__icon">
          {open ? <X size={22} strokeWidth={2.5} /> : <MessageCircle size={24} strokeWidth={2} />}
        </span>
      </button>

      {/* Animated label to attract attention when closed */}
      {!open && (
        <div className="chat-fab-label" aria-hidden="true">
          <span className="chat-fab-label__bubble">Find answers fast</span>
          <span className="chat-fab-label__ping" />
        </div>
      )}

      {/* Panel */}
      {open && (
        <div className="chat-panel" role="dialog" aria-label="Resume Assistant">
          <div className="chat-panel__ambient" aria-hidden="true" />

          {/* Header */}
          <header className="chat-header">
            <div className="chat-header__identity">
              <div className="chat-avatar">
                <Bot size={16} strokeWidth={2.5} />
                <span className="chat-avatar__status" aria-hidden="true" />
              </div>
              <div>
                <div className="chat-header__title">Resume Assistant</div>
                <div className="chat-header__subtitle">
                  <Sparkles size={10} />
                  Ask me about Usman
                </div>
              </div>
            </div>
            <button
              className="chat-header__close"
              onClick={closeWidget}
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </header>

          {/* Body */}
          <div className="chat-body" ref={bodyRef}>
            {messages.length === 0 && (
              <div className="chat-empty">
                <div className="chat-empty__icon">
                  <Sparkles size={20} />
                </div>
                <p className="chat-empty__text">
                  Ask me anything about Usman's experience, skills, or projects.
                </p>
                <div className="chat-suggestions">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      className="chat-suggestion"
                      onClick={() => sendMessage(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m) => (
              <div
                key={m.id}
                className={`chat-row ${m.role === "user" ? "chat-row--user" : "chat-row--bot"}`}
              >
                {m.role === "bot" && (
                  <div className="chat-avatar chat-avatar--sm">
                    <Bot size={13} strokeWidth={2.5} />
                  </div>
                )}
                <div className={`chat-bubble chat-bubble--${m.role}`}>
                  {m.text}
                  {streaming && m.role === "bot" && isLastBotMessage(m.id) && (
                    <span className="chat-cursor" aria-hidden="true" />
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="chat-row chat-row--bot">
                <div className="chat-avatar chat-avatar--sm">
                  <Bot size={13} strokeWidth={2.5} />
                </div>
                <div className="chat-bubble chat-bubble--bot chat-bubble--typing">
                  <span className="chat-dot" />
                  <span className="chat-dot" />
                  <span className="chat-dot" />
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <footer className="chat-footer">
            <div className="chat-input-wrap">
              <input
                ref={inputRef}
                className="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                placeholder="Ask about Usman…"
                disabled={loading || streaming}
              />
              <button
                className="chat-send"
                onClick={() => sendMessage()}
                disabled={loading || streaming || !input.trim()}
                aria-label="Send"
              >
                <Send size={16} strokeWidth={2.5} />
              </button>
            </div>
            <p className="chat-footer__hint">Powered by AI · Responses may vary</p>
          </footer>
        </div>
      )}

      <style>{`
        .chat-widget {
          font-family: var(--font-body, 'Inter', system-ui, sans-serif);
          -webkit-font-smoothing: antialiased;
        }

        /* ── FAB ── */
        .chat-fab {
          position: fixed;
          right: 24px;
          bottom: 24px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: 1px solid rgba(var(--accent-rgb), 0.35);
          background: var(--bg-secondary, #0c0c14);
          color: var(--accent);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          transition: var(--transition-bounce, all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275));
          box-shadow:
            0 4px 24px rgba(0, 0, 0, 0.5),
            0 0 0 0 var(--accent-glow-strong);
        }

        .chat-fab:hover {
          transform: translateY(-3px) scale(1.05);
          border-color: var(--accent);
          box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.6),
            0 0 30px var(--accent-glow-strong);
        }

        .chat-fab--open {
          background: var(--bg-card, rgba(16, 16, 28, 0.6));
          color: var(--text-secondary, #94a3b8);
          border-color: var(--border-card-hover, rgba(255, 255, 255, 0.12));
        }

        .chat-fab--open:hover {
          color: var(--text-primary, #f8fafc);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
        }

        .chat-fab__glow {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--accent-glow-strong) 0%, transparent 70%);
          opacity: 0.6;
          animation: chat-pulse 3s ease-in-out infinite;
          pointer-events: none;
        }

        .chat-fab--open .chat-fab__glow {
          display: none;
        }

        .chat-fab__icon {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* floating label above the FAB */
        .chat-fab-label {
          position: fixed;
          right: 24px; /* align with FAB */
          bottom: 92px; /* sit above the FAB */
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          z-index: 9998;
          pointer-events: none;
        }

        .chat-fab-label__bubble {
          background: linear-gradient(90deg, rgba(var(--accent-rgb), 0.12), rgba(255,255,255,0.02));
          color: var(--text-primary, #f8fafc);
          padding: 8px 12px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 600;
          box-shadow: 0 6px 18px rgba(0,0,0,0.45);
          transform-origin: bottom center;
          animation: label-pop 2.6s ease-in-out infinite;
          pointer-events: auto;
        }

        .chat-fab-label__ping {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 12px var(--accent-glow-strong);
          animation: ping 1.8s infinite ease-in-out;
        }

        @keyframes ping {
          0% { transform: scale(0.9); opacity: 0.95; }
          50% { transform: scale(1.25); opacity: 0.55; }
          100% { transform: scale(0.9); opacity: 0.95; }
        }

        @keyframes label-pop {
          0% { transform: translateY(8px) scale(0.98); opacity: 0; }
          8% { transform: translateY(0) scale(1.02); opacity: 1; }
          30% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }

        /* ── Panel ── */
        .chat-panel {
          position: fixed;
          right: 24px;
          bottom: 92px;
          width: 380px;
          max-width: calc(100vw - 32px);
          height: 540px;
          max-height: calc(100vh - 120px);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 9999;
          border-radius: 20px;
          border: 1px solid var(--border-card, rgba(255, 255, 255, 0.05));
          background: var(--bg-card, rgba(16, 16, 28, 0.85));
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow:
            0 24px 80px rgba(0, 0, 0, 0.65),
            0 0 0 1px rgba(255, 255, 255, 0.03) inset,
            0 1px 0 rgba(255, 255, 255, 0.06) inset;
          animation: chat-slide-up 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .chat-panel__ambient {
          position: absolute;
          top: -60px;
          right: -40px;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        /* ── Header ── */
        .chat-header {
          position: relative;
          z-index: 1;
          padding: 16px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-card, rgba(255, 255, 255, 0.05));
          background: rgba(0, 0, 0, 0.2);
        }

        .chat-header__identity {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .chat-header__title {
          font-family: var(--font-heading, 'Outfit', sans-serif);
          font-size: 15px;
          font-weight: 600;
          color: var(--text-primary, #f8fafc);
          letter-spacing: -0.01em;
        }

        .chat-header__subtitle {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          color: var(--text-muted, #64748b);
          margin-top: 2px;
        }

        .chat-header__subtitle svg {
          color: var(--accent);
        }

        .chat-header__close {
          background: transparent;
          border: 1px solid transparent;
          border-radius: 10px;
          cursor: pointer;
          color: var(--text-muted, #64748b);
          padding: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-smooth, all 0.3s ease);
        }

        .chat-header__close:hover {
          color: var(--text-primary, #f8fafc);
          background: rgba(255, 255, 255, 0.05);
          border-color: var(--border-card, rgba(255, 255, 255, 0.05));
        }

        /* ── Avatar ── */
        .chat-avatar {
          position: relative;
          width: 36px;
          height: 36px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(var(--accent-rgb), 0.2), rgba(var(--accent-rgb), 0.05));
          border: 1px solid rgba(var(--accent-rgb), 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
          flex-shrink: 0;
        }

        .chat-avatar--sm {
          width: 28px;
          height: 28px;
          border-radius: 9px;
        }

        .chat-avatar__status {
          position: absolute;
          bottom: -1px;
          right: -1px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #10b981;
          border: 2px solid var(--bg-secondary, #0c0c14);
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.5);
        }

        /* ── Body ── */
        .chat-body {
          position: relative;
          z-index: 1;
          flex: 1;
          padding: 18px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
          scrollbar-width: thin;
          scrollbar-color: rgba(var(--accent-rgb), 0.3) transparent;
        }

        .chat-body::-webkit-scrollbar {
          width: 5px;
        }

        .chat-body::-webkit-scrollbar-thumb {
          background: rgba(var(--accent-rgb), 0.25);
          border-radius: 4px;
        }

        /* ── Empty state ── */
        .chat-empty {
          margin: auto;
          text-align: center;
          padding: 12px 8px;
        }

        .chat-empty__icon {
          width: 48px;
          height: 48px;
          margin: 0 auto 14px;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(var(--accent-rgb), 0.15), rgba(var(--accent-rgb), 0.03));
          border: 1px solid rgba(var(--accent-rgb), 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
        }

        .chat-empty__text {
          font-size: 13px;
          color: var(--text-secondary, #94a3b8);
          line-height: 1.6;
          margin-bottom: 18px;
        }

        .chat-suggestions {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .chat-suggestion {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-card, rgba(255, 255, 255, 0.05));
          border-radius: 12px;
          padding: 10px 14px;
          font-size: 13px;
          cursor: pointer;
          text-align: left;
          color: var(--text-primary, #f8fafc);
          font-family: inherit;
          transition: var(--transition-smooth, all 0.3s ease);
          line-height: 1.45;
        }

        .chat-suggestion:hover {
          background: rgba(var(--accent-rgb), 0.08);
          border-color: rgba(var(--accent-rgb), 0.3);
          transform: translateX(3px);
          box-shadow: 0 4px 16px var(--accent-glow);
        }

        /* ── Messages ── */
        .chat-row {
          display: flex;
          gap: 8px;
          align-items: flex-end;
        }

        .chat-row--user {
          flex-direction: row-reverse;
        }

        .chat-bubble {
          max-width: 80%;
          padding: 10px 14px;
          font-size: 14px;
          line-height: 1.55;
          word-break: break-word;
        }

        .chat-bubble--user {
          border-radius: 16px 16px 4px 16px;
          background: linear-gradient(135deg, var(--accent), rgba(var(--accent-rgb), 0.75));
          color: var(--bg-primary, #060609);
          font-weight: 500;
          box-shadow: 0 4px 16px var(--accent-glow-strong);
        }

        .chat-bubble--bot {
          border-radius: 16px 16px 16px 4px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-card, rgba(255, 255, 255, 0.05));
          color: var(--text-primary, #f8fafc);
        }

        .chat-bubble--typing {
          display: flex;
          gap: 5px;
          align-items: center;
          padding: 14px 18px;
        }

        .chat-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          opacity: 0.4;
          animation: chat-bounce 1.4s ease-in-out infinite;
        }

        .chat-dot:nth-child(2) { animation-delay: 0.15s; }
        .chat-dot:nth-child(3) { animation-delay: 0.3s; }

        .chat-cursor {
          display: inline-block;
          width: 2px;
          height: 14px;
          background: var(--accent);
          margin-left: 2px;
          vertical-align: middle;
          animation: chat-blink 0.7s step-end infinite;
        }

        /* ── Footer ── */
        .chat-footer {
          position: relative;
          z-index: 1;
          padding: 12px 14px 14px;
          border-top: 1px solid var(--border-card, rgba(255, 255, 255, 0.05));
          background: rgba(0, 0, 0, 0.25);
        }

        .chat-input-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-card, rgba(255, 255, 255, 0.05));
          border-radius: 14px;
          padding: 4px 4px 4px 14px;
          transition: var(--transition-smooth, all 0.3s ease);
        }

        .chat-input-wrap:focus-within {
          border-color: rgba(var(--accent-rgb), 0.4);
          box-shadow: 0 0 0 3px var(--accent-glow);
          background: rgba(255, 255, 255, 0.06);
        }

        .chat-input {
          flex: 1;
          border: none;
          background: transparent;
          font-size: 14px;
          color: var(--text-primary, #f8fafc);
          outline: none;
          font-family: inherit;
          padding: 8px 0;
        }

        .chat-input::placeholder {
          color: var(--text-muted, #64748b);
        }

        .chat-input:disabled {
          opacity: 0.5;
        }

        .chat-send {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: var(--accent);
          color: var(--bg-primary, #060609);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: var(--transition-bounce, all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275));
          box-shadow: 0 2px 12px var(--accent-glow-strong);
        }

        .chat-send:hover:not(:disabled) {
          transform: scale(1.08);
          box-shadow: 0 4px 20px var(--accent-glow-strong);
        }

        .chat-send:disabled {
          opacity: 0.3;
          cursor: not-allowed;
          box-shadow: none;
        }

        .chat-footer__hint {
          font-size: 10px;
          color: var(--text-muted, #64748b);
          text-align: center;
          margin-top: 8px;
          letter-spacing: 0.02em;
        }

        /* ── Animations ── */
        @keyframes chat-slide-up {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes chat-pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.15); }
        }

        @keyframes chat-blink {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }

        @keyframes chat-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }

        @media (max-width: 420px) {
          .chat-fab {
            right: 16px;
            bottom: 16px;
            width: 52px;
            height: 52px;
          }

          .chat-panel {
            right: 16px;
            bottom: 80px;
            width: calc(100vw - 32px);
            height: calc(100vh - 100px);
          }
          /* hide the label on small screens to keep only the FAB visible */
          .chat-fab-label {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};
