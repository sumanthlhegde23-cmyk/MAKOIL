// MAKOIL Billing & Invoicing Application
// State Management & Core Logic

const STORAGE_KEY = 'makoil_billing_data_v1';

// Initial realistic default data for MAKOIL
const defaultState = {
  activePage: 'customers', // Default selected: Customers
  company: {
    name: 'MAKOIL LUBRICANTS & INDUSTRIAL OILS',
    tagline: 'Premium Automotive & Industrial Lubricants',
    gstin: '29AAAAA0000A1Z5',
    pan: 'AAAAA0000A',
    address: 'Plot No. 18/B, Industrial Area, Tarihal',
    city: 'Hubballi',
    state: 'Karnataka',
    stateCode: '29',
    pincode: '580026',
    phone: '+91 836 2489012 / +91 94481 00021',
    email: 'billing@makoil.in',
    bankName: 'HDFC Bank Ltd',
    accNo: '50200012345678',
    ifsc: 'HDFC0001234',
    branch: 'PB Road Branch, Hubballi'
  },
  customers: [
    {
      id: 'cust-1',
      name: 'Rajesh Sharma',
      shopName: 'Shree Krishna Auto Works',
      phone: '+91 98451 22345',
      primaryNumber: '+91 98451 22345',
      secondaryNumber: '+91 836 2211445',
      email: 'skautoworks@gmail.com',
      gstin: '29ABCDE1234F1Z5',
      gstNumber: '29ABCDE1234F1Z5',
      address: 'Plot 45, Auto Nagar, Gokul Road',
      city: 'Hubballi',
      state: 'Karnataka (29)',
      balance: 45200,
      creditLimit: 100000,
      photo: ''
    },
    {
      id: 'cust-2',
      name: 'Gurpreet Singh',
      shopName: 'National Logistics & Transport Fleet',
      phone: '+91 98860 33411',
      primaryNumber: '+91 98860 33411',
      secondaryNumber: '+91 94480 11223',
      email: 'transport.national@yahoo.com',
      gstin: '29PQRS5678M1Z2',
      gstNumber: '29PQRS5678M1Z2',
      address: '12/A Highway Yard, Nelamangala',
      city: 'Bengaluru',
      state: 'Karnataka (29)',
      balance: 112000,
      creditLimit: 250000,
      photo: ''
    },
    {
      id: 'cust-3',
      name: 'Sanjay Patil',
      shopName: 'Mahalaxmi Earthmovers & Mining',
      phone: '+91 94481 99012',
      primaryNumber: '+91 94481 99012',
      secondaryNumber: '+91 94220 55441',
      email: 'mahalaxmiearth@gmail.com',
      gstin: '27AABCM7789C1ZT',
      gstNumber: '27AABCM7789C1ZT',
      address: 'Sector 3, MIDC Shiroli',
      city: 'Kolhapur',
      state: 'Maharashtra (27)',
      balance: 18500,
      creditLimit: 75000,
      photo: ''
    },
    {
      id: 'cust-4',
      name: 'Venkatesh Rao',
      shopName: 'Apex Precision Engineering Works',
      phone: '+91 94220 88716',
      primaryNumber: '+91 94220 88716',
      secondaryNumber: '',
      email: 'purchase@apexeng.in',
      gstin: '29AAACH4532B1ZX',
      gstNumber: '29AAACH4532B1ZX',
      address: 'Peenya 2nd Stage, Industrial Estate',
      city: 'Bengaluru',
      state: 'Karnataka (29)',
      balance: 0,
      creditLimit: 100000,
      photo: ''
    },
    {
      id: 'cust-5',
      name: 'Anand Bhat',
      shopName: 'Sai Ram Service Station & Spares',
      phone: '+91 97412 55678',
      primaryNumber: '+91 97412 55678',
      secondaryNumber: '+91 8384 226100',
      email: 'sairamservice@gmail.com',
      gstin: '29BZCP8901L1Z9',
      gstNumber: '29BZCP8901L1Z9',
      address: 'Main Road, Near Old Bus Stand',
      city: 'Sirsi',
      state: 'Karnataka (29)',
      balance: 28400,
      creditLimit: 60000,
      photo: ''
    }
  ],
  receipts: [
    {
      id: 'rcp-1',
      receiptNo: 'RCP-2026-001',
      customerId: 'cust-1',
      customerName: 'Shree Krishna Auto Works',
      date: '2026-11-20',
      amount: 25000,
      mode: 'UPI / QR',
      refNo: 'UPI/632891048291',
      notes: 'Part payment against Invoice #MAK-26-0101'
    },
    {
      id: 'rcp-2',
      receiptNo: 'RCP-2026-002',
      customerId: 'cust-2',
      customerName: 'National Logistics & Transport Fleet',
      date: '2026-11-22',
      amount: 50000,
      mode: 'NEFT / RTGS',
      refNo: 'NEFT/HDFC26391084',
      notes: 'Monthly fleet service settlement'
    },
    {
      id: 'rcp-3',
      receiptNo: 'RCP-2026-003',
      customerId: 'cust-5',
      customerName: 'Sai Ram Service Station & Spares',
      date: '2026-11-24',
      amount: 15000,
      mode: 'Cash',
      refNo: 'CASH-REC-112',
      notes: 'Direct counter cash receipt'
    }
  ],
  gstBills: [
    {
      id: 'inv-1',
      invoiceNo: 'MAK-26-0101',
      date: '2026-11-18',
      dueDate: '2026-12-02',
      customerId: 'cust-1',
      customerName: 'Shree Krishna Auto Works',
      customerGstin: '29ABCDE1234F1Z5',
      address: 'Plot 45, Auto Nagar, Gokul Road, Hubballi',
      state: 'Karnataka (29)',
      isInterState: false,
      items: [
        {
          desc: 'MAK 4T Plus 20W-40 Premium 4-Stroke Engine Oil (1 Ltr Can)',
          hsn: '2710',
          qty: 50,
          unit: 'Ltr',
          rate: 360,
          gstRate: 18,
          taxable: 18000,
          cgst: 1620,
          sgst: 1620,
          igst: 0,
          total: 21240
        },
        {
          desc: 'MAK Diamond 15W-40 Heavy Duty Commercial Engine Oil (20 Ltr Bucket)',
          hsn: '2710',
          qty: 4,
          unit: 'Bucket',
          rate: 5800,
          gstRate: 18,
          taxable: 23200,
          cgst: 2088,
          sgst: 2088,
          igst: 0,
          total: 27376
        }
      ],
      subtotal: 41200,
      cgstTotal: 3708,
      sgstTotal: 3708,
      igstTotal: 0,
      grandTotal: 48616,
      status: 'Partial',
      notes: 'Goods once sold cannot be returned. 18% p.a. interest after due date.'
    },
    {
      id: 'inv-2',
      invoiceNo: 'MAK-26-0102',
      date: '2026-11-21',
      dueDate: '2026-12-05',
      customerId: 'cust-3',
      customerName: 'Mahalaxmi Earthmovers & Mining',
      customerGstin: '27AABCM7789C1ZT',
      address: 'Sector 3, MIDC Shiroli, Kolhapur',
      state: 'Maharashtra (27)',
      isInterState: true,
      items: [
        {
          desc: 'MAK Hydra 68 Premium Anti-Wear Hydraulic Oil (210 Ltr Barrel)',
          hsn: '2710',
          qty: 1,
          unit: 'Barrel',
          rate: 32500,
          gstRate: 18,
          taxable: 32500,
          cgst: 0,
          sgst: 0,
          igst: 5850,
          total: 38350
        }
      ],
      subtotal: 32500,
      cgstTotal: 0,
      sgstTotal: 0,
      igstTotal: 5850,
      grandTotal: 38350,
      status: 'Unpaid',
      notes: 'Inter-State supply. E-Way Bill No: 281903829102.'
    },
    {
      id: 'inv-3',
      invoiceNo: 'MAK-26-0103',
      date: '2026-11-23',
      dueDate: '2026-12-07',
      customerId: 'cust-4',
      customerName: 'Apex Precision Engineering Works',
      customerGstin: '29AAACH4532B1ZX',
      address: 'Peenya 2nd Stage, Industrial Estate, Bengaluru',
      state: 'Karnataka (29)',
      isInterState: false,
      items: [
        {
          desc: 'MAK Sherol B Soluble Cutting Oil for CNC Machining (20 Ltr)',
          hsn: '2710',
          qty: 3,
          unit: 'Bucket',
          rate: 4900,
          gstRate: 18,
          taxable: 14700,
          cgst: 1323,
          sgst: 1323,
          igst: 0,
          total: 17346
        }
      ],
      subtotal: 14700,
      cgstTotal: 1323,
      sgstTotal: 1323,
      igstTotal: 0,
      grandTotal: 17346,
      status: 'Paid',
      notes: 'Paid in full via Bank Transfer.'
    }
  ],
  inputBills: [
    {
      id: 'inpb-1',
      billNo: 'BPCL-INV-99201',
      supplierName: 'Bharat Petroleum Corporation Ltd',
      supplierGstin: '29AAACB2902M1ZP',
      date: '2026-11-10',
      category: 'Base Oil & Bulk Lubricants',
      taxable: 180000,
      gstRate: 18,
      cgst: 16200,
      sgst: 16200,
      igst: 0,
      total: 212400,
      itcEligible: true,
      paymentStatus: 'Paid'
    },
    {
      id: 'inpb-2',
      billNo: 'HPCL-BL-44912',
      supplierName: 'Hindustan Petroleum (HPCL Hubli Depot)',
      supplierGstin: '29AAACH1118E1Z4',
      date: '2026-11-15',
      category: 'Lithium Complex Greases',
      taxable: 65000,
      gstRate: 18,
      cgst: 5850,
      sgst: 5850,
      igst: 0,
      total: 76700,
      itcEligible: true,
      paymentStatus: 'Paid'
    },
    {
      id: 'inpb-3',
      billNo: 'PC-PKG-8812',
      supplierName: 'PolyCan Packaging & Containers Pvt Ltd',
      supplierGstin: '29AAPCP9981K1Z3',
      date: '2026-11-17',
      category: 'HDPE Barrels & Packaging',
      taxable: 28000,
      gstRate: 18,
      cgst: 2520,
      sgst: 2520,
      igst: 0,
      total: 33040,
      itcEligible: true,
      paymentStatus: 'Due'
    },
    {
      id: 'inpb-4',
      billNo: 'SFC-TR-339',
      supplierName: 'Southern Freight Carriers',
      supplierGstin: '29AACSF4412R1ZZ',
      date: '2026-11-20',
      category: 'Inward Freight & Logistics',
      taxable: 12000,
      gstRate: 5,
      cgst: 300,
      sgst: 300,
      igst: 0,
      total: 12600,
      itcEligible: true,
      paymentStatus: 'Paid'
    }
  ]
};

