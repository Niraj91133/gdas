// lib/adminStore.js - GDAs Admin System Data Store & Mock Engine

export const INITIAL_CLIENTS = [
  {
    id: 'CL-001',
    name: 'Rajesh Singhania',
    businessName: 'Singhania Retail Group',
    phone: '+91 98351 22410',
    email: 'rajesh@singhaniaretail.com',
    address: 'City Center Mall, Main Road, Gaya, Bihar - 823001',
    gstNumber: '10AAACS1429B1Z4',
    services: ['Meta Ads Management', 'Google Ads Management', 'Local SEO & GMB', 'WhatsApp Bulk Marketing'],
    projectStartDate: '2026-01-15',
    projectEndDate: '2026-12-31',
    totalProjectValue: 240000,
    paidAmount: 160000,
    pendingAmount: 80000,
    status: 'Active',
    notes: [
      { id: 'n-1', text: 'Campaign ROAS hit 4.8x in March. Preparing summer retail sale blast.', date: '2026-03-28T10:30:00Z', author: 'Ram Gyan' },
      { id: 'n-2', text: 'Quarterly review completed. Client approved ₹30k/mo ad budget bump.', date: '2026-02-14T14:00:00Z', author: 'Admin' }
    ],
    documents: [
      { id: 'd-1', name: 'Singhania_Retail_Master_Agreement.pdf', type: 'PDF', size: '2.4 MB', uploadDate: '2026-01-15' },
      { id: 'd-2', name: 'March_Performance_Audit_Report.pdf', type: 'PDF', size: '4.1 MB', uploadDate: '2026-03-31' }
    ],
    createdAt: '2026-01-15T09:00:00Z'
  },
  {
    id: 'CL-002',
    name: 'Kumud Kundan',
    businessName: 'Kumud Kundan Makeup & Hair Academy',
    phone: '+91 94312 88719',
    email: 'kumudkundanacademy@gmail.com',
    address: 'Bodhgaya Road, Near Central Bus Stand, Gaya, Bihar',
    gstNumber: '10BPNPK4512Q1ZX',
    services: ['Meta Ads Management', 'Lead Generation Services', 'Social Media Marketing', 'Creative Branding'],
    projectStartDate: '2026-02-01',
    projectEndDate: '2026-08-31',
    totalProjectValue: 120000,
    paidAmount: 120000,
    pendingAmount: 0,
    status: 'Active',
    notes: [
      { id: 'n-3', text: 'Academy admission batch 12 filled in 4 days via Meta Lead Ads. Super happy client.', date: '2026-03-15T11:00:00Z', author: 'Ram Gyan' }
    ],
    documents: [
      { id: 'd-3', name: 'Academy_Creative_Kit_2026.zip', type: 'ZIP', size: '18.5 MB', uploadDate: '2026-02-05' }
    ],
    createdAt: '2026-02-01T10:00:00Z'
  },
  {
    id: 'CL-003',
    name: 'Ravi Kumar Tiwari',
    businessName: 'Patratu Valley Eco Resorts & Tourism',
    phone: '+91 98357 66102',
    email: 'stay@patraturesort.in',
    address: 'Patratu Dam Circular Road, Ramgarh, Jharkhand - 829118',
    gstNumber: '20AAECR8812M1Z8',
    services: ['Website Development', 'Google Ads Management', 'Local SEO & GMB', 'IVR Calling Service'],
    projectStartDate: '2026-01-10',
    projectEndDate: '2026-06-30',
    totalProjectValue: 180000,
    paidAmount: 120000,
    pendingAmount: 60000,
    status: 'Active',
    notes: [
      { id: 'n-4', text: 'Booking portal integration live. Google Ads delivering ₹80 Cost per booking lead.', date: '2026-03-20T16:45:00Z', author: 'Admin' }
    ],
    documents: [
      { id: 'd-4', name: 'Resort_Booking_Engine_Specs.pdf', type: 'PDF', size: '1.8 MB', uploadDate: '2026-01-12' }
    ],
    createdAt: '2026-01-10T12:00:00Z'
  },
  {
    id: 'CL-004',
    name: 'Tanisha Choudhary',
    businessName: 'Nectar Organic Skincare & Wellness',
    phone: '+91 91234 56780',
    email: 'hello@nectarorganics.in',
    address: 'Kankarbagh Main Road, Patna, Bihar - 800020',
    gstNumber: '10AAOCN9901R1Z2',
    services: ['Website Development', 'Meta Ads Management', 'Creative Branding'],
    projectStartDate: '2025-11-01',
    projectEndDate: '2026-02-28',
    totalProjectValue: 95000,
    paidAmount: 95000,
    pendingAmount: 0,
    status: 'Completed',
    notes: [
      { id: 'n-5', text: 'Shopify D2C store handed over. E-commerce conversion rate increased to 3.4%.', date: '2026-02-28T18:00:00Z', author: 'Ram Gyan' }
    ],
    documents: [
      { id: 'd-5', name: 'Store_Handover_Credentials.pdf', type: 'PDF', size: '850 KB', uploadDate: '2026-02-28' }
    ],
    createdAt: '2025-11-01T10:00:00Z'
  },
  {
    id: 'CL-005',
    name: 'Dr. Alok Verma',
    businessName: 'Verma Super Specialty Dental Care',
    phone: '+91 94308 11223',
    email: 'care@vermadentalclinic.com',
    address: 'Station Road, Gaya, Bihar - 823002',
    gstNumber: '',
    services: ['Local SEO & GMB', 'Meta Ads Management', 'WhatsApp Bulk Marketing'],
    projectStartDate: '2026-03-01',
    projectEndDate: '2026-09-30',
    totalProjectValue: 75000,
    paidAmount: 25000,
    pendingAmount: 50000,
    status: 'Active',
    notes: [
      { id: 'n-6', text: 'GMB 3-pack ranking achieved for "Best Dentist in Gaya". Clinic walk-ins increased 40%.', date: '2026-03-25T12:30:00Z', author: 'Ram Gyan' }
    ],
    documents: [],
    createdAt: '2026-03-01T11:00:00Z'
  },
  {
    id: 'CL-006',
    name: 'Vikramaditya Roy',
    businessName: 'Vikas Political Campaign Advisory',
    phone: '+91 97091 44556',
    email: 'campaign@vikaspr.org',
    address: 'Boring Road, Patna, Bihar',
    gstNumber: '10AAAVR7788P1Z9',
    services: ['Digital Political Campaigning', 'WhatsApp Bulk Marketing', 'IVR Calling Service', 'Social Media Marketing'],
    projectStartDate: '2026-02-15',
    projectEndDate: '2026-05-15',
    totalProjectValue: 350000,
    paidAmount: 200000,
    pendingAmount: 150000,
    status: 'Active',
    notes: [
      { id: 'n-7', text: '5 Lakh WhatsApp constituency blast completed with video manifesto. Response rate > 12%.', date: '2026-03-30T17:00:00Z', author: 'Ram Gyan' }
    ],
    documents: [
      { id: 'd-6', name: 'Constituency_Demographics_Strategy.pdf', type: 'PDF', size: '5.6 MB', uploadDate: '2026-02-16' }
    ],
    createdAt: '2026-02-15T09:30:00Z'
  }
];

