'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAdmin } from '../../../context/AdminContext';
import ThemeToggle from '../../../components/ThemeToggle';

export default function AdminLoginPage() {
  const router = useRouter();
  const { isAuthenticated, login } = useAdmin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const result = login(username.trim(), password.trim());
      if (result.success) {
        router.push('/admin');
      } else {
        setError(result.message || 'Invalid credentials.');
        setLoading(false);
      }
    }, 400);
  };

  const handleQuickDemo = () => {
    setUsername('admin');
    setPassword('gdas@2026');
    setError('');
    setLoading(true);
    setTimeout(() => {
      login('admin', 'gdas@2026');
      router.push('/admin');
    }, 300);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        position: 'relative',
        background: 'radial-gradient(ellipse at top center, rgba(37, 99, 235, 0.15) 0%, rgba(5, 5, 5, 0.98) 70%)',
      }}
    >
      {/* Top Utility Bar */}
      <div
        style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
          right: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#60a5fa',
            textDecoration: 'none',
            fontSize: '13.5px',
            fontWeight: 600,
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '8px 16px',
            borderRadius: '50px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(8px)',
          }}
        >
          ← Back to GDAs Website
        </Link>
        <ThemeToggle />
      </div>

      {/* Login Box */}
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '40px 32px',
          borderRadius: '24px',
          background: 'rgba(15, 15, 15, 0.85)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(37, 99, 235, 0.2)',
          backdropFilter: 'blur(20px)',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Logo & Emblem */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '18px',
            background: 'radial-gradient(circle, #1d4ed8 0%, #0a2566 100%)',
            border: '2px solid rgba(59, 130, 246, 0.6)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 25px rgba(37, 99, 235, 0.5)',
            marginBottom: '16px',
          }}
        >
          <img
            src="/gda_logo.png"
            alt="GDAs Logo"
            style={{ width: '80%', height: '80%', objectFit: 'contain' }}
          />
        </div>

        <div style={{ display: 'inline-block', fontSize: '11px', fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
          Internal Agency Portal
        </div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-white)', marginBottom: '6px' }}>
          GDAs Admin Suite
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '26px' }}>
          Manage Clients, Leads CRM, Invoices & Growth Metrics
        </p>

        {error && (
          <div
            style={{
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              color: '#ef4444',
              padding: '10px 14px',
              borderRadius: '10px',
              fontSize: '13px',
              marginBottom: '20px',
              textAlign: 'left',
            }}
          >
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Admin Username / Email
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin or ramgyan@gdas.in"
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: 'var(--text-white)',
                fontSize: '14px',
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Password / Master PIN
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: 'var(--text-white)',
                fontSize: '14px',
                outline: 'none',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{
              width: '100%',
              padding: '13px',
              fontSize: '14.5px',
              fontWeight: 700,
              borderRadius: '12px',
              marginTop: '8px',
              cursor: loading ? 'wait' : 'pointer',
            }}
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard →'}
          </button>
        </form>

        {/* 1-Click Quick Demo Login Pill */}
        <div style={{ marginTop: '22px', paddingTop: '18px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <button
            type="button"
            onClick={handleQuickDemo}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '10px',
              background: 'rgba(37, 99, 235, 0.1)',
              border: '1px solid rgba(37, 99, 235, 0.3)',
              color: '#60a5fa',
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            ⚡ 1-Click Demo Login (admin / gdas@2026)
          </button>
        </div>

        <div style={{ marginTop: '16px', fontSize: '11.5px', color: 'var(--text-dim)' }}>
          🔒 End-to-end encrypted session • GDAs proprietary system
        </div>
      </div>
    </div>
  );
}