// Application State
let appState = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Ensure activePage defaults to 'customers' as requested
      if (!parsed.activePage) parsed.activePage = 'customers';
      // Normalize customers data for backwards compatibility
      if (Array.isArray(parsed.customers)) {
        parsed.customers = parsed.customers.map(c => ({
          ...c,
          shopName: c.shopName || '',
          primaryNumber: c.primaryNumber || c.phone || '',
          secondaryNumber: c.secondaryNumber || '',
          gstNumber: c.gstNumber || c.gstin || '',
          photo: c.photo || ''
        }));
      }
      return parsed;
    }
  } catch (e) {
    console.error('Failed to load local state:', e);
  }
  return JSON.parse(JSON.stringify(defaultState));
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  } catch (e) {
    console.error('Failed to save state:', e);
  }
}

// Format currency in Indian Rupees
function formatINR(num) {
  if (num === undefined || num === null || isNaN(num)) return '₹0.00';
  return '₹' + Number(num).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

// Toast notification helper
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  const bg = type === 'success' ? 'bg-emerald-600 text-white' : type === 'error' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-white';
  const icon = type === 'success' ? 'check-circle' : type === 'error' ? 'alert-circle' : 'info';
  toast.className = `${bg} px-4 py-3 rounded-xl shadow-lg flex items-center space-x-2 text-sm font-medium transition-all duration-300 transform translate-y-2 opacity-0`;
  toast.innerHTML = `
    <i data-lucide="${icon}" class="w-4 h-4 shrink-0"></i>
    <span>${message}</span>
  `;
  container.appendChild(toast);
  if (window.lucide) lucide.createIcons();
  
  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// Navigation Handler
function setActivePage(pageId) {
  const validPages = ['customers', 'receipts', 'gstBill', 'inputBills'];
  if (!validPages.includes(pageId)) pageId = 'customers';
  
  appState.activePage = pageId;
  saveState();

  // Hide 3-dot bottom sheet menu if open
  closeMenuSheet();

  // Update tabs UI in Bottom Dock
  document.querySelectorAll('[data-page-btn]').forEach(btn => {
    const target = btn.getAttribute('data-page-btn');
    const isSelected = target === pageId;
    if (isSelected) {
      btn.classList.add('text-sky-600', 'font-semibold');
      btn.classList.remove('text-slate-500');
      const dot = btn.querySelector('.active-pill');
      if (dot) dot.classList.remove('hidden');
    } else {
      btn.classList.remove('text-sky-600', 'font-semibold');
      btn.classList.add('text-slate-500');
      const dot = btn.querySelector('.active-pill');
      if (dot) dot.classList.add('hidden');
    }
  });

  // Update selection indicators inside 3-dot menu sheet
  document.querySelectorAll('[data-menu-page]').forEach(item => {
    const target = item.getAttribute('data-menu-page');
    const isSelected = target === pageId;
    const checkIcon = item.querySelector('.menu-check');
    if (isSelected) {
      item.classList.add('bg-sky-50', 'text-sky-700', 'border-sky-300');
      item.classList.remove('text-slate-700', 'hover:bg-slate-50');
      if (checkIcon) checkIcon.classList.remove('hidden');
    } else {
      item.classList.remove('bg-sky-50', 'text-sky-700', 'border-sky-300');
      item.classList.add('text-slate-700', 'hover:bg-slate-50');
      if (checkIcon) checkIcon.classList.add('hidden');
    }
  });

  // Render the selected page view
  renderCurrentPage();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 3-Dot Bottom Menu Toggle
function toggleMenuSheet() {
  const sheet = document.getElementById('menuSheet');
  const backdrop = document.getElementById('menuBackdrop');
  if (!sheet) return;
  const isHidden = sheet.classList.contains('hidden');
  if (isHidden) {
    sheet.classList.remove('hidden');
    if (backdrop) backdrop.classList.remove('hidden');
  } else {
    closeMenuSheet();
  }
}

function closeMenuSheet() {
  const sheet = document.getElementById('menuSheet');
  const backdrop = document.getElementById('menuBackdrop');
  if (sheet) sheet.classList.add('hidden');
  if (backdrop) backdrop.classList.add('hidden');
}

// Render Current Page
function renderCurrentPage() {
  const container = document.getElementById('pageContent');
  if (!container) return;

  switch (appState.activePage) {
    case 'customers':
      renderCustomersPage(container);
      break;
    case 'receipts':
      renderReceiptsPage(container);
      break;
    case 'gstBill':
      renderGstBillPage(container);
      break;
    case 'inputBills':
      renderInputBillsPage(container);
      break;
    default:
      renderCustomersPage(container);
  }

  makeTablesResponsive(container);
  if (window.lucide) lucide.createIcons();
}

// Tag every table cell with its column header so tables can collapse into
// readable cards on small (mobile) screens - see styles.css (.responsive-table)
function makeTablesResponsive(root) {
  root.querySelectorAll('table').forEach(table => {
    table.classList.add('responsive-table');
    const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent.trim());
    table.querySelectorAll('tbody tr').forEach(tr => {
      Array.from(tr.children).forEach((td, i) => {
        if (headers[i]) td.setAttribute('data-label', headers[i]);
      });
    });
  });
}

// ==========================================
// 1. CUSTOMERS PAGE
// ==========================================
function renderCustomersPage(container) {
  const totalReceivables = appState.customers.reduce((acc, c) => acc + (Number(c.balance) || 0), 0);
  // Count only customers who still owe money
  const pendingCustomers = appState.customers.filter(c => (Number(c.balance) || 0) > 0).length;

  // Customers with the highest dues first
  const sorted = [...appState.customers].sort((a, b) => (Number(b.balance) || 0) - (Number(a.balance) || 0));

  container.innerHTML = `
    <div class="cd-page">
      <!-- Header: title, compact stat chips, search toggle -->
      <div class="cd-header">
        <div class="cd-title-wrap">
          <span class="cd-title-icon"><i data-lucide="users" class="w-5 h-5"></i></span>
          <h1 class="cd-title">Customers</h1>
        </div>
        <button type="button" id="custSearchToggle" onclick="toggleCustomerSearch()" class="cd-search-btn" title="Search" aria-label="Search customers">
          <i data-lucide="search" class="w-5 h-5"></i>
        </button>
      </div>

      <div id="custSearchWrap" class="cd-search-wrap">
        <i data-lucide="search" class="cd-search-icon w-4 h-4"></i>
        <input type="text" id="custSearchInput" oninput="filterCustomerTable()" placeholder="Search name, phone or GSTIN..." class="cd-search-input" autocomplete="off">
        <button type="button" onclick="toggleCustomerSearch(false)" class="cd-search-close" aria-label="Close search">
          <i data-lucide="x" class="w-4 h-4"></i>
        </button>
      </div>

      <div class="cd-stats">
        <div class="cd-chip cd-chip-blue" title="Customers with pending balance">
          <span class="cd-chip-icon"><i data-lucide="user-round" class="w-3.5 h-3.5"></i></span>
          <span class="cd-chip-value">${pendingCustomers}</span>
          <span class="cd-chip-label">Due</span>
        </div>
        <div class="cd-chip cd-chip-red" title="Total pending amount">
          <span class="cd-chip-icon"><i data-lucide="indian-rupee" class="w-3.5 h-3.5"></i></span>
          <span class="cd-chip-value font-mono">${formatINR(totalReceivables)}</span>
        </div>
      </div>

      <!-- Customer list: name + pending amount; tap a row for actions -->
      <div class="cd-list" id="customersList">
        ${sorted.length === 0 ? `
          <div class="cd-empty">
            <i data-lucide="user-plus" class="w-8 h-8"></i>
            <p>No customers yet</p>
          </div>` : sorted.map(c => {
          const displayName = c.shopName || c.name || 'Customer';
          const balance = Number(c.balance) || 0;
          const searchText = [displayName, c.name, c.primaryNumber, c.phone, c.secondaryNumber, c.gstNumber, c.gstin, c.address]
            .filter(Boolean).join(' ').toLowerCase().replace(/"/g, '');
          const avatar = c.photo
            ? `<img src="${c.photo}" alt="" class="cd-avatar cd-avatar-img">`
            : `<div class="cd-avatar">${displayName.charAt(0).toUpperCase()}</div>`;

          return `
          <div class="cd-item" data-search="${searchText}">
            <button type="button" class="cd-row" onclick="toggleCustomerActions(this)">
              ${avatar}
              <span class="cd-name">${displayName}</span>
              <span class="cd-amount font-mono">${formatINR(balance)}</span>
            </button>
            <div class="cd-actions">
              <button onclick="quickInvoiceForCustomer('${c.id}')" class="cd-act cd-act-blue"><i data-lucide="file-text" class="w-4 h-4"></i><span>Bill</span></button>
              <button onclick="quickReceiptForCustomer('${c.id}')" class="cd-act cd-act-green"><i data-lucide="receipt" class="w-4 h-4"></i><span>Receipt</span></button>
              <button onclick="openCustomerModal('${c.id}')" class="cd-act cd-act-indigo"><i data-lucide="pencil" class="w-4 h-4"></i><span>Edit</span></button>
              <button onclick="deleteCustomer('${c.id}')" class="cd-act cd-act-red"><i data-lucide="trash-2" class="w-4 h-4"></i><span>Delete</span></button>
            </div>
          </div>`;
        }).join('')}
        <div class="cd-empty cd-no-match hidden" id="custNoMatch">
          <i data-lucide="search-x" class="w-7 h-7"></i>
          <p>No matching customers</p>
        </div>
      </div>

      <!-- Floating Action Button (FAB) -->
      <button onclick="openCustomerModal()" id="fabAddCustomer" class="fixed right-6 bottom-20 sm:bottom-22 z-30 w-14 h-14 bg-sky-600 hover:bg-sky-700 active:scale-95 text-white rounded-full shadow-xl shadow-sky-600/35 flex items-center justify-center transition-all cursor-pointer fab-btn focus:outline-none" title="Add Customer" aria-label="Add Customer">
        <i data-lucide="plus" class="w-8 h-8 stroke-[2.5]"></i>
      </button>
    </div>
  `;
}

function toggleCustomerSearch(force) {
  const wrap = document.getElementById('custSearchWrap');
  const input = document.getElementById('custSearchInput');
  const btn = document.getElementById('custSearchToggle');
  if (!wrap || !input) return;
  const open = typeof force === 'boolean' ? force : !wrap.classList.contains('open');
  wrap.classList.toggle('open', open);
  if (btn) btn.classList.toggle('active', open);
  if (open) {
    setTimeout(() => input.focus(), 50);
  } else {
    input.value = '';
    filterCustomerTable();
  }
}

function toggleCustomerActions(rowBtn) {
  const item = rowBtn.closest('.cd-item');
  if (!item) return;
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('#customersList .cd-item.open').forEach(el => el.classList.remove('open'));
  if (!wasOpen) item.classList.add('open');
}

function filterCustomerTable() {
  const query = (document.getElementById('custSearchInput')?.value || '').toLowerCase().trim();
  const items = document.querySelectorAll('#customersList .cd-item');
  let shown = 0;
  items.forEach(it => {
    const match = !query || (it.dataset.search || '').includes(query);
    it.style.display = match ? '' : 'none';
    if (match) shown++;
  });
  const noMatch = document.getElementById('custNoMatch');
  if (noMatch) noMatch.classList.toggle('hidden', !(items.length && shown === 0));
}

// ==========================================
// 2. RECEIPTS PAGE
// ==========================================
function renderReceiptsPage(container) {
  const totalCollections = appState.receipts.reduce((acc, r) => acc + (Number(r.amount) || 0), 0);

  container.innerHTML = `
    <div class="space-y-6">
      <!-- Header Banner & Action -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div class="flex items-center space-x-2">
            <span class="inline-flex items-center justify-center p-2 bg-emerald-100 text-emerald-700 rounded-lg">
              <i data-lucide="receipt" class="w-5 h-5"></i>
            </span>
            <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Payment Receipts</h1>
          </div>
          <p class="text-sm text-slate-500 mt-1">Record and track payment collections, settlements, and customer credits</p>
        </div>
        <div class="flex items-center space-x-3">
          <button onclick="openReceiptModal()" class="inline-flex items-center px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm text-sm font-medium transition cursor-pointer">
            <i data-lucide="plus" class="w-4 h-4 mr-2"></i>
            New Receipt
          </button>
        </div>
      </div>

      <!-- Quick Metrics -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p class="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Collected</p>
            <p class="text-2xl font-bold text-emerald-600 mt-1 font-mono">${formatINR(totalCollections)}</p>
          </div>
          <div class="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <i data-lucide="wallet" class="w-6 h-6"></i>
          </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p class="text-xs font-medium text-slate-400 uppercase tracking-wider">Receipt Count</p>
            <p class="text-2xl font-bold text-slate-800 mt-1">${appState.receipts.length}</p>
          </div>
          <div class="w-12 h-12 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center">
            <i data-lucide="file-check" class="w-6 h-6"></i>
          </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p class="text-xs font-medium text-slate-400 uppercase tracking-wider">Latest Mode</p>
            <p class="text-base font-semibold text-slate-800 mt-1">UPI & NEFT Dominant</p>
          </div>
          <div class="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
            <i data-lucide="credit-card" class="w-6 h-6"></i>
          </div>
        </div>
      </div>

      <!-- Receipts Table -->
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse" id="receiptsTable">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th class="py-3.5 px-4">Receipt No & Date</th>
                <th class="py-3.5 px-4">Customer Name</th>
                <th class="py-3.5 px-4">Payment Mode & Ref</th>
                <th class="py-3.5 px-4 text-right">Amount Received</th>
                <th class="py-3.5 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-sm">
              ${appState.receipts.map(r => `
                <tr class="hover:bg-slate-50/80 transition">
                  <td class="py-4 px-4">
                    <div class="font-mono font-semibold text-slate-900">${r.receiptNo}</div>
                    <div class="text-xs text-slate-400 mt-0.5">${formatDate(r.date)}</div>
                  </td>
                  <td class="py-4 px-4 font-medium text-slate-800">
                    ${r.customerName}
                    ${r.notes ? `<div class="text-xs text-slate-400 font-normal mt-0.5">${r.notes}</div>` : ''}
                  </td>
                  <td class="py-4 px-4">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                      ${r.mode}
                    </span>
                    <div class="text-xs text-slate-400 font-mono mt-1">${r.refNo || '—'}</div>
                  </td>
                  <td class="py-4 px-4 text-right font-mono font-bold text-emerald-600">
                    ${formatINR(r.amount)}
                  </td>
                  <td class="py-4 px-4 text-center">
                    <div class="flex items-center justify-center space-x-1">
                      <button onclick="printReceiptSlip('${r.id}')" title="Print Receipt" class="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition cursor-pointer">
                        <i data-lucide="printer" class="w-4 h-4"></i>
                      </button>
                      <button onclick="deleteReceipt('${r.id}')" title="Delete" class="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer">
                        <i data-lucide="trash-2" class="w-4 h-4"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// ==========================================
// 3. GST BILL PAGE (TAX INVOICE)
// ==========================================
function renderGstBillPage(container) {
  const totalBilled = appState.gstBills.reduce((acc, b) => acc + (Number(b.grandTotal) || 0), 0);
  const totalGstOutput = appState.gstBills.reduce((acc, b) => acc + (Number(b.cgstTotal || 0) + Number(b.sgstTotal || 0) + Number(b.igstTotal || 0)), 0);

  container.innerHTML = `
    <div class="space-y-6">
      <!-- Header Banner & Action -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div class="flex items-center space-x-2">
            <span class="inline-flex items-center justify-center p-2 bg-indigo-100 text-indigo-700 rounded-lg">
              <i data-lucide="file-text" class="w-5 h-5"></i>
            </span>
            <h1 class="text-2xl font-bold text-slate-900 tracking-tight">GST Tax Invoices</h1>
          </div>
          <p class="text-sm text-slate-500 mt-1">Generate compliant GST invoices with HSN codes, CGST/SGST/IGST breakdown</p>
        </div>
        <div class="flex items-center space-x-3">
          <button onclick="openGstBillModal()" class="inline-flex items-center px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm text-sm font-medium transition cursor-pointer">
            <i data-lucide="file-plus" class="w-4 h-4 mr-2"></i>
            Create GST Bill
          </button>
        </div>
      </div>

      <!-- Quick Metrics -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p class="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Sales Invoiced</p>
            <p class="text-2xl font-bold text-slate-900 mt-1 font-mono">${formatINR(totalBilled)}</p>
          </div>
          <div class="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
            <i data-lucide="trending-up" class="w-6 h-6"></i>
          </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p class="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Output GST (Collected)</p>
            <p class="text-2xl font-bold text-amber-600 mt-1 font-mono">${formatINR(totalGstOutput)}</p>
          </div>
          <div class="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
            <i data-lucide="percent" class="w-6 h-6"></i>
          </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p class="text-xs font-medium text-slate-400 uppercase tracking-wider">Invoices Issued</p>
            <p class="text-2xl font-bold text-slate-800 mt-1">${appState.gstBills.length}</p>
          </div>
          <div class="w-12 h-12 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center">
            <i data-lucide="files" class="w-6 h-6"></i>
          </div>
        </div>
      </div>

      <!-- Invoices Table -->
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse" id="invoicesTable">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th class="py-3.5 px-4">Invoice No & Date</th>
                <th class="py-3.5 px-4">Billed To (Customer)</th>
                <th class="py-3.5 px-4">Tax Breakdown</th>
                <th class="py-3.5 px-4 text-right">Grand Total</th>
                <th class="py-3.5 px-4 text-center">Status</th>
                <th class="py-3.5 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-sm">
              ${appState.gstBills.map(b => {
                const totalGst = (Number(b.cgstTotal || 0) + Number(b.sgstTotal || 0) + Number(b.igstTotal || 0));
                const statusBadge = b.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                    b.status === 'Partial' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                    'bg-rose-50 text-rose-700 border-rose-200';
                return `
                  <tr class="hover:bg-slate-50/80 transition">
                    <td class="py-4 px-4">
                      <div class="font-mono font-bold text-indigo-600">${b.invoiceNo}</div>
                      <div class="text-xs text-slate-400 mt-0.5">${formatDate(b.date)}</div>
                    </td>
                    <td class="py-4 px-4">
                      <div class="font-semibold text-slate-900">${b.customerName}</div>
                      <div class="text-xs text-slate-400 font-mono mt-0.5">GSTIN: ${b.customerGstin || 'Unregistered'}</div>
                    </td>
                    <td class="py-4 px-4 text-xs font-mono">
                      <div>Taxable: ${formatINR(b.subtotal)}</div>
                      <div class="text-amber-600">GST: ${formatINR(totalGst)} ${b.isInterState ? '(IGST)' : '(CGST+SGST)'}</div>
                    </td>
                    <td class="py-4 px-4 text-right font-mono font-bold text-slate-900">
                      ${formatINR(b.grandTotal)}
                    </td>
                    <td class="py-4 px-4 text-center">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusBadge}">
                        ${b.status}
                      </span>
                    </td>
                    <td class="py-4 px-4 text-center">
                      <div class="flex items-center justify-center space-x-1">
                        <button onclick="printGstInvoice('${b.id}')" title="Print / Download Invoice" class="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition cursor-pointer">
                          <i data-lucide="printer" class="w-4 h-4"></i>
                        </button>
                        <button onclick="deleteGstBill('${b.id}')" title="Delete" class="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer">
                          <i data-lucide="trash-2" class="w-4 h-4"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// ==========================================
// 4. INPUT BILLS PAGE (PURCHASES & ITC)
// ==========================================
function renderInputBillsPage(container) {
  const totalPurchase = appState.inputBills.reduce((acc, b) => acc + (Number(b.total) || 0), 0);
  const totalITC = appState.inputBills.reduce((acc, b) => {
    if (b.itcEligible) {
      return acc + (Number(b.cgst || 0) + Number(b.sgst || 0) + Number(b.igst || 0));
    }
    return acc;
  }, 0);

  // Compute Net GST Liability (Output GST from GST Bills minus Input GST from Input Bills)
  const totalOutputGst = appState.gstBills.reduce((acc, b) => acc + (Number(b.cgstTotal || 0) + Number(b.sgstTotal || 0) + Number(b.igstTotal || 0)), 0);
  const netGstPayable = Math.max(0, totalOutputGst - totalITC);

  container.innerHTML = `
    <div class="space-y-6">
      <!-- Header Banner & Action -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div class="flex items-center space-x-2">
            <span class="inline-flex items-center justify-center p-2 bg-amber-100 text-amber-700 rounded-lg">
              <i data-lucide="inbox" class="w-5 h-5"></i>
            </span>
            <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Input Bills & ITC Credit</h1>
          </div>
          <p class="text-sm text-slate-500 mt-1">Record supplier purchase bills, raw materials, freight, and claim Input Tax Credit (ITC)</p>
        </div>
        <div class="flex items-center space-x-3">
          <button onclick="openInputBillModal()" class="inline-flex items-center px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl shadow-sm text-sm font-medium transition cursor-pointer">
            <i data-lucide="plus-circle" class="w-4 h-4 mr-2"></i>
            Add Input Bill
          </button>
        </div>
      </div>

      <!-- Quick Metrics -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p class="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Purchases</p>
            <p class="text-2xl font-bold text-slate-900 mt-1 font-mono">${formatINR(totalPurchase)}</p>
          </div>
          <div class="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
            <i data-lucide="shopping-bag" class="w-6 h-6"></i>
          </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p class="text-xs font-medium text-slate-400 uppercase tracking-wider">ITC Credit Available</p>
            <p class="text-2xl font-bold text-emerald-600 mt-1 font-mono">${formatINR(totalITC)}</p>
          </div>
          <div class="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <i data-lucide="shield-check" class="w-6 h-6"></i>
          </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p class="text-xs font-medium text-slate-400 uppercase tracking-wider">Net GST To Pay</p>
            <p class="text-2xl font-bold text-sky-600 mt-1 font-mono">${formatINR(netGstPayable)}</p>
            <span class="text-xs text-slate-400">Output GST − Input ITC</span>
          </div>
          <div class="w-12 h-12 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center">
            <i data-lucide="calculator" class="w-6 h-6"></i>
          </div>
        </div>
      </div>

      <!-- Input Bills Table -->
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse" id="inputBillsTable">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th class="py-3.5 px-4">Supplier & Bill No</th>
                <th class="py-3.5 px-4">Category & Date</th>
                <th class="py-3.5 px-4">GST Paid (ITC)</th>
                <th class="py-3.5 px-4 text-right">Total Invoice</th>
                <th class="py-3.5 px-4 text-center">ITC Status</th>
                <th class="py-3.5 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-sm">
              ${appState.inputBills.map(b => {
                const totalGst = (Number(b.cgst || 0) + Number(b.sgst || 0) + Number(b.igst || 0));
                return `
                  <tr class="hover:bg-slate-50/80 transition">
                    <td class="py-4 px-4">
                      <div class="font-semibold text-slate-900">${b.supplierName}</div>
                      <div class="text-xs text-slate-400 font-mono mt-0.5">Bill: ${b.billNo} • GSTIN: ${b.supplierGstin || 'N/A'}</div>
                    </td>
                    <td class="py-4 px-4">
                      <div class="text-slate-800 text-xs font-medium">${b.category}</div>
                      <div class="text-xs text-slate-400 mt-0.5">${formatDate(b.date)}</div>
                    </td>
                    <td class="py-4 px-4 font-mono text-xs">
                      <div>Taxable: ${formatINR(b.taxable)} (${b.gstRate}%)</div>
                      <div class="text-emerald-600 font-semibold">ITC GST: ${formatINR(totalGst)}</div>
                    </td>
                    <td class="py-4 px-4 text-right font-mono font-bold text-slate-900">
                      ${formatINR(b.total)}
                    </td>
                    <td class="py-4 px-4 text-center">
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${b.itcEligible ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500'}">
                        ${b.itcEligible ? 'ITC Eligible' : 'Ineligible'}
                      </span>
                    </td>
                    <td class="py-4 px-4 text-center">
                      <button onclick="deleteInputBill('${b.id}')" title="Delete" class="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer">
                        <i data-lucide="trash-2" class="w-4 h-4"></i>
                      </button>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// ==========================================
// MODAL CONTROLLERS & ACTIONS
// ==========================================

// ==========================================
// CUSTOMER PROFILE PHOTO & CONTACT HELPERS
// ==========================================

function openCustomerPhotoPicker() {
  const sheet = document.getElementById('photoPickerSheet');
  const backdrop = document.getElementById('photoPickerBackdrop');
  if (sheet) sheet.classList.remove('hidden');
  if (backdrop) backdrop.classList.remove('hidden');

  const currentPhoto = document.getElementById('custPhotoInput')?.value;
  const removeBtn = document.getElementById('removePhotoBtn');
  if (removeBtn) {
    if (currentPhoto) removeBtn.classList.remove('hidden');
    else removeBtn.classList.add('hidden');
  }
  if (window.lucide) lucide.createIcons();
}

function closeCustomerPhotoPicker() {
  const sheet = document.getElementById('photoPickerSheet');
  const backdrop = document.getElementById('photoPickerBackdrop');
  if (sheet) sheet.classList.add('hidden');
  if (backdrop) backdrop.classList.add('hidden');
}

function triggerCameraUpload() {
  closeCustomerPhotoPicker();
  const input = document.getElementById('cameraFileInput');
  if (input) {
    input.value = '';
    input.click();
  }
}

function triggerGalleryUpload() {
  closeCustomerPhotoPicker();
  const input = document.getElementById('galleryFileInput');
  if (input) {
    input.value = '';
    input.click();
  }
}

function handleCustomerPhotoSelected(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const rawDataUrl = e.target.result;
    // Downscale image to max 400x400 to optimize memory & storage
    resizeImage(rawDataUrl, 400, 400, function(resizedDataUrl) {
      const photoInput = document.getElementById('custPhotoInput');
      const preview = document.getElementById('custPhotoPreview');
      const placeholder = document.getElementById('custPhotoPlaceholder');
      if (photoInput) photoInput.value = resizedDataUrl;
      if (preview && placeholder) {
        preview.src = resizedDataUrl;
        preview.classList.remove('hidden');
        placeholder.classList.add('hidden');
      }
      showToast('Profile photo attached');
      closeCustomerPhotoPicker();
    });
  };
  reader.readAsDataURL(file);
}

function resizeImage(dataUrl, maxWidth, maxHeight, callback) {
  const img = new Image();
  img.onload = function() {
    let width = img.width;
    let height = img.height;
    if (width > height) {
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width = Math.round((width * maxHeight) / height);
        height = maxHeight;
      }
    }
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);
    callback(canvas.toDataURL('image/jpeg', 0.85));
  };
  img.src = dataUrl;
}

function removeCustomerPhoto() {
  const photoInput = document.getElementById('custPhotoInput');
  const preview = document.getElementById('custPhotoPreview');
  const placeholder = document.getElementById('custPhotoPlaceholder');
  if (photoInput) photoInput.value = '';
  if (preview && placeholder) {
    preview.src = '';
    preview.classList.add('hidden');
    placeholder.classList.remove('hidden');
  }
  document.getElementById('removePhotoBtn')?.classList.add('hidden');
  closeCustomerPhotoPicker();
  showToast('Photo removed');
}

// CONTACT PICKER HELPERS (Boxes 4 & 5)
let currentContactTargetInput = 'custPrimaryNumber';

async function handleContactPickerClick(targetInputId) {
  currentContactTargetInput = targetInputId;

  // Try Native Web Contact Picker API (available on Android mobile devices with Chrome)
  if ('contacts' in navigator && 'ContactsManager' in window) {
    try {
      const contacts = await navigator.contacts.select(['name', 'tel'], { multiple: false });
      if (contacts && contacts[0] && contacts[0].tel && contacts[0].tel.length > 0) {
        const phone = contacts[0].tel[0].replace(/\s+/g, ' ').trim();
        const inputEl = document.getElementById(targetInputId);
        if (inputEl) inputEl.value = phone;
        // If Name box is empty and contact has a name, also fill Name
        const nameBox = document.getElementById('custName');
        if (nameBox && !nameBox.value.trim() && contacts[0].name && contacts[0].name[0]) {
          nameBox.value = contacts[0].name[0];
        }
        showToast(`Contact imported: ${phone}`);
        return;
      }
    } catch (err) {
      console.log('Native contact picker cancelled or unsupported:', err);
    }
  }

  // Fallback: Open sleek Contact Chooser modal for choosing types or existing contacts
  openContactChooserModal(targetInputId);
}

function openContactChooserModal(targetInputId) {
  currentContactTargetInput = targetInputId;
  const modal = document.getElementById('contactChooserModal');
  const backdrop = document.getElementById('contactChooserBackdrop');
  const list = document.getElementById('contactChooserList');
  if (!modal) return;

  const inputName = targetInputId === 'custPrimaryNumber' ? 'Primary Number' : 'Secondary Number';
  const desc = document.getElementById('contactChooserDesc');
  if (desc) desc.innerText = `Selecting for ${inputName}. Choose contact type or pick from existing directory:`;

  if (list) {
    if (appState.customers.length === 0) {
      list.innerHTML = '<div class="text-xs text-slate-400 p-2 text-center">No saved contacts yet</div>';
    } else {
      list.innerHTML = appState.customers.map(c => {
        const ph = c.primaryNumber || c.phone || '';
        const title = c.shopName || c.name || 'Customer';
        return `
          <div onclick="selectExistingContactNumber('${ph}', '${(c.name || '').replace(/'/g, "\\'")}')" class="py-2 px-2 hover:bg-sky-50 rounded-xl flex items-center justify-between cursor-pointer group transition">
            <div class="flex items-center space-x-2">
              <div class="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-sky-100 group-hover:text-sky-600 text-slate-600 flex items-center justify-center font-bold text-xs shrink-0">
                ${title.charAt(0).toUpperCase()}
              </div>
              <div>
                <div class="text-xs font-semibold text-slate-800 group-hover:text-sky-600">${title}</div>
                <div class="text-[11px] text-slate-400 font-mono">${ph || 'No number'}</div>
              </div>
            </div>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5 text-slate-300 group-hover:text-sky-600"></i>
          </div>
        `;
      }).join('');
    }
  }

  modal.classList.remove('hidden');
  if (backdrop) backdrop.classList.remove('hidden');
  if (window.lucide) lucide.createIcons();
}

function closeContactChooserModal() {
  const modal = document.getElementById('contactChooserModal');
  const backdrop = document.getElementById('contactChooserBackdrop');
  if (modal) modal.classList.add('hidden');
  if (backdrop) backdrop.classList.add('hidden');
}

function setContactTypeLabel(type) {
  const target = document.getElementById(currentContactTargetInput);
  if (target) {
    const rawVal = target.value.replace(/\s*\([A-Za-z /]+\)/g, '').trim();
    target.value = rawVal ? `${rawVal} (${type})` : `(${type}) `;
    target.focus();
    showToast(`Contact type set to: ${type}`);
  }
  closeContactChooserModal();
}

function selectExistingContactNumber(phone, name) {
  if (!phone) {
    showToast('No phone number on selected contact', 'error');
    return;
  }
  const target = document.getElementById(currentContactTargetInput);
  if (target) target.value = phone;
  const nameBox = document.getElementById('custName');
  if (nameBox && !nameBox.value.trim() && name) {
    nameBox.value = name;
  }
  closeContactChooserModal();
  showToast(`Selected: ${phone}`);
}

// ==========================================
// CUSTOMER MODAL (7 BOXES + PROFILE PHOTO)
// ==========================================

function openCustomerModal(id = null) {
  const modal = document.getElementById('customerModal');
  const form = document.getElementById('customerForm');
  if (!modal || !form) return;
  form.reset();

  const titleEl = document.getElementById('customerModalTitle');
  const custIdInput = document.getElementById('custIdInput');
  const photoInput = document.getElementById('custPhotoInput');
  const preview = document.getElementById('custPhotoPreview');
  const placeholder = document.getElementById('custPhotoPlaceholder');
  const removePhotoBtn = document.getElementById('removePhotoBtn');

  // Reset photo state
  if (photoInput) photoInput.value = '';
  if (preview) {
    preview.src = '';
    preview.classList.add('hidden');
  }
  if (placeholder) placeholder.classList.remove('hidden');
  if (removePhotoBtn) removePhotoBtn.classList.add('hidden');

  if (id) {
    const cust = appState.customers.find(c => c.id === id);
    if (cust) {
      titleEl.innerText = 'Edit Customer';
      custIdInput.value = cust.id;
      // 7 Boxes
      document.getElementById('custName').value = cust.name || '';
      document.getElementById('custShopName').value = cust.shopName || '';
      document.getElementById('custAddress').value = cust.address || '';
      document.getElementById('custPrimaryNumber').value = cust.primaryNumber || cust.phone || '';
      document.getElementById('custSecondaryNumber').value = cust.secondaryNumber || '';
      document.getElementById('custEmail').value = cust.email || '';
      document.getElementById('custGstNumber').value = cust.gstNumber || cust.gstin || '';
      
      // Photo preview
      if (cust.photo) {
        if (photoInput) photoInput.value = cust.photo;
        if (preview) {
          preview.src = cust.photo;
          preview.classList.remove('hidden');
        }
        if (placeholder) placeholder.classList.add('hidden');
        if (removePhotoBtn) removePhotoBtn.classList.remove('hidden');
      }
    }
  } else {
    titleEl.innerText = 'Add Customer';
    custIdInput.value = '';
  }

  modal.classList.remove('hidden');
  if (window.lucide) lucide.createIcons();
}

function closeCustomerModal() {
  const modal = document.getElementById('customerModal');
  if (modal) modal.classList.add('hidden');
}

function handleCustomerSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('custIdInput').value;
  const photo = document.getElementById('custPhotoInput')?.value || '';
  
  // 7 Boxes
  const name = document.getElementById('custName').value.trim();
  const shopName = document.getElementById('custShopName').value.trim();
  const address = document.getElementById('custAddress').value.trim();
  const primaryNumber = document.getElementById('custPrimaryNumber').value.trim();
  const secondaryNumber = document.getElementById('custSecondaryNumber').value.trim();
  const email = document.getElementById('custEmail').value.trim();
  const gstNumber = document.getElementById('custGstNumber').value.trim().toUpperCase();

  if (!name && !shopName) {
    showToast('Please enter Name or Shop Name', 'error');
    return;
  }

  const finalName = name || shopName;

  if (id) {
    // Edit existing
    const idx = appState.customers.findIndex(c => c.id === id);
    if (idx !== -1) {
      appState.customers[idx] = {
        ...appState.customers[idx],
        name: finalName,
        shopName,
        address,
        primaryNumber,
        secondaryNumber,
        phone: primaryNumber || appState.customers[idx].phone,
        email,
        gstNumber,
        gstin: gstNumber,
        photo
      };
      showToast('Customer profile updated successfully');
    }
  } else {
    // Add new
    const newCust = {
      id: 'cust-' + Date.now(),
      name: finalName,
      shopName,
      address,
      primaryNumber,
      secondaryNumber,
      phone: primaryNumber,
      email,
      gstNumber,
      gstin: gstNumber,
      balance: 0,
      creditLimit: 50000,
      photo
    };
    appState.customers.unshift(newCust);
    showToast('Customer saved successfully!');
  }

  saveState();
  closeCustomerModal();
  renderCurrentPage();
}