export const INITIAL_LEADS = [
  {
    id: 'LD-101',
    name: 'Amitabh Sen',
    businessName: 'Sen Jewellers & Gold House',
    phone: '+91 98350 77123',
    email: 'amitabh@senjewellers.com',
    source: 'Meta Ads',
    requiredService: 'Meta Ads & Branding',
    estimatedBudget: 60000,
    status: 'Follow-up',
    followUpDate: '2026-10-10T11:30:00',
    notes: [
      { id: 'ln-1', text: 'Interested in Dhanteras & Diwali festival campaign. Requested case studies of retail brands.', date: '2026-10-06T15:00:00Z' }
    ],
    createdAt: '2026-10-04T10:00:00Z'
  },
  {
    id: 'LD-102',
    name: 'Pooja Agarwal',
    businessName: 'Little Angels Play School & Daycare',
    phone: '+91 94318 99882',
    email: 'admission@littleangelsschool.in',
    source: 'Website Form',
    requiredService: 'Local SEO & Lead Generation',
    estimatedBudget: 35000,
    status: 'Proposal Sent',
    followUpDate: '2026-10-11T14:00:00',
    notes: [
      { id: 'ln-2', text: 'Sent proposal for ₹35,000/mo package covering Google Ads + Meta Admission Ads.', date: '2026-10-07T16:30:00Z' }
    ],
    createdAt: '2026-10-05T12:15:00Z'
  },
  {
    id: 'LD-103',
    name: 'Er. Manoj Kumar',
    businessName: 'Manoj Construction & Infra Tech',
    phone: '+91 99341 55667',
    email: 'manoj@manojinfra.com',
    source: 'WhatsApp Referral',
    requiredService: 'CRM, ERP & Business Automation',
    estimatedBudget: 150000,
    status: 'New',
    followUpDate: '2026-10-09T17:00:00',
    notes: [
      { id: 'ln-3', text: 'Referred by Rajesh Singhania. Needs custom CRM for tracking site inventory and worker attendance.', date: '2026-10-08T09:00:00Z' }
    ],
    createdAt: '2026-10-08T09:00:00Z'
  },
  {
    id: 'LD-104',
    name: 'Suman Sinha',
    businessName: 'Suman Diagnostic & Pathology Labs',
    phone: '+91 94310 33445',
    email: 'info@sumandiagnostics.com',
    source: 'Google Search',
    requiredService: 'Local SEO & GMB Setup',
    estimatedBudget: 25000,
    status: 'Contacted',
    followUpDate: '2026-10-12T10:00:00',
    notes: [
      { id: 'ln-4', text: 'Had preliminary 15-min discovery call. Wants to rank for "blood test at home Gaya".', date: '2026-10-07T11:00:00Z' }
    ],
    createdAt: '2026-10-06T14:30:00Z'
  },
  {
    id: 'LD-105',
    name: 'Deepak Jha',
    businessName: 'Jha Fitness Club & Crossfit',
    phone: '+91 91220 88990',
    email: 'deepak@jhafitness.in',
    source: 'Instagram DM',
    requiredService: 'Social Media & Meta Ads',
    estimatedBudget: 30000,
    status: 'Won',
    followUpDate: '',
    notes: [
      { id: 'ln-5', text: 'Agreed to 3-month trial package. Converting to client today.', date: '2026-10-08T18:00:00Z' }
    ],
    createdAt: '2026-10-02T16:00:00Z'
  },
  {
    id: 'LD-106',
    name: 'Anil Gupta',
    businessName: 'Gupta Auto Spares & Accessories',
    phone: '+91 98354 11229',
    email: 'guptaautospares@yahoo.com',
    source: 'Cold Call',
    requiredService: 'Website Development',
    estimatedBudget: 20000,
    status: 'Lost',
    followUpDate: '',
    notes: [
      { id: 'ln-6', text: 'Budget constraint. Currently not looking for online e-commerce website.', date: '2026-10-05T17:00:00Z' }
    ],
    createdAt: '2026-10-01T11:00:00Z'
  }
];

