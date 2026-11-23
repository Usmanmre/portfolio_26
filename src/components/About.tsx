import React, { useEffect, useRef, useState } from 'react';
import { Crosshair, Clock, Rocket, Gauge } from 'lucide-react';

const steps = ['Design', 'Code', 'Launch'];

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  // One staggered reveal when the section first scrolls into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Cursor-follow spotlight inside each card
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`about-section ${visible ? 'is-visible' : ''}`}
    >
      <div className="about-ambient-glow about-glow-a" />
      <div className="about-ambient-glow about-glow-b" />

      <div className="about-container">
        <div className="about-eyebrow">
          <span className="eyebrow-line" />
          About
        </div>

        <div className="about-top">
          <h2 className="about-title">
            Software for teams that want to grow faster and operate leaner.
          </h2>
          <p className="about-lead">
            I'm Usman. I build websites, web applications, and custom AI tools
            for modern businesses — the kind of software that captures more
            leads, streamlines operations, and eliminates repetitive manual
            work. I handle the entire project myself, so you work directly with
            one engineer who understands your goals, not a rotating cast of
            account managers.
          </p>
        </div>

        <div className="bento">
          {/* Focus */}
          <div className="bento-card card-focus" style={{ '--i': 0 } as React.CSSProperties} onMouseMove={handleMove}>
            <div className="fact-icon"><Crosshair size={18} /></div>
            <h3>Focus</h3>
            <p>High-converting websites, scalable web apps, and practical AI automation.</p>
          </div>

          {/* Experience */}
          <div className="bento-card card-exp" style={{ '--i': 1 } as React.CSSProperties} onMouseMove={handleMove}>
            <div className="fact-icon"><Clock size={18} /></div>
            <div className="exp-number">
              3.5<span>+</span>
              <small>years</small>
            </div>
            <h3>Experience</h3>
            <p>Building production software businesses rely on daily.</p>
          </div>

          {/* Approach */}
          {/* <div className="bento-card card-approach" style={{ '--i': 2 } as React.CSSProperties} onMouseMove={handleMove}>
            <div className="approach-text">
              <div className="fact-icon"><Rocket size={18} /></div>
              <h3>Approach</h3>
              <p>One person, start to finish. Design, code, and launch — no handoffs.</p>
            </div>

            <div className="pipeline" aria-hidden="true">
              <div className="pipeline-track">
                <span className="pipeline-fill" />
                <span className="pipeline-dot" />
              </div>
              <div className="pipeline-nodes">
                {steps.map((s) => (
                  <div className="pipeline-node" key={s}>
                    <span className="node-dot" />
                    <span className="node-label">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div> */}

          {/* Delivery */}
          {/* <div className="bento-card card-delivery" style={{ '--i': 3 } as React.CSSProperties} onMouseMove={handleMove}>
            <div className="fact-icon"><Gauge size={18} /></div>
            <h3>Delivery</h3>
            <p>Fast, reliable builds. No bloated agency overhead, no slow back-and-forth.</p>
          </div> */}
        </div>
      </div>

      <style>{`
        .about-section {
          padding: 120px 24px;
          display: flex;
          justify-content: center;
          background: transparent;
          position: relative;
          overflow: hidden;
        }

        .about-ambient-glow {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, var(--accent-glow) 0%, rgba(6, 6, 9, 0) 70%);
          filter: blur(90px);
          pointer-events: none;
          z-index: 0;
        }
        .about-glow-a {
          top: 8%;
          left: -10%;
          width: 460px;
          height: 460px;
          opacity: 0.5;
        }
        .about-glow-b {
          bottom: 4%;
          right: -12%;
          width: 380px;
          height: 380px;
          opacity: 0.3;
        }

        .about-container {
          max-width: 1040px;
          width: 100%;
          position: relative;
          z-index: 1;
        }

        .about-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.75rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-muted);
          font-weight: 600;
          margin-bottom: 28px;
        }
        .eyebrow-line {
          width: 28px;
          height: 1px;
          background: var(--accent);
        }

        /* ---------- Top: heading + lead ---------- */
        .about-top {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 56px;
          align-items: end;
          margin-bottom: 56px;
        }
        .about-title {
          font-family: var(--font-heading);
          font-size: clamp(2rem, 4.2vw, 3.2rem);
          line-height: 1.12;
          letter-spacing: -0.025em;
          margin: 0;
          color: var(--text-primary);
          font-weight: 700;
          text-wrap: balance;
        }
        .about-lead {
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.75;
          font-size: 1rem;
          max-width: 480px;
          padding-bottom: 6px;
        }

        /* ---------- Bento ---------- */
        .bento {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 16px;
        }
        .card-focus    { grid-column: span 7; }
        .card-exp      { grid-column: span 5; }
        .card-approach { grid-column: span 8; }
        .card-delivery { grid-column: span 4; }

        .bento-card {
          --mx: 50%;
          --my: 0%;
          position: relative;
          overflow: hidden;
          padding: 30px 28px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-card);
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        .bento-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            320px circle at var(--mx) var(--my),
            var(--accent-glow),
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
        }
        .bento-card:hover {
          border-color: var(--border-card-hover);
          background: rgba(255, 255, 255, 0.035);
        }
        .bento-card:hover::before {
          opacity: 0.55;
        }
        .bento-card > * {
          position: relative;
        }

        .fact-icon {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border-card-hover);
          border-radius: 10px;
          color: var(--accent);
          margin-bottom: 22px;
        }

        .bento-card h3 {
          margin: 0 0 8px 0;
          font-family: var(--font-heading);
          font-size: 1.05rem;
          color: var(--text-primary);
          font-weight: 700;
          letter-spacing: -0.01em;
        }
        .bento-card p {
          margin: 0;
          color: var(--text-secondary);
          line-height: 1.6;
          font-size: 0.95rem;
          max-width: 36ch;
        }

        /* Focus: larger statement */
        .card-focus {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          min-height: 230px;
        }
        .card-focus p {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          line-height: 1.35;
          letter-spacing: -0.015em;
          color: var(--text-primary);
          max-width: 24ch;
        }
        .card-focus h3 {
          font-family: inherit;
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 600;
          letter-spacing: 0.04em;
        }
        .card-focus .fact-icon { margin-bottom: auto; }

        /* Experience: the number leads */
        .card-exp {
          display: flex;
          flex-direction: column;
          min-height: 230px;
        }
        .exp-number {
          margin-top: auto;
          font-family: var(--font-heading);
          font-size: 4.2rem;
          line-height: 1;
          font-weight: 700;
          letter-spacing: -0.04em;
          color: var(--text-primary);
          display: flex;
          align-items: baseline;
          margin-bottom: 14px;
        }
        .exp-number span {
          color: var(--accent);
          margin-left: 2px;
        }
        .exp-number small {
          font-size: 0.95rem;
          font-weight: 500;
          letter-spacing: 0;
          color: var(--text-muted);
          margin-left: 10px;
        }
        .card-exp .fact-icon { margin-bottom: 0; }

        /* Approach: the memorable element */
        .card-approach {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 32px;
          align-items: center;
        }

        .pipeline {
          position: relative;
          padding: 8px 4px 0;
        }
        .pipeline-track {
          position: absolute;
          left: 14px;
          right: 14px;
          top: 15px;
          height: 1px;
          background: var(--border-card-hover);
        }
        .pipeline-fill {
          position: absolute;
          inset: 0;
          background: var(--accent);
          transform-origin: left center;
          transform: scaleX(0);
        }
        .pipeline-dot {
          position: absolute;
          top: -3px;
          left: 0;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 14px 2px var(--accent-glow), 0 0 0 3px rgba(255, 255, 255, 0.04);
          opacity: 0;
        }
        .pipeline-nodes {
          position: relative;
          display: flex;
          justify-content: space-between;
        }
        .pipeline-node {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .node-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 1px solid var(--accent);
          background: rgba(6, 6, 9, 0.9);
          display: block;
          position: relative;
          margin-top: 1px;
        }
        .node-dot::after {
          content: '';
          position: absolute;
          inset: 3px;
          border-radius: 50%;
          background: var(--accent);
        }
        .node-label {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: 0.01em;
        }

        .card-delivery {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
        .card-delivery .fact-icon { margin-bottom: auto; }

        /* ---------- Single reveal ---------- */
        .about-section .about-eyebrow,
        .about-section .about-title,
        .about-section .about-lead,
        .about-section .bento-card {
          opacity: 0;
          transform: translateY(14px);
        }
        .about-section.is-visible .about-eyebrow,
        .about-section.is-visible .about-title,
        .about-section.is-visible .about-lead,
        .about-section.is-visible .bento-card {
          opacity: 1;
          transform: none;
          transition:
            opacity 0.7s cubic-bezier(0.2, 0.7, 0.2, 1),
            transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1),
            border-color 0.3s ease,
            background 0.3s ease;
        }
        .about-section.is-visible .about-title { transition-delay: 0.08s, 0.08s, 0s, 0s; }
        .about-section.is-visible .about-lead  { transition-delay: 0.16s, 0.16s, 0s, 0s; }
        .about-section.is-visible .bento-card  {
          transition-delay: calc(0.28s + var(--i) * 0.09s), calc(0.28s + var(--i) * 0.09s), 0s, 0s;
        }

        /* Pipeline plays once after the cards land, then the dot keeps travelling */
        .about-section.is-visible .pipeline-fill {
          animation: fillLine 1.4s cubic-bezier(0.6, 0, 0.2, 1) 0.9s forwards;
        }
        .about-section.is-visible .pipeline-dot {
          animation: travel 5s cubic-bezier(0.5, 0, 0.3, 1) 2.3s infinite;
        }
        @keyframes fillLine {
          to { transform: scaleX(1); }
        }
        @keyframes travel {
          0%   { left: 0; opacity: 0; }
          8%   { opacity: 1; }
          55%  { left: calc(100% - 7px); opacity: 1; }
          65%  { left: calc(100% - 7px); opacity: 0; }
          100% { left: calc(100% - 7px); opacity: 0; }
        }

        .bento-card:focus-within {
          border-color: var(--accent);
        }

        /* ---------- Responsive ---------- */
        @media (max-width: 900px) {
          .about-top {
            grid-template-columns: 1fr;
            gap: 24px;
            margin-bottom: 44px;
          }
          .card-focus, .card-exp, .card-approach, .card-delivery {
            grid-column: span 12;
          }
          .card-focus, .card-exp { min-height: 0; }
          .card-focus .fact-icon,
          .card-delivery .fact-icon { margin-bottom: 22px; }
          .card-exp .fact-icon { margin-bottom: 22px; }
          .exp-number { margin-top: 0; }
        }

        @media (max-width: 640px) {
          .about-section { padding: 80px 18px; }
          .card-approach {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .bento-card { padding: 26px 22px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .about-section .about-eyebrow,
          .about-section .about-title,
          .about-section .about-lead,
          .about-section .bento-card {
            opacity: 1;
            transform: none;
            transition: none;
          }
          .about-section .pipeline-fill {
            animation: none;
            transform: scaleX(1);
          }
          .about-section .pipeline-dot { animation: none; opacity: 0; }
        }
      `}</style>
    </section>
  );
};