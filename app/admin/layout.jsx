'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAdmin } from '../../context/AdminContext';
import ThemeToggle from '../../components/ThemeToggle';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoaded, isAuthenticated, adminUser, logout, overduePayments, upcomingFollowUps } = useAdmin();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Authentication check
  useEffect(() => {
    if (isLoaded && !isAuthenticated && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [isLoaded, isAuthenticated, pathname, router]);

  // If on login page, render children directly without sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (!isLoaded || !isAuthenticated) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#050505',
          color: '#60a5fa',
          fontSize: '16px',
          fontWeight: 600,
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '36px', marginBottom: '12px', animation: 'spin 1s linear infinite' }}>⚙️</div>
          <div>Loading GDAs Admin Suite...</div>
        </div>
      </div>
    );
  }

  const navLinks = [
    { href: '/admin', label: 'Dashboard', icon: '📊', badge: null },
    { href: '/admin/clients', label: 'Client Management', icon: '👥', badge: null },
    { href: '/admin/leads', label: 'Leads & CRM', icon: '🎯', badge: upcomingFollowUps.length > 0 ? `${upcomingFollowUps.length}` : null, badgeColor: '#3b82f6' },
    { href: '/admin/invoices', label: 'Invoices & Billing', icon: '🧾', badge: overduePayments > 0 ? 'Overdue' : null, badgeColor: '#ef4444' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-black)' }}>
      {/* ========================================================= */}
      {/* DESKTOP SIDEBAR */}
      {/* ========================================================= */}
      <aside
        style={{
          width: '270px',
          flexShrink: 0,
          background: 'rgba(10, 10, 10, 0.95)',
          borderRight: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 40,
        }}
        className="admin-sidebar"
      >
        {/* Brand Header */}
        <div
          style={{
            padding: '24px 20px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'radial-gradient(circle, #1d4ed8 0%, #0a2566 100%)',
              border: '1.5px solid rgba(59, 130, 246, 0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 0 15px rgba(37, 99, 235, 0.4)',
            }}
          >
            <img src="/gda_logo.png" alt="GDAs Logo" style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-white)', letterSpacing: '-0.01em' }}>
              GDAs Admin
            </div>
            <div style={{ fontSize: '11px', color: '#60a5fa', fontWeight: 600 }}>
              Unified Operations
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div style={{ padding: '20px 14px', flex: 1, overflowY: 'auto' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 10px', marginBottom: '10px' }}>
            Main Menu
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {navLinks.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '11px 14px',
                    borderRadius: '12px',
                    fontSize: '13.5px',
                    fontWeight: active ? 700 : 500,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    background: active ? 'rgba(37, 99, 235, 0.15)' : 'transparent',
                    color: active ? '#60a5fa' : 'var(--text-secondary)',
                    border: active ? '1px solid rgba(37, 99, 235, 0.3)' : '1px solid transparent',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '16px' }}>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '20px',
                        background: item.badgeColor || '#3b82f6',
                        color: '#ffffff',
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 10px', marginTop: '28px', marginBottom: '10px' }}>
            Shortcuts
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <Link
              href="/"
              target="_blank"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: '10px',
                fontSize: '13px',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
              }}
            >
              <span>🌐</span>
              <span>Live Website</span>
            </Link>
          </div>
        </div>

        {/* User Profile & Logout */}
        <div
          style={{
            padding: '16px 14px',
            borderTop: '1px solid var(--border-subtle)',
            background: 'rgba(0, 0, 0, 0.2)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  border: '1.5px solid rgba(59, 130, 246, 0.5)',
                  flexShrink: 0,
                }}
              >
                <img
                  src={adminUser?.avatar || '/ram_gyan_award.jpg'}
                  alt="Admin"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-white)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  {adminUser?.name || 'Mr. Ram Gyan'}
                </div>
                <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>
                  ● Super Admin
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={logout}
              title="Sign Out"
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                color: '#ef4444',
                padding: '7px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* ========================================================= */}
      {/* MAIN CONTENT AREA */}
      {/* ========================================================= */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowX: 'hidden' }}>
        {/* Top Sticky Header */}
        <header
          style={{
            height: '64px',
            position: 'sticky',
            top: 0,
            zIndex: 30,
            background: 'rgba(10, 10, 10, 0.85)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          className="admin-header"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Mobile Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="mobile-toggle"
              style={{
                display: 'none',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-white)',
                padding: '7px 10px',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              ☰
            </button>

            {/* Breadcrumb / Page Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              <span style={{ color: 'var(--text-dim)' }}>GDAs Operations /</span>
              <span style={{ fontWeight: 700, color: 'var(--text-white)' }}>
                {pathname === '/admin' && 'Executive Dashboard'}
                {pathname === '/admin/clients' && 'Client Management'}
                {pathname === '/admin/leads' && 'Leads CRM Pipeline'}
                {pathname === '/admin/invoices' && 'Invoices & Billing'}
              </span>
            </div>
          </div>

          {/* Right Header Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Upcoming Follow-up Notification Bell */}
            <Link
              href="/admin/leads"
              style={{
                position: 'relative',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '50%',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-white)',
                textDecoration: 'none',
              }}
              title={`${upcomingFollowUps.length} upcoming lead follow-ups`}
            >
              <span>🔔</span>
              {upcomingFollowUps.length > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-2px',
                    right: '-2px',
                    background: '#3b82f6',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
                    fontSize: '10px',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {upcomingFollowUps.length}
                </span>
              )}
            </Link>

            <ThemeToggle />

            <Link
              href="/"
              target="_blank"
              className="btn-secondary"
              style={{ padding: '7px 14px', fontSize: '12.5px', textDecoration: 'none' }}
            >
              View Site ↗
            </Link>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main style={{ flex: 1, padding: '28px', maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