export const INITIAL_INVOICES = [
  {
    id: 'INV-2026-001',
    invoiceNumber: 'GDAS-INV-2026-001',
    clientId: 'CL-001',
    clientName: 'Rajesh Singhania',
    businessName: 'Singhania Retail Group',
    clientEmail: 'rajesh@singhaniaretail.com',
    clientPhone: '+91 98351 22410',
    clientAddress: 'City Center Mall, Main Road, Gaya, Bihar - 823001',
    clientGst: '10AAACS1429B1Z4',
    issueDate: '2026-03-01',
    dueDate: '2026-03-15',
    items: [
      { id: 'it-1', description: 'Meta & Google Ads Campaign Management - Monthly Retainer (Q1)', quantity: 1, unitPrice: 50000, total: 50000 },
      { id: 'it-2', description: 'High-Converting Festive Video Ad Creatives (Batch of 8 Reels)', quantity: 1, unitPrice: 20000, total: 20000 },
      { id: 'it-3', description: 'WhatsApp Bulk Notification Gateway (100,000 Verified Broadcasts)', quantity: 1, unitPrice: 10000, total: 10000 }
    ],
    subtotal: 80000,
    discount: 0,
    taxRate: 18,
    taxAmount: 14400,
    totalAmount: 94400,
    paidAmount: 94400,
    balanceDue: 0,
    status: 'Paid',
    paymentMethod: 'Bank Transfer (NEFT)',
    paymentDate: '2026-03-10',
    terms: 'Payment received with thanks. GDAs performance SLAs active.',
    createdAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'INV-2026-002',
    invoiceNumber: 'GDAS-INV-2026-002',
    clientId: 'CL-003',
    clientName: 'Ravi Kumar Tiwari',
    businessName: 'Patratu Valley Eco Resorts & Tourism',
    clientEmail: 'stay@patraturesort.in',
    clientPhone: '+91 98357 66102',
    clientAddress: 'Patratu Dam Circular Road, Ramgarh, Jharkhand - 829118',
    clientGst: '20AAECR8812M1Z8',
    issueDate: '2026-03-15',
    dueDate: '2026-03-30',
    items: [
      { id: 'it-4', description: 'Custom Next.js Resort Booking Engine & Fast Landing Pages', quantity: 1, unitPrice: 60000, total: 60000 },
      { id: 'it-5', description: 'Local SEO & Google My Business Multi-Location 3-Pack Optimization', quantity: 1, unitPrice: 25000, total: 25000 },
      { id: 'it-6', description: 'Smart Cloud IVR Virtual Receptionist Setup & Integration', quantity: 1, unitPrice: 15000, total: 15000 }
    ],
    subtotal: 100000,
    discount: 5000,
    taxRate: 18,
    taxAmount: 17100,
    totalAmount: 112100,
    paidAmount: 60000,
    balanceDue: 52100,
    status: 'Partially Paid',
    paymentMethod: 'UPI',
    paymentDate: '2026-03-18',
    terms: '50% advance received upon milestone 1 delivery. Balance due upon full deployment.',
    createdAt: '2026-03-15T11:00:00Z'
  },
  {
    id: 'INV-2026-003',
    invoiceNumber: 'GDAS-INV-2026-003',
    clientId: 'CL-006',
    clientName: 'Vikramaditya Roy',
    businessName: 'Vikas Political Campaign Advisory',
    clientEmail: 'campaign@vikaspr.org',
    clientPhone: '+91 97091 44556',
    clientAddress: 'Boring Road, Patna, Bihar',
    clientGst: '10AAAVR7788P1Z9',
    issueDate: '2026-03-20',
    dueDate: '2026-04-05',
    items: [
      { id: 'it-7', description: 'Constituency Digital Outreach & Social Narrative Engineering (Phase 1)', quantity: 1, unitPrice: 150000, total: 150000 },
      { id: 'it-8', description: 'Voice Call Broadcasting (IVR) - 250,000 Voter Reach System', quantity: 1, unitPrice: 50000, total: 50000 }
    ],
    subtotal: 200000,
    discount: 10000,
    taxRate: 18,
    taxAmount: 34200,
    totalAmount: 224200,
    paidAmount: 100000,
    balanceDue: 124200,
    status: 'Overdue',
    paymentMethod: 'Bank Transfer (RTGS)',
    paymentDate: '2026-03-22',
    terms: 'Overdue reminder sent via WhatsApp and Email. Phase 2 execution pending balance clearance.',
    createdAt: '2026-03-20T09:00:00Z'
  },
  {
    id: 'INV-2026-004',
    invoiceNumber: 'GDAS-INV-2026-004',
    clientId: 'CL-002',
    clientName: 'Kumud Kundan',
    businessName: 'Kumud Kundan Makeup & Hair Academy',
    clientEmail: 'kumudkundanacademy@gmail.com',
    clientPhone: '+91 94312 88719',
    clientAddress: 'Bodhgaya Road, Near Central Bus Stand, Gaya, Bihar',
    clientGst: '10BPNPK4512Q1ZX',
    issueDate: '2026-04-01',
    dueDate: '2026-04-15',
    items: [
      { id: 'it-9', description: 'Monthly Meta Lead Ads & High-Intent Academy Student Enrolment', quantity: 1, unitPrice: 35000, total: 35000 },
      { id: 'it-10', description: 'Creative Reels Design & Video Editing (12 Monthly Assets)', quantity: 1, unitPrice: 15000, total: 15000 }
    ],
    subtotal: 50000,
    discount: 0,
    taxRate: 18,
    taxAmount: 9000,
    totalAmount: 59000,
    paidAmount: 0,
    balanceDue: 59000,
    status: 'Sent',
    paymentMethod: '',
    paymentDate: '',
    terms: 'Standard 15 days credit period. Payment payable via UPI / Netbanking.',
    createdAt: '2026-04-01T10:30:00Z'
  },
  {
    id: 'INV-2026-005',
    invoiceNumber: 'GDAS-INV-2026-005',
    clientId: 'CL-005',
    clientName: 'Dr. Alok Verma',
    businessName: 'Verma Super Specialty Dental Care',
    clientEmail: 'care@vermadentalclinic.com',
    clientPhone: '+91 94308 11223',
    clientAddress: 'Station Road, Gaya, Bihar - 823002',
    clientGst: '',
    issueDate: '2026-04-05',
    dueDate: '2026-04-20',
    items: [
      { id: 'it-11', description: 'Local Patient Growth & GMB Multi-Keyword Dominance', quantity: 1, unitPrice: 25000, total: 25000 }
    ],
    subtotal: 25000,
    discount: 0,
    taxRate: 18,
    taxAmount: 4500,
    totalAmount: 29500,
    paidAmount: 0,
    balanceDue: 29500,
    status: 'Draft',
    paymentMethod: '',
    paymentDate: '',
    terms: 'Draft invoice for monthly dental consultation campaign.',
    createdAt: '2026-04-05T14:00:00Z'
  }
];

