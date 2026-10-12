'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '../components/ThemeToggle';
import SocialLinks from '../components/SocialLinks';

// Optimized Hardware-Accelerated Animation Variants
const blurFadeIn = {
  hidden: { opacity: 0, y: 18 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: custom * 0.05,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const blurStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);
  const [activePortfolioCategory, setActivePortfolioCategory] = useState('All');
  const setCursorHovered = () => {};

  // Lead / Consultation Modal State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Digital Marketing',
    businessName: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    // WhatsApp prefilled lead generation redirect
    const waText = encodeURIComponent(
      `Hello GDAs Team!\n\nName: ${formData.name}\nPhone: ${formData.phone}\nBusiness: ${formData.businessName || 'N/A'}\nService: ${formData.service}\nDetails: ${formData.message || 'I want to scale my business digitally.'}`
    );
    window.open(`https://wa.me/919939862765?text=${waText}`, '_blank');
  };

  // 04. Services Data
  const services = [
    {
      num: '01',
      title: 'Digital Marketing',
      tagline: 'Meta & Google Ads • Lead Gen',
      desc: 'High-ROI ad campaigns across Meta and Google engineered to acquire qualified leads and drive revenue.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 20V10M18 20V4M6 20v-4" />
        </svg>
      ),
      tags: ['Meta Ads', 'Google Ads', 'Lead Funnels'],
      highlightColor: '#2563eb',
    },
    {
      num: '02',
      title: 'WhatsApp Marketing',
      tagline: 'Official API • Broadcasts',
      desc: 'Direct verified messaging with 98% open rates, automated quick replies, and interactive catalogs.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M8 10h.01M12 10h.01M16 10h.01" />
        </svg>
      ),
      tags: ['Official API', 'Bulk Broadcasts', 'Green Tick'],
      highlightColor: '#2563eb',
    },
    {
      num: '03',
      title: 'IVR Calling Service',
      tagline: 'Smart Voice OBD • Cloud Routing',
      desc: 'Automated voice broadcasting and cloud call routing to connect with thousands of customers instantly.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      tags: ['Voice OBD', 'Cloud IVR', 'Call Routing'],
      highlightColor: '#2563eb',
    },
    {
      num: '04',
      title: 'Local SEO & Google Maps',
      tagline: 'GMB Top 3 • Local Reach',
      desc: 'Rank in Google Maps Top 3 to drive daily customer walk-ins and direct phone inquiries.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <path d="M11 8v6M8 11h6" />
        </svg>
      ),
      tags: ['Maps 3-Pack', 'GMB Ranking', 'Reviews'],
      highlightColor: '#2563eb',
    },
    {
      num: '05',
      title: 'Political Campaigning',
      tagline: 'War Room • Targeted Ads',
      desc: 'Constituency-level targeted video ads, digital war rooms, and voter sentiment outreach.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
      tags: ['Constituency Ads', 'War Room', 'Voter Reach'],
      highlightColor: '#2563eb',
    },
    {
      num: '06',
      title: 'Growth Consulting',
      tagline: 'GTM Strategy • Scaling',
      desc: 'Strategic consulting covering market positioning, CAC reduction, and full-funnel CRO.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
      tags: ['GTM Plan', 'Unit Economics', 'Funnel CRO'],
      highlightColor: '#2563eb',
    },
    {
      num: '07',
      title: 'CRM & Automation',
      tagline: 'Pipelines • Workflows',
      desc: 'Custom CRM pipelines, automated lead scoring, and sync across sales and operations.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
      tags: ['Lead CRM', 'Process Auto', 'ERP Sync'],
      highlightColor: '#2563eb',
    },
    {
      num: '08',
      title: 'Branding & Creative',
      tagline: 'Brand Identity • Visuals',
      desc: 'Distinctive visual identities, logo suites, and scroll-stopping ad creatives that build trust.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 19l7-7 3 3-7 7-3-3z" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          <path d="M2 2l7.586 7.586" />
          <circle cx="11" cy="11" r="2" />
        </svg>
      ),
      tags: ['Logo Design', 'Brand Identity', 'Ad Creatives'],
      highlightColor: '#2563eb',
    },
    {
      num: '09',
      title: 'Web & Technology',
      tagline: 'Fast Web • High Conversion',
      desc: 'Ultra-fast, mobile-first websites and landing pages engineered to turn visitors into clients.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
      tags: ['Next.js Sites', 'Landing Pages', 'Fast Speed'],
      highlightColor: '#2563eb',
    },
  ];

  // 07. Portfolio / Our Work Data
  const portfolioItems = [
    {
      id: 1,
      title: 'Aura Luxury Living',
      category: 'Branding',
      subCategory: 'Brand Identity & Packaging',
      description: 'Complete brand visual identity, premium packaging, and brand playbook.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
      badge: 'Brand Revamp',
    },
    {
      id: 2,
      title: 'Elite Health & Wellness',
      category: 'Meta Ads',
      subCategory: 'Lead Generation',
      description: 'High-converting Meta ad campaigns delivering 420+ monthly qualified inquiries.',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop&q=80',
      badge: 'Lead Scaling',
    },
    {
      id: 3,
      title: 'Apex Tech Solutions',
      category: 'Websites',
      subCategory: 'Corporate Web Platform',
      description: 'High-speed Next.js corporate website with interactive service demos and lead booking.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
      badge: 'Web Platform',
    },
    {
      id: 4,
      title: 'Velvet Cafe & Roastery',
      category: 'Social Media',
      subCategory: 'Reels & Viral Social',
      description: 'Organic video reels and Instagram brand strategy driving 2.4M local views.',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80',
      badge: 'Viral Reach',
    },
    {
      id: 5,
      title: 'Nivaan Jewels',
      category: 'Creatives',
      subCategory: 'Graphic & Ad Creatives',
      description: 'Festive digital ad creative catalog, promotional flyers, and social billboard designs.',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop&q=80',
      badge: 'Ad Creatives',
    },
    {
      id: 6,
      title: 'Kavya Dental Care',
      category: 'Meta Ads',
      subCategory: 'Local Patient Growth',
      description: 'Hyper-local Meta Ads and Google Maps SEO generating 180+ monthly appointments.',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop&q=80',
      badge: 'Local Growth',
    },
  ];

  const filteredPortfolio =
    activePortfolioCategory === 'All'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activePortfolioCategory);

  // 10. Testimonials — Authentic Client Reviews
  const testimonials = [
    {
      name: 'Kumud Kundan',
      role: 'Founder • Professional Makeup & Hairstyling Academy',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
      content:
        'Excellent experience with GDAs! We ran Meta Lead Gen campaigns for our academy and received genuine student inquiries within 24 hours. Their targeting and creative guidance were outstanding.',
      rating: 5,
    },
    {
      name: 'Ravi Kumar Tiwari',
      role: 'Business Owner • Bihar & Jharkhand',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      content:
        'If you want authentic online leads and customer growth, GDAs is the best choice. Highly professional digital marketing and local reach services across Bihar and Jharkhand.',
      rating: 5,
    },
    {
      name: 'Tanisha Choudhary',
      role: 'E-Commerce Founder',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      content:
        'GDAs audited and rebuilt our website funnel. The new speed and clean UX immediately improved our conversion rate. The best digital team we have worked with.',
      rating: 5,
    },
  ];

  // 11. FAQ Data
  const faqs = [
    {
      q: 'What services does GDAs provide?',
      a: 'We provide Meta & Google Ads, WhatsApp Official API marketing, Cloud IVR calling, Local SEO & Google Maps ranking, Branding, and High-Speed Next.js Web Development.',
    },
    {
      q: 'Does GDAs work with small and local businesses?',
      a: 'Yes. We work with local business owners, early-stage startups, and growing enterprises across Bihar and Pan-India.',
    },
    {
      q: 'Can I hire GDAs for a single specific service?',
      a: 'Yes. You can engage us for a single service (such as Meta Ads or Website Development) or our full-suite growth package.',
    },
    {
      q: 'How do we get started?',
      a: 'Click "Grow My Business" or contact us via WhatsApp at +91 9939862765. We will assess your business goals and share a clear growth roadmap within 24 to 48 hours.',
    },
    {
      q: 'What makes GDAs different from traditional agencies?',
      a: 'We unify brand design, performance advertising, and custom web technology under one roof with transparent ROI tracking and direct founder support.',
    },
  ];

  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: 'var(--bg-black)', color: 'var(--text-white)', overflowX: 'hidden' }}>
      {/* Top Ambient Glow */}
      <div className="bg-ambient-top" />

      {/* ========================================================================= */}
      {/* FLOATING HEADER / NAVBAR (GDAs Without Dot) */}
      {/* ========================================================================= */}
      <motion.header
        initial={{ y: -50, opacity: 0, filter: 'blur(8px)' }}
        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: '18px',
          left: '0',
          right: '0',
          margin: '0 auto',
          width: 'calc(100% - 36px)',
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
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Logo — GDAs without Dot */}
          <Link
            href="/"
            onMouseEnter={() => setCursorHovered(true)}
            onMouseLeave={() => setCursorHovered(false)}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: '#0d3899',
                border: '1px solid rgba(59, 130, 246, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                boxShadow: '0 2px 14px rgba(37, 99, 235, 0.45)',
              }}
            >
              <img
                src="/gda_logo.png"
                alt="GDAs Logo"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <span style={{ fontWeight: 800, fontSize: '19px', color: 'var(--text-white)', letterSpacing: '-0.02em' }}>
              GDAs
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '26px' }} className="desktop-nav">
            {[
              { href: '/about', label: 'About' },
              { href: '/services', label: 'Services' },
              { href: '#why-gdas', label: 'Why GDAs' },
              { href: '#how-it-works', label: 'Process' },
              { href: '#portfolio', label: 'Our Work' },
              { href: '#legacy', label: 'Our Legacy' },
              { href: '/training', label: 'Training' },
              { href: '/blog', label: 'Blog' },
              { href: '/careers', label: 'Careers' },
            ].map((link, i) => (
              <Link
                key={i}
                href={link.href}
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                className="nav-link"
                style={{
                  fontSize: '13.5px',
                  fontWeight: 500,
                  color: '#a3a3a3',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action Buttons & Theme Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ThemeToggle />
            <motion.button
              onClick={() => setModalOpen(true)}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="btn-primary header-cta-btn"
              style={{ padding: '9px 20px', fontSize: '13px' }}
            >
              <span>Grow My Business</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ display: 'none', background: 'none', border: 'none', color: 'var(--text-white)', cursor: 'pointer', padding: '6px' }}
              className="mobile-toggle"
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileMenuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.96, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, scale: 0.96, filter: 'blur(8px)' }}
              transition={{ duration: 0.22 }}
              className="glass-card"
              style={{
                marginTop: '10px',
                padding: '22px',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>About GDAs</Link>
              <Link href="/services" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>Services</Link>
              <a href="#why-gdas" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>Why GDAs</a>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>How We Work</a>
              <a href="#portfolio" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>Our Work</a>
              <a href="#legacy" onClick={() => setMobileMenuOpen(false)} style={{ color: '#eab308', textDecoration: 'none', fontSize: '15px', fontWeight: 600 }}>Our Legacy (Father Never Dies)</a>
              <Link href="/training" onClick={() => setMobileMenuOpen(false)} style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '15px', fontWeight: 600 }}>Training Hub</Link>
              <Link href="/blog" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>Blog & Insights</Link>
              <Link href="/careers" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>Careers</Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setModalOpen(true);
                }}
                className="btn-primary"
                style={{ width: '100%', marginTop: '6px' }}
              >
                Grow My Business
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ========================================================================= */}
      {/* 01. HERO SECTION — Complete Visual Hierarchy */}
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* 01. HERO SECTION — Clean, Minimalist & Modern */}
      {/* ========================================================================= */}
      <section
        className="hero-wrapper"
        style={{
          paddingTop: '160px',
          paddingBottom: '90px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle Ambient Glow Behind Hero */}
        <div
          style={{
            position: 'absolute',
            top: '-5%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '900px',
            height: '520px',
            background: 'radial-gradient(ellipse at center, rgba(37, 99, 235, 0.16) 0%, rgba(30, 64, 175, 0.04) 50%, transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* Delicate Background Mesh Grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 35%, black 25%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 35%, black 25%, transparent 80%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '56px',
              alignItems: 'center',
              textAlign: 'left',
            }}
          >
            {/* Left Column — Clean Typography & Purposeful Action */}
            <div>
              {/* 1. Minimal Eyebrow Badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08 }}
                style={{ display: 'inline-flex', alignItems: 'center', marginBottom: '22px' }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.25)',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#3b82f6',
                      boxShadow: '0 0 8px #3b82f6',
                    }}
                  />
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#93c5fd',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    GDAs • Complete Growth Studio
                  </span>
                </div>
              </motion.div>

              {/* 2. Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontSize: 'clamp(42px, 5.2vw, 68px)',
                  fontWeight: 800,
                  lineHeight: 1.08,
                  letterSpacing: '-0.035em',
                  color: 'var(--text-white)',
                  marginBottom: '16px',
                }}
              >
                One Platform.{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #93c5fd 0%, #3b82f6 50%, #2563eb 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block',
                  }}
                >
                  All Solutions.
                </span>
              </motion.h1>

              {/* 3. Tagline */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.26 }}
                style={{
                  fontSize: 'clamp(20px, 2.3vw, 26px)',
                  fontWeight: 600,
                  color: 'var(--text-white)',
                  lineHeight: 1.35,
                  letterSpacing: '-0.015em',
                  marginBottom: '16px',
                }}
              >
                Digital Ka Saath,{' '}
                <span style={{ color: '#2563eb', fontWeight: 700 }}>Aapke Business Ka Vikas.</span>
              </motion.div>

              {/* 4. Minimalist Supporting Text */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.34 }}
                style={{
                  fontSize: '15.5px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.65,
                  maxWidth: '520px',
                  marginBottom: '32px',
                }}
              >
                We help ambitious businesses scale through strategic Meta & Google Ads, official WhatsApp automation, and high-converting modern web technology.
              </motion.p>

              {/* 5. Minimal Action Row — Side by Side on Mobile */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.42 }}
                className="mobile-btn-row"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  flexWrap: 'wrap',
                  marginBottom: '32px',
                }}
              >
                <motion.button
                  onClick={() => setModalOpen(true)}
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary"
                  style={{
                    padding: '13px 28px',
                    fontSize: '14.5px',
                    fontWeight: 600,
                    borderRadius: '9999px',
                    boxShadow: '0 4px 22px rgba(37, 99, 235, 0.45)',
                  }}
                >
                  <span>Grow My Business</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </motion.button>

                <motion.a
                  href="https://wa.me/919939862765?text=Hello%20GDAs%20Team%2C%20I%20want%20to%20grow%20my%20business%20digitally"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="minimal-secondary-btn"
                >
                  <span
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: '#22c55e',
                      boxShadow: '0 0 8px #22c55e',
                    }}
                  />
                  <span>Chat on WhatsApp</span>
                </motion.a>
              </motion.div>

              {/* 6. Subtle Legacy Tribute */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.55 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '12.5px',
                  color: 'var(--text-muted)',
                }}
              >
                <span style={{ color: '#eab308' }}>✦</span>
                <span>Guided by Vision •</span>
                <a
                  href="#legacy"
                  style={{
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontWeight: 600,
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#eab308')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  Father Never Dies
                </a>
              </motion.div>
            </div>

            {/* Right Column — Ultra-Clean Glass Engine Showcase */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'relative' }}
            >
              {/* Outer Minimalist Glass Card */}
              <div className="minimal-hero-card">
                {/* Top Subtle Light Accent */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '20%',
                    right: '20%',
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.6), transparent)',
                  }}
                />

                {/* Card Header: Window Dots & Status */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: '20px',
                    borderBottom: '1px solid var(--border-subtle)',
                    marginBottom: '24px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'rgba(100, 116, 139, 0.4)' }} />
                    <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'rgba(100, 116, 139, 0.4)' }} />
                    <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'rgba(100, 116, 139, 0.4)' }} />
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginLeft: '6px' }}>
                      GDAs Growth Suite
                    </span>
                  </div>

                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '3px 10px',
                      borderRadius: '9999px',
                      background: 'rgba(34, 197, 94, 0.1)',
                      border: '1px solid rgba(34, 197, 94, 0.25)',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#16a34a',
                    }}
                  >
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22c55e' }} />
                    <span>Live Campaigns</span>
                  </div>
                </div>

                {/* Featured Growth Indicator & Trajectory Chart */}
                <div className="minimal-hero-inner-box">
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <div>
                      <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', fontWeight: 500 }}>
                        Average Campaign Growth
                      </div>
                      <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-white)', letterSpacing: '-0.02em', marginTop: '2px' }}>
                        +185%
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#0284c7',
                        background: 'rgba(56, 189, 248, 0.12)',
                        padding: '4px 10px',
                        borderRadius: '20px',
                      }}
                    >
                      3.8x ROAS
                    </span>
                  </div>

                  {/* Minimalist SVG Growth Curve */}
                  <div style={{ width: '100%', height: '54px', position: 'relative' }}>
                    <svg
                      viewBox="0 0 320 60"
                      fill="none"
                      style={{ width: '100%', height: '100%', overflow: 'visible' }}
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,50 Q45,46 90,38 T180,24 T270,12 L320,4 L320,60 L0,60 Z"
                        fill="url(#chartGrad)"
                      />
                      <path
                        d="M0,50 Q45,46 90,38 T180,24 T270,12 L320,4"
                        stroke="#3b82f6"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <circle cx="320" cy="4" r="4.5" fill="#60a5fa" stroke="#1d4ed8" strokeWidth="2" />
                    </svg>
                  </div>
                </div>

                {/* 3 Clean Modular Service Badges */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
                  <div className="minimal-hero-tag">
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#2563eb' }}>Meta & Google</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Targeted Ads</div>
                  </div>

                  <div className="minimal-hero-tag">
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#16a34a' }}>WhatsApp</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Official API</div>
                  </div>

                  <div className="minimal-hero-tag">
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#7c3aed' }}>Web & Brand</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>High Speed</div>
                  </div>
                </div>

                {/* Bottom Verified Footnote */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '16px',
                    borderTop: '1px solid var(--border-subtle)',
                    fontSize: '12px',
                    color: 'var(--text-muted)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '6px',
                        background: '#1d4ed8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        fontWeight: 800,
                        color: '#fff',
                      }}
                    >
                      G
                    </div>
                    <span>GDAs Unified System</span>
                  </div>
                  <span style={{ color: '#2563eb', fontWeight: 600 }}>Pan-India & Bihar</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02. TRUST / INTRO STRIP */}
      {/* ========================================================================= */}
      <section
        style={{
          padding: '50px 0',
          borderTop: '1px solid rgba(255, 255, 255, 0.07)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
          background: 'linear-gradient(180deg, #050505 0%, #0a0a0a 100%)',
          position: 'relative',
        }}
      >
        <div className="container-custom">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 36px auto' }}>
            <h2 style={{ fontSize: 'clamp(24px, 2.8vw, 32px)', fontWeight: 700, color: 'var(--text-white)', marginBottom: '10px', letterSpacing: '-0.02em' }}>
              Everything You Need to Scale
            </h2>
            <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Strategy, execution, and dedicated growth support under one roof.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <span className="mobile-swipe-hint">Swipe cards →</span>
          </div>

          {/* 3 Clean Highlights — Horizontal Swipe on Mobile */}
          <div
            className="mobile-horizontal-scroll"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px',
            }}
          >
            {[
              {
                num: '01',
                title: 'Strategy',
                desc: 'Tailored digital roadmaps built around your target market and growth goals.',
              },
              {
                num: '02',
                title: 'Growth',
                desc: 'Data-driven customer acquisition focused on real revenue and ROI.',
              },
              {
                num: '03',
                title: 'Support',
                desc: 'A dedicated growth team working alongside you from day one.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -3 }}
                className="glass-card"
                style={{
                  padding: '24px 22px',
                  borderRadius: '18px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  background: 'rgba(255, 255, 255, 0.02)',
                }}
              >
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 800,
                    color: '#3b82f6',
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'rgba(37, 99, 235, 0.1)',
                    border: '1px solid rgba(59, 130, 246, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    letterSpacing: '0.04em',
                  }}
                >
                  {item.num}
                </div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-white)', marginBottom: '4px' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                    {item.desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03. ABOUT GDAs (With Founder Pic & Details) */}
      {/* ========================================================================= */}
      <section id="about" className="section-spacing" style={{ position: 'relative' }}>
        <div className="container-custom">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '48px',
              alignItems: 'center',
            }}
          >
            {/* Left Content */}
            <div>
              <div className="section-tag">About GDAs</div>
              <h2
                style={{
                  fontSize: 'clamp(26px, 3.2vw, 38px)',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  color: 'var(--text-white)',
                  marginBottom: '18px',
                  letterSpacing: '-0.02em',
                }}
              >
                Your Dedicated{' '}
                <span style={{ color: '#3b82f6', display: 'block' }}>
                  Growth Partner.
                </span>
              </h2>

              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '14px' }}>
                Ganesha Digital Ads (GDAs) helps businesses build their brand, acquire high-intent customers, and scale online.
              </p>

              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '26px' }}>
                We unite marketing, branding, and modern technology so you never have to coordinate across multiple disconnected vendors.
              </p>

              <div className="mobile-btn-row" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <Link
                  href="/about"
                  className="btn-primary"
                  style={{ textDecoration: 'none', padding: '11px 24px', fontSize: '13.5px' }}
                >
                  <span>About GDAs</span>
                  <span>→</span>
                </Link>

                <button
                  onClick={() => setModalOpen(true)}
                  className="btn-secondary"
                  style={{ padding: '11px 22px', fontSize: '13.5px' }}
                >
                  Contact Team
                </button>
              </div>
            </div>

            {/* Right Content: Founder Pic & Details */}
            <div>
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="glass-card"
                style={{
                  padding: '24px',
                  borderRadius: '24px',
                  background: 'linear-gradient(180deg, rgba(37, 99, 235, 0.08) 0%, rgba(15, 15, 15, 0.95) 100%)',
                  border: '1px solid rgba(59, 130, 246, 0.35)',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '18px',
                    marginBottom: '18px',
                    flexWrap: 'wrap',
                  }}
                >
                  <div
                    style={{
                      width: '84px',
                      height: '84px',
                      borderRadius: '18px',
                      overflow: 'hidden',
                      border: '2px solid rgba(59, 130, 246, 0.5)',
                      boxShadow: '0 8px 24px rgba(37, 99, 235, 0.35)',
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src="/ram_gyan_award.jpg"
                      alt="Mr. Ram Gyan - Co-Founder & CEO GDAs"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  <div>
                    <div
                      style={{
                        display: 'inline-block',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#60a5fa',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        marginBottom: '4px',
                      }}
                    >
                      Co-Founder & CEO
                    </div>
                    <div style={{ fontSize: '19px', fontWeight: 800, color: 'var(--text-white)' }}>
                      Mr. Ram Gyan
                    </div>
                    <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                      Digital Marketing Specialist Since 2019
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: 'rgba(37, 99, 235, 0.08)',
                    borderLeft: '3px solid #3b82f6',
                    padding: '11px 15px',
                    borderRadius: '0 10px 10px 0',
                    fontSize: '13px',
                    color: '#2563eb',
                    fontWeight: 700,
                    marginBottom: '14px',
                  }}
                >
                  "Learn. Build. Grow."
                </div>

                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    fontSize: '12.5px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.55,
                  }}
                >
                  Honorary Doctorate (USA) • Bharat Visionary Leader 2026 • IIT Delhi & IIT Patna Alum • Vskills Certified Master
                </div>

                <div
                  style={{
                    marginTop: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '12px',
                    color: '#94a3b8',
                  }}
                >
                  <Link href="/about#leadership" style={{ color: '#60a5fa', fontWeight: 600, textDecoration: 'none' }}>
                    View Credentials →
                  </Link>
                  <span style={{ color: '#22c55e', fontWeight: 600 }}>● Available</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04. SERVICES SECTION */}
      {/* ========================================================================= */}
      <section id="services" className="section-spacing" style={{ background: '#050505', position: 'relative' }}>
        <div className="container-custom">
          {/* Section Header */}
          <div className="section-header">
            <div className="section-tag">Services</div>
            <h2 className="section-title">
              Everything You Need to <span className="serif-italic">Scale Digitally</span>
            </h2>
            <p className="section-subtitle">
              One unified platform for modern business growth.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <span className="mobile-swipe-hint">Swipe services →</span>
          </div>

          {/* Service Cards Grid — Horizontal Swipe on Mobile */}
          <div
            className="mobile-horizontal-scroll"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
              marginBottom: '46px',
            }}
          >
            {services.map((srv, idx) => (
              <motion.div
                key={srv.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="glass-card service-card"
                style={{
                  padding: '28px 24px',
                  borderRadius: '22px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: 'rgba(15, 15, 15, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div>
                  {/* Top Bar */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                    <span
                      style={{
                        fontSize: '12.5px',
                        fontWeight: 800,
                        color: srv.highlightColor,
                        letterSpacing: '0.08em',
                      }}
                    >
                      {srv.num}
                    </span>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '11px',
                        background: `${srv.highlightColor}18`,
                        border: `1px solid ${srv.highlightColor}40`,
                        color: srv.highlightColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {srv.icon}
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 style={{ fontSize: '19px', fontWeight: 700, color: 'var(--text-white)', marginBottom: '6px' }}>
                    {srv.title}
                  </h3>
                  <div
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: srv.highlightColor,
                      marginBottom: '12px',
                      lineHeight: 1.4,
                    }}
                  >
                    {srv.tagline}
                  </div>

                  {/* Description */}
                  <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '18px' }}>
                    {srv.desc}
                  </p>
                </div>

                <div>
                  {/* Feature Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                    {srv.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          background: 'var(--pill-bg)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--pill-text)',
                          padding: '3px 8px',
                          borderRadius: '6px',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Card Action */}
                  <button
                    onClick={() => {
                      setFormData({ ...formData, service: srv.title });
                      setModalOpen(true);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-white)',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: 0,
                    }}
                  >
                    <span>Explore Service</span>
                    <span style={{ color: srv.highlightColor }}>→</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Explore All Services CTA — Side by Side on Mobile */}
          <div className="mobile-btn-row" style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <Link
              href="/services"
              className="btn-primary"
              style={{ padding: '12px 28px', fontSize: '14px', textDecoration: 'none' }}
            >
              <span>Explore All Services</span>
              <span>→</span>
            </Link>
            <button
              onClick={() => setModalOpen(true)}
              className="btn-secondary"
              style={{ padding: '12px 24px', fontSize: '14px' }}
            >
              Get Custom Quote
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05. WHY GDAs? */}
      {/* ========================================================================= */}
      <section id="why-gdas" className="section-spacing" style={{ position: 'relative' }}>
        <div className="container-custom">
          <div className="section-header">
            <div className="section-tag">Why GDAs</div>
            <h2 className="section-title">
              Built for <span className="serif-italic">Real Business Impact</span>
            </h2>
            <p className="section-subtitle">
              One unified team for strategy, creative, and performance.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <span className="mobile-swipe-hint">Swipe benefits →</span>
          </div>

          {/* 4 Clean Cards Grid — Horizontal Swipe on Mobile */}
          <div
            className="mobile-horizontal-scroll"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '22px',
            }}
          >
            {[
              {
                num: '01',
                title: 'Business-First',
                desc: 'Campaigns focused on qualified leads, revenue, and real business momentum.',
              },
              {
                num: '02',
                title: 'Creative + Strategy',
                desc: 'Compelling brand design backed by data-driven performance marketing.',
              },
              {
                num: '03',
                title: 'One Unified Roof',
                desc: 'Marketing, branding, and tech aligned without multiple vendor friction.',
              },
              {
                num: '04',
                title: 'Dedicated Partner',
                desc: 'An invested growth team working alongside you as your business scales.',
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="glass-card"
                style={{
                  padding: '28px 24px',
                  borderRadius: '20px',
                  background: 'rgba(15, 15, 15, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 800,
                    color: '#3b82f6',
                    letterSpacing: '0.06em',
                    marginBottom: '14px',
                  }}
                >
                  {card.num}
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-white)', marginBottom: '8px' }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 06. HOW GDAs WORKS (Horizontal 4-Step Timeline) */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="section-spacing" style={{ background: '#050505', position: 'relative' }}>
        <div className="container-custom">
          <div className="section-header">
            <div className="section-tag">Process</div>
            <h2 className="section-title">
              How We <span className="serif-italic">Work</span>
            </h2>
            <p className="section-subtitle">
              A clear four-step path from consultation to measurable results.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <span className="mobile-swipe-hint">Swipe steps →</span>
          </div>

          {/* 4 Steps Horizontal Grid — Horizontal Swipe on Mobile */}
          <div
            className="mobile-horizontal-scroll"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '22px',
              position: 'relative',
            }}
          >
            {[
              {
                step: '01',
                title: 'Discover',
                desc: 'We analyze your market, audience, and key customer acquisition bottlenecks.',
              },
              {
                step: '02',
                title: 'Strategize',
                desc: 'We craft a tailored roadmap with clear targets and budget allocation.',
              },
              {
                step: '03',
                title: 'Execute',
                desc: 'We deploy high-converting campaigns, creative assets, and tech funnels.',
              },
              {
                step: '04',
                title: 'Scale',
                desc: 'We optimize performance continuously to maximize your return on ad spend.',
              },
            ].map((step, idx) => (
              <motion.div
                key={step.step}
                whileHover={{ y: -3 }}
                className="glass-card"
                style={{
                  padding: '26px 22px',
                  borderRadius: '18px',
                  background: 'rgba(15, 15, 15, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    fontSize: '22px',
                    fontWeight: 800,
                    color: '#3b82f6',
                    letterSpacing: '-0.02em',
                    marginBottom: '10px',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  {step.step}.
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-white)', marginBottom: '6px' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 07. OUR WORK / PORTFOLIO */}
      {/* ========================================================================= */}
      <section id="portfolio" className="section-spacing" style={{ position: 'relative' }}>
        <div className="container-custom">
          <div className="section-header">
            <div className="section-tag">Case Studies & Showcase</div>
            <h2 className="section-title">
              Ideas We've Turned Into <span className="serif-italic">Digital Experiences</span>
            </h2>
            <p className="section-subtitle">
              Explore some of the branding, marketing and digital work created by GDAs.
            </p>
          </div>

          {/* Filter Categories */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              flexWrap: 'wrap',
              marginBottom: '36px',
            }}
          >
            {['All', 'Branding', 'Social Media', 'Meta Ads', 'Websites', 'Creatives'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActivePortfolioCategory(cat)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '50px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: activePortfolioCategory === cat ? '#3b82f6' : 'rgba(255, 255, 255, 0.1)',
                  background: activePortfolioCategory === cat ? '#2563eb' : 'rgba(255, 255, 255, 0.03)',
                  color: activePortfolioCategory === cat ? '#ffffff' : '#a3a3a3',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <motion.div
            layout
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '26px',
            }}
          >
            <AnimatePresence>
              {filteredPortfolio.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  key={item.id}
                  className="glass-card"
                  style={{
                    borderRadius: '22px',
                    overflow: 'hidden',
                    background: '#0d0d0d',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <div style={{ height: '220px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '14px',
                        left: '14px',
                        background: 'rgba(0, 0, 0, 0.75)',
                        backdropFilter: 'blur(8px)',
                        padding: '4px 12px',
                        borderRadius: '50px',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#60a5fa',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                      }}
                    >
                      {item.badge}
                    </div>
                  </div>

                  <div style={{ padding: '22px' }}>
                    <div style={{ fontSize: '11.5px', color: '#94a3b8', fontWeight: 600, marginBottom: '4px' }}>
                      {item.subCategory}
                    </div>
                    <h3 style={{ fontSize: '19px', fontWeight: 700, color: 'var(--text-white)', marginBottom: '8px' }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 08. RESULTS / PROOF */}
      {/* ========================================================================= */}
      <section
        style={{
          padding: '70px 0',
          background: 'linear-gradient(180deg, #050505 0%, #0c0c0c 100%)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          position: 'relative',
        }}
      >
        <div className="container-custom">
          <div className="section-header" style={{ marginBottom: '36px' }}>
            <div className="section-tag">Milestones & Impact</div>
            <h2 className="section-title">
              Results That <span className="serif-italic">Matter.</span>
            </h2>
            <p className="section-subtitle">
              Authentic dedication delivering tangible milestones for every business we partner with.
            </p>
          </div>

          <div
            className="mobile-stats-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px',
              textAlign: 'center',
            }}
          >
            {[
              { num: '50+', label: 'Clients Served', sub: 'Growing businesses empowered', color: '#2563eb' },
              { num: '120+', label: 'Projects Delivered', sub: 'From branding to websites', color: '#2563eb' },
              { num: '300+', label: 'Campaigns Managed', sub: 'Performance ad executions', color: '#2563eb' },
              { num: '100%', label: 'Businesses Supported', sub: 'Hands-on dedicated partner', color: '#2563eb' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="glass-card"
                style={{
                  padding: '28px 20px',
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div
                  style={{
                    fontSize: 'clamp(36px, 4vw, 48px)',
                    fontWeight: 800,
                    color: stat.color,
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                    marginBottom: '8px',
                  }}
                >
                  {stat.num}
                </div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-white)', marginBottom: '4px' }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: '12.5px', color: 'var(--text-dim)' }}>
                  {stat.sub}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 09. GDAs LEGACY SECTION (Father Never Dies Tribute) */}
      {/* ========================================================================= */}
      <section id="legacy" className="section-spacing" style={{ position: 'relative' }}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8 }}
            className="legacy-card"
            style={{
              padding: 'clamp(32px, 5vw, 56px)',
              borderRadius: '28px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '40px',
                alignItems: 'center',
              }}
            >
              {/* Left Column: Legacy Story Narrative */}
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '5px 14px',
                    borderRadius: '50px',
                    background: 'rgba(234, 179, 8, 0.12)',
                    border: '1px solid rgba(234, 179, 8, 0.3)',
                    color: '#fde047',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                  }}
                >
                  <span style={{ color: '#eab308' }}>✦</span>
                  <span>Founder Tribute • Heritage</span>
                </div>

                <h2
                  style={{
                    fontSize: 'clamp(26px, 3.4vw, 38px)',
                    fontWeight: 800,
                    color: '#ffffff',
                    lineHeight: 1.15,
                    marginBottom: '4px',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Mr. Ganesh Ram
                </h2>
                <div style={{ fontSize: '14.5px', color: '#facc15', fontWeight: 700, marginBottom: '2px' }}>
                  Ex-Senior Controller, JSEB
                </div>
                <div style={{ fontSize: '12.5px', color: '#cbd5e1', marginBottom: '16px' }}>
                  Patratu Thermal Power Station, Patratu
                </div>

                <div style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                  Inspired by a Legacy. Built for the Future.
                </div>

                <p style={{ fontSize: '14.5px', color: '#e2e8f0', lineHeight: 1.65, marginBottom: '18px' }}>
                  The values of <strong>discipline, dedication, responsibility and perseverance</strong> continue to shape every standard at GDAs.
                </p>

                <div
                  style={{
                    background: 'rgba(234, 179, 8, 0.08)',
                    borderLeft: '4px solid #eab308',
                    padding: '14px 18px',
                    borderRadius: '0 12px 12px 0',
                    marginBottom: '22px',
                  }}
                >
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#fde047', marginBottom: '4px' }}>
                    Father Never Dies.
                  </div>
                  <div style={{ fontSize: '13.5px', color: '#fef08a', lineHeight: 1.55, fontStyle: 'italic' }}>
                    His values live on.<br />
                    His vision moves forward.<br />
                    His legacy continues through GDAs.
                  </div>
                </div>

                <Link
                  href="/about#legacy"
                  className="btn-secondary"
                  style={{
                    padding: '11px 24px',
                    fontSize: '13.5px',
                    textDecoration: 'none',
                    borderColor: 'rgba(234, 179, 8, 0.4)',
                    color: '#fef08a',
                  }}
                >
                  <span>Read Full Story</span>
                  <span>→</span>
                </Link>
              </div>

              {/* Right Column: Genuine Father Tribute Visual Frame */}
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    display: 'inline-block',
                    padding: '10px',
                    borderRadius: '24px',
                    background: 'radial-gradient(ellipse at center, rgba(234, 179, 8, 0.2) 0%, rgba(15, 15, 15, 0.85) 75%)',
                    border: '1px solid rgba(234, 179, 8, 0.4)',
                    boxShadow: '0 16px 48px rgba(0, 0, 0, 0.9), 0 0 40px rgba(234, 179, 8, 0.2)',
                    maxWidth: '400px',
                    width: '100%',
                  }}
                >
                  <div
                    style={{
                      borderRadius: '18px',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <img
                      src="/ganesh_ji_legacy.jpg"
                      alt="Founder Mr. Ganesh Ji - Late Mr. Ganesh Ram"
                      style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. TESTIMONIALS */}
      {/* ========================================================================= */}
      <section id="testimonials" className="section-spacing" style={{ background: '#050505', position: 'relative' }}>
        <div className="container-custom">
          <div className="section-header">
            <div className="section-tag">Testimonials</div>
            <h2 className="section-title">
              Client <span className="serif-italic">Stories</span>
            </h2>
            <p className="section-subtitle">
              Authentic experiences shared by business leaders and founders partnering with GDAs.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <span className="mobile-swipe-hint">Swipe client stories →</span>
          </div>

          <div
            className="mobile-horizontal-scroll"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
              gap: '24px',
            }}
          >
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="glass-card"
                style={{
                  padding: '26px 22px',
                  borderRadius: '20px',
                  background: 'rgba(15, 15, 15, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  {/* Rating Stars */}
                  <div style={{ display: 'flex', gap: '3px', color: '#facc15', fontSize: '15px', marginBottom: '12px' }}>
                    {'★★★★★'}
                  </div>
                  {/* Testimonial Quote */}
                  <p style={{ fontSize: '14px', color: '#d1d5db', lineHeight: 1.6, marginBottom: '20px' }}>
                    "{t.content}"
                  </p>
                </div>

                {/* Author Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '14px' }}>
                  <img
                    src={t.avatar}
                    alt={t.name}
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '1.5px solid rgba(59, 130, 246, 0.4)',
                    }}
                  />
                  <div>
                    <div style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--text-white)' }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>
                      {t.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. FAQ SECTION */}
      {/* ========================================================================= */}
      <section id="faq" className="section-spacing" style={{ position: 'relative' }}>
        <div className="container-custom">
          <div className="section-header">
            <div className="section-tag">FAQ</div>
            <h2 className="section-title">
              Frequently Asked <span className="serif-italic">Questions</span>
            </h2>
            <p className="section-subtitle">
              Clear answers to help you make informed decisions for your business growth.
            </p>
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, i) => {
              const isOpen = activeFaq === i;
              return (
                <div
                  key={i}
                  className="glass-card"
                  style={{
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    overflow: 'hidden',
                  }}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? -1 : i)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '18px 22px',
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-white)',
                      fontSize: '15px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '16px',
                    }}
                  >
                    <span>{faq.q}</span>
                    <span
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.25s ease',
                        color: 'var(--text-accent)',
                        fontSize: '16px',
                      }}
                    >
                      ▾
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div
                          style={{
                            padding: '0 22px 18px 22px',
                            fontSize: '14px',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.6,
                            borderTop: '1px solid var(--border-subtle)',
                            paddingTop: '12px',
                          }}
                        >
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. FINAL CTA */}
      {/* ========================================================================= */}
      <section className="cta-banner-section">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="cta-banner-card"
            style={{
              padding: 'clamp(36px, 5vw, 60px) 28px',
              borderRadius: '28px',
              textAlign: 'center',
              maxWidth: '860px',
              margin: '0 auto',
              position: 'relative',
            }}
          >
            <div className="cta-badge">
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3b82f6', display: 'inline-block' }} />
              <span>Start Growing Today</span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 800,
                color: 'var(--text-white)',
                lineHeight: 1.15,
                letterSpacing: '-0.025em',
                marginBottom: '14px',
              }}
            >
              Ready to Scale Your Business{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Digitally?
              </span>
            </h2>

            <p
              className="cta-desc"
              style={{
                maxWidth: '560px',
                margin: '0 auto 28px auto',
                fontSize: '15px',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
              }}
            >
              Schedule a free strategy consultation or connect with our team directly on WhatsApp.
            </p>

            <div
              className="mobile-btn-row"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '14px',
                flexWrap: 'wrap',
              }}
            >
              <button
                onClick={() => setModalOpen(true)}
                className="btn-primary"
                style={{
                  padding: '13px 30px',
                  fontSize: '14.5px',
                  fontWeight: 600,
                }}
              >
                <span>Get Free Strategy Call</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>

              <a
                href="https://wa.me/919939862765?text=Hello%20GDAs%20Team%2C%20I%20want%20to%20grow%20my%20business%20digitally"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{
                  padding: '13px 26px',
                  fontSize: '14.5px',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  borderColor: 'rgba(34, 197, 94, 0.4)',
                }}
              >
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e' }} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 13. FOOTER (GDAs Without Dot) */}
      {/* ========================================================================= */}
      <footer
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          background: '#040404',
          padding: '60px 0 28px 0',
          position: 'relative',
        }}
      >
        <div className="container-custom">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '40px',
              marginBottom: '46px',
            }}
          >
            {/* Brand Column */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: '#0d3899',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  <img src="/gda_logo.png" alt="GDAs Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <span style={{ fontWeight: 800, fontSize: '18px', color: 'var(--text-white)' }}>GDAs</span>
              </div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
                GANESHA DIGITAL ADS
              </div>
              <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', fontWeight: 500, marginBottom: '12px' }}>
                Digital Ka Saath, Aapke Business Ka Vikas.
              </p>
              <p style={{ fontSize: '12px', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                Built with a Vision. Driven by a Legacy. Father Never Dies.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-white)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
                Quick Links
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
                <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Home</Link>
                <Link href="/about" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>About</Link>
                <Link href="/services" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Services</Link>
                <Link href="/training" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Training</Link>
                <a href="#portfolio" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Portfolio</a>
                <Link href="/blog" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Blog</Link>
                <Link href="/careers" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Careers</Link>
              </div>
            </div>

            {/* Services */}
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-white)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
                Services
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                <span>Digital Marketing</span>
                <span>WhatsApp API</span>
                <span>IVR Calling</span>
                <span>Local SEO</span>
                <span>Branding</span>
                <span>Web Development</span>
              </div>
            </div>

            {/* Contact & Socials */}
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-white)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
                Contact & Connect
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px', marginBottom: '18px' }}>
                <a href="tel:9939862765" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>+91 9939862765</span>
                </a>
              </div>

              {/* Official Social Links */}
              <SocialLinks />
            </div>
          </div>

          {/* Bottom Copyright */}
          <div
            style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              paddingTop: '22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '14px',
              fontSize: '12.5px',
              color: '#737373',
            }}
          >
            <div>© 2026 GDAs Ganesha Digital Ads. All Rights Reserved.</div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Link href="/privacy-policy" style={{ color: '#737373', textDecoration: 'none' }}>Privacy Policy</Link>
              <Link href="/terms-conditions" style={{ color: '#737373', textDecoration: 'none' }}>Terms & Conditions</Link>
              <Link href="/refund-policy" style={{ color: '#737373', textDecoration: 'none' }}>Refund Policy</Link>
              <Link href="/disclaimer" style={{ color: '#737373', textDecoration: 'none' }}>Disclaimer</Link>
              <Link href="/admin" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 600 }}>Admin Portal</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* FLOATING WHATSAPP BUTTON (Direct Conversion) */}
      {/* ========================================================================= */}
      <a
        href="https://wa.me/919939862765?text=Hello%20GDAs%20Team%2C%20I%20want%20to%20grow%20my%20business%20digitally"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 999,
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          backgroundColor: '#22c55e',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 25px rgba(34, 197, 94, 0.5)',
          transition: 'transform 0.25s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </a>

      {/* ========================================================================= */}
      {/* LEAD GENERATION & CONSULTATION MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {modalOpen && (
          <div className="modal-overlay" onClick={() => setModalOpen(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.25 }}
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setModalOpen(false)}
                style={{
                  position: 'absolute',
                  top: '18px',
                  right: '18px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: 'none',
                  color: '#a3a3a3',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                }}
              >
                ✕
              </button>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                  Grow With GDAs
                </div>
                <h3 style={{ fontSize: '21px', fontWeight: 800, color: 'var(--text-white)' }}>
                  Let's Discuss Your Business
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Fill in your details and our team will get in touch with a customized digital growth plan.
                </p>
              </div>

              {formSubmitted ? (
                <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      background: 'rgba(34, 197, 94, 0.12)',
                      border: '1px solid rgba(34, 197, 94, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 12px auto',
                      color: '#22c55e',
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h4 style={{ fontSize: '19px', fontWeight: 700, color: 'var(--text-white)', marginBottom: '6px' }}>
                    Request Sent Successfully!
                  </h4>
                  <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                    Our growth team will review your business details and connect with you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setModalOpen(false);
                    }}
                    className="btn-primary"
                    style={{ width: '100%' }}
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-medium)',
                        borderRadius: '10px',
                        color: 'var(--text-white)',
                        fontSize: '14px',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9939862765"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-medium)',
                        borderRadius: '10px',
                        color: 'var(--text-white)',
                        fontSize: '14px',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      Business Name or Industry
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Retail, Real Estate, Healthcare, D2C"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-medium)',
                        borderRadius: '10px',
                        color: 'var(--text-white)',
                        fontSize: '14px',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      Service Required
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-medium)',
                        borderRadius: '10px',
                        color: 'var(--text-white)',
                        fontSize: '14px',
                        outline: 'none',
                      }}
                    >
                      <option value="Digital Marketing (Meta & Google Ads)">Digital Marketing (Meta & Google Ads)</option>
                      <option value="WhatsApp Bulk Marketing">WhatsApp Bulk Marketing (Official API & Broadcasts)</option>
                      <option value="IVR Calling Service">IVR Calling Service (Smart OBD & Voice Broadcast)</option>
                      <option value="GMB Setup & Ranking">GMB Setup & Local Google Maps Ranking</option>
                      <option value="Digital Political Campaigning">Digital Political Campaigning (War Room & Geo Ads)</option>
                      <option value="Business Growth Management">Business Growth Management (Scale & GTM)</option>
                      <option value="CRM, ERP & Business Automation">CRM, ERP & Business Process Automation</option>
                      <option value="Branding & Creative">Branding & Creative Design (Logo, Visuals)</option>
                      <option value="Website & Technology">Website Development & Next.js Funnels</option>
                      <option value="SEO Services">SEO Services (Organic Search & Technical SEO)</option>
                      <option value="Social Media">Social Media Management & Viral Reels</option>
                      <option value="Automation & AI">AI & Workflow Automation</option>
                      <option value="Complete All-in-One Solution">Complete All-in-One Growth Suite</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      Message or Requirements (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your goals and current challenges..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-medium)',
                        borderRadius: '10px',
                        color: 'var(--text-white)',
                        fontSize: '14px',
                        outline: 'none',
                        resize: 'none',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{
                      width: '100%',
                      padding: '13px',
                      fontSize: '15px',
                      fontWeight: 700,
                      marginTop: '6px',
                    }}
                  >
                    Submit & Connect on WhatsApp
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
