import React from 'react';
import { Building2, Rocket, Clock, ShieldCheck } from 'lucide-react';

const facts = [
  {
    icon: Building2,
    title: 'Focus',
    body: 'Websites, apps, and AI tools for real estate and SaaS companies — nothing else.'
  },
  {
    icon: Clock,
    title: 'Experience',
    body: '3+ years building production software people actually rely on.'
  },
  {
    icon: Rocket,
    title: 'Approach',
    body: 'One person, start to finish. Design, code, and launch — no handoffs.'
  },
  {
    icon: ShieldCheck,
    title: 'Delivery',
    body: 'Fast, reliable builds. No bloated team, no slow back-and-forth.'
  }
];

export const About: React.FC = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-ambient-glow" />

      <div className="about-container">
        <div className="about-eyebrow">
          <span className="eyebrow-line" />
          About
        </div>

        <div className="about-top">
          <div >
            {/* <img
              src="/usman.jpeg"
              alt="Usman"
              className="about-avatar"
            />
            <div className="about-avatar-overlay" /> */}
          </div>

          <div className="about-copy">
            <h2 className="about-title">
              Software for people who sell property and build products.
            </h2>
            <p className="about-lead">
              I'm Usman. I build websites, apps, and AI tools for real estate
              and SaaS companies — the kind of software that brings in more
              leads, closes more deals, and cuts down on manual work. I handle
              the whole project myself, so you work with one person who
              actually knows your product, not a rotating cast of people.
            </p>
          </div>
        </div>

        <div className="about-grid">
          {facts.map((fact) => {
            const Icon = fact.icon;
            return (
              <div className="fact-card" key={fact.title}>
                <div className="fact-icon">
                  <Icon size={18} />
                </div>
                <h3>{fact.title}</h3>
                <p>{fact.body}</p>
              </div>
            );
          })}
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
          top: 20%;
          left: -10%;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--accent-glow) 0%, rgba(6, 6, 9, 0) 70%);
          filter: blur(90px);
          opacity: 0.5;
          pointer-events: none;
          z-index: 0;
        }

        .about-container {
          max-width: 1000px;
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

        .about-top {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 44px;
          align-items: center;
          padding-bottom: 48px;
          border-bottom: 1px solid var(--border-card);
          margin-bottom: 40px;
        }

        .about-avatar-frame {
          position: relative;
          width: 200px;
          height: 200px;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--border-card);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
          flex-shrink: 0;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .about-avatar-frame:hover {
          transform: translateY(-4px);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.55), 0 0 0 1px var(--accent);
        }

        .about-avatar {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .about-avatar-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          pointer-events: none;
        }

        .about-title {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          line-height: 1.3;
          margin: 0 0 16px 0;
          color: var(--text-primary);
          font-weight: 700;
        }

        .about-lead {
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.7;
          font-size: 1rem;
          max-width: 560px;
        }

        .about-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1px;
          background: var(--border-card);
          border: 1px solid var(--border-card);
          border-radius: 14px;
          overflow: hidden;
        }

        .fact-card {
          background: rgba(255, 255, 255, 0.02);
          padding: 28px 24px;
          transition: background 0.3s ease;
        }

        .fact-card:hover {
          background: rgba(255, 255, 255, 0.045);
        }

        .fact-icon {
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border-card-hover);
          border-radius: 8px;
          color: var(--accent);
          margin-bottom: 14px;
        }

        .about-grid h3 {
          margin: 0 0 8px 0;
          font-size: 0.95rem;
          color: var(--text-primary);
          font-weight: 700;
        }

        .about-grid p {
          margin: 0;
          color: var(--text-secondary);
          line-height: 1.55;
          font-size: 0.9rem;
        }

        @media (max-width: 640px) {
          .about-section {
            padding: 80px 18px;
          }

          .about-top {
            grid-template-columns: 1fr;
            text-align: center;
            justify-items: center;
          }

          .about-lead {
            max-width: 100%;
          }
        }
      `}</style>
    </section>
  );
};