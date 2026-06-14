import React, { useState } from 'react';
import { Bot, Briefcase, Zap, Shield } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: 'saas' | 'ai-voice' | 'branding';
  description: string;
  highlight: string[];
  metrics?: string;
  details: string[];
  link?: string;
  linkText?: string;
}

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'saas' | 'ai-voice' | 'branding'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const projects: Project[] = [
      {
  id: 'nymbl',
      title: 'Nymbl — Conversational AI Healthcare Platform',
      category: 'ai-voice',
      description: 'Conversational AI platform powering chatbots and real-time voice agents for automated patient appointment scheduling.',
      highlight: ['NestJS', 'PostgreSQL', 'SIP', 'LiveKit', 'Python'],
      metrics: '99.9% Booking Accuracy',
     link: 'https://www.getnymbl.ai/',
     details: [
    'Built production-grade speech-to-text workflows integrated with LiveKit SDK and backend APIs to enable real-time, context-aware healthcare conversations.',
    'Implemented low-latency voice communication using SIP protocol and LiveKit for automated patient appointment booking across live audio streams.',
    'Designed multi-step appointment orchestration flows integrated with clinic scheduling systems and APIs.',
  ],
    },
  {
      id: 'syntera',
      title: 'Syntera Automation — Care Tracking & STT',
      category: 'saas',
      description: 'Healthcare workflow tracker enabling nursing staff to document resident care via real-time speech-to-text dictation and WebSockets.',
      highlight: ['React.js', 'NestJS', 'PostgreSQL', 'WebSockets', 'Speech-to-Text'],
      metrics: '-50% Manual Entry Time',
      link: '#syntera',
      details: [
        'Designed and shipped a speech-to-text nursing documentation system, saving care staff ~50% in daily report logging time.',
        'Implemented WebSocket channels for real-time patient status updates.',
      ]
    },
        {
      id: 'perfai',
      title: 'PerfAi — API Performance & Security Suite',
      category: 'saas',
  description: 'A production SaaS product delivering continuous API security audits, automated testing, and performance streaming to reduce incidents and cost.' ,
      highlight: ['Vue.js', 'NestJS', 'MongoDB', 'Server-Sent Events (SSE)'],
      metrics: '+20% App Performance',
      link: 'https://perfai.ai/',
      details: [
        'Owned core backend & frontend features; optimizations reduced overall application loading delay by 20%.',
        'Implemented Server-Sent Events (SSE) for concurrent data streams, reducing sync latency by ~30%.',
  'Integrated GitHub Actions, Jira, and Slack to streamline incident response and product telemetry workflows.'
      ]
    },
    {
      id: 'forenex',
      title: 'Forenex — Early Burnout & Workforce Intelligence',
      category: 'saas',
      description: 'An AI-driven SaaS visibility and performance platform that analyzes task activity and engagement signals to help team leaders optimize utilization and prevent burnout.',
  highlight: ['Next.js', 'Node.js', 'Predictive AI', 'Scalable Cloud Architectures'],
      metrics: 'Proactive Alert System',
      link: 'https://www.forenex.org/',
      details: [
        'Built a real-time SaaS platform that analyzes task activity, engagement patterns, and workload signals to surface early indicators of employee burnout.',
        'Designed task management workflows that double as passive health monitors, maintaining strict data privacy protocols.',
        'Implemented role-based access control (RBAC) and secure authentication.'
      ]
    },
    {
      id: 'return-ai',
      title: 'Return AI — E-Commerce Review Intelligence System',
      category: 'saas',
      description: 'End-to-end RAG pipeline over e-commerce product reviews, enabling semantic search and context-aware Q&A on large review datasets.',
      highlight: ['RAG Pipeline', 'Pinecone', 'OpenAI Embeddings', 'LangChain', 'Vector Database'],
      metrics: 'Semantic Review Search',
      details: [
        'Built an end-to-end RAG pipeline over e-commerce product reviews, enabling semantic search and context-aware Q&A on large review datasets. Implemented vector embeddings and similarity search using Pinecone to retrieve relevant review context before LLM generation.',
        'Designed the retrieval pipeline to reduce hallucination and ground AI responses in actual customer sentiment data.',
      ],
    },

  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="projects" className="projects-section">
      <div className="ambient-glow projects-glow"></div>

      <div className="grid-container">
        <div className="section-header">
          <div className="badge section-badge">
            <Briefcase size={12} style={{ marginRight: '6px' }} />
            Case Studies
          </div>
          <h2 className="section-title">Selected Engagements & Measured Outcomes</h2>
          <p className="section-subtitle">
            Real product problems solved: cost savings, performance gains, and measurable business impact.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="project-filters flex-center">
          {(['all', 'saas', 'ai-voice'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilter(cat);
                setExpandedId(null);
              }}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
            >
              {cat === 'all' ? 'All Case Studies' : cat === 'saas' ? 'SaaS & Ops' : 'AI & Voice'}
            </button>
          ))}
        </div>

        {/* Grid Layout */}
        <div className="projects-grid">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className={`glass-card project-card ${expandedId === p.id ? 'expanded' : ''}`}
              onClick={() => toggleExpand(p.id)}
            >
              <div className="card-top">
                <span className={`project-category-badge cat-${p.category}`}>
                  {p.category === 'saas' ? <Zap size={10} /> : p.category === 'ai-voice' ? <Bot size={10} /> : <Shield size={10} />}
                  {p.category.toUpperCase().replace('-', ' ')}
                </span>
                {p.metrics && <span className="project-metric-highlight">{p.metrics}</span>}
              </div>

              <h3 className="project-card-title">{p.title}</h3>
              <p className="project-card-desc">{p.description}</p>

              <div className="project-highlights">
                {p.highlight.map(h => (
                  <span key={h} className="proj-highlight-pill">{h}</span>
                ))}
              </div>

              {/* Expansion Details */}
              <div className="project-details-drawer">
                <div className="drawer-divider"></div>
                <h5 className="details-header">Impact & Implementation:</h5>
                <ul className="details-bullet-list">
                  {p.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>

              <div className="card-footer-action">
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <button className="expand-trigger-btn">
                    {expandedId === p.id ? 'Hide Details' : 'View Implementation Details'}
                  </button>
                  {p.link && (
                    (p.link.startsWith('http')) ? (
                      <a
                        href={p.link}
                        className="card-link-btn"
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {p.linkText || 'View'}
                      </a>
                    ) : (
                      <button
                        className="card-link-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(p.id);
                          // optional: scroll into view
                          const el = document.getElementById(p.id);
                          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }}
                      >
                        {p.linkText || 'Read Case Study'}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .projects-section {
          background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
          position: relative;
          overflow: hidden;
        }

        .section-header .section-subtitle {
          margin-bottom: 28px;
        }

        .projects-glow {
          top: 50%;
          left: -10%;
          background: radial-gradient(circle, var(--accent-glow) 0%, rgba(6, 6, 9, 0) 70%);
        }

        .project-filters {
          gap: 12px;
          margin-bottom: 48px;
          flex-wrap: wrap;
        }

        .filter-btn {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-card);
          padding: 10px 22px;
          border-radius: 12px;
          color: var(--text-secondary);
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .filter-btn:hover {
          border-color: var(--accent);
          color: var(--text-primary);
          background: var(--bg-card-hover);
        }

        .filter-btn.active {
          background: var(--accent);
          color: var(--bg-primary);
          border-color: var(--accent);
          box-shadow: 0 4px 15px var(--accent-glow-strong);
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
        }

        .project-card {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          height: 100%;
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 20px;
          align-items: center;
        }

        .project-category-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 700;
          font-family: var(--font-heading);
          letter-spacing: 0.02em;
        }

        .cat-saas {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }

        .cat-ai-voice {
          background: rgba(139, 92, 246, 0.1);
          color: #8b5cf6;
        }

        .cat-branding {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
        }

        .project-metric-highlight {
          font-family: var(--font-heading);
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--accent);
          background: var(--accent-glow-light);
          padding: 4px 10px;
          border-radius: 6px;
          border: 1px solid var(--accent-glow);
        }

        .project-card-title {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 12px;
          line-height: 1.3;
        }

        .project-card-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-bottom: 20px;
          line-height: 1.5;
        }

        .project-highlights {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 24px;
        }

        .proj-highlight-pill {
          font-size: 0.75rem;
          font-weight: 500;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-card);
          padding: 3px 8px;
          border-radius: 4px;
          color: var(--text-muted);
        }

        /* Drawer details logic */
        .project-details-drawer {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: var(--transition-smooth);
          width: 100%;
        }

        .project-card.expanded .project-details-drawer {
          max-height: 400px;
          opacity: 1;
          margin-bottom: 24px;
        }

        .drawer-divider {
          height: 1px;
          background: var(--border-card);
          margin-bottom: 16px;
          width: 100%;
        }

        .details-header {
          font-size: 0.85rem;
          text-transform: uppercase;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          margin-bottom: 10px;
        }

        .details-bullet-list {
          padding-left: 18px;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .details-bullet-list li {
          margin-bottom: 8px;
          line-height: 1.4;
        }

        .card-footer-action {
          margin-top: auto;
          width: 100%;
        }

        .expand-trigger-btn {
          background: transparent;
          border: none;
          color: var(--accent);
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: var(--transition-smooth);
        }

        .project-card:hover .expand-trigger-btn {
          text-decoration: underline;
        }

        .card-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          border-radius: 10px;
          background: var(--bg-card);
          border: 1px solid var(--border-card);
          color: var(--text-primary);
          font-weight: 600;
          text-decoration: none;
          transition: var(--transition-smooth);
        }

        .card-link-btn:hover {
          border-color: var(--accent);
          background: var(--bg-card-hover);
          color: var(--accent);
        }
      `}</style>
    </section>
  );
};