function deleteCustomer(id) {
  if (!confirm('Are you sure you want to delete this customer?')) return;
  appState.customers = appState.customers.filter(c => c.id !== id);
  saveState();
  showToast('Customer deleted');
  renderCurrentPage();
}

// RECEIPT MODAL
function openReceiptModal(presetCustId = null) {
  const modal = document.getElementById('receiptModal');
  const form = document.getElementById('receiptForm');
  if (!modal || !form) return;
  form.reset();

  // Populate customer dropdown
  const custSelect = document.getElementById('receiptCustomerSelect');
  custSelect.innerHTML = '<option value="">-- Select Customer --</option>' +
    appState.customers.map(c => {
      const label = c.shopName ? `${c.shopName} (${c.name})` : c.name;
      return `<option value="${c.id}" ${presetCustId === c.id ? 'selected' : ''}>${label} (Due: ${formatINR(c.balance)})</option>`;
    }).join('');

  document.getElementById('receiptDate').value = new Date().toISOString().split('T')[0];
  document.getElementById('receiptNo').value = 'RCP-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);

  modal.classList.remove('hidden');
  if (window.lucide) lucide.createIcons();
}

function closeReceiptModal() {
  const modal = document.getElementById('receiptModal');
  if (modal) modal.classList.add('hidden');
}

