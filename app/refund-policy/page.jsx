'use client';

import React from 'react';
import Link from 'next/link';
import ThemeToggle from '../../components/ThemeToggle';

export default function RefundPolicyPage() {
  return (
    <div style={{ minHeight: '100vh', padding: '120px 20px 60px 20px', color: 'var(--text-white)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <Link href="/" style={{ color: 'var(--text-accent)', textDecoration: 'none', fontSize: '14px', fontWeight: 700 }}>← Back to GDAs Home</Link>
          <ThemeToggle />
        </div>
        <h1 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '8px', color: 'var(--text-white)' }}>Refund & Cancellation Policy</h1>
        <p style={{ color: 'var(--text-dim)', fontSize: '13px', marginBottom: '30px' }}>Last updated: October 2026</p>

        <div style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.75, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-white)', marginBottom: '10px' }}>1. Agency Services Retainers</h2>
            <p>GDAs operates as a dedicated growth agency. Monthly agency management retainers and setup fees cover dedicated strategy, media buying, creative production, and technical execution allocated to your campaigns. Retainer fees are non-refundable once campaign sprints commence for the billing period.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-white)', marginBottom: '10px' }}>2. Training Course 14-Day Money-Back Guarantee</h2>
            <p>For our practical digital marketing training cohorts, students are entitled to a 100% refund if requested within 14 days of cohort commencement, provided they have attended the scheduled live orientation sessions and submitted initial workshop assignments.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-white)', marginBottom: '10px' }}>3. How to Request a Refund</h2>
            <p>To initiate a refund for training or inquire about billing adjustments, email our finance team at <strong>ganeshadigiads@gmail.com</strong> with your invoice number and registration details. Approved refunds are processed within 5-7 business days to the original payment method.</p>
          </section>
        </div>

        <div style={{ marginTop: '50px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-dim)' }}>
          <span>© {new Date().getFullYear()} GDAs (Ganesha Digital Ads).</span>
          <Link href="/privacy-policy" style={{ color: 'var(--text-accent)', textDecoration: 'none', fontWeight: 600 }}>Privacy Policy →</Link>
        </div>
      </div>
    </div>
  );
}
