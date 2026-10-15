import { useState } from 'react';
import './Test.css';

export default function Test() {
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCopyEmail = () => {
    const email = 'vishnujr155@gmail.com';
    navigator.clipboard?.writeText(email).then(() => {
      triggerToast('📋 Email copied to clipboard: ' + email);
    }).catch(() => {
      triggerToast('✉️ Contact email: ' + email);
    });
  };

  return (
    <div className="portfolio-wrapper">
      {/* Top Navbar */}
      <header className="navbar-sticky">
        <div className="site-container">
          <div className="navbar-inner">
            <a href="#" className="nav-brand">
              <span className="nav-brand-badge">⚡</span>
              <span>Galleria <span className="nav-brand-sub">/ vishnu.dev</span></span>
            </a>

            <nav className="nav-menu">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="nav-link">GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="nav-link">LinkedIn</a>
              <a href="mailto:vishnujr155@gmail.com" className="nav-link">Contact</a>
              <button onClick={handleCopyEmail} className="nav-cta-btn">Say Hello</button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Single Section UI */}
      <main className="hero-main">
        <div className="site-container">
          {/* Status Indicator */}
          <div className="status-indicator">
            <span className="status-dot"></span>
            <span>Available for freelance projects &amp; full-time roles</span>
          </div>

          {/* Heading */}
          <h1 className="hero-title">
            Building standard web apps &amp; <span className="hero-highlight">digital experiences.</span>
          </h1>

          {/* Bio Description */}
          <p className="hero-description">
            Hi, I'm <strong>Vishnu</strong>. I specialize in designing and engineering high-quality, fast, and accessible web applications with clean code, intuitive interfaces, and scalable architectures.
          </p>

          {/* Action Buttons */}
          <div className="hero-actions">
            <a href="mailto:vishnujr155@gmail.com" className="btn-primary">
              <span>Get in Touch</span>
              <span>✉️</span>
            </a>
            <button onClick={handleCopyEmail} className="btn-secondary">
              <span>Copy Email</span>
              <span>📋</span>
            </button>
          </div>

          {/* 3 Metric Cards */}
          <div className="metrics-row">
            <div className="metric-card">
              <div className="metric-value">15+</div>
              <div className="metric-label">Completed Projects</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">100%</div>
              <div className="metric-label">Clean Code &amp; Responsive</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">Modern</div>
              <div className="metric-label">React 19 &amp; Vite Architecture</div>
            </div>
          </div>
        </div>
      </main>

      {/* Clean Bottom Footer */}
      <footer className="site-footer">
        <div className="site-container">
          <div className="footer-content">
            <div>
              © {new Date().getFullYear()} <strong>Vishnu</strong> • Galleria. Built with React 19 &amp; Vite.
            </div>

            <div className="footer-socials">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="footer-social-link">GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer-social-link">LinkedIn</a>
              <a href="mailto:vishnujr155@gmail.com" className="footer-social-link">vishnujr155@gmail.com</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Notification Toast */}
      {showToast && (
        <div className="standard-toast">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}