export const AGENCY_DETAILS = {
  name: 'Ganesha Digital Ads (GDAs)',
  tagline: 'One Platform. All Solutions. Digital Ka Saath, Aapke Business Ka Vikas.',
  ceo: 'Mr. Ram Gyan',
  email: 'contact@ganeshadigiads.in',
  phone: '+91 99398 62765',
  whatsapp: '+91 99398 62765',
  website: 'https://ganeshadigiads.in',
  address: 'GDAs Digital HQ, Near White House Compound, Gaya, Bihar - 823001',
  gstin: '10AAEFG8849L1Z5',
  pan: 'AAEFG8849L',
  bankDetails: {
    accountName: 'GANESHA DIGITAL ADS',
    bankName: 'Axis Bank Ltd',
    accountNumber: '923020048192831',
    ifscCode: 'UTIB0000428',
    branch: 'Gaya Main Branch, Bihar',
    upiId: '9939862765@okbizaxis'
  }
};

export const ALL_SERVICES = [
  'Meta Ads Management',
  'Google Ads Management',
  'Lead Generation Services',
  'Social Media Marketing',
  'Search Engine Optimization (SEO)',
  'Local SEO & GMB Ranking',
  'Website & E-Commerce Development',
  'Creative Graphic & Video Branding',
  'IVR Calling Service',
  'WhatsApp Bulk Marketing',
  'Digital Political Campaigning',
  'Business Growth Management',
  'CRM, ERP & Business Automation',
  'Digital Marketing Training'
];
