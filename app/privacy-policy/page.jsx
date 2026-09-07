'use client';

import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div style={{ backgroundColor: '#000000', color: '#ffffff', minHeight: '100vh', padding: '120px 20px 60px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Link href="/" style={{ color: '#ff4533', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>← Back to GDAs Home</Link>
        <h1 style={{ fontSize: '36px', fontWeight: 800, marginTop: '20px', marginBottom: '8px' }}>Privacy Policy</h1>
        <p style={{ color: '#888', fontSize: '13px', marginBottom: '30px' }}>Last updated: September 2026</p>

        <div style={{ color: '#bbb', fontSize: '15px', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>1. Information We Collect</h2>
            <p>GDAs (Ganesha Digital Ads) collects information you provide directly to us when filling out audit request forms, demo class registrations, or career applications. This includes your name, business email address, website URL, phone number, and ad budget ranges.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>2. How We Use Your Data</h2>
            <p>We use your information exclusively to prepare growth strategy audits, provide customized media buying consultations, schedule live training demo sessions, and process job applications. We never sell or distribute your private contact details to third parties.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>3. Tracking & Cookies</h2>
            <p>Our website utilizes standard first-party performance tracking cookies to analyze site traffic, optimize load times, and measure campaign effectiveness through server-side CAPI protocols.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>4. Data Security & Contact</h2>
            <p>We maintain strict administrative and technical safeguards to secure your personal data. For privacy inquiries or data removal requests, contact us at <strong>contact@ganeshadigiads.in</strong>.</p>
          </section>
        </div>

        <div style={{ marginTop: '50px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#666' }}>
          <span>© {new Date().getFullYear()} GDAs (Ganesha Digital Ads).</span>
          <Link href="/terms-conditions" style={{ color: '#ff4533', textDecoration: 'none' }}>Terms & Conditions →</Link>
        </div>
      </div>
    </div>
  );
}
