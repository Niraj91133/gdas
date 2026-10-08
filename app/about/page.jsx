'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const setCursorHovered = () => {};

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Digital Marketing',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const waText = encodeURIComponent(
      `Hello GDAs Team!\n\nName: ${formData.name}\nPhone: ${formData.phone}\nService: ${formData.service}\nDetails: ${formData.message || 'I want to know more about GDAs and scale my business.'}`
    );
    window.open(`https://wa.me/919939862765?text=${waText}`, '_blank');
  };

  // Certificates & Awards Data
  const certificatesAndAwards = [
    {
      id: 'doc',
      title: 'Honorary Doctorate Award',
      institution: 'Hawkins University, Texas, USA',
      year: '2026',
      badge: 'Doctorate in Strategic Leadership & Digital Marketing',
      certNo: 'HU2026476096',
      image: '/cert_doctorate_hawkins.jpg',
      desc: 'Conferred in Strategic Leadership & Professional Excellence in Digital Marketing by Hawkins University Board of Trustees.',
    },
    {
      id: 'award',
      title: 'Bharat Visionary Leader Award 2026',
      institution: 'National Startup Conclave Season Awards (BNB)',
      year: '2026',
      badge: 'National Visionary Recognition',
      certNo: 'BNB-2026-LEADER',
      image: '/ram_gyan_award.jpg',
      desc: 'Felicitated for groundbreaking contributions to the Indian digital advertising ecosystem and empowering SME growth.',
    },
    {
      id: 'iit',
      title: 'Meta & Instagram Ads Mastery',
      institution: 'IIT Delhi (Academic Outreach & World Technocon)',
      year: '2025',
      badge: 'IIT Delhi Certified',
      certNo: 'DT2Q76HP3T2C232',
      image: '/cert_iit_delhi_meta_ads.jpg',
      desc: 'Completed on-campus specialized workshop program on Digital Marketing Mastery with Instagram & Facebook Ads at IIT Delhi.',
    },
    {
      id: 'vskills',
      title: 'Vskills Certified Digital Marketing Master',
      institution: 'Digital Vidya & Govt. of India Enterprise Venture',
      year: '2019',
      badge: 'Master Level Certified',
      certNo: '1170ZXA190100615 / Code 39695',
      image: '/cert_vskills_digital_vidya.jpg',
      desc: 'Certified as Digital Marketing Master through comprehensive professional examination and industry coursework.',
    },
  ];

  // Comparison Matrix Data
  const comparisonRows = [
    {
      pillar: 'Strategy',
      gdas: 'Business & growth-focused strategy tailored to unique unit economics',
      traditional: 'Mostly task-focused and transactional checklist execution',
    },
    {
      pillar: 'Performance',
      gdas: 'Direct focus on qualified leads, conversions, and scalable revenue growth',
      traditional: 'Focus often limited to vanity deliverables, clicks or impressions',
    },
    {
      pillar: 'Marketing',
      gdas: 'Omnichannel mastery: Meta Ads, Google Ads, YouTube, SEO & local rank',
      traditional: 'Often limited to selected basic channels without holistic sync',
    },
    {
      pillar: 'Branding',
      gdas: 'Branding + Marketing integrated together for maximum conversion pull',
      traditional: 'Branding often handled separately by disconnected designers',
    },
    {
      pillar: 'Technology',
      gdas: 'Custom high-speed websites, Next.js tech, CAPI & WhatsApp AI automation',
      traditional: 'Usually limited to generic templates without conversion optimization',
    },
    {
      pillar: 'Creative',
      gdas: 'Strategy-led creative solutions, psychological hooks & viral content',
      traditional: 'Mainly plain aesthetic design without direct response focus',
    },
    {
      pillar: 'Scalability',
      gdas: 'Full-stack ecosystem built to seamlessly scale with your business',
      traditional: 'Often constrained by bandwidth and rigid single-skill resources',
    },
    {
      pillar: 'Partnership',
      gdas: 'Long-term dedicated digital growth partner invested in your win',
      traditional: 'Mostly short-term project vendor or transactional billing',
    },
  ];

  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#000000', color: '#ffffff', overflowX: 'hidden' }}>
      {/* Top Ambient Glow */}
      <div className="bg-ambient-top" />

      {/* ========================================================================= */}
      {/* FLOATING NAVBAR (GDAs Without Dot) */}
      {/* ========================================================================= */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
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
          <Link
            href="/"
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
              }}
            >
              <img src="/gda_logo.png" alt="GDAs Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <span style={{ fontWeight: 800, fontSize: '19px', color: '#ffffff', letterSpacing: '-0.02em' }}>
              GDAs
            </span>
          </Link>

          <nav style={{ display: 'flex', alignItems: 'center', gap: '26px' }} className="desktop-nav">
            <Link href="/" style={{ fontSize: '13.5px', fontWeight: 500, color: '#a3a3a3', textDecoration: 'none' }}>Home</Link>
            <Link href="/about" style={{ fontSize: '13.5px', fontWeight: 600, color: '#3b82f6', textDecoration: 'none' }}>About</Link>
            <a href="/#services" style={{ fontSize: '13.5px', fontWeight: 500, color: '#a3a3a3', textDecoration: 'none' }}>Services</a>
            <a href="#leadership" style={{ fontSize: '13.5px', fontWeight: 500, color: '#a3a3a3', textDecoration: 'none' }}>Leadership</a>
            <a href="#awards" style={{ fontSize: '13.5px', fontWeight: 500, color: '#a3a3a3', textDecoration: 'none' }}>Certificates & Awards</a>
            <a href="#legacy" style={{ fontSize: '13.5px', fontWeight: 600, color: '#eab308', textDecoration: 'none' }}>Legacy ❤️</a>
            <Link href="/training" style={{ fontSize: '13.5px', fontWeight: 500, color: '#a3a3a3', textDecoration: 'none' }}>Training</Link>
            <Link href="/blog" style={{ fontSize: '13.5px', fontWeight: 500, color: '#a3a3a3', textDecoration: 'none' }}>Blog</Link>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => setModalOpen(true)}
              className="btn-primary"
              style={{ padding: '9px 20px', fontSize: '13px' }}
            >
              Talk to GDAs
            </button>
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

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
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
              <Link href="/" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} style={{ color: '#3b82f6', fontWeight: 600, textDecoration: 'none' }}>About GDAs</Link>
              <a href="/#services" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none' }}>Services</a>
              <a href="#leadership" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none' }}>Leadership</a>
              <a href="#awards" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none' }}>Certificates & Awards</a>
              <a href="#legacy" onClick={() => setMobileMenuOpen(false)} style={{ color: '#eab308', fontWeight: 600, textDecoration: 'none' }}>Our Legacy (Father Never Dies)</a>
              <Link href="/training" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none' }}>Training</Link>
              <Link href="/blog" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none' }}>Blog</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ========================================================================= */}
      {/* 01. ABOUT HERO SECTION */}
      {/* ========================================================================= */}
      <section
        style={{
          paddingTop: '160px',
          paddingBottom: '70px',
          position: 'relative',
        }}
      >
        <div className="container-custom">
          <div style={{ textAlign: 'center', maxWidth: '860px', margin: '0 auto' }}>
            {/* Small Eyebrow / Label */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ display: 'inline-flex', alignItems: 'center', marginBottom: '16px' }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(37, 99, 235, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  borderRadius: '50px',
                  padding: '6px 18px',
                }}
              >
                <span className="pulse-dot" />
                <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', color: '#60a5fa', textTransform: 'uppercase' }}>
                  About Ganesha Digital Ads
                </span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              style={{
                fontSize: 'clamp(36px, 5.2vw, 64px)',
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                marginBottom: '16px',
              }}
            >
              One Platform.{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                All Solutions.
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.25 }}
              style={{
                fontSize: 'clamp(19px, 2.4vw, 26px)',
                fontWeight: 600,
                color: '#e2e8f0',
                marginBottom: '24px',
              }}
            >
              Digital Ka Saath, <span style={{ color: '#3b82f6', fontWeight: 700 }}>Aapke Business Ka Vikas.</span>
            </motion.div>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.35 }}
              style={{
                fontSize: '16.5px',
                color: '#cbd5e1',
                lineHeight: 1.7,
                marginBottom: '16px',
              }}
            >
              Ganesha Digital Ads (GDAs) is a <strong>digital marketing agency</strong> helping businesses build strong brands, reach the right audience and achieve sustainable growth through <strong>Digital Marketing, Branding, Technology and Creative Solutions.</strong>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.45 }}
              style={{
                fontSize: '15.5px',
                color: '#94a3b8',
                lineHeight: 1.7,
              }}
            >
              We bring essential digital solutions together under one platform — helping businesses <strong>Build, Market and Grow</strong> in the digital world.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02. MISSION & VISION SECTION */}
      {/* ========================================================================= */}
      <section style={{ padding: '60px 0', borderTop: '1px solid rgba(255, 255, 255, 0.08)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', background: '#050505' }}>
        <div className="container-custom">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '28px',
            }}
          >
            {/* Our Mission Card */}
            <motion.div
              whileHover={{ y: -4 }}
              className="glass-card"
              style={{
                padding: '36px 30px',
                borderRadius: '24px',
                background: 'linear-gradient(180deg, rgba(37, 99, 235, 0.08) 0%, rgba(15, 15, 15, 0.95) 100%)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: 'rgba(37, 99, 235, 0.15)',
                    border: '1px solid rgba(37, 99, 235, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                  }}
                >
                  🎯
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff' }}>Our Mission</h2>
              </div>
              <p style={{ fontSize: '15.5px', color: '#d1d5db', lineHeight: 1.7 }}>
                To empower businesses with the right <strong>Digital Marketing, Branding and Technology solutions</strong> that help them build a strong brand, connect with their audience and achieve sustainable growth.
              </p>
            </motion.div>

            {/* Our Vision Card */}
            <motion.div
              whileHover={{ y: -4 }}
              className="glass-card"
              style={{
                padding: '36px 30px',
                borderRadius: '24px',
                background: 'linear-gradient(180deg, rgba(139, 92, 246, 0.08) 0%, rgba(15, 15, 15, 0.95) 100%)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: 'rgba(139, 92, 246, 0.15)',
                    border: '1px solid rgba(139, 92, 246, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                  }}
                >
                  🚀
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff' }}>Our Vision</h2>
              </div>
              <p style={{ fontSize: '15.5px', color: '#d1d5db', lineHeight: 1.7 }}>
                To become a trusted <strong>digital growth partner</strong> for businesses by bringing <strong>Marketing, Branding and Technology</strong> together under one platform.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03. WHY GDAs? — 5 Core Pillars */}
      {/* ========================================================================= */}
      <section className="section-spacing" style={{ position: 'relative' }}>
        <div className="container-custom">
          <div className="section-header">
            <div className="section-tag">The GDAs Foundation</div>
            <h2 className="section-title">
              Why <span className="serif-italic">GDAs?</span>
            </h2>
            <p className="section-subtitle">
              One Platform. Multiple Solutions. One Goal — Growth.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {[
              {
                icon: '🎯',
                title: 'Business-Focused',
                desc: 'Every strategy starts with understanding your business and its goals.',
                color: '#3b82f6',
              },
              {
                icon: '📈',
                title: 'Growth-Focused',
                desc: 'We focus on solutions that help your business reach more people, generate leads and grow digitally.',
                color: '#10b981',
              },
              {
                icon: '💡',
                title: 'Creative & Professional',
                desc: 'From branding to advertising creatives, we combine creativity with professional execution.',
                color: '#8b5cf6',
              },
              {
                icon: '⚡',
                title: 'Complete Digital Solutions',
                desc: 'Digital Marketing, Branding, SEO, Social Media, Websites, Technology and more — all under one platform.',
                color: '#06b6d4',
              },
              {
                icon: '🤝',
                title: 'Long-Term Partnership',
                desc: 'We aim to build lasting digital value rather than just completing individual projects.',
                color: '#eab308',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="glass-card"
                style={{
                  padding: '30px 24px',
                  borderRadius: '22px',
                  background: 'rgba(15, 15, 15, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div
                  style={{
                    fontSize: '30px',
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    background: `${item.color}18`,
                    border: `1px solid ${item.color}35`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '18px',
                  }}
                >
                  {item.icon}
                </div>
                <h3 style={{ fontSize: '19px', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '14.5px', color: '#a3a3a3', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04. WHY HIGH-GROWTH BRANDS CHOOSE GDAs (Comparison Matrix) */}
      {/* ========================================================================= */}
      <section style={{ padding: '80px 0', background: '#050505', borderTop: '1px solid rgba(255, 255, 255, 0.08)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div className="container-custom">
          <div className="section-header">
            <div className="section-tag">Comparison Matrix</div>
            <h2 className="section-title">
              Why High-Growth Brands <span className="serif-italic">Choose GDAs</span>
            </h2>
            <p className="section-subtitle">
              How our integrated growth model compares to fragmented agency & freelancer approaches.
            </p>
          </div>

          {/* Responsive Table Container */}
          <div
            className="glass-card"
            style={{
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              background: '#0a0a0a',
              marginBottom: '36px',
            }}
          >
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '680px' }}>
                <thead>
                  <tr style={{ background: 'rgba(255, 255, 255, 0.04)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <th style={{ padding: '18px 24px', fontSize: '13px', fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.08em', width: '22%' }}>
                      Growth Pillar
                    </th>
                    <th style={{ padding: '18px 24px', fontSize: '14px', fontWeight: 800, color: '#ffffff', background: 'rgba(37, 99, 235, 0.15)', borderLeft: '1px solid rgba(59, 130, 246, 0.3)', borderRight: '1px solid rgba(59, 130, 246, 0.3)', width: '42%' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>⚡ GDAs — Growth-Focused Digital Agency</span>
                      </div>
                    </th>
                    <th style={{ padding: '18px 24px', fontSize: '13px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', width: '36%' }}>
                      Traditional Agency / Freelancer
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, rIdx) => (
                    <tr
                      key={rIdx}
                      style={{
                        borderBottom: rIdx === comparisonRows.length - 1 ? 'none' : '1px solid rgba(255, 255, 255, 0.06)',
                        background: rIdx % 2 === 0 ? 'rgba(255, 255, 255, 0.01)' : 'transparent',
                      }}
                    >
                      <td style={{ padding: '16px 24px', fontSize: '14.5px', fontWeight: 700, color: '#ffffff' }}>
                        {row.pillar}
                      </td>
                      <td
                        style={{
                          padding: '16px 24px',
                          fontSize: '14px',
                          color: '#e2e8f0',
                          lineHeight: 1.5,
                          background: 'rgba(37, 99, 235, 0.06)',
                          borderLeft: '1px solid rgba(59, 130, 246, 0.25)',
                          borderRight: '1px solid rgba(59, 130, 246, 0.25)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                          <span style={{ color: '#3b82f6', fontWeight: 700 }}>✓</span>
                          <span>{row.gdas}</span>
                        </div>
                      </td>
                      <td style={{ padding: '16px 24px', fontSize: '13.5px', color: '#737373', lineHeight: 1.5 }}>
                        {row.traditional}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* The GDAs Difference Banner */}
          <div
            className="glass-card glass-card-glow"
            style={{
              padding: '28px 32px',
              borderRadius: '20px',
              textAlign: 'center',
              border: '1px solid rgba(59, 130, 246, 0.35)',
            }}
          >
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>
              The GDAs Difference
            </div>
            <div style={{ fontSize: 'clamp(20px, 2.6vw, 26px)', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
              Strategy + Performance + Branding + Technology
            </div>
            <div style={{ fontSize: '15px', color: '#93c5fd', fontWeight: 600 }}>
              One Platform. All Solutions. One Goal — Growth.
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05. LEADERSHIP & RECOGNITION (Mr. Ram Gyan) */}
      {/* ========================================================================= */}
      <section id="leadership" className="section-spacing" style={{ position: 'relative' }}>
        <div className="container-custom">
          <div className="section-header">
            <div className="section-tag">Executive Leadership</div>
            <h2 className="section-title">
              Leadership & <span className="serif-italic">Recognition</span>
            </h2>
            <p className="section-subtitle">
              Guided by relentless dedication, certified mastery, and a forward-looking digital vision.
            </p>
          </div>

          <div
            className="glass-card"
            style={{
              padding: 'clamp(32px, 5vw, 48px)',
              borderRadius: '28px',
              background: 'linear-gradient(180deg, rgba(37, 99, 235, 0.08) 0%, rgba(12, 12, 12, 0.95) 100%)',
              border: '1px solid rgba(59, 130, 246, 0.35)',
              marginBottom: '48px',
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
              {/* Leader Photo & Award Stage Frame */}
              <div>
                <div
                  style={{
                    position: 'relative',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    border: '2px solid rgba(59, 130, 246, 0.5)',
                    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.8), 0 0 30px rgba(37, 99, 235, 0.25)',
                  }}
                >
                  <img
                    src="/ram_gyan_award.jpg"
                    alt="Mr. Ram Gyan - Co-Founder & CEO GDAs"
                    style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '16px 20px',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 70%, transparent 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '8px',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '17px', fontWeight: 800, color: '#ffffff' }}>
                        Mr. Ram Gyan
                      </div>
                      <div style={{ fontSize: '12px', color: '#93c5fd' }}>
                        Co-Founder & CEO, GDAs
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        background: 'rgba(37, 99, 235, 0.4)',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        border: '1px solid rgba(59, 130, 246, 0.6)',
                        color: '#ffffff',
                      }}
                    >
                      Bharat Visionary Leader 2026
                    </span>
                  </div>
                </div>
              </div>

              {/* Leader Details & Education Credentials */}
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                  Co-Founder & CEO
                </div>
                <h3 style={{ fontSize: 'clamp(28px, 3.4vw, 38px)', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
                  Mr. Ram Gyan
                </h3>
                <div style={{ fontSize: '15px', color: '#94a3b8', fontWeight: 600, marginBottom: '18px' }}>
                  Building in Digital Marketing Since 2019
                </div>

                <div
                  style={{
                    background: 'rgba(37, 99, 235, 0.1)',
                    borderLeft: '4px solid #3b82f6',
                    padding: '14px 18px',
                    borderRadius: '0 12px 12px 0',
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#93c5fd',
                    marginBottom: '20px',
                  }}
                >
                  "Learn. Build. Grow."
                </div>

                <p style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '24px' }}>
                  Mr. Ram Gyan leads GDAs with a vision to help businesses grow through <strong>Digital Marketing, Branding, Technology and AI-driven solutions.</strong>
                </p>

                {/* Education & Professional Recognition List */}
                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '20px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>
                    Education & Professional Recognition
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
                    {[
                      'PG — Political Science, Magadh University',
                      'PGDCA — IGNOU',
                      'Meta Ads Training — IIT Delhi (CEP)',
                      'AI/ML Training — IIT Patna',
                      'VSkills Certified Digital Marketing Master',
                      'Honorary Doctorate — Hawkins University, USA',
                      'Bharat Visionary Leader Award 2026',
                      'Recognition in Digital Advertising',
                    ].map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: '#e2e8f0' }}>
                        <span style={{ color: '#3b82f6', fontSize: '14px' }}>◆</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CERTIFICATES & AWARDS GALLERY */}
          {/* ========================================================================= */}
          <div id="awards">
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h3 style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
                Certificates & Awards
              </h3>
              <p style={{ fontSize: '14.5px', color: '#94a3b8' }}>
                Click on any certificate or award to view the full resolution document.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
              }}
            >
              {certificatesAndAwards.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -6 }}
                  onClick={() => setSelectedCert(item)}
                  className="glass-card"
                  style={{
                    borderRadius: '20px',
                    overflow: 'hidden',
                    background: '#0d0d0d',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ height: '220px', overflow: 'hidden', position: 'relative', background: '#111' }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: 'rgba(0, 0, 0, 0.8)',
                        backdropFilter: 'blur(8px)',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#60a5fa',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                      }}
                    >
                      {item.year}
                    </div>
                  </div>

                  <div style={{ padding: '20px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>
                      {item.institution}
                    </div>
                    <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '13px', color: '#a3a3a3', lineHeight: 1.5, marginBottom: '14px' }}>
                      {item.desc}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: '#3b82f6', fontWeight: 600 }}>
                      <span>View Full Certificate</span>
                      <span>🔍</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 06. THE LEGACY BEHIND GDAs ❤️ (Late Mr. Ganesh Ram) */}
      {/* ========================================================================= */}
      <section id="legacy" className="section-spacing" style={{ position: 'relative', background: '#050505' }}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="legacy-card"
            style={{
              padding: 'clamp(36px, 6vw, 64px)',
              borderRadius: '32px',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '48px',
                alignItems: 'center',
              }}
            >
              {/* Left Column: Story & Tribute */}
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 16px',
                    borderRadius: '50px',
                    background: 'rgba(234, 179, 8, 0.12)',
                    border: '1px solid rgba(234, 179, 8, 0.35)',
                    color: '#fde047',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: '20px',
                  }}
                >
                  <span>❤️</span>
                  <span>The Legacy Behind GDAs</span>
                </div>

                <h2 style={{ fontSize: 'clamp(28px, 3.6vw, 42px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, marginBottom: '6px' }}>
                  Mr. Ganesh Ram
                </h2>
                <div style={{ fontSize: '16px', color: '#facc15', fontWeight: 700, marginBottom: '4px' }}>
                  Ex-Senior Controller, JSEB
                </div>
                <div style={{ fontSize: '13.5px', color: '#cbd5e1', marginBottom: '22px' }}>
                  Patratu Thermal Power Station, Patratu
                </div>

                <div style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', marginBottom: '10px' }}>
                  Inspired by a Legacy. Built for the Future.
                </div>

                <p style={{ fontSize: '15px', color: '#e2e8f0', lineHeight: 1.7, marginBottom: '22px' }}>
                  The values of <strong>discipline, dedication, responsibility and perseverance</strong> continue to inspire the journey of GDAs.
                </p>

                <div
                  style={{
                    background: 'rgba(234, 179, 8, 0.08)',
                    borderLeft: '4px solid #eab308',
                    padding: '18px 22px',
                    borderRadius: '0 16px 16px 0',
                    marginBottom: '28px',
                  }}
                >
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#fde047', marginBottom: '8px' }}>
                    Father Never Dies.
                  </div>
                  <div style={{ fontSize: '14.5px', color: '#fef08a', lineHeight: 1.6, fontStyle: 'italic' }}>
                    His values live on.<br />
                    His vision moves forward.<br />
                    His legacy continues through GDAs.
                  </div>
                </div>

                <button
                  onClick={() => setModalOpen(true)}
                  className="btn-primary"
                  style={{
                    padding: '12px 28px',
                    fontSize: '14px',
                    background: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)',
                    boxShadow: '0 4px 20px rgba(234, 179, 8, 0.4)',
                    color: '#000000',
                    fontWeight: 800,
                  }}
                >
                  Talk to GDAs →
                </button>
              </div>

              {/* Right Column: Original Founder Mr. Ganesh Ji Frame */}
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    display: 'inline-block',
                    padding: '14px',
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
      {/* 07. LET'S GROW TOGETHER (Final Section) */}
      {/* ========================================================================= */}
      <section
        style={{
          padding: '90px 0',
          position: 'relative',
          overflow: 'hidden',
          background: 'radial-gradient(ellipse at center, rgba(37, 99, 235, 0.18) 0%, rgba(0, 0, 0, 0.95) 75%)',
        }}
      >
        <div className="container-custom">
          <div
            className="glass-card glass-card-glow"
            style={{
              padding: 'clamp(40px, 6vw, 70px) 30px',
              borderRadius: '32px',
              textAlign: 'center',
              maxWidth: '920px',
              margin: '0 auto',
            }}
          >
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '14px' }}>
              Let's Grow Together
            </div>

            <h2
              style={{
                fontSize: 'clamp(30px, 4.4vw, 50px)',
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.15,
                marginBottom: '16px',
                letterSpacing: '-0.02em',
              }}
            >
              Your Business. Your Vision.{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Our Digital Expertise.
              </span>
            </h2>

            <p
              style={{
                fontSize: '16px',
                color: '#cbd5e1',
                lineHeight: 1.7,
                maxWidth: '680px',
                margin: '0 auto 20px auto',
              }}
            >
              From <strong>Digital Marketing and Branding to Technology and Creative Solutions</strong>, GDAs is here to help your business build a stronger digital presence and move forward with confidence.
            </p>

            <div style={{ fontSize: '18px', fontWeight: 700, color: '#93c5fd', marginBottom: '32px' }}>
              Digital Ka Saath, Aapke Business Ka Vikas.
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setModalOpen(true)}
                className="btn-primary"
                style={{ padding: '14px 36px', fontSize: '15.5px', fontWeight: 700 }}
              >
                <span>Talk to GDAs →</span>
              </button>

              <a
                href="https://wa.me/919939862765?text=Hello%20GDAs%20Team%2C%20I%20want%20to%20grow%20my%20business%20digitally"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ padding: '14px 28px', fontSize: '15px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <span>WhatsApp Us</span>
                <span>💬</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FOOTER */}
      {/* ========================================================================= */}
      <footer
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          background: '#040404',
          padding: '60px 0 30px 0',
        }}
      >
        <div className="container-custom">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '40px',
              marginBottom: '40px',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#0d3899', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  <img src="/gda_logo.png" alt="GDAs Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <span style={{ fontWeight: 800, fontSize: '18px', color: '#ffffff' }}>GDAs</span>
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
                GANESHA DIGITAL ADS
              </div>
              <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '12px' }}>
                Digital Ka Saath, Aapke Business Ka Vikas.
              </p>
              <p style={{ fontSize: '12.5px', color: '#737373' }}>
                Built with a Vision. Driven by a Legacy. Father Never Dies.
              </p>
            </div>

            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
                Quick Links
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
                <Link href="/" style={{ color: '#a3a3a3', textDecoration: 'none' }}>Home</Link>
                <Link href="/about" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 600 }}>About</Link>
                <a href="/#services" style={{ color: '#a3a3a3', textDecoration: 'none' }}>Services</a>
                <Link href="/training" style={{ color: '#a3a3a3', textDecoration: 'none' }}>Training</Link>
                <Link href="/blog" style={{ color: '#a3a3a3', textDecoration: 'none' }}>Blog</Link>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
                Contact
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
                <a href="tel:9939862765" style={{ color: '#a3a3a3', textDecoration: 'none' }}>📞 9939862765</a>
                <a href="https://ganeshadigiads.in" target="_blank" rel="noopener noreferrer" style={{ color: '#a3a3a3', textDecoration: 'none' }}>🌐 ganeshadigiads.in</a>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', fontSize: '13px', color: '#737373' }}>
            <div>© 2026 GDAs Ganesha Digital Ads. All Rights Reserved.</div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Link href="/privacy-policy" style={{ color: '#737373', textDecoration: 'none' }}>Privacy Policy</Link>
              <Link href="/terms-conditions" style={{ color: '#737373', textDecoration: 'none' }}>Terms & Conditions</Link>
              <Link href="/refund-policy" style={{ color: '#737373', textDecoration: 'none' }}>Refund Policy</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* CERTIFICATE LIGHTBOX MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedCert && (
          <div className="modal-overlay" onClick={() => setSelectedCert(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="modal-content"
              style={{ maxWidth: '820px', padding: '24px' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCert(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  color: '#ffffff',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  fontSize: '16px',
                }}
              >
                ✕
              </button>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase' }}>
                  {selectedCert.institution} • {selectedCert.year}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
                  {selectedCert.title}
                </h3>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                  Certificate ID: {selectedCert.certNo}
                </div>
              </div>

              <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.12)', maxHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  style={{ width: '100%', height: 'auto', maxHeight: '70vh', objectFit: 'contain' }}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* LEAD MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {modalOpen && (
          <div className="modal-overlay" onClick={() => setModalOpen(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
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
                }}
              >
                ✕
              </button>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#60a5fa', textTransform: 'uppercase' }}>
                  Connect with GDAs
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>
                  Talk to Our Growth Team
                </h3>
              </div>

              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', background: '#141414', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', color: '#fff', fontSize: '14px', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 9939862765"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', background: '#141414', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', color: '#fff', fontSize: '14px', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>Service Required</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', background: '#141414', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', color: '#fff', fontSize: '14px', outline: 'none' }}
                  >
                    <option value="Digital Marketing">Digital Marketing (Meta & Google Ads)</option>
                    <option value="Branding & Creative">Branding & Creative Design</option>
                    <option value="Website & Technology">Website & Technology Development</option>
                    <option value="Complete All-in-One Growth">Complete All-in-One Growth Suite</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>Message (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your business requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', background: '#141414', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', color: '#fff', fontSize: '14px', outline: 'none', resize: 'none' }}
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', padding: '13px', fontSize: '15px', fontWeight: 700, marginTop: '6px' }}>
                  Connect on WhatsApp →
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
