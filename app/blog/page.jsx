'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { blogPosts } from '../../lib/blogData';

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

export default function BlogIndexPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickReadPost, setQuickReadPost] = useState(null);
  const setCursorHovered = () => {};

  const categories = [
    'All',
    'Digital Marketing Strategy',
    'Meta Ads & Paid Social',
    'Performance Advertising',
    'Search Engine Optimization',
    'Business Growth & Agency Guide',
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCat = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.primaryKeyword.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featuredPost = blogPosts[0];

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
            <Link href="/" onMouseEnter={() => setCursorHovered(true)} onMouseLeave={() => setCursorHovered(false)} style={{ fontSize: '13.5px', fontWeight: 500, color: '#a3a3a3', textDecoration: 'none' }}>Home</Link>
            <Link href="/about" onMouseEnter={() => setCursorHovered(true)} onMouseLeave={() => setCursorHovered(false)} style={{ fontSize: '13.5px', fontWeight: 500, color: '#a3a3a3', textDecoration: 'none' }}>About</Link>
            <Link href="/services" onMouseEnter={() => setCursorHovered(true)} onMouseLeave={() => setCursorHovered(false)} style={{ fontSize: '13.5px', fontWeight: 500, color: '#a3a3a3', textDecoration: 'none' }}>Services</Link>
            <Link href="/training" onMouseEnter={() => setCursorHovered(true)} onMouseLeave={() => setCursorHovered(false)} style={{ fontSize: '13.5px', fontWeight: 500, color: '#a3a3a3', textDecoration: 'none' }}>Training</Link>
            <Link href="/blog" onMouseEnter={() => setCursorHovered(true)} onMouseLeave={() => setCursorHovered(false)} style={{ fontSize: '13.5px', fontWeight: 700, color: '#3b82f6', textDecoration: 'none' }}>Blog</Link>
          </nav>

          {/* Right Action */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link
              href="https://wa.me/919939862765"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              className="btn btn-primary"
              style={{ padding: '8px 18px', fontSize: '12.5px', fontWeight: 700, textDecoration: 'none' }}
            >
              Talk to Us →
            </Link>

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

        {/* Mobile Drawer */}
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
              <Link href="/" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none' }}>About</Link>
              <Link href="/services" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none' }}>Services</Link>
              <Link href="/training" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none' }}>Training</Link>
              <Link href="/blog" onClick={() => setMobileMenuOpen(false)} style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 700 }}>Blog</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION */}
      {/* ========================================================================= */}
      <section style={{ paddingTop: '160px', paddingBottom: '50px', position: 'relative' }}>
        <div className="container-custom" style={{ textAlign: 'center' }}>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={blurFadeIn}
            custom={0}
            style={{ display: 'inline-flex', marginBottom: '18px' }}
          >
            <div className="pill-badge pill-badge-blue">
              <span className="pulse-dot" />
              <span>GANESHA DIGITAL ADS • GDAs EDITORIAL</span>
            </div>
          </motion.div>

          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={blurFadeIn}
            custom={1}
            style={{
              fontSize: 'clamp(34px, 5.2vw, 62px)',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              maxWidth: '920px',
              margin: '0 auto 16px auto',
            }}
          >
            Practical Insights for{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #93c5fd 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Modern Business Growth
            </span>.
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
            In-depth guides on Digital Marketing, Meta Ads, Google Ads, SEO, Lead Generation, and Agency Strategies — written by real practitioners.
          </motion.p>

          {/* Live Search Input */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={blurFadeIn}
            custom={3}
            style={{
              maxWidth: '540px',
              margin: '0 auto 40px auto',
              position: 'relative',
            }}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides (e.g. Meta Ads, SEO, Google Ads)..."
              style={{
                width: '100%',
                padding: '14px 20px 14px 44px',
                borderRadius: '9999px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#fff',
                fontSize: '14.5px',
                outline: 'none',
                boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
              }}
            />
            <span
              style={{
                position: 'absolute',
                left: '18px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '16px',
                color: '#9ca3af',
              }}
            >
              🔍
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#9ca3af',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                ✕
              </button>
            )}
          </motion.div>

          {/* Category Filter Pills */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={blurFadeIn}
            custom={4}
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              flexWrap: 'wrap',
              marginBottom: '45px',
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '9999px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: activeCategory === cat ? '1px solid #3b82f6' : '1px solid rgba(255,255,255,0.08)',
                  background: activeCategory === cat ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255,255,255,0.03)',
                  color: activeCategory === cat ? '#60a5fa' : '#9ca3af',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. FEATURED BLOG CARD */}
      {/* ========================================================================= */}
      {activeCategory === 'All' && !searchQuery && (
        <section style={{ paddingBottom: '50px' }}>
          <div className="container-custom">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={blurFadeIn}
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #0d1424 0%, #070a12 100%)',
                border: '1px solid rgba(59, 130, 246, 0.35)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              }}
            >
              <div style={{ height: '360px', overflow: 'hidden' }}>
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                    <span className="pill-badge pill-badge-orange">
                      <span className="pulse-dot" />
                      <span>Featured Article</span>
                    </span>
                    <span style={{ fontSize: '12px', color: '#9ca3af' }}>{featuredPost.readTime}</span>
                  </div>

                  <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, lineHeight: 1.2, color: '#fff', marginBottom: '14px' }}>
                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      style={{ color: '#fff', textDecoration: 'none' }}
                      onMouseEnter={() => setCursorHovered(true)}
                      onMouseLeave={() => setCursorHovered(false)}
                    >
                      {featuredPost.title}
                    </Link>
                  </h2>

                  <p style={{ fontSize: '14.5px', color: '#a3a3a3', lineHeight: 1.6, marginBottom: '20px' }}>
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#e5e7eb' }}>
                      {featuredPost.author.name}
                    </div>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="btn btn-primary"
                    onMouseEnter={() => setCursorHovered(true)}
                    onMouseLeave={() => setCursorHovered(false)}
                    style={{ padding: '9px 20px', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}
                  >
                    Read Full Guide →
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 4. BLOGS GRID (All 5 Structured Posts) */}
      {/* ========================================================================= */}
      <section style={{ paddingBottom: '90px' }}>
        <div className="container-custom">
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#fff' }}>
              {activeCategory === 'All' ? 'All Guides & Articles' : activeCategory} ({filteredPosts.length})
            </h3>
          </div>

          {filteredPosts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#9ca3af' }}>
              <div style={{ fontSize: '36px', marginBottom: '10px' }}>🔍</div>
              <p>No articles found matching &quot;{searchQuery}&quot;.</p>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
                gap: '28px',
              }}
            >
              {filteredPosts.map((post, idx) => (
                <motion.article
                  key={post.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={blurFadeIn}
                  custom={idx * 0.4}
                  whileHover={{ y: -6, borderColor: 'rgba(59, 130, 246, 0.45)' }}
                  style={{
                    background: 'linear-gradient(135deg, #0b0b0b 0%, #121212 100%)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '22px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
                  }}
                >
                  <div>
                    {/* Thumbnail Image */}
                    <div style={{ height: '200px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                      <img
                        src={post.image}
                        alt={post.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <span
                        style={{
                          position: 'absolute',
                          top: '14px',
                          left: '14px',
                          background: 'rgba(0,0,0,0.75)',
                          backdropFilter: 'blur(8px)',
                          padding: '4px 10px',
                          borderRadius: '999px',
                          fontSize: '11px',
                          fontWeight: 700,
                          color: '#60a5fa',
                          border: '1px solid rgba(255,255,255,0.1)',
                        }}
                      >
                        {post.category}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div style={{ padding: '24px 22px' }}>
                      <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>
                        {post.readTime} • <span style={{ color: '#f59e0b' }}>{post.date}</span>
                      </div>

                      <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', lineHeight: 1.35, marginBottom: '12px' }}>
                        <Link
                          href={`/blog/${post.slug}`}
                          style={{ color: '#fff', textDecoration: 'none' }}
                          onMouseEnter={() => setCursorHovered(true)}
                          onMouseLeave={() => setCursorHovered(false)}
                        >
                          {post.title}
                        </Link>
                      </h4>

                      <p style={{ fontSize: '13.5px', color: '#9ca3af', lineHeight: 1.55, marginBottom: '16px' }}>
                        {post.excerpt.slice(0, 130)}...
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div
                    style={{
                      padding: '16px 22px',
                      borderTop: '1px solid rgba(255,255,255,0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#d1d5db' }}>
                        {post.author.name}
                      </span>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      style={{
                        fontSize: '12.5px',
                        fontWeight: 800,
                        color: '#3b82f6',
                        textDecoration: 'none',
                      }}
                      onMouseEnter={() => setCursorHovered(true)}
                      onMouseLeave={() => setCursorHovered(false)}
                    >
                      Read Guide →
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. COMPREHENSIVE FOOTER */}
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
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <span style={{ fontWeight: 800, fontSize: '16px' }}>GDAs</span>
            </Link>

            <div style={{ display: 'flex', gap: '22px', fontSize: '13.5px', flexWrap: 'wrap' }}>
              <Link href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>Home</Link>
              <Link href="/about" style={{ color: '#9ca3af', textDecoration: 'none' }}>About</Link>
              <Link href="/services" style={{ color: '#9ca3af', textDecoration: 'none' }}>Services</Link>
              <Link href="/training" style={{ color: '#9ca3af', textDecoration: 'none' }}>Training</Link>
              <Link href="/blog" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 700 }}>Blog</Link>
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
