import React from 'react';

export const About: React.FC = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-card">
          <div className="about-header">
            <img
              src="/usman.jpeg"
              alt="Usman"
              className="about-avatar"
              width={72}
              height={72}
            />
            <h2 className="about-title">About Me</h2>
          </div>
          <p className="about-lead">
            I'm Usman — a product-minded designer and developer who builds calm,
            useful interfaces and thoughtful digital experiences. I focus on
            clarity, performance, and accessibility to ship high-quality work.
          </p>

        
        </div>
      </div>

      <style>{`
        .about-section {
          padding: 120px 24px;
          display: flex;
          justify-content: center;
          background: transparent;
        }

        .about-container {
          max-width: 1000px;
          width: 100%;
        }

        .about-card {
          background: linear-gradient(180deg, rgba(255,255,255,0.02), transparent);
          border: 1px solid var(--border-card);
          padding: 36px;
          border-radius: 14px;
          backdrop-filter: blur(6px);
          color: var(--text-primary);
        }

        .about-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 8px;
        }

        .about-avatar {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--border-card-hover);
          flex-shrink: 0;
        }

        .about-title {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          margin: 0;
        }

        .about-lead {
          color: var(--text-secondary);
          margin: 0 0 20px 0;
          line-height: 1.6;
        }

        .about-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 18px;
        }

        .about-grid h3 {
          margin: 0 0 6px 0;
          font-size: 0.95rem;
          color: var(--text-primary);
        }

        .about-grid p {
          margin: 0;
          color: var(--text-secondary);
          line-height: 1.5;
          font-size: 0.95rem;
        }

        @media (max-width: 640px) {
          .about-section {
            padding: 80px 18px;
          }
        }
      `}</style>
    </section>
  );
};
