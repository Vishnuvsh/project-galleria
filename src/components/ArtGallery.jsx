import { useState, useEffect, useRef, useMemo } from 'react';
import './ArtGallery.css';

const ARTWORKS = [
  {
    id: 'art-01',
    title: 'Neo-Kyoto: Rain & Reflections',
    category: 'Cyberpunk & Sci-Fi',
    image: '/art/cyber_city.jpg',
    curator: 'Vishnu Dev',
    year: '2026',
    description: 'An electric midnight downpour across the hyper-dense skyline of Neo-Kyoto. Neon signage cuts through atmospheric mist as hover-traffic glides silently between monolithic corporate spires.',
    aspect: '16:9 Cinema Wide',
    resolution: '3840 × 2160 UHD',
    colorSpace: 'Wide Color Gamut (DCI-P3)',
    engine: 'GLSL / Unreal Path-Tracing',
    palette: ['#00E5FF', '#FF007F', '#181C3F', '#0B0D1B', '#7A5AF8'],
    tags: ['Cyberpunk', 'Volumetric Fog', 'Ray Tracing', 'Rainy Night', 'Octane 8K'],
    likes: 142,
    curatorPick: true
  },
  {
    id: 'art-02',
    title: 'Luminescent Grove & The Starlit Pilgrim',
    category: 'Surreal & Bio-Flora',
    image: '/art/surreal_nature.jpg',
    curator: 'Vishnu Dev',
    year: '2026',
    description: 'A sanctuary deep within an untouched realm where ancient crystal trees pulsate with violet aura and bioluminescent flora illuminate a crystalline river flowing beneath cosmic aurora borealis.',
    aspect: '4:3 Classic',
    resolution: '4096 × 3072',
    colorSpace: 'Quantum Rec.2020',
    engine: 'Generative Neural Shaders',
    palette: ['#38BDF8', '#818CF8', '#C084FC', '#064E3B', '#1E1B4B'],
    tags: ['Bioluminescence', 'Surrealism', 'Cosmic Aurora', 'Crystal Flora', 'Mythic'],
    likes: 189,
    curatorPick: true
  },
  {
    id: 'art-03',
    title: 'Prismatic Singularity No. 9',
    category: 'Abstract & Prism',
    image: '/art/abstract_geometry.jpg',
    curator: 'Vishnu Dev',
    year: '2026',
    description: 'A fluid chrome sculpture caught at the exact microsecond of quantum dispersion. Suspended in interstellar vacuum, it fractures cosmic rays into iridescent spectra and hypnotic caustics.',
    aspect: '1:1 Balanced Square',
    resolution: '3000 × 3000 Hi-Res',
    colorSpace: 'sRGB / Spectral Caustics',
    engine: 'Physical Spectral Simulation',
    palette: ['#E0E7FF', '#F472B6', '#A855F7', '#38BDF8', '#1E1B4B'],
    tags: ['Liquid Chrome', 'Dispersion', 'Spectral Refraction', 'Zero-G', 'Abstract'],
    likes: 215,
    curatorPick: false
  },
  {
    id: 'art-04',
    title: 'The Obsidian Pavilion of Twin Moons',
    category: 'Futuristic Spaces',
    image: '/art/futuristic_sanctuary.jpg',
    curator: 'Vishnu Dev',
    year: '2026',
    description: 'A floating geometric palace constructed from dark obsidian stone and structural glass. Anchored over mirror-like deep waters, bathed in the tranquil luminescence of twin ascending moons.',
    aspect: '16:9 Cinema Wide',
    resolution: '3840 × 2160 UHD',
    colorSpace: 'HDR 1000 Master',
    engine: 'BIM Architectural Raymarch',
    palette: ['#FBBF24', '#F8FAFC', '#1E293B', '#0F172A', '#D97706'],
    tags: ['Brutalist Zen', 'Twin Moons', 'Obsidian Glass', 'Architectural', 'Minimalist'],
    likes: 178,
    curatorPick: true
  },
  {
    id: 'art-05',
    title: 'Aetheric Stargate: The Golden Meridian',
    category: 'Sacred Geometry',
    image: '/art/quantum_portal.jpg',
    curator: 'Vishnu Dev',
    year: '2026',
    description: 'An ancient celestial aperture forged with sacred geometry dials and swirling golden solar plasma. A stable wormhole piercing the fabric of deep cosmic space and eternity.',
    aspect: '3:4 Fine Portrait',
    resolution: '3072 × 4096',
    colorSpace: 'DCI-P3 High Dynamic',
    engine: 'Fractal Plasma Computation',
    palette: ['#FDE047', '#D946EF', '#6366F1', '#18181B', '#EAB308'],
    tags: ['Sacred Geometry', 'Cosmic Portal', 'Solar Plasma', 'Stargate', 'Celestial'],
    likes: 230,
    curatorPick: false
  },
  {
    id: 'art-06',
    title: 'Valkyrie 2.0: The Porcelain Muse',
    category: 'Cyberpunk & Sci-Fi',
    image: '/art/cyber_portrait.jpg',
    curator: 'Vishnu Dev',
    year: '2026',
    description: 'An avant-garde biomechanical goddess forged from dark lacquered porcelain and Kintsugi-inspired 24k gold leaf. Glowing cyan neural filament hair pulses with artificial consciousness.',
    aspect: '4:3 Classic',
    resolution: '4096 × 3072',
    colorSpace: 'P3 Dynamic Cinema',
    engine: 'Subsurface Neural Render',
    palette: ['#22D3EE', '#FACC15', '#0F172A', '#E2E8F0', '#0369A1'],
    tags: ['Biomechanical', 'Kintsugi Gold', 'Cyber Muse', 'Neural Crown', 'Portrait'],
    likes: 264,
    curatorPick: true
  }
];

