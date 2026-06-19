import React, { useState, useRef, useEffect } from "react";

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
  // Prefer a Vite env var, fall back to current origin
  const baseUrl = (import.meta.env.VITE_LOCAL_HOST_URL as string) || window.location.origin;
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const sendMessage = async (text?: string) => {
    const query = (text ?? input).trim();
    if (!query || loading) return;

  const userId = idRef.current++;
  setMessages((m) => [...m, { id: userId, role: "user", text: query }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        `${baseUrl}/api/query?query=${encodeURIComponent(query)}`
      );

      if (!res.ok) {
        const text = await res.text().catch(() => '');
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

        // decode this chunk and append directly to the bot message in state
        const chunk = decoder.decode(value, { stream: true });
        setMessages((m) =>
          m.map((msg) => (msg.id === botId ? { ...msg, text: msg.text + chunk } : msg))
        );
      }

      // Flush any remaining bytes
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

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          position: "fixed",
          right: 24,
          bottom: 24,
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: "#111",
          color: "#fff",
          border: "none",
          fontSize: 22,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          transition: "transform 0.15s",
        }}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? "✕" : "💬"}
      </button>

      {/* Panel */}
      {open && (
        <div
          style={{
            position: "fixed",
            right: 24,
            bottom: 88,
            width: 360,
            height: 520,
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            border: "1px solid #e5e5e5",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 9999,
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "14px 16px",
              borderBottom: "1px solid #f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "#f4f4f4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                }}
              >
                🤖
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>Resume Assistant</div>
                <div style={{ fontSize: 12, color: "#888" }}>Ask me about Usman</div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 18,
                color: "#888",
                padding: 4,
                lineHeight: 1,
              }}
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div
            ref={bodyRef}
            style={{
              flex: 1,
              padding: 16,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {messages.length === 0 && (
              <div style={{ margin: "auto", textAlign: "center" }}>
                <p style={{ fontSize: 13, color: "#888", marginBottom: 14 }}>
                  Ask me anything about Usman's experience, skills, or projects.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      style={{
                        background: "#f7f7f7",
                        border: "1px solid #e8e8e8",
                        borderRadius: 8,
                        padding: "8px 12px",
                        fontSize: 13,
                        cursor: "pointer",
                        textAlign: "left",
                        color: "#111",
                      }}
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
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "flex-end",
                  flexDirection: m.role === "user" ? "row-reverse" : "row",
                }}
              >
                {m.role === "bot" && (
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      background: "#f4f4f4",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      flexShrink: 0,
                    }}
                  >
                    🤖
                  </div>
                )}
                <div
                  style={{
                    maxWidth: "78%",
                    padding: "9px 13px",
                    borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    fontSize: 14,
                    lineHeight: 1.55,
                    background: m.role === "user" ? "#111" : "#f4f4f4",
                    color: m.role === "user" ? "#fff" : "#111",
                  }}
                >
                  {m.text}
                  {/* Blinking cursor on the last streaming bot message */}
                  {streaming && m.role === "bot" && (
                    <span
                      style={{
                        display: "inline-block",
                        width: 2,
                        height: 14,
                        background: "#888",
                        marginLeft: 2,
                        verticalAlign: "middle",
                        animation: "blink 0.7s step-end infinite",
                      }}
                    />
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator — shows before first chunk arrives */}
            {loading && (
              <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
                <div
                  style={{
                    width: 26, height: 26, borderRadius: "50%",
                    background: "#f4f4f4", display: "flex",
                    alignItems: "center", justifyContent: "center", fontSize: 13,
                  }}
                >
                  🤖
                </div>
                <div
                  style={{
                    padding: "10px 14px", borderRadius: "16px 16px 16px 4px",
                    background: "#f4f4f4", display: "flex", gap: 4, alignItems: "center",
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      style={{
                        width: 5, height: 5, borderRadius: "50%", background: "#bbb",
                        display: "inline-block",
                        animation: `blink 1.2s ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            style={{
              padding: "10px 12px",
              borderTop: "1px solid #f0f0f0",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              placeholder="Ask about Usman…"
              disabled={loading || streaming}
              style={{
                flex: 1,
                border: "1px solid #e5e5e5",
                borderRadius: 20,
                padding: "8px 14px",
                fontSize: 14,
                outline: "none",
                background: "#f7f7f7",
              }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || streaming || !input.trim()}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "#111",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                opacity: loading || streaming || !input.trim() ? 0.35 : 1,
              }}
              aria-label="Send"
            >
              ↑
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 0.2; }
          40% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};