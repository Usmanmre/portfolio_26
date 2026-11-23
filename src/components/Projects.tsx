import React, { useState } from 'react';
import { Bot, Zap, Shield, ChevronDown, ArrowUpRight } from 'lucide-react';

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

const categoryMeta = {
  'saas': { label: 'SaaS Product', icon: Zap, className: 'cat-saas' },
  'ai-voice': { label: 'AI / Voice', icon: Bot, className: 'cat-ai-voice' },
  'branding': { label: 'Branding', icon: Shield, className: 'cat-branding' },
  // 'real-estate': { label: 'Real Estate', icon: Building2, className: 'cat-real-estate' },
} as const;

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'saas' | 'ai-voice' | 'real-estate'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const projects: Project[] = [
    // {
    //   id: 'real-estate-chatbot',
    //   title: 'Forenex Real Estate — AI Chatbot for Listings',
    //   category: 'real-estate',
    //   description: 'An AI chatbot for real estate websites that answers buyer questions, qualifies leads, and books viewings — around the clock, no agent required.',
    //   highlight: ['React.js', 'Node.js', 'OpenAI', 'Embeddings', 'Real-Time Chat'],
    //   metrics: '24/7 Lead Capture',
    //   link: 'https://real-estate.forenex.org/',
    //   details: [
    //     'Built a chatbot that understands questions about specific listings — price, location, features — and answers instantly instead of making buyers wait for an agent.',
    //     'Set up lead qualification inside the chat, so agents only get pinged for buyers who are actually ready to move forward.',
    //     'Connected the bot to booking so a serious buyer can schedule a viewing without leaving the conversation.',
    //   ],
    // },
    {
      id: 'nymbl',
      title: 'Nymbl — AI Voice Agent for Patient Booking',
      category: 'ai-voice',
      description: 'An AI voice agent that answers calls and books patient appointments for healthcare clinics — no receptionist needed.',
      highlight: ['NestJS', 'PostgreSQL', 'SIP', 'LiveKit', 'Python'],
      metrics: '99.9% Booking Accuracy',
      link: 'https://www.getnymbl.ai/',
      details: [
        'Built real-time speech-to-text voice conversations using LiveKit, so the agent understands and responds during live calls.',
        'Set up SIP-based calling so the agent can answer real phone lines with low delay.',
        'Connected the agent directly to clinic scheduling systems, so bookings land straight on the calendar.',
      ],
    },
    {
      id: 'syntera',
      title: 'Syntera — Voice-to-Text Care Documentation',
      category: 'saas',
      description: 'Lets nursing staff dictate patient notes out loud instead of typing them, cutting documentation time roughly in half.',
      highlight: ['React.js', 'NestJS', 'PostgreSQL', 'WebSockets', 'Speech-to-Text'],
      metrics: '-50% Manual Entry Time',
      link: '#syntera',
      details: [
        'Built a speech-to-text system for nursing documentation, cutting daily reporting time by about 50%.',
        'Added live WebSocket updates so patient status changes show up instantly for the whole care team.',
      ],
    },
    {
      id: 'perfai',
      title: 'PerfAi — API Security & Performance Monitoring',
      category: 'saas',
      description: 'A SaaS product that watches your APIs around the clock, catching security issues and slowdowns before customers notice.',
      highlight: ['Vue.js', 'NestJS', 'MongoDB', 'Server-Sent Events (SSE)'],
      metrics: '+20% App Performance',
      link: 'https://perfai.ai/',
      details: [
        'Owned core backend and frontend features; my optimizations cut overall app load time by 20%.',
        'Built live data streaming with Server-Sent Events, reducing sync delay by roughly 30%.',
        'Connected GitHub Actions, Jira, and Slack so incidents get flagged and routed automatically.',
      ],
    },
    {
      id: 'forenex',
      title: 'Forenex — Early Burnout Detection for Teams',
      category: 'saas',
      description: 'AI-driven SaaS platform that reads task activity and engagement patterns to flag burnout risk before it costs you a team member.',
      highlight: ['Next.js', 'Node.js', 'Predictive AI', 'Scalable Cloud Architectures'],
      metrics: 'Proactive Alert System',
      // link: 'https://www.forenex.org/',
      details: [
        'Built a real-time platform that reads task activity, engagement, and workload signals to catch early burnout warning signs.',
        'Designed everyday task workflows to double as passive wellbeing monitors, with strict data privacy built in.',
        'Added role-based access control and secure authentication throughout.',
      ],
    },
    {
      id: 'return-ai',
      title: 'Return AI — Ask Questions About Your Reviews',
      category: 'saas',
      description: 'Lets e-commerce teams ask plain-English questions about thousands of customer reviews and get grounded, accurate answers back.',
      highlight: ['RAG Pipeline', 'Pinecone', 'OpenAI Embeddings', 'LangChain', 'Vector Database'],
      metrics: 'Semantic Review Search',
      details: [
        'Built a retrieval pipeline over large review datasets so the AI can search reviews by meaning, not just keywords.',
        'Used Pinecone vector search to pull the most relevant reviews before generating an answer, keeping responses grounded in real customer feedback.',
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
          <div className="section-eyebrow">
            <span className="eyebrow-line" />
            Selected Work
          </div>
          <h2 className="section-title">What I've built — and what it delivered</h2>
          <p className="section-subtitle">
            Five production systems across healthcare, SaaS, and AI. Each one shipped
            to fix a real problem, not just to look good in a portfolio.
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
              {cat === 'all' ? 'All Projects' : cat === 'saas' ? 'SaaS Products' : 'AI & Voice'}
            </button>
          ))}
        </div>

        {/* Grid Layout */}
        <div className="projects-grid">
          {filteredProjects.map((p) => {
            const meta = categoryMeta[p.category];
            const Icon = meta.icon;
            const isExpanded = expandedId === p.id;

            return (
              <div
                key={p.id}
                className={`glass-card project-card ${isExpanded ? 'expanded' : ''}`}
                onClick={() => toggleExpand(p.id)}
              >
                <div className="card-top">
                  <span className={`project-category-badge ${meta.className}`}>
                    <Icon size={10} />
                    {meta.label}
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
                  <h5 className="details-header">How it works</h5>
                  <ul className="details-bullet-list">
                    {p.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>

                <div className="card-footer-action">
                  <div className="card-footer-row">
                    <button className="expand-trigger-btn">
                      {isExpanded ? 'Hide details' : 'How it works'}
                      <ChevronDown size={14} className={`expand-chevron ${isExpanded ? 'rotated' : ''}`} />
                    </button>
                    {p.link && p.link.startsWith('http') && (
                      <a
                        href={p.link}
                        className="card-link-btn"
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {p.linkText || 'View live'}
                        <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
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

        .section-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.75rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-muted);
          font-weight: 600;
          margin-bottom: 16px;
        }

        .eyebrow-line {
          width: 28px;
          height: 1px;
          background: var(--accent);
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
          transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
        }

        .project-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
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

        .cat-real-estate {
          background: var(--accent-glow-light);
          color: var(--accent);
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

        .card-footer-row {
          display: flex;
          gap: 12px;
          align-items: center;
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

        .expand-chevron {
          transition: transform 0.3s ease;
        }

        .expand-chevron.rotated {
          transform: rotate(180deg);
        }

        .project-card:hover .expand-trigger-btn {
          text-decoration: underline;
        }

        .card-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
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