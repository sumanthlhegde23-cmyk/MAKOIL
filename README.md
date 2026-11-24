# MAKOIL - GST Billing & Invoicing System

A modern, fast, and responsive billing web application tailored for lubricants, industrial oils, and automotive distribution ledgers.

## 🚀 Live Demo
- **Vercel Deployment Link**: Deployed and available via Vercel (see deployment step)
- **Repository**: [sumanthlhegde23-cmyk/MAKOIL](https://github.com/sumanthlhegde23-cmyk/MAKOIL)

---

## ✨ Features & Pages

The application is structured into four primary modules accessible via the fixed bottom dock and the three-dot bottom menu:

### 1. 👥 Customers Directory (Default Selected)
- Complete customer ledgers and profiles (Name, Phone, Email, GSTIN, Address, State).
- Live outstanding dues tracking and real-time balance calculations.
- Quick action buttons to directly generate a GST Tax Invoice or record a Payment Receipt for any selected customer.
- Search and filter by customer name, phone number, or GSTIN.

### 2. 🧾 Payment Receipts
- Record incoming payment collections (Cash, UPI / QR, NEFT/RTGS, Cheques).
- Dynamic settlement against customer outstanding balances.
- Print-ready payment receipt slips with signature blocks.
- Transaction UTR / Cheque reference tracking.

### 3. 📄 GST Bill (Tax Invoice)
- Compliant GST Tax Invoices for automotive and industrial lubricants (HSN 2710).
- Automatic calculation of:
  - Subtotal
  - Intra-State supply (CGST + SGST)
  - Inter-State supply (IGST)
  - Rounding & Grand Total
- Multi-item line item creator with quantities, units (Ltr, Bucket, Barrel, Can, Box, Nos), and tax rates (0%, 5%, 12%, 18%, 28%).
- Print-ready formatted invoice with company branding, GSTIN, bank details for RTGS/NEFT, and authorized signatory.

### 4. 📥 Input Bills & ITC Management
- Manage supplier purchase bills (BPCL, HPCL, packaging suppliers, freight carriers).
- Track Input Tax Credit (ITC) eligible for offsetting GST liabilities.
- Net GST liability calculator (Output GST Collected − Input GST Credit = Net GST Payable).

### 5. ⋯ Bottom Navigation & Three-Dot Menu
- Fixed bottom dock navigation with instant tab switching.
- **Three-Dot Menu (`⋯`)** at the bottom right that reveals a dedicated bottom sheet selector allowing the user to select any one page.
- **Customers** is selected and rendered by default on application launch.

---

## 🛠 Tech Stack
- **HTML5 & Vanilla ES6+**: Lightweight, zero build overhead, instant load times.
- **Tailwind CSS (CDN)**: Modern responsive design with custom glassmorphism and subtle animations.
- **Lucide Icons**: Crisp, clean iconography.
- **LocalStorage API**: Persistent client-side data storage with import/export capabilities.
- **Print CSS**: Dedicated `@media print` styling for standard A4 invoice layouts.

---

## 💻 Local Usage
Open `index.html` directly in any web browser or serve with any static web server:
```bash
npx serve .
# or
python -m http.server 3000
```