function handleReceiptSubmit(e) {
  e.preventDefault();
  const customerId = document.getElementById('receiptCustomerSelect').value;
  const receiptNo = document.getElementById('receiptNo').value.trim();
  const date = document.getElementById('receiptDate').value;
  const amount = parseFloat(document.getElementById('receiptAmount').value) || 0;
  const mode = document.getElementById('receiptMode').value;
  const refNo = document.getElementById('receiptRefNo').value.trim();
  const notes = document.getElementById('receiptNotes').value.trim();

  const cust = appState.customers.find(c => c.id === customerId);
  if (!cust) {
    showToast('Please select a valid customer', 'error');
    return;
  }
  if (amount <= 0) {
    showToast('Receipt amount must be greater than zero', 'error');
    return;
  }

  const newReceipt = {
    id: 'rcp-' + Date.now(),
    receiptNo: receiptNo || ('RCP-' + Date.now()),
    customerId: cust.id,
    customerName: cust.name,
    date,
    amount,
    mode,
    refNo,
    notes
  };

  // Deduct from customer's outstanding balance
  cust.balance = Math.max(0, (cust.balance || 0) - amount);

  appState.receipts.unshift(newReceipt);
  saveState();
  showToast(`Receipt of ${formatINR(amount)} recorded for ${cust.name}`);
  closeReceiptModal();
  renderCurrentPage();
}

