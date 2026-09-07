'use client';

import React from 'react';
import Link from 'next/link';

export default function RefundPolicyPage() {
  return (
    <div style={{ backgroundColor: '#000000', color: '#ffffff', minHeight: '100vh', padding: '120px 20px 60px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Link href="/" style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>← Back to GDAs Home</Link>
        <h1 style={{ fontSize: '36px', fontWeight: 800, marginTop: '20px', marginBottom: '8px' }}>Refund & Cancellation Policy</h1>
        <p style={{ color: '#888', fontSize: '13px', marginBottom: '30px' }}>Last updated: September 2026</p>

        <div style={{ color: '#bbb', fontSize: '15px', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>1. Agency Services Retainers</h2>
            <p>GDAs operates as a bespoke performance growth agency. Monthly agency management retainers and setup fees cover dedicated media buying, creative production, and engineering hours allocated to your account. Retainer fees are non-refundable once media buying or creative sprints commence for the billing period.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>2. Training Course 14-Day Money-Back Guarantee</h2>
            <p>For our Performance Digital Marketing Training cohorts, students are entitled to a 100% no-questions-asked refund if requested within 14 days of cohort commencement, provided they have attended the scheduled live orientation sessions and submitted initial workshop assignments.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>3. How to Request a Refund</h2>
            <p>To initiate a refund for training or inquire about billing adjustments, email our finance team at <strong>contact@ganeshadigiads.in</strong> with your invoice number and registration details. Approved refunds are processed within 5-7 business days to the original payment method.</p>
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
