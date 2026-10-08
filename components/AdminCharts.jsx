'use client';

import React from 'react';

// Format Indian Currency
export const formatINR = (val) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val || 0);
};

// 1. Monthly Revenue Chart (Bar & Gradient Area)
export function MonthlyRevenueChart({ invoices = [] }) {
  const months = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];
  // Aggregated data
  const data = [
    { month: 'Nov', amount: 95000 },
    { month: 'Dec', amount: 140000 },
    { month: 'Jan', amount: 180000 },
    { month: 'Feb', amount: 220000 },
    { month: 'Mar', amount: 374400 },
    { month: 'Apr (MTD)', amount: 88500 },
  ];

  const maxVal = Math.max(...data.map((d) => d.amount), 400000);

  return (
    <div style={{ width: '100%', height: '220px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingTop: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '12px', height: '170px', paddingBottom: '10px', borderBottom: '1px solid var(--border-subtle)' }}>
        {data.map((item, idx) => {
          const heightPercent = Math.max(12, (item.amount / maxVal) * 100);
          const isCurrent = idx === data.length - 1;
          return (
            <div key={item.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: '8px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: isCurrent ? '#60a5fa' : 'var(--text-dim)', whiteSpace: 'nowrap' }}>
                ₹{(item.amount / 1000).toFixed(0)}k
              </div>
              <div
                style={{
                  width: '100%',
                  maxWidth: '36px',
                  height: `${heightPercent}%`,
                  borderRadius: '8px 8px 3px 3px',
                  background: isCurrent
                    ? 'linear-gradient(180deg, #60a5fa 0%, #2563eb 100%)'
                    : 'linear-gradient(180deg, rgba(37, 99, 235, 0.45) 0%, rgba(37, 99, 235, 0.15) 100%)',
                  border: isCurrent ? '1px solid #93c5fd' : '1px solid rgba(59, 130, 246, 0.3)',
                  transition: 'all 0.3s ease',
                  boxShadow: isCurrent ? '0 0 15px rgba(37, 99, 235, 0.5)' : 'none',
                }}
                title={`${item.month}: ${formatINR(item.amount)}`}
              />
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
        {data.map((item) => (
          <div key={item.month} style={{ flex: 1, textAlign: 'center', fontSize: '11.5px', color: 'var(--text-secondary)', fontWeight: 600 }}>
            {item.month}
          </div>
        ))}
      </div>
    </div>
  );
}

// 2. Client Growth Chart
export function ClientGrowthChart({ clients = [] }) {
  const data = [
    { period: 'Q3 2025', count: 18 },
    { period: 'Q4 2025', count: 29 },
    { period: 'Jan 2026', count: 36 },
    { period: 'Feb 2026', count: 44 },
    { period: 'Mar 2026', count: 52 },
    { period: 'Apr 2026', count: Math.max(55, clients.length + 50) },
  ];

  return (
    <div style={{ width: '100%', height: '220px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingTop: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '8px', height: '170px', paddingBottom: '10px', borderBottom: '1px solid var(--border-subtle)' }}>
        {data.map((item, idx) => {
          const heightPercent = (item.count / 65) * 100;
          return (
            <div key={item.period} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: '8px' }}>
              <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#10b981' }}>
                {item.count}+
              </div>
              <div
                style={{
                  width: '100%',
                  maxWidth: '32px',
                  height: `${heightPercent}%`,
                  borderRadius: '8px 8px 3px 3px',
                  background: 'linear-gradient(180deg, #10b981 0%, rgba(16, 185, 129, 0.25) 100%)',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                }}
              />
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
        {data.map((item) => (
          <div key={item.period} style={{ flex: 1, textAlign: 'center', fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>
            {item.period}
          </div>
        ))}
      </div>
    </div>
  );
}

// 3. Invoice Status Breakdown Chart
export function InvoiceStatusChart({ invoices = [] }) {
  const counts = {
    Paid: invoices.filter((i) => i.status === 'Paid').length,
    'Partially Paid': invoices.filter((i) => i.status === 'Partially Paid').length,
    Sent: invoices.filter((i) => i.status === 'Sent').length,
    Overdue: invoices.filter((i) => i.status === 'Overdue').length,
    Draft: invoices.filter((i) => i.status === 'Draft').length,
  };

  const total = Math.max(1, invoices.length);

  const colors = {
    Paid: '#10b981',
    'Partially Paid': '#3b82f6',
    Sent: '#f59e0b',
    Overdue: '#ef4444',
    Draft: '#64748b',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingTop: '10px' }}>
      {/* Progress Bar Multi-segments */}
      <div style={{ width: '100%', height: '14px', borderRadius: '50px', background: 'rgba(255,255,255,0.06)', display: 'flex', overflow: 'hidden' }}>
        {Object.entries(counts).map(([status, count]) => {
          const widthPct = (count / total) * 100;
          if (widthPct === 0) return null;
          return (
            <div
              key={status}
              style={{
                width: `${widthPct}%`,
                background: colors[status],
                height: '100%',
              }}
              title={`${status}: ${count} invoices (${widthPct.toFixed(0)}%)`}
            />
          );
        })}
      </div>

      {/* Legend & Breakdown Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '10px', marginTop: '6px' }}>
        {Object.entries(counts).map(([status, count]) => (
          <div
            key={status}
            style={{
              padding: '8px 10px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: colors[status] }} />
              <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>{status}</span>
            </div>
            <span style={{ fontSize: '12.5px', fontWeight: 800, color: 'var(--text-white)' }}>{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 4. Payment Status Distribution (Paid vs Pending vs Overdue)
export function PaymentStatusChart({ invoices = [] }) {
  const paid = invoices.filter((i) => i.status !== 'Cancelled').reduce((sum, i) => sum + (i.paidAmount || 0), 0);
  const pending = invoices.filter((i) => i.status === 'Sent' || i.status === 'Partially Paid').reduce((sum, i) => sum + (i.balanceDue || 0), 0);
  const overdue = invoices.filter((i) => i.status === 'Overdue').reduce((sum, i) => sum + (i.balanceDue || 0), 0);
  const grandTotal = Math.max(1, paid + pending + overdue);

  const paidPct = ((paid / grandTotal) * 100).toFixed(1);
  const pendingPct = ((pending / grandTotal) * 100).toFixed(1);
  const overduePct = ((overdue / grandTotal) * 100).toFixed(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingTop: '10px' }}>
      {/* Multi-tier bar */}
      <div style={{ width: '100%', height: '14px', borderRadius: '50px', background: 'rgba(255,255,255,0.06)', display: 'flex', overflow: 'hidden' }}>
        <div style={{ width: `${paidPct}%`, background: '#10b981' }} title={`Collected: ${formatINR(paid)}`} />
        <div style={{ width: `${pendingPct}%`, background: '#f59e0b' }} title={`Pending: ${formatINR(pending)}`} />
        <div style={{ width: `${overduePct}%`, background: '#ef4444' }} title={`Overdue: ${formatINR(overdue)}`} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
          <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 700 }}>Collected ({paidPct}%)</div>
          <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-white)', marginTop: '2px' }}>{formatINR(paid)}</div>
        </div>

        <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
          <div style={{ fontSize: '11px', color: '#f59e0b', fontWeight: 700 }}>Pending Due ({pendingPct}%)</div>
          <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-white)', marginTop: '2px' }}>{formatINR(pending)}</div>
        </div>

        <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          <div style={{ fontSize: '11px', color: '#ef4444', fontWeight: 700 }}>Overdue ({overduePct}%)</div>
          <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-white)', marginTop: '2px' }}>{formatINR(overdue)}</div>
        </div>
      </div>
    </div>
  );
}

// 5. Lead Conversion Funnel Chart
export function LeadConversionChart({ leads = [] }) {
  const stages = [
    { label: 'Total Inquiries', count: leads.length, color: '#3b82f6' },
    { label: 'Contacted', count: leads.filter((l) => l.status !== 'New').length, color: '#60a5fa' },
    { label: 'In Follow-up', count: leads.filter((l) => l.status === 'Follow-up' || l.status === 'Proposal Sent' || l.status === 'Won').length, color: '#8b5cf6' },
    { label: 'Proposals Sent', count: leads.filter((l) => l.status === 'Proposal Sent' || l.status === 'Won').length, color: '#f59e0b' },
    { label: 'Deals Won', count: leads.filter((l) => l.status === 'Won').length, color: '#10b981' },
  ];

  const totalInquiries = Math.max(1, leads.length);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '10px' }}>
      {stages.map((st) => {
        const pct = ((st.count / totalInquiries) * 100).toFixed(0);
        return (
          <div key={st.label} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
              <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{st.label}</span>
              <span style={{ color: 'var(--text-white)', fontWeight: 800 }}>
                {st.count} <span style={{ color: 'var(--text-dim)', fontSize: '11px' }}>({pct}%)</span>
              </span>
            </div>
            <div style={{ width: '100%', height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
              <div style={{ width: `${pct}%`, height: '100%', background: st.color, borderRadius: '4px' }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
