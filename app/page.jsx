'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Signature Framer "Blur to Normal" Scroll Animations
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

const blurStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [videoModal, setVideoModal] = useState(null);
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

  // Custom Cursor State
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorHovered, setCursorHovered] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const updateMouse = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMouse);
    return () => window.removeEventListener('mousemove', updateMouse);
  }, []);

  // Video Testimonials (Concise & Punchy)
  const clientVideos = [
    {
      id: 1,
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
      brandLogo: 'theo',
      brandType: 'script',
      quote: 'Our results and online presence went through the roof overnight!',
      name: 'Malik Shkraba',
      role: 'COO, Friday',
      videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    },
    {
      id: 2,
      thumbnail: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80',
      brandLogo: 'Amsterdam',
      brandType: 'icon',
      quote: 'We saw massive ROI from month one. If you want to scale, look no further.',
      name: 'Tony Gomez',
      role: 'Founder, Thursday',
      videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    },
    {
      id: 3,
      thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
      brandLogo: 'SAVANNAH',
      brandType: 'bold',
      quote: 'GDAs completely outperformed every agency we previously hired.',
      name: 'Naomi Campbell',
      role: 'CEO, Wednesday',
      videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    },
  ];

  // Concise FAQ Data
  const faqs = [
    {
      q: 'How fast do we see results?',
      a: 'After our 48-hour onboarding, test campaigns launch within 5 days. Most brands see profitable ROAS growth within 14 days.',
    },
    {
      q: 'What makes GDAs different?',
      a: 'No junior managers. You get senior media buyers, weekly creative iterations, real-time attribution dashboards, and a direct Slack channel.',
    },
    {
      q: 'What is the required monthly ad spend?',
      a: 'We work best with brands spending $3k to $50k+/mo across Meta, Google, or TikTok.',
    },
    {
      q: 'Do you create the ad videos and designs?',
      a: 'Yes. We handle end-to-end creative strategy, UGC sourcing, video editing, and copywriting.',
    },
    {
      q: 'Are there long-term contracts?',
      a: 'No. We work month-to-month. We earn your business through consistent profit.',
    },
  ];

  // Concise Written Testimonials
  const testimonials = [
    {
      quote: 'GDAs scaled our Meta ads from $12k/mo to $95k/mo at 4.6x ROAS.',
      name: 'Alex Vance',
      role: 'CEO, Lumina',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      roas: '4.6x ROAS',
    },
    {
      quote: 'They restructured our Google PMax campaigns and cut CPA by 43%.',
      name: 'Marcus Sterling',
      role: 'Growth Lead, Zenith',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      roas: '+184% Rev',
    },
    {
      quote: 'Direct Slack communication with 5-minute response times. Game changer.',
      name: 'Sophia Chen',
      role: 'CMO, Aura Skincare',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      roas: '5.2x ROAS',
    },
  ];

  // Team
  const team = [
    {
      name: 'Hamza Ehsan',
      role: 'Head of Growth',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
    },
    {
      name: 'Sarah Jenkins',
      role: 'Lead Media Buyer',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    },
    {
      name: 'Julian Ross',
      role: 'Google & Search Lead',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    },
    {
      name: 'Maya Lin',
      role: 'Creative Director',
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
      {/* ========================================================================= */}
      {/* INTERACTIVE CUSTOM CURSOR DOT & RING */}
      {/* ========================================================================= */}
      {isClient && (
        <>
          {/* Inner Glowing Cursor Dot */}
          <motion.div
            className="cursor-dot"
            animate={{
              x: mousePosition.x - 4,
              y: mousePosition.y - 4,
              scale: cursorHovered ? 1.6 : 1,
            }}
            transition={{ type: 'spring', damping: 30, stiffness: 450, mass: 0.1 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#ff4533',
              pointerEvents: 'none',
              zIndex: 99999,
              boxShadow: '0 0 12px #ff4533, 0 0 4px #ffffff',
            }}
          />
          {/* Outer Smooth Trailing Ring */}
          <motion.div
            className="cursor-ring"
            animate={{
              x: mousePosition.x - 16,
              y: mousePosition.y - 16,
              scale: cursorHovered ? 1.4 : 1,
              borderColor: cursorHovered ? '#ff4533' : 'rgba(255, 69, 51, 0.4)',
            }}
            transition={{ type: 'spring', damping: 24, stiffness: 220, mass: 0.2 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: '1.5px solid rgba(255, 69, 51, 0.4)',
              pointerEvents: 'none',
              zIndex: 99998,
            }}
          />
        </>
      )}

      {/* Top Ambient Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="bg-ambient-top"
      />

      {/* ========================================================================= */}
      {/* 1. FLOATING NAVIGATION BAR */}
      {/* ========================================================================= */}
      <motion.header
        initial={{ y: -50, opacity: 0, filter: 'blur(8px)' }}
        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: '20px',
          left: '0',
          right: '0',
          margin: '0 auto',
          width: 'calc(100% - 40px)',
          maxWidth: '1050px',
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
          <motion.a
            href="#"
            whileHover={{ scale: 1.03 }}
            onMouseEnter={() => setCursorHovered(true)}
            onMouseLeave={() => setCursorHovered(false)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#fff' }}
          >
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #ff4533 0%, #ff220e 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 15px rgba(255, 69, 51, 0.45)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <span style={{ fontWeight: 800, fontSize: '18px', letterSpacing: '-0.02em', color: '#ffffff' }}>
              GDAs<span style={{ color: '#ff4533' }}>.</span>
            </span>
          </motion.a>

          {/* Desktop Nav Links */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '28px',
            }}
            className="desktop-nav"
          >
            {[
              { href: '#about', label: 'About' },
              { href: '#client-videos', label: 'Clients' },
              { href: '#services', label: 'Services' },
              { href: '#why-us', label: 'Why Us' },
              { href: '#process', label: 'Process' },
              { href: '#faq', label: 'FAQ' },
            ].map((link, i) => (
              <motion.a
                key={i}
                href={link.href}
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                whileHover={{ y: -2, color: '#ffffff' }}
                style={{ color: '#a3a3a3', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s' }}
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          {/* Right Action */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <motion.button
              onClick={() => setModalOpen(true)}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
              style={{ padding: '9px 20px', fontSize: '13px' }}
            >
              Book a call
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.button>

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
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, scale: 0.95, filter: 'blur(8px)' }}
              transition={{ duration: 0.25 }}
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
              <a href="#client-videos" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>Clients</a>
              <a href="#services" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>Services</a>
              <a href="#why-us" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>Why Us</a>
              <a href="#process" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>Process</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>FAQ</a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="hero-wrapper" id="about">
        <div className="container-custom">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ display: 'inline-block', marginBottom: '8px' }}
          >
            <div className="pill-badge pill-badge-orange">
              <span className="pulse-dot" />
              <span>2 slots left this month</span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, filter: 'blur(12px)', y: 30 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="hero-h1"
          >
            We generate results that <span className="serif-italic">matter.</span>
          </motion.h1>

          {/* Subtext (Short & Punchy) */}
          <motion.p
            initial={{ opacity: 0, filter: 'blur(10px)', y: 25 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 0.75, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
            className="hero-subtext"
            style={{ maxWidth: '520px' }}
          >
            High-performance paid ads strategy tailored to scale your brand and maximize profitable revenue.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 0.65, delay: 0.6 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '36px' }}
          >
            <motion.button
              onClick={() => setModalOpen(true)}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              Book a call
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.button>
            <motion.a
              href="#services"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary"
            >
              Our services
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.a>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(8px)', scale: 0.92 }}
            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '50px' }}
          >
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
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: '2px solid #000',
                    marginLeft: '-8px',
                    objectFit: 'cover',
                  }}
                />
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
              <div style={{ color: '#ffb703', fontSize: '13px', letterSpacing: '2px' }}>★★★★★</div>
              <span style={{ fontSize: '12px', color: '#a3a3a3', fontWeight: 500 }}>20+ happy brands</span>
            </div>
          </motion.div>

          {/* Interactive Hero Analytics Graphic */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(14px)', y: 40, scale: 0.96 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0, scale: 1 }}
            transition={{ duration: 0.95, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card glass-card-glow"
            style={{
              maxWidth: '920px',
              margin: '0 auto',
              padding: '24px',
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
                gap: '12px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: '16px',
                marginBottom: '20px',
              }}
            >
              <div>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#ff7766', fontWeight: 700 }}>
                  Live Client Performance
                </div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', marginTop: '2px' }}>
                  Portfolio Overview
                </div>
              </div>

              {/* Timeframe selector */}
              <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', padding: '3px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
                {['7D', '30D', '90D', '1Y'].map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setActiveTimeframe(tf)}
                    onMouseEnter={() => setCursorHovered(true)}
                    onMouseLeave={() => setCursorHovered(false)}
                    style={{
                      padding: '4px 10px',
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
                gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
                gap: '12px',
                marginBottom: '24px',
              }}
            >
              {[
                { title: 'Revenue', val: '$184,920', sub: '↑ +142.8%', subColor: '#10b981' },
                { title: 'ROAS', val: '5.84x', valColor: '#ff5533', sub: 'Target: 3.5x', subColor: '#10b981' },
                { title: 'Ad Spend', val: '$31,650', sub: 'Meta & Google', subColor: '#a3a3a3' },
                { title: 'Orders', val: '2,490', sub: 'Avg AOV $74', subColor: '#10b981' },
              ].map((stat, i) => (
                <div
                  key={i}
                  style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div style={{ fontSize: '11px', color: '#888', marginBottom: '4px' }}>{stat.title}</div>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: stat.valColor || '#fff' }}>{stat.val}</div>
                  <div style={{ fontSize: '11px', color: stat.subColor, fontWeight: 600, marginTop: '2px' }}>
                    {stat.sub}
                  </div>
                </div>
              ))}
            </div>

            {/* Glowing Chart Visual */}
            <div style={{ position: 'relative', width: '100%', height: '160px' }}>
              <svg viewBox="0 0 800 160" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ff4533" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#ff4533" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="30" x2="800" y2="30" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
                <line x1="0" y1="80" x2="800" y2="80" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
                <line x1="0" y1="130" x2="800" y2="130" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />

                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.9, ease: 'easeInOut' }}
                  d="M0,140 Q100,120 200,105 T400,75 T600,35 T800,15 L800,160 L0,160 Z"
                  fill="url(#chartGradient)"
                />
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.9, ease: 'easeInOut' }}
                  d="M0,140 Q100,120 200,105 T400,75 T600,35 T800,15"
                  fill="none"
                  stroke="#ff4533"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="200" cy="105" r="4" fill="#fff" stroke="#ff4533" strokeWidth="2" />
                <circle cx="400" cy="75" r="4" fill="#fff" stroke="#ff4533" strokeWidth="2" />
                <circle cx="600" cy="35" r="4" fill="#fff" stroke="#ff4533" strokeWidth="2" />
                <circle cx="800" cy="15" r="5" fill="#ff4533" stroke="#fff" strokeWidth="2" />
              </svg>
            </div>

            {/* Bottom Status Ticker */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '12px',
                paddingTop: '12px',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                fontSize: '11px',
                color: '#888',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                <span>Live CAPI Sync</span>
              </div>
              <div style={{ color: '#ff7766', fontWeight: 600 }}>Peak ROAS: 7.2x</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. LOGO MARQUEE */}
      {/* ========================================================================= */}
      <motion.section
        initial={{ opacity: 0, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.8 }}
        style={{ padding: '30px 0 50px 0', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="marquee-wrapper">
          <div className="marquee-content">
            {brands.concat(brands).map((brand, i) => (
              <div
                key={i}
                style={{
                  fontSize: '18px',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  color: 'rgba(255, 255, 255, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span>◆</span>
                <span>{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ========================================================================= */}
      {/* 4. HEAR IT DIRECTLY FROM OUR CLIENTS (VIDEO TESTIMONIALS) */}
      {/* ========================================================================= */}
      <section className="section-spacing" id="client-videos" style={{ position: 'relative' }}>
        <div className="container-custom">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)', y: 30 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            className="section-header"
            style={{ marginBottom: '40px' }}
          >
            <div className="pill-badge" style={{ marginBottom: '8px' }}>
              <span>Our Clients</span>
            </div>
            <h2 className="section-title">
              Hear it directly from <span className="serif-italic">our clients.</span>
            </h2>
            <p className="section-subtitle">
              Real founders. Measurable growth.
            </p>
          </motion.div>

          {/* Video Cards Grid */}
          <div style={{ position: 'relative' }}>
            <motion.div
              variants={blurStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
              }}
            >
              {clientVideos.map((video, idx) => (
                <motion.div
                  key={video.id}
                  variants={blurFadeIn}
                  custom={idx}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                  className="glass-card"
                  style={{
                    padding: '14px',
                    borderRadius: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  {/* Thumbnail Box */}
                  <div
                    onClick={() => setVideoModal(video)}
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '220px',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      backgroundColor: '#111',
                    }}
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%)' }} />

                    {/* Red Play Button */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #ff4533 0%, #ff220e 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 20px rgba(255, 69, 51, 0.6)',
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>

                    {/* Player Control Bar */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '12px',
                        right: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '11px',
                        color: '#fff',
                        fontWeight: 600,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>00:00</span>
                        <div style={{ width: '35px', height: '3px', background: 'rgba(255,255,255,0.4)', borderRadius: '2px' }}>
                          <div style={{ width: '10px', height: '100%', background: '#ff4533' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div style={{ padding: '18px 6px 8px 6px' }}>
                    <div style={{ height: '28px', display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                      {video.brandType === 'script' && (
                        <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '24px', fontWeight: 700, color: '#ffffff' }}>
                          theo
                        </span>
                      )}
                      {video.brandType === 'icon' && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#fff' }} />
                          <span style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff' }}>Amsterdam</span>
                        </div>
                      )}
                      {video.brandType === 'bold' && (
                        <span style={{ fontSize: '20px', fontWeight: 900, color: '#ffffff' }}>{video.brandLogo}</span>
                      )}
                    </div>

                    <p style={{ fontSize: '14px', color: '#a3a3a3', lineHeight: 1.5, marginBottom: '16px', minHeight: '44px' }}>
                      &ldquo;{video.quote}&rdquo;
                    </p>

                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px' }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>{video.name}</div>
                      <div style={{ fontSize: '12px', color: '#777' }}>{video.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SERVICES SECTION */}
      {/* ========================================================================= */}
      <section className="section-spacing" id="services" style={{ background: 'linear-gradient(180deg, #000 0%, #080808 50%, #000 100%)' }}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)', y: 30 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            className="section-header"
            style={{ marginBottom: '40px' }}
          >
            <div className="pill-badge pill-badge-orange">
              <span>// SERVICES</span>
            </div>
            <h2 className="section-title">
              What we <span className="serif-italic">do best.</span>
            </h2>
          </motion.div>

          <motion.div
            variants={blurStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px',
            }}
          >
            {[
              {
                badge: 'META ADS',
                title: 'Facebook & Instagram',
                desc: 'Advantage+ scaling & creative hook testing for maximum volume.',
              },
              {
                badge: 'GOOGLE ADS',
                title: 'Search & PMax',
                desc: 'Capture active buyer intent with targeted Search & Performance Max.',
              },
              {
                badge: 'TIKTOK ADS',
                title: 'TikTok & UGC',
                desc: 'Creator Spark ads and viral hooks that convert views to buyers.',
              },
              {
                badge: 'OPTIMIZATION',
                title: 'CRO & Creatives',
                desc: 'High-converting landing pages & A/B testing to double checkout rates.',
              },
            ].map((srv, idx) => (
              <motion.div
                key={idx}
                variants={blurFadeIn}
                custom={idx}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                className="glass-card"
                style={{ padding: '28px' }}
              >
                <div style={{ display: 'inline-block', padding: '4px 10px', background: 'rgba(255,69,51,0.1)', borderRadius: '6px', fontSize: '11px', fontWeight: 700, color: '#ff7766', marginBottom: '16px' }}>
                  {srv.badge}
                </div>
                <h3 style={{ fontSize: '19px', fontWeight: 700, marginBottom: '10px' }}>{srv.title}</h3>
                <p style={{ fontSize: '14px', color: '#a3a3a3', lineHeight: 1.5 }}>
                  {srv.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. COMPARISON MATRIX ("WHY WORK WITH GDAs?") */}
      {/* ========================================================================= */}
      <section className="section-spacing" id="why-us">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)', y: 30 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            className="section-header"
            style={{ marginBottom: '40px' }}
          >
            <div className="pill-badge">
              <span>// THE DIFFERENCE</span>
            </div>
            <h2 className="section-title">
              Why choose <span className="serif-italic">GDAs?</span>
            </h2>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
              maxWidth: '920px',
              margin: '0 auto',
            }}
          >
            {/* Traditional Agency */}
            <motion.div
              initial={{ opacity: 0, filter: 'blur(10px)', x: -30 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8 }}
              className="glass-card"
              style={{ padding: '32px', background: '#080808' }}
            >
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#ff5555', textTransform: 'uppercase', marginBottom: '16px' }}>
                Other Agencies
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  'Junior account managers learning on your ad budget',
                  'Vague monthly PDF reports with vanity clicks',
                  'Slow 3-week turnaround for new creatives',
                  'Locked into rigid 6-12 month contracts',
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#777' }}>
                    <span style={{ color: '#ff4444', fontWeight: 700 }}>✕</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* GDAs Framework */}
            <motion.div
              initial={{ opacity: 0, filter: 'blur(10px)', x: 30 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8 }}
              whileHover={{ y: -4 }}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              className="glass-card glass-card-glow"
              style={{ padding: '32px' }}
            >
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#ff7766', textTransform: 'uppercase', marginBottom: '16px' }}>
                GDAs Framework
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  'Senior media buyers who have scaled $10M+ profitably',
                  'Live 24/7 custom dashboard with transparent ROAS',
                  'Fresh creative iterations delivered every week',
                  'No lock-in contracts — month to month partnership',
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#ffffff' }}>
                    <span style={{ color: '#ff4533', fontWeight: 700 }}>✓</span>
                    <span style={{ fontWeight: 500 }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. 3-STEP PROCESS SECTION */}
      {/* ========================================================================= */}
      <section className="section-spacing" id="process" style={{ background: '#050505' }}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)', y: 30 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            className="section-header"
            style={{ marginBottom: '40px' }}
          >
            <div className="pill-badge pill-badge-orange">
              <span>// PROCESS</span>
            </div>
            <h2 className="section-title">
              Our 3-step roadmap to <span className="serif-italic">scale.</span>
            </h2>
          </motion.div>

          <motion.div
            variants={blurStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {[
              { num: '01', title: 'Funnel Audit', desc: 'We audit past campaigns, pixels, and checkout leaks to identify immediate revenue opportunities.' },
              { num: '02', title: 'Creative Build', desc: 'We produce fresh UGC hooks, static designs, and construct scalable campaign architectures.' },
              { num: '03', title: 'Scale Profit', desc: 'We aggressively pump budget into winners while keeping acquisition costs low.' },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                variants={blurFadeIn}
                custom={idx}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                className="glass-card"
                style={{ padding: '30px' }}
              >
                <div style={{ fontSize: '38px', fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: '#ff4533', marginBottom: '12px' }}>
                  {step.num}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>{step.title}</h3>
                <p style={{ fontSize: '14px', color: '#a3a3a3', lineHeight: 1.5 }}>{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. CLIENT REVIEWS */}
      {/* ========================================================================= */}
      <section className="section-spacing" id="reviews">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)', y: 30 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            className="section-header"
            style={{ marginBottom: '40px' }}
          >
            <div className="pill-badge">
              <span>// REVIEWS</span>
            </div>
            <h2 className="section-title">
              Client <span className="serif-italic">results.</span>
            </h2>
          </motion.div>

          <motion.div
            variants={blurStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
            }}
          >
            {testimonials.map((item, idx) => (
              <motion.div
                key={idx}
                variants={blurFadeIn}
                custom={idx}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                className="glass-card"
                style={{ padding: '26px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{ color: '#ffb703', fontSize: '13px' }}>★★★★★</div>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#ff5533', background: 'rgba(255,69,51,0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                      {item.roas}
                    </span>
                  </div>
                  <p style={{ fontSize: '14px', color: '#d1d1d1', lineHeight: 1.5, fontStyle: 'italic', marginBottom: '20px' }}>
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src={item.avatar}
                    alt={item.name}
                    style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>{item.name}</div>
                    <div style={{ fontSize: '12px', color: '#777' }}>{item.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. FAQ ACCORDION */}
      {/* ========================================================================= */}
      <section className="section-spacing" id="faq">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)', y: 30 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            className="section-header"
            style={{ marginBottom: '36px' }}
          >
            <div className="pill-badge">
              <span>// FAQ</span>
            </div>
            <h2 className="section-title">
              Common <span className="serif-italic">questions.</span>
            </h2>
          </motion.div>

          <motion.div
            variants={blurStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            style={{ maxWidth: '760px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <motion.div
                  key={index}
                  variants={blurFadeIn}
                  custom={index}
                  className="glass-card"
                  style={{
                    borderRadius: '14px',
                    borderColor: isOpen ? 'rgba(255, 69, 51, 0.3)' : 'rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? -1 : index)}
                    onMouseEnter={() => setCursorHovered(true)}
                    onMouseLeave={() => setCursorHovered(false)}
                    style={{
                      width: '100%',
                      padding: '18px 22px',
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
                    <span style={{ fontSize: '15px', fontWeight: 600 }}>{faq.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: isOpen ? '#ff4533' : 'rgba(255,255,255,0.06)',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        flexShrink: 0,
                      }}
                    >
                      +
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ padding: '0 22px 20px 22px', fontSize: '14px', color: '#a3a3a3', lineHeight: 1.5 }}>
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. FINAL CTA BANNER */}
      {/* ========================================================================= */}
      <section style={{ padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
        <div className="bg-ambient-cta" />
        <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, filter: 'blur(14px)', scale: 0.94, y: 30 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            className="glass-card glass-card-glow"
            style={{
              padding: '50px 32px',
              textAlign: 'center',
              borderRadius: '24px',
              maxWidth: '880px',
              margin: '0 auto',
            }}
          >
            <div className="pill-badge pill-badge-orange" style={{ marginBottom: '14px' }}>
              <span className="pulse-dot" />
              <span>LIMITED ONBOARDING SLOTS</span>
            </div>
            <h2 style={{ fontSize: '40px', fontWeight: 700, lineHeight: 1.15, maxWidth: '600px', margin: '0 auto 14px auto' }}>
              Ready to scale to <span className="serif-italic">new heights?</span>
            </h2>
            <p style={{ fontSize: '16px', color: '#a3a3a3', maxWidth: '480px', margin: '0 auto 30px auto', lineHeight: 1.5 }}>
              Book a 30-minute free growth audit. We will show you exactly how to scale your ROAS.
            </p>

            <motion.button
              onClick={() => setModalOpen(true)}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
              style={{ padding: '13px 32px', fontSize: '14px' }}
            >
              Book your free call
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. FOOTER */}
      {/* ========================================================================= */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.08)', background: '#050505', padding: '50px 0 30px 0' }}>
        <div className="container-custom">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '24px',
              paddingBottom: '30px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '7px',
                  background: 'linear-gradient(135deg, #ff4533 0%, #ff220e 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <span style={{ fontWeight: 800, fontSize: '16px' }}>
                GDAs<span style={{ color: '#ff4533' }}>.</span>
              </span>
            </div>

            <div style={{ display: 'flex', gap: '20px', fontSize: '13px' }}>
              <a href="#about" style={{ color: '#888', textDecoration: 'none' }}>About</a>
              <a href="#services" style={{ color: '#888', textDecoration: 'none' }}>Services</a>
              <a href="#client-videos" style={{ color: '#888', textDecoration: 'none' }}>Clients</a>
              <a href="#faq" style={{ color: '#888', textDecoration: 'none' }}>FAQ</a>
              <a href="mailto:contact@ganeshadigiads.in" style={{ color: '#888', textDecoration: 'none' }}>Contact</a>
            </div>
          </div>

          <div
            style={{
              paddingTop: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '12px',
              color: '#555',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            <div>© {new Date().getFullYear()} GDAs (Ganesha Digital Ads). All rights reserved.</div>
            <div style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10b981' }} />
              <span>All systems live</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* 12. VIDEO MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {videoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setVideoModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ scale: 1, opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ scale: 0.9, opacity: 0, y: 20, filter: 'blur(10px)' }}
              transition={{ duration: 0.25 }}
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: '700px', padding: '20px' }}
            >
              <button
                onClick={() => setVideoModal(null)}
                style={{
                  position: 'absolute',
                  top: '14px',
                  right: '14px',
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  color: '#fff',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  zIndex: 10,
                }}
              >
                ✕
              </button>

              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '11px', color: '#ff7766', fontWeight: 700, textTransform: 'uppercase' }}>
                  {videoModal.role}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>
                  {videoModal.name} on GDAs
                </h3>
              </div>

              <div style={{ position: 'relative', width: '100%', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#000', aspectRatio: '16/9' }}>
                <video
                  src={videoModal.videoSrc}
                  controls
                  autoPlay
                  poster={videoModal.thumbnail}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 13. BOOK A CALL MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ scale: 1, opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ scale: 0.9, opacity: 0, y: 20, filter: 'blur(10px)' }}
              transition={{ duration: 0.25 }}
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
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
                  <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(255,69,51,0.15)', color: '#ff4533', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px auto' }}>
                    ✓
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Request Received!</h3>
                  <p style={{ fontSize: '13px', color: '#a3a3a3' }}>
                    We will review your brand and confirm your strategy session shortly.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="pill-badge pill-badge-orange" style={{ marginBottom: '10px' }}>
                    <span className="pulse-dot" />
                    <span>Free 30-Min Strategy Call</span>
                  </div>
                  <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                    Book your <span className="serif-italic">Growth Session</span>
                  </h3>
                  <p style={{ fontSize: '13px', color: '#888', marginBottom: '18px' }}>
                    Tell us about your brand before our call.
                  </p>

                  <form onSubmit={handleModalSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a3a3a3', marginBottom: '4px' }}>
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Morgan"
                        value={modalForm.name}
                        onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          background: '#161616',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '8px',
                          color: '#fff',
                          fontSize: '13px',
                          outline: 'none',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a3a3a3', marginBottom: '4px' }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@yourbrand.com"
                        value={modalForm.email}
                        onChange={(e) => setModalForm({ ...modalForm, email: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          background: '#161616',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '8px',
                          color: '#fff',
                          fontSize: '13px',
                          outline: 'none',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a3a3a3', marginBottom: '4px' }}>
                        Website URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://yourbrand.com"
                        value={modalForm.website}
                        onChange={(e) => setModalForm({ ...modalForm, website: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          background: '#161616',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '8px',
                          color: '#fff',
                          fontSize: '13px',
                          outline: 'none',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a3a3a3', marginBottom: '4px' }}>
                        Monthly Spend
                      </label>
                      <select
                        value={modalForm.spend}
                        onChange={(e) => setModalForm({ ...modalForm, spend: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          background: '#161616',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '8px',
                          color: '#fff',
                          fontSize: '13px',
                          outline: 'none',
                        }}
                      >
                        <option value="<$5k">&lt; $5k / mo</option>
                        <option value="$5k - $15k">$5k - $15k / mo</option>
                        <option value="$15k - $50k">$15k - $50k / mo</option>
                        <option value="$50k+">$50k+ / mo</option>
                      </select>
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-primary"
                      style={{ marginTop: '6px', width: '100%', padding: '11px' }}
                    >
                      Confirm Booking
                    </motion.button>
                  </form>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
        @media (pointer: coarse) {
          .cursor-dot, .cursor-ring {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
