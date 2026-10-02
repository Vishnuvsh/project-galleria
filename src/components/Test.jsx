import React, { useState } from 'react';
import './Test.css';

const INITIAL_PROJECTS = [
  {
    id: 1,
    title: 'Galleria 3D Showcase',
    category: '3D & Visuals',
    desc: 'An immersive digital art showroom with real-time interactive lighting and ambient audio shaders.',
    tags: ['Three.js', 'React', 'GLSL', 'Vite'],
    likes: 42,
    gradient: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
    icon: '🔮'
  },
  {
    id: 2,
    title: 'Nova AI Agent Studio',
    category: 'Web Apps',
    desc: 'Next-gen autonomous AI workspace with reactive streaming nodes and real-time canvas collaboration.',
    tags: ['React 19', 'TypeScript', 'Tailwind', 'WebSockets'],
    likes: 89,
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
    icon: '⚡'
  },
  {
    id: 3,
    title: 'Aura Glassmorphism UI',
    category: 'UI Concepts',
    desc: 'Modern component design system crafted with dynamic blur layers, neon hues, and responsive micro-interactions.',
    tags: ['Design System', 'Figma', 'CSS Modules'],
    likes: 67,
    gradient: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
    icon: '✨'
  },
  {
    id: 4,
    title: 'CyberPulse Analytics',
    category: 'Web Apps',
    desc: 'High-throughput telemetry dashboard tracking cloud microservices with sub-millisecond chart renders.',
    tags: ['D3.js', 'Next.js', 'Rust Engine'],
    likes: 54,
    gradient: 'linear-gradient(135deg, #059669 0%, #0d9488 100%)',
    icon: '📊'
  },
  {
    id: 5,
    title: 'Nebula Audio Synthesizer',
    category: '3D & Visuals',
    desc: 'Web Audio API spatial synth playground generating procedural audiovisual waveform sculptures.',
    tags: ['WebAudio', 'Canvas API', 'Tone.js'],
    likes: 76,
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    icon: '🎧'
  },
  {
    id: 6,
    title: 'Synapse Neural Graph',
    category: 'UI Concepts',
    desc: 'Interactive 3D knowledge graph visualizer mapping connections between complex engineering ideas.',
    tags: ['ForceGraph3D', 'React Flow', 'GraphQL'],
    likes: 93,
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
    icon: '🧠'
  }
];

