'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

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

export default function TrainingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [selectedProgramForModal, setSelectedProgramForModal] = useState('Digital Marketing Training');
  const [selectedCert, setSelectedCert] = useState(null);
  const setCursorHovered = () => {};

  // Enrollment Form State
  const [enrollForm, setEnrollForm] = useState({
    name: '',
    phone: '',
    email: '',
    program: 'Digital Marketing Training',
    background: 'Student / Fresh Graduate',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleEnrollSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const waText = encodeURIComponent(
      `Hello GDAs Training Team!\n\nName: ${enrollForm.name}\nPhone: ${enrollForm.phone}\nEmail: ${enrollForm.email || 'N/A'}\nInterested Program: ${enrollForm.program}\nBackground: ${enrollForm.background}\nQuery/Note: ${enrollForm.message || 'I want to join GDAs Training.'}`
    );
    window.open(`https://wa.me/919939862765?text=${waText}`, '_blank');
    setTimeout(() => {
      setEnrollModalOpen(false);
      setFormSubmitted(false);
    }, 1800);
  };

  const openProgramModal = (programName) => {
    setSelectedProgramForModal(programName);
    setEnrollForm((prev) => ({ ...prev, program: programName }));
    setEnrollModalOpen(true);
  };

  // 8 GDAs Training Programs
  const trainingPrograms = [
    {
      id: 'dm-training',
      num: '01',
      title: 'Digital Marketing Training',
      tagline: 'Build strong fundamentals & comprehensive digital presence',
      desc: 'Learn the fundamentals of digital marketing and understand how businesses build their online presence.',
      topics: [
        'Digital Marketing Strategy',
        'Customer Journey',
        'Content Marketing',
        'Online Branding',
        'Marketing Fundamentals',
      ],
      icon: '📈',
      color: '#3b82f6',
      badge: 'Core Program',
    },
    {
      id: 'meta-ads-training',
      num: '02',
      title: 'Meta Ads Training',
      tagline: 'High-converting Facebook & Instagram campaign mastery',
      desc: 'Learn how to create and manage advertising campaigns on Facebook and Instagram.',
      topics: [
        'Meta Ads',
        'Facebook Ads',
        'Instagram Ads',
        'Audience Targeting',
        'Lead Generation',
        'Retargeting',
        'Campaign Optimization',
      ],
      icon: '🎯',
      color: '#60a5fa',
      badge: 'High In-Demand',
    },
    {
      id: 'google-ads-training',
      num: '03',
      title: 'Google Ads Training',
      tagline: 'Capture high-intent searchers at the exact moment of search',
      desc: 'Learn how businesses use Google Ads to reach customers who are actively searching for their products or services.',
      topics: [
        'Google Search Ads',
        'Keyword Research',
        'Campaign Setup',
        'Ad Copy',
        'Conversion Tracking',
        'Remarketing',
      ],
      icon: '🔍',
      color: '#f59e0b',
      badge: 'High Intent',
    },
    {
      id: 'seo-training',
      num: '04',
      title: 'SEO Training',
      tagline: 'Rank on top of Google & attract continuous organic traffic',
      desc: 'Learn how to improve website visibility and attract organic traffic from search engines.',
      topics: [
        'Keyword Research',
        'On-Page SEO',
        'Technical SEO',
        'Local SEO',
        'Google Business Profile',
        'SEO Optimization',
      ],
      icon: '🚀',
      color: '#10b981',
      badge: 'Organic Traffic',
    },
    {
      id: 'smm-training',
      num: '05',
      title: 'Social Media Marketing Training',
      tagline: 'Build authority, viral engagement & active community',
      desc: 'Learn how to build and manage a strong social media presence for businesses and brands.',
      topics: [
        'Social Media Strategy',
        'Content Planning',
        'Instagram Marketing',
        'Facebook Marketing',
        'Reels',
        'Engagement',
        'Social Media Management',
      ],
      icon: '📱',
      color: '#a855f7',
      badge: 'Brand Authority',
    },
    {
      id: 'lead-gen-training',
      num: '06',
      title: 'Lead Generation Training',
      tagline: 'Build predictable client & customer acquisition pipelines',
      desc: 'Learn how businesses generate and manage potential customers through digital channels.',
      topics: [
        'Lead Generation Strategy',
        'Meta Lead Ads',
        'Landing Pages',
        'Lead Funnels',
        'WhatsApp Leads',
        'Lead Management',
      ],
      icon: '⚡',
      color: '#ec4899',
      badge: 'Revenue Focus',
    },
    {
      id: 'ai-marketing-training',
      num: '07',
      title: 'AI-Powered Marketing Training',
      tagline: 'Accelerate content, SEO & workflows with modern AI tools',
      desc: 'Learn how AI tools can improve marketing, content creation, research and everyday business workflows.',
      topics: [
        'AI Tools',
        'AI Content Creation',
        'AI Marketing',
        'AI for SEO',
        'Marketing Automation',
        'Productivity Tools',
      ],
      icon: '🤖',
      color: '#06b6d4',
      badge: 'Next-Gen Tech',
    },
    {
      id: 'web-dev-training',
      num: '08',
      title: 'Website Development Training',
      tagline: 'Create fast, responsive & business-converting web platforms',
      desc: 'Learn how to create professional, responsive and business-focused websites.',
      topics: [
        'Web Design',
        'Website Development',
        'WordPress',
        'Landing Pages',
        'E-commerce',
        'Responsive Web Development',
        'Website Optimization',
      ],
      icon: '💻',
      color: '#f97316',
      badge: 'Full Stack Web',
    },
  ];

  // Trainers Data
  const trainers = [
    {
      name: 'Ram Gyan',
      title: 'Digital Marketing Trainer',
      role: 'Co-Founder & CEO, GDAs | Digital Marketing Professional Since 2019',
      image: '/ram_gyan_award.jpg',
      bio: 'Ram Gyan brings practical experience in Digital Marketing, Digital Advertising, Branding and Business Growth. He trains students in Digital Marketing, Meta Ads, Google Ads, SEO, Lead Generation, Performance Marketing, Social Media and AI Marketing.',
      credentials: [
        'PG (Post Graduate)',
        'PGDCA (Post Graduate Diploma in Computer Applications)',
        'Meta Ads Training — IIT Delhi (CEP)',
        'AI/ML Training — IIT Patna',
        'VSkills Certified Digital Marketing Master',
      ],
      badges: ['6+ Years Experience', 'IIT Delhi Alumni Workshop', 'IIT Patna AI/ML', 'Agency CEO'],
      certificates: [
        {
          title: 'IIT Delhi Meta Ads Mastery',
          image: '/cert_iit_delhi_meta_ads.jpg',
          institution: 'IIT Delhi (CEP Outreach)',
        },
        {
          title: 'VSkills Digital Marketing Master',
          image: '/cert_vskills_digital_vidya.jpg',
          institution: 'Digital Vidya / VSkills',
        },
        {
          title: 'Honorary Doctorate in Strategic Leadership',
          image: '/cert_doctorate_hawkins.jpg',
          institution: 'Hawkins University, USA',
        },
      ],
    },
    {
      name: 'Neeraj Kumar',
      title: 'Website Development Trainer',
      role: 'MCA | 5+ Years of Professional Experience',
      image: null,
      bio: 'Neeraj Kumar has 5+ years of professional experience in Website Development and helps learners understand how modern websites are designed, developed and optimized for real business requirements.',
      expertise: [
        'Website Development',
        'Web Design',
        'WordPress',
        'Landing Pages',
        'E-commerce',
        'Responsive Web Development',
        'Modern Web Technologies',
      ],
      badges: ['MCA Degree', '5+ Years Dev Experience', 'E-Commerce & WordPress Specialist', 'Full-Stack Architecture'],
    },
  ];

  // 4 Practical Learning Pillars
  const practicalPillars = [
    {
      title: 'Hands-On Practice',
      desc: 'Apply what you learn through practical sessions and live campaign setup.',
      icon: '🛠️',
      color: '#3b82f6',
    },
    {
      title: 'Real-World Projects',
      desc: 'Work on projects based on genuine business requirements and real client briefs.',
      icon: '📊',
      color: '#10b981',
    },
    {
      title: 'Industry Tools',
      desc: 'Master the exact tools used in modern Digital Marketing and Website Development.',
      icon: '⚙️',
      color: '#f59e0b',
    },
    {
      title: 'Professional Guidance',
      desc: 'Learn directly from experienced industry professionals who manage live accounts.',
      icon: '👨‍🏫',
      color: '#a855f7',
    },
  ];

  // Why Choose GDAs Training
  const whyChooseReasons = [
    {
      num: '01',
      title: 'Industry-Focused Learning',
      desc: 'Learn skills that are relevant to today’s fast-moving digital industry with zero outdated theory.',
      icon: '🎯',
    },
    {
      num: '02',
      title: 'Experienced Trainers',
      desc: 'Learn from seasoned professionals actively leading Digital Marketing and Website Development projects.',
      icon: '⭐',
    },
    {
      num: '03',
      title: 'Practical Approach',
      desc: 'Focus on hands-on project creation, ad account setups, and real-world business applications.',
      icon: '💡',
    },
    {
      num: '04',
      title: 'Marketing + Technology',
      desc: 'Build hybrid skills across Digital Marketing, AI Automation, and modern Website Development.',
      icon: '🔗',
    },
  ];

  // Target Audiences
  const targetAudiences = [
    { title: 'Students', desc: 'Build job-ready digital skills and build strong portfolios before graduating.', icon: '🎓' },
    { title: 'Freshers', desc: 'Gain live practical exposure to stand out in high-paying digital marketing interviews.', icon: '🚀' },
    { title: 'Job Seekers', desc: 'Upgrade your resume with in-demand Performance Marketing, SEO & Web skills.', icon: '💼' },
    { title: 'Freelancers', desc: 'Master client acquisition, high-converting ad setups, and scale your client retainers.', icon: '🌐' },
    { title: 'Business Owners', desc: 'Understand digital channels to generate your own leads and stop depending on outside agencies.', icon: '🏢' },
    { title: 'Working Professionals', desc: 'Upskill with AI-powered marketing tools and advance into leadership roles.', icon: '📈' },
    { title: 'Entrepreneurs', desc: 'Launch and scale your startup with end-to-end digital branding and high-intent ads.', icon: '⚡' },
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
            style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: '#fff' }}
          >
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '9px',
                background: '#0d3899',
                border: '1px solid rgba(59, 130, 246, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(37, 99, 235, 0.4)',
              }}
            >
              <img
                src="/gda_logo.png"
                alt="GDAs Logo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
            <span style={{ fontWeight: 800, fontSize: '18px', letterSpacing: '-0.02em', color: '#ffffff' }}>
              GDAs
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '26px' }} className="desktop-nav">
            <Link
              href="/"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              style={{ fontSize: '13.5px', fontWeight: 500, color: '#a3a3a3', textDecoration: 'none' }}
            >
              Home
            </Link>
            <Link
              href="/about"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              style={{ fontSize: '13.5px', fontWeight: 500, color: '#a3a3a3', textDecoration: 'none' }}
            >
              About
            </Link>
            <Link
              href="/services"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              style={{ fontSize: '13.5px', fontWeight: 500, color: '#a3a3a3', textDecoration: 'none' }}
            >
              Services
            </Link>
            <Link
              href="/training"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              style={{ fontSize: '13.5px', fontWeight: 700, color: '#3b82f6', textDecoration: 'none' }}
            >
              Training
            </Link>
          </nav>

          {/* Right Action */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              onClick={() => openProgramModal('General Training Enrollment')}
              className="btn btn-primary"
              style={{ padding: '8px 18px', fontSize: '12.5px', fontWeight: 700 }}
            >
              Join GDAs Training →
            </motion.button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-hamburger"
              aria-label="Toggle Menu"
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                padding: '6px',
              }}
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
                background: 'rgba(10, 10, 10, 0.96)',
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
              <Link href="/services" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>Services</Link>
              <Link href="/training" onClick={() => setMobileMenuOpen(false)} style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '15px', fontWeight: 700 }}>Training</Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openProgramModal('General Training Enrollment');
                }}
                className="btn btn-primary"
                style={{ width: '100%', padding: '10px' }}
              >
                Join GDAs Training →
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION */}
      {/* ========================================================================= */}
      <section style={{ paddingTop: '160px', paddingBottom: '70px', position: 'relative' }}>
        <div className="container-custom" style={{ textAlign: 'center' }}>
          
          {/* Eyebrow badge */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={blurFadeIn}
            custom={0}
            style={{ display: 'inline-flex', marginBottom: '20px' }}
          >
            <div className="pill-badge pill-badge-blue">
              <span className="pulse-dot" />
              <span style={{ letterSpacing: '0.08em', fontWeight: 800 }}>GANESHA DIGITAL ADS • GDAs TRAINING</span>
            </div>
          </motion.div>

          {/* Main Hero Heading */}
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={blurFadeIn}
            custom={1}
            style={{
              fontSize: 'clamp(36px, 5.8vw, 68px)',
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: '-0.035em',
              maxWidth: '960px',
              margin: '0 auto 16px auto',
            }}
          >
            Learn Digital. Build Skills.{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #93c5fd 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Grow Your Career.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={blurFadeIn}
            custom={2}
            style={{
              fontSize: 'clamp(18px, 2.4vw, 24px)',
              fontWeight: 700,
              color: '#f59e0b',
              letterSpacing: '-0.01em',
              maxWidth: '820px',
              margin: '0 auto 20px auto',
            }}
          >
            Practical Digital Marketing & Website Development Training
          </motion.h2>

          {/* Description */}
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={blurFadeIn}
            custom={3}
            style={{
              fontSize: 'clamp(15px, 1.7vw, 18px)',
              color: '#d1d5db',
              maxWidth: '780px',
              margin: '0 auto 28px auto',
              lineHeight: 1.65,
            }}
          >
            Learn the skills businesses need to grow online — from{' '}
            <strong style={{ color: '#fff' }}>
              Digital Marketing and Performance Marketing to SEO, Social Media, AI and Website Development.
            </strong>
          </motion.p>

          {/* Core Mantra Pills */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={blurFadeIn}
            custom={4}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              flexWrap: 'wrap',
              padding: '10px 24px',
              borderRadius: '9999px',
              background: 'rgba(59, 130, 246, 0.08)',
              border: '1px solid rgba(59, 130, 246, 0.25)',
              marginBottom: '36px',
            }}
          >
            {['Learn', 'Practice', 'Build', 'Grow'].map((word, idx) => (
              <React.Fragment key={word}>
                <span style={{ fontSize: '15px', fontWeight: 800, color: '#60a5fa', letterSpacing: '0.05em' }}>
                  {word}
                </span>
                {idx < 3 && <span style={{ color: '#f59e0b', fontSize: '14px' }}>•</span>}
              </React.Fragment>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={blurFadeIn}
            custom={5}
            style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(37, 99, 235, 0.6)' }}
              whileTap={{ scale: 0.96 }}
              onClick={() => openProgramModal('GDAs Complete Master Training')}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              className="btn btn-primary"
              style={{ padding: '15px 34px', fontSize: '15px', fontWeight: 800 }}
            >
              Join GDAs Training →
            </motion.button>
            <a
              href="#programs"
              className="btn btn-secondary"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              style={{ padding: '15px 30px', fontSize: '15px' }}
            >
              Explore 8 Programs ↓
            </a>
          </motion.div>

          {/* Quick Metrics / Highlights Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={blurFadeIn}
            custom={6}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
              marginTop: '55px',
            }}
          >
            {[
              { title: 'Hands-On Practice', desc: 'Real campaigns, not theoretical lectures', icon: '🛠️' },
              { title: 'Expert Trainers', desc: 'Direct mentorship from active industry CEOs', icon: '👨‍🏫' },
              { title: '8 In-Demand Programs', desc: 'From Meta & Google Ads to AI & Web Dev', icon: '🚀' },
              { title: 'Zero Prerequisites', desc: 'No technical coding background required', icon: '✨' },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: '20px 18px',
                  textAlign: 'left',
                  transition: 'all 0.3s ease',
                }}
              >
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{item.icon}</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>{item.title}</div>
                <div style={{ fontSize: '12.5px', color: '#9ca3af' }}>{item.desc}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. OUR TRAINING PROGRAMS (8 Comprehensive Cards) */}
      {/* ========================================================================= */}
      <section id="programs" className="section-spacing" style={{ background: '#050505', position: 'relative' }}>
        <div className="container-custom">
          
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 50px auto' }}>
            <div className="section-tag">Our Training Programs</div>
            <h2
              style={{
                fontSize: 'clamp(28px, 4.2vw, 48px)',
                fontWeight: 900,
                letterSpacing: '-0.025em',
                lineHeight: 1.15,
              }}
            >
              8 Industry-Focused <span style={{ color: '#3b82f6' }}>Training Programs</span>.
            </h2>
            <p style={{ fontSize: '15.5px', color: '#a3a3a3', marginTop: '12px', lineHeight: 1.6 }}>
              Master modern digital tools, performance ad channels, search visibility, AI workflows, and responsive website development.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {trainingPrograms.map((program, idx) => (
              <motion.div
                key={program.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={blurFadeIn}
                custom={idx * 0.5}
                whileHover={{ y: -6, borderColor: 'rgba(59, 130, 246, 0.5)' }}
                style={{
                  background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 100%)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '22px',
                  padding: '32px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Top Number & Badge */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '10px',
                          background: 'rgba(59, 130, 246, 0.12)',
                          border: '1px solid rgba(59, 130, 246, 0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '20px',
                        }}
                      >
                        {program.icon}
                      </span>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#3b82f6', letterSpacing: '1px' }}>
                        PROGRAM {program.num}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        padding: '4px 10px',
                        borderRadius: '999px',
                        color: '#f59e0b',
                      }}
                    >
                      {program.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 style={{ fontSize: '21px', fontWeight: 800, color: '#fff', marginBottom: '8px', lineHeight: 1.25 }}>
                    {program.title}
                  </h3>

                  {/* Tagline */}
                  <div style={{ fontSize: '13px', color: '#93c5fd', fontWeight: 600, marginBottom: '14px' }}>
                    {program.tagline}
                  </div>

                  {/* Main Paragraph */}
                  <p style={{ fontSize: '14px', color: '#a3a3a3', lineHeight: 1.55, marginBottom: '20px' }}>
                    {program.desc}
                  </p>

                  {/* Module Topics / Keywords Badge Cloud */}
                  <div style={{ marginBottom: '10px' }}>
                    <div style={{ fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#6b7280', marginBottom: '10px' }}>
                      Key Focus Areas:
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {program.topics.map((topic, tIdx) => (
                        <span
                          key={tIdx}
                          style={{
                            fontSize: '12px',
                            fontWeight: 600,
                            background: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            color: '#e5e7eb',
                          }}
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Card Action */}
                <div
                  style={{
                    marginTop: '28px',
                    paddingTop: '18px',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <button
                    onClick={() => openProgramModal(program.title)}
                    onMouseEnter={() => setCursorHovered(true)}
                    onMouseLeave={() => setCursorHovered(false)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#3b82f6',
                      fontSize: '13.5px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: 0,
                    }}
                  >
                    Enroll in {program.title.replace(' Training', '')} →
                  </button>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>100% Practical</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. MEET YOUR TRAINERS */}
      {/* ========================================================================= */}
      <section className="section-spacing" style={{ position: 'relative' }}>
        <div className="container-custom">
          
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 55px auto' }}>
            <div className="section-tag">Faculty & Mentors</div>
            <h2
              style={{
                fontSize: 'clamp(28px, 4.2vw, 48px)',
                fontWeight: 900,
                letterSpacing: '-0.025em',
                lineHeight: 1.15,
              }}
            >
              Meet Your <span style={{ color: '#3b82f6' }}>Trainers</span>.
            </h2>
            <p style={{ fontSize: '15.5px', color: '#a3a3a3', marginTop: '12px', lineHeight: 1.6 }}>
              Learn directly from active industry practitioners and founders with verifiable experience.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '30px',
            }}
          >
            {/* Trainer 1: Ram Gyan */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={blurFadeIn}
              custom={0}
              style={{
                background: 'linear-gradient(135deg, #0d1322 0%, #080c14 100%)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '26px',
                padding: '36px 30px',
                boxShadow: '0 20px 45px rgba(0,0,0,0.7)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* Trainer Header with Photo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '22px' }}>
                  <div
                    style={{
                      width: '88px',
                      height: '88px',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      border: '2px solid rgba(59, 130, 246, 0.5)',
                      boxShadow: '0 6px 20px rgba(37, 99, 235, 0.4)',
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src="/ram_gyan_award.jpg"
                      alt="Ram Gyan - Digital Marketing Trainer"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  <div>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: '#60a5fa',
                        background: 'rgba(59, 130, 246, 0.12)',
                        padding: '3px 10px',
                        borderRadius: '999px',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                      }}
                    >
                      Digital Marketing Trainer
                    </span>
                    <h3 style={{ fontSize: '26px', fontWeight: 900, color: '#fff', marginTop: '6px', marginBottom: '4px' }}>
                      Ram Gyan
                    </h3>
                    <div style={{ fontSize: '12.5px', color: '#f59e0b', fontWeight: 700 }}>
                      Co-Founder & CEO, GDAs | Professional Since 2019
                    </div>
                  </div>
                </div>

                {/* Trainer Bio */}
                <p style={{ fontSize: '14.5px', color: '#d1d5db', lineHeight: 1.65, marginBottom: '20px' }}>
                  Ram Gyan brings practical experience in{' '}
                  <strong style={{ color: '#fff' }}>Digital Marketing, Digital Advertising, Branding and Business Growth.</strong>
                </p>
                <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: 1.6, marginBottom: '24px' }}>
                  He trains students in{' '}
                  <strong style={{ color: '#60a5fa' }}>
                    Digital Marketing, Meta Ads, Google Ads, SEO, Lead Generation, Performance Marketing, Social Media and AI Marketing.
                  </strong>
                </p>

                {/* Verified Credentials */}
                <div style={{ marginBottom: '22px' }}>
                  <div style={{ fontSize: '11.5px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#f59e0b', marginBottom: '10px' }}>
                    Verified Credentials:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                      'PG (Post Graduate)',
                      'PGDCA (Post Graduate Diploma in Computer Applications)',
                      'Meta Ads Training — IIT Delhi (CEP)',
                      'AI/ML Training — IIT Patna',
                      'VSkills Certified Digital Marketing Master',
                    ].map((cred, cIdx) => (
                      <div
                        key={cIdx}
                        style={{
                          fontSize: '12.5px',
                          color: '#e5e7eb',
                          background: 'rgba(255,255,255,0.04)',
                          padding: '7px 12px',
                          borderRadius: '8px',
                          border: '1px solid rgba(255,255,255,0.06)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        <span style={{ color: '#10b981', fontWeight: 900 }}>✓</span>
                        <span>{cred}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certificates Lightbox Clickables */}
                <div style={{ marginBottom: '15px' }}>
                  <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#9ca3af', marginBottom: '8px' }}>
                    Click to view Verified Certificates:
                  </div>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {[
                      { title: 'IIT Delhi Certificate', img: '/cert_iit_delhi_meta_ads.jpg' },
                      { title: 'VSkills Master Certificate', img: '/cert_vskills_digital_vidya.jpg' },
                      { title: 'Honorary Doctorate', img: '/cert_doctorate_hawkins.jpg' },
                    ].map((c, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedCert(c.img)}
                        onMouseEnter={() => setCursorHovered(true)}
                        onMouseLeave={() => setCursorHovered(false)}
                        style={{
                          background: 'rgba(59, 130, 246, 0.1)',
                          border: '1px solid rgba(59, 130, 246, 0.3)',
                          color: '#93c5fd',
                          padding: '5px 10px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        📜 {c.title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <button
                  onClick={() => openProgramModal('Marketing Mentorship with Ram Gyan')}
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '12px', fontSize: '13.5px', fontWeight: 700 }}
                >
                  Learn with Ram Gyan →
                </button>
              </div>
            </motion.div>

            {/* Trainer 2: Neeraj Kumar */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={blurFadeIn}
              custom={1}
              style={{
                background: 'linear-gradient(135deg, #11140e 0%, #0a0e08 100%)',
                border: '1px solid rgba(249, 115, 22, 0.3)',
                borderRadius: '26px',
                padding: '36px 30px',
                boxShadow: '0 20px 45px rgba(0,0,0,0.7)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* Trainer Header with Icon Avatar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '22px' }}>
                  <div
                    style={{
                      width: '88px',
                      height: '88px',
                      borderRadius: '20px',
                      background: 'linear-gradient(135deg, #f97316 0%, #c2410c 100%)',
                      border: '2px solid rgba(249, 115, 22, 0.5)',
                      boxShadow: '0 6px 20px rgba(249, 115, 22, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '36px',
                      flexShrink: 0,
                    }}
                  >
                    💻
                  </div>

                  <div>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: '#fb923c',
                        background: 'rgba(249, 115, 22, 0.12)',
                        padding: '3px 10px',
                        borderRadius: '999px',
                        border: '1px solid rgba(249, 115, 22, 0.3)',
                      }}
                    >
                      Website Development Trainer
                    </span>
                    <h3 style={{ fontSize: '26px', fontWeight: 900, color: '#fff', marginTop: '6px', marginBottom: '4px' }}>
                      Neeraj Kumar
                    </h3>
                    <div style={{ fontSize: '12.5px', color: '#fb923c', fontWeight: 700 }}>
                      MCA | 5+ Years of Professional Experience
                    </div>
                  </div>
                </div>

                {/* Trainer Bio */}
                <p style={{ fontSize: '14.5px', color: '#d1d5db', lineHeight: 1.65, marginBottom: '20px' }}>
                  Neeraj Kumar has <strong style={{ color: '#fff' }}>5+ years of professional experience</strong> in Website Development and helps learners understand how modern websites are designed, developed and optimized for real business requirements.
                </p>

                {/* Expertise Badges */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '11.5px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#fb923c', marginBottom: '12px' }}>
                    Core Expertise:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {[
                      'Website Development',
                      'Web Design',
                      'WordPress',
                      'Landing Pages',
                      'E-commerce',
                      'Responsive Web Development',
                      'Modern Web Technologies',
                    ].map((exp, eIdx) => (
                      <span
                        key={eIdx}
                        style={{
                          fontSize: '12.5px',
                          fontWeight: 600,
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(249, 115, 22, 0.25)',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          color: '#ffedd5',
                        }}
                      >
                        ⚡ {exp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights List */}
                <div style={{ marginBottom: '15px' }}>
                  <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#9ca3af', marginBottom: '8px' }}>
                    Teaching Highlights:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                      'Step-by-step guidance for beginners with zero prior coding',
                      'Live deployment of e-commerce stores & custom landing pages',
                      'Conversion rate optimization and ultra-fast page speeds',
                    ].map((item, i) => (
                      <div key={i} style={{ fontSize: '12.5px', color: '#cbd5e1', display: 'flex', gap: '8px' }}>
                        <span style={{ color: '#f97316' }}>•</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <button
                  onClick={() => openProgramModal('Web Dev Mentorship with Neeraj Kumar')}
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                  className="btn"
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                  }}
                >
                  Learn with Neeraj Kumar →
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. PRACTICAL LEARNING (Learn by Doing, Not Just Watching) */}
      {/* ========================================================================= */}
      <section className="section-spacing" style={{ background: '#050505' }}>
        <div className="container-custom">
          
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 50px auto' }}>
            <div className="section-tag">Practical Learning</div>
            <h2
              style={{
                fontSize: 'clamp(28px, 4.2vw, 48px)',
                fontWeight: 900,
                letterSpacing: '-0.025em',
                lineHeight: 1.15,
              }}
            >
              Learn by Doing, <span style={{ color: '#3b82f6' }}>Not Just Watching</span>.
            </h2>
            <p style={{ fontSize: '15.5px', color: '#a3a3a3', marginTop: '12px', lineHeight: 1.6 }}>
              Our training focuses on practical knowledge, hands-on learning and real-world applications.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px',
            }}
          >
            {practicalPillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={blurFadeIn}
                custom={idx}
                whileHover={{ y: -5 }}
                style={{
                  background: '#0a0a0a',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '20px',
                  padding: '30px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                  }}
                >
                  {pillar.icon}
                </div>

                <h3 style={{ fontSize: '19px', fontWeight: 800, color: '#fff' }}>
                  {pillar.title}
                </h3>

                <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: 1.6 }}>
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. WHY CHOOSE GDAS TRAINING? */}
      {/* ========================================================================= */}
      <section className="section-spacing">
        <div className="container-custom">
          
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 50px auto' }}>
            <div className="section-tag">The GDAs Advantage</div>
            <h2
              style={{
                fontSize: 'clamp(28px, 4.2vw, 48px)',
                fontWeight: 900,
                letterSpacing: '-0.025em',
                lineHeight: 1.15,
              }}
            >
              Why Choose <span style={{ color: '#3b82f6' }}>GDAs Training</span>?
            </h2>
            <p style={{ fontSize: '15.5px', color: '#a3a3a3', marginTop: '12px' }}>
              We combine modern agency strategy with practical execution so you graduate truly job-ready.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '22px',
            }}
          >
            {whyChooseReasons.map((reason, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={blurFadeIn}
                custom={idx}
                style={{
                  background: 'linear-gradient(135deg, #0c0c0c 0%, #141414 100%)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '20px',
                  padding: '30px 24px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <span style={{ fontSize: '26px' }}>{reason.icon}</span>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#3b82f6' }}>0{idx + 1}</span>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>
                  {reason.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: 1.6 }}>
                  {reason.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. WHO CAN JOIN? */}
      {/* ========================================================================= */}
      <section className="section-spacing" style={{ background: '#050505' }}>
        <div className="container-custom">
          
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 40px auto' }}>
            <div className="section-tag">Who Can Join?</div>
            <h2
              style={{
                fontSize: 'clamp(28px, 4.2vw, 48px)',
                fontWeight: 900,
                letterSpacing: '-0.025em',
                lineHeight: 1.15,
              }}
            >
              Designed for <span style={{ color: '#3b82f6' }}>Every Digital Aspirant</span>.
            </h2>
            <p style={{ fontSize: '15.5px', color: '#a3a3a3', marginTop: '12px' }}>
              Whether you are taking your first steps or upgrading your career, GDAs Training is built for you.
            </p>
          </div>

          {/* Key Callout Banner */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={blurFadeIn}
            style={{
              maxWidth: '680px',
              margin: '0 auto 40px auto',
              textAlign: 'center',
              background: 'rgba(59, 130, 246, 0.08)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '16px',
              padding: '16px 24px',
            }}
          >
            <div style={{ fontSize: '17px', fontWeight: 800, color: '#f59e0b' }}>
              ✨ No Advanced Technical Background Required.
            </div>
            <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '4px' }}>
              We start from foundational principles and guide you through real tools step-by-step.
            </div>
          </motion.div>

          {/* Audience Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
            }}
          >
            {targetAudiences.map((aud, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={blurFadeIn}
                custom={idx * 0.4}
                style={{
                  background: '#0a0a0a',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '16px',
                  padding: '22px 18px',
                  textAlign: 'left',
                }}
              >
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{aud.icon}</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
                  {aud.title}
                </div>
                <div style={{ fontSize: '12.5px', color: '#9ca3af', lineHeight: 1.5 }}>
                  {aud.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. START YOUR DIGITAL JOURNEY (Final CTA Banner) */}
      {/* ========================================================================= */}
      <section className="section-spacing" style={{ paddingTop: '50px', paddingBottom: '90px' }}>
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={blurFadeIn}
            style={{
              borderRadius: '28px',
              padding: 'clamp(40px, 6vw, 75px) clamp(24px, 4vw, 55px)',
              background: 'linear-gradient(135deg, #091224 0%, #0d1b38 50%, #172a54 100%)',
              border: '1px solid rgba(59, 130, 246, 0.4)',
              boxShadow: '0 0 60px rgba(37, 99, 235, 0.25)',
              position: 'relative',
              overflow: 'hidden',
              textAlign: 'center',
            }}
          >
            <div style={{ maxWidth: '820px', margin: '0 auto' }}>
              
              <div className="pill-badge pill-badge-blue" style={{ marginBottom: '18px' }}>
                <span className="pulse-dot" />
                <span style={{ fontWeight: 800 }}>START YOUR DIGITAL JOURNEY</span>
              </div>

              <h2
                style={{
                  fontSize: 'clamp(32px, 4.8vw, 54px)',
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  color: '#fff',
                  marginBottom: '16px',
                }}
              >
                Build Skills.{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #60a5fa 0%, #93c5fd 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Create Opportunities.
                </span>
              </h2>

              <p
                style={{
                  fontSize: 'clamp(15px, 1.8vw, 17px)',
                  color: '#cbd5e1',
                  lineHeight: 1.65,
                  maxWidth: '740px',
                  margin: '0 auto 26px auto',
                }}
              >
                Whether you want to start a career, become a freelancer, grow your business or upgrade your digital skills, GDAs Training helps you build practical digital skills.
              </p>

              {/* Skills Strip */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                  flexWrap: 'wrap',
                  marginBottom: '32px',
                  fontSize: '13px',
                  color: '#93c5fd',
                  fontWeight: 600,
                }}
              >
                <span>Digital Marketing</span>
                <span>•</span>
                <span>Meta Ads</span>
                <span>•</span>
                <span>Google Ads</span>
                <span>•</span>
                <span>SEO</span>
                <span>•</span>
                <span>Social Media</span>
                <span>•</span>
                <span>AI</span>
                <span>•</span>
                <span>Website Development</span>
              </div>

              {/* Action Button */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(37, 99, 235, 0.7)' }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => openProgramModal('Start Digital Journey')}
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                  className="btn btn-primary"
                  style={{ padding: '16px 40px', fontSize: '16px', fontWeight: 800 }}
                >
                  Join GDAs Training →
                </motion.button>
                <a
                  href="https://wa.me/919939862765?text=Hello%20GDAs%20Training!%20I%20want%20to%20know%20more%20about%20your%20training%20programs."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                  style={{ padding: '16px 30px', fontSize: '15px' }}
                >
                  Chat on WhatsApp 💬
                </a>
              </div>

              {/* Bottom Tagline */}
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#f59e0b', letterSpacing: '0.04em' }}>
                Learn Digital. Build Skills. Grow Your Future.
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. CERTIFICATE LIGHTBOX MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.88)',
              backdropFilter: 'blur(12px)',
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                maxWidth: '850px',
                width: '100%',
                maxHeight: '90vh',
                backgroundColor: '#0a0a0a',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.15)',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0,0,0,0.9)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  background: '#111',
                }}
              >
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>
                  Verified Certificate / Credential Preview
                </span>
                <button
                  onClick={() => setSelectedCert(null)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#fff',
                    fontSize: '20px',
                    cursor: 'pointer',
                    padding: '4px 8px',
                  }}
                >
                  ✕
                </button>
              </div>
              <div style={{ padding: '16px', overflowY: 'auto', textAlign: 'center' }}>
                <img
                  src={selectedCert}
                  alt="Verified Certificate"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '75vh',
                    objectFit: 'contain',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 10. ENROLLMENT / INQUIRY MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {enrollModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setEnrollModalOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(10px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '520px',
                background: 'linear-gradient(135deg, #0d121f 0%, #070a12 100%)',
                border: '1px solid rgba(59, 130, 246, 0.4)',
                borderRadius: '24px',
                padding: '36px 30px',
                boxShadow: '0 25px 50px rgba(0,0,0,0.8)',
                position: 'relative',
              }}
            >
              <button
                onClick={() => setEnrollModalOpen(false)}
                style={{
                  position: 'absolute',
                  top: '18px',
                  right: '18px',
                  background: 'none',
                  border: 'none',
                  color: '#9ca3af',
                  fontSize: '20px',
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>

              <div style={{ textAlign: 'center', marginBottom: '22px' }}>
                <div className="pill-badge pill-badge-blue" style={{ marginBottom: '10px' }}>
                  <span className="pulse-dot" />
                  <span>GDAs Practical Training</span>
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#fff' }}>
                  Join GDAs Training
                </h3>
                <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '4px' }}>
                  Selected: <strong style={{ color: '#60a5fa' }}>{selectedProgramForModal}</strong>
                </p>
              </div>

              {formSubmitted ? (
                <div style={{ textAlign: 'center', padding: '30px 0' }}>
                  <div style={{ fontSize: '42px', marginBottom: '12px' }}>✅</div>
                  <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#fff' }}>
                    Redirecting to WhatsApp...
                  </h4>
                  <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '6px' }}>
                    Connecting you directly with the GDAs training coordinator.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEnrollSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#d1d5db', marginBottom: '6px' }}>
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={enrollForm.name}
                      onChange={(e) => setEnrollForm({ ...enrollForm, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        borderRadius: '10px',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        color: '#fff',
                        fontSize: '14px',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#d1d5db', marginBottom: '6px' }}>
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={enrollForm.phone}
                      onChange={(e) => setEnrollForm({ ...enrollForm, phone: e.target.value })}
                      placeholder="e.g. +91 99398 62765"
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        borderRadius: '10px',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        color: '#fff',
                        fontSize: '14px',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#d1d5db', marginBottom: '6px' }}>
                      Program of Interest
                    </label>
                    <select
                      value={enrollForm.program}
                      onChange={(e) => setEnrollForm({ ...enrollForm, program: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        borderRadius: '10px',
                        background: '#111827',
                        border: '1px solid rgba(255,255,255,0.12)',
                        color: '#fff',
                        fontSize: '14px',
                        outline: 'none',
                      }}
                    >
                      {trainingPrograms.map((p) => (
                        <option key={p.id} value={p.title}>
                          {p.title}
                        </option>
                      ))}
                      <option value="Complete Master Training (All-in-One)">Complete Master Training (All-in-One)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#d1d5db', marginBottom: '6px' }}>
                      Your Current Background
                    </label>
                    <select
                      value={enrollForm.background}
                      onChange={(e) => setEnrollForm({ ...enrollForm, background: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        borderRadius: '10px',
                        background: '#111827',
                        border: '1px solid rgba(255,255,255,0.12)',
                        color: '#fff',
                        fontSize: '14px',
                        outline: 'none',
                      }}
                    >
                      <option value="Student / College">Student / College</option>
                      <option value="Fresh Graduate / Job Seeker">Fresh Graduate / Job Seeker</option>
                      <option value="Freelancer / Consultant">Freelancer / Consultant</option>
                      <option value="Business Owner / Founder">Business Owner / Founder</option>
                      <option value="Working Professional">Working Professional</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#d1d5db', marginBottom: '6px' }}>
                      Any Specific Goal / Query? (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={enrollForm.message}
                      onChange={(e) => setEnrollForm({ ...enrollForm, message: e.target.value })}
                      placeholder="e.g. Want to learn Meta ads for my business / Looking for placement assistance."
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        color: '#fff',
                        fontSize: '13px',
                        outline: 'none',
                        resize: 'none',
                      }}
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '13px', fontSize: '15px', fontWeight: 800, marginTop: '8px' }}
                  >
                    Submit & Connect on WhatsApp →
                  </motion.button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 11. COMPREHENSIVE FOOTER */}
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
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: '#fff' }}>
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '8px',
                  background: '#0d3899',
                  border: '1px solid rgba(59, 130, 246, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(37, 99, 235, 0.3)',
                }}
              >
                <img
                  src="/gda_logo.png"
                  alt="GDAs Logo"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
              <span style={{ fontWeight: 800, fontSize: '16px' }}>GDAs</span>
            </Link>

            <div style={{ display: 'flex', gap: '22px', fontSize: '13.5px', flexWrap: 'wrap' }}>
              <Link href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>Home</Link>
              <Link href="/about" style={{ color: '#9ca3af', textDecoration: 'none' }}>About</Link>
              <Link href="/services" style={{ color: '#9ca3af', textDecoration: 'none' }}>Services</Link>
              <Link href="/training" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 700 }}>Training</Link>
              <a
                href="https://wa.me/919939862765"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#9ca3af', textDecoration: 'none' }}
              >
                WhatsApp (9939862765)
              </a>
            </div>
          </div>

          <div
            style={{
              paddingTop: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              fontSize: '12.5px',
              color: '#6b7280',
            }}
          >
            <div>
              © {new Date().getFullYear()} Ganesha Digital Ads (GDAs). All rights reserved.
            </div>
            <div style={{ color: '#9ca3af' }}>
              <span style={{ color: '#f59e0b' }}>Digital Ka Saath, Aapke Business Ka Vikas.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
