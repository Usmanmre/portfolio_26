import React, { useState } from 'react';
import { Mail, GitBranch, Users, Send, Compass, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitContactForm } from '../api/contact';

const WHATSAPP_NUMBER = '923315938459';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi Usman, I'd like to book a consultation."
)}`;

const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.742.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setErrorMessage('Please fill out all fields.');
      setStatus('error');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      await submitContactForm(formState);
      setStatus('success');
      setFormState({ name: '', email: '', message: '' });
    } catch {
      setErrorMessage('Unable to send your message right now. Please try again in a moment.');
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="contact-section">

      <div className="grid-container">
        <div className="contact-layout">
          {/* Info Side */}
          <div className="contact-info">
            <div className="badge section-badge">
              <Mail size={12} style={{ marginRight: '6px' }} />
              Start a Conversation
            </div>

            <h2 className="contact-title">Ready to launch or scale a product?</h2>
            <p className="contact-subtitle">
              Book a short consultation to discuss roadmap, cost optimization, or product-market fit. I work with founders and product teams to turn technical complexity into clear business outcomes.
            </p>

            <div className="social-links-container">
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="social-link-btn" title="WhatsApp">
                <WhatsAppIcon size={20} />
                <span>WhatsApp</span>
              </a>
              <a href="https://github.com/Usmanmre" target="_blank" rel="noreferrer" className="social-link-btn" title="GitHub">
                <GitBranch size={20} />
                <span>GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/muhammad-usman-fullstackdev/" target="_blank" rel="noreferrer" className="social-link-btn" title="LinkedIn">
                <Users size={20} />
                <span>LinkedIn</span>
              </a>
              <a href="https://www.behance.net/muhammadusman93" target="_blank" rel="noreferrer" className="social-link-btn" title="Behance">
                <Compass size={20} />
                <span>Behance</span>
              </a>
            </div>
          </div>

          
        </div>

        {/* Footer info */}
        <footer className="footer-bar">
          <div className="footer-line"></div>
          <div className="footer-content">
            <span className="footer-copy">© {new Date().getFullYear()}. All rights reserved.</span>
          </div>
        </footer>
      </div>

      <style>{`
        .contact-section {
          background: var(--bg-primary);
          position: relative;
          overflow: hidden;
          padding-bottom: 40px;
        }

        .contact-glow {
          bottom: -20px;
          right: -10px;
          background: radial-gradient(circle, var(--accent-glow) 0%, rgba(6, 6, 9, 0) 70%);
        }

        .contact-layout {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 80px;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 640px;
          width: 100%;
          margin: 0 auto;
        }

        .contact-title {
          font-size: 2.8rem;
          line-height: 1.15;
          margin-bottom: 20px;
        }

        @media (max-width: 768px) {
          .contact-title {
            font-size: 2.2rem;
          }
        }

        .contact-subtitle {
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin-bottom: 32px;
          line-height: 1.6;
        }

        .social-links-container {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          width: 100%;
          max-width: 480px;
        }

        .social-link-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--bg-card);
          border: 1px solid var(--border-card);
          border-radius: 12px;
          padding: 12px 20px;
          color: var(--text-primary);
          text-decoration: none;
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.95rem;
          transition: var(--transition-bounce);
          justify-content: center;
        }

        .social-link-btn:hover {
          transform: translateY(-3px);
          border-color: var(--accent);
          background: var(--bg-card-hover);
          color: var(--accent);
          box-shadow: 0 5px 15px var(--accent-glow);
        }

        /* Form styling */
        .contact-form-card {
          padding: 40px;
        }

        @media (max-width: 480px) {
          .contact-form-card {
            padding: 24px;
          }
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
          text-align: left;
        }

        .form-label {
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--text-primary);
        }

        .form-input {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--border-card);
          border-radius: 10px;
          padding: 14px 18px;
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 0.95rem;
          transition: var(--transition-smooth);
          outline: none;
          width: 100%;
        }

        .form-input:focus {
          border-color: var(--accent);
          background: rgba(var(--accent-rgb), 0.03);
          box-shadow: 0 0 0 4px var(--accent-glow);
        }

        .form-textarea {
          resize: vertical;
        }

        .form-feedback {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 500;
          text-align: left;
        }

        .error-feedback {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }

        .success-feedback {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
          color: #10b981;
        }

        .form-submit-btn {
          width: 100%;
          justify-content: center;
          padding: 14px 28px;
        }

        .form-submit-btn.loading {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* Footer styling */
        .footer-bar {
          margin-top: 40px;
          width: 100%;
        }

        .footer-line {
          height: 1px;
          background: var(--border-card);
          margin-bottom: 24px;
        }

        .footer-content {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          color: var(--text-muted);
          font-size: 0.85rem;
          text-align: center;
        }

        .footer-brand {
          font-family: var(--font-heading);
          font-weight: 800;
          letter-spacing: 0.05em;
          color: var(--text-secondary);
        }
      `}</style>
    </section>
  );
};