function quickReceiptForCustomer(custId) {
  setActivePage('receipts');
  openReceiptModal(custId);
}

function deleteReceipt(id) {
  if (!confirm('Are you sure you want to delete this receipt?')) return;
  appState.receipts = appState.receipts.filter(r => r.id !== id);
  saveState();
  showToast('Receipt deleted');
  renderCurrentPage();
}

// GST BILL MODAL
let currentInvoiceItems = [];

function openGstBillModal(presetCustId = null) {
  const modal = document.getElementById('gstBillModal');
  const form = document.getElementById('gstBillForm');
  if (!modal || !form) return;
  form.reset();

  const custSelect = document.getElementById('invCustomerSelect');
  custSelect.innerHTML = '<option value="">-- Select Customer --</option>' +
    appState.customers.map(c => {
      const label = c.shopName ? `${c.shopName} (${c.name})` : c.name;
      return `<option value="${c.id}" ${presetCustId === c.id ? 'selected' : ''}>${label}</option>`;
    }).join('');

  document.getElementById('invNumber').value = 'MAK-26-' + Math.floor(1000 + Math.random() * 9000);
  document.getElementById('invDate').value = new Date().toISOString().split('T')[0];
  
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 15);
  document.getElementById('invDueDate').value = dueDate.toISOString().split('T')[0];

  currentInvoiceItems = [
    { desc: 'MAK 4T Plus 20W-40 (1 Ltr Can)', hsn: '2710', qty: 20, unit: 'Ltr', rate: 360, gstRate: 18 }
  ];

  renderInvoiceItemsTable();
  if (presetCustId) onInvoiceCustomerChange();

  modal.classList.remove('hidden');
  if (window.lucide) lucide.createIcons();
}