const Test = () => {
  const [magicCount, setMagicCount] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [activeNav, setActiveNav] = useState('Home');

  const handleBuildMagic = () => {
    const nextCount = magicCount + 1;
    setMagicCount(nextCount);
    setToastMessage(`✨ Magic spark #${nextCount} created! Keep building amazing things, Vishnu!`);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3500);
  };

  const handleLike = (id, e) => {
    e.stopPropagation();
    setProjects(prev =>
      prev.map(p => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter(p => p.category === activeFilter);

  return (
    <div className="galleria-page">
      {/* Background Animated Ambient Lights & Grid */}
      <div className="ambient-glow-container">
        <div className="glow-orb glow-orb-1"></div>
        <div className="glow-orb glow-orb-2"></div>
        <div className="glow-orb glow-orb-3"></div>
        <div className="cyber-grid-overlay"></div>
      </div>

      <div className="content-wrapper">
        {/* Navigation Bar */}
        <header className="galleria-nav">
          <a href="#home" className="brand-logo">
            <div className="logo-badge">💎</div>
            <span>Galleria <span className="logo-tag">/ vishnu.dev</span></span>
          </a>

          <nav className="nav-links">
            {['Home', 'Showcase', 'Stats', 'About'].map((item) => (
              <button
                key={item}
                className={`nav-link ${activeNav === item ? 'active' : ''}`}
                onClick={() => setActiveNav(item)}
              >
                {item}
              </button>
            ))}
          </nav>

          <button 
            className="nav-cta"
            onClick={() => {
              setToastMessage("🚀 Let's collaborate! Reach out to Vishnu to build something extraordinary.");
              setShowToast(true);
              setTimeout(() => setShowToast(false), 3000);
            }}
          >
            <span>Let's Connect</span>
            <span>→</span>
          </button>
        </header>

        {/* Hero Section */}
        <section className="hero-section" id="home">
          {/* Status Badge */}
          <div className="status-badge">
            <span className="status-dot-pulse"></span>
            <span>Available for new projects & creative collaborations</span>
          </div>

          {/* Main Headline */}
          <h1 className="hero-title">
            Hey, <span className="gradient-text">Vishnu</span> here!
          </h1>

          <p className="hero-subtitle">
            Crafting state-of-the-art web applications, interactive 3D spaces, and intuitive digital experiences with passion and clean code.
          </p>

          {/* Inspiring Quote Glass Card */}
          <div className="quote-glass-card">
            <div className="quote-icon">“</div>
            <p className="quote-text">
              The only way to do great work is to love what you do. Keep coding, keep building!
            </p>
            <div className="quote-author">— Steve Jobs & Vishnu's Mantra</div>
          </div>

          {/* Interactive CTA Group */}
          <div className="hero-cta-group">
            <button className="btn-magic-primary" onClick={handleBuildMagic}>
              <span>✨ Let's Build Magic</span>
              {magicCount > 0 && (
                <span className="btn-sparkle-counter">+{magicCount}</span>
              )}
            </button>

            <a href="#showcase" className="btn-glass-secondary">
              <span>Explore Galleria</span>
              <span className="btn-arrow">↓</span>
            </a>
          </div>

          {/* Quick Stats Grid */}
          <div className="stats-grid" id="stats">
            <div className="stat-card">
              <div className="stat-icon">🚀</div>
              <div className="stat-number">15+</div>
              <div className="stat-label">Projects Crafted</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⚡</div>
              <div className="stat-number">100%</div>
              <div className="stat-label">Code Precision</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">☕</div>
              <div className="stat-number">999+</div>
              <div className="stat-label">Coffee Fuelled</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🎨</div>
              <div className="stat-number">3D / UI</div>
              <div className="stat-label">Visual Excellence</div>
            </div>
          </div>
        </section>

        {/* Galleria Showcase Section */}
        <section className="showcase-section" id="showcase">
          <div className="section-header">
            <span className="section-tag">Curated Portfolio</span>
            <h2 className="section-title">Explore The Galleria</h2>
            <p className="section-desc">
              Discover a handpicked collection of innovative web experiments, creative interfaces, and robust applications.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="filter-tabs">
            {['All', 'Web Apps', '3D & Visuals', 'UI Concepts'].map((filter) => (
              <button
                key={filter}
                className={`filter-tab ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Showcase Cards Grid */}
          <div className="cards-grid">
            {filteredProjects.map((project) => (
              <div key={project.id} className="showcase-card">
                <div className="card-media">
                  <div
                    className="card-visual-bg"
                    style={{ background: project.gradient }}
                  ></div>
                  <span className="card-emoji-icon">{project.icon}</span>
                  <span className="card-category-badge">{project.category}</span>
                  <button
                    className="card-like-btn"
                    onClick={(e) => handleLike(project.id, e)}
                    title="Like this creation"
                  >
                    <span>❤️</span>
                    <span>{project.likes}</span>
                  </button>
                </div>

                <div className="card-body">
                  <h3 className="card-title">{project.title}</h3>
                  <p className="card-desc">{project.desc}</p>
                  
                  <div className="card-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="card-tag">#{tag}</span>
                    ))}
                  </div>

                  <a
                    href="#live-demo"
                    className="card-action-link"
                    onClick={(e) => {
                      e.preventDefault();
                      setToastMessage(`🌟 Previewing "${project.title}" — Live interactive demo loading!`);
                      setShowToast(true);
                      setTimeout(() => setShowToast(false), 3000);
                    }}
                  >
                    <span>Live Preview</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="galleria-footer">
          <div>
            © {new Date().getFullYear()} <strong>Galleria</strong>. Crafted with ❤️ for Vishnu. Built with React 19 & Vite.
          </div>
          <div className="footer-socials">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="social-btn" title="GitHub">
              🐙
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-btn" title="LinkedIn">
              💼
            </a>
            <a href="mailto:vishnu@example.com" className="social-btn" title="Email">
              ✉️
            </a>
          </div>
        </footer>
      </div>

      {/* Floating Magic Toast Popup */}
      {showToast && (
        <div className="magic-toast">
          <div className="toast-sparkle-icon">✨</div>
          <div className="toast-text">
            <strong>Galleria Interaction</strong>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Test;