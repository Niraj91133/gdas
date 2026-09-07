'use client';

import React from 'react';
import Link from 'next/link';

export default function TermsConditionsPage() {
  return (
    <div style={{ backgroundColor: '#000000', color: '#ffffff', minHeight: '100vh', padding: '120px 20px 60px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Link href="/" style={{ color: '#ff4533', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>← Back to GDAs Home</Link>
        <h1 style={{ fontSize: '36px', fontWeight: 800, marginTop: '20px', marginBottom: '8px' }}>Terms & Conditions</h1>
        <p style={{ color: '#888', fontSize: '13px', marginBottom: '30px' }}>Last updated: September 2026</p>

        <div style={{ color: '#bbb', fontSize: '15px', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>1. Agreement to Terms</h2>
            <p>By accessing or utilizing the website, digital consulting services, training materials, or resources provided by GDAs (Ganesha Digital Ads), you agree to comply with and be bound by these Terms and Conditions.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>2. Intellectual Property Rights</h2>
            <p>All video frameworks, ad templates, training curricula, graphics, code, and brand marks created by GDAs remain the intellectual property of GDAs unless explicitly assigned under formal client agency master service agreements (MSAs).</p>
          </section>

          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>3. Client Obligations & Ad Spend</h2>
            <p>Clients remain solely responsible for ad spend billed directly by advertising platforms (Meta Ads, Google Ads, TikTok Ads) and ensuring their products and landing pages comply with platform advertising guidelines.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>4. Governing Law</h2>
            <p>These terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles. Inquiries can be directed to <strong>contact@ganeshadigiads.in</strong>.</p>
          </section>
        </div>

        <div style={{ marginTop: '50px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#666' }}>
          <span>© {new Date().getFullYear()} GDAs (Ganesha Digital Ads).</span>
          <Link href="/disclaimer" style={{ color: '#ff4533', textDecoration: 'none' }}>Disclaimer →</Link>
        </div>
      </div>
    </div>
  );
}