function closeGstBillModal() {
  const modal = document.getElementById('gstBillModal');
  if (modal) modal.classList.add('hidden');
}

function onInvoiceCustomerChange() {
  const custId = document.getElementById('invCustomerSelect').value;
  const cust = appState.customers.find(c => c.id === custId);
  const infoEl = document.getElementById('invCustomerInfo');
  if (cust) {
    infoEl.innerHTML = `
      <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
        <div><strong class="text-slate-700">GSTIN:</strong> ${cust.gstin || 'Unregistered'}</div>
        <div><strong class="text-slate-700">Place of Supply:</strong> ${cust.state || 'Karnataka (29)'}</div>
        <div><strong class="text-slate-700">Address:</strong> ${cust.address || 'N/A'}, ${cust.city || ''}</div>
      </div>
    `;
    const isInter = cust.state && !cust.state.includes('Karnataka') && !cust.state.includes('(29)');
    document.getElementById('invIsInterState').checked = isInter;
  } else {
    infoEl.innerHTML = '';
  }
  calculateInvoiceTotals();
}

function addInvoiceItemRow() {
  currentInvoiceItems.push({
    desc: '',
    hsn: '2710',
    qty: 1,
    unit: 'Ltr',
    rate: 0,
    gstRate: 18
  });
  renderInvoiceItemsTable();
}

function removeInvoiceItemRow(index) {
  if (currentInvoiceItems.length <= 1) {
    showToast('At least one item is required', 'error');
    return;
  }
  currentInvoiceItems.splice(index, 1);
  renderInvoiceItemsTable();
}

function updateInvoiceItem(index, field, value) {
  if (currentInvoiceItems[index]) {
    currentInvoiceItems[index][field] = value;
    calculateInvoiceTotals();
  }
}

function renderInvoiceItemsTable() {
  const tbody = document.getElementById('invItemsTableBody');
  if (!tbody) return;

  tbody.innerHTML = currentInvoiceItems.map((item, idx) => `
    <tr class="border-b border-slate-100 text-xs">
      <td class="py-2 pr-2">
        <input type="text" value="${item.desc || ''}" onchange="updateInvoiceItem(${idx}, 'desc', this.value)" placeholder="Product description" class="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
      </td>
      <td class="py-2 pr-2 w-20">
        <input type="text" value="${item.hsn || '2710'}" onchange="updateInvoiceItem(${idx}, 'hsn', this.value)" placeholder="HSN" class="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs">
      </td>
      <td class="py-2 pr-2 w-16">
        <input type="number" step="any" min="1" value="${item.qty || 1}" oninput="updateInvoiceItem(${idx}, 'qty', parseFloat(this.value) || 0)" class="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono">
      </td>
      <td class="py-2 pr-2 w-20">
        <select onchange="updateInvoiceItem(${idx}, 'unit', this.value)" class="w-full px-1.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
          <option value="Ltr" ${item.unit === 'Ltr' ? 'selected' : ''}>Ltr</option>
          <option value="Bucket" ${item.unit === 'Bucket' ? 'selected' : ''}>Bucket</option>
          <option value="Barrel" ${item.unit === 'Barrel' ? 'selected' : ''}>Barrel</option>
          <option value="Can" ${item.unit === 'Can' ? 'selected' : ''}>Can</option>
          <option value="Box" ${item.unit === 'Box' ? 'selected' : ''}>Box</option>
          <option value="Nos" ${item.unit === 'Nos' ? 'selected' : ''}>Nos</option>
        </select>
      </td>
      <td class="py-2 pr-2 w-24">
        <input type="number" step="any" min="0" value="${item.rate || 0}" oninput="updateInvoiceItem(${idx}, 'rate', parseFloat(this.value) || 0)" class="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono">
      </td>
      <td class="py-2 pr-2 w-20">
        <select onchange="updateInvoiceItem(${idx}, 'gstRate', parseFloat(this.value) || 0)" class="w-full px-1.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono">
          <option value="18" ${item.gstRate === 18 ? 'selected' : ''}>18%</option>
          <option value="12" ${item.gstRate === 12 ? 'selected' : ''}>12%</option>
          <option value="28" ${item.gstRate === 28 ? 'selected' : ''}>28%</option>
          <option value="5" ${item.gstRate === 5 ? 'selected' : ''}>5%</option>
          <option value="0" ${item.gstRate === 0 ? 'selected' : ''}>0%</option>
        </select>
      </td>
      <td class="py-2 text-center w-10">
        <button type="button" onclick="removeInvoiceItemRow(${idx})" class="p-1 text-slate-400 hover:text-rose-600 rounded cursor-pointer">
          <i data-lucide="trash" class="w-3.5 h-3.5"></i>
        </button>
      </td>
    </tr>
  `).join('');

  if (window.lucide) lucide.createIcons();
  calculateInvoiceTotals();
}

