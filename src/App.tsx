import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BentoStack } from './components/BentoStack';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { About } from './components/About';

const App: React.FC = () => {
  const [theme, setTheme] = useState<string>('ultraviolet');

  useEffect(() => {
    // Apply data-theme attribute to body for global CSS variables matching
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="portfolio-app">
      {/* Global Ambient Glow Nodes */}
      <div className="ambient-glow top-left-glow" />
      <div className="ambient-glow center-right-glow" />

      <Navbar currentTheme={theme} setTheme={setTheme} />
      <main>
  <Hero />
  <About />
  <Projects />
  <BentoStack />
  <Contact />
      </main>

      <style>{`
        .portfolio-app {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
        }

        .top-left-glow {
          top: -100px;
          left: -100px;
          opacity: 0.35;
        }

        .center-right-glow {
          top: 40%;
          right: -200px;
          opacity: 0.25;
        }
      `}</style>
    </div>
  );
};

export default App;
