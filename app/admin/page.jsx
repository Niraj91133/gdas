'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAdmin } from '../../context/AdminContext';
import {
  formatINR,
  MonthlyRevenueChart,
  ClientGrowthChart,
  InvoiceStatusChart,
  PaymentStatusChart,
  LeadConversionChart,
} from '../../components/AdminCharts';

export default function AdminDashboardPage() {
  const {
    adminUser,
    clients,
    leads,
    invoices,
    totalClients,
    activeClients,
    newLeads,
    totalRevenue,
    thisMonthRevenue,
    pendingPayments,
    overduePayments,
    pendingInvoices,
    upcomingFollowUps,
    convertLeadToClient,
    resetToSampleData,
  } = useAdmin();

  const [convertedToast, setConvertedToast] = useState('');

  const handleConvertLead = (leadId, leadName) => {
    const newClient = convertLeadToClient(leadId);
    if (newClient) {
      setConvertedToast(`🎉 Lead "${leadName}" successfully converted to Active Client (${newClient.id})!`);
      setTimeout(() => setConvertedToast(''), 4500);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* ========================================================= */}
      {/* 01. WELCOME HEADER & QUICK ACTIONS */}
      {/* ========================================================= */}
      <div
        className="glass-card"
        style={{
          padding: '28px 32px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.12) 0%, rgba(15, 15, 15, 0.95) 70%)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '50px', background: 'rgba(37, 99, 235, 0.15)', border: '1px solid rgba(59, 130, 246, 0.3)', marginBottom: '8px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#60a5fa' }}>GDAs Operations Live</span>
          </div>
          <h1 style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', fontWeight: 800, color: 'var(--text-white)', marginBottom: '4px' }}>
            Welcome back, {adminUser?.name || 'Mr. Ram Gyan'}!
          </h1>
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)' }}>
            Agency performance overview • {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Quick Launch Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <Link href="/admin/clients" className="btn-secondary" style={{ padding: '9px 16px', fontSize: '13px', textDecoration: 'none' }}>
            + Add Client
          </Link>
          <Link href="/admin/leads" className="btn-secondary" style={{ padding: '9px 16px', fontSize: '13px', textDecoration: 'none' }}>
            + New Lead
          </Link>
          <Link href="/admin/invoices" className="btn-primary" style={{ padding: '9px 18px', fontSize: '13px', textDecoration: 'none' }}>
            🧾 Create Invoice
          </Link>
        </div>
      </div>

      {convertedToast && (
        <div
          style={{
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            color: '#10b981',
            padding: '12px 18px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>{convertedToast}</span>
          <button type="button" onClick={() => setConvertedToast('')} style={{ background: 'none', border: 'none', color: '#10b981', cursor: 'pointer', fontWeight: 800 }}>✕</button>
        </div>
      )}

      {/* ========================================================= */}
      {/* 02. 8 KEY PERFORMANCE METRICS */}
      {/* ========================================================= */}
      <div>
        <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>
          Core Performance KPIs
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {/* Card 1: Total Revenue */}
          <div className="glass-card" style={{ padding: '22px', borderRadius: '18px', borderLeft: '4px solid #10b981' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)', fontWeight: 600 }}>Total Collected Revenue</span>
              <span style={{ fontSize: '18px' }}>💰</span>
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-white)', letterSpacing: '-0.02em', marginBottom: '4px' }}>
              {formatINR(totalRevenue)}
            </div>
            <div style={{ fontSize: '12px', color: '#10b981', fontWeight: 600 }}>
              ↑ All-time realized payments
            </div>
          </div>

          {/* Card 2: This Month Revenue */}
          <div className="glass-card" style={{ padding: '22px', borderRadius: '18px', borderLeft: '4px solid #3b82f6' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)', fontWeight: 600 }}>This Month (MTD)</span>
              <span style={{ fontSize: '18px' }}>📈</span>
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#60a5fa', letterSpacing: '-0.02em', marginBottom: '4px' }}>
              {formatINR(thisMonthRevenue)}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Current month collections
            </div>
          </div>

          {/* Card 3: Pending Payments */}
          <div className="glass-card" style={{ padding: '22px', borderRadius: '18px', borderLeft: '4px solid #f59e0b' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)', fontWeight: 600 }}>Pending Payments Due</span>
              <span style={{ fontSize: '18px' }}>⏳</span>
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#f59e0b', letterSpacing: '-0.02em', marginBottom: '4px' }}>
              {formatINR(pendingPayments)}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Across active client projects
            </div>
          </div>

          {/* Card 4: Overdue Payments */}
          <div className="glass-card" style={{ padding: '22px', borderRadius: '18px', borderLeft: '4px solid #ef4444' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)', fontWeight: 600 }}>Overdue Payments</span>
              <span style={{ fontSize: '18px' }}>🚨</span>
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#ef4444', letterSpacing: '-0.02em', marginBottom: '4px' }}>
              {formatINR(overduePayments)}
            </div>
            <div style={{ fontSize: '12px', color: overduePayments > 0 ? '#ef4444' : '#10b981', fontWeight: 600 }}>
              {overduePayments > 0 ? '⚠️ Immediate follow-up required' : '✓ No overdue balances'}
            </div>
          </div>

          {/* Card 5: Total Clients */}
          <div className="glass-card" style={{ padding: '22px', borderRadius: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)', fontWeight: 600 }}>Total Clients</span>
              <span style={{ fontSize: '18px' }}>👥</span>
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-white)', letterSpacing: '-0.02em', marginBottom: '4px' }}>
              {totalClients}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              {activeClients} Active • {totalClients - activeClients} Completed/Other
            </div>
          </div>

          {/* Card 6: Active Clients */}
          <div className="glass-card" style={{ padding: '22px', borderRadius: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)', fontWeight: 600 }}>Active Retainers</span>
              <span style={{ fontSize: '18px' }}>⚡</span>
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#10b981', letterSpacing: '-0.02em', marginBottom: '4px' }}>
              {activeClients}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Monthly ongoing digital projects
            </div>
          </div>

          {/* Card 7: New Leads */}
          <div className="glass-card" style={{ padding: '22px', borderRadius: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)', fontWeight: 600 }}>Inbound CRM Leads</span>
              <span style={{ fontSize: '18px' }}>🎯</span>
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#60a5fa', letterSpacing: '-0.02em', marginBottom: '4px' }}>
              {newLeads}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              {leads.length} Total Leads in pipeline
            </div>
          </div>

          {/* Card 8: Pending Invoices */}
          <div className="glass-card" style={{ padding: '22px', borderRadius: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)', fontWeight: 600 }}>Pending Invoices</span>
              <span style={{ fontSize: '18px' }}>📑</span>
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-white)', letterSpacing: '-0.02em', marginBottom: '4px' }}>
              {pendingInvoices}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              {invoices.length} Total Invoices generated
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 03. INTERACTIVE CHARTS & ANALYTICS */}
      {/* ========================================================= */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '20px' }}>
        {/* Chart 1: Monthly Revenue */}
        <div className="glass-card" style={{ padding: '24px', borderRadius: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-white)' }}>
              📈 Monthly Revenue Growth (INR)
            </div>
            <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 700 }}>+38% vs Q4</span>
          </div>
          <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            Realized cash inflow across all retainer contracts
          </p>
          <MonthlyRevenueChart invoices={invoices} />
        </div>

        {/* Chart 2: Client Growth Trend */}
        <div className="glass-card" style={{ padding: '24px', borderRadius: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-white)' }}>
              👥 Client Portfolio Expansion
            </div>
            <span style={{ fontSize: '12px', color: '#60a5fa', fontWeight: 700 }}>Active Retention: 94%</span>
          </div>
          <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            Accumulated enterprise and local businesses partnered with GDAs
          </p>
          <ClientGrowthChart clients={clients} />
        </div>

        {/* Chart 3: Payment Status Distribution */}
        <div className="glass-card" style={{ padding: '24px', borderRadius: '20px' }}>
          <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-white)', marginBottom: '4px' }}>
            💳 Payment Status Distribution
          </div>
          <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
            Breakdown of collected funds vs pending & overdue balances
          </p>
          <PaymentStatusChart invoices={invoices} />
        </div>

        {/* Chart 4: Invoice Status Distribution */}
        <div className="glass-card" style={{ padding: '24px', borderRadius: '20px' }}>
          <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-white)', marginBottom: '4px' }}>
            🧾 Invoice Lifecycle Tracker
          </div>
          <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
            Status of all issued billing records
          </p>
          <InvoiceStatusChart invoices={invoices} />
        </div>

        {/* Chart 5: Lead Conversion Funnel (Full Width or 2-col) */}
        <div className="glass-card" style={{ padding: '24px', borderRadius: '20px' }}>
          <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-white)', marginBottom: '4px' }}>
            🎯 Lead Conversion Funnel
          </div>
          <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
            CRM inquiry progression from first touch to signed contract
          </p>
          <LeadConversionChart leads={leads} />
        </div>
      </div>

      {/* ========================================================= */}
      {/* 04. UPCOMING FOLLOW-UPS & CLIENT OVERVIEW */}
      {/* ========================================================= */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        {/* Upcoming CRM Follow-ups */}
        <div className="glass-card" style={{ padding: '24px', borderRadius: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-white)' }}>
                ⏰ Upcoming CRM Follow-ups
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                High-intent prospects awaiting consultation
              </div>
            </div>
            <Link href="/admin/leads" style={{ fontSize: '12.5px', color: '#60a5fa', textDecoration: 'none', fontWeight: 600 }}>
              View Pipeline →
            </Link>
          </div>

          {upcomingFollowUps.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--text-secondary)', fontSize: '13px' }}>
              ✓ All follow-up actions up to date!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {upcomingFollowUps.slice(0, 4).map((lead) => (
                <div
                  key={lead.id}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '10px',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-white)' }}>
                      {lead.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#60a5fa', fontWeight: 600 }}>
                      {lead.businessName} • {lead.requiredService}
                    </div>
                    <div style={{ fontSize: '11px', color: '#f59e0b', marginTop: '3px' }}>
                      📅 Due: {lead.followUpDate ? new Date(lead.followUpDate).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }) : 'Pending scheduling'}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <a
                      href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${lead.name}, this is Ram Gyan from GDAs regarding your inquiry for ${lead.requiredService}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                      style={{ padding: '6px 12px', fontSize: '11.5px', textDecoration: 'none' }}
                    >
                      💬 WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => handleConvertLead(lead.id, lead.name)}
                      className="btn-primary"
                      style={{ padding: '6px 12px', fontSize: '11.5px' }}
                    >
                      🚀 Convert
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Active Clients Strip */}
        <div className="glass-card" style={{ padding: '24px', borderRadius: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-white)' }}>
                👥 Client Portfolio Snapshot
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Current contracts & payment milestones
              </div>
            </div>
            <Link href="/admin/clients" style={{ fontSize: '12.5px', color: '#60a5fa', textDecoration: 'none', fontWeight: 600 }}>
              Manage All →
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {clients.slice(0, 4).map((client) => (
              <div
                key={client.id}
                style={{
                  padding: '14px 16px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '10px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-white)' }}>
                      {client.businessName}
                    </span>
                    <span
                      style={{
                        fontSize: '10.5px',
                        padding: '2px 8px',
                        borderRadius: '20px',
                        background: client.status === 'Active' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(100, 116, 139, 0.15)',
                        color: client.status === 'Active' ? '#10b981' : '#94a3b8',
                        fontWeight: 700,
                      }}
                    >
                      {client.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Contact: {client.name} • {client.phone}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-white)' }}>
                    {formatINR(client.totalProjectValue)}
                  </div>
                  <div style={{ fontSize: '11px', color: client.pendingAmount > 0 ? '#f59e0b' : '#10b981', fontWeight: 600 }}>
                    {client.pendingAmount > 0 ? `₹${(client.pendingAmount / 1000).toFixed(0)}k Due` : '✓ Fully Paid'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 05. DATA UTILITIES (Reset Sample Data) */}
      {/* ========================================================= */}
      <div
        style={{
          padding: '16px 20px',
          borderRadius: '14px',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
          💾 All changes are automatically persisted to local browser storage.
        </div>
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Reset all clients, leads and invoices back to initial GDAs sample dataset?')) {
              resetToSampleData();
            }
          }}
          style={{
            background: 'none',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-dim)',
            padding: '6px 14px',
            borderRadius: '8px',
            fontSize: '12px',
            cursor: 'pointer',
          }}
        >
          🔄 Reset to Initial Sample Data
        </button>
      </div>
    </div>
  );
}