const MOODS = [
  { id: 'cyber', name: 'Cyber Neon', primary: '#8b5cf6', secondary: '#06b6d4', glow: 'rgba(139, 92, 246, 0.45)' },
  { id: 'gold', name: 'Golden Sacred', primary: '#f59e0b', secondary: '#ec4899', glow: 'rgba(245, 158, 11, 0.45)' },
  { id: 'aurora', name: 'Cosmic Aurora', primary: '#10b981', secondary: '#38bdf8', glow: 'rgba(16, 185, 129, 0.45)' },
  { id: 'obsidian', name: 'Obsidian Moon', primary: '#64748b', secondary: '#94a3b8', glow: 'rgba(148, 163, 184, 0.3)' }
];

const CATEGORIES = [
  'All',
  'Cyberpunk & Sci-Fi',
  'Surreal & Bio-Flora',
  'Abstract & Prism',
  'Sacred Geometry',
  'Futuristic Spaces'
];

export default function ArtGallery() {
  const [artworks, setArtworks] = useState(ARTWORKS);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [viewLayout, setViewLayout] = useState('masonry'); // 'masonry' or 'wide'
  const [currentMood, setCurrentMood] = useState(MOODS[0]);
  const [lightboxArt, setLightboxArt] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquiryArt, setInquiryArt] = useState(null);
  const [likedMap, setLikedMap] = useState({});

  // Web Audio Ambient Synthesizer Ref
  const audioContextRef = useRef(null);
  const audioGainRef = useRef(null);
  const oscillatorsRef = useRef([]);

  // Toast Helper
  const showToast = (message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3200);
  };

  // Sound Effect Chime (gentle glass sound)
  const playChime = (freq = 587.33) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch {
      // Audio not supported or blocked, graceful ignore
    }
  };

  // Toggle Continuous Ambient Synth Drone
  const toggleAmbientSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) {
        showToast('Web Audio is not supported in this browser.', 'warning');
        return;
      }

      if (isAudioPlaying) {
        if (audioGainRef.current && audioContextRef.current) {
          audioGainRef.current.gain.linearRampToValueAtTime(0.001, audioContextRef.current.currentTime + 0.8);
          setTimeout(() => {
            oscillatorsRef.current.forEach(osc => osc.stop());
            oscillatorsRef.current = [];
            audioContextRef.current?.close();
            audioContextRef.current = null;
          }, 850);
        }
        setIsAudioPlaying(false);
        showToast('Ambient sanctuary drone paused 🔇', 'info');
      } else {
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
        masterGain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 1.2);
        audioGainRef.current = masterGain;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(420, ctx.currentTime);

        masterGain.connect(filter);
        filter.connect(ctx.destination);

        // Harmonious ethereal chord: D2, A2, D3, F#3
        const chords = [73.42, 110.0, 146.83, 185.0];
        const oscs = chords.map((freq, idx) => {
          const osc = ctx.createOscillator();
          osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          
          // Subtle detune for lush organic shimmer
          osc.detune.setValueAtTime((idx - 1.5) * 4, ctx.currentTime);

          const lfo = ctx.createOscillator();
          const lfoGain = ctx.createGain();
          lfo.frequency.setValueAtTime(0.12 + idx * 0.05, ctx.currentTime);
          lfoGain.gain.setValueAtTime(2.5, ctx.currentTime);
          lfo.connect(lfoGain);
          lfoGain.connect(osc.frequency);
          lfo.start();

          osc.connect(masterGain);
          osc.start();
          return osc;
        });

        oscillatorsRef.current = oscs;
        setIsAudioPlaying(true);
        showToast('Ambient sanctuary soundscape activated 🎶', 'success');
      }
    } catch (e) {
      console.warn('Audio synthesis issue:', e);
      showToast('Could not start audio due to browser policy.', 'warning');
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxArt) return;
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        navigateLightbox(1);
      } else if (e.key === 'ArrowLeft') {
        navigateLightbox(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxArt, artworks]);

  // Handle Likes
  const handleLike = (id, e) => {
    if (e) e.stopPropagation();
    playChime(659.25);
    const isAlreadyLiked = likedMap[id];
    setLikedMap(prev => ({ ...prev, [id]: !isAlreadyLiked }));
    setArtworks(prev =>
      prev.map(art =>
        art.id === id ? { ...art, likes: isAlreadyLiked ? art.likes - 1 : art.likes + 1 } : art
      )
    );
    if (!isAlreadyLiked) {
      showToast('Masterpiece added to your private favorites! ❤️', 'success');
    }
  };

  // Copy Color Hex
  const handleCopyColor = (hex, e) => {
    if (e) e.stopPropagation();
    navigator.clipboard?.writeText(hex);
    playChime(783.99);
    showToast(`Palette shade ${hex} copied to clipboard! 🎨`, 'success');
  };

  // Open Lightbox
  const openLightbox = (art) => {
    playChime(523.25);
    setLightboxArt(art);
    setZoomLevel(1);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxArt(null);
    setZoomLevel(1);
    document.body.style.overflow = 'auto';
  };

  const navigateLightbox = (step) => {
    const currentIndex = artworks.findIndex(a => a.id === lightboxArt.id);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + step + artworks.length) % artworks.length;
    setLightboxArt(artworks[nextIndex]);
    setZoomLevel(1);
    playChime(587.33);
  };

  // Filtered & Sorted Artworks
  const displayedArtworks = useMemo(() => {
    let result = artworks;

    // Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter(art => art.category === selectedCategory);
    }

    // Filter by Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        art =>
          art.title.toLowerCase().includes(q) ||
          art.description.toLowerCase().includes(q) ||
          art.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    // Sort
    return [...result].sort((a, b) => {
      if (sortBy === 'popular') return b.likes - a.likes;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'picks') return (b.curatorPick ? 1 : 0) - (a.curatorPick ? 1 : 0);
      return 0;
    });
  }, [artworks, selectedCategory, searchQuery, sortBy]);

  // Featured Hero Art
  const featuredArt = artworks.find(a => a.id === 'art-02') || artworks[0];

  return (
    <div
      className="galleria-art-sanctuary"
      style={{
        '--accent-glow': currentMood.glow,
        '--color-primary': currentMood.primary,
        '--color-secondary': currentMood.secondary
      }}
    >
      {/* Dynamic Animated Ambient Mesh */}
      <div className="ambient-viewport-mesh">
        <div className="mesh-gradient-orb orb-primary"></div>
        <div className="mesh-gradient-orb orb-secondary"></div>
        <div className="mesh-gradient-orb orb-tertiary"></div>
        <div className="noise-texture-overlay"></div>
        <div className="matrix-cross-grid"></div>
      </div>

      {/* Main Single Page Container */}
      <div className="sanctuary-inner">
        {/* Navigation Bar */}
        <header className="sanctuary-nav">
          <a href="#home" className="nav-brand">
            <div className="brand-gem-ring">
              <span className="gem-symbol">💎</span>
            </div>
            <div className="brand-text">
              <span className="brand-name">GALLERIA</span>
              <span className="brand-subtitle">BY VISHNU // 2026</span>
            </div>
          </a>

          <div className="nav-center-links">
            <a href="#exhibition" className="nav-link-anchor">Exhibition</a>
            <a href="#masterpiece" className="nav-link-anchor">Spotlight</a>
            <a href="#curations" className="nav-link-anchor">Collection</a>
            <a href="#collector-hall" className="nav-link-anchor">Acquisition</a>
          </div>

          <div className="nav-controls">
            {/* Ambient Soundscape Toggle */}
            <button
              className={`control-btn audio-btn ${isAudioPlaying ? 'active' : ''}`}
              onClick={toggleAmbientSound}
              title={isAudioPlaying ? 'Mute Ambient Soundscape' : 'Enable Ambient Soundscape'}
              aria-label="Toggle ambient audio"
            >
              <div className="sound-wave-bars">
                <span className={`bar b1 ${isAudioPlaying ? 'playing' : ''}`}></span>
                <span className={`bar b2 ${isAudioPlaying ? 'playing' : ''}`}></span>
                <span className={`bar b3 ${isAudioPlaying ? 'playing' : ''}`}></span>
              </div>
              <span className="btn-label">{isAudioPlaying ? 'Sound On' : 'Sound Off'}</span>
            </button>

            {/* Inquire CTA */}
            <button
              className="curator-inquire-btn"
              onClick={() => {
                setInquiryArt(null);
                setIsInquiryOpen(true);
              }}
            >
              <span>Curator Lounge</span>
              <span className="arrow-glimmer">✦</span>
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="sanctuary-hero" id="home">
          <div className="hero-badge-pill">
            <span className="pulsing-halo"></span>
            <span className="badge-text">AUTUMN 2026 PERMANENT EXHIBIT • CURATED BY VISHNU</span>
          </div>

          <h1 className="hero-grand-title">
            THE DIGITAL <span className="title-gradient-glow">SANCTUARY</span>
          </h1>

          <p className="hero-lead-description">
            Step inside a museum of tomorrow. Six transcendental digital masterworks bridging
            hyper-detailed procedural synthesis, cybernetic forms, and cosmic geometry.
          </p>

          {/* Quick Metrics Bar */}
          <div className="hero-metrics-strip">
            <div className="metric-item">
              <span className="metric-val">06</span>
              <span className="metric-desc">Curated Masterpieces</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-val">4K UHD</span>
              <span className="metric-desc">Native Master Res</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-val">DCI-P3</span>
              <span className="metric-desc">Color Gamut Precision</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-val">100%</span>
              <span className="metric-desc">Lossless Artifacts</span>
            </div>
          </div>

          {/* Hero CTAs */}
          <div className="hero-actions-row">
            <a href="#curations" className="cta-enter-btn">
              <span>Explore The Collection</span>
              <span className="cta-arrow">↓</span>
            </a>
            <button
              className="cta-spotlight-btn"
              onClick={() => openLightbox(featuredArt)}
            >
              <span>Inspect Masterpiece of the Month</span>
              <span className="eye-icon">👁️</span>
            </button>
          </div>

          {/* Atmospheric Mood Switcher */}
          <div className="mood-harmonizer">
            <span className="mood-label">Atmosphere Lighting:</span>
            <div className="mood-chips">
              {MOODS.map(mood => (
                <button
                  key={mood.id}
                  className={`mood-chip ${currentMood.id === mood.id ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentMood(mood);
                    playChime(698.46);
                    showToast(`Ambient aura shifted to ${mood.name} 🌌`, 'info');
                  }}
                >
                  <span className="mood-color-dot" style={{ backgroundColor: mood.primary }}></span>
                  <span>{mood.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Masterpiece Spotlight Section */}
        <section className="masterpiece-spotlight-section" id="masterpiece">
          <div className="section-label-header">
            <span className="accent-bullet">✦</span>
            <h2>CURATOR'S SPOTLIGHT</h2>
          </div>

          <div className="spotlight-card">
            <div className="spotlight-visual" onClick={() => openLightbox(featuredArt)}>
              <img
                src={featuredArt.image}
                alt={featuredArt.title}
                className="spotlight-img"
                loading="lazy"
              />
              <div className="spotlight-badge">★ Exhibition Centerpiece</div>
              <div className="spotlight-hover-overlay">
                <span className="inspect-symbol">🔍</span>
                <span>Click for 4K Cinematic Inspection</span>
              </div>
            </div>

            <div className="spotlight-details">
              <div className="spotlight-meta-top">
                <span className="spotlight-category">{featuredArt.category}</span>
                <span className="spotlight-id">NO. 002 // 2026</span>
              </div>

              <h3 className="spotlight-title">{featuredArt.title}</h3>

              <p className="spotlight-desc">{featuredArt.description}</p>

              <div className="specs-grid">
                <div className="spec-box">
                  <span className="spec-name">Resolution</span>
                  <span className="spec-val">{featuredArt.resolution}</span>
                </div>
                <div className="spec-box">
                  <span className="spec-name">Color Space</span>
                  <span className="spec-val">{featuredArt.colorSpace}</span>
                </div>
                <div className="spec-box">
                  <span className="spec-name">Engine Pipeline</span>
                  <span className="spec-val">{featuredArt.engine}</span>
                </div>
                <div className="spec-box">
                  <span className="spec-name">Aspect Format</span>
                  <span className="spec-val">{featuredArt.aspect}</span>
                </div>
              </div>

              {/* Color Harmonies Extraction */}
              <div className="palette-extractor">
                <div className="palette-header">
                  <span>Spectral Palette (Click to copy)</span>
                  <span className="palette-sub">5 Dominant Harmonies</span>
                </div>
                <div className="palette-swatches">
                  {featuredArt.palette.map((color, idx) => (
                    <button
                      key={idx}
                      className="swatch-btn"
                      style={{ backgroundColor: color }}
                      onClick={(e) => handleCopyColor(color, e)}
                      title={`Copy ${color}`}
                    >
                      <span className="swatch-label">{color}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="spotlight-actions">
                <button
                  className="spotlight-inspect-btn"
                  onClick={() => openLightbox(featuredArt)}
                >
                  <span>Launch Lightbox</span>
                  <span>↗</span>
                </button>
                <button
                  className={`spotlight-like-btn ${likedMap[featuredArt.id] ? 'liked' : ''}`}
                  onClick={(e) => handleLike(featuredArt.id, e)}
                >
                  <span>{likedMap[featuredArt.id] ? '❤️' : '🤍'}</span>
                  <span>{featuredArt.likes} Curators Applauded</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Gallery Collection Section */}
        <section className="sanctuary-collection" id="curations">
          <div className="collection-header-row">
            <div>
              <div className="section-label-header">
                <span className="accent-bullet">✦</span>
                <h2>PERMANENT EXHIBITION</h2>
              </div>
              <p className="collection-subtext">
                Filter by aesthetic genre or search by visual motif, tags, and spectral moods.
              </p>
            </div>

            {/* Layout View Mode Switcher */}
            <div className="view-mode-toggle">
              <button
                className={`view-btn ${viewLayout === 'masonry' ? 'active' : ''}`}
                onClick={() => setViewLayout('masonry')}
                title="Masonry Gallery"
              >
                <span>Grid</span>
              </button>
              <button
                className={`view-btn ${viewLayout === 'wide' ? 'active' : ''}`}
                onClick={() => setViewLayout('wide')}
                title="Cinematic Wide Gallery"
              >
                <span>Wide Cinema</span>
              </button>
            </div>
          </div>

          {/* Filtering & Search Toolbar */}
          <div className="gallery-toolbar">
            <div className="category-scroll-pills">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  className={`cat-pill ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCategory(category);
                    playChime(620);
                  }}
                >
                  {category}
                  {category === 'All' ? ` (${artworks.length})` : ''}
                </button>
              ))}
            </div>

            <div className="search-sort-group">
              <div className="search-box-wrapper">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search motifs, tags, titles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                {searchQuery && (
                  <button className="clear-search" onClick={() => setSearchQuery('')}>✕</button>
                )}
              </div>

              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popular">Most Appreciated</option>
                <option value="picks">Curator Picks</option>
                <option value="title">Title (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Gallery Art Cards Grid */}
          <div className={`art-cards-display ${viewLayout === 'wide' ? 'layout-wide' : 'layout-masonry'}`}>
            {displayedArtworks.length === 0 ? (
              <div className="no-results-panel">
                <span className="no-results-icon">🔭</span>
                <h3>No Artworks Found</h3>
                <p>No masterworks match your current search criteria or category filter.</p>
                <button
                  className="reset-filters-btn"
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              displayedArtworks.map((art) => (
                <article
                  key={art.id}
                  className="art-card"
                  onClick={() => openLightbox(art)}
                >
                  <div className="card-media-wrapper">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="card-media-img"
                      loading="lazy"
                    />

                    {/* Gradient Aura on Hover */}
                    <div className="card-aura-glow"></div>

                    {/* Top Floating Badges */}
                    <div className="card-floating-header">
                      <span className="card-cat-badge">{art.category}</span>
                      <button
                        className={`card-like-pill ${likedMap[art.id] ? 'liked' : ''}`}
                        onClick={(e) => handleLike(art.id, e)}
                        title="Applaud this artwork"
                      >
                        <span>{likedMap[art.id] ? '❤️' : '🤍'}</span>
                        <span>{art.likes}</span>
                      </button>
                    </div>

                    {/* Bottom Floating Quick Info */}
                    <div className="card-floating-footer">
                      <span className="expand-trigger">
                        <span>Inspect in 4K</span>
                        <span className="corner-arrow">↗</span>
                      </span>
                    </div>
                  </div>

                  <div className="card-content-pane">
                    <div className="card-title-row">
                      <h3 className="card-title">{art.title}</h3>
                      <span className="card-year">{art.year}</span>
                    </div>

                    <p className="card-excerpt">{art.description}</p>

                    {/* Color Swatch Bar */}
                    <div className="card-swatches-row">
                      <span className="swatches-label">Palette:</span>
                      <div className="swatches-dots">
                        {art.palette.map((color, cIdx) => (
                          <button
                            key={cIdx}
                            className="color-dot"
                            style={{ backgroundColor: color }}
                            onClick={(e) => handleCopyColor(color, e)}
                            title={`Click to copy ${color}`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="card-tags-cloud">
                      {art.tags.slice(0, 3).map((tag, tIdx) => (
                        <span key={tIdx} className="card-tag">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        {/* Collector Lounge & Inquiries */}
        <section className="collector-hall-section" id="collector-hall">
          <div className="collector-glass-box">
            <div className="collector-left">
              <span className="hall-tag">PRIVATE CONCIERGE & ARCHIVE</span>
              <h2 className="hall-title">Inquire for High-Res Master Prints or Custom Digital Commissions</h2>
              <p className="hall-desc">
                Every artwork in the Galleria repository is rendered in lossless 4K / 8K dynamic
                color gamuts. Looking for licensed commercial display, museum exhibition displays, or bespoke
                generative digital installations? Let's connect directly with Vishnu.
              </p>
              <div className="curator-credentials">
                <div className="cred-badge">
                  <span className="cred-icon">⚡</span>
                  <div>
                    <strong>Vishnu</strong>
                    <span>Master Curator & Creative Architect</span>
                  </div>
                </div>
                <div className="cred-badge">
                  <span className="cred-icon">🌐</span>
                  <div>
                    <strong>Based in India</strong>
                    <span>Worldwide Collaboration & Licensing</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="collector-right">
              <div className="inquiry-quick-card">
                <h3>Direct Sanctuary Access</h3>
                <p>Submit your interest and Vishnu will respond within 24 hours.</p>
                <button
                  className="open-form-cta"
                  onClick={() => {
                    setInquiryArt(null);
                    setIsInquiryOpen(true);
                  }}
                >
                  <span>Send Curator Note</span>
                  <span>✉️</span>
                </button>
                <div className="instant-actions">
                  <a
                    href="mailto:vishnu@galleria.dev"
                    className="mail-direct-link"
                    onClick={(e) => {
                      e.preventDefault();
                      navigator.clipboard?.writeText('vishnu@galleria.dev');
                      showToast('Copied email (vishnu@galleria.dev) to clipboard!', 'success');
                    }}
                  >
                    Copy Direct Email (vishnu@galleria.dev)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="sanctuary-footer">
          <div className="footer-top-row">
            <div className="footer-brand">
              <div className="brand-gem-ring small">💎</div>
              <span>GALLERIA • VISHNU</span>
            </div>
            <div className="footer-links">
              <a href="#home">Back to Top ↑</a>
              <a href="#curations">Exhibition</a>
              <a href="#masterpiece">Spotlight</a>
              <a href="#collector-hall">Collector Lounge</a>
            </div>
          </div>
          <div className="footer-bottom-row">
            <p>© {new Date().getFullYear()} GALLERIA. Conceived & Coded with passion for Vishnu.</p>
            <p className="footer-engine-note">Engineered with React 19, CSS Modern Glassmorphism & Web Audio Synthesis.</p>
          </div>
        </footer>
      </div>

      {/* Fullscreen Lightbox Cinema Modal */}
      {lightboxArt && (
        <div className="lightbox-backdrop" onClick={closeLightbox}>
          <div className="lightbox-modal" onClick={(e) => e.stopPropagation()}>
            {/* Modal Controls Top */}
            <div className="lightbox-nav-bar">
              <div className="lightbox-title-crumb">
                <span className="crumb-brand">GALLERIA 4K INSPECTOR</span>
                <span className="crumb-sep">/</span>
                <span className="crumb-title">{lightboxArt.title}</span>
              </div>

              <div className="lightbox-tools">
                <button
                  className={`lightbox-tool-btn ${zoomLevel > 1 ? 'active' : ''}`}
                  onClick={() => setZoomLevel(prev => (prev === 1 ? 1.6 : prev === 1.6 ? 2.2 : 1))}
                  title="Toggle Zoom Mode"
                >
                  <span>🔍 {zoomLevel}x Zoom</span>
                </button>

                <button
                  className="lightbox-tool-btn"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = lightboxArt.image;
                    link.download = `${lightboxArt.id}-${lightboxArt.title.replace(/\s+/g, '_')}.jpg`;
                    link.click();
                    showToast('Initiating lossless wallpaper download...', 'success');
                  }}
                  title="Download High-Res Master Wallpaper"
                >
                  <span>📥 Save Wallpaper</span>
                </button>

                <button
                  className="lightbox-tool-btn"
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.origin + '#' + lightboxArt.id);
                    showToast('Artwork shareable permalink copied!', 'success');
                  }}
                  title="Share Artwork"
                >
                  <span>🔗 Share</span>
                </button>

                <button
                  className="lightbox-close-btn"
                  onClick={closeLightbox}
                  title="Close Inspector (Esc)"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Lightbox Main Content */}
            <div className="lightbox-body">
              {/* Image Preview Canvas */}
              <div className="lightbox-canvas-area">
                <button
                  className="cinema-arrow-btn prev"
                  onClick={() => navigateLightbox(-1)}
                  title="Previous Masterpiece (Left Arrow)"
                >
                  ‹
                </button>

                <div className="lightbox-img-viewport">
                  <img
                    src={lightboxArt.image}
                    alt={lightboxArt.title}
                    className="lightbox-main-img"
                    style={{
                      transform: `scale(${zoomLevel})`,
                      cursor: zoomLevel > 1 ? 'zoom-out' : 'zoom-in'
                    }}
                    onClick={() => setZoomLevel(prev => (prev === 1 ? 1.6 : 1))}
                  />
                </div>

                <button
                  className="cinema-arrow-btn next"
                  onClick={() => navigateLightbox(1)}
                  title="Next Masterpiece (Right Arrow)"
                >
                  ›
                </button>
              </div>

              {/* Lightbox Metadata Sidebar */}
              <div className="lightbox-sidebar">
                <div className="sidebar-cat-pill">{lightboxArt.category}</div>
                <h2 className="sidebar-title">{lightboxArt.title}</h2>
                <div className="sidebar-curator-line">
                  <span>Curated by <strong>{lightboxArt.curator}</strong></span>
                  <span>•</span>
                  <span>{lightboxArt.year}</span>
                </div>

                <div className="sidebar-desc-box">
                  <h4>Curator Note & Concept</h4>
                  <p>{lightboxArt.description}</p>
                </div>

                {/* Spectral Palette Inspector */}
                <div className="sidebar-palette-section">
                  <h4>Spectral Color Harmonies (Click to copy)</h4>
                  <div className="sidebar-swatches-grid">
                    {lightboxArt.palette.map((color, idx) => (
                      <button
                        key={idx}
                        className="sidebar-swatch"
                        style={{ backgroundColor: color }}
                        onClick={(e) => handleCopyColor(color, e)}
                        title={`Click to copy ${color}`}
                      >
                        <span className="swatch-hex">{color}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tech Specs */}
                <div className="sidebar-specs-section">
                  <h4>Technical Master Parameters</h4>
                  <div className="spec-row">
                    <span>Dimensions:</span>
                    <strong>{lightboxArt.resolution}</strong>
                  </div>
                  <div className="spec-row">
                    <span>Aspect Ratio:</span>
                    <strong>{lightboxArt.aspect}</strong>
                  </div>
                  <div className="spec-row">
                    <span>Color Profile:</span>
                    <strong>{lightboxArt.colorSpace}</strong>
                  </div>
                  <div className="spec-row">
                    <span>Rendering Engine:</span>
                    <strong>{lightboxArt.engine}</strong>
                  </div>
                </div>

                {/* Tags */}
                <div className="sidebar-tags-row">
                  {lightboxArt.tags.map(t => (
                    <span key={t} className="sidebar-tag">#{t}</span>
                  ))}
                </div>

                {/* Actions */}
                <div className="sidebar-actions-foot">
                  <button
                    className={`sidebar-like-btn ${likedMap[lightboxArt.id] ? 'liked' : ''}`}
                    onClick={(e) => handleLike(lightboxArt.id, e)}
                  >
                    <span>{likedMap[lightboxArt.id] ? '❤️ Applauded' : '🤍 Applaud Art'}</span>
                    <span>({lightboxArt.likes})</span>
                  </button>

                  <button
                    className="sidebar-inquire-btn"
                    onClick={() => {
                      setInquiryArt(lightboxArt);
                      setIsInquiryOpen(true);
                    }}
                  >
                    <span>Acquire / Inquire</span>
                    <span>✉️</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inquiry Modal */}
      {isInquiryOpen && (
        <div className="inquiry-backdrop" onClick={() => setIsInquiryOpen(false)}>
          <div className="inquiry-modal" onClick={(e) => e.stopPropagation()}>
            <div className="inquiry-header">
              <div>
                <span className="inquiry-sub">GALLERIA CONCIERGE</span>
                <h3>{inquiryArt ? `Inquire about "${inquiryArt.title}"` : 'Curator Studio Inquiry'}</h3>
              </div>
              <button className="inquiry-close" onClick={() => setIsInquiryOpen(false)}>✕</button>
            </div>

            <form
              className="inquiry-form"
              onSubmit={(e) => {
                e.preventDefault();
                showToast("Inquiry submitted! Vishnu's studio will get in touch shortly.", 'success');
                setIsInquiryOpen(false);
              }}
            >
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" required placeholder="e.g. Alex Vance" className="form-input" />
              </div>

              <div className="form-group">
                <label>Your Email Address</label>
                <input type="email" required placeholder="alex@domain.com" className="form-input" />
              </div>

              <div className="form-group">
                <label>Inquiry Nature</label>
                <select className="form-input select">
                  <option>Fine Art Print / Gallery Display Licensing</option>
                  <option>Digital Wall Display / 4K Commercial Screen</option>
                  <option>Commission Bespoke 3D / Generative Piece</option>
                  <option>Artist Collaboration with Vishnu</option>
                  <option>General Inquiries</option>
                </select>
              </div>

              <div className="form-group">
                <label>Message / Exhibition Context</label>
                <textarea
                  rows="3"
                  placeholder="Share details regarding your space, requirements, or timeline..."
                  className="form-input textarea"
                ></textarea>
              </div>

              <button type="submit" className="submit-inquiry-btn">
                <span>Dispatch to Vishnu's Studio</span>
                <span>→</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Glassmorphic Toast */}
      {toast.show && (
        <div className={`sanctuary-toast toast-${toast.type}`}>
          <span className="toast-icon">
            {toast.type === 'success' ? '✨' : toast.type === 'warning' ? '⚠️' : '🔮'}
          </span>
          <span className="toast-text">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
