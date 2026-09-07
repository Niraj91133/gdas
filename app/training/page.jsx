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

export default function TrainingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [activeModule, setActiveModule] = useState(0);

  const [demoForm, setDemoForm] = useState({
    name: '',
    email: '',
    phone: '',
    experience: 'Beginner (Starting out)',
    preferredSlot: 'Weekend Live Batch (11 AM IST)',
    goals: '',
  });
  const [demoSubmitted, setDemoSubmitted] = useState(false);

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

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    setDemoSubmitted(true);
    setTimeout(() => {
      setDemoModalOpen(false);
      setDemoSubmitted(false);
      setDemoForm({ name: '', email: '', phone: '', experience: 'Beginner (Starting out)', preferredSlot: 'Weekend Live Batch (11 AM IST)', goals: '' });
    }, 2800);
  };

  // Course Curriculum Modules
  const curriculumModules = [
    {
      moduleNum: 'Module 01',
      title: 'Meta Ads Blueprint: From $0 to $100k/Month Scaling',
      duration: '3 Weeks • 12 Live Classes',
      topics: [
        'CBO vs ABO Strategy & Bid Caps Mastery',
        'Direct-Response Creative Testing Framework (Hook, Body, CTA)',
        'Lookalike & Advantage+ Shopping Campaigns (ASC)',
        'Account Structure for 4.5x+ ROAS Profitability',
      ],
      icon: '🎯',
    },
    {
      moduleNum: 'Module 02',
      title: 'Google & YouTube Ads: Capturing High-Intent Buyers',
      duration: '2.5 Weeks • 10 Live Classes',
      topics: [
        'High-Intent Keyword Architecture & Negative Match Lists',
        'Performance Max (PMax) Asset Optimization & Signal Feeds',
        'YouTube In-Stream Video Ads for High-Ticket Lead Gen',
        'Google Shopping & Merchant Center Feed Optimization',
      ],
      icon: '🔍',
    },
    {
      moduleNum: 'Module 03',
      title: 'Performance Creative & UGC Video Production Lab',
      duration: '2 Weeks • 8 Live Classes',
      topics: [
        'Scriptwriting 3-Second Scroll-Stopping Hooks',
        'UGC Creator Sourcing, Briefing & Contract Templates',
        'Fast-Paced CapCut & Premiere Pro Direct-Response Editing',
        'Static Image Ads & Carousel Psychology',
      ],
      icon: '🎨',
    },
    {
      moduleNum: 'Module 04',
      title: 'Conversion Rate Optimization (CRO) & Funnels',
      duration: '2 Weeks • 8 Live Classes',
      topics: [
        'Shopify & Next.js Landing Page Architecture',
        'Psychological Triggers (Social Proof, Urgency, Micro-Copies)',
        'A/B Testing Headlines, Hero Sections & Sticky CTAs',
        'Checkout Funnel Friction Removal to Double Conversion Rate',
      ],
      icon: '⚡',
    },
    {
      moduleNum: 'Module 05',
      title: 'Server-Side CAPI, GA4 & Attribution Engineering',
      duration: '1.5 Weeks • 6 Live Classes',
      topics: [
        'Overcoming iOS 14.5+ Signal Loss with Meta Conversions API (CAPI)',
        'Server-Side Google Tag Manager (sGTM) Deployment',
        'GA4 Custom Funnel Reports & First-Party Data Capture',
        'Multi-Touch Attribution Modeling (Triple Whale / Northbeam)',
      ],
      icon: '📊',
    },
    {
      moduleNum: 'Module 06',
      title: 'Agency Freelancing, Client Acquisition & Career Placement',
      duration: '1 Week • 4 Live Classes',
      topics: [
        'How to Land $1,500 - $3,000/mo Retainer Clients (Cold Outreach Scripts)',
        'Preparing Client Audits, Pitch Decks & Proposals',
        'Resume Building, Mock Technical Interviews & Placement Assistance',
        'GDAs Agency Live Internship Opportunities for Top Performers',
      ],
      icon: '💼',
    },
  ];

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
      {/* ANIMATED BLINKING GOOGLY EYES CURSOR */}
      {/* ========================================================================= */}
      {isClient && (
        <motion.div
          className="custom-eyes-cursor"
          animate={{
            x: mousePosition.x - 17,
            y: mousePosition.y - 14,
            scale: cursorHovered ? 1.2 : 1,
          }}
          transition={{ type: 'spring', damping: 28, stiffness: 420, mass: 0.12 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            pointerEvents: 'none',
            zIndex: 99999,
          }}
        >
          {/* Left Eye */}
          <motion.div
            animate={{ scaleY: isBlinking ? 0.08 : 1 }}
            transition={{ duration: 0.09, ease: 'easeInOut' }}
            style={{
              width: '16px',
              height: '26px',
              backgroundColor: '#ffffff',
              borderRadius: '13px',
              position: 'relative',
              boxShadow: '0 3px 12px rgba(0,0,0,0.7)',
              transformOrigin: 'center center',
            }}
          >
            <motion.div
              animate={{ x: pupilOffset.x, y: pupilOffset.y }}
              transition={{ type: 'spring', damping: 20, stiffness: 400, mass: 0.08 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '11px',
                height: '15px',
                backgroundColor: '#000000',
                borderRadius: '50%',
              }}
            >
              <div style={{ position: 'absolute', bottom: '3px', right: '3px', width: '2.5px', height: '2.5px', backgroundColor: '#ffffff', borderRadius: '50%' }} />
            </motion.div>
          </motion.div>

          {/* Right Eye */}
          <motion.div
            animate={{ scaleY: isBlinking ? 0.08 : 1 }}
            transition={{ duration: 0.09, ease: 'easeInOut' }}
            style={{
              width: '16px',
              height: '26px',
              backgroundColor: '#ffffff',
              borderRadius: '13px',
              position: 'relative',
              boxShadow: '0 3px 12px rgba(0,0,0,0.7)',
              transformOrigin: 'center center',
            }}
          >
            <motion.div
              animate={{ x: pupilOffset.x, y: pupilOffset.y }}
              transition={{ type: 'spring', damping: 20, stiffness: 400, mass: 0.08 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '11px',
                height: '15px',
                backgroundColor: '#000000',
                borderRadius: '50%',
              }}
            >
              <div style={{ position: 'absolute', bottom: '3px', right: '3px', width: '2.5px', height: '2.5px', backgroundColor: '#ffffff', borderRadius: '50%' }} />
            </motion.div>
          </motion.div>
        </motion.div>
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
          <Link
            href="/"
            onMouseEnter={() => setCursorHovered(true)}
            onMouseLeave={() => setCursorHovered(false)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#fff' }}
          >
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
            <span style={{ fontWeight: 800, fontSize: '18px', letterSpacing: '-0.02em', color: '#ffffff' }}>
              GDAs<span style={{ color: '#3b82f6' }}>.</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '26px' }} className="desktop-nav">
            <Link href="/" onMouseEnter={() => setCursorHovered(true)} onMouseLeave={() => setCursorHovered(false)} style={{ fontSize: '13.5px', fontWeight: 500, color: '#a3a3a3', textDecoration: 'none' }}>Home</Link>
            <Link href="/about" onMouseEnter={() => setCursorHovered(true)} onMouseLeave={() => setCursorHovered(false)} style={{ fontSize: '13.5px', fontWeight: 500, color: '#a3a3a3', textDecoration: 'none' }}>About</Link>
            <Link href="/#services" onMouseEnter={() => setCursorHovered(true)} onMouseLeave={() => setCursorHovered(false)} style={{ fontSize: '13.5px', fontWeight: 500, color: '#a3a3a3', textDecoration: 'none' }}>Services</Link>
            <Link href="/training" onMouseEnter={() => setCursorHovered(true)} onMouseLeave={() => setCursorHovered(false)} style={{ fontSize: '13.5px', fontWeight: 700, color: '#3b82f6', textDecoration: 'none' }}>Training</Link>
            <Link href="/blog" onMouseEnter={() => setCursorHovered(true)} onMouseLeave={() => setCursorHovered(false)} style={{ fontSize: '13.5px', fontWeight: 500, color: '#a3a3a3', textDecoration: 'none' }}>Blog</Link>
            <Link href="/careers" onMouseEnter={() => setCursorHovered(true)} onMouseLeave={() => setCursorHovered(false)} style={{ fontSize: '13.5px', fontWeight: 500, color: '#a3a3a3', textDecoration: 'none' }}>Careers</Link>
          </nav>

          {/* Right Action */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              onClick={() => setDemoModalOpen(true)}
              className="btn btn-primary"
              style={{ padding: '8px 18px', fontSize: '12.5px', fontWeight: 700 }}
            >
              Book Free Demo →
            </motion.button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-hamburger"
              aria-label="Toggle Menu"
              style={{ display: 'none', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '6px' }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileMenuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              style={{
                marginTop: '10px',
                background: 'rgba(10, 10, 10, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '16px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <Link href="/" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>Home</Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>About</Link>
              <Link href="/#services" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>Services</Link>
              <Link href="/training" onClick={() => setMobileMenuOpen(false)} style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '15px', fontWeight: 700 }}>Training</Link>
              <Link href="/blog" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>Blog</Link>
              <Link href="/careers" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>Careers</Link>
              <button
                onClick={() => { setMobileMenuOpen(false); setDemoModalOpen(true); }}
                className="btn btn-primary"
                style={{ width: '100%', padding: '10px' }}
              >
                Book Free Demo Class →
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION */}
      {/* ========================================================================= */}
      <section style={{ paddingTop: '155px', paddingBottom: '70px', position: 'relative' }}>
        <div className="container-custom" style={{ textAlign: 'center' }}>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={blurFadeIn}
            custom={0}
            style={{ display: 'inline-flex', marginBottom: '22px' }}
          >
            <div className="pill-badge pill-badge-orange">
              <span className="pulse-dot" />
              <span>Live Batch Enrolling • 100% Practical Agency Training</span>
            </div>
          </motion.div>

          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={blurFadeIn}
            custom={1}
            style={{
              fontSize: 'clamp(36px, 5.5vw, 66px)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.035em',
              maxWidth: '920px',
              margin: '0 auto 22px auto',
            }}
          >
            Master Performance Paid Ads & Growth Marketing from <span className="serif-italic" style={{ color: '#3b82f6' }}>Real Agency Practitioners</span>.
          </motion.h1>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={blurFadeIn}
            custom={2}
            style={{
              fontSize: 'clamp(15px, 1.8vw, 18px)',
              color: '#a3a3a3',
              maxWidth: '720px',
              margin: '0 auto 36px auto',
              lineHeight: 1.6,
            }}
          >
            Learn the exact Meta & Google scaling frameworks, UGC video psychology, and server-side tracking setups we use to manage $250k+/month live ad spend. No outdated theory.
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={blurFadeIn}
            custom={3}
            style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(37, 99, 235, 0.6)' }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setDemoModalOpen(true)}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              className="btn btn-primary"
              style={{ padding: '15px 32px', fontSize: '15px', fontWeight: 700 }}
            >
              Book Free Live Demo Class →
            </motion.button>
            <a
              href="#curriculum"
              className="btn btn-secondary"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              style={{ padding: '15px 28px', fontSize: '15px' }}
            >
              View Full Syllabus ↓
            </a>
          </motion.div>

          {/* Key Training Highlights Bar */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={blurFadeIn}
            custom={4}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginTop: '55px',
            }}
          >
            {[
              { title: '$50k+ Live Ad Budgets', desc: 'Run real campaigns on live client accounts', icon: '💳' },
              { title: '1-on-1 Agency Mentorship', desc: 'Direct feedback on your ads & campaigns', icon: '👨‍🏫' },
              { title: '100% Placement Assistance', desc: 'Resume review & job interview pipelines', icon: '🚀' },
              { title: 'Agency Certification', desc: 'Verified certificate recognized by top DTC brands', icon: '📜' },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: '20px 16px',
                  textAlign: 'left',
                }}
              >
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{item.icon}</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>{item.title}</div>
                <div style={{ fontSize: '12px', color: '#888' }}>{item.desc}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CURRICULUM BREAKDOWN */}
      {/* ========================================================================= */}
      <section id="curriculum" className="section-spacing" style={{ background: '#050505' }}>
        <div className="container-custom">
          
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 50px auto' }}>
            <div className="section-tag">Comprehensive Syllabus</div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
              12 Weeks of <span className="serif-italic" style={{ color: '#3b82f6' }}>Hands-on Performance Mastery</span>.
            </h2>
            <p style={{ fontSize: '15px', color: '#a3a3a3', marginTop: '12px' }}>
              From initial audience research to advanced CAPI tracking, master every layer of modern digital marketing.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {curriculumModules.map((module, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={blurFadeIn}
                custom={idx}
                whileHover={{ y: -6, borderColor: 'rgba(37, 99, 235, 0.45)' }}
                style={{
                  background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 100%)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '20px',
                  padding: '30px 26px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      {module.moduleNum}
                    </span>
                    <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.08)', padding: '4px 10px', borderRadius: '50px', color: '#aaa' }}>
                      {module.duration}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '19px', fontWeight: 700, color: '#fff', marginBottom: '18px', lineHeight: 1.3 }}>
                    {module.icon} {module.title}
                  </h3>

                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {module.topics.map((topic, tIdx) => (
                      <li key={tIdx} style={{ fontSize: '13px', color: '#999', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <span style={{ color: '#3b82f6', fontWeight: 700 }}>✓</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <button
                    onClick={() => setDemoModalOpen(true)}
                    onMouseEnter={() => setCursorHovered(true)}
                    onMouseLeave={() => setCursorHovered(false)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#3b82f6',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: 0,
                    }}
                  >
                    Enroll in this Module →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. WHO IS THIS COURSE FOR */}
      {/* ========================================================================= */}
      <section className="section-spacing">
        <div className="container-custom">
          
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px auto' }}>
            <div className="section-tag">Ideal Candidates</div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
              Engineered for <span className="serif-italic" style={{ color: '#3b82f6' }}>high-ambition marketers</span>.
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px',
            }}
          >
            {[
              { role: 'Aspiring Media Buyers', desc: 'Transition from basic marketing into high-paying performance media buying roles ($60k-$120k/yr).', tag: 'Career Switch' },
              { role: 'DTC Founders & E-Com Owners', desc: 'Stop wasting money on agencies. Master paid ads yourself and scale your brand profitably.', tag: 'Brand Owners' },
              { role: 'Freelancers & Agency Owners', desc: 'Learn elite scaling workflows, charge $2k-$5k/mo retainers, and retain clients with real ROAS.', tag: 'Agency Scale' },
              { role: 'College Grads & Students', desc: 'Get practical, portfolio-backed skills with live client case studies to land top agency jobs immediately.', tag: 'Job Ready' },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={blurFadeIn}
                custom={idx}
                style={{
                  background: '#0a0a0a',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '18px',
                  padding: '28px 22px',
                }}
              >
                <div style={{ fontSize: '11px', color: '#60a5fa', fontWeight: 700, textTransform: 'uppercase', marginBottom: '10px' }}>
                  {card.tag}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>
                  {card.role}
                </h3>
                <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.5 }}>
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. BOTTOM CTA BANNER */}
      {/* ========================================================================= */}
      <section className="section-spacing" style={{ paddingTop: '30px', paddingBottom: '90px' }}>
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={blurFadeIn}
            style={{
              borderRadius: '28px',
              padding: 'clamp(40px, 6vw, 70px) clamp(24px, 4vw, 50px)',
              background: 'linear-gradient(135deg, #0a0a0a 0%, #0c1a30 50%, #172554 100%)',
              border: '1px solid rgba(37, 99, 235, 0.35)',
              boxShadow: '0 0 60px rgba(37, 99, 235, 0.2)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '30px',
            }}
          >
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px' }}>
              <div className="pill-badge pill-badge-orange" style={{ marginBottom: '14px' }}>
                <span className="pulse-dot" />
                <span>Next Cohort Starts This Saturday</span>
              </div>
              <h2 style={{ fontSize: 'clamp(28px, 4.2vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#fff' }}>
                Attend a free <span className="serif-italic" style={{ color: '#3b82f6' }}>Live Demo Class</span>.
              </h2>
              <p style={{ fontSize: '15px', color: '#a3a3a3', marginTop: '12px' }}>
                Experience our live agency campaign breakdown and interact with our lead instructors before enrolling.
              </p>
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(37, 99, 235, 0.6)' }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setDemoModalOpen(true)}
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                className="btn btn-primary"
                style={{ padding: '16px 36px', fontSize: '16px', fontWeight: 700 }}
              >
                Reserve Demo Seat →
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. COMPREHENSIVE AGENCY FOOTER */}
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
              <span style={{ fontWeight: 800, fontSize: '16px' }}>
                GDAs<span style={{ color: '#3b82f6' }}>.</span>
              </span>
            </Link>

            <div style={{ display: 'flex', gap: '20px', fontSize: '13px', flexWrap: 'wrap' }}>
              <Link href="/" style={{ color: '#888', textDecoration: 'none' }}>Home</Link>
              <Link href="/about" style={{ color: '#888', textDecoration: 'none' }}>About</Link>
              <Link href="/#services" style={{ color: '#888', textDecoration: 'none' }}>Services</Link>
              <Link href="/training" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 600 }}>Training</Link>
              <Link href="/blog" style={{ color: '#888', textDecoration: 'none' }}>Blog</Link>
              <Link href="/careers" style={{ color: '#888', textDecoration: 'none' }}>Careers</Link>
              <Link href="/privacy-policy" style={{ color: '#888', textDecoration: 'none' }}>Privacy Policy</Link>
              <Link href="/refund-policy" style={{ color: '#888', textDecoration: 'none' }}>Refund Policy</Link>
              <Link href="/terms-conditions" style={{ color: '#888', textDecoration: 'none' }}>Terms & Conditions</Link>
              <Link href="/disclaimer" style={{ color: '#888', textDecoration: 'none' }}>Disclaimer</Link>
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
              <span>All training systems live</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* 7. BOOK FREE DEMO CLASS MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {demoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setDemoModalOpen(false)}
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
                onClick={() => setDemoModalOpen(false)}
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

              {demoSubmitted ? (
                <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(37,99,235,0.15)', color: '#3b82f6', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px auto' }}>
                    ✓
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Demo Seat Confirmed!</h3>
                  <p style={{ fontSize: '13px', color: '#a3a3a3' }}>
                    We've emailed your live session access link and WhatsApp group invite.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="pill-badge pill-badge-orange" style={{ marginBottom: '10px' }}>
                    <span className="pulse-dot" />
                    <span>Free Live Demo Class Access</span>
                  </div>
                  <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                    Reserve your <span className="serif-italic">Demo Class</span>
                  </h3>
                  <p style={{ fontSize: '13px', color: '#888', marginBottom: '18px' }}>
                    Experience real agency ad buying frameworks live on Zoom.
                  </p>

                  <form onSubmit={handleDemoSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a3a3a3', marginBottom: '4px' }}>
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={demoForm.name}
                        onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                        style={{ width: '100%', background: '#141414', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '13px', outline: 'none' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a3a3a3', marginBottom: '4px' }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="rahul@gmail.com"
                        value={demoForm.email}
                        onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                        style={{ width: '100%', background: '#141414', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '13px', outline: 'none' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a3a3a3', marginBottom: '4px' }}>
                        WhatsApp Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={demoForm.phone}
                        onChange={(e) => setDemoForm({ ...demoForm, phone: e.target.value })}
                        style={{ width: '100%', background: '#141414', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '13px', outline: 'none' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a3a3a3', marginBottom: '4px' }}>
                        Current Experience Level
                      </label>
                      <select
                        value={demoForm.experience}
                        onChange={(e) => setDemoForm({ ...demoForm, experience: e.target.value })}
                        style={{ width: '100%', background: '#141414', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '13px', outline: 'none' }}
                      >
                        <option value="Beginner (Starting out)">Beginner (Starting out)</option>
                        <option value="Intermediate (Ran basic ads)">Intermediate (Ran basic ads)</option>
                        <option value="Advanced / Agency Marketer">Advanced / Agency Marketer</option>
                        <option value="Business Owner / Founder">Business Owner / Founder</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a3a3a3', marginBottom: '4px' }}>
                        Preferred Demo Slot
                      </label>
                      <select
                        value={demoForm.preferredSlot}
                        onChange={(e) => setDemoForm({ ...demoForm, preferredSlot: e.target.value })}
                        style={{ width: '100%', background: '#141414', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '13px', outline: 'none' }}
                      >
                        <option value="Weekend Live Batch (11 AM IST)">Saturday / Sunday (11:00 AM IST)</option>
                        <option value="Weekday Evening Batch (7 PM IST)">Monday - Friday (7:00 PM IST)</option>
                        <option value="1-on-1 Personalized Demo">1-on-1 Personalized Session</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ marginTop: '8px', padding: '12px', fontSize: '14px', fontWeight: 700 }}
                    >
                      Confirm Free Demo Class →
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
          .desktop-nav {
            display: none !important;
          }
          .mobile-hamburger {
            display: block !important;
          }
        }
        @media (pointer: coarse) {
          .custom-eyes-cursor {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
