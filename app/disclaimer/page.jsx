'use client';

import React from 'react';
import Link from 'next/link';
import ThemeToggle from '../../components/ThemeToggle';

export default function DisclaimerPage() {
  return (
    <div style={{ minHeight: '100vh', padding: '120px 20px 60px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <Link href="/" style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>← Back to GDAs Home</Link>
          <ThemeToggle />
        </div>
        <h1 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '8px' }}>Performance & Earnings Disclaimer</h1>
        <p style={{ color: '#888', fontSize: '13px', marginBottom: '30px' }}>Last updated: September 2026</p>

        <div style={{ color: '#bbb', fontSize: '15px', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>1. Case Studies & Client Results</h2>
            <p>Any revenue figures, ROAS multiples (e.g. 5.84x, $184,920+), or growth metrics showcased on this website are real results achieved for specific client campaigns and case studies. However, past performance does not guarantee future results. Digital ad performance depends on product market fit, creative angles, pricing, fulfillment, and market seasonality.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>2. Training & Educational Material</h2>
            <p>Our training courses provide practical frameworks and real agency workflows. We do not guarantee specific income, job offers, or sales numbers. Your personal success depends upon your work ethic, market execution, and dedication.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>3. Independent Agency Entity</h2>
            <p>GDAs (Ganesha Digital Ads) is an independent growth agency and training provider. We are not endorsed, sponsored, or directly affiliated with Meta Platforms Inc., Google LLC, TikTok Inc., or Shopify Inc.</p>
          </section>
        </div>

        <div style={{ marginTop: '50px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#666' }}>
          <span>© {new Date().getFullYear()} GDAs (Ganesha Digital Ads).</span>
          <Link href="/privacy-policy" style={{ color: '#3b82f6', textDecoration: 'none' }}>Privacy Policy →</Link>
        </div>
      </div>
    </div>
  );
}
