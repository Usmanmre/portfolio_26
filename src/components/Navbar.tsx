import { Room, RoomEvent, Track } from 'livekit-client';
import React, { useState, useEffect, useMemo, useRef } from 'react';

interface NavbarProps {
  currentTheme: string;
  setTheme: (theme: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTheme, setTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

const navItems = useMemo(() => [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Case Studies', href: '#projects' },
  { label: 'Capabilities', href: '#stack' },
  { label: 'Contact', href: '#contact' },

], []);

  const themes = useMemo(() => [
    { id: 'ultraviolet', name: 'Ultraviolet', color: '#7C3AED' },
    { id: 'electric-blue', name: 'Electric Blue', color: '#2563EB' },
    { id: 'neon-mint', name: 'Neon Mint', color: '#059669' },
  ], []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scroll spy logic
      const sections = navItems.map(item => item.href.slice(1));
      let current = 'home';
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const roomRef = useRef<Room | null>(null);

  const getLivekitToken = async () => {
    try {
      console.log('Fetching Livekit token...');
      const apiBaseUrl = import.meta.env.VITE_URL_TOKEN_ENDPOINT ?? 'http://localhost:8000';
      const response = await fetch(`${apiBaseUrl}/api/livekit/token`);
      if (!response.ok) {
        throw new Error(`Token request failed: ${response.status} ${response.statusText}`);
      }

      const { token, url, room } = await response.json();
      console.log({ room });

      const roomInstance = new Room();
      roomRef.current = roomInstance;

      // Register listeners BEFORE connecting so we never miss an early event.
      roomInstance
        .on(RoomEvent.ParticipantConnected, (participant) => {
          console.log('Agent joined:', participant.identity);
        })
        .on(RoomEvent.TrackSubscribed, (track, _publication, participant) => {
          console.log('Subscribed:', participant.identity, track.kind);
          if (track.kind === Track.Kind.Audio) {
            const audioEl = track.attach();
            audioEl.autoplay = true;
            document.body.appendChild(audioEl);
            audioEl.play().catch((err) => console.error('Play failed', err));
          }
        })
        .on(RoomEvent.LocalTrackPublished, (publication) => {
          console.log('Local track published:', publication.kind, publication.trackSid);
        });

      await roomInstance.connect(url, token);

      // setMicrophoneEnabled triggers getUserMedia + publishes the track.
      // If the token lacks canPublish, or mic permission is denied, this throws.
      await roomInstance.localParticipant.setMicrophoneEnabled(true);

      // Confirm the mic actually captured a live track and is reaching the SFU.
      const micPub = roomInstance.localParticipant.getTrackPublication(Track.Source.Microphone);
      const mediaTrack = micPub?.track?.mediaStreamTrack;
      console.log('isMicrophoneEnabled:', roomInstance.localParticipant.isMicrophoneEnabled);
      console.log('mic publication sid:', micPub?.trackSid, 'muted:', micPub?.isMuted);
      console.log(
        'mic device:', mediaTrack?.label,
        'readyState:', mediaTrack?.readyState,
        'enabled:', mediaTrack?.enabled,
      );
    } catch (err) {
      console.error('LiveKit connect/publish failed:', err);
    }
  };


  return (
    <header className={`nav-header ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo */}
        <a href="#home" className="nav-logo">
          <span className="logo-accent">&lt;</span>
          Usman
          <span className="logo-accent">/&gt;</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="nav-links-desktop">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`nav-item ${activeSection === item.href.slice(1) ? 'active' : ''}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button className="talk-agent-btn" onClick={getLivekitToken} aria-label="Talk to AI Agent">
          <span className="talk-agent-pulse" aria-hidden="true"></span>
          <svg className="talk-agent-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
          <span className="talk-agent-label">Talk to AI Agent</span>
        </button>

      </div>

      {/* Mobile Nav Overlay */}
      <div className={`mobile-nav-overlay ${isOpen ? 'show' : ''}`}>
        <nav className="mobile-nav-links">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`mobile-nav-item ${activeSection === item.href.slice(1) ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <div className="mobile-theme-section">
            <p className="mobile-theme-title">ACCENT BRANDING</p>
            <div className="mobile-themes-grid">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    setIsOpen(false);
                  }}
                  className={`mobile-theme-option ${currentTheme === t.id ? 'active' : ''}`}
                >
                  <span className="theme-color-dot" style={{ backgroundColor: t.color }}></span>
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </div>

      {/* Embedded CSS specific to Navbar Component */}
      <style>{`
        .nav-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 24px 0;
          transition: var(--transition-smooth);
          border-bottom: 1px solid transparent;
        }

        .nav-scrolled {
          padding: 16px 0;
          background: rgba(6, 6, 9, 0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-card);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-logo {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--text-primary);
          text-decoration: none;
          letter-spacing: -0.02em;
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .logo-accent {
          color: var(--accent);
          opacity: 0.85;
          font-weight: 500;
          font-family: monospace;
          transition: var(--transition-smooth);
        }

        .logo-dot {
          color: var(--accent);
          transition: var(--transition-smooth);
        }

        .nav-links-desktop {
          display: flex;
          align-items: center;
          gap: 32px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-card);
          padding: 8px 24px;
          border-radius: 30px;
          backdrop-filter: blur(8px);
        }

        @media (max-width: 768px) {
          .nav-links-desktop {
            display: none;
          }
        }

        .nav-item {
          color: var(--text-secondary);
          font-size: 0.95rem;
          font-weight: 500;
          text-decoration: none;
          transition: var(--transition-smooth);
          position: relative;
          padding: 4px 0;
        }

        .nav-item:hover, .nav-item.active {
          color: var(--text-primary);
        }

        .nav-item::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: var(--accent);
          transition: var(--transition-smooth);
          transform: translateX(-50%);
          border-radius: 4px;
        }

        .nav-item.active::after, .nav-item:hover::after {
          width: 60%;
        }

        /* Attention-grabbing "Talk to AI Agent" CTA */
        .talk-agent-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 22px;
          border: none;
          border-radius: 30px;
          background: linear-gradient(135deg, var(--accent), var(--accent-glow-strong, var(--accent)));
          color: #fff;
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 0.01em;
          cursor: pointer;
          white-space: nowrap;
          box-shadow: 0 0 0 0 var(--accent), 0 8px 24px -6px var(--accent);
          animation: talk-agent-glow 2.4s ease-in-out infinite;
          transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
        }

        .talk-agent-btn:hover {
          transform: translateY(-2px) scale(1.03);
          filter: brightness(1.08);
        }

        .talk-agent-btn:active {
          transform: translateY(0) scale(0.99);
        }

        .talk-agent-btn:focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.6), 0 8px 24px -6px var(--accent);
        }

        .talk-agent-icon {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
        }

        /* Pulsing ring that radiates outward to draw the eye */
        .talk-agent-pulse {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: var(--accent);
          z-index: -1;
          animation: talk-agent-ping 2.4s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @keyframes talk-agent-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.5), 0 8px 24px -6px var(--accent); }
          50% { box-shadow: 0 0 0 6px rgba(124, 58, 237, 0), 0 8px 28px -4px var(--accent); }
        }

        @keyframes talk-agent-ping {
          0% { transform: scale(1); opacity: 0.5; }
          70%, 100% { transform: scale(1.35); opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .talk-agent-btn { animation: none; }
          .talk-agent-pulse { animation: none; display: none; }
        }

        /* Mobile: keep the CTA prominent and never let it shrink away */
        @media (max-width: 768px) {
          .talk-agent-btn {
            padding: 10px 18px;
            font-size: 0.9rem;
          }
        }

        @media (max-width: 380px) {
          .talk-agent-btn {
            padding: 10px 16px;
          }
          .talk-agent-label {
            display: none;
          }
          .talk-agent-icon {
            width: 20px;
            height: 20px;
          }
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .theme-picker-wrapper {
          position: relative;
        }

        .theme-btn-trigger {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--bg-card);
          border: 1px solid var(--border-card);
          padding: 8px 16px;
          border-radius: 12px;
          color: var(--text-primary);
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .theme-btn-trigger:hover {
          border-color: var(--accent);
          background: var(--bg-card-hover);
        }

        @media (max-width: 480px) {
          .theme-text {
            display: none;
          }
          .theme-btn-trigger {
            padding: 8px;
            border-radius: 50%;
          }
        }

        .theme-dropdown {
          position: absolute;
          top: calc(100% + 12px);
          right: 0;
          background: var(--bg-secondary);
          border: 1px solid var(--border-card-hover);
          border-radius: 16px;
          padding: 16px;
          width: 200px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
          opacity: 0;
          visibility: hidden;
          transform: translateY(10px);
          transition: var(--transition-smooth);
          z-index: 100;
        }

        .theme-picker-wrapper:hover .theme-dropdown,
        .theme-picker-wrapper:focus-within .theme-dropdown {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .dropdown-title {
          font-family: var(--font-heading);
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 6px;
          letter-spacing: 0.05em;
        }

        .sparkle-icon {
          color: var(--accent);
        }

        .themes-grid {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .theme-option {
          display: flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 8px;
          padding: 6px 10px;
          width: 100%;
          text-align: left;
          color: var(--text-secondary);
          cursor: pointer;
          transition: var(--transition-smooth);
          font-family: var(--font-body);
          font-size: 0.85rem;
          font-weight: 500;
        }

        .theme-option:hover {
          background: var(--bg-card);
          color: var(--text-primary);
        }

        .theme-option.active {
          background: var(--accent-glow);
          border-color: var(--accent-glow-strong);
          color: var(--accent);
          font-weight: 600;
        }

        .theme-color-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
          box-shadow: 0 0 8px currentColor;
        }

        .mobile-nav-toggle {
          display: none;
          background: transparent;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          padding: 4px;
        }

        @media (max-width: 768px) {
          .mobile-nav-toggle {
            display: block;
          }
        }

        .mobile-nav-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(6, 6, 9, 0.98);
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          visibility: hidden;
          transition: var(--transition-smooth);
        }

        .mobile-nav-overlay.show {
          opacity: 1;
          visibility: visible;
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          width: 100%;
          max-width: 320px;
          padding: 24px;
        }

        .mobile-nav-item {
          color: var(--text-secondary);
          font-size: 1.5rem;
          font-family: var(--font-heading);
          font-weight: 700;
          text-decoration: none;
          transition: var(--transition-smooth);
        }

        .mobile-nav-item:hover, .mobile-nav-item.active {
          color: var(--accent);
          transform: scale(1.05);
        }

        .mobile-theme-section {
          margin-top: 40px;
          width: 100%;
          border-top: 1px solid var(--border-card);
          padding-top: 24px;
          text-align: center;
        }

        .mobile-theme-title {
          font-family: var(--font-heading);
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.1em;
          margin-bottom: 16px;
        }

        .mobile-themes-grid {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .mobile-theme-option {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--bg-card);
          border: 1px solid var(--border-card);
          color: var(--text-secondary);
          padding: 8px 16px;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .mobile-theme-option.active {
          border-color: var(--accent);
          color: var(--accent);
          background: var(--accent-glow);
        }
      `}</style>
    </header>
  );
};
