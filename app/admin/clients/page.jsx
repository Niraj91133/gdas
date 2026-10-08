'use client';

import React, { useState, useMemo } from 'react';
import { useAdmin } from '../../../context/AdminContext';
import { formatINR } from '../../../components/AdminCharts';
import { ALL_SERVICES } from '../../../lib/adminStore';

export default function ClientManagementPage() {
  const { clients, addClient, editClient, deleteClient, addClientNote, addClientDocument } = useAdmin();

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [serviceFilter, setServiceFilter] = useState('All');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [viewingProfileClient, setViewingProfileClient] = useState(null);

  // Add / Edit Form State
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    phone: '',
    email: '',
    address: '',
    gstNumber: '',
    services: [],
    projectStartDate: new Date().toISOString().split('T')[0],
    projectEndDate: '',
    totalProjectValue: '',
    paidAmount: '',
    status: 'Active',
    initialNote: '',
  });

  // Note and Document Form State for Profile Modal
  const [newNoteText, setNewNoteText] = useState('');
  const [newDocName, setNewDocName] = useState('');
  const [newDocType, setNewDocType] = useState('PDF');

  // Filtered Clients
  const filteredClients = useMemo(() => {
    return clients.filter((c) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.businessName.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q);

      const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
      const matchesService = serviceFilter === 'All' || (c.services && c.services.includes(serviceFilter));

      return matchesSearch && matchesStatus && matchesService;
    });
  }, [clients, searchQuery, statusFilter, serviceFilter]);

  const openAddModal = () => {
    setEditingClient(null);
    setFormData({
      name: '',
      businessName: '',
      phone: '',
      email: '',
      address: '',
      gstNumber: '',
      services: ['Meta Ads Management'],
      projectStartDate: new Date().toISOString().split('T')[0],
      projectEndDate: '',
      totalProjectValue: '',
      paidAmount: '',
      status: 'Active',
      initialNote: '',
    });
    setIsAddModalOpen(true);
  };

  const openEditModal = (client) => {
    setEditingClient(client);
    setFormData({
      name: client.name || '',
      businessName: client.businessName || '',
      phone: client.phone || '',
      email: client.email || '',
      address: client.address || '',
      gstNumber: client.gstNumber || '',
      services: client.services || [],
      projectStartDate: client.projectStartDate || '',
      projectEndDate: client.projectEndDate || '',
      totalProjectValue: client.totalProjectValue || '',
      paidAmount: client.paidAmount || '',
      status: client.status || 'Active',
      initialNote: '',
    });
    setIsAddModalOpen(true);
  };

  const handleSaveClient = (e) => {
    e.preventDefault();
    if (editingClient) {
      editClient(editingClient.id, formData);
      if (viewingProfileClient?.id === editingClient.id) {
        setViewingProfileClient((prev) => ({ ...prev, ...formData }));
      }
    } else {
      addClient(formData);
    }
    setIsAddModalOpen(false);
  };

  const handleDeleteClient = (id, name) => {
    if (window.confirm(`Are you sure you want to delete client "${name}" (${id})?`)) {
      deleteClient(id);
      if (viewingProfileClient?.id === id) {
        setViewingProfileClient(null);
      }
    }
  };

  const handleServiceToggle = (srv) => {
    setFormData((prev) => {
      const exists = prev.services.includes(srv);
      return {
        ...prev,
        services: exists ? prev.services.filter((s) => s !== srv) : [...prev.services, srv],
      };
    });
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim() || !viewingProfileClient) return;
    addClientNote(viewingProfileClient.id, newNoteText);
    setNewNoteText('');
    // refresh viewing client
    const updated = clients.find((c) => c.id === viewingProfileClient.id);
    if (updated) setViewingProfileClient(updated);
  };

  const handleAddDoc = (e) => {
    e.preventDefault();
    if (!newDocName.trim() || !viewingProfileClient) return;
    addClientDocument(viewingProfileClient.id, { name: newDocName, type: newDocType, size: '2.1 MB' });
    setNewDocName('');
    const updated = clients.find((c) => c.id === viewingProfileClient.id);
    if (updated) setViewingProfileClient(updated);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Controls & Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-white)', marginBottom: '4px' }}>
            Client Management System
          </h1>
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)' }}>
            Track client profiles, contracts, project milestones, payments & documents
          </p>
        </div>

        <button type="button" onClick={openAddModal} className="btn-primary" style={{ padding: '10px 20px', fontSize: '13.5px' }}>
          + Add New Client
        </button>
      </div>

      {/* Search & Multi-Filter Bar */}
      <div
        className="glass-card"
        style={{
          padding: '16px 20px',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap',
          background: 'rgba(255, 255, 255, 0.02)',
        }}
      >
        {/* Search input */}
        <div style={{ flex: '1 1 240px', minWidth: '220px' }}>
          <input
            type="text"
            placeholder="Search by client name, business, phone, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-white)',
              fontSize: '13px',
              outline: 'none',
            }}
          />
        </div>

        {/* Status Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-dim)', fontWeight: 600 }}>Status:</span>
          {['All', 'Active', 'Lead', 'Completed', 'Inactive'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '12px',
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

        {/* Service Filter dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-dim)', fontWeight: 600 }}>Service:</span>
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            style={{
              padding: '7px 12px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-white)',
              fontSize: '12.5px',
              outline: 'none',
            }}
          >
            <option value="All">All Services</option>
            {ALL_SERVICES.map((srv) => (
              <option key={srv} value={srv}>
                {srv}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Clients Table / List */}
      <div className="glass-card" style={{ borderRadius: '20px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: 'rgba(255, 255, 255, 0.03)', borderBottom: '1px solid var(--border-subtle)' }}>
                <th style={{ padding: '14px 18px', color: 'var(--text-dim)', fontWeight: 700 }}>Client & Business</th>
                <th style={{ padding: '14px 18px', color: 'var(--text-dim)', fontWeight: 700 }}>Contact Info</th>
                <th style={{ padding: '14px 18px', color: 'var(--text-dim)', fontWeight: 700 }}>Services</th>
                <th style={{ padding: '14px 18px', color: 'var(--text-dim)', fontWeight: 700 }}>Financials</th>
                <th style={{ padding: '14px 18px', color: 'var(--text-dim)', fontWeight: 700 }}>Status</th>
                <th style={{ padding: '14px 18px', color: 'var(--text-dim)', fontWeight: 700, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    No clients found matching the filter criteria.
                  </td>
                </tr>
              ) : (
                filteredClients.map((client) => {
                  const statusColors = {
                    Active: { bg: 'rgba(16, 185, 129, 0.15)', text: '#10b981' },
                    Lead: { bg: 'rgba(59, 130, 246, 0.15)', text: '#60a5fa' },
                    Completed: { bg: 'rgba(139, 92, 246, 0.15)', text: '#a78bfa' },
                    Inactive: { bg: 'rgba(100, 116, 139, 0.15)', text: '#94a3b8' },
                  };
                  const badge = statusColors[client.status] || statusColors.Active;

                  return (
                    <tr
                      key={client.id}
                      style={{
                        borderBottom: '1px solid var(--border-subtle)',
                        transition: 'background 0.2s ease',
                      }}
                      className="table-row-hover"
                    >
                      {/* Name & Business */}
                      <td style={{ padding: '16px 18px' }}>
                        <div style={{ fontWeight: 800, color: 'var(--text-white)', fontSize: '14px' }}>
                          {client.businessName}
                        </div>
                        <div style={{ color: '#60a5fa', fontSize: '12px', fontWeight: 600, marginTop: '2px' }}>
                          👤 {client.name} • <span style={{ color: 'var(--text-dim)' }}>{client.id}</span>
                        </div>
                      </td>

                      {/* Contact */}
                      <td style={{ padding: '16px 18px' }}>
                        <div style={{ color: 'var(--text-white)' }}>{client.phone}</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>{client.email}</div>
                      </td>

                      {/* Services */}
                      <td style={{ padding: '16px 18px' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', maxWidth: '240px' }}>
                          {(client.services || []).slice(0, 2).map((s) => (
                            <span
                              key={s}
                              style={{
                                fontSize: '11px',
                                padding: '2px 8px',
                                borderRadius: '6px',
                                background: 'rgba(37, 99, 235, 0.1)',
                                border: '1px solid rgba(37, 99, 235, 0.25)',
                                color: '#93c5fd',
                              }}
                            >
                              {s}
                            </span>
                          ))}
                          {(client.services || []).length > 2 && (
                            <span style={{ fontSize: '11px', color: 'var(--text-dim)', alignSelf: 'center' }}>
                              +{client.services.length - 2} more
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Financials */}
                      <td style={{ padding: '16px 18px' }}>
                        <div style={{ fontWeight: 800, color: 'var(--text-white)' }}>
                          {formatINR(client.totalProjectValue)}
                        </div>
                        <div style={{ fontSize: '11.5px', color: client.pendingAmount > 0 ? '#f59e0b' : '#10b981', fontWeight: 600 }}>
                          {client.pendingAmount > 0 ? `Pending: ${formatINR(client.pendingAmount)}` : '✓ Fully Paid'}
                        </div>
                      </td>

                      {/* Status */}
                      <td style={{ padding: '16px 18px' }}>
                        <span
                          style={{
                            padding: '4px 10px',
                            borderRadius: '20px',
                            fontSize: '11.5px',
                            fontWeight: 700,
                            background: badge.bg,
                            color: badge.text,
                          }}
                        >
                          {client.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '16px 18px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                          <button
                            type="button"
                            onClick={() => setViewingProfileClient(client)}
                            className="btn-secondary"
                            style={{ padding: '5px 10px', fontSize: '12px' }}
                            title="View Full Profile"
                          >
                            👁️ Profile
                          </button>
                          <button
                            type="button"
                            onClick={() => openEditModal(client)}
                            style={{
                              background: 'rgba(255, 255, 255, 0.05)',
                              border: '1px solid var(--border-subtle)',
                              color: 'var(--text-white)',
                              padding: '5px 9px',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              fontSize: '12px',
                            }}
                            title="Edit Client"
                          >
                            ✏️
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteClient(client.id, client.name)}
                            style={{
                              background: 'rgba(239, 68, 68, 0.1)',
                              border: '1px solid rgba(239, 68, 68, 0.25)',
                              color: '#ef4444',
                              padding: '5px 9px',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              fontSize: '12px',
                            }}
                            title="Delete Client"
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
      {/* 01. ADD / EDIT CLIENT MODAL */}
      {/* ========================================================= */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-white)' }}>
                {editingClient ? 'Edit Client Record' : 'Add New Client'}
              </h2>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-dim)', fontSize: '20px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveClient} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Client Contact Person *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Singhania"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', fontSize: '13px' }}
                  />
                </div>

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
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Phone Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98351 22410"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="rajesh@singhaniaretail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px' }}>
                  Business Address & Location
                </label>
                <input
                  type="text"
                  placeholder="City Center Mall, Main Road, Gaya, Bihar"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', fontSize: '13px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    GST Number (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="10AAACS1429B1Z4"
                    value={formData.gstNumber}
                    onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value.toUpperCase() })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Client Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', fontSize: '13px' }}
                  >
                    <option value="Active">Active</option>
                    <option value="Lead">Lead</option>
                    <option value="Completed">Completed</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Services Multi-Select */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Select Services Purchased
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', maxHeight: '140px', overflowY: 'auto', padding: '8px', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                  {ALL_SERVICES.map((srv) => {
                    const checked = formData.services.includes(srv);
                    return (
                      <label key={srv} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: checked ? '#60a5fa' : 'var(--text-secondary)', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => handleServiceToggle(srv)}
                        />
                        <span>{srv}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Financials & Dates */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Total Project Value (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 150000"
                    value={formData.totalProjectValue}
                    onChange={(e) => setFormData({ ...formData, totalProjectValue: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Amount Paid (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 75000"
                    value={formData.paidAmount}
                    onChange={(e) => setFormData({ ...formData, paidAmount: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Project Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.projectStartDate}
                    onChange={(e) => setFormData({ ...formData, projectStartDate: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Project End Date
                  </label>
                  <input
                    type="date"
                    value={formData.projectEndDate}
                    onChange={(e) => setFormData({ ...formData, projectEndDate: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', fontSize: '13px' }}
                  />
                </div>
              </div>

              {!editingClient && (
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Initial Project Note / Brief
                  </label>
                  <textarea
                    rows="2"
                    placeholder="Add onboarding details, campaign goals, key deliverables..."
                    value={formData.initialNote}
                    onChange={(e) => setFormData({ ...formData, initialNote: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', fontSize: '13px', resize: 'vertical' }}
                  />
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="btn-secondary"
                  style={{ padding: '10px 18px' }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ padding: '10px 22px' }}>
                  {editingClient ? 'Save Changes' : 'Create Client Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 02. FULL CLIENT PROFILE MODAL */}
      {/* ========================================================= */}
      {viewingProfileClient && (
        <div className="modal-overlay" onClick={() => setViewingProfileClient(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '780px', maxHeight: '90vh', overflowY: 'auto' }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '18px', marginBottom: '20px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-white)' }}>
                    {viewingProfileClient.businessName}
                  </h2>
                  <span
                    style={{
                      padding: '3px 10px',
                      borderRadius: '20px',
                      fontSize: '11px',
                      fontWeight: 700,
                      background: viewingProfileClient.status === 'Active' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(100, 116, 139, 0.15)',
                      color: viewingProfileClient.status === 'Active' ? '#10b981' : '#94a3b8',
                    }}
                  >
                    {viewingProfileClient.status}
                  </span>
                </div>
                <div style={{ fontSize: '13px', color: '#60a5fa', fontWeight: 600, marginTop: '4px' }}>
                  👤 Primary Contact: {viewingProfileClient.name} • Client ID: {viewingProfileClient.id}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => openEditModal(viewingProfileClient)}
                  className="btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '12px' }}
                >
                  ✏️ Edit
                </button>
                <button
                  type="button"
                  onClick={() => setViewingProfileClient(null)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-dim)', fontSize: '22px', cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Quick Contact & Info Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '22px' }}>
              <div style={{ padding: '12px 14px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 600 }}>PHONE NUMBER</div>
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-white)', marginTop: '2px' }}>
                  {viewingProfileClient.phone}
                </div>
                <a
                  href={`https://wa.me/${viewingProfileClient.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '11.5px', color: '#10b981', textDecoration: 'none', fontWeight: 700, marginTop: '4px', display: 'inline-block' }}
                >
                  💬 Open WhatsApp
                </a>
              </div>

              <div style={{ padding: '12px 14px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 600 }}>EMAIL ADDRESS</div>
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-white)', marginTop: '2px' }}>
                  {viewingProfileClient.email}
                </div>
              </div>

              <div style={{ padding: '12px 14px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 600 }}>GST NUMBER</div>
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-white)', marginTop: '2px' }}>
                  {viewingProfileClient.gstNumber || 'Not Registered / Exempt'}
                </div>
              </div>

              <div style={{ padding: '12px 14px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 600 }}>PROJECT TIMELINE</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-white)', marginTop: '2px' }}>
                  {viewingProfileClient.projectStartDate} → {viewingProfileClient.projectEndDate || 'Ongoing'}
                </div>
              </div>
            </div>

            {/* Financial Status Box */}
            <div style={{ padding: '18px', borderRadius: '16px', background: 'rgba(37, 99, 235, 0.08)', border: '1px solid rgba(37, 99, 235, 0.25)', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#60a5fa' }}>Financial & Billing Status</span>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Paid: {formatINR(viewingProfileClient.paidAmount)} of {formatINR(viewingProfileClient.totalProjectValue)}
                </span>
              </div>
              <div style={{ width: '100%', height: '10px', borderRadius: '10px', background: 'rgba(255,255,255,0.1)', overflow: 'hidden', marginBottom: '10px' }}>
                <div
                  style={{
                    width: `${Math.min(100, (viewingProfileClient.paidAmount / (viewingProfileClient.totalProjectValue || 1)) * 100)}%`,
                    height: '100%',
                    background: '#10b981',
                  }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>
                  Total Project Value: <strong style={{ color: 'var(--text-white)' }}>{formatINR(viewingProfileClient.totalProjectValue)}</strong>
                </span>
                <span style={{ color: viewingProfileClient.pendingAmount > 0 ? '#f59e0b' : '#10b981', fontWeight: 700 }}>
                  {viewingProfileClient.pendingAmount > 0 ? `Pending Due: ${formatINR(viewingProfileClient.pendingAmount)}` : '✓ Fully Paid'}
                </span>
              </div>
            </div>

            {/* Services Purchased */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-white)', marginBottom: '10px' }}>
                Services Subscribed
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(viewingProfileClient.services || []).map((srv) => (
                  <span
                    key={srv}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '8px',
                      fontSize: '12.5px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--border-subtle)',
                      color: '#93c5fd',
                      fontWeight: 600,
                    }}
                  >
                    ✓ {srv}
                  </span>
                ))}
              </div>
            </div>

            {/* Notes & Activity Log */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-white)', marginBottom: '10px' }}>
                Project Notes & Updates ({viewingProfileClient.notes?.length || 0})
              </div>

              {/* Add Note Form */}
              <form onSubmit={handleAddNote} style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                <input
                  type="text"
                  placeholder="Add a new update or milestone note..."
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  style={{ flex: 1, padding: '9px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', fontSize: '13px' }}
                />
                <button type="submit" className="btn-primary" style={{ padding: '8px 16px', fontSize: '12.5px' }}>
                  + Post Note
                </button>
              </form>

              {/* Notes List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
                {(viewingProfileClient.notes || []).map((note) => (
                  <div
                    key={note.id}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '10px',
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <div style={{ fontSize: '13px', color: 'var(--text-white)' }}>{note.text}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '4px' }}>
                      ✍️ {note.author || 'Ram Gyan'} • {new Date(note.date).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents & Files */}
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-white)', marginBottom: '10px' }}>
                Uploaded Documents & Contracts ({viewingProfileClient.documents?.length || 0})
              </div>

              {/* Add Document Mock */}
              <form onSubmit={handleAddDoc} style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <input
                  type="text"
                  placeholder="File name (e.g. Master_Agreement.pdf)"
                  value={newDocName}
                  onChange={(e) => setNewDocName(e.target.value)}
                  style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', fontSize: '12.5px' }}
                />
                <select
                  value={newDocType}
                  onChange={(e) => setNewDocType(e.target.value)}
                  style={{ padding: '8px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', fontSize: '12.5px' }}
                >
                  <option value="PDF">PDF</option>
                  <option value="ZIP">ZIP</option>
                  <option value="DOCX">DOCX</option>
                </select>
                <button type="submit" className="btn-secondary" style={{ padding: '8px 14px', fontSize: '12px' }}>
                  + Attach File
                </button>
              </form>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {(viewingProfileClient.documents || []).length === 0 ? (
                  <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>No documents attached yet.</div>
                ) : (
                  (viewingProfileClient.documents || []).map((doc) => (
                    <div
                      key={doc.id}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '10px',
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid var(--border-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>📄</span>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-white)' }}>{doc.name}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>{doc.type} • {doc.size} • Uploaded {doc.uploadDate}</div>
                        </div>
                      </div>
                      <span style={{ fontSize: '11.5px', color: '#60a5fa', fontWeight: 700 }}>✓ Attached</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
