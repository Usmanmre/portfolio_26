import React from 'react';
import { BookOpen, AlertTriangle, Activity, Milestone } from 'lucide-react';

export const Journey: React.FC = () => {
  const steps = [
    {
      icon: <BookOpen size={20} />,
      year: '2019 - 2023',
      title: "Engineering Foundation",
      description: "Graduated with a BS in Computer Science from Air University. Focused early on engineering craftsmanship, then translated that rigor into solving real customer problems at scale."
    },
    {
      icon: <AlertTriangle size={20} />,
      year: 'July 2023',
      title: "Production Lessons",
      description: "A turning point: a production incident revealed gaps in monitoring and load resilience, prompting a shift toward observability and customer-centered design."
    },
    {
      icon: <Activity size={20} />,
      year: 'Present',
  title: "Product-Minded Engineering",
  description: "Evolving into a Product & Engineering lead at Tekrowe Digital, shipping conversational AI platforms, real-time healthcare monitoring, and API performance suites — all designed for measurable customer impact."
    }
  ];

  return (
    <section id="journey" className="journey-section">
      <div className="ambient-glow journey-glow"></div>
      
      <div className="grid-container">
        <div className="section-header">
          <div className="badge section-badge">
            <Milestone size={12} style={{ marginRight: '6px' }} />
            Approach
          </div>
          <h2 className="section-title">From Technical Rigor to Product Predictability</h2>
          <p className="section-subtitle">
            Lessons learned shipping to customers: monitoring, observability, and designing for measurable business outcomes.
          </p>
        </div>

        <div className="journey-layout">
          {/* Timeline Block */}
          <div className="journey-timeline">
            {steps.map((step, idx) => (
              <div className="timeline-node" key={idx}>
                <div className="timeline-icon-wrapper flex-center">
                  {step.icon}
                </div>
                <div className="timeline-connector"></div>
                <div className="glass-card timeline-card-content">
                  <span className="timeline-year">{step.year}</span>
                  <h3 className="timeline-node-title">{step.title}</h3>
                  <p className="timeline-node-desc">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Narrative Dashboard Callout */}
          <div className="glass-card journey-narrative">
            <div className="narrative-quote-icon">“</div>
            <p className="narrative-text">
              Early in my career I learned the hard way that polished local builds don't guarantee production success. Shipping to customers revealed the importance of monitoring, performance, and user-centered design.
              <br /><br />
              Today I translate technical craft into product outcomes: improving uptime, reducing operating cost, and increasing user engagement. Whether architecting predictive dashboards, optimizing SaaS spend, or refining brand identity, the goal is the same: deliver measurable business value.
            </p>
            
              <div className="narrative-meta">
                <div className="meta-line"></div>
                <div className="meta-details">
                  <span className="meta-name">Product & Engineering Lead</span>
                  <span className="meta-org">Tekrowe Studio — Strategy & Delivery</span>
                </div>
              </div>
          </div>
        </div>
      </div>

      <style>{`
        .journey-section {
          background: linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
          position: relative;
          overflow: hidden;
        }

        .journey-glow {
          bottom: 10%;
          left: -10%;
          background: radial-gradient(circle, var(--accent-glow) 0%, rgba(6, 6, 9, 0) 70%);
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .section-badge {
          margin-bottom: 16px;
        }

        .section-title {
          font-size: 2.5rem;
          max-width: 800px;
          margin-bottom: 16px;
        }

        .section-subtitle {
          color: var(--text-secondary);
          max-width: 600px;
          font-size: 1.1rem;
        }

        .journey-layout {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 40px;
          align-items: start;
        }

        @media (max-width: 1024px) {
          .journey-layout {
            grid-template-columns: 1fr;
            gap: 50px;
          }
        }

        .journey-timeline {
          display: flex;
          flex-direction: column;
          gap: 32px;
          position: relative;
        }

        .timeline-node {
          display: grid;
          grid-template-columns: 50px 1fr;
          gap: 24px;
          position: relative;
        }

        .timeline-icon-wrapper {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--bg-card);
          border: 1px solid var(--border-card);
          color: var(--accent);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          z-index: 5;
          flex-shrink: 0;
          transition: var(--transition-smooth);
        }

        .timeline-node:hover .timeline-icon-wrapper {
          background: var(--accent);
          color: var(--bg-primary);
          box-shadow: 0 0 20px var(--accent);
          transform: scale(1.05);
        }

        .timeline-connector {
          position: absolute;
          left: 24px;
          top: 50px;
          bottom: -45px;
          width: 2px;
          background: linear-gradient(180deg, var(--accent) 0%, var(--border-card) 100%);
          z-index: 1;
        }

        .timeline-node:last-child .timeline-connector {
          display: none;
        }

        .timeline-card-content {
          padding: 24px;
        }

        .timeline-year {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.85rem;
          color: var(--accent);
          letter-spacing: 0.05em;
          margin-bottom: 8px;
          display: inline-block;
        }

        .timeline-node-title {
          font-size: 1.25rem;
          margin-bottom: 10px;
        }

        .timeline-node-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        .journey-narrative {
          background: rgba(16, 16, 28, 0.4);
          border: 1px solid var(--border-card);
          position: sticky;
          top: 100px;
          display: flex;
          flex-direction: column;
        }

        .narrative-quote-icon {
          font-family: 'Outfit', sans-serif;
          font-size: 5rem;
          line-height: 0.1;
          color: var(--accent);
          opacity: 0.3;
          margin-top: 10px;
          margin-bottom: -10px;
        }

        .narrative-text {
          font-style: italic;
          color: var(--text-primary);
          line-height: 1.7;
          font-size: 1.1rem;
        }

        .narrative-meta {
          margin-top: 32px;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .meta-line {
          width: 32px;
          height: 1px;
          background: var(--accent);
        }

        .meta-details {
          display: flex;
          flex-direction: column;
        }

        .meta-name {
          font-family: var(--font-heading);
          font-weight: 700;
          color: var(--text-primary);
          font-size: 0.95rem;
        }

        .meta-org {
          color: var(--text-muted);
          font-size: 0.85rem;
        }
      `}</style>
    </section>
  );
};
