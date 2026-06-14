import React from 'react';
import { Cpu, Database, ShieldCheck, Bot, Code, Zap } from 'lucide-react';

export const BentoStack: React.FC = () => {
  const frontendSkills = ['React.js', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'JavaScript (ES6+)'];
  const backendSkills = ['Node.js', 'Express.js', 'NestJS', 'REST APIs', 'WebSockets', 'SSE'];
  const databaseSkills = ['MongoDB', 'PostgreSQL', 'Redis', 'Pinecone', 'Vector DBs'];
  const aiSkills = ['LangChain', 'OpenAI API', 'SIP', 'LiveKit', 'Speech-to-Text', 'RAG Pipelines'];

  return (
    <section id="stack" className="stack-section">
      <div className="ambient-glow stack-glow"></div>

      <div className="grid-container">
        <div className="section-header">
          <div className="badge section-badge">
            <Code size={12} style={{ marginRight: '6px' }} />
            Capabilities
          </div>
          <h2 className="section-title">How I Deliver Product & Engineering Outcomes</h2>
          <p className="section-subtitle">
            Technical capabilities mapped to business outcomes — performance, reliability, and customer experience.
          </p>
        </div>

        <div className="bento-grid">

          {/* Card 1: Main Introduction (Col: 6) */}
          <div className="glass-card bento-card col-6 bento-intro flex-center">
            <div className="intro-content">
              <Zap size={32} className="intro-icon" />
              <h3>Speed, Reliability, and Clear ROI</h3>
              <p>
                Architecture and design decisions that reduce time-to-market, lower operating costs, and increase customer retention.
              </p>
            </div>
          </div>

          {/* Card 2: Frontend Engineering (Col: 6) */}
          <div className="glass-card bento-card col-6">
            <div className="bento-card-header">
              <Cpu size={20} className="card-header-icon" />
                  <h4>Customer Experience</h4>
            </div>
                <p className="card-desc">Designing interfaces and flows that increase conversion, reduce friction, and improve retention.</p>
            <div className="skills-badge-list">
              {frontendSkills.map(s => (
                <span key={s} className="stack-skill-badge">{s}</span>
              ))}
            </div>
          </div>

          {/* Card 3: Backend & Databases (Col: 7) */}
          <div className="glass-card bento-card col-7">
            <div className="bento-card-header">
              <Database size={20} className="card-header-icon" />
              <h4>Robust Backend & Databases</h4>
            </div>
            <p className="card-desc">Architecting scalable RESTful APIs, real-time channels, and high-performance databases.</p>

            <div className="backend-console-wrapper">
              <div className="console-line">
                <span className="console-method">GET</span>
                <span className="console-path">/api/v1/metrics/load</span>
                <span className="console-status status-ok">200 OK</span>
                <span className="console-time">12ms</span>
              </div>
              <div className="console-line">
                <span className="console-method">WS</span>
                <span className="console-path">/socket.io/patient-feed</span>
                <span className="console-status status-ws">CONNECTED</span>
                <span className="console-time">Live</span>
              </div>
            </div>

            <div className="skills-badge-list">
              {[...backendSkills, ...databaseSkills].map(s => (
                <span key={s} className="stack-skill-badge skill-backend">{s}</span>
              ))}
            </div>
          </div>

          {/* Card 4: AI Tool Integration & Voice (Col: 5) */}
          <div className="glass-card bento-card col-5">
            <div className="bento-card-header">
              <Bot size={20} className="card-header-icon" />
              <h4>AI & Conversational Voice</h4>
            </div>
            <p className="card-desc">Building voice bots and chatbot automation using speech-to-text, vector search (RAG), and SIP/LiveKit channels.</p>

            <div className="ai-voice-waveform">
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
            </div>

            <div className="skills-badge-list">
              {aiSkills.map(s => (
                <span key={s} className="stack-skill-badge skill-ai">{s}</span>
              ))}
            </div>
          </div>

          {/* Card 5: SaaS Intelligence & Security (Col: 6) */}
          <div className="glass-card bento-card col-6">
            <div className="bento-card-header">
              <ShieldCheck size={20} className="card-header-icon" />
              <h4>SaaS Intelligence & Security</h4>
            </div>
            <ul className="special-list">
              <li><strong>Spend Optimization:</strong> Automatic inactive user downgrade flows.</li>
              <li><strong>API Security:</strong> Performance testing, JWT/OAuth, and RBAC authentication.</li>
              <li><strong>Real-time Streams:</strong> Server-Sent Events (SSE) reducing concurrent delays.</li>
            </ul>
          </div>


        </div>
      </div>

      <style>{`
        .stack-section {
          background: var(--bg-primary);
          position: relative;
          overflow: hidden;
        }

        .stack-glow {
          top: 30%;
          right: -10%;
          background: radial-gradient(circle, var(--accent-glow) 0%, rgba(6, 6, 9, 0) 70%);
        }

        .bento-card {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          min-height: 240px;
        }

        .col-6 {
          grid-column: span 6;
        }

        .col-7 {
          grid-column: span 7;
        }

        .col-5 {
          grid-column: span 5;
        }

        @media (max-width: 1024px) {
          .col-6, .col-7, .col-5 {
            grid-column: span 6;
          }
        }

        .bento-intro {
          background: linear-gradient(135deg, rgba(var(--accent-rgb), 0.1) 0%, rgba(16, 16, 28, 0.4) 100%);
          border-color: var(--accent-glow);
          justify-content: center;
          text-align: left;
        }

        .intro-icon {
          color: var(--accent);
          margin-bottom: 16px;
          filter: drop-shadow(0 0 10px var(--accent));
        }

        .intro-content h3 {
          font-size: 1.5rem;
          margin-bottom: 12px;
          line-height: 1.3;
        }

        .bento-card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .card-header-icon {
          color: var(--accent);
          transition: var(--transition-smooth);
        }

        .bento-card:hover .card-header-icon {
          transform: scale(1.1);
        }

        .bento-card h4 {
          font-size: 1.3rem;
          font-weight: 700;
        }

        .card-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-bottom: 24px;
        }

        .skills-badge-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: auto;
        }

        .stack-skill-badge {
          display: inline-block;
          padding: 6px 12px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-card);
          border-radius: 8px;
          transition: var(--transition-smooth);
        }

        .stack-skill-badge:hover {
          border-color: var(--accent);
          background: var(--accent-glow);
          color: var(--accent);
        }

        .skill-backend:hover {
          border-color: var(--accent);
        }

        .skill-ai:hover {
          border-color: var(--accent);
        }

        /* Backend Console Mockup */
        .backend-console-wrapper {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border-card);
          border-radius: 10px;
          padding: 12px;
          font-family: monospace;
          font-size: 0.75rem;
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .console-line {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .console-method {
          color: var(--accent);
          font-weight: 700;
        }

        .console-path {
          color: var(--text-secondary);
          flex-grow: 1;
        }

        .console-status {
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.7rem;
        }

        .status-ok {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
        }

        .status-ws {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }

        .console-time {
          color: var(--text-muted);
        }

        /* AI Voice Waveform Mockup */
        .ai-voice-waveform {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          height: 50px;
          margin-bottom: 20px;
          background: rgba(255, 255, 255, 0.01);
          border-radius: 10px;
          border: 1px dashed var(--border-card);
        }

        .wave-bar {
          width: 4px;
          height: 10px;
          background: var(--accent);
          border-radius: 2px;
          animation: wave 1.2s ease-in-out infinite alternate;
        }

        .wave-bar:nth-child(2) { height: 25px; animation-delay: 0.15s; }
        .wave-bar:nth-child(3) { height: 40px; animation-delay: 0.3s; }
        .wave-bar:nth-child(4) { height: 15px; animation-delay: 0.45s; }
        .wave-bar:nth-child(5) { height: 35px; animation-delay: 0.6s; }
        .wave-bar:nth-child(6) { height: 20px; animation-delay: 0.75s; }
        .wave-bar:nth-child(7) { height: 8px; animation-delay: 0.9s; }

        @keyframes wave {
          0% { transform: scaleY(0.4); }
          100% { transform: scaleY(1.2); }
        }

        /* Special lists */
        .special-list {
          padding-left: 18px;
          margin-top: 12px;
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        .special-list li {
          margin-bottom: 12px;
        }

        .special-list li strong {
          color: var(--text-primary);
        }

        /* Branding Demo Vector */
        .branding-sketch-demo {
          margin-top: auto;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid var(--border-card);
          border-radius: 12px;
          padding: 16px;
          height: 80px;
        }

        .branding-vector-svg {
          height: 100%;
          max-width: 160px;
        }
      `}</style>
    </section>
  );
};
