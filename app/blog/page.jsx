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

export default function BlogPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);

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

  const blogCategories = ['All', 'Paid Ads Strategy', 'Meta Scaling', 'Creative UGC', 'Funnel CRO', 'Attribution & CAPI'];

  const blogPosts = [
    {
      id: 1,
      title: 'The 2026 Meta Ads Algorithm Playbook: How We Scale Brands Beyond $100k/Month',
      category: 'Meta Scaling',
      readTime: '6 min read',
      date: 'Sept 4, 2026',
      author: 'Niraj Sharma',
      authorRole: 'Founder & Head of Growth',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80',
      excerpt: 'Broad targeting is dead without creative diversification. Discover the exact 3-tier Advantage+ campaign hierarchy that consistently delivers 5.2x+ ROAS in 2026.',
      content: `The paid media landscape in 2026 demands a complete reimagining of campaign architectures. 

Gone are the days of hyper-granular interest targeting and manual micro-adjustments. Today, machine learning algorithms thrive on broad creative signals, clean data feeds, and high-frequency creative iteration.

### Key Takeaways from Our Live $250k/Month Ad Spend:
1. **The Creative is the New Targeting**: Rather than guessing interest stacks, let your video hook define who stops and watches.
2. **Dynamic Creative (DCT) Sprints**: Test 3 Hooks x 2 Bodies x 2 CTAs every Tuesday to identify viral winners.
3. **CAPI Data Enrichment**: Send enhanced CRM data back to Meta to teach the algorithm your highest Lifetime Value (LTV) buyer profiles.`,
    },
    {
      id: 2,
      title: 'Direct-Response UGC Secrets: 7 Hook Formulas That Stop The Scroll Instantly',
      category: 'Creative UGC',
      readTime: '4 min read',
      date: 'Aug 29, 2026',
      author: 'Aryan Verma',
      authorRole: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
      excerpt: '80% of video ad drop-off happens within the first 2.5 seconds. Learn the psychological visual hooks our creators use to achieve 45%+ hook rates.',
      content: `Your media buying cannot fix a boring 3-second hook. Direct-response creative is the #1 lever for lowering Cost Per Acquisition (CPA).

### Our Top 3 Performing Hook Blueprints:
- **The 'Polarizing Contrarian'**: "Stop buying X until you understand why 90% of brands hide this ingredient."
- **The 'High-Velocity ASMR Demo'**: Immediate sound and motion without spoken intro to capture visual curiosity.
- **The 'Problem-First Reframe'**: Start directly with the raw customer pain point in a phone-shot native UGC setting.`,
    },
    {
      id: 3,
      title: 'Server-Side CAPI: Why Browser Pixels Are Losing 35% of Your Purchases',
      category: 'Attribution & CAPI',
      readTime: '5 min read',
      date: 'Aug 22, 2026',
      author: 'Karan Mehra',
      authorRole: 'Data Architect',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
      excerpt: 'How ad-blockers and privacy updates blind your ad account—and the simple server-side setup to reclaim 100% attribution accuracy.',
      content: `If your Meta pixel relies solely on client-side browser events, you are burning ad spend on blind optimizations.

Ad blockers, iOS Safari ITP (Intelligent Tracking Prevention), and network latency wipe out nearly 30-40% of standard checkout events before they reach Meta's optimization engine.

Deploying server-side Google Tag Manager (sGTM) with first-party cookie domains restores signal fidelity, leading to immediate 20-30% drops in blended CPA.`,
    },
    {
      id: 4,
      title: 'Landing Page Anatomy: How We Doubled a DTC Brand’s Conversion Rate from 1.8% to 4.1%',
      category: 'Funnel CRO',
      readTime: '7 min read',
      date: 'Aug 14, 2026',
      author: 'Devika Patel',
      authorRole: 'Lead Media Buyer',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
      excerpt: 'A complete breakdown of our high-converting advertorial and listicle landing page layouts that turn skeptical cold traffic into buyers.',
      content: `Doubling your conversion rate cuts your customer acquisition cost in half without spending an extra dime on ads.

### Crucial Mobile CRO Adjustments:
- **Sticky Buy Bar with Micro-Ratings**: Keep the add-to-cart CTA within thumb reach at all times.
- **Visual Comparison Matrix**: Show clearly why your product defeats cheap alternatives.
- **Pre-Purchase Friction Killers**: Free shipping countdowns, 60-day money-back guarantee badges, and instant checkout toggles.`,
    },
    {
      id: 5,
      title: 'Scaling from $10k to $150k/Month: The Unit Economics Framework Every Founder Needs',
      category: 'Paid Ads Strategy',
      readTime: '5 min read',
      date: 'Aug 05, 2026',
      author: 'Niraj Sharma',
      authorRole: 'Founder & Head of Growth',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80',
      excerpt: 'Why most e-commerce brands break when scaling budgets and the contribution margin benchmarks you must monitor daily.',
      content: `Scale is not about how high your frontend ROAS is; it is about how much net contribution margin remains after COGS, ad spend, and fulfillment.

Before scaling past $500/day, ensure your Break-Even ROAS is mapped, Average Order Value (AOV) is optimized with bundles, and 60-day repeat purchase rate exceeds 25%.`,
    },
    {
      id: 6,
      title: 'Google PMax vs Search: When and How to Allocate Your Search Ad Budget',
      category: 'Paid Ads Strategy',
      readTime: '6 min read',
      date: 'Jul 28, 2026',
      author: 'Karan Mehra',
      authorRole: 'Data Architect',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
      excerpt: 'Performance Max can waste budget on brand search cannibalization unless configured properly with negative brand lists and asset groups.',
      content: `Google Performance Max is exceptionally powerful, but only when fed clean audience signals and insulated against branded search cannibalization.

Learn how to separate pure cold acquisition PMax campaigns from high-intent exact match search capture to maximize net new customer acquisition.`,
    },
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCat = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

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
          <Link href="/" onMouseEnter={() => setCursorHovered(true)} onMouseLeave={() => setCursorHovered(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#fff' }}>
            <img
              src="/gda_logo.png"
              alt="GDAs Logo"
              style={{
                height: '36px',
                width: 'auto',
                objectFit: 'contain',
                borderRadius: '6px',
              }}
            />
            <span style={{ fontWeight: 800, fontSize: '18px', color: '#fff' }}>GDAs<span style={{ color: '#3b82f6' }}>.</span></span>
          </Link>

          <nav style={{ display: 'flex', alignItems: 'center', gap: '26px' }} className="desktop-nav">
            <Link href="/" onMouseEnter={() => setCursorHovered(true)} onMouseLeave={() => setCursorHovered(false)} style={{ fontSize: '13.5px', fontWeight: 500, color: '#a3a3a3', textDecoration: 'none' }}>Home</Link>
            <Link href="/about" onMouseEnter={() => setCursorHovered(true)} onMouseLeave={() => setCursorHovered(false)} style={{ fontSize: '13.5px', fontWeight: 500, color: '#a3a3a3', textDecoration: 'none' }}>About</Link>
            <Link href="/#services" onMouseEnter={() => setCursorHovered(true)} onMouseLeave={() => setCursorHovered(false)} style={{ fontSize: '13.5px', fontWeight: 500, color: '#a3a3a3', textDecoration: 'none' }}>Services</Link>
            <Link href="/training" onMouseEnter={() => setCursorHovered(true)} onMouseLeave={() => setCursorHovered(false)} style={{ fontSize: '13.5px', fontWeight: 500, color: '#a3a3a3', textDecoration: 'none' }}>Training</Link>
            <Link href="/blog" onMouseEnter={() => setCursorHovered(true)} onMouseLeave={() => setCursorHovered(false)} style={{ fontSize: '13.5px', fontWeight: 700, color: '#3b82f6', textDecoration: 'none' }}>Blog</Link>
            <Link href="/careers" onMouseEnter={() => setCursorHovered(true)} onMouseLeave={() => setCursorHovered(false)} style={{ fontSize: '13.5px', fontWeight: 500, color: '#a3a3a3', textDecoration: 'none' }}>Careers</Link>
          </nav>

          <Link href="/#faq" className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '12.5px', fontWeight: 700, textDecoration: 'none' }}>
            Get in Touch →
          </Link>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section style={{ paddingTop: '155px', paddingBottom: '50px', position: 'relative' }}>
        <div className="container-custom" style={{ textAlign: 'center' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={blurFadeIn} style={{ display: 'inline-flex', marginBottom: '20px' }}>
            <div className="pill-badge pill-badge-orange">
              <span className="pulse-dot" />
              <span>Agency Insights & Growth Playbooks</span>
            </div>
          </motion.div>

          <motion.h1 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={blurFadeIn} custom={1} style={{ fontSize: 'clamp(34px, 5vw, 62px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.035em', maxWidth: '850px', margin: '0 auto 20px auto' }}>
            Battle-tested strategies for <span className="serif-italic" style={{ color: '#3b82f6' }}>high-scaling brands</span>.
          </motion.h1>

          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={blurFadeIn} custom={2} style={{ fontSize: '16px', color: '#a3a3a3', maxWidth: '640px', margin: '0 auto 35px auto', lineHeight: 1.6 }}>
            Direct-response creative formulas, media buying breakdowns, and CRO experiments written by the practitioners scaling 7-figure accounts daily.
          </motion.p>

          {/* Search & Category Filter Bar */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={blurFadeIn} custom={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', maxWidth: '750px', margin: '0 auto' }}>
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                type="text"
                placeholder="Search articles on Meta ads, UGC, CRO, CAPI..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '14px',
                  padding: '14px 20px 14px 44px',
                  color: '#fff',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
              <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#888' }}>🔍</span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
              {blogCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                  style={{
                    background: activeCategory === cat ? '#2563eb' : 'rgba(255,255,255,0.04)',
                    color: activeCategory === cat ? '#fff' : '#888',
                    border: activeCategory === cat ? '1px solid #3b82f6' : '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '50px',
                    padding: '6px 14px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="section-spacing" style={{ paddingTop: '20px', paddingBottom: '90px' }}>
        <div className="container-custom">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {filteredPosts.map((post, idx) => (
              <motion.article
                key={post.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={blurFadeIn}
                custom={idx}
                whileHover={{ y: -6, borderColor: 'rgba(37,99,235,0.45)' }}
                style={{
                  background: '#0a0a0a',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
                  cursor: 'pointer',
                }}
                onClick={() => setSelectedArticle(post)}
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
              >
                <div>
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
                    <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '50px', padding: '4px 12px', fontSize: '11px', fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase' }}>
                      {post.category}
                    </div>
                  </div>

                  <div style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: '#666', marginBottom: '10px' }}>
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', lineHeight: 1.35, marginBottom: '12px' }}>
                      {post.title}
                    </h2>

                    <p style={{ fontSize: '13.5px', color: '#888', lineHeight: 1.6 }}>
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div style={{ padding: '0 24px 24px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>{post.author}</div>
                    <div style={{ fontSize: '11px', color: '#666' }}>{post.authorRole}</div>
                  </div>
                  <span style={{ color: '#3b82f6', fontSize: '13px', fontWeight: 700 }}>Read Article →</span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.08)', background: '#050505', padding: '50px 0 30px 0' }}>
        <div className="container-custom">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px', paddingBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#fff' }}>
              <img
                src="/gda_logo.png"
                alt="GDAs Logo"
                style={{
                  height: '32px',
                  width: 'auto',
                  objectFit: 'contain',
                  borderRadius: '6px',
                }}
              />
              <span style={{ fontWeight: 800, fontSize: '16px' }}>GDAs<span style={{ color: '#3b82f6' }}>.</span></span>
            </Link>

            <div style={{ display: 'flex', gap: '20px', fontSize: '13px', flexWrap: 'wrap' }}>
              <Link href="/" style={{ color: '#888', textDecoration: 'none' }}>Home</Link>
              <Link href="/about" style={{ color: '#888', textDecoration: 'none' }}>About</Link>
              <Link href="/#services" style={{ color: '#888', textDecoration: 'none' }}>Services</Link>
              <Link href="/training" style={{ color: '#888', textDecoration: 'none' }}>Training</Link>
              <Link href="/blog" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 600 }}>Blog</Link>
              <Link href="/careers" style={{ color: '#888', textDecoration: 'none' }}>Careers</Link>
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
              <span>All articles verified</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Article Reader Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-overlay" onClick={() => setSelectedArticle(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '750px', maxHeight: '85vh', overflowY: 'auto' }}>
              <button onClick={() => setSelectedArticle(null)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '20px' }}>✕</button>
              
              <div style={{ fontSize: '11px', color: '#60a5fa', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>{selectedArticle.category}</div>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', lineHeight: 1.3, marginBottom: '14px' }}>{selectedArticle.title}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#888', marginBottom: '20px' }}>
                <span>By {selectedArticle.author} ({selectedArticle.authorRole})</span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
                <span>•</span>
                <span>{selectedArticle.readTime}</span>
              </div>

              <div style={{ width: '100%', borderRadius: '12px', overflow: 'hidden', marginBottom: '24px' }}>
                <img src={selectedArticle.image} alt={selectedArticle.title} style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
              </div>

              <div style={{ fontSize: '14.5px', color: '#ccc', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                {selectedArticle.content}
              </div>

              <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href="/training" className="btn btn-primary" style={{ textDecoration: 'none', fontSize: '13px' }}>
                  Learn Live Agency Strategies →
                </Link>
                <button onClick={() => setSelectedArticle(null)} className="btn btn-secondary" style={{ fontSize: '13px' }}>
                  Close Reader
                </button>
              </div>
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
