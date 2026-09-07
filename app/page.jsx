'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Signature Framer "Blur to Normal" Scroll Animations
const blurFadeIn = {
  hidden: { opacity: 0, filter: 'blur(10px)', y: 30 },
  visible: (custom = 0) => ({
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: {
      duration: 0.8,
      delay: custom * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const blurStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
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

  // Video Testimonials Data
  const clientVideos = [
    {
      id: 1,
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
      brandLogo: 'theo',
      brandType: 'script',
      quote: 'Our results and online presence went through the roof more or less overnight, mind-blowing!',
      name: 'Malik Shkraba',
      role: 'COO of Friday',
      videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    },
    {
      id: 2,
      thumbnail: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80',
      brandLogo: 'Amsterdam',
      brandType: 'icon',
      quote: "These guys don't mess around. We saw results from month one. If you want to grow your business, look no further.",
      name: 'Tony Gomez',
      role: 'Founder of Thursday',
      videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    },
    {
      id: 3,
      thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
      brandLogo: 'SAVANNAH',
      brandType: 'bold',
      quote: 'GDAs absolutely blew the previous agency we were working with out of the water.',
      name: 'Naomi Campbell',
      role: 'CEO of Wednesday',
      videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    },
  ];

  // FAQ data
  const faqs = [
    {
      q: 'How quickly can we get started and see initial results with GDAs?',
      a: 'Once onboarding is complete (usually 48–72 hours), our media buyers and creative team launch initial test campaigns within 5 days. Most clients begin seeing positive ROAS improvements within the first 14 days.',
    },
    {
      q: 'What makes GDAs different from traditional marketing agencies?',
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
      a: 'No. GDAs works on a flexible month-to-month partnership model. We believe in earning your business every single month through transparent, measurable profitability.',
    },
    {
      q: 'How do you handle tracking and attribution after iOS 14.5+?',
      a: 'We implement server-side tracking (Meta CAPI, Google Enhanced Conversions) combined with first-party attribution software (Triple Whale / Northbeam) to ensure 99%+ accurate data without signal loss.',
    },
  ];

  // Written Testimonials data
  const testimonials = [
    {
      quote: 'GDAs scaled our Meta ads from $12k/mo to over $95k/mo while maintaining a 4.6x ROAS. Their creative iteration speed is unlike any agency we’ve worked with.',
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
      quote: 'We spent 6 months struggling to get past a plateau. GDAs audited our checkout funnel, revamped our hook strategy, and doubled our revenue in 60 days.',
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
      bio: 'Performance growth architect having scaled DTC and e-commerce brands past $25M+ in paid revenue.',
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
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#000000', color: '#ffffff', overflowX: 'hidden' }}>
      {/* Top Ambient Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="bg-ambient-top"
      />

      {/* ========================================================================= */}
      {/* 1. FLOATING NAVIGATION BAR (PERFECTLY CENTERED ON ALL SCREENS) */}
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
          {/* Logo with GDAs branding */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#fff' }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #ff4533 0%, #ff220e 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 15px rgba(255, 69, 51, 0.45)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
              { href: '#reviews', label: 'Reviews' },
              { href: '#faq', label: 'FAQ' },
            ].map((link, i) => (
              <motion.a
                key={i}
                href={link.href}
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

        {/* Mobile Dropdown Menu with Framer Motion */}
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
              <a href="#reviews" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>Reviews</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>FAQ</a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION WITH BLUR TO NORMAL REVEAL */}
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
              <span>2 slots remaining for this month</span>
            </div>
          </motion.div>

          {/* Main Headline with Blur to Normal Effect */}
          <motion.h1
            initial={{ opacity: 0, filter: 'blur(12px)', y: 30 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="hero-h1"
          >
            We generate results that <span className="serif-italic">matter.</span>
          </motion.h1>

          {/* Subtext with Blur to Normal Effect */}
          <motion.p
            initial={{ opacity: 0, filter: 'blur(10px)', y: 25 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 0.75, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
            className="hero-subtext"
          >
            Experience unprecedented growth with our paid ads strategy, tailored to skyrocket your brand and maximize profitable revenue.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 0.65, delay: 0.6 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '40px' }}
          >
            <motion.button
              onClick={() => setModalOpen(true)}
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

          {/* Social Proof (Stars & Avatars) */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(8px)', scale: 0.92 }}
            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '60px' }}
          >
            <div style={{ display: 'flex', marginLeft: '10px' }}>
              {[
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
              ].map((imgUrl, idx) => (
                <motion.img
                  key={idx}
                  src={imgUrl}
                  alt="Client avatar"
                  initial={{ opacity: 0, x: -10, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 0.75 + idx * 0.08 }}
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
          </motion.div>

          {/* Interactive Hero Analytics Graphic with Blur Reveal */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(14px)', y: 40, scale: 0.96 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0, scale: 1 }}
            transition={{ duration: 0.95, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
                  Live GDAs Client Performance Dashboard
                </div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', marginTop: '4px' }}>
                  E-Commerce Brand Portfolio Overview
                </div>
              </div>

              {/* Timeframe selector */}
              <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', padding: '3px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
                {['7D', '30D', '90D', '1Y'].map((tf) => (
                  <motion.button
                    key={tf}
                    whileTap={{ scale: 0.92 }}
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
                  </motion.button>
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
              {[
                { title: 'Total Attributed Revenue', val: '$184,920', sub: '↑ +142.8%', subColor: '#10b981', subText: 'vs prior' },
                { title: 'Blended ROAS', val: '5.84x', valColor: '#ff5533', sub: 'Target: 3.50x', subColor: '#10b981' },
                { title: 'Total Ad Spend', val: '$31,650', sub: 'Meta & Google', subColor: '#a3a3a3' },
                { title: 'Qualified Purchases', val: '2,490', sub: 'Avg Order: $74.26', subColor: '#10b981' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div style={{ fontSize: '12px', color: '#888', marginBottom: '6px' }}>{stat.title}</div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: stat.valColor || '#fff' }}>{stat.val}</div>
                  <div style={{ fontSize: '12px', color: stat.subColor, fontWeight: 600, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {stat.sub} {stat.subText && <span style={{ color: '#666', fontWeight: 400 }}>{stat.subText}</span>}
                  </div>
                </motion.div>
              ))}
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
                <line x1="0" y1="30" x2="800" y2="30" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
                <line x1="0" y1="80" x2="800" y2="80" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
                <line x1="0" y1="130" x2="800" y2="130" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />

                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.9, ease: 'easeInOut' }}
                  d="M0,160 Q100,140 200,120 T400,90 T600,45 T800,20 L800,180 L0,180 Z"
                  fill="url(#chartGradient)"
                />
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.9, ease: 'easeInOut' }}
                  d="M0,160 Q100,140 200,120 T400,90 T600,45 T800,20"
                  fill="none"
                  stroke="#ff4533"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

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
        style={{ padding: '40px 0 60px 0', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
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
      </motion.section>

      {/* ========================================================================= */}
      {/* 4. HEAR IT DIRECTLY FROM OUR CLIENTS (VIDEO TESTIMONIALS WITH BLUR) */}
      {/* ========================================================================= */}
      <section className="section-spacing" id="client-videos" style={{ position: 'relative' }}>
        <div className="container-custom">
          {/* Section Header with Blur to Normal */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)', y: 30 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            className="section-header"
          >
            <div className="pill-badge" style={{ marginBottom: '8px' }}>
              <span>Our Clients</span>
            </div>
            <h2 className="section-title">
              Hear it directly from <span className="serif-italic">our clients.</span>
            </h2>
            <p className="section-subtitle">
              Hear what our clients have to say. Our testimonials reflect the satisfaction our clients have in our services.
            </p>
          </motion.div>

          {/* Video Cards Grid with Staggered Blur to Normal */}
          <div style={{ position: 'relative' }}>
            <motion.div
              variants={blurStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '24px',
              }}
            >
              {clientVideos.map((video, idx) => (
                <motion.div
                  key={video.id}
                  variants={blurFadeIn}
                  custom={idx}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="glass-card"
                  style={{
                    padding: '16px',
                    borderRadius: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  {/* Video Thumbnail Box */}
                  <div
                    onClick={() => setVideoModal(video)}
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '240px',
                      borderRadius: '16px',
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
                        transition: 'transform 0.4s ease',
                      }}
                    />

                    {/* Dark gradient overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%)',
                      }}
                    />

                    {/* Red / Orange Circular Play Button */}
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '54px',
                        height: '54px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #ff4533 0%, #ff220e 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 24px rgba(255, 69, 51, 0.6)',
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff" stroke="none">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </motion.div>

                    {/* Custom Video Control Bar */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '12px',
                        left: '14px',
                        right: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '11px',
                        color: 'rgba(255,255,255,0.9)',
                        fontWeight: 600,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        <span>00:00</span>
                        <div style={{ width: '40px', height: '3px', background: 'rgba(255,255,255,0.4)', borderRadius: '2px', position: 'relative' }}>
                          <div style={{ width: '12px', height: '100%', background: '#ff4533' }} />
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                        </svg>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                          <circle cx="12" cy="12" r="3" />
                          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                        </svg>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                          <polyline points="15 3 21 3 21 9" />
                          <polyline points="9 21 3 21 3 15" />
                          <line x1="21" y1="3" x2="14" y2="10" />
                          <line x1="3" y1="21" x2="10" y2="14" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Client Brand & Testimonial Quote */}
                  <div style={{ padding: '24px 8px 12px 8px' }}>
                    <div style={{ height: '32px', display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                      {video.brandType === 'script' && (
                        <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '28px', fontWeight: 700, letterSpacing: '-0.03em', color: '#ffffff' }}>
                          theo
                        </span>
                      )}
                      {video.brandType === 'icon' && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#fff', display: 'inline-block' }} />
                          <span style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff' }}>
                            Amsterdam
                          </span>
                        </div>
                      )}
                      {video.brandType === 'bold' && (
                        <span style={{ fontSize: '22px', fontWeight: 900, letterSpacing: '0.04em', color: '#ffffff' }}>
                          {video.brandLogo}
                        </span>
                      )}
                    </div>

                    <p style={{ fontSize: '15px', color: '#a3a3a3', lineHeight: 1.6, marginBottom: '24px', minHeight: '68px' }}>
                      &ldquo;{video.quote}&rdquo;
                    </p>

                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
                      <div style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff' }}>{video.name}</div>
                      <div style={{ fontSize: '13px', color: '#777', marginTop: '2px' }}>{video.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Red Floating Carousel Navigation Button */}
            <motion.button
              onClick={() => setVideoModal(clientVideos[0])}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              style={{
                position: 'absolute',
                top: '40%',
                right: '-16px',
                transform: 'translateY(-50%)',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: '#ff4533',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(255, 69, 51, 0.5)',
                zIndex: 10,
              }}
              aria-label="Next client review"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </motion.button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SERVICES SECTION WITH BLUR TO NORMAL */}
      {/* ========================================================================= */}
      <section className="section-spacing" id="services" style={{ background: 'linear-gradient(180deg, #000 0%, #080808 50%, #000 100%)' }}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)', y: 30 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            className="section-header"
          >
            <div className="pill-badge pill-badge-orange">
              <span>// WHAT WE DO</span>
            </div>
            <h2 className="section-title">
              Services to take your business to the <span className="serif-italic">next level.</span>
            </h2>
            <p className="section-subtitle">
              Comprehensive paid media execution backed by creative engineering and conversion rate optimization.
            </p>
          </motion.div>

          <motion.div
            variants={blurStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
              gap: '24px',
            }}
          >
            {[
              {
                badge: 'SCALE CHANNELS',
                title: 'Meta Ads (FB & IG)',
                desc: 'Advanced Advantage+ shopping campaigns, dynamic retargeting, and broad audience scaling for maximum revenue.',
                features: ['Advantage+ Budget Architecture', 'Creative Hook Variation Testing', 'CAPI & Pixel Setup'],
              },
              {
                badge: 'SEARCH INTENT',
                title: 'Google & YouTube Ads',
                desc: 'Capture high-intent buyers searching for your solution and scale with Performance Max and YouTube bumper ads.',
                features: ['Performance Max Campaign Design', 'High-Intent Search Keyword Bidding', 'YouTube Funnel Retargeting'],
              },
              {
                badge: 'VIRAL GROWTH',
                title: 'TikTok Ads & Spark',
                desc: 'Creator Spark ads, native trending hooks, and rapid iteration formats that turn viral attention into checkout conversions.',
                features: ['Creator Spark Ad Sourcing', 'First 3-Second Hook Optimization', 'Gen-Z Native Creative Direction'],
              },
              {
                badge: 'MAX PROFIT',
                title: 'Creative Strategy & CRO',
                desc: 'Landing page redesigns, checkout friction removal, and A/B split testing to increase conversion rates across every visit.',
                features: ['High-Converting Advertorials', 'A/B Landing Page Split Testing', 'Checkout Average Order Value (AOV) Boost'],
              },
            ].map((srv, idx) => (
              <motion.div
                key={idx}
                variants={blurFadeIn}
                custom={idx}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="glass-card"
                style={{ padding: '32px' }}
              >
                <div style={{ display: 'inline-block', padding: '6px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', fontSize: '12px', fontWeight: 600, color: '#ff7766', marginBottom: '20px' }}>
                  {srv.badge}
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '12px' }}>{srv.title}</h3>
                <p style={{ fontSize: '14px', color: '#a3a3a3', lineHeight: 1.6, marginBottom: '24px' }}>
                  {srv.desc}
                </p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#d1d1d1' }}>
                  {srv.features.map((f, fi) => (
                    <li key={fi} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#ff4533' }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
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
          >
            <div className="pill-badge">
              <span>// THE DIFFERENCE</span>
            </div>
            <h2 className="section-title">
              Why would you want to work <span className="serif-italic">with GDAs?</span>
            </h2>
            <p className="section-subtitle">
              See how our agile performance model compares to traditional marketing agencies.
            </p>
          </motion.div>

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
            <motion.div
              initial={{ opacity: 0, filter: 'blur(10px)', x: -30 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8 }}
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
            </motion.div>

            {/* GDAs Agency Card (Glowing) */}
            <motion.div
              initial={{ opacity: 0, filter: 'blur(10px)', x: 30 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8 }}
              whileHover={{ y: -4 }}
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
                GDAs Framework
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
                <motion.button
                  onClick={() => setModalOpen(true)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary"
                  style={{ width: '100%' }}
                >
                  Experience the difference
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. 3-STEP PROCESS SECTION WITH BLUR TO NORMAL */}
      {/* ========================================================================= */}
      <section className="section-spacing" id="process" style={{ background: '#050505' }}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)', y: 30 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            className="section-header"
          >
            <div className="pill-badge pill-badge-orange">
              <span>// HOW IT WORKS</span>
            </div>
            <h2 className="section-title">
              Our simple 3-step process to <span className="serif-italic">skyrocket</span> your business.
            </h2>
            <p className="section-subtitle">
              We eliminate guesswork with a streamlined, repeatable roadmap built for scale.
            </p>
          </motion.div>

          <motion.div
            variants={blurStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '28px',
            }}
          >
            {[
              { num: '01', title: 'In-Depth Funnel & Ad Audit', desc: 'We dissect your past campaigns, ad accounts, pixel tracking, and checkout conversion drop-offs to pinpoint the exact levers for rapid revenue growth.' },
              { num: '02', title: 'Creative & Campaign Architecture', desc: 'Our creative lab produces high-impact UGC hooks, static carousels, and copy angles while we construct clean, scalable ad account structures.' },
              { num: '03', title: 'Aggressive Scale & Profit Maximization', desc: 'We aggressively inject budget into winning creative angles, expand audience reach, and continuously optimize checkout metrics for maximum net margin.' },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                variants={blurFadeIn}
                custom={idx}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="glass-card"
                style={{ padding: '36px' }}
              >
                <div
                  style={{
                    fontSize: '44px',
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    color: '#ff4533',
                    marginBottom: '16px',
                  }}
                >
                  {step.num}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '15px', color: '#a3a3a3', lineHeight: 1.6 }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. TESTIMONIALS / REVIEWS WITH BLUR TO NORMAL */}
      {/* ========================================================================= */}
      <section className="section-spacing" id="reviews">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)', y: 30 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            className="section-header"
          >
            <div className="pill-badge">
              <span>// TESTIMONIALS</span>
            </div>
            <h2 className="section-title">
              There&apos;s a reason people are <span className="serif-italic">raving</span> about GDAs.
            </h2>
            <p className="section-subtitle">
              Don&apos;t just take our word for it. Here is what leading founders and CMOs have to say.
            </p>
          </motion.div>

          <motion.div
            variants={blurStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {testimonials.map((item, idx) => (
              <motion.div
                key={idx}
                variants={blurFadeIn}
                custom={idx}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="glass-card"
                style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
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
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. TEAM SECTION WITH BLUR TO NORMAL */}
      {/* ========================================================================= */}
      <section className="section-spacing" id="team" style={{ background: '#050505' }}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)', y: 30 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            className="section-header"
          >
            <div className="pill-badge pill-badge-orange">
              <span>// THE MINDS</span>
            </div>
            <h2 className="section-title">
              Meet the <span className="serif-italic">incredible</span> team.
            </h2>
            <p className="section-subtitle">
              Direct access to seasoned growth architects dedicated to your brand.
            </p>
          </motion.div>

          <motion.div
            variants={blurStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px',
            }}
          >
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                variants={blurFadeIn}
                custom={idx}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="glass-card"
                style={{ overflow: 'hidden' }}
              >
                <div style={{ width: '100%', height: '240px', overflow: 'hidden' }}>
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4 }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. FAQ ACCORDION WITH BLUR TO NORMAL */}
      {/* ========================================================================= */}
      <section className="section-spacing" id="faq">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)', y: 30 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            className="section-header"
          >
            <div className="pill-badge">
              <span>// COMMON QUESTIONS</span>
            </div>
            <h2 className="section-title">
              Frequently Asked <span className="serif-italic">Questions.</span>
            </h2>
            <p className="section-subtitle">
              Everything you need to know about our partnership and onboarding process.
            </p>
          </motion.div>

          <motion.div
            variants={blurStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '14px' }}
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
                    borderRadius: '16px',
                    borderColor: isOpen ? 'rgba(255, 69, 51, 0.3)' : 'rgba(255, 255, 255, 0.08)',
                    transition: 'border-color 0.25s ease',
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
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
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
                      }}
                    >
                      +
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, filter: 'blur(6px)' }}
                        animate={{ height: 'auto', opacity: 1, filter: 'blur(0px)' }}
                        exit={{ height: 0, opacity: 0, filter: 'blur(6px)' }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ padding: '0 28px 24px 28px', fontSize: '15px', color: '#a3a3a3', lineHeight: 1.6 }}>
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
      {/* 11. FINAL CTA BANNER WITH BLUR TO NORMAL */}
      {/* ========================================================================= */}
      <section style={{ padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
        <div className="bg-ambient-cta" />
        <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, filter: 'blur(14px)', scale: 0.94, y: 40 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
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
              Book a 30-minute free growth strategy call with GDAs. We will audit your current ads and map out a step-by-step roadmap to scale.
            </p>

            <motion.button
              onClick={() => setModalOpen(true)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
              style={{ padding: '14px 36px', fontSize: '15px' }}
            >
              Book your free call
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.button>

            <div style={{ marginTop: '24px', fontSize: '13px', color: '#777', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <span>✓ 100% Free Strategy Call</span>
              <span>✓ No Long-Term Retainers</span>
              <span>✓ Actionable Growth Plan</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. FOOTER */}
      {/* ========================================================================= */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.08)', background: '#050505', padding: '60px 0 40px 0' }}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
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
                <span style={{ fontWeight: 800, fontSize: '17px', letterSpacing: '-0.02em' }}>
                  GDAs<span style={{ color: '#ff4533' }}>.</span>
                </span>
              </a>
              <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.6, marginBottom: '20px' }}>
                GDAs (Ganesha Digital Ads) is a performance-driven paid acquisition agency helping DTC and high-growth brands scale with confidence.
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
                <li><a href="#client-videos" style={{ color: '#888', textDecoration: 'none' }}>Client Videos</a></li>
                <li><a href="#services" style={{ color: '#888', textDecoration: 'none' }}>Services</a></li>
                <li><a href="#why-us" style={{ color: '#888', textDecoration: 'none' }}>Why Us</a></li>
                <li><a href="#process" style={{ color: '#888', textDecoration: 'none' }}>Process</a></li>
                <li><a href="#reviews" style={{ color: '#888', textDecoration: 'none' }}>Reviews</a></li>
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
                <li><a href="mailto:contact@ganeshadigiads.in" style={{ color: '#888', textDecoration: 'none' }}>Email Support</a></li>
              </ul>
            </div>

            {/* Newsletter Column */}
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#fff', marginBottom: '16px' }}>
                Weekly Ad Breakdowns
              </div>
              <p style={{ fontSize: '13px', color: '#888', marginBottom: '14px', lineHeight: 1.5 }}>
                Join 5,000+ founders receiving our weekly paid ads strategy breakdowns.
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
          </motion.div>

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
            <div>© {new Date().getFullYear()} GDAs (Ganesha Digital Ads). All rights reserved.</div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Privacy Policy</a>
              <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* 13. VIDEO TESTIMONIAL MODAL POPUP */}
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
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: '720px', padding: '24px' }}
            >
              <button
                onClick={() => setVideoModal(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  color: '#fff',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  zIndex: 10,
                }}
              >
                ✕
              </button>

              <div style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '12px', color: '#ff7766', fontWeight: 700, textTransform: 'uppercase' }}>
                  Client Story · {videoModal.role}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginTop: '2px' }}>
                  {videoModal.name} on working with GDAs
                </h3>
              </div>

              <div style={{ position: 'relative', width: '100%', borderRadius: '14px', overflow: 'hidden', backgroundColor: '#000', aspectRatio: '16/9' }}>
                <video
                  src={videoModal.videoSrc}
                  controls
                  autoPlay
                  poster={videoModal.thumbnail}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>

              <p style={{ fontSize: '14px', color: '#d1d1d1', marginTop: '16px', fontStyle: 'italic', lineHeight: 1.6 }}>
                &ldquo;{videoModal.quote}&rdquo;
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 14. INTERACTIVE "BOOK A CALL" MODAL */}
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
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
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
                    <span>Free 30-Min Strategy Call with GDAs</span>
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

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-primary"
                      style={{ marginTop: '8px', width: '100%', padding: '12px' }}
                    >
                      Confirm Call Request
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
      `}</style>
    </div>
  );
}