function calculateInvoiceTotals() {
  const isInterState = document.getElementById('invIsInterState')?.checked || false;
  let subtotal = 0;
  let cgstTotal = 0;
  let sgstTotal = 0;
  let igstTotal = 0;

  currentInvoiceItems.forEach(item => {
    const qty = parseFloat(item.qty) || 0;
    const rate = parseFloat(item.rate) || 0;
    const gstRate = parseFloat(item.gstRate) || 0;
    const taxable = qty * rate;
    subtotal += taxable;

    if (isInterState) {
      igstTotal += (taxable * gstRate) / 100;
    } else {
      const halfRate = gstRate / 2;
      cgstTotal += (taxable * halfRate) / 100;
      sgstTotal += (taxable * halfRate) / 100;
    }
  });

  const grandTotal = subtotal + cgstTotal + sgstTotal + igstTotal;

  document.getElementById('invSubtotalDisplay').innerText = formatINR(subtotal);
  document.getElementById('invTaxBreakdownDisplay').innerText = isInterState
    ? `IGST: ${formatINR(igstTotal)}`
    : `CGST: ${formatINR(cgstTotal)} | SGST: ${formatINR(sgstTotal)}`;
  document.getElementById('invGrandTotalDisplay').innerText = formatINR(grandTotal);

  return { subtotal, cgstTotal, sgstTotal, igstTotal, grandTotal, isInterState };
}

function handleGstBillSubmit(e) {
  e.preventDefault();
  const customerId = document.getElementById('invCustomerSelect').value;
  const cust = appState.customers.find(c => c.id === customerId);
  if (!cust) {
    showToast('Please select a customer for this bill', 'error');
    return;
  }

  const invoiceNo = document.getElementById('invNumber').value.trim();
  const date = document.getElementById('invDate').value;
  const dueDate = document.getElementById('invDueDate').value;
  const status = document.getElementById('invStatusSelect').value;
  const notes = document.getElementById('invNotes').value.trim();

  const { subtotal, cgstTotal, sgstTotal, igstTotal, grandTotal, isInterState } = calculateInvoiceTotals();

  if (grandTotal <= 0) {
    showToast('Invoice total must be greater than zero', 'error');
    return;
  }

  const compiledItems = currentInvoiceItems.map(item => {
    const qty = parseFloat(item.qty) || 0;
    const rate = parseFloat(item.rate) || 0;
    const gstRate = parseFloat(item.gstRate) || 0;
    const taxable = qty * rate;
    const taxAmt = (taxable * gstRate) / 100;
    return {
      desc: item.desc || 'MAK Lubricant',
      hsn: item.hsn || '2710',
      qty,
      unit: item.unit || 'Ltr',
      rate,
      gstRate,
      taxable,
      cgst: isInterState ? 0 : taxAmt / 2,
      sgst: isInterState ? 0 : taxAmt / 2,
      igst: isInterState ? taxAmt : 0,
      total: taxable + taxAmt
    };
  });

  const newBill = {
    id: 'inv-' + Date.now(),
    invoiceNo,
    date,
    dueDate,
    customerId: cust.id,
    customerName: cust.name,
    customerGstin: cust.gstin,
    address: cust.address + (cust.city ? ', ' + cust.city : ''),
    state: cust.state,
    isInterState,
    items: compiledItems,
    subtotal,
    cgstTotal,
    sgstTotal,
    igstTotal,
    grandTotal,
    status,
    notes: notes || 'Goods once sold will not be taken back.'
  };

  // If unpaid or partial, add to customer's outstanding balance
  if (status !== 'Paid') {
    cust.balance = (cust.balance || 0) + grandTotal;
  }

  appState.gstBills.unshift(newBill);
  saveState();
  showToast(`GST Invoice ${invoiceNo} generated successfully!`);
  closeGstBillModal();
  renderCurrentPage();
}

function quickInvoiceForCustomer(custId) {
  setActivePage('gstBill');
  openGstBillModal(custId);
}

function deleteGstBill(id) {
  if (!confirm('Are you sure you want to delete this GST bill?')) return;
  appState.gstBills = appState.gstBills.filter(b => b.id !== id);
  saveState();
  showToast('GST Bill deleted');
  renderCurrentPage();
}

// INPUT BILL MODAL
function openInputBillModal() {
  const modal = document.getElementById('inputBillModal');
  const form = document.getElementById('inputBillForm');
  if (!modal || !form) return;
  form.reset();

  document.getElementById('inputBillDate').value = new Date().toISOString().split('T')[0];
  document.getElementById('inputBillNumber').value = 'INP-' + Math.floor(1000 + Math.random() * 9000);

  modal.classList.remove('hidden');
  if (window.lucide) lucide.createIcons();
}

function closeInputBillModal() {
  const modal = document.getElementById('inputBillModal');
  if (modal) modal.classList.add('hidden');
}

function handleInputBillSubmit(e) {
  e.preventDefault();
  const billNo = document.getElementById('inputBillNumber').value.trim();
  const supplierName = document.getElementById('inputSupplierName').value.trim();
  const supplierGstin = document.getElementById('inputSupplierGstin').value.trim().toUpperCase();
  const date = document.getElementById('inputBillDate').value;
  const category = document.getElementById('inputCategory').value;
  const taxable = parseFloat(document.getElementById('inputTaxable').value) || 0;
  const gstRate = parseFloat(document.getElementById('inputGstRate').value) || 0;
  const isInterState = document.getElementById('inputIsInterState').checked;
  const itcEligible = document.getElementById('inputItcEligible').checked;
  const paymentStatus = document.getElementById('inputPaymentStatus').value;

  if (!supplierName || taxable <= 0) {
    showToast('Please fill all required fields with valid amounts', 'error');
    return;
  }

  const taxAmount = (taxable * gstRate) / 100;
  const total = taxable + taxAmount;

  const newBill = {
    id: 'inpb-' + Date.now(),
    billNo,
    supplierName,
    supplierGstin,
    date,
    category,
    taxable,
    gstRate,
    cgst: isInterState ? 0 : taxAmount / 2,
    sgst: isInterState ? 0 : taxAmount / 2,
    igst: isInterState ? taxAmount : 0,
    total,
    itcEligible,
    paymentStatus
  };

  appState.inputBills.unshift(newBill);
  saveState();
  showToast(`Input Bill added! ITC Credit: ${formatINR(taxAmount)}`);
  closeInputBillModal();
  renderCurrentPage();
}

function deleteInputBill(id) {
  if (!confirm('Are you sure you want to delete this input bill?')) return;
  appState.inputBills = appState.inputBills.filter(b => b.id !== id);
  saveState();
  showToast('Input Bill deleted');
  renderCurrentPage();
}

// ==========================================
// PRINTING FUNCTIONS
// ==========================================

