'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '../../components/ThemeToggle';
import SocialLinks from '../../components/SocialLinks';

export default function ServicesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState('Digital Marketing Services');
  const [activeTab, setActiveTab] = useState('all');
  const setCursorHovered = () => {};

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Digital Marketing Services',
    businessType: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const waText = encodeURIComponent(
      `Hello GDAs Team!\n\nName: ${formData.name}\nPhone: ${formData.phone}\nService: ${formData.service}\nBusiness: ${formData.businessType || 'N/A'}\nMessage: ${formData.message || 'I want to discuss this service with GDAs.'}`
    );
    window.open(`https://wa.me/919939862765?text=${waText}`, '_blank');
  };

  const openServiceModal = (serviceName) => {
    setSelectedServiceForModal(serviceName);
    setFormData((prev) => ({ ...prev, service: serviceName }));
    setModalOpen(true);
  };

  // Complete Services Catalog Data with Newly Added Services
  const servicesCatalog = [
    {
      id: 'digital-marketing',
      category: 'marketing',
      num: '01',
      title: 'Digital Marketing Services',
      subTitle: 'Grow Your Business With Digital Marketing',
      desc: 'Our Digital Marketing Services are designed to help businesses increase online visibility, reach potential customers and generate quality leads.',
      icon: '📈',
      color: '#3b82f6',
      valueProp: 'More Visibility • Better Reach • Quality Leads • Business Growth',
      items: [
        'Meta Ads Management (Facebook & Instagram)',
        'Google Ads Management (Search & Performance)',
        'Lead Generation Services',
        'Social Media Marketing',
        'Search Engine Optimization (SEO)',
        'Local SEO Services',
        'Google Business Profile Optimization',
        'WhatsApp Marketing',
        'Remarketing & Retargeting',
      ],
    },
    {
      id: 'meta-ads',
      category: 'marketing',
      num: '02',
      title: 'Meta Ads Services',
      subTitle: 'Reach the Right Audience on Facebook & Instagram',
      desc: 'As a Meta Ads Agency, GDAs helps businesses plan, create and manage Facebook and Instagram advertising campaigns focused on awareness, engagement, leads and conversions.',
      icon: '🎯',
      color: '#60a5fa',
      valueProp: 'Meta Ads • Facebook Ads • Instagram Ads • Lead Generation • Retargeting',
      items: [
        'Targeted Audience Research & Persona Mapping',
        'High-Converting Creative Ad Design & Hooks',
        'Lead Generation Funnels & Instant Forms',
        'Direct Messenger & WhatsApp Click-to-Chat Ads',
        'Dynamic Retargeting & Custom Audiences',
        'Daily Ad Spend Optimization & A/B Testing',
      ],
    },
    {
      id: 'google-ads',
      category: 'marketing',
      num: '03',
      title: 'Google Ads Services',
      subTitle: 'Get Found When Your Customers Are Searching',
      desc: 'Our Google Ads Services help businesses reach potential customers at the exact moment they search for relevant services through targeted search and performance campaigns.',
      icon: '⚡',
      color: '#f59e0b',
      valueProp: 'Google Search Ads • Lead Generation • Performance Campaigns • Remarketing',
      items: [
        'Google Search High-Intent Ads',
        'Google Performance Max (PMax) Campaigns',
        'Google Maps & Call-Only Local Ads',
        'High-Conversion Landing Page Match',
        'Negative Keyword Optimization & Budget Control',
        'Conversion Tracking & Server Attribution',
      ],
    },
    {
      id: 'whatsapp-bulk',
      category: 'automation',
      num: '04',
      title: 'WhatsApp Bulk Marketing',
      subTitle: 'High-Open-Rate Direct Customer Messaging & Broadcasts',
      desc: 'Official WhatsApp Business API & bulk broadcasting solutions delivering verified brand messages, rich media catalogs, interactive quick-reply buttons, and high-conversion promotions directly to your audience.',
      icon: '💬',
      color: '#22c55e',
      valueProp: '98% Open Rates • Direct Engagement • Instant Conversions • Verified Branding',
      items: [
        'Official WhatsApp Business API Setup & Verification',
        'Green Tick Verification Assistance',
        'Bulk Promotional & Transactional Messaging',
        'Interactive Quick-Reply & CTA Buttons',
        'Dynamic Product Catalog & Media Sharing',
        'Real-time Delivery & Read Analytics',
      ],
    },
    {
      id: 'ivr-calling',
      category: 'automation',
      num: '05',
      title: 'IVR Calling Service',
      subTitle: 'Automated Voice Broadcasting & Smart Call Management',
      desc: 'Professional cloud-based IVR (Interactive Voice Response) and automated voice broadcasting solutions to connect with thousands of customers, capture feedback, route support, and qualify leads at scale.',
      icon: '📞',
      color: '#0ea5e9',
      valueProp: 'Instant Reach • Automated Calling • 24/7 Connectivity • Lead Qualification',
      items: [
        'Cloud-Based Multi-Level IVR Menu Architecture',
        'Outbound Voice Call (OBD) Bulk Broadcasting',
        'Automated Smart Call Routing & Agent Forwarding',
        'Missed Call & Virtual Number Lead Capture',
        'Call Recording, Telephony Logs & Live Analytics',
        'CRM Integration for Instant Call-to-Lead Sync',
      ],
    },
    {
      id: 'gmb-ranking',
      category: 'seo',
      num: '06',
      title: 'GMB Setup & Ranking',
      subTitle: 'Dominate Local Search & Google Maps In Your City',
      desc: 'Complete Google Business Profile (formerly GMB) setup, optimization, category refinement, review management, and local 3-pack map ranking to drive daily footfall and high-intent customer phone calls.',
      icon: '📍',
      color: '#10b981',
      valueProp: 'Top 3 Map Ranking • Direct Phone Calls • Footfall Influx • Local Dominance',
      items: [
        '100% Verified Google Business Profile Setup & Audit',
        'Local 3-Pack Google Maps Top Ranking Strategy',
        'Keyword-Rich Category, Services & Bio Optimization',
        'High-Resolution Geo-Tagged Photos & Update Posts',
        'Customer Review Generation & Reputation Management',
        'NAP Consistency & High-Authority Local Citations',
      ],
    },
    {
      id: 'seo-services',
      category: 'seo',
      num: '07',
      title: 'SEO Services',
      subTitle: 'Improve Your Search Visibility. Grow Organically.',
      desc: 'Our SEO Services help businesses improve their ranking on search engines and build a stronger long-term online presence with consistent organic customer traffic.',
      icon: '🔍',
      color: '#10b981',
      valueProp: 'Better Rankings • More Organic Traffic • Long-Term Growth',
      items: [
        'On-Page SEO & Keyword Architecture',
        'Technical SEO & Page Speed Optimization',
        'Local SEO & City-Specific Geo Targeting',
        'In-Depth Keyword & Competitor Research',
        'Website Content SEO Optimization',
        'High-Authority Backlink & Citation Building',
      ],
    },
    {
      id: 'political-campaigning',
      category: 'social',
      num: '08',
      title: 'Digital Political Campaigning',
      subTitle: 'Voter Outreach, Perception Management & Digital War Room',
      desc: 'End-to-end strategic digital political campaign management, constituency social media war rooms, geo-targeted voter outreach, narrative creation, and digital perception management.',
      icon: '🗳️',
      color: '#f97316',
      valueProp: 'Hyper-Local Reach • Voter Engagement • War Room Strategy • Narrative Control',
      items: [
        'Constituency & Booth-Level Geo-Targeted Ads',
        '24/7 Digital War Room & Social Media Management',
        'Viral Political Reels, Speech Clips & Creative Posters',
        'WhatsApp Broadcast Networks & Community Groups',
        'Public Perception, Voter Sentiment & Counter-Narratives',
        'Survey Forms, Event Promotions & Volunteer Funnels',
      ],
    },
    {
      id: 'social-media',
      category: 'social',
      num: '09',
      title: 'Social Media Marketing',
      subTitle: 'Build Your Brand. Engage Your Audience.',
      desc: 'Our Social Media Marketing Services help businesses create a consistent, captivating social presence and connect with their target audience across major platforms.',
      icon: '📱',
      color: '#ec4899',
      valueProp: 'Strategy • Content Planning • Creative Posts • Reels • Engagement',
      items: [
        'Monthly Social Media Strategy & Calendar',
        'High-Impact Viral Video Reels & Shorts',
        'Aesthetic Grid Design & Brand Visuals',
        'Audience Engagement & Comment Moderation',
        'Community Building on Instagram, Facebook & LinkedIn',
        'Influencer Collaborations & Brand Shoutouts',
      ],
    },
    {
      id: 'branding-creative',
      category: 'branding',
      num: '10',
      title: 'Branding & Creative Services',
      subTitle: 'Build a Brand People Remember.',
      desc: 'GDAs is a Branding Agency helping businesses create a professional, trustworthy, and visually unforgettable brand identity that commands respect in the marketplace.',
      icon: '🎨',
      color: '#8b5cf6',
      valueProp: 'Strong Identity • Professional Presence • Better Brand Recognition',
      items: [
        'Logo Design & Vector Master Files',
        'Brand Identity Guidelines & Color Palettes',
        'Social Media Post & Story Templates',
        'Graphic Design for Brochures & Catalogues',
        'High-Converting Ad Creatives & Banners',
        'Business Profile & Social Media Covers',
        'Video & Reels Editing with Captions & Effects',
        'Festive & Promotional Campaign Creatives',
      ],
    },
    {
      id: 'website-development',
      category: 'tech',
      num: '11',
      title: 'Website Development',
      subTitle: 'Turn Your Website Into a Business Growth Tool.',
      desc: 'Our Website Development Services help businesses establish a professional online home with modern, mobile-responsive, lightning-fast and conversion-focused architecture.',
      icon: '💻',
      color: '#06b6d4',
      valueProp: 'Professional Website • Better User Experience • More Opportunities',
      items: [
        'Custom Business Website Development',
        'Modern High-Converting UI/UX Design',
        'Dedicated Campaign Landing Page Design',
        'E-commerce Store Development & Checkout',
        '100% Mobile & Tablet Responsive Layouts',
        'Fast Page Speed & Core Web Vitals Optimization',
        'Ongoing Maintenance, Security & Hosting Support',
      ],
    },
    {
      id: 'crm-erp-automation',
      category: 'tech',
      num: '12',
      title: 'CRM, ERP & Business Automation',
      subTitle: 'Custom Enterprise Tech, Lead Pipelines & Process Automation',
      desc: 'Tailored CRM implementations, ERP workflow integrations, automated lead routing, and cloud software solutions that unify your sales, operations, inventory, and customer databases into one seamless system.',
      icon: '⚙️',
      color: '#6366f1',
      valueProp: 'Zero Data Leakage • Faster Sales Cycles • Automated Operations • Complete Control',
      items: [
        'Custom CRM Pipeline Setup & Lead Scoring',
        'ERP Workflow Integration & Process Mapping',
        'Automated Multi-Channel Lead Assignment',
        'Automated Billing, Invoice & Quotation Systems',
        'Real-time Sales Team Performance Dashboards',
        'Cloud Database Centralization & Data Security',
      ],
    },
    {
      id: 'business-growth-management',
      category: 'strategy',
      num: '13',
      title: 'Business Growth Management',
      subTitle: 'End-to-End Strategic Scale & Revenue Acceleration',
      desc: 'Comprehensive growth architecture covering market positioning, full-funnel customer acquisition, revenue retention, brand valuation, and dedicated performance management for high-growth enterprises.',
      icon: '👑',
      color: '#eab308',
      valueProp: 'Revenue Acceleration • Structured Scale • High Retention • Strategic Clarity',
      items: [
        'Go-To-Market (GTM) Strategy & Product Positioning',
        'Unit Economics, CAC Reduction & Margin Optimization',
        'Omnichannel Growth Blueprint & Budget Allocation',
        'Full-Funnel CRO (Conversion Rate Optimization)',
        'Quarterly Business Scaling Milestones & Roadmaps',
        'Dedicated Senior Growth Strategist & Director Syncs',
      ],
    },
    {
      id: 'automation-ai',
      category: 'tech',
      num: '14',
      title: 'AI & Business Automation',
      subTitle: 'Work Smarter. Save Time. Grow Better.',
      desc: 'We leverage cutting-edge AI and Automation Solutions to help businesses eliminate repetitive manual tasks, reply to customer leads instantly 24/7, and scale efficiently.',
      icon: '🤖',
      color: '#eab308',
      valueProp: 'Save Time • Improve Efficiency • Scale Your Business',
      items: [
        'AI-Powered Digital Marketing & Content Systems',
        'Automated WhatsApp Chatbots & Instant Replies',
        'Lead Capture & Automatic CRM Routing',
        'Automated Customer Follow-Up Sequences',
        'Business Process & Notification Automation',
        'Custom AI Workflow & Integration Solutions',
      ],
    },
  ];

  const filteredServices =
    activeTab === 'all'
      ? servicesCatalog
      : servicesCatalog.filter((s) => s.category === activeTab);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: 'var(--bg-black)', color: 'var(--text-white)', overflowX: 'hidden' }}>

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
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#0d3899', border: '1px solid rgba(59, 130, 246, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <img src="/gda_logo.png" alt="GDAs Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <span style={{ fontWeight: 800, fontSize: '19px', color: 'var(--text-white)', letterSpacing: '-0.02em' }}>GDAs</span>
          </Link>

          <nav style={{ display: 'flex', alignItems: 'center', gap: '26px' }} className="desktop-nav">
            <Link href="/" style={{ fontSize: '13.5px', fontWeight: 500, color: '#a3a3a3', textDecoration: 'none' }}>Home</Link>
            <Link href="/about" style={{ fontSize: '13.5px', fontWeight: 500, color: '#a3a3a3', textDecoration: 'none' }}>About</Link>
            <Link href="/services" style={{ fontSize: '13.5px', fontWeight: 600, color: '#3b82f6', textDecoration: 'none' }}>Services</Link>
            <a href="#process" style={{ fontSize: '13.5px', fontWeight: 500, color: '#a3a3a3', textDecoration: 'none' }}>Our Process</a>
            <a href="#who-we-serve" style={{ fontSize: '13.5px', fontWeight: 500, color: '#a3a3a3', textDecoration: 'none' }}>Who We Serve</a>
            <Link href="/training" style={{ fontSize: '13.5px', fontWeight: 500, color: '#a3a3a3', textDecoration: 'none' }}>Training</Link>
            <Link href="/blog" style={{ fontSize: '13.5px', fontWeight: 500, color: '#a3a3a3', textDecoration: 'none' }}>Blog</Link>
            <Link href="/careers" style={{ fontSize: '13.5px', fontWeight: 500, color: '#a3a3a3', textDecoration: 'none' }}>Careers</Link>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ThemeToggle />
            <button
              onClick={() => openServiceModal('Complete Digital Growth Suite')}
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
              style={{ marginTop: '10px', padding: '22px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}
            >
              <Link href="/" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none' }}>About GDAs</Link>
              <Link href="/services" onClick={() => setMobileMenuOpen(false)} style={{ color: '#3b82f6', fontWeight: 600, textDecoration: 'none' }}>All Services</Link>
              <a href="#process" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none' }}>Growth Process</a>
              <a href="#who-we-serve" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none' }}>Who We Serve</a>
              <Link href="/training" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none' }}>Training Hub</Link>
              <Link href="/blog" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none' }}>Blog</Link>
              <Link href="/careers" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none' }}>Careers</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ========================================================================= */}
      {/* 01. SERVICES HERO SECTION */}
      {/* ========================================================================= */}
      <section style={{ paddingTop: '160px', paddingBottom: '60px', position: 'relative' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
            {/* Small Eyebrow */}
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
                  Our Services
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
                marginBottom: '14px',
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
                All Digital Solutions.
              </span>
            </motion.h1>

            {/* Subheading / Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.25 }}
              style={{
                fontSize: 'clamp(18px, 2.4vw, 24px)',
                fontWeight: 700,
                color: '#93c5fd',
                marginBottom: '20px',
              }}
            >
              Digital Marketing • Branding • Technology • Automation
            </motion.div>

            {/* Narrative Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.35 }}
              style={{
                fontSize: '16px',
                color: '#cbd5e1',
                lineHeight: 1.7,
                marginBottom: '16px',
              }}
            >
              Ganesha Digital Ads (GDAs) is a <strong>Digital Marketing Agency</strong> providing complete digital solutions to help businesses build their brand, reach the right audience, generate leads and grow online.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.45 }}
              style={{
                fontSize: '15px',
                color: '#94a3b8',
                lineHeight: 1.7,
                marginBottom: '32px',
              }}
            >
              From <strong>Meta & Google Ads, SEO, GMB Setup & Ranking, Social Media & Political Campaigns to IVR Calling, WhatsApp Bulk Marketing, Branding, Website Development, and CRM/ERP Automation</strong>, we bring essential digital services together under one platform.
            </motion.p>

            {/* Quick Filter Tabs */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                flexWrap: 'wrap',
              }}
            >
              {[
                { key: 'all', label: 'All Solutions (14)' },
                { key: 'marketing', label: 'Meta & Google Ads' },
                { key: 'automation', label: 'IVR, WhatsApp Bulk & Auto' },
                { key: 'seo', label: 'SEO & GMB Ranking' },
                { key: 'social', label: 'Social Media & Political' },
                { key: 'branding', label: 'Branding & Creative' },
                { key: 'tech', label: 'Websites & CRM/ERP' },
                { key: 'strategy', label: 'Business Growth Management' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '50px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: '1px solid',
                    borderColor: activeTab === tab.key ? '#3b82f6' : 'rgba(255, 255, 255, 0.1)',
                    background: activeTab === tab.key ? '#2563eb' : 'rgba(255, 255, 255, 0.03)',
                    color: activeTab === tab.key ? '#ffffff' : '#a3a3a3',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02. DETAILED SERVICES CATALOG (All 14 Core Offerings) */}
      {/* ========================================================================= */}
      <section style={{ padding: '40px 0 80px 0', position: 'relative' }}>
        <div className="container-custom">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '28px',
            }}
          >
            {filteredServices.map((srv, idx) => (
              <motion.div
                key={srv.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
                className="glass-card service-card"
                style={{
                  padding: '34px 28px',
                  borderRadius: '26px',
                  background: 'rgba(12, 12, 12, 0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.09)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                }}
              >
                <div>
                  {/* Top Bar */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: srv.color, letterSpacing: '0.08em' }}>
                      {srv.num}
                    </span>
                    <div
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '14px',
                        background: `${srv.color}18`,
                        border: `1px solid ${srv.color}35`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                      }}
                    >
                      {srv.icon}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 style={{ fontSize: '21px', fontWeight: 800, color: 'var(--text-white)', marginBottom: '6px' }}>
                    {srv.title}
                  </h3>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: srv.color, marginBottom: '14px', lineHeight: 1.4 }}>
                    {srv.subTitle}
                  </div>

                  {/* Description */}
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                    {srv.desc}
                  </p>

                  {/* Value Prop Banner */}
                  <div
                    style={{
                      background: 'var(--pill-bg)',
                      border: '1px solid var(--border-subtle)',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      color: srv.color,
                      marginBottom: '20px',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {srv.valueProp}
                  </div>

                  {/* Service Deliverables Checklist */}
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>
                      Key Features & Deliverables:
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {srv.items.map((item, iIdx) => (
                        <div key={iIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                          <span style={{ color: srv.color, fontWeight: 700 }}>✓</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Button */}
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '18px' }}>
                  <button
                    onClick={() => openServiceModal(srv.title)}
                    className="btn-primary"
                    style={{
                      width: '100%',
                      padding: '11px',
                      fontSize: '13.5px',
                      fontWeight: 700,
                      background: `linear-gradient(135deg, ${srv.color} 0%, #1d4ed8 100%)`,
                    }}
                  >
                    <span>Get Started with {srv.title}</span>
                    <span>→</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03. OUR DIGITAL GROWTH PROCESS (5 Steps) */}
      {/* ========================================================================= */}
      <section id="process" style={{ padding: '80px 0', background: '#050505', borderTop: '1px solid rgba(255, 255, 255, 0.08)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div className="container-custom">
          <div className="section-header">
            <div className="section-tag">Our Growth Framework</div>
            <h2 className="section-title">
              Our Digital <span className="serif-italic">Growth Process</span>
            </h2>
            <p className="section-subtitle" style={{ color: '#93c5fd', fontWeight: 600 }}>
              Strategy First. Execution Next. Growth Always.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
            }}
          >
            {[
              { step: '01', title: 'Understand', desc: 'We understand your business, target audience and goals thoroughly.', color: '#3b82f6' },
              { step: '02', title: 'Strategize', desc: 'We develop a customized Digital Marketing Strategy based on your business requirements.', color: '#8b5cf6' },
              { step: '03', title: 'Execute', desc: 'We implement the strategy through Digital Marketing, SEO, Branding, Advertising and Technology.', color: '#06b6d4' },
              { step: '04', title: 'Optimize', desc: 'We monitor performance and continuously improve campaigns and digital assets.', color: '#10b981' },
              { step: '05', title: 'Grow', desc: 'Our ultimate goal is to help your business achieve sustainable digital growth.', color: '#eab308' },
            ].map((p, idx) => (
              <motion.div
                key={p.step}
                whileHover={{ y: -6 }}
                className="glass-card"
                style={{
                  padding: '28px 22px',
                  borderRadius: '20px',
                  background: 'rgba(15, 15, 15, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div style={{ fontSize: '28px', fontWeight: 800, color: p.color, marginBottom: '10px' }}>
                  {p.step} —
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-white)', marginBottom: '8px' }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04. WHY CHOOSE GDAs? */}
      {/* ========================================================================= */}
      <section style={{ padding: '80px 0', position: 'relative' }}>
        <div className="container-custom">
          <div className="section-header">
            <div className="section-tag">Why Choose Us</div>
            <h2 className="section-title">
              Why Choose <span className="serif-italic">GDAs?</span>
            </h2>
            <p className="section-subtitle">
              Your Dedicated Digital Growth Partner
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
            }}
          >
            {[
              {
                title: 'Complete Digital Solutions',
                desc: 'Digital Marketing, SEO, GMB, IVR, WhatsApp Bulk, Branding, Websites, and CRM/ERP Automation under one platform.',
                icon: '⚡',
              },
              {
                title: 'Business-Focused Strategy',
                desc: 'We build tailored strategies around your specific business goals, unit economics, and target audience.',
                icon: '🎯',
              },
              {
                title: 'Performance & Creativity',
                desc: 'We seamlessly combine memorable creative branding with performance-focused digital marketing and lead conversion.',
                icon: '💡',
              },
              {
                title: 'Modern Technology',
                desc: 'AI, WhatsApp automation, IVR calling, and cloud ERP/CRM tools implemented where they create real, measurable business value.',
                icon: '🤖',
              },
              {
                title: 'Long-Term Growth',
                desc: 'Our focus is not just on individual campaigns — it is on building enduring, long-term digital asset value for your brand.',
                icon: '🤝',
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="glass-card"
                style={{
                  padding: '28px 24px',
                  borderRadius: '20px',
                  background: 'rgba(15, 15, 15, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div style={{ fontSize: '30px', marginBottom: '14px' }}>{card.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-white)', marginBottom: '8px' }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05. WHO WE SERVE */}
      {/* ========================================================================= */}
      <section id="who-we-serve" style={{ padding: '70px 0', background: '#060606', borderTop: '1px solid rgba(255, 255, 255, 0.08)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div className="container-custom">
          <div className="section-header">
            <div className="section-tag">Audience & Sectors</div>
            <h2 className="section-title">
              Who We <span className="serif-italic">Serve</span>
            </h2>
            <p className="section-subtitle">
              Our Digital Marketing & Automation Services are built to accelerate businesses of all scales and sectors.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '14px',
              maxWidth: '900px',
              margin: '0 auto',
            }}
          >
            {[
              { label: 'Startups', emoji: '🚀' },
              { label: 'Local Businesses', emoji: '📍' },
              { label: 'Service Businesses', emoji: '🛠️' },
              { label: 'E-commerce Businesses', emoji: '🛍️' },
              { label: 'Political Candidates & Parties', emoji: '🗳️' },
              { label: 'Professionals & Doctors', emoji: '💼' },
              { label: 'Personal Brands', emoji: '🌟' },
              { label: 'Small & Medium Enterprises (SMEs)', emoji: '🏢' },
              { label: 'High-Growth Brands', emoji: '📈' },
            ].map((niche, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 22px',
                  borderRadius: '50px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  color: 'var(--text-white)',
                  fontSize: '15px',
                  fontWeight: 600,
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)',
                }}
              >
                <span>{niche.emoji}</span>
                <span>{niche.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 06. FINAL CTA — LET'S GROW YOUR BUSINESS DIGITALLY */}
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
              Let's Grow Your Business Digitally
            </div>

            <h2
              style={{
                fontSize: 'clamp(30px, 4.4vw, 50px)',
                fontWeight: 800,
                color: 'var(--text-white)',
                lineHeight: 1.15,
                marginBottom: '16px',
                letterSpacing: '-0.02em',
              }}
            >
              Looking for a{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Digital Marketing Agency?
              </span>
            </h2>

            <p
              style={{
                fontSize: '16px',
                color: '#cbd5e1',
                lineHeight: 1.7,
                maxWidth: '720px',
                margin: '0 auto 20px auto',
              }}
            >
              Whether you need <strong>Meta Ads, Google Ads, IVR Calling, WhatsApp Bulk Marketing, GMB Ranking, Political Campaigns, Business Growth Management, CRM/ERP Automation, Branding or Website Development</strong>, GDAs is here to help you build a stronger digital presence.
            </p>

            <div style={{ fontSize: '18px', fontWeight: 700, color: '#93c5fd', marginBottom: '32px' }}>
              One Platform. All Solutions. • Digital Ka Saath, Aapke Business Ka Vikas.
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <button
                onClick={() => openServiceModal('Complete All-in-One Solution')}
                className="btn-primary"
                style={{ padding: '14px 36px', fontSize: '15.5px', fontWeight: 700 }}
              >
                <span>Talk to GDAs →</span>
              </button>

              <a
                href="https://wa.me/919939862765?text=Hello%20GDAs%20Team%2C%20I%20want%20to%20discuss%20services%20for%20my%20business"
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
                <span style={{ fontWeight: 800, fontSize: '18px', color: 'var(--text-white)' }}>GDAs</span>
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
                GANESHA DIGITAL ADS
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                Digital Ka Saath, Aapke Business Ka Vikas.
              </p>
              <p style={{ fontSize: '12.5px', color: 'var(--text-dim)' }}>
                Built with a Vision. Driven by a Legacy. Father Never Dies.
              </p>
            </div>

            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-white)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
                Quick Links
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
                <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Home</Link>
                <Link href="/about" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>About</Link>
                <Link href="/services" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 600 }}>Services</Link>
                <Link href="/training" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Training</Link>
                <Link href="/blog" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Blog</Link>
                <Link href="/careers" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Careers</Link>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-white)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
                Contact & Connect
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', marginBottom: '16px' }}>
                <a href="tel:9939862765" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>📞 +91 9939862765</a>
              </div>
              <SocialLinks />
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', fontSize: '13px', color: '#737373' }}>
            <div>© 2026 GDAs Ganesha Digital Ads. All Rights Reserved.</div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Link href="/privacy-policy" style={{ color: '#737373', textDecoration: 'none' }}>Privacy Policy</Link>
              <Link href="/terms-conditions" style={{ color: '#737373', textDecoration: 'none' }}>Terms & Conditions</Link>
              <Link href="/refund-policy" style={{ color: '#737373', textDecoration: 'none' }}>Refund Policy</Link>
              <Link href="/disclaimer" style={{ color: '#737373', textDecoration: 'none' }}>Disclaimer</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* SERVICE CONSULTATION MODAL */}
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
                  Grow With GDAs
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-white)', marginTop: '4px' }}>
                  {selectedServiceForModal}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Tell us about your business goals and get a custom strategy tailored for you.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', background: 'var(--bg-card)', border: '1px solid var(--border-medium)', borderRadius: '10px', color: 'var(--text-white)', fontSize: '14px', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>Phone / WhatsApp *</label>
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
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>Business Type / Industry / Constituency</label>
                  <input
                    type="text"
                    placeholder="e.g. Retail, Real Estate, Healthcare, D2C, Political, Local Business"
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', background: '#141414', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', color: '#fff', fontSize: '14px', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>Service Selected</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', background: '#141414', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', color: '#fff', fontSize: '14px', outline: 'none' }}
                  >
                    <option value="Digital Marketing Services">Digital Marketing (Meta, Google, Lead Gen)</option>
                    <option value="Meta Ads Services">Meta Ads (Facebook & Instagram Advertising)</option>
                    <option value="Google Ads Services">Google Ads (Search & Performance Ads)</option>
                    <option value="IVR Calling Service">IVR Calling Service (Smart OBD & Voice Broadcasting)</option>
                    <option value="WhatsApp Bulk Marketing">WhatsApp Bulk Marketing (Official API & Broadcasts)</option>
                    <option value="GMB Setup & Ranking">GMB Setup & Local Google Maps Ranking</option>
                    <option value="Digital Political Campaigning">Digital Political Campaigning (War Room & Geo Ads)</option>
                    <option value="Business Growth Management">Business Growth Management (Strategic Scale & GTM)</option>
                    <option value="CRM, ERP & Business Automation">CRM, ERP & Business Process Automation</option>
                    <option value="SEO Services">SEO Services (Organic & Technical SEO)</option>
                    <option value="Social Media Marketing">Social Media Marketing & Viral Reels</option>
                    <option value="Branding & Creative Services">Branding & Creative Design (Logo, Visuals)</option>
                    <option value="Website Development">Website Development (Next.js & Funnels)</option>
                    <option value="AI & Business Automation">AI & Workflow Solutions</option>
                    <option value="Complete All-in-One Growth Suite">Complete All-in-One Growth Suite</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>Message or Goals (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Describe your targets and requirements..."
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
