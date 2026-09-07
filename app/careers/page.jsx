'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const blurFadeIn = {
  hidden: { opacity: 0, filter: 'blur(10px)', y: 25 },
  visible: (custom = 0) => ({
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: {
      duration: 0.75,
      delay: custom * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function CareersPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);

  const [applyForm, setApplyForm] = useState({
    name: '',
    email: '',
    phone: '',
    portfolio: '',
    experience: '2 - 4 Years',
    coverNote: '',
  });
  const [applySubmitted, setApplySubmitted] = useState(false);

  // Custom Animated Blinking Eyes Cursor State
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [pupilOffset, setPupilOffset] = useState({ x: 3, y: 6 });
  const [cursorHovered, setCursorHovered] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    let prevX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
    let prevY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;

    const updateMouse = (e) => {
      const curX = e.clientX;
      const curY = e.clientY;
      const dx = curX - prevX;
      const dy = curY - prevY;
      prevX = curX;
      prevY = curY;

      setMousePosition({ x: curX, y: curY });

      const moveNormX = Math.max(-1, Math.min(1, dx / 6));
      const moveNormY = Math.max(-1, Math.min(1, dy / 6));

      const vpNormX = ((curX / (window.innerWidth || 1)) - 0.5) * 2;
      const vpNormY = ((curY / (window.innerHeight || 1)) - 0.5) * 2;

      const combinedX = Math.max(-1, Math.min(1, moveNormX * 0.75 + vpNormX * 0.45));
      const combinedY = Math.max(-1, Math.min(1, moveNormY * 0.75 + vpNormY * 0.45));

      setPupilOffset({
        x: 2.5 + combinedX * 4.8,
        y: 5.5 + combinedY * 6.8,
      });
    };
    window.addEventListener('mousemove', updateMouse);

    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
        if (Math.random() > 0.65) {
          setTimeout(() => {
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 120);
          }, 160);
        }
      }, 150);
    }, 3600);

    return () => {
      window.removeEventListener('mousemove', updateMouse);
      clearInterval(blinkInterval);
    };
  }, []);

  const openRoles = [
    {
      id: 'meta-media-buyer',
      title: 'Senior Meta Media Buyer (DTC & E-Com)',
      type: 'Full-time • 100% Remote',
      salary: '$40k - $70k / yr + Performance Bonus',
      department: 'Media Buying',
      reqs: ['Managed $50k+/mo profitable ad spend', 'Deep understanding of ASC, DCT & creative testing', 'Proficient in CAPI & Triple Whale analytics'],
    },
    {
      id: 'ugc-creative-editor',
      title: 'Direct-Response UGC Video Editor & Hook Creator',
      type: 'Full-time • 100% Remote',
      salary: '$30k - $50k / yr + Creative Bonuses',
      department: 'Creative Lab',
      reqs: ['Premiere Pro / CapCut speed wizard', 'Obsessed with TikTok / Reels viral ad hooks', 'Portfolio demonstrating high-CTR video assets'],
    },
    {
      id: 'cro-funnel-designer',
      title: 'Full-Stack CRO & Next.js Funnel Engineer',
      type: 'Full-time • 100% Remote',
      salary: '$45k - $75k / yr',
      department: 'Engineering & CRO',
      reqs: ['Shopify Liquid / Next.js landing page mastery', 'Heatmap & A/B testing experiment tracking', 'Figma design to responsive code in record time'],
    },
    {
      id: 'growth-account-strategist',
      title: 'Growth Strategist & Client Account Lead',
      type: 'Full-time • 100% Remote',
      salary: '$50k - $80k / yr + Retainer Profit Share',
      department: 'Client Strategy',
      reqs: ['3+ years in top tier DTC performance agency', 'Flawless communication & client retention skills', 'Data analysis to build quarterly scaling roadmaps'],
    },
  ];

  const handleApplySubmit = (e) => {
    e.preventDefault();
    setApplySubmitted(true);
    setTimeout(() => {
      setApplyModalOpen(false);
      setApplySubmitted(false);
      setApplyForm({ name: '', email: '', phone: '', portfolio: '', experience: '2 - 4 Years', coverNote: '' });
    }, 2800);
  };

  return (
    <div
      onMouseEnter={() => setCursorHovered(false)}
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#000000',
        color: '#ffffff',
        overflowX: 'hidden',
      }}
    >
      {/* Animated Blinking Eyes Cursor */}
      {isClient && (
        <motion.div
          className="custom-eyes-cursor"
          animate={{ x: mousePosition.x - 17, y: mousePosition.y - 14, scale: cursorHovered ? 1.2 : 1 }}
          transition={{ type: 'spring', damping: 28, stiffness: 420, mass: 0.12 }}
          style={{ position: 'fixed', top: 0, left: 0, display: 'flex', alignItems: 'center', gap: '3px', pointerEvents: 'none', zIndex: 99999 }}
        >
          <motion.div animate={{ scaleY: isBlinking ? 0.08 : 1 }} transition={{ duration: 0.09 }} style={{ width: '16px', height: '26px', backgroundColor: '#fff', borderRadius: '13px', position: 'relative', boxShadow: '0 3px 12px rgba(0,0,0,0.7)' }}>
            <motion.div animate={{ x: pupilOffset.x, y: pupilOffset.y }} transition={{ type: 'spring', damping: 20, stiffness: 400, mass: 0.08 }} style={{ position: 'absolute', top: 0, left: 0, width: '11px', height: '15px', backgroundColor: '#000', borderRadius: '50%' }}>
              <div style={{ position: 'absolute', bottom: '3px', right: '3px', width: '2.5px', height: '2.5px', backgroundColor: '#fff', borderRadius: '50%' }} />
            </motion.div>
          </motion.div>
          <motion.div animate={{ scaleY: isBlinking ? 0.08 : 1 }} transition={{ duration: 0.09 }} style={{ width: '16px', height: '26px', backgroundColor: '#fff', borderRadius: '13px', position: 'relative', boxShadow: '0 3px 12px rgba(0,0,0,0.7)' }}>
            <motion.div animate={{ x: pupilOffset.x, y: pupilOffset.y }} transition={{ type: 'spring', damping: 20, stiffness: 400, mass: 0.08 }} style={{ position: 'absolute', top: 0, left: 0, width: '11px', height: '15px', backgroundColor: '#000', borderRadius: '50%' }}>
              <div style={{ position: 'absolute', bottom: '3px', right: '3px', width: '2.5px', height: '2.5px', backgroundColor: '#fff', borderRadius: '50%' }} />
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }} className="bg-ambient-top" />

      {/* Floating Navbar */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{ position: 'fixed', top: '20px', left: 0, right: 0, margin: '0 auto', width: 'calc(100% - 40px)', maxWidth: '1100px', zIndex: 100 }}
      >
        <div className="glass-nav" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', borderRadius: '9999px' }}>
          <Link href="/" onMouseEnter={() => setCursorHovered(true)} onMouseLeave={() => setCursorHovered(false)} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: '#fff' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px',
                boxShadow: '0 2px 10px rgba(37, 99, 235, 0.35)',
              }}
            >
              <img
                src="/gda_logo.png"
                alt="GDAs Logo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </div>
            <span style={{ fontWeight: 800, fontSize: '18px', color: '#fff', letterSpacing: '-0.02em' }}>GDAs<span style={{ color: '#3b82f6' }}>.</span></span>
          </Link>

          <nav style={{ display: 'flex', alignItems: 'center', gap: '26px' }} className="desktop-nav">
            <Link href="/" onMouseEnter={() => setCursorHovered(true)} onMouseLeave={() => setCursorHovered(false)} style={{ fontSize: '13.5px', fontWeight: 500, color: '#a3a3a3', textDecoration: 'none' }}>Home</Link>
            <Link href="/about" onMouseEnter={() => setCursorHovered(true)} onMouseLeave={() => setCursorHovered(false)} style={{ fontSize: '13.5px', fontWeight: 500, color: '#a3a3a3', textDecoration: 'none' }}>About</Link>
            <Link href="/#services" onMouseEnter={() => setCursorHovered(true)} onMouseLeave={() => setCursorHovered(false)} style={{ fontSize: '13.5px', fontWeight: 500, color: '#a3a3a3', textDecoration: 'none' }}>Services</Link>
            <Link href="/training" onMouseEnter={() => setCursorHovered(true)} onMouseLeave={() => setCursorHovered(false)} style={{ fontSize: '13.5px', fontWeight: 500, color: '#a3a3a3', textDecoration: 'none' }}>Training</Link>
            <Link href="/blog" onMouseEnter={() => setCursorHovered(true)} onMouseLeave={() => setCursorHovered(false)} style={{ fontSize: '13.5px', fontWeight: 500, color: '#a3a3a3', textDecoration: 'none' }}>Blog</Link>
            <Link href="/careers" onMouseEnter={() => setCursorHovered(true)} onMouseLeave={() => setCursorHovered(false)} style={{ fontSize: '13.5px', fontWeight: 700, color: '#3b82f6', textDecoration: 'none' }}>Careers</Link>
          </nav>

          <a href="#open-roles" className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '12.5px', fontWeight: 700, textDecoration: 'none' }}>
            View Roles →
          </a>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section style={{ paddingTop: '155px', paddingBottom: '60px', position: 'relative' }}>
        <div className="container-custom" style={{ textAlign: 'center' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={blurFadeIn} style={{ display: 'inline-flex', marginBottom: '20px' }}>
            <div className="pill-badge pill-badge-orange">
              <span className="pulse-dot" />
              <span>We're Hiring • 100% Remote Global Roles</span>
            </div>
          </motion.div>

          <motion.h1 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={blurFadeIn} custom={1} style={{ fontSize: 'clamp(34px, 5vw, 62px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.035em', maxWidth: '850px', margin: '0 auto 20px auto' }}>
            Build the future of paid media with <span className="serif-italic" style={{ color: '#3b82f6' }}>high-agency talent</span>.
          </motion.h1>

          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={blurFadeIn} custom={2} style={{ fontSize: '16px', color: '#a3a3a3', maxWidth: '640px', margin: '0 auto 40px auto', lineHeight: 1.6 }}>
            Join a tight-knit squad of growth engineers, direct-response video editors, and media buyers managing high-octane campaigns across the globe.
          </motion.p>

          {/* Perks Grid */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={blurFadeIn} custom={3} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginTop: '20px' }}>
            {[
              { title: '100% Remote First', desc: 'Work from anywhere in the world on flexible hours.', icon: '🌍' },
              { title: 'Performance Profit Share', desc: 'Direct cash bonuses tied to client ad account scale.', icon: '💰' },
              { title: 'High Creative Autonomy', desc: 'No micro-management. Own your campaigns & tests.', icon: '⚡' },
              { title: 'Elite Learning Budget', desc: 'Access to any masterclass, course, or tool you need.', icon: '📚' },
            ].map((perk, idx) => (
              <div key={idx} style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '22px 18px', textAlign: 'left' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{perk.icon}</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>{perk.title}</div>
                <div style={{ fontSize: '12px', color: '#888' }}>{perk.desc}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Open Roles Section */}
      <section id="open-roles" className="section-spacing" style={{ background: '#050505', paddingTop: '60px', paddingBottom: '90px' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px auto' }}>
            <div className="section-tag">Open Positions</div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
              Current <span className="serif-italic" style={{ color: '#3b82f6' }}>Opportunities</span>.
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {openRoles.map((role, idx) => (
              <motion.div
                key={role.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={blurFadeIn}
                custom={idx}
                whileHover={{ borderColor: 'rgba(37,99,235,0.5)', y: -2 }}
                style={{
                  background: 'linear-gradient(135deg, #0a0a0a 0%, #111 100%)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '20px',
                  padding: '28px 30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '20px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#60a5fa', background: 'rgba(37,99,235,0.14)', border: '1px solid rgba(37,99,235,0.3)', padding: '4px 10px', borderRadius: '50px' }}>{role.department}</span>
                    <span style={{ fontSize: '12px', color: '#888' }}>{role.type}</span>
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>{role.title}</h3>
                  <div style={{ fontSize: '13px', color: '#10b981', fontWeight: 600, marginBottom: '12px' }}>{role.salary}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {role.reqs.map((req, rIdx) => (
                      <span key={rIdx} style={{ fontSize: '11.5px', color: '#888', background: 'rgba(255,255,255,0.04)', padding: '3px 10px', borderRadius: '6px' }}>✓ {req}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => { setSelectedRole(role); setApplyModalOpen(true); }}
                    onMouseEnter={() => setCursorHovered(true)}
                    onMouseLeave={() => setCursorHovered(false)}
                    className="btn btn-primary"
                    style={{ padding: '12px 24px', fontSize: '13.5px', fontWeight: 700 }}
                  >
                    Apply for Role →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.08)', background: '#050505', padding: '50px 0 30px 0' }}>
        <div className="container-custom">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px', paddingBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: '#fff' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '7px',
                  background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '3px',
                  boxShadow: '0 2px 8px rgba(37, 99, 235, 0.3)',
                }}
              >
                <img
                  src="/gda_logo.png"
                  alt="GDAs Logo"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </div>
              <span style={{ fontWeight: 800, fontSize: '16px' }}>GDAs<span style={{ color: '#3b82f6' }}>.</span></span>
            </Link>

            <div style={{ display: 'flex', gap: '20px', fontSize: '13px', flexWrap: 'wrap' }}>
              <Link href="/" style={{ color: '#888', textDecoration: 'none' }}>Home</Link>
              <Link href="/about" style={{ color: '#888', textDecoration: 'none' }}>About</Link>
              <Link href="/#services" style={{ color: '#888', textDecoration: 'none' }}>Services</Link>
              <Link href="/training" style={{ color: '#888', textDecoration: 'none' }}>Training</Link>
              <Link href="/blog" style={{ color: '#888', textDecoration: 'none' }}>Blog</Link>
              <Link href="/careers" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 600 }}>Careers</Link>
              <Link href="/privacy-policy" style={{ color: '#888', textDecoration: 'none' }}>Privacy Policy</Link>
              <Link href="/refund-policy" style={{ color: '#888', textDecoration: 'none' }}>Refund Policy</Link>
              <Link href="/terms-conditions" style={{ color: '#888', textDecoration: 'none' }}>Terms & Conditions</Link>
              <Link href="/disclaimer" style={{ color: '#888', textDecoration: 'none' }}>Disclaimer</Link>
            </div>
          </div>

          <div style={{ paddingTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: '#555', flexWrap: 'wrap', gap: '10px' }}>
            <div>© {new Date().getFullYear()} GDAs (Ganesha Digital Ads). All rights reserved.</div>
            <div style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10b981' }} />
              <span>Hiring portals active</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Apply Modal */}
      <AnimatePresence>
        {applyModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-overlay" onClick={() => setApplyModalOpen(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
              <button onClick={() => setApplyModalOpen(false)} style={{ position: 'absolute', top: '18px', right: '18px', background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '20px' }}>✕</button>

              {applySubmitted ? (
                <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(37,99,235,0.15)', color: '#60a5fa', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px auto' }}>✓</div>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Application Received!</h3>
                  <p style={{ fontSize: '13px', color: '#a3a3a3' }}>Our growth team will review your portfolio and reach out via email within 48 hours.</p>
                </div>
              ) : (
                <div>
                  <div className="pill-badge pill-badge-orange" style={{ marginBottom: '10px' }}>
                    <span className="pulse-dot" />
                    <span>{selectedRole?.department || 'Career Opportunity'}</span>
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                    Apply: <span className="serif-italic">{selectedRole?.title}</span>
                  </h3>
                  <p style={{ fontSize: '12.5px', color: '#888', marginBottom: '18px' }}>Direct application to the founding growth team.</p>

                  <form onSubmit={handleApplySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a3a3a3', marginBottom: '4px' }}>Full Name</label>
                      <input type="text" required placeholder="e.g. Alex Morgan" value={applyForm.name} onChange={(e) => setApplyForm({ ...applyForm, name: e.target.value })} style={{ width: '100%', background: '#141414', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '13px', outline: 'none' }} />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a3a3a3', marginBottom: '4px' }}>Email Address</label>
                      <input type="email" required placeholder="alex@gmail.com" value={applyForm.email} onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })} style={{ width: '100%', background: '#141414', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '13px', outline: 'none' }} />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a3a3a3', marginBottom: '4px' }}>Portfolio / LinkedIn / Work Links</label>
                      <input type="url" required placeholder="https://linkedin.com/in/... or drive link" value={applyForm.portfolio} onChange={(e) => setApplyForm({ ...applyForm, portfolio: e.target.value })} style={{ width: '100%', background: '#141414', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '13px', outline: 'none' }} />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a3a3a3', marginBottom: '4px' }}>Years of Experience</label>
                      <select value={applyForm.experience} onChange={(e) => setApplyForm({ ...applyForm, experience: e.target.value })} style={{ width: '100%', background: '#141414', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '13px', outline: 'none' }}>
                        <option value="1 - 2 Years">1 - 2 Years</option>
                        <option value="2 - 4 Years">2 - 4 Years</option>
                        <option value="5+ Years">5+ Years (Senior Lead)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a3a3a3', marginBottom: '4px' }}>Why are you a fit for this role?</label>
                      <textarea rows={3} placeholder="Briefly describe your most successful ad campaign or video project..." value={applyForm.coverNote} onChange={(e) => setApplyForm({ ...applyForm, coverNote: e.target.value })} style={{ width: '100%', background: '#141414', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '13px', outline: 'none', resize: 'none' }} />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ marginTop: '6px', padding: '12px', fontSize: '14px', fontWeight: 700 }}>
                      Submit Application →
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
        }
        @media (pointer: coarse) {
          .custom-eyes-cursor { display: none !important; }
        }
      `}</style>
    </div>
  );
}