function printGstInvoice(id) {
  const bill = appState.gstBills.find(b => b.id === id);
  if (!bill) return;

  const printArea = document.getElementById('printArea');
  if (!printArea) return;

  const co = appState.company;

  printArea.innerHTML = `
    <div style="font-family: Arial, sans-serif; font-size: 13px; color: #111; line-height: 1.5; padding: 20px;">
      <!-- Invoice Header -->
      <div style="border-bottom: 2px solid #0284c7; padding-bottom: 12px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: flex-start;">
        <div>
          <h1 style="font-size: 24px; font-weight: bold; color: #0369a1; margin: 0 0 4px 0;">${co.name}</h1>
          <p style="margin: 0; color: #64748b; font-size: 12px;">${co.tagline}</p>
          <p style="margin: 4px 0 0 0; font-size: 12px;">${co.address}, ${co.city}, ${co.state} - ${co.pincode}</p>
          <p style="margin: 2px 0 0 0; font-size: 12px;"><strong>GSTIN:</strong> ${co.gstin} | <strong>PAN:</strong> ${co.pan}</p>
          <p style="margin: 2px 0 0 0; font-size: 12px;"><strong>Phone:</strong> ${co.phone} | <strong>Email:</strong> ${co.email}</p>
        </div>
        <div style="text-align: right;">
          <div style="display: inline-block; padding: 6px 14px; background: #e0f2fe; color: #0369a1; font-weight: bold; font-size: 14px; border-radius: 6px; text-transform: uppercase;">TAX INVOICE</div>
          <div style="margin-top: 10px; font-family: monospace; font-size: 14px; font-weight: bold;">Invoice #: ${bill.invoiceNo}</div>
          <div style="font-size: 12px; color: #475569;">Date: ${formatDate(bill.date)}</div>
          <div style="font-size: 12px; color: #475569;">Due Date: ${formatDate(bill.dueDate)}</div>
        </div>
      </div>

      <!-- Bill To & Place of Supply -->
      <div style="display: flex; justify-content: space-between; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px; margin-bottom: 16px;">
        <div style="width: 55%;">
          <div style="font-size: 11px; font-weight: bold; color: #64748b; text-transform: uppercase; margin-bottom: 4px;">BILLED TO:</div>
          <div style="font-size: 15px; font-weight: bold; color: #0f172a;">${bill.customerName}</div>
          <div style="font-size: 12px; color: #334155; margin-top: 2px;">${bill.address || ''}</div>
          <div style="font-size: 12px; color: #0369a1; margin-top: 4px;"><strong>GSTIN:</strong> ${bill.customerGstin || 'Unregistered / Consumer'}</div>
        </div>
        <div style="width: 40%; text-align: right;">
          <div style="font-size: 11px; font-weight: bold; color: #64748b; text-transform: uppercase; margin-bottom: 4px;">DISPATCH & SUPPLY:</div>
          <div style="font-size: 12px; color: #334155;"><strong>Place of Supply:</strong> ${bill.state || 'Karnataka (29)'}</div>
          <div style="font-size: 12px; color: #334155;"><strong>Supply Type:</strong> ${bill.isInterState ? 'Inter-State (IGST)' : 'Intra-State (CGST + SGST)'}</div>
          <div style="font-size: 12px; color: #334155;"><strong>Payment Status:</strong> ${bill.status}</div>
        </div>
      </div>

      <!-- Items Table -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
        <thead>
          <tr style="background: #f1f5f9; border-top: 1px solid #cbd5e1; border-bottom: 1px solid #cbd5e1; text-align: left; font-size: 11px; text-transform: uppercase; color: #475569;">
            <th style="padding: 8px 10px;">#</th>
            <th style="padding: 8px 10px;">Description of Goods</th>
            <th style="padding: 8px 10px; text-align: center;">HSN</th>
            <th style="padding: 8px 10px; text-align: center;">Qty</th>
            <th style="padding: 8px 10px; text-align: right;">Rate</th>
            <th style="padding: 8px 10px; text-align: right;">Taxable Value</th>
            <th style="padding: 8px 10px; text-align: right;">GST %</th>
            <th style="padding: 8px 10px; text-align: right;">Total (INR)</th>
          </tr>
        </thead>
        <tbody>
          ${bill.items.map((it, idx) => `
            <tr style="border-bottom: 1px solid #e2e8f0; font-size: 12px;">
              <td style="padding: 8px 10px; color: #64748b;">${idx + 1}</td>
              <td style="padding: 8px 10px; font-weight: 500;">${it.desc}</td>
              <td style="padding: 8px 10px; text-align: center; font-family: monospace;">${it.hsn}</td>
              <td style="padding: 8px 10px; text-align: center;">${it.qty} ${it.unit}</td>
              <td style="padding: 8px 10px; text-align: right; font-family: monospace;">₹${Number(it.rate).toFixed(2)}</td>
              <td style="padding: 8px 10px; text-align: right; font-family: monospace;">₹${Number(it.taxable).toFixed(2)}</td>
              <td style="padding: 8px 10px; text-align: right;">${it.gstRate}%</td>
              <td style="padding: 8px 10px; text-align: right; font-weight: bold; font-family: monospace;">₹${Number(it.total).toFixed(2)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <!-- Calculations and Bank Details -->
      <div style="display: flex; justify-content: space-between; margin-bottom: 24px;">
        <div style="width: 50%; font-size: 11px; color: #475569; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px; background: #fafafa;">
          <strong style="color: #0f172a; text-transform: uppercase;">Bank Account Details:</strong><br>
          Bank: <strong>${co.bankName}</strong><br>
          A/C Number: <strong style="font-family: monospace; font-size: 13px;">${co.accNo}</strong><br>
          IFSC Code: <strong style="font-family: monospace;">${co.ifsc}</strong><br>
          Branch: ${co.branch}<br>
          <div style="margin-top: 8px; font-style: italic;">Notes: ${bill.notes || 'Goods once sold cannot be returned.'}</div>
        </div>

        <div style="width: 44%;">
          <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
            <tr>
              <td style="padding: 4px 0; color: #64748b;">Taxable Subtotal:</td>
              <td style="padding: 4px 0; text-align: right; font-family: monospace;">₹${Number(bill.subtotal).toFixed(2)}</td>
            </tr>
            ${!bill.isInterState ? `
              <tr>
                <td style="padding: 4px 0; color: #64748b;">Central GST (CGST):</td>
                <td style="padding: 4px 0; text-align: right; font-family: monospace;">₹${Number(bill.cgstTotal).toFixed(2)}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; color: #64748b;">State GST (SGST):</td>
                <td style="padding: 4px 0; text-align: right; font-family: monospace;">₹${Number(bill.sgstTotal).toFixed(2)}</td>
              </tr>
            ` : `
              <tr>
                <td style="padding: 4px 0; color: #64748b;">Integrated GST (IGST):</td>
                <td style="padding: 4px 0; text-align: right; font-family: monospace;">₹${Number(bill.igstTotal).toFixed(2)}</td>
              </tr>
            `}
            <tr style="border-top: 2px solid #0f172a; font-size: 15px; font-weight: bold;">
              <td style="padding: 8px 0; color: #0f172a;">Grand Total:</td>
              <td style="padding: 8px 0; text-align: right; color: #0284c7; font-family: monospace;">₹${Number(bill.grandTotal).toFixed(2)}</td>
            </tr>
          </table>
        </div>
      </div>

      <!-- Signatures Footer -->
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 40px; padding-top: 20px; border-top: 1px dashed #cbd5e1;">
        <div style="font-size: 11px; color: #64748b;">
          Certified that the particulars given above are true and correct.<br>
          Subject to Hubballi Jurisdiction.
        </div>
        <div style="text-align: center;">
          <div style="font-size: 11px; font-weight: bold; color: #0f172a; margin-bottom: 40px;">For ${co.name}</div>
          <div style="border-top: 1px solid #475569; width: 180px; font-size: 11px; color: #475569; padding-top: 4px;">Authorised Signatory</div>
        </div>
      </div>
    </div>
  `;

  window.print();
}

function printReceiptSlip(id) {
  const receipt = appState.receipts.find(r => r.id === id);
  if (!receipt) return;

  const printArea = document.getElementById('printArea');
  if (!printArea) return;

  const co = appState.company;

  printArea.innerHTML = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 2px solid #10b981; border-radius: 8px; padding: 24px; color: #1e293b;">
      <div style="text-align: center; border-bottom: 2px dashed #cbd5e1; padding-bottom: 16px; margin-bottom: 20px;">
        <h2 style="margin: 0; color: #059669; font-size: 22px;">${co.name}</h2>
        <p style="margin: 4px 0 0 0; font-size: 12px; color: #64748b;">${co.address}, ${co.city} | Phone: ${co.phone}</p>
        <div style="display: inline-block; margin-top: 12px; padding: 4px 16px; background: #d1fae5; color: #047857; font-weight: bold; border-radius: 20px; font-size: 13px;">PAYMENT RECEIPT</div>
      </div>

      <div style="display: flex; justify-content: space-between; margin-bottom: 14px; font-size: 13px;">
        <div><strong>Receipt No:</strong> <span style="font-family: monospace;">${receipt.receiptNo}</span></div>
        <div><strong>Date:</strong> ${formatDate(receipt.date)}</div>
      </div>

      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; margin-bottom: 20px; font-size: 14px;">
        <p style="margin: 0 0 8px 0;">Received with thanks from:</p>
        <p style="margin: 0; font-size: 18px; font-weight: bold; color: #0f172a;">${receipt.customerName}</p>
        <p style="margin: 12px 0 0 0; font-size: 13px;">The sum of Rupees:</p>
        <p style="margin: 4px 0 0 0; font-size: 24px; font-weight: bold; color: #059669; font-family: monospace;">${formatINR(receipt.amount)}</p>
      </div>

      <div style="font-size: 13px; line-height: 1.8; margin-bottom: 30px;">
        <div><strong>Payment Mode:</strong> ${receipt.mode}</div>
        <div><strong>Reference / Transaction ID:</strong> <span style="font-family: monospace;">${receipt.refNo || 'N/A'}</span></div>
        <div><strong>Remarks / Notes:</strong> ${receipt.notes || 'Payment acknowledged.'}</div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: flex-end; padding-top: 20px; border-top: 1px dashed #cbd5e1;">
        <div style="font-size: 11px; color: #64748b;">Computer generated receipt.<br>Valid subject to realization.</div>
        <div style="text-align: center;">
          <div style="margin-bottom: 35px; font-size: 12px; font-weight: bold;">For ${co.name}</div>
          <div style="border-top: 1px solid #475569; width: 140px; font-size: 11px; color: #475569; padding-top: 4px;">Receiver's Signature</div>
        </div>
      </div>
    </div>
  `;

  window.print();
}

// Reset sample data
function resetToSampleData() {
  if (confirm('Reset all data to default MAKOIL sample records? Your current edits will be restored to defaults.')) {
    appState = JSON.parse(JSON.stringify(defaultState));
    saveState();
    closeMenuSheet();
    setActivePage('customers');
    showToast('Reset to default sample data');
  }
}

// Export data backup
function exportDataJSON() {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(appState, null, 2));
  const dlAnchor = document.createElement('a');
  dlAnchor.setAttribute('href', dataStr);
  dlAnchor.setAttribute('download', 'makoil_billing_backup_' + new Date().toISOString().split('T')[0] + '.json');
  dlAnchor.click();
  showToast('Data exported successfully');
  closeMenuSheet();
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  // Ensure default page is 'customers' as requested
  if (!appState.activePage) appState.activePage = 'customers';
  setActivePage(appState.activePage);
});
