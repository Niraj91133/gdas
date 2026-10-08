'use client';

import React, { useState, useMemo } from 'react';
import { useAdmin } from '../../../context/AdminContext';
import { formatINR } from '../../../components/AdminCharts';
import { ALL_SERVICES } from '../../../lib/adminStore';

export default function LeadCRMPage() {
  const { leads, addLead, editLead, deleteLead, updateLeadStatus, addLeadNote, convertLeadToClient } = useAdmin();

  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState('All');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [viewingLead, setViewingLead] = useState(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    phone: '',
    email: '',
    source: 'Meta Ads',
    requiredService: 'Meta Ads Management',
    estimatedBudget: '',
    status: 'New',
    followUpDate: '',
    initialNote: '',
  });

  const STAGES = ['New', 'Contacted', 'Follow-up', 'Proposal Sent', 'Won', 'Lost'];

  const stageColors = {
    New: { bg: 'rgba(59, 130, 246, 0.15)', text: '#60a5fa', border: 'rgba(59, 130, 246, 0.3)' },
    Contacted: { bg: 'rgba(6, 182, 212, 0.15)', text: '#22d3ee', border: 'rgba(6, 182, 212, 0.3)' },
    'Follow-up': { bg: 'rgba(245, 158, 11, 0.15)', text: '#fbbf24', border: 'rgba(245, 158, 11, 0.3)' },
    'Proposal Sent': { bg: 'rgba(139, 92, 246, 0.15)', text: '#c084fc', border: 'rgba(139, 92, 246, 0.3)' },
    Won: { bg: 'rgba(16, 185, 129, 0.15)', text: '#34d399', border: 'rgba(16, 185, 129, 0.3)' },
    Lost: { bg: 'rgba(239, 68, 68, 0.15)', text: '#f87171', border: 'rgba(239, 68, 68, 0.3)' },
  };

  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        l.name.toLowerCase().includes(q) ||
        l.businessName.toLowerCase().includes(q) ||
        l.phone.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.id.toLowerCase().includes(q);

      const matchesSource = sourceFilter === 'All' || l.source === sourceFilter;
      return matchesSearch && matchesSource;
    });
  }, [leads, searchQuery, sourceFilter]);

  const openAddModal = () => {
    setEditingLead(null);
    setFormData({
      name: '',
      businessName: '',
      phone: '',
      email: '',
      source: 'Website Form',
      requiredService: 'Meta Ads Management',
      estimatedBudget: '',
      status: 'New',
      followUpDate: '',
      initialNote: '',
    });
    setIsAddModalOpen(true);
  };

  const openEditModal = (lead) => {
    setEditingLead(lead);
    setFormData({
      name: lead.name || '',
      businessName: lead.businessName || '',
      phone: lead.phone || '',
      email: lead.email || '',
      source: lead.source || 'Website Form',
      requiredService: lead.requiredService || 'Meta Ads Management',
      estimatedBudget: lead.estimatedBudget || '',
      status: lead.status || 'New',
      followUpDate: lead.followUpDate || '',
      initialNote: '',
    });
    setIsAddModalOpen(true);
  };

  const handleSaveLead = (e) => {
    e.preventDefault();
    if (editingLead) {
      editLead(editingLead.id, formData);
      if (viewingLead?.id === editingLead.id) {
        setViewingLead((prev) => ({ ...prev, ...formData }));
      }
    } else {
      addLead(formData);
    }
    setIsAddModalOpen(false);
  };

  const handleDeleteLead = (id, name) => {
    if (window.confirm(`Delete lead "${name}" (${id})?`)) {
      deleteLead(id);
      if (viewingLead?.id === id) {
        setViewingLead(null);
      }
    }
  };

  const handleConvertLead = (lead) => {
    const newClient = convertLeadToClient(lead.id);
    if (newClient) {
      setToastMessage(`🚀 Success! "${lead.name}" (${lead.businessName}) converted to Client ID: ${newClient.id}`);
      setTimeout(() => setToastMessage(''), 5000);
      if (viewingLead?.id === lead.id) {
        setViewingLead(null);
      }
    }
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim() || !viewingLead) return;
    addLeadNote(viewingLead.id, newNoteText);
    setNewNoteText('');
    const updated = leads.find((l) => l.id === viewingLead.id);
    if (updated) setViewingLead(updated);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header & Actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-white)', marginBottom: '4px' }}>
            Leads & CRM Pipeline
          </h1>
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)' }}>
            Capture, nurture and convert high-intent client inquiries into long-term retainers
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* View Toggle */}
          <div style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px', padding: '3px', border: '1px solid var(--border-subtle)' }}>
            <button
              type="button"
              onClick={() => setViewMode('kanban')}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '12.5px',
                fontWeight: viewMode === 'kanban' ? 700 : 500,
                background: viewMode === 'kanban' ? '#2563eb' : 'transparent',
                color: viewMode === 'kanban' ? '#fff' : 'var(--text-secondary)',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              📋 Kanban Pipeline
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '12.5px',
                fontWeight: viewMode === 'list' ? 700 : 500,
                background: viewMode === 'list' ? '#2563eb' : 'transparent',
                color: viewMode === 'list' ? '#fff' : 'var(--text-secondary)',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              📑 List View
            </button>
          </div>

          <button type="button" onClick={openAddModal} className="btn-primary" style={{ padding: '10px 18px', fontSize: '13.5px' }}>
            + Add New Lead
          </button>
        </div>
      </div>

      {toastMessage && (
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
          <span>{toastMessage}</span>
          <button type="button" onClick={() => setToastMessage('')} style={{ background: 'none', border: 'none', color: '#10b981', cursor: 'pointer', fontWeight: 800 }}>✕</button>
        </div>
      )}

      {/* Search and Source Filter */}
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
            placeholder="Search leads by name, business, phone or requirement..."
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-dim)', fontWeight: 600 }}>Source:</span>
          {['All', 'Meta Ads', 'Website Form', 'WhatsApp Referral', 'Google Search', 'Instagram DM', 'Cold Call'].map((src) => (
            <button
              key={src}
              type="button"
              onClick={() => setSourceFilter(src)}
              style={{
                padding: '5px 10px',
                borderRadius: '6px',
                fontSize: '11.5px',
                fontWeight: sourceFilter === src ? 700 : 500,
                cursor: 'pointer',
                background: sourceFilter === src ? 'rgba(37, 99, 235, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                color: sourceFilter === src ? '#60a5fa' : 'var(--text-secondary)',
                border: sourceFilter === src ? '1px solid rgba(37, 99, 235, 0.4)' : '1px solid var(--border-subtle)',
              }}
            >
              {src}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 01. KANBAN BOARD VIEW */}
      {/* ========================================================= */}
      {viewMode === 'kanban' ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, minmax(260px, 1fr))',
            gap: '16px',
            overflowX: 'auto',
            paddingBottom: '16px',
          }}
        >
          {STAGES.map((stage) => {
            const stageLeads = filteredLeads.filter((l) => l.status === stage);
            const style = stageColors[stage];

            return (
              <div
                key={stage}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '16px',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  maxHeight: '75vh',
                }}
              >
                {/* Stage Header */}
                <div
                  style={{
                    padding: '14px 16px',
                    borderBottom: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: '12px',
                        background: style.bg,
                        color: style.text,
                        fontSize: '11px',
                        fontWeight: 800,
                      }}
                    >
                      {stage}
                    </span>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-dim)' }}>
                    {stageLeads.length}
                  </span>
                </div>

                {/* Cards Container */}
                <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', flex: 1 }}>
                  {stageLeads.length === 0 ? (
                    <div style={{ padding: '30px 10px', textAlign: 'center', fontSize: '12px', color: 'var(--text-dim)' }}>
                      No leads in {stage}
                    </div>
                  ) : (
                    stageLeads.map((lead) => (
                      <div
                        key={lead.id}
                        className="glass-card"
                        style={{
                          padding: '14px',
                          borderRadius: '12px',
                          background: 'rgba(20, 20, 20, 0.7)',
                          border: '1px solid var(--border-subtle)',
                          cursor: 'pointer',
                        }}
                        onClick={() => setViewingLead(lead)}
                      >
                        {/* Source Tag & Budget */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontSize: '10.5px', color: '#60a5fa', fontWeight: 700, padding: '2px 6px', background: 'rgba(37,99,235,0.1)', borderRadius: '4px' }}>
                            {lead.source}
                          </span>
                          <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-white)' }}>
                            {lead.estimatedBudget ? formatINR(lead.estimatedBudget) : 'TBD'}
                          </span>
                        </div>

                        {/* Name & Business */}
                        <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-white)', marginBottom: '2px' }}>
                          {lead.businessName || lead.name}
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                          👤 {lead.name}
                        </div>

                        {/* Requirement */}
                        <div style={{ fontSize: '11.5px', color: '#93c5fd', marginTop: '8px', background: 'rgba(255,255,255,0.03)', padding: '4px 8px', borderRadius: '6px' }}>
                          🎯 {lead.requiredService}
                        </div>

                        {/* Follow up countdown */}
                        {lead.followUpDate && stage !== 'Won' && stage !== 'Lost' && (
                          <div style={{ fontSize: '11px', color: '#f59e0b', fontWeight: 700, marginTop: '8px' }}>
                            ⏰ Follow-up: {new Date(lead.followUpDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </div>
                        )}

                        {/* Stage Selector & Actions */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px', paddingTop: '8px', borderTop: '1px solid var(--border-subtle)' }} onClick={(e) => e.stopPropagation()}>
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                            style={{
                              fontSize: '11px',
                              padding: '3px 6px',
                              borderRadius: '6px',
                              background: 'rgba(255,255,255,0.05)',
                              border: '1px solid var(--border-subtle)',
                              color: 'var(--text-white)',
                              outline: 'none',
                            }}
                          >
                            {STAGES.map((st) => (
                              <option key={st} value={st}>
                                → {st}
                              </option>
                            ))}
                          </select>

                          {stage !== 'Won' && (
                            <button
                              type="button"
                              onClick={() => handleConvertLead(lead)}
                              style={{
                                background: 'rgba(16, 185, 129, 0.15)',
                                border: '1px solid rgba(16, 185, 129, 0.3)',
                                color: '#10b981',
                                fontSize: '11px',
                                fontWeight: 700,
                                padding: '3px 8px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                              }}
                              title="Convert to Active Client"
                            >
                              🚀 Convert
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ========================================================= */
        /* 02. LIST TABLE VIEW */
        /* ========================================================= */
        <div className="glass-card" style={{ borderRadius: '20px', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: 'rgba(255, 255, 255, 0.03)', borderBottom: '1px solid var(--border-subtle)' }}>
                  <th style={{ padding: '14px 18px', color: 'var(--text-dim)', fontWeight: 700 }}>Lead / Prospect</th>
                  <th style={{ padding: '14px 18px', color: 'var(--text-dim)', fontWeight: 700 }}>Requirement & Budget</th>
                  <th style={{ padding: '14px 18px', color: 'var(--text-dim)', fontWeight: 700 }}>Source</th>
                  <th style={{ padding: '14px 18px', color: 'var(--text-dim)', fontWeight: 700 }}>Follow-up Date</th>
                  <th style={{ padding: '14px 18px', color: 'var(--text-dim)', fontWeight: 700 }}>Status</th>
                  <th style={{ padding: '14px 18px', color: 'var(--text-dim)', fontWeight: 700, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => {
                  const style = stageColors[lead.status] || stageColors.New;
                  return (
                    <tr key={lead.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '14px 18px' }}>
                        <div style={{ fontWeight: 800, color: 'var(--text-white)' }}>{lead.businessName || lead.name}</div>
                        <div style={{ fontSize: '12px', color: '#60a5fa' }}>👤 {lead.name} • {lead.phone}</div>
                      </td>
                      <td style={{ padding: '14px 18px' }}>
                        <div style={{ color: 'var(--text-white)' }}>{lead.requiredService}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Est. Budget: {lead.estimatedBudget ? formatINR(lead.estimatedBudget) : 'TBD'}</div>
                      </td>
                      <td style={{ padding: '14px 18px' }}>
                        <span style={{ fontSize: '11.5px', color: '#93c5fd', background: 'rgba(37,99,235,0.1)', padding: '3px 8px', borderRadius: '6px' }}>
                          {lead.source}
                        </span>
                      </td>
                      <td style={{ padding: '14px 18px' }}>
                        <span style={{ fontSize: '12px', color: lead.followUpDate ? '#f59e0b' : 'var(--text-dim)', fontWeight: 600 }}>
                          {lead.followUpDate ? new Date(lead.followUpDate).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }) : '—'}
                        </span>
                      </td>
                      <td style={{ padding: '14px 18px' }}>
                        <span style={{ padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 800, background: style.bg, color: style.text }}>
                          {lead.status}
                        </span>
                      </td>
                      <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                          <button type="button" onClick={() => setViewingLead(lead)} className="btn-secondary" style={{ padding: '4px 10px', fontSize: '12px' }}>
                            👁️
                          </button>
                          <button type="button" onClick={() => openEditModal(lead)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer' }}>
                            ✏️
                          </button>
                          <button type="button" onClick={() => handleConvertLead(lead)} className="btn-primary" style={{ padding: '4px 10px', fontSize: '11.5px' }}>
                            🚀 Convert
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 03. ADD / EDIT LEAD MODAL */}
      {/* ========================================================= */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-white)' }}>
                {editingLead ? 'Edit Lead Record' : 'Add New CRM Lead'}
              </h2>
              <button type="button" onClick={() => setIsAddModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            </div>

            <form onSubmit={handleSaveLead} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Amitabh Sen"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Business / Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sen Jewellers"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Phone Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98350 77123"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="amitabh@senjewellers.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Lead Source
                  </label>
                  <select
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', fontSize: '13px' }}
                  >
                    <option value="Meta Ads">Meta Ads</option>
                    <option value="Website Form">Website Form</option>
                    <option value="WhatsApp Referral">WhatsApp Referral</option>
                    <option value="Google Search">Google Search</option>
                    <option value="Instagram DM">Instagram DM</option>
                    <option value="Cold Call">Cold Call</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Pipeline Stage
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', fontSize: '13px' }}
                  >
                    {STAGES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Required Service
                  </label>
                  <select
                    value={formData.requiredService}
                    onChange={(e) => setFormData({ ...formData, requiredService: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', fontSize: '13px' }}
                  >
                    {ALL_SERVICES.map((srv) => (
                      <option key={srv} value={srv}>
                        {srv}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Estimated Budget (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 50000"
                    value={formData.estimatedBudget}
                    onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px' }}>
                  Next Follow-up Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={formData.followUpDate}
                  onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', fontSize: '13px' }}
                />
              </div>

              {!editingLead && (
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Initial Discovery Notes
                  </label>
                  <textarea
                    rows="2"
                    placeholder="What did the prospect ask for? Key pain points..."
                    value={formData.initialNote}
                    onChange={(e) => setFormData({ ...formData, initialNote: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', fontSize: '13px' }}
                  />
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn-secondary" style={{ padding: '8px 16px' }}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ padding: '8px 20px' }}>{editingLead ? 'Save Lead' : 'Create Lead'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 04. LEAD DETAILS & NOTES MODAL */}
      {/* ========================================================= */}
      {viewingLead && (
        <div className="modal-overlay" onClick={() => setViewingLead(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px', marginBottom: '18px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-white)' }}>
                  {viewingLead.businessName || viewingLead.name}
                </h2>
                <div style={{ fontSize: '13px', color: '#60a5fa', fontWeight: 600, marginTop: '2px' }}>
                  👤 {viewingLead.name} • {viewingLead.id}
                </div>
              </div>
              <button type="button" onClick={() => setViewingLead(null)} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', fontSize: '22px', cursor: 'pointer' }}>✕</button>
            </div>

            {/* Stage Selector & Actions */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: '12px', background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.2)', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-white)' }}>Stage:</span>
                <select
                  value={viewingLead.status}
                  onChange={(e) => {
                    updateLeadStatus(viewingLead.id, e.target.value);
                    setViewingLead({ ...viewingLead, status: e.target.value });
                  }}
                  style={{ fontSize: '12px', padding: '4px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)' }}
                >
                  {STAGES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={() => handleConvertLead(viewingLead)}
                className="btn-primary"
                style={{ padding: '6px 14px', fontSize: '12px' }}
              >
                🚀 Convert into Client
              </button>
            </div>

            {/* Details Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              <div style={{ padding: '10px 12px', borderRadius: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>PHONE & WHATSAPP</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-white)', marginTop: '2px' }}>{viewingLead.phone}</div>
                <a
                  href={`https://wa.me/${viewingLead.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '11px', color: '#10b981', textDecoration: 'none', fontWeight: 700, marginTop: '2px', display: 'inline-block' }}
                >
                  💬 Send WhatsApp Message
                </a>
              </div>

              <div style={{ padding: '10px 12px', borderRadius: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>EMAIL ADDRESS</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-white)', marginTop: '2px' }}>{viewingLead.email || 'N/A'}</div>
              </div>

              <div style={{ padding: '10px 12px', borderRadius: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>REQUIREMENT</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#93c5fd', marginTop: '2px' }}>{viewingLead.requiredService}</div>
              </div>

              <div style={{ padding: '10px 12px', borderRadius: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>ESTIMATED BUDGET</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-white)', marginTop: '2px' }}>{viewingLead.estimatedBudget ? formatINR(viewingLead.estimatedBudget) : 'To be discussed'}</div>
              </div>
            </div>

            {/* Notes Section */}
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-white)', marginBottom: '8px' }}>
                CRM Notes & Conversation History ({viewingLead.notes?.length || 0})
              </div>

              <form onSubmit={handleAddNote} style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <input
                  type="text"
                  placeholder="Record follow-up result, call feedback..."
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-white)', fontSize: '12.5px' }}
                />
                <button type="submit" className="btn-primary" style={{ padding: '8px 14px', fontSize: '12px' }}>+ Add Note</button>
              </form>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '160px', overflowY: 'auto' }}>
                {(viewingLead.notes || []).map((n) => (
                  <div key={n.id} style={{ padding: '8px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '12.5px', color: 'var(--text-white)' }}>{n.text}</div>
                    <div style={{ fontSize: '10.5px', color: 'var(--text-dim)', marginTop: '3px' }}>
                      {new Date(n.date).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
