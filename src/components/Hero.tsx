import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Zap } from 'lucide-react';

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
      {/* Two layered ambient glows for more depth than a single flat blob */}
      <div
        className="hero-ambient-glow glow-primary"
        style={{
          transform: `translate(${mousePos.x * 0.05}px, ${mousePos.y * 0.05}px)`
        }}
      />
      <div
        className="hero-ambient-glow glow-secondary"
        style={{
          transform: `translate(${mousePos.x * -0.03}px, ${mousePos.y * -0.03}px)`
        }}
      />
      <div className="hero-grain" />

      <div className="grid-container hero-container">
        <div className="hero-content">
          <div className="badge hero-badge">
            <span className="live-dot" />
            Websites & AI Tools for Real Estate + SaaS

          </div>

          <h1 className="hero-title">
            Websites & AI Tools That Help You <span className="title-accent">Sell More, Faster</span>
          </h1>

          <p className="hero-subtitle">
            I build fast, reliable websites and AI-powered tools for real estate
            and SaaS companies — so you get more leads, more sign-ups, and less
            manual work. One person, start to finish: design, code, and launch.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              See Case Studies
              <ArrowUpRight size={18} />
            </a>
            <a href="#contact" className="btn btn-secondary">
              Book a Free Call
            </a>
          </div>
        </div>

        {/* Profile Image on the right */}
        <div className="hero-visual">
          <div className="profile-image-container">
            <div className="image-frame-accent" />
            <img
              src="/usman4.jpeg"
              alt="Usman - Full-Stack AI Engineer for Real Estate & SaaS"
              className="profile-image"
            />
            {/* Black overlay for cinematic, premium feel */}
            <div className="image-overlay" />
            {/* <div className="image-caption glass-card">
              <span className="caption-name">Usman</span>
              <span className="caption-role">Full-Stack Engineer</span>
            </div> */}
          </div>

          {/* Floaters */}
          <div className="metric-floater floater-1 glass-card">
            <div className="floater-num">99.9%</div>
            <div className="floater-label">Uptime, Every Launch</div>
          </div>
          <div className="metric-floater floater-2 glass-card">
            <div className="floater-num">Real Estate</div>
            <div className="floater-label">+ SaaS Focus</div>
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
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          transition: transform 0.2s cubic-bezier(0.1, 0.8, 0.2, 1);
        }

        .glow-primary {
          top: 10%;
          right: 8%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, var(--accent-glow) 0%, rgba(6, 6, 9, 0) 70%);
          filter: blur(80px);
        }

        .glow-secondary {
          bottom: 5%;
          left: 5%;
          width: 380px;
          height: 380px;
          background: radial-gradient(circle, var(--accent-glow) 0%, rgba(6, 6, 9, 0) 70%);
          filter: blur(100px);
          opacity: 0.4;
        }

        .hero-grain {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
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
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 0 0 var(--accent);
          animation: pulse-dot 2s infinite;
          flex-shrink: 0;
        }

        @keyframes pulse-dot {
          0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.25); }
          70% { box-shadow: 0 0 0 6px rgba(255, 255, 255, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
        }

        .hero-title {
          font-size: 3.5rem;
          line-height: 1.15;
          margin-bottom: 24px;
          font-weight: 800;
        }

        .title-accent {
          background: linear-gradient(100deg, var(--accent) 0%, #fff 60%, var(--accent) 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shine 6s linear infinite;
        }

        @keyframes shine {
          to { background-position: 200% center; }
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

        .profile-image-container {
          position: relative;
          width: 100%;
          max-width: 450px;
          margin: 0 auto;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          border: 1px solid var(--border-card);
          transition: box-shadow 0.4s ease, transform 0.4s ease;
          back
        }

        .profile-image-container:hover {
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.6), 0 0 0 1px var(--accent);
          transform: translateY(-4px);
        }

        .image-frame-accent {
          position: absolute;
          top: 14px;
          left: 14px;
          right: 14px;
          bottom: 14px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 14px;
          z-index: 3;
          pointer-events: none;
        }

        .profile-image {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }

        /* Black overlay: bottom-weighted gradient + full tint for a cinematic, premium look */
        .image-overlay {
          position: absolute;
          inset: 0;
          z-index: 2;
          background:
            linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.75) 100%),
            rgba(0, 0, 0, 0.18);
          pointer-events: none;
        }

        .image-caption {
          position: absolute;
          left: 20px;
          bottom: 20px;
          z-index: 4;
          padding: 10px 16px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .caption-name {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.95rem;
          color: #fff;
          line-height: 1.1;
        }

        .caption-role {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 500;
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