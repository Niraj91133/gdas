'use client';

import React from 'react';
import Link from 'next/link';
import ThemeToggle from '../../components/ThemeToggle';

export default function TermsConditionsPage() {
  return (
    <div style={{ minHeight: '100vh', padding: '120px 20px 60px 20px', color: 'var(--text-white)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <Link href="/" style={{ color: 'var(--text-accent)', textDecoration: 'none', fontSize: '14px', fontWeight: 700 }}>← Back to GDAs Home</Link>
          <ThemeToggle />
        </div>
        <h1 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '8px', color: 'var(--text-white)' }}>Terms & Conditions</h1>
        <p style={{ color: 'var(--text-dim)', fontSize: '13px', marginBottom: '30px' }}>Last updated: October 2026</p>

        <div style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.75, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-white)', marginBottom: '10px' }}>1. Agreement to Terms</h2>
            <p>By accessing or utilizing the website, digital consulting services, training materials, or resources provided by GDAs (Ganesha Digital Ads), you agree to comply with and be bound by these Terms and Conditions.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-white)', marginBottom: '10px' }}>2. Intellectual Property Rights</h2>
            <p>All frameworks, ad creatives, training curricula, graphics, code, and brand marks created by GDAs remain the intellectual property of GDAs unless explicitly assigned under formal client agreements.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-white)', marginBottom: '10px' }}>3. Client Obligations & Ad Spend</h2>
            <p>Clients remain solely responsible for ad spend billed directly by advertising platforms (Meta Ads, Google Ads) and ensuring their products, services, and websites comply with platform advertising guidelines.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-white)', marginBottom: '10px' }}>4. Governing Law</h2>
            <p>These terms shall be governed by and construed in accordance with the laws of India. For any inquiries, please contact us at <strong>ganeshadigiads@gmail.com</strong>.</p>
          </section>
        </div>

        <div style={{ marginTop: '50px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-dim)' }}>
          <span>© {new Date().getFullYear()} GDAs (Ganesha Digital Ads).</span>
          <Link href="/disclaimer" style={{ color: 'var(--text-accent)', textDecoration: 'none', fontWeight: 600 }}>Disclaimer →</Link>
        </div>
      </div>
    </div>
  );
}
