import React, { useState, useEffect, useRef } from 'react';
import './index.css';

// ─── Utility Hook ───────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ─── Navbar ─────────────────────────────────────────────────────────────────
function Navbar({ data }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (section) => {
    const id = section.toLowerCase();
    const map = { 'home': 'hero', 'product': 'services', 'features': 'expertises', 'about': 'about', 'contact': 'contact' };
    const el = document.getElementById(map[id] || id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: '0 4vw',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 72,
        background: scrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(26,138,74,0.12)' : '1px solid transparent',
        transition: 'all 0.4s ease',
      }}>
        {/* Logo */}
        <div style={{ cursor: 'pointer' }} onClick={() => scrollTo('Accueil')}>
          <div style={{
            background: scrolled ? 'transparent' : 'rgba(255,255,255,0.08)',
            backdropFilter: scrolled ? 'none' : 'blur(16px)',
            border: scrolled ? 'none' : '1px solid rgba(255,255,255,0.14)',
            borderRadius: 12,
            padding: scrolled ? 0 : '4px 10px',
            transition: 'all 0.4s ease',
          }}>
            <img
              src="/logo.png"
              alt="Skalean"
              style={{
                height: 42,
                display: 'block',
                borderRadius: scrolled ? 8 : 6,
                boxShadow: scrolled ? '0 1px 8px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.4s ease',
              }}
            />
          </div>
        </div>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', gap: 36, alignItems: 'center' }} className="desktop-nav">
          {data.nav.filter(item => item !== 'Contact').map(item => (
            <button key={item} onClick={() => scrollTo(item)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 400,
              color: 'var(--white-dim)', letterSpacing: 1.5, textTransform: 'uppercase',
              transition: 'color 0.2s',
              padding: '4px 0',
            }}
              onMouseEnter={e => e.target.style.color = 'var(--gold)'}
              onMouseLeave={e => e.target.style.color = 'var(--white-dim)'}
            >{item}</button>
          ))}
          <button onClick={() => scrollTo('Contact')} style={{
            background: 'none', border: '1px solid var(--gold)',
            color: 'var(--gold)', cursor: 'pointer',
            fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 400,
            letterSpacing: 2, textTransform: 'uppercase',
            padding: '8px 20px', borderRadius: 2,
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.target.style.background = 'var(--gold)'; e.target.style.color = 'var(--bg)'; }}
            onMouseLeave={e => { e.target.style.background = 'none'; e.target.style.color = 'var(--gold)'; }}
          >Contact</button>
        </div>

        {/* Mobile burger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          display: 'none', background: 'none', border: 'none', cursor: 'pointer',
          flexDirection: 'column', gap: 5, padding: 8,
          position: 'relative', zIndex: 1001,
        }} className="burger" aria-label="Menu">
          <span style={{
            display: 'block', width: 24, height: 2, background: 'var(--gold)', borderRadius: 1,
            transition: 'all 0.3s ease',
            transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
          }} />
          <span style={{
            display: 'block', width: 24, height: 2, background: 'var(--gold)', borderRadius: 1,
            transition: 'all 0.3s ease',
            opacity: menuOpen ? 0 : 1,
          }} />
          <span style={{
            display: 'block', width: 24, height: 2, background: 'var(--gold)', borderRadius: 1,
            transition: 'all 0.3s ease',
            transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
          }} />
        </button>

        <style>{`
          @media (max-width: 768px) {
            .desktop-nav { display: none !important; }
            .burger { display: flex !important; }
          }
        `}</style>
      </nav>

      {/* Mobile menu - outside nav to avoid backdrop-filter containing block issue */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 40, zIndex: 999,
        }}>
          {data.nav.map(item => (
            <button key={item} onClick={() => scrollTo(item)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 300, fontStyle: 'italic',
              color: 'var(--white)', letterSpacing: 2,
            }}>{item}</button>
          ))}
        </div>
      )}
    </>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero({ data }) {
  return (
    <section id="hero" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden',
      padding: '120px 4vw 80px',
    }}>
      {/* Background decorations */}
      <div style={{
        position: 'absolute', top: '15%', right: '-5%',
        width: '55vw', height: '55vw', maxWidth: 800, maxHeight: 800,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(26,138,74,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: '-10%',
        width: '35vw', height: '35vw', maxWidth: 500, maxHeight: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(26,138,74,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Geometric lines */}
      <svg style={{ position: 'absolute', top: 0, right: 0, width: '50vw', height: '100%', opacity: 0.06, pointerEvents: 'none' }} viewBox="0 0 600 900" fill="none">
        <line x1="600" y1="0" x2="0" y2="900" stroke="#1a8a4a" strokeWidth="0.5" />
        <line x1="600" y1="100" x2="100" y2="900" stroke="#1a8a4a" strokeWidth="0.5" />
        <line x1="600" y1="200" x2="200" y2="900" stroke="#1a8a4a" strokeWidth="0.5" />
        <circle cx="500" cy="200" r="120" stroke="#1a8a4a" strokeWidth="0.5" fill="none" />
        <circle cx="500" cy="200" r="80" stroke="#1a8a4a" strokeWidth="0.5" fill="none" />
      </svg>

      <div style={{ maxWidth: 900, position: 'relative', zIndex: 1 }}>
        {/* Eyebrow */}
        <div className="animate-fade-up delay-1" style={{
          display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40,
        }}>
          <div style={{ width: 40, height: 1, background: 'var(--gold)' }} />
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 4,
            textTransform: 'uppercase', color: 'var(--gold)',
          }}>{data.company.tagline}</span>
        </div>

        {/* Title */}
        <h1 className="animate-fade-up delay-2" style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(52px, 9vw, 130px)',
          fontWeight: 300, lineHeight: 1.0,
          color: 'var(--white)',
          marginBottom: 0,
        }}>
          {data.hero.title}
        </h1>
        <h1 className="animate-fade-up delay-3" style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(52px, 9vw, 130px)',
          fontWeight: 600, fontStyle: 'italic', lineHeight: 1.0,
          background: 'linear-gradient(120deg, #1a8a4a, #25b865, #1a8a4a)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          animation: 'shimmer 4s linear infinite, fadeUp 0.8s 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards',
          opacity: 0,
          marginBottom: 40,
        }}>
          {data.hero.subtitle}
        </h1>

        {/* Description */}
        <p className="animate-fade-up delay-4" style={{
          fontSize: 'clamp(15px, 1.5vw, 18px)',
          color: 'var(--white-dim)', maxWidth: 540,
          lineHeight: 1.9, marginBottom: 56,
        }}>
          {data.hero.description}
        </p>

        {/* CTAs */}
        <div className="animate-fade-up delay-5" style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <button onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })} style={{
            background: 'linear-gradient(135deg, #1a8a4a, #136b38)',
            border: 'none', color: '#ffffff', cursor: 'pointer',
            fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500,
            letterSpacing: 2, textTransform: 'uppercase',
            padding: '16px 36px', borderRadius: 2,
            transition: 'all 0.3s', boxShadow: '0 0 40px rgba(26,138,74,0.2)',
          }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 60px rgba(26,138,74,0.4)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 40px rgba(26,138,74,0.2)'}
          >{data.hero.cta}</button>
          <button onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })} style={{
            background: 'none', border: '1px solid rgba(26,26,46,0.3)',
            color: 'var(--white-dim)', cursor: 'pointer',
            fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 400,
            letterSpacing: 2, textTransform: 'uppercase',
            padding: '16px 36px', borderRadius: 2,
            transition: 'all 0.3s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(26,26,46,0.3)'; e.currentTarget.style.color = 'var(--white-dim)'; }}
          >{data.hero.cta2}</button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        animation: 'float 2.5s ease-in-out infinite',
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 3, color: 'var(--white-faint)', textTransform: 'uppercase' }}>Scroll</span>
        <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, var(--gold), transparent)' }} />
      </div>
    </section>
  );
}

