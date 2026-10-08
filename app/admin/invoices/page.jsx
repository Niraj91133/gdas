'use client';

import React, { useState, useMemo } from 'react';
import { useAdmin } from '../../../context/AdminContext';
import { formatINR } from '../../../components/AdminCharts';
import { ALL_SERVICES } from '../../../lib/adminStore';

export default function InvoiceManagementPage() {
  const {
    invoices,
    clients,
    createInvoice,
    editInvoice,
    deleteInvoice,
    duplicateInvoice,
    updateInvoiceStatus,
    generateInvoiceNumber,
    agencyDetails,
  } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modals
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [previewingInvoice, setPreviewingInvoice] = useState(null);
  const [toast, setToast] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    clientId: '',
    clientName: '',
    businessName: '',
    clientEmail: '',
    clientPhone: '',
    clientAddress: '',
    clientGst: '',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    items: [
      { id: 'it-1', description: 'Meta & Google Ads Campaign Retainer', quantity: 1, unitPrice: 35000, total: 35000 },
    ],
    discount: 0,
    taxRate: 18,
    paidAmount: 0,
    status: 'Draft',
    paymentMethod: 'UPI',
    terms: 'Payment payable within 15 days via UPI / Bank Transfer. GDAs is a registered Digital Growth Agency.',
  });

  const INVOICE_STATUSES = ['All', 'Draft', 'Sent', 'Paid', 'Partially Paid', 'Overdue', 'Cancelled'];

  const statusColors = {
    Paid: { bg: 'rgba(16, 185, 129, 0.15)', text: '#10b981', border: 'rgba(16, 185, 129, 0.3)' },
    'Partially Paid': { bg: 'rgba(59, 130, 246, 0.15)', text: '#60a5fa', border: 'rgba(59, 130, 246, 0.3)' },
    Sent: { bg: 'rgba(245, 158, 11, 0.15)', text: '#f59e0b', border: 'rgba(245, 158, 11, 0.3)' },
    Overdue: { bg: 'rgba(239, 68, 68, 0.15)', text: '#ef4444', border: 'rgba(239, 68, 68, 0.3)' },
    Draft: { bg: 'rgba(100, 116, 139, 0.15)', text: '#94a3b8', border: 'rgba(100, 116, 139, 0.3)' },
    Cancelled: { bg: 'rgba(100, 116, 139, 0.15)', text: '#64748b', border: 'rgba(100, 116, 139, 0.3)' },
  };

  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        inv.invoiceNumber.toLowerCase().includes(q) ||
        inv.clientName.toLowerCase().includes(q) ||
        inv.businessName.toLowerCase().includes(q) ||
        inv.clientEmail.toLowerCase().includes(q);

      const matchesStatus = statusFilter === 'All' || inv.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [invoices, searchQuery, statusFilter]);

  const openCreateModal = () => {
    setEditingInvoice(null);
    setFormData({
      invoiceNumber: generateInvoiceNumber(),
      clientId: clients[0]?.id || '',
      clientName: clients[0]?.name || '',
      businessName: clients[0]?.businessName || '',
      clientEmail: clients[0]?.email || '',
      clientPhone: clients[0]?.phone || '',
      clientAddress: clients[0]?.address || '',
      clientGst: clients[0]?.gstNumber || '',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      items: [
        { id: `it-${Date.now()}`, description: 'Meta Ads & High-Converting Creative Management', quantity: 1, unitPrice: 40000, total: 40000 },
      ],
      discount: 0,
      taxRate: 18,
      paidAmount: 0,
      status: 'Sent',
      paymentMethod: 'UPI',
      terms: 'Payment payable within 14 days via UPI / Bank Transfer. GDAs is a registered Digital Growth Agency.',
    });
    setIsFormModalOpen(true);
  };

  const openEditModal = (inv) => {
    setEditingInvoice(inv);
    setFormData({
      invoiceNumber: inv.invoiceNumber,
      clientId: inv.clientId,
      clientName: inv.clientName,
      businessName: inv.businessName,
      clientEmail: inv.clientEmail,
      clientPhone: inv.clientPhone,
      clientAddress: inv.clientAddress,
      clientGst: inv.clientGst,
      issueDate: inv.issueDate,
      dueDate: inv.dueDate,
      items: inv.items || [],
      discount: inv.discount || 0,
      taxRate: inv.taxRate !== undefined ? inv.taxRate : 18,
      paidAmount: inv.paidAmount || 0,
      status: inv.status || 'Draft',
      paymentMethod: inv.paymentMethod || 'UPI',
      terms: inv.terms || '',
    });
    setIsFormModalOpen(true);
  };

  const handleClientSelect = (clientId) => {
    const cl = clients.find((c) => c.id === clientId);
    if (cl) {
      setFormData((prev) => ({
        ...prev,
        clientId: cl.id,
        clientName: cl.name,
        businessName: cl.businessName,
        clientEmail: cl.email,
        clientPhone: cl.phone,
        clientAddress: cl.address,
        clientGst: cl.gstNumber,
      }));
    }
  };

  const handleAddItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { id: `it-${Date.now()}`, description: 'Digital Marketing & Growth Sprint', quantity: 1, unitPrice: 20000, total: 20000 },
      ],
    }));
  };

  const handleRemoveItem = (idx) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== idx),
    }));
  };

  const handleItemChange = (idx, field, val) => {
    setFormData((prev) => {
      const updated = [...prev.items];
      const it = { ...updated[idx], [field]: val };
      if (field === 'quantity' || field === 'unitPrice') {
        const qty = Number(field === 'quantity' ? val : it.quantity || 1);
        const prc = Number(field === 'unitPrice' ? val : it.unitPrice || 0);
        it.total = qty * prc;
      }
      updated[idx] = it;
      return { ...prev, items: updated };
    });
  };

  const handleSaveInvoice = (e) => {
    e.preventDefault();
    if (editingInvoice) {
      editInvoice(editingInvoice.id, formData);
      setToast(`✓ Invoice ${formData.invoiceNumber} updated successfully!`);
    } else {
      const created = createInvoice(formData);
      setToast(`🎉 New Invoice ${created.invoiceNumber} created!`);
    }
    setIsFormModalOpen(false);
    setTimeout(() => setToast(''), 4000);
  };

  const handleDuplicate = (id) => {
    const dup = duplicateInvoice(id);
    if (dup) {
      setToast(`📄 Invoice duplicated into draft ${dup.invoiceNumber}`);
      setTimeout(() => setToast(''), 4000);
    }
  };

  const handleDelete = (id, number) => {
    if (window.confirm(`Are you sure you want to delete invoice ${number}?`)) {
      deleteInvoice(id);
      if (previewingInvoice?.id === id) setPreviewingInvoice(null);
    }
  };

  // WhatsApp Send helper
  const getWhatsAppInvoiceLink = (inv) => {
    const msg = `*INVOICE FROM GANESHA DIGITAL ADS (GDAs)*\n\nDear *${inv.clientName}* (${inv.businessName}),\n\nPlease find your invoice details below:\n🧾 *Invoice No:* ${inv.invoiceNumber}\n📅 *Issue Date:* ${inv.issueDate}\n⏰ *Due Date:* ${inv.dueDate || 'Immediate'}\n\n💰 *Total Amount:* ${formatINR(inv.totalAmount)}\n✅ *Amount Paid:* ${formatINR(inv.paidAmount)}\n⏳ *Balance Due:* ${formatINR(inv.balanceDue)}\n\n💳 *UPI ID:* ${agencyDetails.bankDetails.upiId}\n🏦 *Account Name:* ${agencyDetails.bankDetails.accountName}\n*A/C:* ${agencyDetails.bankDetails.accountNumber} | *IFSC:* ${agencyDetails.bankDetails.ifscCode}\n\nThank you for choosing GDAs as your growth partner!\n- Team GDAs (${agencyDetails.phone})`;
    return `https://wa.me/${inv.clientPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-white)', marginBottom: '4px' }}>
            Invoices & Billing Management
          </h1>
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)' }}>
            Generate tax-compliant invoices, track collections, send WhatsApp reminders & download PDFs
          </p>
        </div>

        <button type="button" onClick={openCreateModal} className="btn-primary" style={{ padding: '10px 20px', fontSize: '13.5px' }}>
          + Create New Invoice
        </button>
      </div>

      {toast && (
        <div
          style={{
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            color: '#10b981',
            padding: '12px 18px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: 700,
          }}
        >
          {toast}
        </div>
      )}

      {/* Filter and Search */}
      <div
        className="glass-card"
        style={{
          padding: '14px 18px',
          borderRadius: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          flexWrap: 'wrap',
          background: 'rgba(255, 255, 255, 0.02)',
        }}
      >
        <div style={{ flex: '1 1 240px' }}>
          <input
            type="text"
            placeholder="Search by invoice number, client, or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '9px 12px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-white)',
              fontSize: '13px',
              outline: 'none',
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-dim)', fontWeight: 600 }}>Status:</span>
          {INVOICE_STATUSES.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              style={{
                padding: '5px 10px',
                borderRadius: '6px',
                fontSize: '11.5px',
                fontWeight: statusFilter === st ? 700 : 500,
                cursor: 'pointer',
                background: statusFilter === st ? 'rgba(37, 99, 235, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                color: statusFilter === st ? '#60a5fa' : 'var(--text-secondary)',
                border: statusFilter === st ? '1px solid rgba(37, 99, 235, 0.4)' : '1px solid var(--border-subtle)',
              }}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Invoices Table */}
      <div className="glass-card" style={{ borderRadius: '20px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: 'rgba(255, 255, 255, 0.03)', borderBottom: '1px solid var(--border-subtle)' }}>
                <th style={{ padding: '14px 18px', color: 'var(--text-dim)', fontWeight: 700 }}>Invoice #</th>
                <th style={{ padding: '14px 18px', color: 'var(--text-dim)', fontWeight: 700 }}>Client & Business</th>
                <th style={{ padding: '14px 18px', color: 'var(--text-dim)', fontWeight: 700 }}>Dates</th>
                <th style={{ padding: '14px 18px', color: 'var(--text-dim)', fontWeight: 700 }}>Amount Breakdown</th>
                <th style={{ padding: '14px 18px', color: 'var(--text-dim)', fontWeight: 700 }}>Status</th>
                <th style={{ padding: '14px 18px', color: 'var(--text-dim)', fontWeight: 700, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    No invoices found.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => {
                  const style = statusColors[inv.status] || statusColors.Draft;
                  return (
                    <tr key={inv.id} style={{ borderBottom: '1px solid var(--border-subtle)' }} className="table-row-hover">
                      {/* Invoice Number */}
                      <td style={{ padding: '16px 18px' }}>
                        <div style={{ fontWeight: 800, color: '#60a5fa', fontSize: '13.5px' }}>
                          {inv.invoiceNumber}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>
                          {(inv.items || []).length} Line Item(s)
                        </div>
                      </td>

                      {/* Client */}
                      <td style={{ padding: '16px 18px' }}>
                        <div style={{ fontWeight: 800, color: 'var(--text-white)' }}>
                          {inv.businessName || inv.clientName}
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                          👤 {inv.clientName} • {inv.clientPhone}
                        </div>
                      </td>

                      {/* Dates */}
                      <td style={{ padding: '16px 18px' }}>
                        <div style={{ color: 'var(--text-white)', fontSize: '12.5px' }}>Issued: {inv.issueDate}</div>
                        <div style={{ fontSize: '11.5px', color: inv.status === 'Overdue' ? '#ef4444' : 'var(--text-dim)', fontWeight: 600 }}>
                          Due: {inv.dueDate || 'Immediate'}
                        </div>
                      </td>

                      {/* Amount Breakdown */}
                      <td style={{ padding: '16px 18px' }}>
                        <div style={{ fontWeight: 800, color: 'var(--text-white)' }}>
                          {formatINR(inv.totalAmount)}
                        </div>
                        <div style={{ fontSize: '11.5px', color: inv.balanceDue > 0 ? '#f59e0b' : '#10b981', fontWeight: 600 }}>
                          {inv.balanceDue > 0 ? `Due: ${formatINR(inv.balanceDue)}` : '✓ Paid in Full'}
                        </div>
                      </td>

                      {/* Status */}
                      <td style={{ padding: '16px 18px' }}>
                        <span
                          style={{
                            padding: '4px 10px',
                            borderRadius: '20px',
                            fontSize: '11px',
                            fontWeight: 800,
                            background: style.bg,
                            color: style.text,
                            border: `1px solid ${style.border}`,
                          }}
                        >
                          {inv.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '16px 18px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                          <button
                            type="button"
                            onClick={() => setPreviewingInvoice(inv)}
                            className="btn-primary"
                            style={{ padding: '5px 11px', fontSize: '12px' }}
                            title="Print / View Invoice"
                          >
                            👁️ View / Print
                          </button>
                          <a
                            href={getWhatsAppInvoiceLink(inv)}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              background: 'rgba(16, 185, 129, 0.12)',
                              border: '1px solid rgba(16, 185, 129, 0.3)',
                              color: '#10b981',
                              padding: '5px 9px',
                              borderRadius: '8px',
                              fontSize: '12px',
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                            }}
                            title="Send Invoice on WhatsApp"
                          >
                            💬
                          </a>
                          <button
                            type="button"
                            onClick={() => openEditModal(inv)}
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', padding: '5px 8px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}
                            title="Edit Invoice"
                          >
                            ✏️
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDuplicate(inv.id)}
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', padding: '5px 8px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}
                            title="Duplicate Invoice"
                          >
                            📄
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(inv.id, inv.invoiceNumber)}
                            style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.25)', color: '#ef4444', padding: '5px 8px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}
                            title="Delete Invoice"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 01. CREATE / EDIT INVOICE MODAL */}
      {/* ========================================================= */}
      {isFormModalOpen && (
        <div className="modal-overlay" onClick={() => setIsFormModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '720px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-white)' }}>
                {editingInvoice ? `Edit Invoice (${formData.invoiceNumber})` : 'Create Professional Invoice'}
              </h2>
              <button type="button" onClick={() => setIsFormModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            </div>

            <form onSubmit={handleSaveInvoice} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Select Existing Client */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px' }}>
                  Auto-Fill from Existing Client Profile
                </label>
                <select
                  value={formData.clientId}
                  onChange={(e) => handleClientSelect(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', fontSize: '13px' }}
                >
                  <option value="">-- Or Enter Custom Recipient Below --</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.businessName} ({c.name}) - {c.phone}
                    </option>
                  ))}
                </select>
              </div>

              {/* Recipient Details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Business / Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Singhania Retail Group"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Client Contact Person *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Singhania"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="+91 98351 22410"
                    value={formData.clientPhone}
                    onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="client@business.com"
                    value={formData.clientEmail}
                    onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Client GSTIN
                  </label>
                  <input
                    type="text"
                    placeholder="10AAACS1429B1Z4"
                    value={formData.clientGst}
                    onChange={(e) => setFormData({ ...formData, clientGst: e.target.value.toUpperCase() })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', fontSize: '13px' }}
                  />
                </div>
              </div>

              {/* Invoice Metadata */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Invoice Number
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.invoiceNumber}
                    onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: '#60a5fa', fontWeight: 700, fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Issue Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.issueDate}
                    onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', fontSize: '13px' }}
                  />
                </div>
              </div>

              {/* Dynamic Line Items */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-white)' }}>
                    Services / Line Items
                  </label>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.3)', color: '#60a5fa', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', fontWeight: 600 }}
                  >
                    + Add Item
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {formData.items.map((item, idx) => (
                    <div key={item.id || idx} style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 1.5fr 30px', gap: '8px', alignItems: 'center' }}>
                      <input
                        type="text"
                        placeholder="Description of service..."
                        value={item.description}
                        onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                        style={{ padding: '8px 10px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', fontSize: '12.5px' }}
                      />
                      <input
                        type="number"
                        min="1"
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)}
                        style={{ padding: '8px 10px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', fontSize: '12.5px' }}
                      />
                      <input
                        type="number"
                        placeholder="Unit Price ₹"
                        value={item.unitPrice}
                        onChange={(e) => handleItemChange(idx, 'unitPrice', e.target.value)}
                        style={{ padding: '8px 10px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', fontSize: '12.5px' }}
                      />
                      {formData.items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(idx)}
                          style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '16px', cursor: 'pointer' }}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Adjustments: Discount, GST, Paid Amount */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Discount Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', fontSize: '12.5px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    GST Tax Rate (%)
                  </label>
                  <select
                    value={formData.taxRate}
                    onChange={(e) => setFormData({ ...formData, taxRate: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', fontSize: '12.5px' }}
                  >
                    <option value="18">18% (Standard GST)</option>
                    <option value="12">12% GST</option>
                    <option value="5">5% GST</option>
                    <option value="0">0% (Exempt)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Amount Received / Paid (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.paidAmount}
                    onChange={(e) => setFormData({ ...formData, paidAmount: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', fontSize: '12.5px' }}
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px' }}>
                  Invoice Lifecycle Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', fontSize: '13px' }}
                >
                  <option value="Draft">Draft</option>
                  <option value="Sent">Sent</option>
                  <option value="Partially Paid">Partially Paid</option>
                  <option value="Paid">Paid</option>
                  <option value="Overdue">Overdue</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setIsFormModalOpen(false)} className="btn-secondary" style={{ padding: '8px 16px' }}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ padding: '8px 20px' }}>{editingInvoice ? 'Save Invoice' : 'Generate Invoice'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 02. PROFESSIONAL PRINTABLE & PDF INVOICE PREVIEW MODAL */}
      {/* ========================================================= */}
      {previewingInvoice && (
        <div className="modal-overlay" onClick={() => setPreviewingInvoice(null)}>
          <div
            className="modal-content invoice-printable-container"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '820px',
              maxHeight: '92vh',
              overflowY: 'auto',
              background: '#ffffff',
              color: '#0f172a',
              padding: '40px',
              borderRadius: '16px',
            }}
          >
            {/* Top Toolbar (Hidden on Print) */}
            <div className="no-print" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="btn-primary"
                  style={{ padding: '8px 16px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  🖨️ Print / Save as PDF
                </button>
                <a
                  href={getWhatsAppInvoiceLink(previewingInvoice)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: '#10b981',
                    color: '#ffffff',
                    padding: '8px 16px',
                    borderRadius: '50px',
                    fontSize: '13px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  💬 Send on WhatsApp
                </a>
              </div>

              <button
                type="button"
                onClick={() => setPreviewingInvoice(null)}
                style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '24px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {/* PRINTABLE INVOICE BODY */}
            <div id="invoice-render-area" style={{ fontFamily: 'var(--font-sans)', color: '#0f172a' }}>
              {/* Invoice Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #2563eb', paddingBottom: '24px', marginBottom: '24px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <img src="/gda_logo.png" alt="GDAs Logo" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
                    <div>
                      <div style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
                        GANESHA DIGITAL ADS
                      </div>
                      <div style={{ fontSize: '12px', color: '#2563eb', fontWeight: 700 }}>
                        One Platform. All Solutions.
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: '12px', color: '#475569', lineHeight: 1.5 }}>
                    {agencyDetails.address}
                    <br />
                    Phone: {agencyDetails.phone} • Email: {agencyDetails.email}
                    <br />
                    GSTIN: <strong>{agencyDetails.gstin}</strong> • PAN: <strong>{agencyDetails.pan}</strong>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '28px', fontWeight: 900, color: '#1e40af', letterSpacing: '0.05em' }}>
                    TAX INVOICE
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>
                    {previewingInvoice.invoiceNumber}
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#64748b', marginTop: '4px' }}>
                    Date: <strong>{previewingInvoice.issueDate}</strong>
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#64748b' }}>
                    Due Date: <strong>{previewingInvoice.dueDate || 'Immediate'}</strong>
                  </div>
                </div>
              </div>

              {/* Billed To Box */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                    BILLED TO (CLIENT)
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>
                    {previewingInvoice.businessName}
                  </div>
                  <div style={{ fontSize: '13px', color: '#334155', fontWeight: 600 }}>
                    Attn: {previewingInvoice.clientName}
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#475569', marginTop: '2px' }}>
                    {previewingInvoice.clientAddress || 'Gaya, Bihar'}
                  </div>
                  <div style={{ fontSize: '12px', color: '#475569' }}>
                    Phone: {previewingInvoice.clientPhone} • Email: {previewingInvoice.clientEmail}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                    CLIENT TAX & STATUS
                  </div>
                  <div style={{ fontSize: '13px', color: '#334155' }}>
                    Client GSTIN: <strong>{previewingInvoice.clientGst || 'Unregistered / Exempt'}</strong>
                  </div>
                  <div style={{ fontSize: '13px', color: '#334155', marginTop: '4px' }}>
                    Payment Status:{' '}
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: 800,
                        background: previewingInvoice.status === 'Paid' ? '#dcfce7' : '#fef3c7',
                        color: previewingInvoice.status === 'Paid' ? '#166534' : '#92400e',
                      }}
                    >
                      {previewingInvoice.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: '#1e40af', color: '#ffffff', textAlign: 'left' }}>
                    <th style={{ padding: '10px 14px', borderRadius: '6px 0 0 6px' }}>#</th>
                    <th style={{ padding: '10px 14px' }}>Service Description</th>
                    <th style={{ padding: '10px 14px', textAlign: 'center' }}>Qty</th>
                    <th style={{ padding: '10px 14px', textAlign: 'right' }}>Rate (₹)</th>
                    <th style={{ padding: '10px 14px', textAlign: 'right', borderRadius: '0 6px 6px 0' }}>Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {(previewingInvoice.items || []).map((item, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '12px 14px', color: '#64748b' }}>{i + 1}</td>
                      <td style={{ padding: '12px 14px', fontWeight: 600, color: '#0f172a' }}>{item.description}</td>
                      <td style={{ padding: '12px 14px', textAlign: 'center', color: '#475569' }}>{item.quantity}</td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', color: '#475569' }}>{formatINR(item.unitPrice)}</td>
                      <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: 700, color: '#0f172a' }}>{formatINR(item.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Calculations & Bank Info Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px', marginBottom: '28px' }}>
                {/* Bank / Payment Instructions */}
                <div style={{ padding: '14px 16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '12px' }}>
                  <div style={{ fontWeight: 800, color: '#1e40af', marginBottom: '6px' }}>
                    PAYMENT INSTRUCTIONS
                  </div>
                  <div>Account Name: <strong>{agencyDetails.bankDetails.accountName}</strong></div>
                  <div>Bank: <strong>{agencyDetails.bankDetails.bankName}</strong></div>
                  <div>Account Number: <strong>{agencyDetails.bankDetails.accountNumber}</strong></div>
                  <div>IFSC Code: <strong>{agencyDetails.bankDetails.ifscCode}</strong></div>
                  <div style={{ marginTop: '4px', color: '#2563eb', fontWeight: 700 }}>
                    UPI ID: {agencyDetails.bankDetails.upiId}
                  </div>
                </div>

                {/* Totals Table */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                    <span>Subtotal:</span>
                    <span style={{ fontWeight: 600 }}>{formatINR(previewingInvoice.subtotal)}</span>
                  </div>

                  {previewingInvoice.discount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981' }}>
                      <span>Discount:</span>
                      <span style={{ fontWeight: 600 }}>- {formatINR(previewingInvoice.discount)}</span>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                    <span>GST ({previewingInvoice.taxRate || 18}%):</span>
                    <span style={{ fontWeight: 600 }}>{formatINR(previewingInvoice.taxAmount)}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #0f172a', paddingTop: '6px', fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>
                    <span>Total Amount:</span>
                    <span>{formatINR(previewingInvoice.totalAmount)}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#166534', fontWeight: 700 }}>
                    <span>Paid Amount:</span>
                    <span>{formatINR(previewingInvoice.paidAmount)}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', color: previewingInvoice.balanceDue > 0 ? '#b91c1c' : '#166534', fontWeight: 800, fontSize: '14px', borderTop: '1px dashed #cbd5e1', paddingTop: '4px' }}>
                    <span>Balance Due:</span>
                    <span>{formatINR(previewingInvoice.balanceDue)}</span>
                  </div>
                </div>
              </div>

              {/* Terms and Signatory Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid #e2e8f0', paddingTop: '18px', fontSize: '11.5px', color: '#64748b' }}>
                <div style={{ maxWidth: '420px' }}>
                  <strong>Terms & Conditions:</strong>
                  <br />
                  {previewingInvoice.terms || 'All payments are due upon receipt. This is a computer generated tax invoice.'}
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', marginBottom: '24px' }}>
                    For Ganesha Digital Ads (GDAs)
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#2563eb', borderTop: '1px solid #94a3b8', paddingTop: '4px' }}>
                    Authorized Signatory (Mr. Ram Gyan)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
