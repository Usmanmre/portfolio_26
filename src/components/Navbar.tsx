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

  // New states for managing call/connection statuses
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  const roomRef = useRef<Room | null>(null);
const timerRef = useRef<number | null>(null);

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

  // Manage timer duration once connected
// Manage timer duration once connected
useEffect(() => {
  if (isConnected) {
    // Start interval immediately and ensure the initial state aligns
    timerRef.current = window.setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
  }

  // Cleanup clears interval and resets duration cleanly when disconnected
  return () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setCallDuration(0); // Safe to reset state on cleanup/unmount
  };
}, [isConnected]);

  // Helper to format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getLivekitToken = async () => {
    if (isLoading || isConnected) return;
    setIsLoading(true);

    try {
      console.log('Fetching Livekit token...');
      const apiBaseUrl = import.meta.env.VITE_URL_TOKEN_ENDPOINT ?? 'http://localhost:8000';
      const response = await fetch(`${apiBaseUrl}/api/livekit/token`);
      if (!response.ok) {
        throw new Error(`Token request failed: ${response.status} ${response.statusText}`);
      }

      const { token, url } = await response.json();

      const roomInstance = new Room();
      roomRef.current = roomInstance;

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
        })
        .on(RoomEvent.Disconnected, () => {
          setIsConnected(false);
          setIsLoading(false);
        });

      await roomInstance.connect(url, token);
      await roomInstance.localParticipant.setMicrophoneEnabled(true);

      setIsConnected(true);
    } catch (err) {
      console.error('LiveKit connect/publish failed:', err);
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  const endCall = async () => {
    if (roomRef.current) {
      await roomRef.current.disconnect();
    }
    setIsConnected(false);
    setIsLoading(false);
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

        {/* Action button status configuration */}
        <div className="agent-status-container">
          {isConnected ? (
            <div className="active-call-badge">
              <span className="live-dot"></span>
              <span className="call-timer">{formatTime(callDuration)}</span>
              <button className="end-call-btn" onClick={endCall} aria-label="End Call">
                End
              </button>
            </div>
          ) : (
            <button 
              className={`talk-agent-btn ${isLoading ? 'loading' : ''}`} 
              onClick={getLivekitToken} 
              disabled={isLoading}
              aria-label="Talk to AI Agent"
            >
              {!isLoading && <span className="talk-agent-pulse" aria-hidden="true"></span>}
              {isLoading ? (
                <span className="loading-spinner"></span>
              ) : (
                <svg className="talk-agent-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
              )}
              <span className="talk-agent-label">
                {isLoading ? 'Connecting...' : 'Talk to AI Agent'}
              </span>
            </button>
          )}
        </div>

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
        /* ... keeping all previous styles identical ... */
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

        .talk-agent-btn.loading {
          animation: none;
          opacity: 0.85;
          cursor: not-allowed;
        }

        .talk-agent-btn:not(.loading):hover {
          transform: translateY(-2px) scale(1.03);
          filter: brightness(1.08);
        }

        .talk-agent-btn:active {
          transform: translateY(0) scale(0.99);
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

        /* Loading Spinner */
        .loading-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: #fff;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Connected Active Call Badge design */
        .agent-status-container {
          display: flex;
          align-items: center;
        }

        .active-call-badge {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 6px 6px 6px 14px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-card);
          border-radius: 30px;
          backdrop-filter: blur(8px);
        }

        .live-dot {
          width: 8px;
          height: 8px;
          background-color: #ef4444;
          border-radius: 50%;
          animation: pulse-red 1.5s infinite;
        }

        @keyframes pulse-red {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }

        .call-timer {
          font-family: monospace;
          color: var(--text-primary);
          font-size: 0.95rem;
          font-weight: 600;
          min-width: 45px;
        }

        .end-call-btn {
          background: #ef4444;
          color: #fff;
          border: none;
          padding: 6px 14px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.1s ease;
        }

        .end-call-btn:hover {
          background: #dc2626;
          transform: scale(1.02);
        }

        .end-call-btn:active {
          transform: scale(0.98);
        }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
          .talk-agent-btn {
            padding: 10px 18px;
            font-size: 0.9rem;
          }
        }

        @media (max-width: 380px) {
          .talk-agent-btn { padding: 10px 16px; }
          .talk-agent-label { display: none; }
          .talk-agent-icon { width: 20px; height: 20px; }
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