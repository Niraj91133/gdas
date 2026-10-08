'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_CLIENTS, INITIAL_LEADS, INITIAL_INVOICES, AGENCY_DETAILS } from '../lib/adminStore';

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [clients, setClients] = useState([]);
  const [leads, setLeads] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from LocalStorage or Seed Data
  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem('gdas_admin_auth');
      if (savedAuth) {
        const parsed = JSON.parse(savedAuth);
        if (parsed?.isLoggedIn) {
          setIsAuthenticated(true);
          setAdminUser(parsed.user || { name: 'Ram Gyan', role: 'Super Admin', email: 'ramgyan@gdas.in' });
        }
      }

      const savedClients = localStorage.getItem('gdas_admin_clients');
      setClients(savedClients ? JSON.parse(savedClients) : INITIAL_CLIENTS);

      const savedLeads = localStorage.getItem('gdas_admin_leads');
      setLeads(savedLeads ? JSON.parse(savedLeads) : INITIAL_LEADS);

      const savedInvoices = localStorage.getItem('gdas_admin_invoices');
      setInvoices(savedInvoices ? JSON.parse(savedInvoices) : INITIAL_INVOICES);
    } catch (err) {
      console.error('Failed to load admin data from localStorage:', err);
      setClients(INITIAL_CLIENTS);
      setLeads(INITIAL_LEADS);
      setInvoices(INITIAL_INVOICES);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save changes to LocalStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('gdas_admin_clients', JSON.stringify(clients));
      } catch (e) {}
    }
  }, [clients, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('gdas_admin_leads', JSON.stringify(leads));
      } catch (e) {}
    }
  }, [leads, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('gdas_admin_invoices', JSON.stringify(invoices));
      } catch (e) {}
    }
  }, [invoices, isLoaded]);

  // Auth Operations
  const login = (emailOrUser, passwordOrPin) => {
    const validCredentials =
      (emailOrUser === 'admin@gdas.in' || emailOrUser === 'admin' || emailOrUser === 'ramgyan') &&
      (passwordOrPin === 'gdas@2026' || passwordOrPin === '123456' || passwordOrPin === 'admin123');

    if (validCredentials) {
      const user = {
        name: 'Mr. Ram Gyan',
        role: 'Founder & CEO (Super Admin)',
        email: 'ramgyan@gdas.in',
        avatar: '/ram_gyan_award.jpg'
      };
      setIsAuthenticated(true);
      setAdminUser(user);
      localStorage.setItem('gdas_admin_auth', JSON.stringify({ isLoggedIn: true, user }));
      return { success: true };
    }
    return { success: false, message: 'Invalid Admin credentials. Use admin / gdas@2026' };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdminUser(null);
    localStorage.removeItem('gdas_admin_auth');
  };

  // ----------------------------------------------------
  // CLIENT MANAGEMENT CRUD
  // ----------------------------------------------------
  const addClient = (clientData) => {
    const newId = `CL-${String(clients.length + 101).padStart(3, '0')}`;
    const totalVal = Number(clientData.totalProjectValue || 0);
    const paidVal = Number(clientData.paidAmount || 0);
    const pendingVal = Math.max(0, totalVal - paidVal);

    const newClient = {
      id: newId,
      name: clientData.name || '',
      businessName: clientData.businessName || '',
      phone: clientData.phone || '',
      email: clientData.email || '',
      address: clientData.address || '',
      gstNumber: clientData.gstNumber || '',
      services: clientData.services || [],
      projectStartDate: clientData.projectStartDate || new Date().toISOString().split('T')[0],
      projectEndDate: clientData.projectEndDate || '',
      totalProjectValue: totalVal,
      paidAmount: paidVal,
      pendingAmount: pendingVal,
      status: clientData.status || 'Active',
      notes: clientData.initialNote
        ? [{ id: `n-${Date.now()}`, text: clientData.initialNote, date: new Date().toISOString(), author: adminUser?.name || 'Admin' }]
        : [],
      documents: [],
      createdAt: new Date().toISOString()
    };

    setClients((prev) => [newClient, ...prev]);
    return newClient;
  };

  const editClient = (id, updatedData) => {
    setClients((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const totalVal = updatedData.totalProjectValue !== undefined ? Number(updatedData.totalProjectValue) : c.totalProjectValue;
          const paidVal = updatedData.paidAmount !== undefined ? Number(updatedData.paidAmount) : c.paidAmount;
          const pendingVal = Math.max(0, totalVal - paidVal);

          return {
            ...c,
            ...updatedData,
            totalProjectValue: totalVal,
            paidAmount: paidVal,
            pendingAmount: pendingVal
          };
        }
        return c;
      })
    );
  };

  const deleteClient = (id) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
  };

  const addClientNote = (clientId, noteText) => {
    if (!noteText.trim()) return;
    const newNote = {
      id: `n-${Date.now()}`,
      text: noteText.trim(),
      date: new Date().toISOString(),
      author: adminUser?.name || 'Admin'
    };

    setClients((prev) =>
      prev.map((c) => (c.id === clientId ? { ...c, notes: [newNote, ...(c.notes || [])] } : c))
    );
  };

  const addClientDocument = (clientId, docData) => {
    const newDoc = {
      id: `d-${Date.now()}`,
      name: docData.name || 'Document.pdf',
      type: docData.type || 'PDF',
      size: docData.size || '1.2 MB',
      uploadDate: new Date().toISOString().split('T')[0]
    };

    setClients((prev) =>
      prev.map((c) => (c.id === clientId ? { ...c, documents: [newDoc, ...(c.documents || [])] } : c))
    );
  };

  // ----------------------------------------------------
  // LEAD / CRM MANAGEMENT CRUD
  // ----------------------------------------------------
  const addLead = (leadData) => {
    const newId = `LD-${String(leads.length + 101).padStart(3, '0')}`;
    const newLead = {
      id: newId,
      name: leadData.name || '',
      businessName: leadData.businessName || '',
      phone: leadData.phone || '',
      email: leadData.email || '',
      source: leadData.source || 'Website Form',
      requiredService: leadData.requiredService || 'Meta Ads',
      estimatedBudget: Number(leadData.estimatedBudget || 0),
      status: leadData.status || 'New',
      followUpDate: leadData.followUpDate || '',
      notes: leadData.initialNote
        ? [{ id: `ln-${Date.now()}`, text: leadData.initialNote, date: new Date().toISOString() }]
        : [],
      createdAt: new Date().toISOString()
    };

    setLeads((prev) => [newLead, ...prev]);
    return newLead;
  };

  const editLead = (id, updatedData) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ...updatedData } : l))
    );
  };

  const deleteLead = (id) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  const updateLeadStatus = (id, newStatus) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );
  };

  const addLeadNote = (leadId, noteText) => {
    if (!noteText.trim()) return;
    const newNote = {
      id: `ln-${Date.now()}`,
      text: noteText.trim(),
      date: new Date().toISOString()
    };
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, notes: [newNote, ...(l.notes || [])] } : l))
    );
  };

  const convertLeadToClient = (leadId, extraClientData = {}) => {
    const lead = leads.find((l) => l.id === leadId);
    if (!lead) return null;

    const createdClient = addClient({
      name: lead.name,
      businessName: lead.businessName,
      phone: lead.phone,
      email: lead.email,
      address: extraClientData.address || '',
      gstNumber: extraClientData.gstNumber || '',
      services: [lead.requiredService],
      totalProjectValue: extraClientData.totalProjectValue || lead.estimatedBudget || 50000,
      paidAmount: extraClientData.paidAmount || 0,
      status: 'Active',
      initialNote: `Converted from Lead ${lead.id} (${lead.source}). Original Requirement: ${lead.requiredService}`
    });

    // Mark lead as Won
    updateLeadStatus(leadId, 'Won');
    return createdClient;
  };

  // ----------------------------------------------------
  // INVOICE MANAGEMENT CRUD
  // ----------------------------------------------------
  const generateInvoiceNumber = () => {
    const year = new Date().getFullYear();
    const count = invoices.length + 1;
    return `GDAS-INV-${year}-${String(count).padStart(3, '0')}`;
  };

  const createInvoice = (invData) => {
    const newId = `INV-${Date.now().toString().slice(-6)}`;
    const items = (invData.items || []).map((it, idx) => ({
      id: it.id || `it-${idx + 1}`,
      description: it.description || 'Service',
      quantity: Number(it.quantity || 1),
      unitPrice: Number(it.unitPrice || 0),
      total: Number(it.quantity || 1) * Number(it.unitPrice || 0)
    }));

    const subtotal = items.reduce((sum, it) => sum + it.total, 0);
    const discount = Number(invData.discount || 0);
    const taxableAmount = Math.max(0, subtotal - discount);
    const taxRate = invData.taxRate !== undefined ? Number(invData.taxRate) : 18;
    const taxAmount = (taxableAmount * taxRate) / 100;
    const totalAmount = taxableAmount + taxAmount;
    const paidAmount = Number(invData.paidAmount || 0);
    const balanceDue = Math.max(0, totalAmount - paidAmount);

    let calculatedStatus = invData.status || 'Draft';
    if (balanceDue === 0 && totalAmount > 0) {
      calculatedStatus = 'Paid';
    } else if (paidAmount > 0 && balanceDue > 0) {
      calculatedStatus = 'Partially Paid';
    }

    const newInvoice = {
      id: newId,
      invoiceNumber: invData.invoiceNumber || generateInvoiceNumber(),
      clientId: invData.clientId || '',
      clientName: invData.clientName || '',
      businessName: invData.businessName || '',
      clientEmail: invData.clientEmail || '',
      clientPhone: invData.clientPhone || '',
      clientAddress: invData.clientAddress || '',
      clientGst: invData.clientGst || '',
      issueDate: invData.issueDate || new Date().toISOString().split('T')[0],
      dueDate: invData.dueDate || '',
      items,
      subtotal,
      discount,
      taxRate,
      taxAmount,
      totalAmount,
      paidAmount,
      balanceDue,
      status: calculatedStatus,
      paymentMethod: invData.paymentMethod || '',
      paymentDate: invData.paymentDate || '',
      terms: invData.terms || 'Payment payable via UPI / Bank Transfer. GDAs is a registered Digital Solutions Provider.',
      createdAt: new Date().toISOString()
    };

    setInvoices((prev) => [newInvoice, ...prev]);
    return newInvoice;
  };

  const editInvoice = (id, updatedData) => {
    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id === id) {
          const items = (updatedData.items || inv.items).map((it, idx) => ({
            id: it.id || `it-${idx + 1}`,
            description: it.description || 'Service',
            quantity: Number(it.quantity || 1),
            unitPrice: Number(it.unitPrice || 0),
            total: Number(it.quantity || 1) * Number(it.unitPrice || 0)
          }));

          const subtotal = items.reduce((sum, it) => sum + it.total, 0);
          const discount = updatedData.discount !== undefined ? Number(updatedData.discount) : inv.discount;
          const taxableAmount = Math.max(0, subtotal - discount);
          const taxRate = updatedData.taxRate !== undefined ? Number(updatedData.taxRate) : inv.taxRate;
          const taxAmount = (taxableAmount * taxRate) / 100;
          const totalAmount = taxableAmount + taxAmount;
          const paidAmount = updatedData.paidAmount !== undefined ? Number(updatedData.paidAmount) : inv.paidAmount;
          const balanceDue = Math.max(0, totalAmount - paidAmount);

          let status = updatedData.status || inv.status;
          if (balanceDue === 0 && totalAmount > 0) {
            status = 'Paid';
          } else if (paidAmount > 0 && balanceDue > 0 && status !== 'Overdue') {
            status = 'Partially Paid';
          }

          return {
            ...inv,
            ...updatedData,
            items,
            subtotal,
            discount,
            taxRate,
            taxAmount,
            totalAmount,
            paidAmount,
            balanceDue,
            status
          };
        }
        return inv;
      })
    );
  };

  const deleteInvoice = (id) => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
  };

  const duplicateInvoice = (id) => {
    const original = invoices.find((inv) => inv.id === id);
    if (!original) return null;

    const duplicated = {
      ...original,
      id: `INV-${Date.now().toString().slice(-6)}`,
      invoiceNumber: generateInvoiceNumber(),
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: '',
      status: 'Draft',
      paidAmount: 0,
      balanceDue: original.totalAmount,
      createdAt: new Date().toISOString()
    };

    setInvoices((prev) => [duplicated, ...prev]);
    return duplicated;
  };

  const updateInvoiceStatus = (id, newStatus) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status: newStatus } : inv))
    );
  };

  // Reset demo data
  const resetToSampleData = () => {
    setClients(INITIAL_CLIENTS);
    setLeads(INITIAL_LEADS);
    setInvoices(INITIAL_INVOICES);
    localStorage.setItem('gdas_admin_clients', JSON.stringify(INITIAL_CLIENTS));
    localStorage.setItem('gdas_admin_leads', JSON.stringify(INITIAL_LEADS));
    localStorage.setItem('gdas_admin_invoices', JSON.stringify(INITIAL_INVOICES));
  };

  // ----------------------------------------------------
  // COMPUTED KPI METRICS & STATS
  // ----------------------------------------------------
  const totalClients = clients.length;
  const activeClients = clients.filter((c) => c.status === 'Active').length;
  const newLeads = leads.filter((l) => l.status === 'New' || l.status === 'Contacted').length;

  const totalRevenue = invoices
    .filter((inv) => inv.status !== 'Cancelled')
    .reduce((sum, inv) => sum + (inv.paidAmount || 0), 0);

  const pendingPayments = invoices
    .filter((inv) => inv.status === 'Sent' || inv.status === 'Partially Paid')
    .reduce((sum, inv) => sum + (inv.balanceDue || 0), 0);

  const overduePayments = invoices
    .filter((inv) => inv.status === 'Overdue')
    .reduce((sum, inv) => sum + (inv.balanceDue || 0), 0);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const thisMonthRevenue = invoices
    .filter((inv) => {
      if (!inv.issueDate) return false;
      const invDate = new Date(inv.issueDate);
      return invDate.getMonth() === currentMonth && invDate.getFullYear() === currentYear && inv.status !== 'Cancelled';
    })
    .reduce((sum, inv) => sum + (inv.paidAmount || 0), 0);

  const pendingInvoices = invoices.filter(
    (inv) => inv.status === 'Draft' || inv.status === 'Sent' || inv.status === 'Partially Paid' || inv.status === 'Overdue'
  ).length;

  // Upcoming Follow-ups (leads with future follow-up dates)
  const upcomingFollowUps = leads
    .filter((l) => l.followUpDate && l.status !== 'Won' && l.status !== 'Lost')
    .sort((a, b) => new Date(a.followUpDate) - new Date(b.followUpDate));

  return (
    <AdminContext.Provider
      value={{
        isLoaded,
        isAuthenticated,
        adminUser,
        login,
        logout,
        agencyDetails: AGENCY_DETAILS,
        // Clients
        clients,
        addClient,
        editClient,
        deleteClient,
        addClientNote,
        addClientDocument,
        // Leads
        leads,
        addLead,
        editLead,
        deleteLead,
        updateLeadStatus,
        addLeadNote,
        convertLeadToClient,
        // Invoices
        invoices,
        createInvoice,
        editInvoice,
        deleteInvoice,
        duplicateInvoice,
        updateInvoiceStatus,
        generateInvoiceNumber,
        // Stats
        totalClients,
        activeClients,
        newLeads,
        totalRevenue,
        thisMonthRevenue,
        pendingPayments,
        overduePayments,
        pendingInvoices,
        upcomingFollowUps,
        resetToSampleData
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
