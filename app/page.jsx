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
      title: 'Digital Marketing (Meta & Google Ads)',
      tagline: 'Meta Ads • Google Ads • Lead Generation • Performance Scaling',
      desc: 'High-performing ad campaigns across Facebook, Instagram, Google Search & YouTube engineered to generate qualified business leads and scalable customer acquisition.',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 20V10M18 20V4M6 20v-4" />
        </svg>
      ),
      tags: ['Meta Ads', 'Google Search Ads', 'Lead Generation', 'Performance Media'],
      highlightColor: '#3b82f6',
    },
    {
      num: '02',
      title: 'WhatsApp Bulk Marketing',
      tagline: 'Official API • Green Tick • Bulk Broadcasts • Catalogs',
      desc: 'Direct verified WhatsApp messaging with 98% open rates, automated quick-reply buttons, interactive product catalogs, and high-conversion bulk broadcast campaigns.',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M8 10h.01M12 10h.01M16 10h.01" />
        </svg>
      ),
      tags: ['Official WhatsApp API', 'Bulk Broadcasts', 'Green Tick Support', 'Catalog Sharing'],
      highlightColor: '#22c55e',
    },
    {
      num: '03',
      title: 'IVR Calling Service',
      tagline: 'Voice Broadcasting • Multi-Level IVR • Smart Call Routing',
      desc: 'Cloud-based IVR calling and automated voice broadcasting (OBD) to reach thousands of customers instantly, capture lead responses, and qualify calls automatically.',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      tags: ['Cloud IVR Menu', 'Bulk Voice OBD', 'Missed Call Leads', 'Live Call Recording'],
      highlightColor: '#0ea5e9',
    },
    {
      num: '04',
      title: 'GMB Setup & Ranking',
      tagline: 'Google Maps Top 3 • Local SEO • Verified Profile Setup',
      desc: 'Dominate local Google Search and Google Maps in your target city to drive daily walk-ins, phone inquiries, and local dominance over competitors.',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <path d="M11 8v6M8 11h6" />
        </svg>
      ),
      tags: ['Google Maps 3-Pack', 'GMB Verification', 'Review Management', 'Local Citations'],
      highlightColor: '#10b981',
    },
    {
      num: '05',
      title: 'Digital Political Campaigning',
      tagline: 'War Room • Constituency Geo Ads • Voter Outreach',
      desc: 'Strategic political campaign management, constituency digital war rooms, booth-level geo-targeted video ads, WhatsApp networks, and perception narrative building.',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
      tags: ['Constituency Geo Ads', 'Digital War Room', 'Speech & Reel Clips', 'Voter Sentiment'],
      highlightColor: '#f97316',
    },
    {
      num: '06',
      title: 'Business Growth Management',
      tagline: 'Go-To-Market • Scale Architecture • Revenue Acceleration',
      desc: 'End-to-end strategic growth consulting covering product positioning, CAC reduction, omnichannel budget allocation, and full-funnel conversion rate optimization.',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
      tags: ['GTM Strategy', 'Unit Economics', 'Full-Funnel CRO', 'Dedicated Director'],
      highlightColor: '#eab308',
    },
    {
      num: '07',
      title: 'CRM, ERP & Business Automation',
      tagline: 'Lead Pipelines • ERP Workflows • Multi-Channel Sync',
      desc: 'Custom CRM pipelines, automated lead scoring, ERP operational workflows, and invoice automation that unify sales, operations, and databases into one dashboard.',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
      tags: ['Custom CRM Setup', 'ERP Integration', 'Lead Routing', 'Automated Invoicing'],
      highlightColor: '#6366f1',
    },
    {
      num: '08',
      title: 'Branding & Creative',
      tagline: 'Logo Design • Brand Identity • Graphic Design • Content',
      desc: 'Distinctive visual identities, bespoke logo suites, brand books, and scroll-stopping graphic assets that establish trust and differentiate your business.',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 19l7-7 3 3-7 7-3-3z" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          <path d="M2 2l7.586 7.586" />
          <circle cx="11" cy="11" r="2" />
        </svg>
      ),
      tags: ['Visual Identity', 'Logo Suite', 'Brand Guidelines', 'Creative Direction'],
      highlightColor: '#8b5cf6',
    },
    {
      num: '09',
      title: 'Website & Technology',
      tagline: 'Website Development • Landing Pages • Business Websites',
      desc: 'Ultra-fast, mobile-first websites and conversion-focused landing pages engineered for high speed, search engines, and seamless user experiences.',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
      tags: ['Custom Websites', 'Next.js & React', 'High-Converting Funnels', 'Mobile Responsive'],
      highlightColor: '#06b6d4',
    },
  ];

  // 07. Portfolio / Our Work Data
  const portfolioItems = [
    {
      id: 1,
      title: 'Aura Luxury Living',
      category: 'Branding',
      subCategory: 'Brand Identity & Packaging',
      description: 'Complete brand visual identity, premium packaging design, and visual brand playbook.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
      badge: 'Brand Revamp',
    },
    {
      id: 2,
      title: 'Elite Health & Wellness',
      category: 'Meta Ads',
      subCategory: 'Lead Generation Campaign',
      description: 'High-converting Meta ad campaigns delivering 420+ qualified customer enquiries per month.',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop&q=80',
      badge: 'Lead Scaling',
    },
    {
      id: 3,
      title: 'Apex Tech Solutions',
      category: 'Websites',
      subCategory: 'Modern Web Platform',
      description: 'High-speed Next.js corporate website with interactive service demos and lead booking.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
      badge: 'Website Tech',
    },
    {
      id: 4,
      title: 'Velvet Cafe & Roastery',
      category: 'Social Media',
      subCategory: 'Reels & Viral Social',
      description: 'Organic video reels and Instagram brand strategy driving 2.4M organic local views.',
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
      description: 'Hyper-local Meta Ads and Google Maps SEO generating 180+ monthly patient appointments.',
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
      role: 'Makeup Artist • Professional Makeup & Hairstyling Academy',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
      content:
        "Excellent experience with Ganesha Digital Ads (GDAs)! We ran a Meta Lead Generation campaign for our Professional Makeup & Hairstyling Academy, and within just 1 day we started receiving genuine leads. Their audience targeting, campaign setup, and optimization were excellent. If you're looking for the best digital marketing agency in Gaya for Meta Ads, Facebook Ads, Instagram Ads, or Lead Generation, I highly recommend GDAs. Thank you for delivering great results and professional support!",
      rating: 5,
    },
    {
      name: 'Ravi Kumar Tiwari',
      role: 'Business Owner • Gaya, Bihar & Patratu, Ramgarh Jharkhand',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      content:
        'Agar aap apne business ke liye online leads aur promotion chahte hain, then Ganesha Digital Ads is a great choice. They provide professional Meta Ads and digital marketing services in Gaya, Bihar, & Patratu Ramgarh Jharkhand Highly recommended!',
      rating: 5,
    },
    {
      name: 'Tanisha Choudhary',
      role: 'E-Commerce & Website Client',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      content:
        'maine inse apna website bnwaya ...mujhe Ab tk ka sbse best kam lga inlog ka ..inke wjh se acha conversion aya ...maine audit karwaya to pata chala mere websit m kha problem tha...thanks You Gdas',
      rating: 5,
    },
  ];

  // 11. FAQ Data
  const faqs = [
    {
      q: 'What services does GDAs provide?',
      a: 'GDAs (Ganesha Digital Ads) provides end-to-end Digital Marketing (Meta Ads, Google Ads, Lead Gen), Branding & Creative Design (Logos, Visual Identity), Website & Technology Development, Local SEO & Google Business Profile optimization, Social Media Management, and WhatsApp/AI Business Automation.',
    },
    {
      q: 'Does GDAs work with small businesses?',
      a: 'Yes! We proudly work with businesses at all stages — from early-stage startups and local service providers to established retail brands and growing enterprises looking to scale.',
    },
    {
      q: 'Can I hire GDAs for only one service?',
      a: 'Yes, absolutely. You can hire GDAs for an individual service (such as only Website Development, Logo & Branding, or Meta Ads) or choose our full-suite digital growth package for comprehensive business acceleration.',
    },
    {
      q: 'How can I get started?',
      a: 'Getting started is simple! Click the "Grow My Business" button or reach out to our team via WhatsApp/Call at 9939862765. We will schedule a quick discovery discussion, understand your goals, and share a tailored roadmap for your business within 24 to 48 hours.',
    },
    {
      q: 'What makes GDAs different from traditional agencies?',
      a: 'Unlike traditional agencies that offer generic advice or fragment your work across disconnected vendors, GDAs is a unified growth partner. We combine creative brand storytelling with technical performance marketing and custom web technology under one roof.',
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
              className="btn-primary"
              style={{ padding: '9px 20px', fontSize: '13px' }}
            >
              <span>Grow My Business</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ display: 'none', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '6px' }}
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
      <section
        className="hero-wrapper"
        style={{
          paddingTop: '160px',
          paddingBottom: '80px',
          position: 'relative',
        }}
      >
        <div className="container-custom">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '48px',
              alignItems: 'center',
              textAlign: 'left',
            }}
          >
            {/* Left Content — Strict Hierarchy */}
            <div>
              {/* 1. Small Eyebrow / Label */}
              <motion.div
                initial={{ opacity: 0, filter: 'blur(8px)', y: 15 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ duration: 0.65, delay: 0.1 }}
                style={{ display: 'inline-flex', alignItems: 'center', marginBottom: '18px' }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: 'rgba(37, 99, 235, 0.1)',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    borderRadius: '50px',
                    padding: '6px 16px',
                    boxShadow: '0 4px 20px rgba(37, 99, 235, 0.2)',
                  }}
                >
                  <span className="pulse-dot" />
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      color: '#60a5fa',
                      textTransform: 'uppercase',
                    }}
                  >
                    GANESHA DIGITAL ADS • GDAs
                  </span>
                </div>
              </motion.div>

              {/* 2. Main Heading — Sabse Bada */}
              <motion.h1
                initial={{ opacity: 0, filter: 'blur(12px)', y: 25 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontSize: 'clamp(40px, 5.2vw, 68px)',
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
                    background: 'linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block',
                  }}
                >
                  All Solutions.
                </span>
              </motion.h1>

              {/* 3. Main GDAs Tagline — Second Biggest */}
              <motion.div
                initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ duration: 0.75, delay: 0.3 }}
                style={{
                  fontSize: 'clamp(20px, 2.6vw, 28px)',
                  fontWeight: 600,
                  color: '#e2e8f0',
                  lineHeight: 1.3,
                  letterSpacing: '-0.015em',
                  marginBottom: '18px',
                }}
              >
                Digital Ka Saath,{' '}
                <span style={{ color: '#3b82f6', fontWeight: 700 }}>Aapke Business Ka Vikas.</span>
              </motion.div>

              {/* Supporting Text */}
              <motion.p
                initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ duration: 0.75, delay: 0.4 }}
                style={{
                  fontSize: '16px',
                  color: '#a3a3a3',
                  lineHeight: 1.65,
                  maxWidth: '560px',
                  marginBottom: '20px',
                }}
              >
                We help businesses grow with Digital Marketing, Branding & Technology solutions — all under one roof.
              </motion.p>

              {/* 4. Services Line */}
              <motion.div
                initial={{ opacity: 0, filter: 'blur(6px)', y: 15 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ duration: 0.65, delay: 0.48 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  flexWrap: 'wrap',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#93c5fd',
                  marginBottom: '30px',
                }}
              >
                <span style={{ background: 'rgba(59, 130, 246, 0.15)', padding: '4px 12px', borderRadius: '20px', border: '1px solid rgba(59, 130, 246, 0.25)' }}>
                  Digital Marketing
                </span>
                <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>•</span>
                <span style={{ background: 'rgba(59, 130, 246, 0.15)', padding: '4px 12px', borderRadius: '20px', border: '1px solid rgba(59, 130, 246, 0.25)' }}>
                  Branding
                </span>
                <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>•</span>
                <span style={{ background: 'rgba(59, 130, 246, 0.15)', padding: '4px 12px', borderRadius: '20px', border: '1px solid rgba(59, 130, 246, 0.25)' }}>
                  Technology
                </span>
              </motion.div>

              {/* 5. CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ duration: 0.7, delay: 0.55 }}
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
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="btn-primary"
                  style={{
                    padding: '13px 30px',
                    fontSize: '14.5px',
                    fontWeight: 700,
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
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="btn-secondary"
                  style={{
                    padding: '13px 26px',
                    fontSize: '14.5px',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>Talk to GDAs</span>
                </motion.a>
              </motion.div>

              {/* 6. Father Never Dies — Sabse Subtle */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingTop: '16px',
                }}
              >
                <a
                  href="#legacy"
                  style={{
                    color: 'rgba(255, 255, 255, 0.5)',
                    fontSize: '12.5px',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#eab308')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)')}
                >
                  <span style={{ color: '#eab308' }}>✦</span>
                  <span>Built with a Vision. Driven by a Legacy.</span>
                  <strong style={{ color: 'rgba(255, 255, 255, 0.75)', fontWeight: 600 }}>Father Never Dies.</strong>
                </a>
              </motion.div>
            </div>

            {/* Right Side — Modern Growth Visual (No Fake Numbers) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, filter: 'blur(12px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, delay: 0.3 }}
              style={{ position: 'relative' }}
            >
              {/* Central Glowing Shield / Visual Hub */}
              <div
                className="glass-card glass-card-glow"
                style={{
                  padding: '36px 28px',
                  borderRadius: '28px',
                  position: 'relative',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  background: 'linear-gradient(180deg, rgba(13, 56, 153, 0.2) 0%, rgba(10, 10, 10, 0.95) 100%)',
                }}
              >
                {/* Central Emblem Badge */}
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <div
                    style={{
                      width: '74px',
                      height: '74px',
                      borderRadius: '20px',
                      background: 'radial-gradient(circle, #1d4ed8 0%, #0a2566 100%)',
                      border: '2px solid rgba(59, 130, 246, 0.6)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 35px rgba(37, 99, 235, 0.5)',
                      marginBottom: '12px',
                    }}
                  >
                    <img
                      src="/gda_logo.png"
                      alt="GDAs Emblem"
                      style={{ width: '85%', height: '85%', objectFit: 'contain' }}
                    />
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-white)', letterSpacing: '-0.01em' }}>
                    GDAs Unified Growth System
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Creative • Marketing • Tech Stack
                  </div>
                </div>

                {/* 4 Multi-Tier Ecosystem Elements */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div
                    className="glass-card"
                    style={{
                      padding: '16px',
                      borderRadius: '16px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.07)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }} />
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-white)' }}>Performance Ads</span>
                    </div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>Meta, Google & Targeted Lead Flow</div>
                  </div>

                  <div
                    className="glass-card"
                    style={{
                      padding: '16px',
                      borderRadius: '16px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.07)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#8b5cf6' }} />
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-white)' }}>Brand Identity</span>
                    </div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>Distinctive Logos, Visuals & Assets</div>
                  </div>

                  <div
                    className="glass-card"
                    style={{
                      padding: '16px',
                      borderRadius: '16px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.07)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#06b6d4' }} />
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-white)' }}>Web & Tech</span>
                    </div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>Fast, High-Converting Pages</div>
                  </div>

                  <div
                    className="glass-card"
                    style={{
                      padding: '16px',
                      borderRadius: '16px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.07)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-white)' }}>Social & Growth</span>
                    </div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>Viral Reels & Active Reach</div>
                  </div>
                </div>

                {/* Bottom Trust Badge */}
                <div
                  style={{
                    marginTop: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 16px',
                    background: 'rgba(37, 99, 235, 0.12)',
                    borderRadius: '12px',
                    border: '1px solid rgba(37, 99, 235, 0.25)',
                  }}
                >
                  <span style={{ fontSize: '12px', color: '#bfdbfe', fontWeight: 600 }}>
                    🎯 Dedicated Business Growth
                  </span>
                  <span style={{ fontSize: '11.5px', color: '#60a5fa', fontWeight: 700 }}>
                    100% Focused
                  </span>
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
          padding: '60px 0',
          borderTop: '1px solid rgba(255, 255, 255, 0.07)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
          background: 'linear-gradient(180deg, #050505 0%, #0a0a0a 100%)',
          position: 'relative',
        }}
      >
        <div className="container-custom">
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 40px auto' }}>
            <h2 style={{ fontSize: 'clamp(26px, 3.2vw, 36px)', fontWeight: 700, color: 'var(--text-white)', marginBottom: '12px' }}>
              Everything Your Business Needs to Go Digital.
            </h2>
            <p style={{ fontSize: '15.5px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              From building your brand identity to generating leads and growing your online presence, GDAs brings the essential digital solutions together in one place.
            </p>
          </div>

          {/* 3 Small Highlights */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px',
            }}
          >
            <motion.div
              whileHover={{ y: -4 }}
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
                  fontSize: '26px',
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(37, 99, 235, 0.15)',
                  border: '1px solid rgba(37, 99, 235, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                🎯
              </div>
              <div>
                <div style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-white)', marginBottom: '4px' }}>
                  Strategy
                </div>
                <div style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Right strategy for your business tailored to your target audience.
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
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
                  fontSize: '26px',
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                📈
              </div>
              <div>
                <div style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-white)', marginBottom: '4px' }}>
                  Growth
                </div>
                <div style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Focused on measurable business growth and high-intent customer acquisition.
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
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
                  fontSize: '26px',
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(234, 179, 8, 0.15)',
                  border: '1px solid rgba(234, 179, 8, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                🤝
              </div>
              <div>
                <div style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-white)', marginBottom: '4px' }}>
                  Support
                </div>
                <div style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  A dedicated digital partner for your journey from day one.
                </div>
              </div>
            </motion.div>
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
                  fontSize: 'clamp(28px, 3.6vw, 44px)',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  color: 'var(--text-white)',
                  marginBottom: '20px',
                  letterSpacing: '-0.02em',
                }}
              >
                More Than a Digital Agency.{' '}
                <span style={{ color: '#3b82f6', display: 'block' }}>
                  We're Your Digital Growth Partner.
                </span>
              </h2>

              <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
                Ganesha Digital Ads (GDAs) is a digital growth company helping businesses build their brand, reach the right audience and grow online.
              </p>

              <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '28px' }}>
                From Marketing and Branding to Websites and Technology, we bring multiple digital solutions together so you don't have to manage everything separately.
              </p>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <Link
                  href="/about"
                  className="btn-primary"
                  style={{ textDecoration: 'none', padding: '12px 26px', fontSize: '14px' }}
                >
                  <span>Know More About GDAs</span>
                  <span>→</span>
                </Link>

                <button
                  onClick={() => setModalOpen(true)}
                  className="btn-secondary"
                  style={{ padding: '12px 24px', fontSize: '14px' }}
                >
                  Contact Our Team
                </button>
              </div>
            </div>

            {/* Right Content: Founder Pic & Details */}
            <div>
              <motion.div
                whileHover={{ scale: 1.02 }}
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
                      width: '90px',
                      height: '90px',
                      borderRadius: '20px',
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
                    <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-white)' }}>
                      Mr. Ram Gyan
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                      Building in Digital Marketing Since 2019
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: 'rgba(37, 99, 235, 0.08)',
                    borderLeft: '3px solid #3b82f6',
                    padding: '12px 16px',
                    borderRadius: '0 12px 12px 0',
                    fontSize: '13.5px',
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
                    padding: '14px 16px',
                    borderRadius: '14px',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                  }}
                >
                  Honorary Doctorate (USA) • Bharat Visionary Leader 2026 • IIT Delhi & IIT Patna Trained • Vskills Certified Master
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
                    View Certifications & Awards →
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
            <div className="section-tag">Our Digital Ecosystem</div>
            <h2 className="section-title">
              Everything You Need to <span className="serif-italic">Grow Digitally</span>
            </h2>
            <p className="section-subtitle">
              One platform. Multiple solutions. One goal — your business growth.
            </p>
          </div>

          {/* 6 Service Cards Grid */}
          <div
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
                  padding: '30px 26px',
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
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <span
                      style={{
                        fontSize: '13px',
                        fontWeight: 800,
                        color: srv.highlightColor,
                        letterSpacing: '0.08em',
                      }}
                    >
                      {srv.num}
                    </span>
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '12px',
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
                  <h3 style={{ fontSize: '21px', fontWeight: 700, color: 'var(--text-white)', marginBottom: '8px' }}>
                    {srv.title}
                  </h3>
                  <div
                    style={{
                      fontSize: '12.5px',
                      fontWeight: 600,
                      color: srv.highlightColor,
                      marginBottom: '14px',
                      lineHeight: 1.4,
                    }}
                  >
                    {srv.tagline}
                  </div>

                  {/* Description */}
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                    {srv.desc}
                  </p>
                </div>

                <div>
                  {/* Feature Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                    {srv.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          background: 'var(--pill-bg)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--pill-text)',
                          padding: '3px 9px',
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
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: 0,
                    }}
                  >
                    <span>Get Started with {srv.title}</span>
                    <span style={{ color: srv.highlightColor }}>→</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Explore All Services CTA */}
          <div style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <Link
              href="/services"
              className="btn-primary"
              style={{ padding: '13px 32px', fontSize: '15px', textDecoration: 'none' }}
            >
              <span>Explore All Services</span>
              <span>→</span>
            </Link>
            <button
              onClick={() => setModalOpen(true)}
              className="btn-secondary"
              style={{ padding: '13px 28px', fontSize: '15px' }}
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
            <div className="section-tag">The GDAs Advantage</div>
            <h2 className="section-title">
              Why Businesses <span className="serif-italic">Choose GDAs</span>
            </h2>
            <p className="section-subtitle">
              One Partner. Complete Digital Solutions.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
            }}
          >
            {[
              {
                emoji: '🎯',
                title: 'Business-Focused',
                desc: "We don't just create campaigns. We focus on helping your business move forward.",
                accent: '#3b82f6',
              },
              {
                emoji: '💡',
                title: 'Creative + Strategy',
                desc: 'Creative ideas backed by practical digital strategy that delivers tangible business impact.',
                accent: '#8b5cf6',
              },
              {
                emoji: '⚡',
                title: 'One Platform',
                desc: 'Marketing, branding, technology and digital solutions under one cohesive roof.',
                accent: '#06b6d4',
              },
              {
                emoji: '🤝',
                title: 'Long-Term Partnership',
                desc: 'We aim to grow with your business, not just complete a one-time project.',
                accent: '#10b981',
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                className="glass-card"
                style={{
                  padding: '32px 26px',
                  borderRadius: '22px',
                  background: 'rgba(15, 15, 15, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div
                  style={{
                    fontSize: '32px',
                    width: '60px',
                    height: '60px',
                    borderRadius: '16px',
                    background: `${card.accent}18`,
                    border: `1px solid ${card.accent}35`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                  }}
                >
                  {card.emoji}
                </div>
                <h3 style={{ fontSize: '19px', fontWeight: 700, color: 'var(--text-white)', marginBottom: '10px' }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
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
            <div className="section-tag">Simple 4-Step Process</div>
            <h2 className="section-title">
              From Idea to Growth — <span className="serif-italic">We Make It Simple</span>
            </h2>
            <p className="section-subtitle">
              A transparent, structured methodology that turns your business vision into measurable momentum.
            </p>
          </div>

          {/* 4 Steps Horizontal Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px',
              position: 'relative',
            }}
          >
            {[
              {
                step: '01',
                title: 'Understand',
                desc: 'We understand your business, goals, target audience, and current challenges.',
                color: '#3b82f6',
              },
              {
                step: '02',
                title: 'Strategize',
                desc: 'We create a tailored digital strategy and marketing roadmap according to your needs.',
                color: '#8b5cf6',
              },
              {
                step: '03',
                title: 'Create',
                desc: 'We build your brand identity, content, high-converting ad campaigns and digital assets.',
                color: '#06b6d4',
              },
              {
                step: '04',
                title: 'Grow',
                desc: 'We optimize, improve performance, and scale what delivers real business growth.',
                color: '#10b981',
              },
            ].map((step, idx) => (
              <motion.div
                key={step.step}
                whileHover={{ y: -4 }}
                className="glass-card"
                style={{
                  padding: '28px 24px',
                  borderRadius: '20px',
                  background: 'rgba(15, 15, 15, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    fontSize: '28px',
                    fontWeight: 800,
                    color: step.color,
                    letterSpacing: '-0.02em',
                    marginBottom: '12px',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  {step.step}.
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-white)', marginBottom: '8px' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
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
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px',
              textAlign: 'center',
            }}
          >
            {[
              { num: '50+', label: 'Clients Served', sub: 'Growing businesses empowered', color: '#3b82f6' },
              { num: '120+', label: 'Projects Delivered', sub: 'From branding to websites', color: '#8b5cf6' },
              { num: '300+', label: 'Campaigns Managed', sub: 'Performance ad executions', color: '#06b6d4' },
              { num: '100%', label: 'Businesses Supported', sub: 'Hands-on dedicated partner', color: '#10b981' },
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
      {/* 09. GDAs LEGACY SECTION ❤️ (Father Never Dies Tribute) */}
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
              padding: 'clamp(32px, 5vw, 60px)',
              borderRadius: '30px',
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
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                  }}
                >
                  <span>❤️</span>
                  <span>The Legacy Behind GDAs</span>
                </div>

                <h2
                  style={{
                    fontSize: 'clamp(28px, 3.6vw, 42px)',
                    fontWeight: 800,
                    color: '#ffffff',
                    lineHeight: 1.15,
                    marginBottom: '4px',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Mr. Ganesh Ram
                </h2>
                <div style={{ fontSize: '15px', color: '#facc15', fontWeight: 700, marginBottom: '2px' }}>
                  Ex-Senior Controller, JSEB
                </div>
                <div style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '18px' }}>
                  Patratu Thermal Power Station, Patratu
                </div>

                <div style={{ fontSize: '17px', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                  Inspired by a Legacy. Built for the Future.
                </div>

                <p style={{ fontSize: '15px', color: '#e2e8f0', lineHeight: 1.7, marginBottom: '18px' }}>
                  The values of <strong>discipline, dedication, responsibility and perseverance</strong> continue to inspire the journey of GDAs.
                </p>

                <div
                  style={{
                    background: 'rgba(234, 179, 8, 0.08)',
                    borderLeft: '4px solid #eab308',
                    padding: '16px 20px',
                    borderRadius: '0 14px 14px 0',
                    marginBottom: '24px',
                  }}
                >
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#fde047', marginBottom: '6px' }}>
                    Father Never Dies.
                  </div>
                  <div style={{ fontSize: '14px', color: '#fef08a', lineHeight: 1.6, fontStyle: 'italic' }}>
                    His values live on.<br />
                    His vision moves forward.<br />
                    His legacy continues through GDAs.
                  </div>
                </div>

                <Link
                  href="/about#legacy"
                  className="btn-secondary"
                  style={{
                    padding: '12px 26px',
                    fontSize: '14px',
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
                    padding: '12px',
                    borderRadius: '26px',
                    background: 'radial-gradient(ellipse at center, rgba(234, 179, 8, 0.2) 0%, rgba(15, 15, 15, 0.85) 75%)',
                    border: '1px solid rgba(234, 179, 8, 0.4)',
                    boxShadow: '0 16px 48px rgba(0, 0, 0, 0.9), 0 0 40px rgba(234, 179, 8, 0.2)',
                    maxWidth: '420px',
                    width: '100%',
                  }}
                >
                  <div
                    style={{
                      borderRadius: '20px',
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
            <div className="section-tag">Client Reviews</div>
            <h2 className="section-title">
              What Our <span className="serif-italic">Clients Say</span>
            </h2>
            <p className="section-subtitle">
              Authentic experiences shared by business leaders and founders partnering with GDAs.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
              gap: '24px',
            }}
          >
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="glass-card"
                style={{
                  padding: '28px 24px',
                  borderRadius: '22px',
                  background: 'rgba(15, 15, 15, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  {/* Rating Stars */}
                  <div style={{ display: 'flex', gap: '3px', color: '#facc15', fontSize: '16px', marginBottom: '14px' }}>
                    {'★★★★★'}
                  </div>
                  {/* Testimonial Quote */}
                  <p style={{ fontSize: '14.5px', color: '#d1d5db', lineHeight: 1.65, marginBottom: '22px' }}>
                    "{t.content}"
                  </p>
                </div>

                {/* Author Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '16px' }}>
                  <img
                    src={t.avatar}
                    alt={t.name}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '1.5px solid rgba(59, 130, 246, 0.4)',
                    }}
                  />
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-white)' }}>
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
            <div className="section-tag">Got Questions?</div>
            <h2 className="section-title">
              Frequently Asked <span className="serif-italic">Questions</span>
            </h2>
            <p className="section-subtitle">
              Clear answers to help you make informed decisions for your business growth.
            </p>
          </div>

          <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
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
                      padding: '20px 24px',
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-white)',
                      fontSize: '16px',
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
                        fontSize: '18px',
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
                            padding: '0 24px 20px 24px',
                            fontSize: '14.5px',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.65,
                            borderTop: '1px solid var(--border-subtle)',
                            paddingTop: '14px',
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
      {/* 12. FINAL CTA — VERY IMPORTANT 🔥 */}
      {/* ========================================================================= */}
      <section
        style={{
          padding: '90px 0',
          position: 'relative',
          overflow: 'hidden',
          background: 'radial-gradient(ellipse at center, rgba(37, 99, 235, 0.15) 0%, rgba(0, 0, 0, 0.95) 75%)',
        }}
      >
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-card glass-card-glow"
            style={{
              padding: 'clamp(40px, 6vw, 70px) 30px',
              borderRadius: '32px',
              textAlign: 'center',
              maxWidth: '920px',
              margin: '0 auto',
              position: 'relative',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                borderRadius: '50px',
                background: 'rgba(59, 130, 246, 0.15)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                color: '#60a5fa',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              <span>🔥</span>
              <span>Take Your Business To The Next Level</span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(32px, 4.8vw, 54px)',
                fontWeight: 800,
                color: 'var(--text-white)',
                lineHeight: 1.12,
                letterSpacing: '-0.03em',
                marginBottom: '16px',
              }}
            >
              Ready to Grow Your Business{' '}
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
              style={{
                fontSize: '16.5px',
                color: '#cbd5e1',
                lineHeight: 1.6,
                maxWidth: '620px',
                margin: '0 auto 34px auto',
              }}
            >
              Let's build your brand, reach your audience and take your business to the next level with GDAs.
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
                flexWrap: 'wrap',
              }}
            >
              <button
                onClick={() => setModalOpen(true)}
                className="btn-primary"
                style={{
                  padding: '14px 36px',
                  fontSize: '15.5px',
                  fontWeight: 700,
                }}
              >
                <span>Start Your Digital Journey</span>
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
                  padding: '14px 28px',
                  fontSize: '15px',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  borderColor: 'rgba(34, 197, 94, 0.4)',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>Call / WhatsApp GDAs</span>
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
          padding: '70px 0 30px 0',
          position: 'relative',
        }}
      >
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <div
                  style={{
                    width: '34px',
                    height: '34px',
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
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
                GANESHA DIGITAL ADS
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 500, marginBottom: '16px' }}>
                Digital Ka Saath, Aapke Business Ka Vikas.
              </p>
              <p style={{ fontSize: '12.5px', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                Built with a Vision. Driven by a Legacy. Father Never Dies.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-white)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
                Quick Links
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
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
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-white)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
                Services
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                <span>Digital Marketing</span>
                <span>Branding</span>
                <span>Website</span>
                <span>SEO</span>
                <span>Social Media</span>
                <span>Automation</span>
              </div>
            </div>

            {/* Contact & Socials */}
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-white)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
                Contact & Connect
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', marginBottom: '20px' }}>
                <a href="tel:9939862765" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>📞</span> <span>+91 9939862765</span>
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
              paddingTop: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '14px',
              fontSize: '13px',
              color: '#737373',
            }}
          >
            <div>© 2026 GDAs Ganesha Digital Ads. All Rights Reserved.</div>
            <div style={{ display: 'flex', gap: '18px' }}>
              <Link href="/privacy-policy" style={{ color: '#737373', textDecoration: 'none' }}>Privacy Policy</Link>
              <Link href="/terms-conditions" style={{ color: '#737373', textDecoration: 'none' }}>Terms & Conditions</Link>
              <Link href="/refund-policy" style={{ color: '#737373', textDecoration: 'none' }}>Refund Policy</Link>
              <Link href="/disclaimer" style={{ color: '#737373', textDecoration: 'none' }}>Disclaimer</Link>
              <Link href="/admin" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 600 }}>🔒 Admin Portal</Link>
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
          width: '54px',
          height: '54px',
          borderRadius: '50%',
          backgroundColor: '#22c55e',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 25px rgba(34, 197, 94, 0.5)',
          transition: 'transform 0.25s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-white)' }}>
                  Let's Discuss Your Business
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Fill in your details below and our team will get in touch with a customized digital growth plan.
                </p>
              </div>

              {formSubmitted ? (
                <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                  <div style={{ fontSize: '42px', marginBottom: '12px' }}>✅</div>
                  <h4 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-white)', marginBottom: '8px' }}>
                    Request Sent Successfully!
                  </h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
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
