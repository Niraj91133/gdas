'use client';

import React, { useState, useEffect } from 'react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);
  const [activeTimeframe, setActiveTimeframe] = useState('30D');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [modalForm, setModalForm] = useState({
    name: '',
    email: '',
    website: '',
    spend: '$5k - $15k',
    notes: '',
  });
  const [modalSubmitted, setModalSubmitted] = useState(false);

  // FAQ data
  const faqs = [
    {
      q: 'How quickly can we get started and see initial results?',
      a: 'Once onboarding is complete (usually 48–72 hours), our media buyers and creative team launch initial test campaigns within 5 days. Most clients begin seeing positive ROAS improvements within the first 14 days.',
    },
    {
      q: 'What makes your agency different from traditional agencies?',
      a: 'Unlike traditional agencies that assign junior account managers and hide behind vanity metrics, you get dedicated senior media buyers, weekly creative iterations, real-time custom dashboards, and direct 24/7 Slack communication.',
    },
    {
      q: 'What is the minimum monthly ad budget required?',
      a: 'We work best with brands spending at least $3,000 to $50,000+ per month on paid traffic across Meta, Google, or TikTok so our testing framework has enough statistical volume to scale efficiently.',
    },
    {
      q: 'Do you create the ad creatives (videos & images)?',
      a: 'Yes! We handle end-to-end creative strategy including video editing, UGC sourcing, static graphic design, copywriting, and hook iteration so your ads stay fresh and outperform fatigue.',
    },
    {
      q: 'Are there long-term lock-in contracts?',
      a: 'No. We work on a flexible month-to-month partnership model. We believe in earning your business every single month through transparent, measurable profitability.',
    },
    {
      q: 'How do you handle tracking and attribution after iOS 14.5+?',
      a: 'We implement server-side tracking (Meta CAPI, Google Enhanced Conversions) combined with first-party attribution software (Triple Whale / Northbeam) to ensure 99%+ accurate data without signal loss.',
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      quote: 'Conversion scaled our Meta ads from $12k/mo to over $95k/mo while maintaining a 4.6x ROAS. Their creative iteration speed is unlike any agency we’ve worked with.',
      name: 'Alex Vance',
      role: 'Founder & CEO, Lumina Apparel',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      roas: '4.6x ROAS',
    },
    {
      quote: 'They completely restructured our Google Performance Max campaigns and cut our CPA by 43% in the first 30 days. Transparent, fast, and remarkably sharp.',
      name: 'Marcus Sterling',
      role: 'Head of Growth, Zenith Supplement Co.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      roas: '+184% Rev',
    },
    {
      quote: 'The private Slack channel with senior media buyers makes communication frictionless. We get answers in 5 minutes instead of waiting days for an email reply.',
      name: 'Sophia Chen',
      role: 'CMO, Aura Skincare',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      roas: '5.2x ROAS',
    },
    {
      quote: 'Their TikTok UGC creatives went viral twice in the first month, bringing in over 1,200 new customer acquisitions at half our projected acquisition cost.',
      name: 'David Keller',
      role: 'Co-Founder, Wave Audio',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      roas: '1,200+ Leads',
    },
    {
      quote: 'Finally an agency that cares about bottom-line net profit instead of just showing inflated platform metrics. Best growth investment we made this year.',
      name: 'Elena Rostova',
      role: 'E-commerce Director, Kinetix Gear',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      roas: '3.9x Blended',
    },
    {
      quote: 'We spent 6 months struggling to get past a plateau. Conversion audited our checkout funnel, revamped our hook strategy, and doubled our revenue in 60 days.',
      name: 'Ryan Patel',
      role: 'Founder, Origin Watch Co.',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      roas: '2.1x Growth',
    },
  ];

  // Team data
  const team = [
    {
      name: 'Hamza Ehsan',
      role: 'Founder & Head of Strategy',
      bio: 'Ex-Performance lead having scaled DTC brands past $25M+ in aggregate paid revenue.',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
    },
    {
      name: 'Sarah Jenkins',
      role: 'Lead Media Buyer (Meta & TikTok)',
      bio: 'Specialist in rapid creative testing, ASC scaling, and high-converting UGC frameworks.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    },
    {
      name: 'Julian Ross',
      role: 'Head of Google & YouTube Growth',
      bio: 'Search intent architect with deep expertise in Performance Max and YouTube funnels.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    },
    {
      name: 'Maya Lin',
      role: 'Creative Director & CRO Lead',
      bio: 'Designs high-converting landing page experiences and killer video hooks.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    },
  ];

  // Brands list for marquee
  const brands = [
    'LUMINA', 'NEXUS DTC', 'AURA SKIN', 'VOLT WEAR', 'VORTEX', 'ELEVATE', 'KINETIX', 'ORIGIN', 'SYNAPSE', 'SOLARIS'
  ];

  const handleModalSubmit = (e) => {
    e.preventDefault();
    setModalSubmitted(true);
    setTimeout(() => {
      setModalSubmitted(false);
      setModalOpen(false);
      setModalForm({ name: '', email: '', website: '', spend: '$5k - $15k', notes: '' });
    }, 2500);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubmitted(true);
      setTimeout(() => {
        setNewsletterSubmitted(false);
        setNewsletterEmail('');
      }, 3000);
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#000000', color: '#ffffff' }}>
      {/* Top Ambient Glow */}
      <div className="bg-ambient-top" />

      {/* ========================================================================= */}
      {/* 1. FLOATING NAVIGATION BAR */}
      {/* ========================================================================= */}
      <header
        style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 40px)',
          maxWidth: '1100px',
          zIndex: 100,
        }}
      >
        <div
          className="glass-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 24px',
            borderRadius: '9999px',
          }}
        >
          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#fff' }}>
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #ff4533 0%, #ff220e 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 15px rgba(255, 69, 51, 0.4)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <span style={{ fontWeight: 700, fontSize: '17px', letterSpacing: '-0.02em', color: '#ffffff' }}>
              Conversion<span style={{ color: '#ff4533' }}>.</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '28px',
            }}
            className="desktop-nav"
          >
            <a href="#about" style={{ color: '#a3a3a3', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={(e) => (e.target.style.color = '#fff')} onMouseOut={(e) => (e.target.style.color = '#a3a3a3')}>
              About
            </a>
            <a href="#services" style={{ color: '#a3a3a3', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={(e) => (e.target.style.color = '#fff')} onMouseOut={(e) => (e.target.style.color = '#a3a3a3')}>
              Services
            </a>
            <a href="#why-us" style={{ color: '#a3a3a3', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={(e) => (e.target.style.color = '#fff')} onMouseOut={(e) => (e.target.style.color = '#a3a3a3')}>
              Why Us
            </a>
            <a href="#process" style={{ color: '#a3a3a3', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={(e) => (e.target.style.color = '#fff')} onMouseOut={(e) => (e.target.style.color = '#a3a3a3')}>
              Process
            </a>
            <a href="#reviews" style={{ color: '#a3a3a3', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={(e) => (e.target.style.color = '#fff')} onMouseOut={(e) => (e.target.style.color = '#a3a3a3')}>
              Reviews
            </a>
            <a href="#faq" style={{ color: '#a3a3a3', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={(e) => (e.target.style.color = '#fff')} onMouseOut={(e) => (e.target.style.color = '#a3a3a3')}>
              FAQ
            </a>
          </nav>

          {/* Right Action */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setModalOpen(true)}
              className="btn-primary"
              style={{ padding: '9px 20px', fontSize: '13px' }}
            >
              Book a call
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                padding: '6px',
              }}
              className="mobile-toggle"
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {mobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            className="glass-card"
            style={{
              marginTop: '10px',
              padding: '20px',
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <a href="#about" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>About</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>Services</a>
            <a href="#why-us" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>Why Us</a>
            <a href="#process" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>Process</a>
            <a href="#reviews" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>Reviews</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>FAQ</a>
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="hero-wrapper" id="about">
        <div className="container-custom">
          {/* Status Badge */}
          <div style={{ display: 'inline-block', marginBottom: '8px' }}>
            <div className="pill-badge pill-badge-orange">
              <span className="pulse-dot" />
              <span>2 slots remaining for this month</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="hero-h1">
            We generate results that <span className="serif-italic">matter.</span>
          </h1>

          {/* Subtext */}
          <p className="hero-subtext">
            Experience unprecedented growth with our paid ads strategy, tailored to skyrocket your brand and maximize profitable revenue.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '40px' }}>
            <button onClick={() => setModalOpen(true)} className="btn-primary">
              Book a call
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <a href="#services" className="btn-secondary">
              Our services
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Social Proof (Stars & Avatars) */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '60px' }}>
            <div style={{ display: 'flex', marginLeft: '10px' }}>
              {[
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
              ].map((imgUrl, idx) => (
                <img
                  key={idx}
                  src={imgUrl}
                  alt="Client avatar"
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    border: '2px solid #000',
                    marginLeft: '-10px',
                    objectFit: 'cover',
                  }}
                />
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
              <div style={{ color: '#ffb703', fontSize: '14px', letterSpacing: '2px' }}>★★★★★</div>
              <span style={{ fontSize: '13px', color: '#a3a3a3', fontWeight: 500 }}>Over 20+ happy clients</span>
            </div>
          </div>

          {/* Interactive Hero Analytics Graphic */}
          <div
            className="glass-card glass-card-glow"
            style={{
              maxWidth: '960px',
              margin: '0 auto',
              padding: '28px',
              textAlign: 'left',
            }}
          >
            {/* Top Toolbar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: '20px',
                marginBottom: '24px',
              }}
            >
              <div>
                <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#ff7766', fontWeight: 600 }}>
                  Live Client Performance Dashboard
                </div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', marginTop: '4px' }}>
                  E-Commerce Brand Portfolio Overview
                </div>
              </div>

              {/* Timeframe selector */}
              <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', padding: '3px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
                {['7D', '30D', '90D', '1Y'].map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setActiveTimeframe(tf)}
                    style={{
                      padding: '5px 12px',
                      fontSize: '12px',
                      fontWeight: 600,
                      borderRadius: '6px',
                      border: 'none',
                      cursor: 'pointer',
                      background: activeTimeframe === tf ? '#ff4533' : 'transparent',
                      color: activeTimeframe === tf ? '#fff' : '#888',
                      transition: 'all 0.2s',
                    }}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            {/* 4 Stat Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '16px',
                marginBottom: '28px',
              }}
            >
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: '12px', color: '#888', marginBottom: '6px' }}>Total Attributed Revenue</div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#fff' }}>$184,920</div>
                <div style={{ fontSize: '12px', color: '#10b981', fontWeight: 600, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  ↑ +142.8% <span style={{ color: '#666', fontWeight: 400 }}>vs prior</span>
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: '12px', color: '#888', marginBottom: '6px' }}>Blended ROAS</div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#ff5533' }}>5.84x</div>
                <div style={{ fontSize: '12px', color: '#10b981', fontWeight: 600, marginTop: '4px' }}>
                  Target: 3.50x
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: '12px', color: '#888', marginBottom: '6px' }}>Total Ad Spend</div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#fff' }}>$31,650</div>
                <div style={{ fontSize: '12px', color: '#a3a3a3', marginTop: '4px' }}>
                  Meta & Google
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: '12px', color: '#888', marginBottom: '6px' }}>Qualified Purchases</div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#fff' }}>2,490</div>
                <div style={{ fontSize: '12px', color: '#10b981', fontWeight: 600, marginTop: '4px' }}>
                  Avg Order: $74.26
                </div>
              </div>
            </div>

            {/* Glowing Chart Visual */}
            <div style={{ position: 'relative', width: '100%', height: '180px' }}>
              <svg viewBox="0 0 800 180" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ff4533" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#ff4533" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Horizontal Grid lines */}
                <line x1="0" y1="30" x2="800" y2="30" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
                <line x1="0" y1="80" x2="800" y2="80" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
                <line x1="0" y1="130" x2="800" y2="130" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />

                {/* Area under curve */}
                <path
                  d="M0,160 Q100,140 200,120 T400,90 T600,45 T800,20 L800,180 L0,180 Z"
                  fill="url(#chartGradient)"
                />
                {/* Glowing Stroke line */}
                <path
                  d="M0,160 Q100,140 200,120 T400,90 T600,45 T800,20"
                  fill="none"
                  stroke="#ff4533"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Data points */}
                <circle cx="200" cy="120" r="4" fill="#fff" stroke="#ff4533" strokeWidth="2" />
                <circle cx="400" cy="90" r="4" fill="#fff" stroke="#ff4533" strokeWidth="2" />
                <circle cx="600" cy="45" r="4" fill="#fff" stroke="#ff4533" strokeWidth="2" />
                <circle cx="800" cy="20" r="6" fill="#ff4533" stroke="#fff" strokeWidth="2" />
              </svg>
            </div>

            {/* Bottom Status Ticker */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '16px',
                paddingTop: '14px',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                fontSize: '12px',
                color: '#888',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                <span>Real-time CAPI sync active · 0% attribution delay</span>
              </div>
              <div style={{ color: '#ff7766', fontWeight: 600 }}>
                Peak ROAS today: 7.2x
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. LOGO MARQUEE */}
      {/* ========================================================================= */}
      <section style={{ padding: '40px 0 60px 0', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container-custom" style={{ textAlign: 'center', marginBottom: '24px' }}>
          <p style={{ fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#777', fontWeight: 600 }}>
            Trusted by fast-growing direct-to-consumer brands
          </p>
        </div>
        <div className="marquee-wrapper">
          <div className="marquee-content">
            {brands.concat(brands).map((brand, i) => (
              <div
                key={i}
                style={{
                  fontSize: '20px',
                  fontWeight: 800,
                  letterSpacing: '0.15em',
                  color: 'rgba(255, 255, 255, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <span>◆</span>
                <span>{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. VALUE / BENTO FEATURES GRID */}
      {/* ========================================================================= */}
      <section className="section-spacing" id="features">
        <div className="container-custom">
          <div className="section-header">
            <div className="pill-badge">
              <span>// BUILT TO PERFORM</span>
            </div>
            <h2 className="section-title">
              Built for agencies that want to <span className="serif-italic">scale.</span>
            </h2>
            <p className="section-subtitle">
              We eliminated the typical agency fluff and built a high-velocity paid acquisition engine that drives predictable returns.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {/* Bento Card 1 */}
            <div className="glass-card" style={{ padding: '36px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(255,69,51,0.1)', border: '1px solid rgba(255,69,51,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#ff4533' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '10px' }}>Proprietary Creative Framework</h3>
              <p style={{ fontSize: '15px', color: '#a3a3a3', lineHeight: 1.6 }}>
                Our in-house hook matrix and visual testing methodology yields an average 3.5x higher click-through rate than industry averages.
              </p>
            </div>

            {/* Bento Card 2 */}
            <div className="glass-card" style={{ padding: '36px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(255,69,51,0.1)', border: '1px solid rgba(255,69,51,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#ff4533' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '10px' }}>Zero-Lag Server Attribution</h3>
              <p style={{ fontSize: '15px', color: '#a3a3a3', lineHeight: 1.6 }}>
                Full-funnel Conversions API (CAPI) infrastructure that bypasses iOS 14.5+ cookie limits and feeds clean data directly into ad algorithms.
              </p>
            </div>

            {/* Bento Card 3 */}
            <div className="glass-card" style={{ padding: '36px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(255,69,51,0.1)', border: '1px solid rgba(255,69,51,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#ff4533' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '10px' }}>Weekly Creative Refreshes</h3>
              <p style={{ fontSize: '15px', color: '#a3a3a3', lineHeight: 1.6 }}>
                Ad fatigue kills performance. We produce and deploy 10–15 fresh UGC concepts, static designs, and motion graphics every single week.
              </p>
            </div>

            {/* Bento Card 4 */}
            <div className="glass-card" style={{ padding: '36px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(255,69,51,0.1)', border: '1px solid rgba(255,69,51,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#ff4533' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '10px' }}>Dedicated Private Slack</h3>
              <p style={{ fontSize: '15px', color: '#a3a3a3', lineHeight: 1.6 }}>
                No ticketing queues or junior gatekeepers. Communicate directly with the senior strategists managing your budget with sub-15 minute responses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SERVICES SECTION */}
      {/* ========================================================================= */}
      <section className="section-spacing" id="services" style={{ background: 'linear-gradient(180deg, #000 0%, #080808 50%, #000 100%)' }}>
        <div className="container-custom">
          <div className="section-header">
            <div className="pill-badge pill-badge-orange">
              <span>// SERVICES</span>
            </div>
            <h2 className="section-title">
              Services to take your business to the <span className="serif-italic">next level.</span>
            </h2>
            <p className="section-subtitle">
              Comprehensive paid media execution backed by creative engineering and conversion rate optimization.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
              gap: '24px',
            }}
          >
            {/* Service 1: Meta Ads */}
            <div className="glass-card" style={{ padding: '32px' }}>
              <div style={{ display: 'inline-block', padding: '6px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', fontSize: '12px', fontWeight: 600, color: '#ff7766', marginBottom: '20px' }}>
                SCALE CHANNELS
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '12px' }}>Meta Ads (FB & IG)</h3>
              <p style={{ fontSize: '14px', color: '#a3a3a3', lineHeight: 1.6, marginBottom: '24px' }}>
                Advanced Advantage+ shopping campaigns, dynamic retargeting, and broad audience scaling for maximum revenue.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#d1d1d1' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#ff4533' }}>✓</span> Advantage+ Budget Architecture
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#ff4533' }}>✓</span> Creative Hook Variation Testing
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#ff4533' }}>✓</span> CAPI & Pixel Setup
                </li>
              </ul>
            </div>

            {/* Service 2: Google & YouTube */}
            <div className="glass-card" style={{ padding: '32px' }}>
              <div style={{ display: 'inline-block', padding: '6px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', fontSize: '12px', fontWeight: 600, color: '#ff7766', marginBottom: '20px' }}>
                SEARCH INTENT
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '12px' }}>Google & YouTube Ads</h3>
              <p style={{ fontSize: '14px', color: '#a3a3a3', lineHeight: 1.6, marginBottom: '24px' }}>
                Capture high-intent buyers searching for your solution and scale with Performance Max and YouTube bumper ads.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#d1d1d1' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#ff4533' }}>✓</span> Performance Max Campaign Design
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#ff4533' }}>✓</span> High-Intent Search Keyword Bidding
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#ff4533' }}>✓</span> YouTube Funnel Retargeting
                </li>
              </ul>
            </div>

            {/* Service 3: TikTok Ads */}
            <div className="glass-card" style={{ padding: '32px' }}>
              <div style={{ display: 'inline-block', padding: '6px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', fontSize: '12px', fontWeight: 600, color: '#ff7766', marginBottom: '20px' }}>
                VIRAL GROWTH
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '12px' }}>TikTok Ads & Spark</h3>
              <p style={{ fontSize: '14px', color: '#a3a3a3', lineHeight: 1.6, marginBottom: '24px' }}>
                Creator Spark ads, native trending hooks, and rapid iteration formats that turn viral attention into checkout conversions.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#d1d1d1' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#ff4533' }}>✓</span> Creator Spark Ad Sourcing
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#ff4533' }}>✓</span> First 3-Second Hook Optimization
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#ff4533' }}>✓</span> Gen-Z Native Creative Direction
                </li>
              </ul>
            </div>

            {/* Service 4: CRO & Creatives */}
            <div className="glass-card" style={{ padding: '32px' }}>
              <div style={{ display: 'inline-block', padding: '6px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', fontSize: '12px', fontWeight: 600, color: '#ff7766', marginBottom: '20px' }}>
                MAX PROFIT
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '12px' }}>Creative Strategy & CRO</h3>
              <p style={{ fontSize: '14px', color: '#a3a3a3', lineHeight: 1.6, marginBottom: '24px' }}>
                Landing page redesigns, checkout friction removal, and A/B split testing to increase conversion rates across every visit.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#d1d1d1' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#ff4533' }}>✓</span> High-Converting Advertorials
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#ff4533' }}>✓</span> A/B Landing Page Split Testing
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#ff4533' }}>✓</span> Checkout Average Order Value (AOV) Boost
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. COMPARISON MATRIX ("WHY WORK WITH US?") */}
      {/* ========================================================================= */}
      <section className="section-spacing" id="why-us">
        <div className="container-custom">
          <div className="section-header">
            <div className="pill-badge">
              <span>// THE DIFFERENCE</span>
            </div>
            <h2 className="section-title">
              Why would you want to work <span className="serif-italic">with us?</span>
            </h2>
            <p className="section-subtitle">
              See how our agile performance model compares to traditional marketing agencies.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '30px',
              maxWidth: '960px',
              margin: '0 auto',
            }}
          >
            {/* Traditional Agency Card */}
            <div
              className="glass-card"
              style={{
                padding: '40px',
                background: '#090909',
                borderColor: 'rgba(255,255,255,0.06)',
              }}
            >
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#ff5555', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '8px' }}>
                Traditional Agencies
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', color: '#888' }}>
                Slow & Outdated
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {[
                  'Outsourced junior media buyers managing your budget',
                  'Confusing monthly PDF reports with vanity clicks',
                  'Slow 3-week turnaround for a single creative asset',
                  'Locked into restrictive 6 to 12-month retainers',
                  'Disconnected communication through slow email tickets',
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '14px', color: '#777' }}>
                    <span style={{ color: '#ff4444', fontWeight: 700, fontSize: '16px', lineHeight: 1 }}>✕</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Conversion Agency Card (Glowing) */}
            <div
              className="glass-card glass-card-glow"
              style={{
                padding: '40px',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '20px',
                  background: '#ff4533',
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '999px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Recommended
              </div>

              <div style={{ fontSize: '14px', fontWeight: 700, color: '#ff7766', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '8px' }}>
                Conversion Framework
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', color: '#ffffff' }}>
                High-Growth Partner
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {[
                  'Senior media buyers who have managed $10M+ profitably',
                  'Live 24/7 custom attribution dashboard with real ROAS',
                  '10+ fresh creative variations produced every single week',
                  'Flexible month-to-month contracts — we earn your business',
                  'Direct private Slack channel with sub-15 min responses',
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '14px', color: '#ffffff' }}>
                    <span style={{ color: '#ff4533', fontWeight: 700, fontSize: '16px', lineHeight: 1 }}>✓</span>
                    <span style={{ fontWeight: 500 }}>{item}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '32px' }}>
                <button
                  onClick={() => setModalOpen(true)}
                  className="btn-primary"
                  style={{ width: '100%' }}
                >
                  Experience the difference
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. 3-STEP PROCESS SECTION */}
      {/* ========================================================================= */}
      <section className="section-spacing" id="process" style={{ background: '#050505' }}>
        <div className="container-custom">
          <div className="section-header">
            <div className="pill-badge pill-badge-orange">
              <span>// HOW IT WORKS</span>
            </div>
            <h2 className="section-title">
              Our simple 3-step process to <span className="serif-italic">skyrocket</span> your business.
            </h2>
            <p className="section-subtitle">
              We eliminate guesswork with a streamlined, repeatable roadmap built for scale.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '28px',
            }}
          >
            {/* Step 1 */}
            <div className="glass-card" style={{ padding: '36px' }}>
              <div
                style={{
                  fontSize: '44px',
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  color: '#ff4533',
                  marginBottom: '16px',
                }}
              >
                01
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>
                In-Depth Funnel & Ad Audit
              </h3>
              <p style={{ fontSize: '15px', color: '#a3a3a3', lineHeight: 1.6 }}>
                We dissect your past campaigns, ad accounts, pixel tracking, and checkout conversion drop-offs to pinpoint the exact levers for rapid revenue growth.
              </p>
            </div>

            {/* Step 2 */}
            <div className="glass-card" style={{ padding: '36px' }}>
              <div
                style={{
                  fontSize: '44px',
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  color: '#ff4533',
                  marginBottom: '16px',
                }}
              >
                02
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>
                Creative & Campaign Architecture
              </h3>
              <p style={{ fontSize: '15px', color: '#a3a3a3', lineHeight: 1.6 }}>
                Our creative lab produces high-impact UGC hooks, static carousels, and copy angles while we construct clean, scalable ad account structures.
              </p>
            </div>

            {/* Step 3 */}
            <div className="glass-card" style={{ padding: '36px' }}>
              <div
                style={{
                  fontSize: '44px',
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  color: '#ff4533',
                  marginBottom: '16px',
                }}
              >
                03
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>
                Aggressive Scale & Profit Maximization
              </h3>
              <p style={{ fontSize: '15px', color: '#a3a3a3', lineHeight: 1.6 }}>
                We aggressively inject budget into winning creative angles, expand audience reach, and continuously optimize checkout metrics for maximum net margin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. TESTIMONIALS / REVIEWS */}
      {/* ========================================================================= */}
      <section className="section-spacing" id="reviews">
        <div className="container-custom">
          <div className="section-header">
            <div className="pill-badge">
              <span>// TESTIMONIALS</span>
            </div>
            <h2 className="section-title">
              There&apos;s a reason people are <span className="serif-italic">raving</span> about us.
            </h2>
            <p className="section-subtitle">
              Don&apos;t just take our word for it. Here is what leading founders and CMOs have to say.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {testimonials.map((item, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div style={{ color: '#ffb703', fontSize: '14px', letterSpacing: '2px' }}>★★★★★</div>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#ff5533', background: 'rgba(255,69,51,0.1)', padding: '3px 8px', borderRadius: '4px' }}>
                      {item.roas}
                    </span>
                  </div>
                  <p style={{ fontSize: '15px', color: '#d1d1d1', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '24px' }}>
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <img
                    src={item.avatar}
                    alt={item.name}
                    style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>{item.name}</div>
                    <div style={{ fontSize: '13px', color: '#888' }}>{item.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. TEAM SECTION */}
      {/* ========================================================================= */}
      <section className="section-spacing" id="team" style={{ background: '#050505' }}>
        <div className="container-custom">
          <div className="section-header">
            <div className="pill-badge pill-badge-orange">
              <span>// THE MINDS</span>
            </div>
            <h2 className="section-title">
              Meet the <span className="serif-italic">incredible</span> team.
            </h2>
            <p className="section-subtitle">
              Direct access to seasoned growth architects dedicated to your brand.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px',
            }}
          >
            {team.map((member, idx) => (
              <div key={idx} className="glass-card" style={{ overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '240px', overflow: 'hidden' }}>
                  <img
                    src={member.image}
                    alt={member.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                    onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
                    onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
                  />
                </div>
                <div style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>{member.name}</h3>
                  <div style={{ fontSize: '13px', color: '#ff7766', fontWeight: 600, marginTop: '2px', marginBottom: '10px' }}>
                    {member.role}
                  </div>
                  <p style={{ fontSize: '13px', color: '#999', lineHeight: 1.5 }}>
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. FAQ ACCORDION */}
      {/* ========================================================================= */}
      <section className="section-spacing" id="faq">
        <div className="container-custom">
          <div className="section-header">
            <div className="pill-badge">
              <span>// COMMON QUESTIONS</span>
            </div>
            <h2 className="section-title">
              Frequently Asked <span className="serif-italic">Questions.</span>
            </h2>
            <p className="section-subtitle">
              Everything you need to know about our partnership and onboarding process.
            </p>
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="glass-card"
                  style={{
                    borderRadius: '16px',
                    borderColor: isOpen ? 'rgba(255, 69, 51, 0.3)' : 'rgba(255, 255, 255, 0.08)',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? -1 : index)}
                    style={{
                      width: '100%',
                      padding: '22px 28px',
                      background: 'none',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      textAlign: 'left',
                      color: '#ffffff',
                    }}
                  >
                    <span style={{ fontSize: '16px', fontWeight: 600, paddingRight: '16px' }}>{faq.q}</span>
                    <span
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: isOpen ? '#ff4533' : 'rgba(255,255,255,0.06)',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        flexShrink: 0,
                        transition: 'all 0.2s',
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      }}
                    >
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 28px 24px 28px', fontSize: '15px', color: '#a3a3a3', lineHeight: 1.6 }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. FINAL CTA BANNER */}
      {/* ========================================================================= */}
      <section style={{ padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
        <div className="bg-ambient-cta" />
        <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
          <div
            className="glass-card glass-card-glow"
            style={{
              padding: '60px 40px',
              textAlign: 'center',
              borderRadius: '28px',
              maxWidth: '960px',
              margin: '0 auto',
            }}
          >
            <div className="pill-badge pill-badge-orange" style={{ marginBottom: '16px' }}>
              <span className="pulse-dot" />
              <span>LIMITED CAPACITY · 2 ONBOARDING SLOTS</span>
            </div>
            <h2 style={{ fontSize: '46px', fontWeight: 700, lineHeight: 1.15, maxWidth: '700px', margin: '0 auto 18px auto' }}>
              Ready to scale your brand to <span className="serif-italic">new heights?</span>
            </h2>
            <p style={{ fontSize: '17px', color: '#a3a3a3', maxWidth: '540px', margin: '0 auto 36px auto', lineHeight: 1.6 }}>
              Book a 30-minute free growth strategy call. We will audit your current ads and map out a step-by-step roadmap to scale.
            </p>

            <button
              onClick={() => setModalOpen(true)}
              className="btn-primary"
              style={{ padding: '14px 36px', fontSize: '15px' }}
            >
              Book your free call
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            <div style={{ marginTop: '24px', fontSize: '13px', color: '#777', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <span>✓ 100% Free Strategy Call</span>
              <span>✓ No Long-Term Retainers</span>
              <span>✓ Actionable Growth Plan</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. FOOTER */}
      {/* ========================================================================= */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.08)', background: '#050505', padding: '60px 0 40px 0' }}>
        <div className="container-custom">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '40px',
              marginBottom: '50px',
            }}
          >
            {/* Brand Column */}
            <div>
              <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#fff', marginBottom: '14px' }}>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #ff4533 0%, #ff220e 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <span style={{ fontWeight: 700, fontSize: '17px', letterSpacing: '-0.02em' }}>
                  Conversion<span style={{ color: '#ff4533' }}>.</span>
                </span>
              </a>
              <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.6, marginBottom: '20px' }}>
                Performance-driven paid acquisition agency helping DTC and high-growth brands scale with confidence.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#10b981' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                <span>All systems operational</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#fff', marginBottom: '16px' }}>
                Navigation
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: '#888' }}>
                <li><a href="#about" style={{ color: '#888', textDecoration: 'none' }}>About Us</a></li>
                <li><a href="#services" style={{ color: '#888', textDecoration: 'none' }}>Services</a></li>
                <li><a href="#why-us" style={{ color: '#888', textDecoration: 'none' }}>Why Us</a></li>
                <li><a href="#process" style={{ color: '#888', textDecoration: 'none' }}>Process</a></li>
                <li><a href="#reviews" style={{ color: '#888', textDecoration: 'none' }}>Client Reviews</a></li>
              </ul>
            </div>

            {/* Legal / Socials */}
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#fff', marginBottom: '16px' }}>
                Connect
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: '#888' }}>
                <li><a href="https://twitter.com" target="_blank" rel="noreferrer" style={{ color: '#888', textDecoration: 'none' }}>Twitter / X</a></li>
                <li><a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: '#888', textDecoration: 'none' }}>LinkedIn</a></li>
                <li><a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: '#888', textDecoration: 'none' }}>Instagram</a></li>
                <li><a href="mailto:contact@conversion.agency" style={{ color: '#888', textDecoration: 'none' }}>Email Support</a></li>
              </ul>
            </div>

            {/* Newsletter Column */}
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#fff', marginBottom: '16px' }}>
                Weekly Ad Breakdowns
              </div>
              <p style={{ fontSize: '13px', color: '#888', marginBottom: '14px', lineHeight: 1.5 }}>
                Join 5,000+ founders receiving our weekly ad strategy breakdowns.
              </p>
              {newsletterSubmitted ? (
                <div style={{ padding: '10px 14px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', borderRadius: '8px', color: '#10b981', fontSize: '13px' }}>
                  ✓ You&apos;re on the list!
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="email"
                    placeholder="Your Email Address"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      background: '#111',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                  <button type="submit" className="btn-primary" style={{ padding: '10px 16px', fontSize: '12px', borderRadius: '8px' }}>
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          <div
            style={{
              paddingTop: '30px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '13px',
              color: '#666',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div>© {new Date().getFullYear()} Conversion Agency. All rights reserved.</div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Privacy Policy</a>
              <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* 13. INTERACTIVE "BOOK A CALL" MODAL */}
      {/* ========================================================================= */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setModalOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                color: '#888',
                cursor: 'pointer',
                fontSize: '20px',
              }}
            >
              ✕
            </button>

            {modalSubmitted ? (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,69,51,0.15)', color: '#ff4533', fontSize: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                  ✓
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>Application Received!</h3>
                <p style={{ fontSize: '14px', color: '#a3a3a3', lineHeight: 1.6 }}>
                  Our growth strategist will review your brand details and reach out within 2 hours to confirm your strategy call slot.
                </p>
              </div>
            ) : (
              <div>
                <div className="pill-badge pill-badge-orange" style={{ marginBottom: '12px' }}>
                  <span className="pulse-dot" />
                  <span>Free 30-Min Strategy Call</span>
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>
                  Book your <span className="serif-italic">Growth Session</span>
                </h3>
                <p style={{ fontSize: '13px', color: '#888', marginBottom: '22px' }}>
                  Tell us about your brand so we can prepare actionable insights before we talk.
                </p>

                <form onSubmit={handleModalSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a3a3a3', marginBottom: '5px' }}>
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={modalForm.name}
                      onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        background: '#161616',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '14px',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a3a3a3', marginBottom: '5px' }}>
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@yourbrand.com"
                      value={modalForm.email}
                      onChange={(e) => setModalForm({ ...modalForm, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        background: '#161616',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '14px',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a3a3a3', marginBottom: '5px' }}>
                      Website or Store URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://yourbrand.com"
                      value={modalForm.website}
                      onChange={(e) => setModalForm({ ...modalForm, website: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        background: '#161616',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '14px',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a3a3a3', marginBottom: '5px' }}>
                      Monthly Ad Spend
                    </label>
                    <select
                      value={modalForm.spend}
                      onChange={(e) => setModalForm({ ...modalForm, spend: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        background: '#161616',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '14px',
                        outline: 'none',
                      }}
                    >
                      <option value="<$5k">&lt; $5k / month</option>
                      <option value="$5k - $15k">$5k - $15k / month</option>
                      <option value="$15k - $50k">$15k - $50k / month</option>
                      <option value="$50k+">$50k+ / month</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ marginTop: '8px', width: '100%', padding: '12px' }}
                  >
                    Confirm Call Request
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Global Responsive Fix for Mobile Navigation */}
      <style jsx global>{`
        @media (max-width: 860px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
