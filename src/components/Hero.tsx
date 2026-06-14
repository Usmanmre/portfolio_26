import React, { useState, useEffect } from 'react';
import { Terminal, Cpu, ArrowUpRight, ShieldCheck, Zap } from 'lucide-react';

export const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX,
        y: e.clientY
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="hero-section flex-center">
      {/* Background glow linked to mouse movement for interactive premium feel */}
      <div
        className="hero-ambient-glow"
        style={{
          transform: `translate(${mousePos.x * 0.05}px, ${mousePos.y * 0.05}px)`
        }}
      />

      <div className="grid-container hero-container">
        <div className="hero-content">
          <div className="badge hero-badge">
            <Zap size={12} style={{ marginRight: '6px' }} />
            Full-Stack AI Engineer
          </div>

          <h1 className="hero-title">
          Building Healthcare, SaaS & AI Systems
          </h1>

          <p className="hero-subtitle">
With experience across SaaS, healthcare, AI, and real-time systems, I build products that improve operations, enhance user experiences, and create measurable business value. From architecture and APIs to frontend experiences and deployment, I take ownership of the entire product lifecycle.          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              Case Studies & Outcomes
              <ArrowUpRight size={18} />
            </a>
            <a href="#contact" className="btn btn-secondary">
              Request a Consultation
            </a>
          </div>
        </div>

        {/* Visual Dashboard Card on the right */}
        <div className="hero-visual">
          <div className="glass-card terminal-card">
              <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <div className="terminal-title">about-me.json</div>
              <Terminal size={14} className="terminal-icon" />
            </div>

            <div className="terminal-body">
  <div className="terminal-line command">
    <span className="term-prompt">$</span> GET /api/v1/about-me
  </div>

  <div className="terminal-output">
    <span className="json-brace">{'{'}</span>

    <div className="json-indent">
      <span className="json-key">"role"</span>:
      <span className="json-val">"Full-Stack AI Engineer"</span>,
      <br />

      <span className="json-key">"experience"</span>:
      <span className="json-val">"3+ Years Building SaaS & AI Systems"</span>,
      <br />

      <span className="json-key">"focus"</span>:
      <span className="json-val">"Scalable SaaS, Real-Time Apps, AI Workflows"</span>,
      <br />

      <span className="json-key">"impact"</span>:
      <span className="json-brace">{'{'}</span>

      <div className="json-indent-2">
        <span className="json-key">"documentation_time"</span>:
        <span className="json-val">"-50% via voice-first workflow"</span>,
        <br />

        <span className="json-key">"performance"</span>:
        <span className="json-val">"+20% application speed improvements"</span>,
        <br />

        <span className="json-key">"real_time_systems"</span>:
        <span className="json-val">"30% faster sync using event-driven architecture"</span>
      </div>

      <span className="json-brace">{'}'}</span>
    </div>

    <span className="json-brace">{'}'}</span>
  </div>

  <div className="terminal-line text-success">
    <Cpu size={12} className="inline-icon" /> Systems: production-grade SaaS, AI, and real-time services shipped
  </div>

  <div className="terminal-line text-success">
    <ShieldCheck size={12} className="inline-icon" /> Engineering focus: performance, scalability, and reliability
  </div>
</div>
          </div>

          {/* Floaters */}
       

          <div className="metric-floater floater-2 glass-card">
            <div className="floater-num">99.9%</div>
            <div className="floater-label">Service Reliability</div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          min-height: 100vh;
          padding-top: 140px;
          padding-bottom: 80px;
          position: relative;
          overflow: hidden;
        }

        .hero-ambient-glow {
          position: absolute;
          top: 15%;
          right: 10%;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--accent-glow) 0%, rgba(6, 6, 9, 0) 70%);
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
          transition: transform 0.2s cubic-bezier(0.1, 0.8, 0.2, 1);
        }

        .hero-container {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 60px;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        @media (max-width: 1024px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 50px;
            text-align: center;
          }
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        @media (max-width: 1024px) {
          .hero-content {
            align-items: center;
          }
        }

        .hero-badge {
          margin-bottom: 24px;
        }

        .hero-title {
          font-size: 3.5rem;
          line-height: 1.15;
          margin-bottom: 24px;
          font-weight: 800;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
        }

        .hero-subtitle {
          font-size: 1rem;
          color: var(--text-secondary);
          margin-bottom: 40px;
          max-width: 600px;
          line-height: 1.6;
        }

        .hero-actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        @media (max-width: 480px) {
          .hero-actions {
            width: 100%;
            flex-direction: column;
          }
          .hero-actions .btn {
            justify-content: center;
            width: 100%;
          }
        }

        .hero-visual {
          position: relative;
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
        }

        @media (max-width: 1024px) {
          .hero-visual {
            max-width: 450px;
            margin-top: 20px;
          }
        }

        .terminal-card {
          padding: 0;
          overflow: hidden;
          font-family: monospace;
          background: rgba(10, 10, 15, 0.8);
          border: 1px solid var(--border-card);
        }

        .terminal-header {
          background: rgba(20, 20, 30, 0.6);
          border-bottom: 1px solid var(--border-card);
          padding: 12px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .terminal-dots {
          display: flex;
          gap: 6px;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .dot-red { background: #ef4444; }
        .dot-yellow { background: #f59e0b; }
        .dot-green { background: #10b981; }

        .terminal-title {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-family: var(--font-body);
        }

        .terminal-icon {
          color: var(--text-muted);
        }

        .terminal-body {
          padding: 20px;
          font-size: 0.85rem;
          text-align: left;
          color: var(--text-secondary);
        }

        .terminal-line {
          margin-bottom: 8px;
          line-height: 1.5;
        }

        .command {
          color: var(--text-primary);
        }

        .term-prompt {
          color: var(--accent);
          font-weight: 700;
          margin-right: 8px;
        }

        .terminal-output {
          background: rgba(0, 0, 0, 0.2);
          border-left: 2px solid var(--accent);
          padding: 10px 14px;
          margin-bottom: 12px;
          border-radius: 4px;
        }

        .json-key {
          color: #93c5fd;
        }

        .json-val {
          color: #a7f3d0;
        }

        .json-brace {
          color: #fca5a5;
        }

        .json-indent {
          padding-left: 16px;
        }

        .json-indent-2 {
          padding-left: 32px;
        }

        .text-success {
          color: #10b981;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
        }

        .inline-icon {
          flex-shrink: 0;
        }

        .metric-floater {
          position: absolute;
          padding: 12px 20px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
          z-index: 10;
          width: max-content;
        }

        .floater-1 {
          bottom: -20px;
          left: -40px;
        }

        .floater-2 {
          top: -20px;
          right: -30px;
        }

        @media (max-width: 500px) {
          .floater-1 {
            left: -10px;
            bottom: -30px;
          }
          .floater-2 {
            right: -10px;
            top: -30px;
          }
        }

        .floater-num {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.3rem;
          color: var(--accent);
          line-height: 1.1;
        }

        .floater-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 500;
        }
      `}</style>
    </section>
  );
};
