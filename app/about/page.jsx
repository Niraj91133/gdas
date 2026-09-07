'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Framer-style "Blur to Normal" Scroll Animation variants
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

export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeValueTab, setActiveValueTab] = useState(0);
  const [whatWeDoIndex, setWhatWeDoIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const [modalForm, setModalForm] = useState({
    name: '',
    email: '',
    website: '',
    spend: '$5k - $15k',
    notes: '',
  });
  const [modalSubmitted, setModalSubmitted] = useState(false);

  // Custom Animated Blinking Eyes Cursor State with dynamic pupil tracking
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

      // Dynamic gaze direction: shifts all the way to corner/edge when moving
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

    // Periodic organic Eye Blinking
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

  const handleModalSubmit = (e) => {
    e.preventDefault();
    setModalSubmitted(true);
    setTimeout(() => {
      setModalOpen(false);
      setModalSubmitted(false);
      setModalForm({ name: '', email: '', website: '', spend: '$5k - $15k', notes: '' });
    }, 2500);
  };

  // What We Do Pillars
  const whatWeDoList = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff4533" strokeWidth="2">
          <path d="M12 20V10M18 20V4M6 20v-4" />
        </svg>
      ),
      title: 'Full-Funnel Meta Ads Scaling',
      desc: 'High-converting creative testing, rapid scaling frameworks, and lookalike audience architecture that turns ad spend into profitable revenue.',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff4533" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" />
        </svg>
      ),
      title: 'Google & YouTube Search / PMax',
      desc: 'Intent-driven keyword capture and high-converting YouTube video funnels capturing high-ticket buyers ready to convert.',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff4533" strokeWidth="2">
          <path d="m15 18-6-6 6-6" />
          <rect width="18" height="18" x="3" y="3" rx="2" />
        </svg>
      ),
      title: 'High-Converting Creative UGC Lab',
      desc: 'In-house scriptwriting, high-production UGC hooks, and motion graphic ads engineered specifically to drive CTR and lower CPA.',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff4533" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <path d="M22 6l-10 7L2 6" />
        </svg>
      ),
      title: 'Landing Page CRO & Funnel Architecture',
      desc: 'Lightning-fast, mobile-optimized landing pages with psychological conversion triggers built to double your on-page conversion rates.',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff4533" strokeWidth="2">
          <path d="M18 20V10M12 20V4M6 20v-6" />
        </svg>
      ),
      title: 'Server-Side CAPI & First-Party Attribution',
      desc: 'Rock-solid conversion API setups bypassing iOS tracking loss, ensuring full algorithm signal accuracy and zero data leakage.',
    },
  ];

  // Team Members
  const teamMembers = [
    {
      name: 'Niraj Sharma',
      role: 'Founder & Head of Growth',
      bio: 'Scaled $15M+ in paid ad revenue. Growth strategist specializing in direct-response creative frameworks.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      badge: 'Growth Architecture',
    },
    {
      name: 'Aryan Verma',
      role: 'Creative Director & UGC Lead',
      bio: 'Directs top-performing video hooks, UGC creator networks, and psychological video editing.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      badge: 'Creative Lab',
    },
    {
      name: 'Devika Patel',
      role: 'Lead Media Buyer (Meta & TikTok)',
      bio: 'Manages $250k+/month in live ad spend with proprietary audience and bid scaling algorithms.',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
      badge: 'Media Buying',
    },
    {
      name: 'Karan Mehra',
      role: 'Full-Stack CRO & Data Architect',
      bio: 'Optimizes custom landing page funnels, CAPI pipelines, and first-party attribution tracking.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
      badge: 'CRO & Tracking',
    },
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "Working with GDAs was a game-changer for our brand. Their dedication to understanding our unit economics and crafting high-converting video creative took us from $20k to $140k/month seamlessly.",
      name: 'Anthony Lumberg',
      role: 'Founder, Volt Wear DTC',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      rating: 5,
    },
    {
      quote: "We partnered with GDAs for full-funnel paid media and landing page redesign. Their creative strategy and first-party tracking eliminated guesswork, delivering a 6.2x blended ROAS.",
      name: 'Liza Rush',
      role: 'Head of Marketing, Aura Skin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      rating: 5,
    },
    {
      quote: "GDAs isn't just an agency; they operate like a dedicated in-house growth wing. Transparent reporting, daily slack syncs, and relentless execution.",
      name: 'Marcus Vance',
      role: 'CEO, Kinetix Apparel',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      rating: 5,
    },
  ];

  // Core Values Data
  const coreValues = [
    {
      number: '01',
      title: 'Collaborative Discovery',
      desc: 'We start by tearing down your historical ad data, unit economics, customer avatars, and competitor funnels to build an airtight growth roadmap.',
    },
    {
      number: '02',
      title: 'Uncompromising Excellence',
      desc: 'Every creative asset, ad copy hook, and bidding adjustment is held to an elite conversion standard. No generic templates, only bespoke execution.',
    },
    {
      number: '03',
      title: 'Agile Scale & Adaptability',
      desc: 'When platform algorithms shift or creative fatigue hits, we pivot within 24 hours with fresh angles, new hooks, and dynamic audience pivots.',
    },
    {
      number: '04',
      title: 'Transparent Attribution',
      desc: 'Zero inflated vanity metrics. We report directly on bankable attributed revenue, cash-on-cash ROAS, and net contribution margins.',
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
              animate={{
                x: pupilOffset.x,
                y: pupilOffset.y,
              }}
              transition={{
                type: 'spring',
                damping: 20,
                stiffness: 400,
                mass: 0.08,
              }}
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
              <div
                style={{
                  position: 'absolute',
                  bottom: '3px',
                  right: '3px',
                  width: '2.5px',
                  height: '2.5px',
                  backgroundColor: '#ffffff',
                  borderRadius: '50%',
                }}
              />
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
              animate={{
                x: pupilOffset.x,
                y: pupilOffset.y,
              }}
              transition={{
                type: 'spring',
                damping: 20,
                stiffness: 400,
                mass: 0.08,
              }}
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
              <div
                style={{
                  position: 'absolute',
                  bottom: '3px',
                  right: '3px',
                  width: '2.5px',
                  height: '2.5px',
                  backgroundColor: '#ffffff',
                  borderRadius: '50%',
                }}
              />
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
          <Link
            href="/"
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
          </Link>

          {/* Desktop Nav Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }} className="desktop-nav">
            <Link
              href="/"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              style={{ fontSize: '14px', fontWeight: 500, color: '#a3a3a3', textDecoration: 'none', transition: 'color 0.2s' }}
            >
              Home
            </Link>
            <Link
              href="/about"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              style={{ fontSize: '14px', fontWeight: 600, color: '#ff4533', textDecoration: 'none' }}
            >
              About
            </Link>
            <Link
              href="/#services"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              style={{ fontSize: '14px', fontWeight: 500, color: '#a3a3a3', textDecoration: 'none' }}
            >
              Services
            </Link>
            <Link
              href="/#client-videos"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              style={{ fontSize: '14px', fontWeight: 500, color: '#a3a3a3', textDecoration: 'none' }}
            >
              Clients
            </Link>
            <Link
              href="/#why-us"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              style={{ fontSize: '14px', fontWeight: 500, color: '#a3a3a3', textDecoration: 'none' }}
            >
              Why Us
            </Link>
            <Link
              href="/#reviews"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              style={{ fontSize: '14px', fontWeight: 500, color: '#a3a3a3', textDecoration: 'none' }}
            >
              Reviews
            </Link>
            <Link
              href="/#faq"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              style={{ fontSize: '14px', fontWeight: 500, color: '#a3a3a3', textDecoration: 'none' }}
            >
              FAQ
            </Link>
          </nav>

          {/* Right Action */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              onClick={() => setModalOpen(true)}
              className="btn btn-primary"
              style={{ padding: '8px 20px', fontSize: '13px', fontWeight: 600 }}
            >
              Book a call →
            </motion.button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-hamburger"
              aria-label="Toggle Menu"
              style={{ display: 'none', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '6px' }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
                )}
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
              transition={{ duration: 0.2 }}
              style={{
                marginTop: '10px',
                background: 'rgba(10, 10, 10, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '16px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <Link href="/" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>Home</Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} style={{ color: '#ff4533', textDecoration: 'none', fontSize: '15px', fontWeight: 700 }}>About</Link>
              <Link href="/#services" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>Services</Link>
              <Link href="/#client-videos" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>Clients</Link>
              <Link href="/#why-us" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>Why Us</Link>
              <Link href="/#reviews" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>Reviews</Link>
              <Link href="/#faq" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>FAQ</Link>
              <button
                onClick={() => { setMobileMenuOpen(false); setModalOpen(true); }}
                className="btn btn-primary"
                style={{ width: '100%', padding: '10px' }}
              >
                Book a call →
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION (Alpha-Style Innovation & Strategy) */}
      {/* ========================================================================= */}
      <section style={{ paddingTop: '150px', paddingBottom: '70px', position: 'relative' }}>
        <div className="container-custom" style={{ textAlign: 'center' }}>
          
          {/* Top Pill Badge */}
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
              <span>What's new? Scaled $15M+ in Ad Revenue</span>
              <span style={{ color: '#ff7766', marginLeft: '6px' }}>Discover our story →</span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={blurFadeIn}
            custom={1}
            style={{
              fontSize: 'clamp(36px, 5.5vw, 68px)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.035em',
              maxWidth: '920px',
              margin: '0 auto 22px auto',
            }}
          >
            Innovation and digital excellence where <span className="serif-italic" style={{ color: '#ff4533' }}>creativity</span> meets performance strategy.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={blurFadeIn}
            custom={2}
            style={{
              fontSize: 'clamp(15px, 1.8vw, 18px)',
              color: '#a3a3a3',
              maxWidth: '680px',
              margin: '0 auto 40px auto',
              lineHeight: 1.6,
            }}
          >
            Our expertise lies in strategic performance design, high-converting video creative engines, and first-party attribution infrastructure—ensuring your brand dominates the digital landscape.
          </motion.p>

          {/* 3-Image High-Impact Collage Grid (Matching Alpha Reference) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={blurFadeIn}
            custom={3}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              marginTop: '20px',
            }}
          >
            {/* Image 1 */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                position: 'relative',
                aspectRatio: '4/3',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80"
                alt="Creative Collaboration"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.8) 100%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '20px',
                }}
              >
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '11px', color: '#ff4533', fontWeight: 700, textTransform: 'uppercase' }}>CREATIVE LAB</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>Strategic Hook Sprints</div>
                </div>
              </div>
            </motion.div>

            {/* Image 2 (Centerpiece) */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                position: 'relative',
                aspectRatio: '4/3',
                border: '1px solid rgba(255, 69, 51, 0.4)',
                boxShadow: '0 0 35px rgba(255, 69, 51, 0.25)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80"
                alt="Media Buying & Analytics"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.85) 100%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '20px',
                }}
              >
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 700, textTransform: 'uppercase' }}>LIVE SCALE</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>Multi-Channel Ad Ops</div>
                </div>
              </div>
            </motion.div>

            {/* Image 3 */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                position: 'relative',
                aspectRatio: '4/3',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80"
                alt="Growth Architecture"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.8) 100%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '20px',
                }}
              >
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '11px', color: '#ff4533', fontWeight: 700, textTransform: 'uppercase' }}>ATTRIBUTION</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>Unit Economics Precision</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. STORY & IMPACT TRACK RECORD STATS */}
      {/* ========================================================================= */}
      <section className="section-spacing" style={{ background: 'linear-gradient(180deg, #000 0%, #060606 100%)' }}>
        <div className="container-custom">
          
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 50px auto' }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={blurFadeIn}
              className="section-tag"
            >
              Our Story & Impact
            </motion.div>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={blurFadeIn}
              custom={1}
              style={{ fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.15 }}
            >
              GDAs has been on a relentless pursuit of <span className="serif-italic" style={{ color: '#ff4533' }}>excellence</span> since inception.
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={blurFadeIn}
              custom={2}
              style={{ fontSize: '16px', color: '#a3a3a3', marginTop: '16px', lineHeight: 1.6 }}
            >
              Born out of frustration with bloated agencies and vanity metrics, GDAs was built with a singular mission: engineering measurable, high-margin revenue through surgical paid acquisition.
            </motion.p>
          </div>

          {/* 4 Bento Impact Stat Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '20px',
            }}
          >
            {[
              { label: 'Attributed Client Revenue', value: '$15M+', sub: 'Generated globally across Meta & Google', color: '#ff4533' },
              { label: 'Average Blended ROAS', value: '5.84x', sub: 'Calculated on net customer acquisition', color: '#ffffff' },
              { label: 'Client Retention Rate', value: '98.4%', sub: 'Long-term partnership focus', color: '#ff4533' },
              { label: 'Brands Scaled', value: '25+', sub: 'Category leaders in DTC, Tech & SaaS', color: '#ffffff' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={blurFadeIn}
                custom={idx}
                whileHover={{ y: -4, borderColor: 'rgba(255, 69, 51, 0.4)' }}
                style={{
                  background: '#0a0a0a',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '18px',
                  padding: '30px 24px',
                  textAlign: 'left',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ fontSize: '13px', color: '#888888', fontWeight: 600, marginBottom: '12px' }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: '42px', fontWeight: 800, color: stat.color, letterSpacing: '-0.03em', lineHeight: 1 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
                  {stat.sub}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. OUR MISSION & GROWTH STRATEGY */}
      {/* ========================================================================= */}
      <section className="section-spacing" style={{ position: 'relative' }}>
        <div className="container-custom">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px',
              alignItems: 'center',
            }}
          >
            {/* Left Content */}
            <div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={blurFadeIn}
                className="section-tag"
              >
                Our Mission
              </motion.div>

              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={blurFadeIn}
                custom={1}
                style={{ fontSize: 'clamp(28px, 3.8vw, 44px)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.15, marginBottom: '20px' }}
              >
                Our mission is to empower ambitious brands to thrive in the <span className="serif-italic" style={{ color: '#ff4533' }}>dynamic digital world</span>.
              </motion.h2>

              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={blurFadeIn}
                custom={2}
                style={{ fontSize: '15px', color: '#a3a3a3', lineHeight: 1.6, marginBottom: '16px' }}
              >
                We're dedicated to delivering bespoke growth solutions that not only meet but far exceed expectations. Our goal is to be a trusted scaling partner, driving sustainable customer acquisition and pioneering creative frameworks.
              </motion.p>

              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={blurFadeIn}
                custom={3}
                style={{ fontSize: '14px', color: '#777', lineHeight: 1.6, marginBottom: '28px' }}
              >
                By combining behavioral psychology with mathematical media buying and first-party attribution tracking, we turn ad spend into high-margin profit machines.
              </motion.p>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={blurFadeIn}
                custom={4}
                style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}
              >
                <Link
                  href="/#services"
                  className="btn btn-primary"
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                >
                  Explore Services →
                </Link>
                <button
                  onClick={() => setModalOpen(true)}
                  className="btn btn-secondary"
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                >
                  Book Discovery Call
                </button>
              </motion.div>
            </div>

            {/* Right Interactive Visual Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={blurFadeIn}
              custom={2}
              style={{
                background: 'linear-gradient(135deg, #0d0d0d 0%, #141414 100%)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '24px',
                padding: '36px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
                position: 'relative',
              }}
            >
              {/* Card Header Swatch */}
              <div
                style={{
                  width: '100%',
                  height: '140px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #ff4533 0%, #ff220e 70%, #990000 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '18px',
                  marginBottom: '24px',
                  boxShadow: '0 10px 25px rgba(255,69,51,0.3)',
                }}
              >
                <div style={{ fontSize: '12px', color: '#fff', opacity: 0.85, fontWeight: 600 }}>GDAs PERFORMANCE SYSTEM</div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#fff' }}>Algorithm Dominance Suite</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px' }}>
                  <span style={{ fontSize: '13px', color: '#888' }}>Target ROAS Threshold</span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#10b981' }}>3.50x — 6.50x Active</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px' }}>
                  <span style={{ fontSize: '13px', color: '#888' }}>Creative Iteration Speed</span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>Weekly 8+ UGC Angles</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: '#888' }}>Attribution Loss Protection</span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#ff4533' }}>100% CAPI Integrated</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CORE VALUES & ORBITAL ECOSYSTEM (Alpha-Style What Drives Us) */}
      {/* ========================================================================= */}
      <section className="section-spacing" style={{ background: '#050505', position: 'relative' }}>
        <div className="container-custom">
          
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '50px',
              alignItems: 'center',
            }}
          >
            {/* Left: Animated Orbital Graphic */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={blurFadeIn}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '380px',
              }}
            >
              {/* Outer Orbital Ring */}
              <div
                style={{
                  position: 'absolute',
                  width: '320px',
                  height: '320px',
                  borderRadius: '50%',
                  border: '1px dashed rgba(255, 69, 51, 0.25)',
                  animation: 'spin 40s linear infinite',
                }}
              />

              {/* Middle Orbital Ring */}
              <div
                style={{
                  position: 'absolute',
                  width: '230px',
                  height: '230px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              />

              {/* Inner Orbital Ring */}
              <div
                style={{
                  position: 'absolute',
                  width: '140px',
                  height: '140px',
                  borderRadius: '50%',
                  border: '1px dashed rgba(255, 69, 51, 0.4)',
                }}
              />

              {/* Center Core Logo */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                style={{
                  width: '74px',
                  height: '74px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ff4533 0%, #ff220e 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 40px rgba(255, 69, 51, 0.5)',
                  zIndex: 2,
                }}
              >
                <span style={{ fontWeight: 900, fontSize: '20px', color: '#fff' }}>GDAs</span>
              </motion.div>

              {/* Orbiting Satellite Nodes */}
              {[
                { label: 'Discovery', top: '25px', left: '140px', icon: '🔍' },
                { label: 'Creative', top: '100px', right: '25px', icon: '🎨' },
                { label: 'ROAS', bottom: '35px', right: '110px', icon: '📈' },
                { label: 'CAPI Data', bottom: '110px', left: '20px', icon: '⚡' },
                { label: 'Scale', top: '190px', left: '30px', icon: '🚀' },
              ].map((node, idx) => (
                <motion.div
                  key={idx}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3 + idx, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    top: node.top,
                    bottom: node.bottom,
                    left: node.left,
                    right: node.right,
                    background: 'rgba(20,20,20,0.9)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '50px',
                    padding: '6px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                    boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
                  }}
                >
                  <span>{node.icon}</span>
                  <span style={{ color: '#fff' }}>{node.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Right: Core Values List */}
            <div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={blurFadeIn}
                className="section-tag"
              >
                What drives us
              </motion.div>

              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={blurFadeIn}
                custom={1}
                style={{ fontSize: 'clamp(28px, 3.8vw, 44px)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.15, marginBottom: '16px' }}
              >
                We're driven by a set of <span className="serif-italic" style={{ color: '#ff4533' }}>core values</span> that form the essence of our agency.
              </motion.h2>

              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={blurFadeIn}
                custom={2}
                style={{ fontSize: '14px', color: '#a3a3a3', lineHeight: 1.6, marginBottom: '28px' }}
              >
                We thrive on pushing boundaries and embracing creative iteration to bring fresh revenue perspectives to every brand partnership.
              </motion.p>

              {/* Interactive Values Accordion/List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {coreValues.map((val, idx) => {
                  const isActive = activeValueTab === idx;
                  return (
                    <motion.div
                      key={idx}
                      onClick={() => setActiveValueTab(idx)}
                      onMouseEnter={() => setCursorHovered(true)}
                      onMouseLeave={() => setCursorHovered(false)}
                      style={{
                        padding: '16px 20px',
                        borderRadius: '14px',
                        background: isActive ? 'rgba(255, 69, 51, 0.08)' : 'rgba(255,255,255,0.02)',
                        border: isActive ? '1px solid rgba(255, 69, 51, 0.4)' : '1px solid rgba(255,255,255,0.06)',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <span style={{ fontSize: '13px', fontWeight: 800, color: isActive ? '#ff4533' : '#666' }}>
                            {val.number}.
                          </span>
                          <span style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>
                            {val.title}
                          </span>
                        </div>
                        <span style={{ fontSize: '16px', color: isActive ? '#ff4533' : '#666' }}>
                          {isActive ? '−' : '+'}
                        </span>
                      </div>
                      
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          style={{ fontSize: '13px', color: '#a3a3a3', marginTop: '10px', lineHeight: 1.5, paddingLeft: '28px' }}
                        >
                          {val.desc}
                        </motion.p>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. WHAT WE DO / CORE PILLARS SLIDER (Alpha-Style Carousel) */}
      {/* ========================================================================= */}
      <section className="section-spacing" style={{ background: '#000000' }}>
        <div className="container-custom">
          
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', marginBottom: '40px' }}>
            <div>
              <div className="section-tag">What we do</div>
              <h2 style={{ fontSize: 'clamp(28px, 3.8vw, 44px)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.15 }}>
                Elevating brands through <span className="serif-italic" style={{ color: '#ff4533' }}>innovation & expertise</span>.
              </h2>
            </div>

            {/* Slider Arrow Controls */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setWhatWeDoIndex(Math.max(0, whatWeDoIndex - 1))}
                disabled={whatWeDoIndex === 0}
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: whatWeDoIndex === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: whatWeDoIndex === 0 ? '#444' : '#fff',
                  cursor: whatWeDoIndex === 0 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                }}
              >
                ←
              </button>
              <button
                onClick={() => setWhatWeDoIndex(Math.min(whatWeDoList.length - 2, whatWeDoIndex + 1))}
                disabled={whatWeDoIndex >= whatWeDoList.length - 2}
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: whatWeDoIndex >= whatWeDoList.length - 2 ? 'rgba(255,255,255,0.03)' : '#ff4533',
                  border: '1px solid rgba(255,69,51,0.3)',
                  color: '#fff',
                  cursor: whatWeDoIndex >= whatWeDoList.length - 2 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                }}
              >
                →
              </button>
            </div>
          </div>

          {/* Service Cards Grid / Slider */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {whatWeDoList.slice(whatWeDoIndex, whatWeDoIndex + 2).map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, filter: 'blur(8px)', scale: 0.96 }}
                animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                transition={{ duration: 0.35 }}
                whileHover={{ y: -6, borderColor: 'rgba(255,69,51,0.5)' }}
                style={{
                  background: 'linear-gradient(135deg, #0e0e0e 0%, #151515 100%)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '20px',
                  padding: '36px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '260px',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
                }}
              >
                <div>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      background: 'rgba(255,69,51,0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                    }}
                  >
                    {item.icon}
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#a3a3a3', lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>

                <div style={{ marginTop: '24px' }}>
                  <button
                    onClick={() => setModalOpen(true)}
                    onMouseEnter={() => setCursorHovered(true)}
                    onMouseLeave={() => setCursorHovered(false)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ff4533',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: 0,
                    }}
                  >
                    Get Started →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. LEADERSHIP & TEAM SHOWCASE */}
      {/* ========================================================================= */}
      <section className="section-spacing" style={{ background: '#050505' }}>
        <div className="container-custom">
          
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px auto' }}>
            <div className="section-tag">The Minds Behind GDAs</div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
              Meet our <span className="serif-italic" style={{ color: '#ff4533' }}>Growth Architects</span>.
            </h2>
            <p style={{ fontSize: '15px', color: '#a3a3a3', marginTop: '12px' }}>
              Direct-response media buyers, creative directors, and data engineers with proven track records scaling 7-figure brands.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px',
            }}
          >
            {teamMembers.map((member, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={blurFadeIn}
                custom={idx}
                whileHover={{ y: -6, borderColor: 'rgba(255,69,51,0.4)' }}
                style={{
                  background: '#0a0a0a',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                }}
              >
                <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', overflow: 'hidden' }}>
                  <img
                    src={member.avatar}
                    alt={member.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: 'rgba(0,0,0,0.7)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '50px',
                      padding: '4px 10px',
                      fontSize: '10px',
                      fontWeight: 700,
                      color: '#ff4533',
                      textTransform: 'uppercase',
                    }}
                  >
                    {member.badge}
                  </div>
                </div>

                <div style={{ padding: '22px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                    {member.name}
                  </h3>
                  <div style={{ fontSize: '12px', color: '#ff7766', fontWeight: 600, marginBottom: '10px' }}>
                    {member.role}
                  </div>
                  <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.5 }}>
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. TESTIMONIALS SLIDER (Alpha-Style Reviews) */}
      {/* ========================================================================= */}
      <section className="section-spacing" style={{ background: '#000000' }}>
        <div className="container-custom">
          
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', marginBottom: '40px' }}>
            <div>
              <div className="section-tag">Testimonials</div>
              <h2 style={{ fontSize: 'clamp(28px, 3.8vw, 44px)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.15 }}>
                Hear from our <span className="serif-italic" style={{ color: '#ff4533' }}>happy partners</span>.
              </h2>
            </div>

            {/* Slider Controls */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setTestimonialIndex(Math.max(0, testimonialIndex - 1))}
                disabled={testimonialIndex === 0}
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: testimonialIndex === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: testimonialIndex === 0 ? '#444' : '#fff',
                  cursor: testimonialIndex === 0 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                }}
              >
                ←
              </button>
              <button
                onClick={() => setTestimonialIndex(Math.min(testimonials.length - 2, testimonialIndex + 1))}
                disabled={testimonialIndex >= testimonials.length - 2}
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: testimonialIndex >= testimonials.length - 2 ? 'rgba(255,255,255,0.03)' : '#ff4533',
                  border: '1px solid rgba(255,69,51,0.3)',
                  color: '#fff',
                  cursor: testimonialIndex >= testimonials.length - 2 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                }}
              >
                →
              </button>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {testimonials.slice(testimonialIndex, testimonialIndex + 2).map((item) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, filter: 'blur(8px)', scale: 0.96 }}
                animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                transition={{ duration: 0.35 }}
                style={{
                  background: '#0c0c0c',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '20px',
                  padding: '36px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
                }}
              >
                <div>
                  <div style={{ color: '#ffb703', fontSize: '15px', marginBottom: '16px', letterSpacing: '2px' }}>
                    ★★★★★
                  </div>
                  <p style={{ fontSize: '15px', color: '#e5e5e5', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '24px' }}>
                    "{item.quote}"
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '18px' }}>
                  <img
                    src={item.avatar}
                    alt={item.name}
                    style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>{item.name}</div>
                    <div style={{ fontSize: '12px', color: '#888' }}>{item.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. BOTTOM HIGH-IMPACT CTA BANNER (Alpha-Style) */}
      {/* ========================================================================= */}
      <section className="section-spacing" style={{ paddingTop: '40px', paddingBottom: '90px' }}>
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={blurFadeIn}
            style={{
              borderRadius: '28px',
              padding: 'clamp(40px, 6vw, 70px) clamp(24px, 4vw, 50px)',
              background: 'linear-gradient(135deg, #0a0a0a 0%, #170806 50%, #290c07 100%)',
              border: '1px solid rgba(255, 69, 51, 0.35)',
              boxShadow: '0 0 60px rgba(255, 69, 51, 0.2)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '30px',
            }}
          >
            {/* Grid Pattern overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(rgba(255, 69, 51, 0.15) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                pointerEvents: 'none',
              }}
            />

            <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px' }}>
              <div className="pill-badge pill-badge-orange" style={{ marginBottom: '14px' }}>
                <span className="pulse-dot" />
                <span>Q3 Client Scaling Intake Active</span>
              </div>
              <h2 style={{ fontSize: 'clamp(28px, 4.2vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#fff' }}>
                Get started toward <span className="serif-italic" style={{ color: '#ff4533' }}>scalable growth</span>.
              </h2>
              <p style={{ fontSize: '15px', color: '#a3a3a3', marginTop: '12px' }}>
                Partner with GDAs to engineer predictable, hyper-profitable customer acquisition funnels for your brand.
              </p>
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(255, 69, 51, 0.6)' }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setModalOpen(true)}
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                className="btn btn-primary"
                style={{ padding: '16px 36px', fontSize: '16px', fontWeight: 700 }}
              >
                Book Discovery Call →
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. COMPREHENSIVE AGENCY FOOTER */}
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
            </Link>

            <div style={{ display: 'flex', gap: '20px', fontSize: '13px' }}>
              <Link href="/" style={{ color: '#888', textDecoration: 'none' }}>Home</Link>
              <Link href="/about" style={{ color: '#ff4533', textDecoration: 'none', fontWeight: 600 }}>About</Link>
              <Link href="/#services" style={{ color: '#888', textDecoration: 'none' }}>Services</Link>
              <Link href="/#client-videos" style={{ color: '#888', textDecoration: 'none' }}>Clients</Link>
              <Link href="/#faq" style={{ color: '#888', textDecoration: 'none' }}>FAQ</Link>
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
      {/* 11. BOOK A CALL MODAL */}
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
                          background: '#141414',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '8px',
                          padding: '10px 14px',
                          color: '#fff',
                          fontSize: '13px',
                          outline: 'none',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a3a3a3', marginBottom: '4px' }}>
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
                          background: '#141414',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '8px',
                          padding: '10px 14px',
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
                          background: '#141414',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '8px',
                          padding: '10px 14px',
                          color: '#fff',
                          fontSize: '13px',
                          outline: 'none',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a3a3a3', marginBottom: '4px' }}>
                        Monthly Ad Spend
                      </label>
                      <select
                        value={modalForm.spend}
                        onChange={(e) => setModalForm({ ...modalForm, spend: e.target.value })}
                        style={{
                          width: '100%',
                          background: '#141414',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '8px',
                          padding: '10px 14px',
                          color: '#fff',
                          fontSize: '13px',
                          outline: 'none',
                        }}
                      >
                        <option value="Under $5k">Under $5k / mo</option>
                        <option value="$5k - $15k">$5k - $15k / mo</option>
                        <option value="$15k - $50k">$15k - $50k / mo</option>
                        <option value="$50k+">$50k+ / mo</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ marginTop: '8px', padding: '12px', fontSize: '14px', fontWeight: 700 }}
                    >
                      Confirm Session →
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global CSS Media Queries and Keyframes */}
      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
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
