'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { blogPosts } from '../../../lib/blogData';

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

export default function BlogPostDetail({ params }) {
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const setCursorHovered = () => {};

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

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

        {/* Mobile Dropdown */}
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
      {/* 2. BLOG HEADER & BREADCRUMBS */}
      {/* ========================================================================= */}
      <article style={{ paddingTop: '150px', paddingBottom: '80px', position: 'relative' }}>
        <div className="container-custom">
          
          {/* Breadcrumbs */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={blurFadeIn}
            custom={0}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              color: '#9ca3af',
              marginBottom: '24px',
            }}
          >
            <Link href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link href="/blog" style={{ color: '#9ca3af', textDecoration: 'none' }}>Blog</Link>
            <span>/</span>
            <span style={{ color: '#60a5fa', fontWeight: 600 }}>{post.category}</span>
          </motion.div>

          {/* Category & Read Time Badges */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={blurFadeIn}
            custom={1}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px', flexWrap: 'wrap' }}
          >
            <span className="pill-badge pill-badge-blue">
              <span className="pulse-dot" />
              <span>{post.category}</span>
            </span>
            <span style={{ fontSize: '13px', color: '#9ca3af' }}>•</span>
            <span style={{ fontSize: '13px', color: '#9ca3af' }}>{post.readTime}</span>
            <span style={{ fontSize: '13px', color: '#9ca3af' }}>•</span>
            <span style={{ fontSize: '13px', color: '#f59e0b', fontWeight: 700 }}>{post.date}</span>
          </motion.div>

          {/* Blog Title */}
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={blurFadeIn}
            custom={2}
            style={{
              fontSize: 'clamp(28px, 4.4vw, 50px)',
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              maxWidth: '920px',
              marginBottom: '24px',
            }}
          >
            {post.title}
          </motion.h1>

          {/* Author Strip & Share Button */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={blurFadeIn}
            custom={3}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '26px',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              marginBottom: '36px',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <img
                src={post.author.avatar}
                alt={post.author.name}
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid rgba(59, 130, 246, 0.5)',
                }}
              />
              <div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#fff' }}>
                  {post.author.name}
                </div>
                <div style={{ fontSize: '12.5px', color: '#9ca3af' }}>
                  {post.author.role}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleCopyLink}
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff',
                  borderRadius: '8px',
                  padding: '8px 14px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                {copied ? '✓ Link Copied!' : '🔗 Share Article'}
              </button>
            </div>
          </motion.div>

          {/* Main Article Grid (Content + Sticky Sidebar) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) 300px',
              gap: '45px',
              alignItems: 'start',
            }}
            className="blog-content-layout"
          >
            {/* Left Main Content */}
            <div style={{ minWidth: 0 }}>
              
              {/* Featured Banner Image */}
              <div
                style={{
                  width: '100%',
                  height: '380px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  marginBottom: '40px',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Sections Breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
                {post.sections.map((sec, idx) => (
                  <motion.section
                    key={idx}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={blurFadeIn}
                    id={`section-${idx}`}
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '18px',
                      padding: '28px 26px',
                    }}
                  >
                    <h2
                      style={{
                        fontSize: 'clamp(20px, 2.6vw, 26px)',
                        fontWeight: 800,
                        color: '#60a5fa',
                        marginBottom: '16px',
                        lineHeight: 1.3,
                      }}
                    >
                      {sec.heading}
                    </h2>

                    <div
                      style={{
                        fontSize: '15.5px',
                        color: '#d1d5db',
                        lineHeight: 1.8,
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {sec.content}
                    </div>
                  </motion.section>
                ))}
              </div>

              {/* Internal Links Strip */}
              <div
                style={{
                  marginTop: '45px',
                  padding: '26px',
                  borderRadius: '16px',
                  background: 'rgba(59, 130, 246, 0.08)',
                  border: '1px solid rgba(59, 130, 246, 0.25)',
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#f59e0b', marginBottom: '12px' }}>
                  Related GDAs Resources & Services:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {post.internalLinks.map((link, lIdx) => (
                    <Link
                      key={lIdx}
                      href={link.url}
                      onMouseEnter={() => setCursorHovered(true)}
                      onMouseLeave={() => setCursorHovered(false)}
                      style={{
                        fontSize: '13.5px',
                        fontWeight: 700,
                        color: '#93c5fd',
                        background: 'rgba(255,255,255,0.06)',
                        padding: '6px 14px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                      }}
                    >
                      → {link.text}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Keywords Tag Cloud */}
              <div style={{ marginTop: '28px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Primary & Secondary Keywords:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {[post.primaryKeyword, ...post.secondaryKeywords].map((kw, kIdx) => (
                    <span
                      key={kIdx}
                      style={{
                        fontSize: '12px',
                        color: '#9ca3af',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        padding: '4px 10px',
                        borderRadius: '6px',
                      }}
                    >
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author Box Spotlight */}
              <div
                style={{
                  marginTop: '45px',
                  background: 'linear-gradient(135deg, #0d121f 0%, #070a12 100%)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  borderRadius: '20px',
                  padding: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  flexWrap: 'wrap',
                }}
              >
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  style={{
                    width: '74px',
                    height: '74px',
                    borderRadius: '16px',
                    objectFit: 'cover',
                    border: '2px solid rgba(59, 130, 246, 0.5)',
                  }}
                />
                <div style={{ flex: 1, minWidth: '220px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: '#60a5fa', textTransform: 'uppercase' }}>
                    Written By
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#fff', margin: '4px 0' }}>
                    {post.author.name}
                  </h3>
                  <div style={{ fontSize: '12.5px', color: '#f59e0b', fontWeight: 700, marginBottom: '6px' }}>
                    {post.author.role}
                  </div>
                  <p style={{ fontSize: '13.5px', color: '#9ca3af', lineHeight: 1.5, margin: 0 }}>
                    {post.author.bio}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Sticky Sidebar */}
            <aside style={{ position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Table of Contents */}
              <div
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '18px',
                  padding: '22px',
                }}
              >
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#fff', marginBottom: '14px' }}>
                  📑 Table of Contents
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {post.sections.map((sec, idx) => (
                    <a
                      key={idx}
                      href={`#section-${idx}`}
                      onMouseEnter={() => setCursorHovered(true)}
                      onMouseLeave={() => setCursorHovered(false)}
                      style={{
                        fontSize: '12.5px',
                        color: '#9ca3af',
                        textDecoration: 'none',
                        lineHeight: 1.4,
                        transition: 'color 0.2s ease',
                      }}
                    >
                      {idx + 1}. {sec.heading}
                    </a>
                  ))}
                </div>
              </div>

              {/* WhatsApp Quick CTA Box */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #0f2b1d 0%, #07140e 100%)',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  borderRadius: '18px',
                  padding: '24px 20px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>💬</div>
                <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
                  Ready to Grow Your Business?
                </h4>
                <p style={{ fontSize: '12.5px', color: '#9ca3af', lineHeight: 1.5, marginBottom: '16px' }}>
                  Get custom digital marketing, ads, and website strategy tailored for your brand.
                </p>
                <a
                  href={`https://wa.me/919939862765?text=Hello%20GDAs!%20I%20read%20your%20blog%20"${encodeURIComponent(post.title)}"%20and%20want%20to%20consult%20with%20you.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '10px',
                    fontSize: '13px',
                    fontWeight: 700,
                    background: '#10b981',
                    color: '#fff',
                    borderRadius: '8px',
                    textDecoration: 'none',
                  }}
                >
                  Talk to GDAs on WhatsApp →
                </a>
              </div>

              {/* Related Posts */}
              <div
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '18px',
                  padding: '20px',
                }}
              >
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#fff', marginBottom: '14px' }}>
                  ⚡ More Insights
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {relatedPosts.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/blog/${rel.slug}`}
                      style={{ textDecoration: 'none', display: 'flex', gap: '10px', alignItems: 'center' }}
                    >
                      <img
                        src={rel.image}
                        alt={rel.title}
                        style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }}
                      />
                      <div style={{ fontSize: '12px', fontWeight: 700, color: '#e5e7eb', lineHeight: 1.3 }}>
                        {rel.title.slice(0, 45)}...
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* ========================================================================= */}
      {/* 3. COMPREHENSIVE FOOTER */}
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