// ─── Stats ───────────────────────────────────────────────────────────────────
function Stats({ data }) {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} style={{
      padding: '60px 4vw',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      background: 'var(--bg2)',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 1,
      }}>
        {data.stats.map((s, i) => (
          <div key={i} style={{
            padding: '32px 24px', textAlign: 'center',
            borderRight: i < 3 ? '1px solid var(--border)' : 'none',
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : 'translateY(20px)',
            transition: `all 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.1}s`,
          }}>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 600,
              color: 'var(--gold)', lineHeight: 1,
            }}>{s.value}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--white-dim)', marginTop: 8, textTransform: 'uppercase' }}>{s.label}</div>
          </div>
        ))}
      </div>
      <style>{`@media(max-width:600px){div[style*="repeat(4, 1fr)"]{grid-template-columns:repeat(2,1fr)!important}}`}</style>
    </section>
  );
}

// ─── Services ────────────────────────────────────────────────────────────────
function Services({ data }) {
  const [ref, inView] = useInView();
  const [active, setActive] = useState(null);

  return (
    <section id="services" ref={ref} style={{ padding: '120px 4vw', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ marginBottom: 80, opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(30px)', transition: 'all 0.7s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{ width: 40, height: 1, background: 'var(--gold)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 4, color: 'var(--gold)', textTransform: 'uppercase' }}>Our Services</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 300, lineHeight: 1.1, color: 'var(--white)', maxWidth: 600 }}>
            Complete <em style={{ fontStyle: 'italic', fontWeight: 600 }}>solutions</em> for your challenges
          </h2>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          {data.services.map((s, i) => (
            <div key={s.id}
              onMouseEnter={() => setActive(s.id)}
              onMouseLeave={() => setActive(null)}
              style={{
                padding: '48px', cursor: 'default',
                background: active === s.id ? 'var(--bg3)' : 'var(--bg2)',
                border: '1px solid',
                borderColor: active === s.id ? 'var(--border)' : 'transparent',
                transition: 'all 0.3s ease',
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : 'translateY(40px)',
                transitionDelay: `${i * 0.1 + 0.2}s`,
              }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 28,
                color: active === s.id ? 'var(--gold)' : 'rgba(26,138,74,0.4)',
                marginBottom: 24, transition: 'color 0.3s',
              }}>{s.icon}</div>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 400,
                color: 'var(--white)', marginBottom: 16, lineHeight: 1.2,
              }}>{s.title}</h3>
              <p style={{ color: 'var(--white-dim)', fontSize: 15, lineHeight: 1.8, marginBottom: 28 }}>{s.description}</p>
              <ul style={{ listStyle: 'none' }}>
                {s.items.map((item, j) => (
                  <li key={j} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    color: 'var(--white-dim)', fontSize: 13,
                    padding: '6px 0',
                    borderTop: j === 0 ? '1px solid var(--white-faint)' : 'none',
                  }}>
                    <span style={{ color: 'var(--gold)', fontSize: 8 }}>◆</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){div[style*="repeat(2, 1fr)"]{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

// ─── Expertises ──────────────────────────────────────────────────────────────
function Expertises({ data }) {
  const [ref, inView] = useInView();
  return (
    <section id="expertises" ref={ref} style={{
      padding: '120px 4vw',
      background: 'var(--bg2)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(26,138,74,0.05) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center',
        }}>
          {/* Left */}
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(-40px)', transition: 'all 0.8s ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <div style={{ width: 40, height: 1, background: 'var(--gold)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 4, color: 'var(--gold)', textTransform: 'uppercase' }}>Tech Stack</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 4vw, 64px)', fontWeight: 300, lineHeight: 1.1, color: 'var(--white)', marginBottom: 24 }}>
              Mastery of <em style={{ fontStyle: 'italic', fontWeight: 600 }}>cutting-edge</em> technologies
            </h2>
            <p style={{ color: 'var(--white-dim)', fontSize: 16, lineHeight: 1.9 }}>
              Our teams command a broad technology spectrum to deliver the most adapted solutions for your challenges — with no lock-in to any single vendor or stack.
            </p>
          </div>

          {/* Right - Tags */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 12,
            opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(40px)',
            transition: 'all 0.8s ease 0.2s',
          }}>
            {data.expertises.map((tech, i) => (
              <div key={i} style={{
                border: '1px solid var(--border)',
                padding: '10px 20px', borderRadius: 2,
                fontFamily: 'var(--font-mono)', fontSize: 13,
                color: 'var(--white-dim)',
                background: 'rgba(26,138,74,0.04)',
                transition: 'all 0.2s',
                cursor: 'default',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--gold)';
                  e.currentTarget.style.color = 'var(--gold)';
                  e.currentTarget.style.background = 'var(--gold-dim)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.color = 'var(--white-dim)';
                  e.currentTarget.style.background = 'rgba(26,138,74,0.04)';
                }}
              >{tech}</div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){div[style*="1fr 1fr"]{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

// ─── About ───────────────────────────────────────────────────────────────────
function About({ data }) {
  const [ref, inView] = useInView();
  return (
    <section id="about" ref={ref} style={{ padding: '120px 4vw', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(30px)', transition: 'all 0.7s ease', marginBottom: 80 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{ width: 40, height: 1, background: 'var(--gold)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 4, color: 'var(--gold)', textTransform: 'uppercase' }}>About</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 4vw, 64px)', fontWeight: 300, lineHeight: 1.1, color: 'var(--white)' }}>
              {data.about.title}
            </h2>
            <p style={{ color: 'var(--white-dim)', fontSize: 16, lineHeight: 1.9, paddingTop: 8 }}>
              {data.about.description}
            </p>
          </div>
        </div>

        {/* Values */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
          {data.about.values.map((v, i) => (
            <div key={i} style={{
              padding: '48px 40px',
              background: 'var(--bg2)',
              borderTop: '2px solid var(--gold)',
              opacity: inView ? 1 : 0,
              transform: inView ? 'none' : 'translateY(30px)',
              transition: `all 0.6s ease ${i * 0.15 + 0.3}s`,
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 3, color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 20 }}>0{i+1}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 400, color: 'var(--white)', marginBottom: 16 }}>{v.title}</h3>
              <p style={{ color: 'var(--white-dim)', fontSize: 15, lineHeight: 1.8 }}>{v.description}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media(max-width:768px){
          div[style*="1fr 1fr"]{grid-template-columns:1fr!important}
          div[style*="repeat(3, 1fr)"]{grid-template-columns:1fr!important}
        }
      `}</style>
    </section>
  );
}

// ─── Early Access ─────────────────────────────────────────────────────────────
function EarlyAccess({ data }) {
  const [ref, inView] = useInView();
  const items = data['early access: Be the first to experience Skalean'] || [];
  return (
    <section ref={ref} style={{ padding: '120px 4vw', background: 'var(--bg2)', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 80, opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(30px)', transition: 'all 0.7s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{ width: 40, height: 1, background: 'var(--gold)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 4, color: 'var(--gold)', textTransform: 'uppercase' }}>Early Access</span>
            <div style={{ width: 40, height: 1, background: 'var(--gold)' }} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 300, color: 'var(--white)' }}>
            Be the first to <em style={{ fontStyle: 'italic', fontWeight: 600 }}>experience Skalean</em>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {items.map((item, i) => (
            <div key={i} style={{
              padding: '40px',
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 2,
              borderTop: '2px solid var(--gold)',
              opacity: inView ? 1 : 0,
              transform: inView ? 'none' : 'translateY(30px)',
              transition: `all 0.6s ease ${i * 0.15 + 0.2}s`,
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 3, color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 20 }}>0{i + 1}</div>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 400,
                color: 'var(--white)', lineHeight: 1.3, marginBottom: 16,
              }}>{item.label}</h3>
              <p style={{ color: 'var(--white-dim)', fontSize: 15, lineHeight: 1.8 }}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){div[style*="repeat(3, 1fr)"]{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────
function Contact({ data }) {
  const [ref, inView] = useInView();
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleSend = (e) => {
    e.preventDefault();
    setStatus('sending');
    const formData = new FormData(formRef.current);
    fetch('https://formsubmit.co/ajax/' + data.company.email, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(Object.fromEntries(formData)),
    }).then((res) => {
      if (res.ok) {
        setStatus('sent');
        formRef.current.reset();
      } else {
        setStatus('error');
      }
      setTimeout(() => setStatus('idle'), 4000);
    }).catch(() => {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    });
  };

  return (
    <section id="contact" ref={ref} style={{ padding: '120px 4vw', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '60vw', height: '60vw', maxWidth: 800,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(26,138,74,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 72, opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(30px)', transition: 'all 0.7s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{ width: 40, height: 1, background: 'var(--gold)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 4, color: 'var(--gold)', textTransform: 'uppercase' }}>Contact</span>
            <div style={{ width: 40, height: 1, background: 'var(--gold)' }} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 300, color: 'var(--white)', lineHeight: 1.1, marginBottom: 20 }}>
            Let's talk about your <em style={{ fontStyle: 'italic', fontWeight: 600 }}>project</em>
          </h2>
          <p style={{ color: 'var(--white-dim)', fontSize: 16 }}>
            We respond to all inquiries within 24 hours.
          </p>
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSend} style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(30px)', transition: 'all 0.7s ease 0.2s' }}>
          <input type="hidden" name="_subject" value="New message from Skalean" />
          <input type="hidden" name="_captcha" value="false" />
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--gold)', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>Name</label>
            <input
              type="text" name="from_name" required
              style={{
                width: '100%', background: 'var(--bg2)', border: '1px solid var(--border)',
                color: 'var(--white)', fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 300,
                padding: '14px 20px', borderRadius: 2, outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--gold)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--gold)', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>Email</label>
            <input
              type="email" name="from_email" required
              style={{
                width: '100%', background: 'var(--bg2)', border: '1px solid var(--border)',
                color: 'var(--white)', fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 300,
                padding: '14px 20px', borderRadius: 2, outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--gold)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2, color: 'var(--gold)', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>Message</label>
            <textarea
              rows={6} name="message" required
              style={{
                width: '100%', background: 'var(--bg2)', border: '1px solid var(--border)',
                color: 'var(--white)', fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 300,
                padding: '14px 20px', borderRadius: 2, outline: 'none', resize: 'vertical',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--gold)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>

          <button type="submit" style={{
            width: '100%', marginTop: 16,
            background: 'linear-gradient(135deg, #1a8a4a, #136b38)',
            border: 'none', color: '#ffffff', cursor: 'pointer',
            fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500,
            letterSpacing: 2, textTransform: 'uppercase',
            padding: '18px', borderRadius: 2,
            transition: 'all 0.3s', boxShadow: '0 0 40px rgba(26,138,74,0.15)',
          }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 60px rgba(26,138,74,0.35)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 40px rgba(26,138,74,0.15)'}
          disabled={status === 'sending'}
          >{status === 'sending' ? 'Sending...' : status === 'sent' ? '✓ Message sent!' : status === 'error' ? 'Error, please retry' : 'Send message'}</button>
        </form>

        {/* Contact info */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 48, marginTop: 64, flexWrap: 'wrap',
          opacity: inView ? 1 : 0, transition: 'all 0.7s ease 0.4s',
        }}>
          {[
            { label: 'Email', value: data.company.email },
            { label: 'Phone', value: data.company.phone },
            { label: 'Location', value: data.company.location },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 3, color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 8 }}>{item.label}</div>
              <div style={{ color: 'var(--white-dim)', fontSize: 14 }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer({ data }) {
  return (
    <footer style={{
      padding: '40px 4vw',
      borderTop: '1px solid var(--border)',
      background: 'var(--bg)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: 16,
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 10,
        padding: '4px 10px',
      }}>
        <img src="/logo.png" alt="Skalean" style={{ height: 32, display: 'block', borderRadius: 6 }} />
      </div>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--white-dim)', letterSpacing: 1 }}>
        © {new Date().getFullYear()} Skalean — All rights reserved
      </span>
    </footer>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data.json')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <div style={{
        width: 40, height: 40,
        background: 'linear-gradient(135deg, #1a8a4a, #136b38)',
        clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
        animation: 'rotateSlow 2s linear infinite',
      }} />
    </div>
  );

  if (!data) return <div style={{ color: 'red', padding: 40 }}>Error loading data.</div>;

  return (
    <>
      <Navbar data={data} />
      <Hero data={data} />
      <Stats data={data} />
      <Services data={data} />
      <Expertises data={data} />
      <About data={data} />
      <EarlyAccess data={data} />
      <Contact data={data} />
      <Footer data={data} />
    </>
  );
}
