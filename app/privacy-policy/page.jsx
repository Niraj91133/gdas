'use client';

import React from 'react';
import Link from 'next/link';
import ThemeToggle from '../../components/ThemeToggle';

export default function PrivacyPolicyPage() {
  return (
    <div style={{ minHeight: '100vh', padding: '120px 20px 60px 20px', color: 'var(--text-white)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <Link href="/" style={{ color: 'var(--text-accent)', textDecoration: 'none', fontSize: '14px', fontWeight: 700 }}>← Back to GDAs Home</Link>
          <ThemeToggle />
        </div>
        <h1 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '8px', color: 'var(--text-white)' }}>Privacy Policy</h1>
        <p style={{ color: 'var(--text-dim)', fontSize: '13px', marginBottom: '30px' }}>Last updated: October 2026</p>

        <div style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.75, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-white)', marginBottom: '10px' }}>1. Information We Collect</h2>
            <p>GDAs (Ganesha Digital Ads) collects information you provide directly to us when requesting a consultation, submitting an inquiry, registering for practical training programs, or submitting a career application. This includes your name, business email address, website/business name, phone number, and service requirements.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-white)', marginBottom: '10px' }}>2. How We Use Your Data</h2>
            <p>We use your information exclusively to prepare growth strategy audits, provide customized media buying and digital marketing proposals, schedule live training orientation sessions, and communicate with you. We never sell, rent, or distribute your private contact details to third parties.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-white)', marginBottom: '10px' }}>3. Tracking & Cookies</h2>
            <p>Our website utilizes standard first-party performance tracking cookies to analyze site traffic, optimize user experience, and measure campaign effectiveness.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-white)', marginBottom: '10px' }}>4. Data Security & Contact</h2>
            <p>We maintain strict administrative and technical safeguards to secure your personal data. For privacy inquiries, please contact us at <strong>ganeshadigiads@gmail.com</strong>.</p>
          </section>
        </div>

        <div style={{ marginTop: '50px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-dim)' }}>
          <span>© {new Date().getFullYear()} GDAs (Ganesha Digital Ads).</span>
          <Link href="/terms-conditions" style={{ color: 'var(--text-accent)', textDecoration: 'none', fontWeight: 600 }}>Terms & Conditions →</Link>
        </div>
      </div>
    </div>
  );
}
