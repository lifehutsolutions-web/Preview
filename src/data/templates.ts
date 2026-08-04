import { ProductTemplate } from '../types';

export const sampleTemplates: ProductTemplate[] = [
  {
    id: 'lifehut-smart-quote',
    title: 'Lifehut Smart Quote',
    tagline: 'Interactive Quotation & Invoice Management Web App',
    description: 'A complete, high-converting digital quotation generator featuring automated tax math, customer directory, PDF exports, and one-click quote sending.',
    category: 'Business Utility',
    price: '$29',
    originalPrice: '$49',
    checkoutUrl: 'https://studio.lifehutsolutions.com/',
    downloadFilename: 'lifehut-smart-quote-template.html',
    badge: 'BEST SELLER',
    rating: 4.9,
    salesCount: 1240,
    htmlContent: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lifehut Smart Quote</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #f8fafc; color: #0f172a; }
    .glass-card { background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(8px); border: 1px solid #e2e8f0; }
  </style>
</head>
<body class="min-h-screen bg-slate-50 flex flex-col antialiased">
  <!-- Top App Navigation -->
  <header class="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between sticky top-0 z-20">
    <div class="flex items-center gap-3">
      <div class="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
        🛡️
      </div>
      <div>
        <h1 class="text-base font-bold text-slate-900 leading-tight">Lifehut <span class="text-emerald-600 font-semibold">Smart Quote</span></h1>
        <p class="text-xs text-slate-500">Quotation #QT-2026-889</p>
      </div>
    </div>
    
    <div class="flex items-center gap-3">
      <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
        ● Draft Active
      </span>
      <button onclick="alert('Quote saved to draft!')" class="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all">
        Save Draft
      </button>
      <button onclick="alert('Generating PDF Document...')" class="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-all flex items-center gap-1.5">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
        Export PDF
      </button>
    </div>
  </header>

  <!-- App Layout -->
  <div class="flex flex-1">
    <!-- Sidebar -->
    <aside class="w-60 bg-white border-r border-slate-200 p-4 hidden md:flex flex-col justify-between">
      <div class="space-y-6">
        <div>
          <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-3">Main Menu</p>
          <nav class="space-y-1">
            <a href="#" class="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition">
              📊 Dashboard
            </a>
            <a href="#" class="flex items-center gap-3 px-3 py-2 text-sm font-bold text-emerald-700 bg-emerald-50 rounded-lg transition">
              📑 Quotes & Invoices
            </a>
            <a href="#" class="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition">
              📦 Products & Services
            </a>
            <a href="#" class="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition">
              👥 Customer CRM
            </a>
          </nav>
        </div>

        <div>
          <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-3">Settings</p>
          <nav class="space-y-1">
            <a href="#" class="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition">
              ⚙️ Organization Settings
            </a>
            <a href="#" class="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition">
              📈 Reports & Analytics
            </a>
          </nav>
        </div>
      </div>

      <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
        <p class="font-semibold text-slate-800">Lifehut Studio Cloud</p>
        <p class="text-slate-500 mt-0.5">Automated Backups Enabled</p>
      </div>
    </aside>

    <!-- Content Workspace -->
    <main class="flex-1 p-6 max-w-6xl mx-auto w-full space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold text-slate-900 tracking-tight">New Quotation</h2>
          <p class="text-sm text-slate-500">Configure client details, itemize services, and issue instant proposal.</p>
        </div>
        <div class="text-right text-xs text-slate-500">
          <p class="font-medium text-slate-700">Issue Date: Aug 01, 2026</p>
          <p>Valid Until: Aug 15, 2026</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Customer Info Card -->
        <div class="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 class="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            👤 Customer Information
          </h3>
          <form class="space-y-3" onsubmit="event.preventDefault();">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <input type="text" value="Sarah Jenkins" class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <input type="email" value="sarah@acmecorp.com" class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none">
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                <input type="text" value="+1 (555) 019-2834" class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none">
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Company</label>
                <input type="text" value="Acme Global Solutions" class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none">
              </div>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Billing Address</label>
              <textarea rows="2" class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none">100 Innovation Way, Suite 400, San Francisco, CA</textarea>
            </div>
          </form>
        </div>

        <!-- Quote Items & Summary Card -->
        <div class="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
                📋 Quotation Summary
              </h3>
              <button onclick="alert('New item added to quote')" class="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                + Add Line Item
              </button>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead>
                  <tr class="text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-100">
                    <th class="py-2">Item / Service</th>
                    <th class="py-2 text-center">Qty</th>
                    <th class="py-2 text-right">Price</th>
                    <th class="py-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 font-medium">
                  <tr>
                    <td class="py-3 font-semibold text-slate-800">Product / Service 1 (UX Audit & Wireframes)</td>
                    <td class="py-3 text-center">1</td>
                    <td class="py-3 text-right text-slate-600">$450.00</td>
                    <td class="py-3 text-right font-bold text-slate-900">$450.00</td>
                  </tr>
                  <tr>
                    <td class="py-3 font-semibold text-slate-800">Product / Service 2 (Custom React UI Frontend)</td>
                    <td class="py-3 text-center">2</td>
                    <td class="py-3 text-right text-slate-600">$350.00</td>
                    <td class="py-3 text-right font-bold text-slate-900">$700.00</td>
                  </tr>
                  <tr>
                    <td class="py-3 font-semibold text-slate-800">Product / Service 3 (Cloud API Relay Integration)</td>
                    <td class="py-3 text-center">1</td>
                    <td class="py-3 text-right text-slate-600">$250.00</td>
                    <td class="py-3 text-right font-bold text-slate-900">$250.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Financial Totals -->
          <div class="pt-4 border-t border-slate-100 space-y-2 text-xs">
            <div class="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span class="font-semibold text-slate-900">$1,400.00</span>
            </div>
            <div class="flex justify-between text-emerald-600 font-medium">
              <span>Early Bird Discount (10%)</span>
              <span>-$140.00</span>
            </div>
            <div class="flex justify-between text-slate-600">
              <span>Estimated Tax (8%)</span>
              <span>+$100.80</span>
            </div>
            
            <div class="pt-3 border-t border-slate-200 flex items-center justify-between text-sm">
              <span class="font-bold text-slate-900">Total Due Amount</span>
              <span class="text-xl font-extrabold text-emerald-600">$1,360.80</span>
            </div>

            <div class="pt-4 flex items-center justify-end gap-3">
              <button onclick="alert('Opening print preview...')" class="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition">
                Preview
              </button>
              <button onclick="alert('Quote QT-2026-889 sent successfully to sarah@acmecorp.com!')" class="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-all flex items-center gap-2">
                ✉️ Send Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</body>
</html>`
  },
  {
    id: 'lifehut-saas-dashboard',
    title: 'Lifehut SaaS Analytics Dashboard',
    tagline: 'Modern High-Converting Dark & Light SaaS Panel',
    description: 'Clean admin dashboard featuring financial metrics, subscriber growth graphs, real-time activity feeds, and modular responsive widgets.',
    category: 'Admin Dashboard',
    price: '$35',
    originalPrice: '$59',
    checkoutUrl: 'https://studio.lifehutsolutions.com/',
    downloadFilename: 'lifehut-saas-dashboard-template.html',
    badge: 'NEW',
    rating: 4.85,
    salesCount: 840,
    htmlContent: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lifehut SaaS Dashboard</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; background: #0f172a; color: #f8fafc; }
    .card-dark { background: #1e293b; border: 1px solid #334155; }
  </style>
</head>
<body class="min-h-screen bg-slate-900 text-slate-100 flex flex-col antialiased">
  <!-- Header -->
  <header class="bg-slate-900 border-b border-slate-800 px-6 py-3 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <div class="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-sm">
        ⚡
      </div>
      <span class="font-bold text-slate-100 text-base">Lifehut <span class="text-blue-400">SaaS Suite</span></span>
    </div>
    <div class="flex items-center gap-3">
      <span class="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700">MRR: $48,290 (+14%)</span>
      <button class="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition">New Campaign</button>
    </div>
  </header>

  <div class="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">
    <!-- Stat grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="card-dark p-4 rounded-xl space-y-1">
        <p class="text-xs font-medium text-slate-400">Monthly Recurring Revenue</p>
        <p class="text-2xl font-extrabold text-white">$48,290.00</p>
        <span class="text-[11px] font-semibold text-emerald-400">↑ 14.2% from last month</span>
      </div>
      <div class="card-dark p-4 rounded-xl space-y-1">
        <p class="text-xs font-medium text-slate-400">Active Subscribers</p>
        <p class="text-2xl font-extrabold text-white">2,841</p>
        <span class="text-[11px] font-semibold text-emerald-400">↑ 184 new this week</span>
      </div>
      <div class="card-dark p-4 rounded-xl space-y-1">
        <p class="text-xs font-medium text-slate-400">Churn Rate</p>
        <p class="text-2xl font-extrabold text-white">1.12%</p>
        <span class="text-[11px] font-semibold text-blue-400">↓ 0.4% improvement</span>
      </div>
      <div class="card-dark p-4 rounded-xl space-y-1">
        <p class="text-xs font-medium text-slate-400">Avg Revenue Per User</p>
        <p class="text-2xl font-extrabold text-white">$64.50</p>
        <span class="text-[11px] font-semibold text-slate-400">Stable benchmark</span>
      </div>
    </div>

    <!-- Chart simulation & Recent activity -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 card-dark p-5 rounded-xl space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="font-bold text-slate-100 text-sm">Revenue Growth Velocity</h3>
          <span class="text-xs text-slate-400">Jan 2026 - Aug 2026</span>
        </div>
        <div class="h-48 bg-slate-800/60 rounded-lg border border-slate-700/60 flex items-end justify-between p-4 gap-2">
          <div class="w-full bg-blue-600/40 rounded-t h-[40%] hover:bg-blue-500 transition"></div>
          <div class="w-full bg-blue-600/50 rounded-t h-[55%] hover:bg-blue-500 transition"></div>
          <div class="w-full bg-blue-600/60 rounded-t h-[65%] hover:bg-blue-500 transition"></div>
          <div class="w-full bg-blue-600/70 rounded-t h-[80%] hover:bg-blue-500 transition"></div>
          <div class="w-full bg-blue-600 rounded-t h-[95%] hover:bg-blue-500 transition"></div>
        </div>
      </div>

      <div class="card-dark p-5 rounded-xl space-y-4">
        <h3 class="font-bold text-slate-100 text-sm">Live System Logs</h3>
        <div class="space-y-3 text-xs">
          <div class="p-2.5 bg-slate-800 rounded-lg flex justify-between items-center border border-slate-700/50">
            <div>
              <p class="font-semibold text-slate-200">Payment Processed</p>
              <p class="text-slate-400 text-[10px]">Plan Pro Annual ($299)</p>
            </div>
            <span class="text-[10px] text-emerald-400 font-bold">Success</span>
          </div>
          <div class="p-2.5 bg-slate-800 rounded-lg flex justify-between items-center border border-slate-700/50">
            <div>
              <p class="font-semibold text-slate-200">New Signup</p>
              <p class="text-slate-400 text-[10px]">dev@lifehutsolutions.com</p>
            </div>
            <span class="text-[10px] text-blue-400 font-bold">2m ago</span>
          </div>
          <div class="p-2.5 bg-slate-800 rounded-lg flex justify-between items-center border border-slate-700/50">
            <div>
              <p class="font-semibold text-slate-200">API Webhook Fired</p>
              <p class="text-slate-400 text-[10px]">Endpoint /api/v1/sync</p>
            </div>
            <span class="text-[10px] text-slate-400 font-bold">Just now</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`
  },
  {
    id: 'lifehut-ecommerce-store',
    title: 'Lifehut Digital Storefront',
    tagline: 'Pure Static E-Commerce & Asset Catalog Template',
    description: 'Blazing fast single-page store catalog with filter tabs, responsive product cards, cart drawer, and instant UPI/Stripe checkout modal.',
    category: 'E-Commerce',
    price: '$24',
    originalPrice: '$39',
    checkoutUrl: 'https://studio.lifehutsolutions.com/',
    downloadFilename: 'lifehut-digital-store-template.html',
    badge: 'POPULAR',
    rating: 4.92,
    salesCount: 1650,
    htmlContent: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lifehut Digital Storefront</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body class="bg-slate-50 text-slate-900 font-['Plus_Jakarta_Sans'] min-h-screen">
  <nav class="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
    <div class="flex items-center gap-2">
      <div class="w-8 h-8 rounded-lg bg-blue-600 text-white font-extrabold flex items-center justify-center">L</div>
      <span class="font-bold text-slate-900 text-lg">Lifehut <span class="text-blue-600">Store</span></span>
    </div>
    <div class="flex items-center gap-4">
      <button onclick="alert('Cart contains 2 items')" class="px-4 py-2 bg-blue-50 text-blue-700 font-bold text-xs rounded-xl flex items-center gap-2 hover:bg-blue-100 transition">
        🛒 Shopping Bag (2)
      </button>
    </div>
  </nav>

  <main class="max-w-6xl mx-auto p-6 space-y-8">
    <div class="text-center max-w-2xl mx-auto space-y-2">
      <span class="px-3 py-1 bg-blue-50 text-blue-600 font-bold text-xs rounded-full uppercase">Digital Marketplace</span>
      <h1 class="text-3xl font-extrabold text-slate-900">Premium Developer Templates</h1>
      <p class="text-sm text-slate-500">Curated, serverless static HTML bundles ready for immediate Cloud Run or Netlify deployment.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 hover:shadow-lg transition">
        <div class="h-40 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-4xl font-black">
          UI Kit
        </div>
        <div>
          <h3 class="font-bold text-slate-900 text-base">Fintech Mobile UI</h3>
          <p class="text-xs text-slate-500 mt-1">45+ Figma screens converted to Tailwind CSS components.</p>
        </div>
        <div class="flex items-center justify-between pt-2 border-t border-slate-100">
          <span class="text-lg font-extrabold text-slate-900">$19</span>
          <button onclick="alert('Added Fintech UI Kit to bag')" class="px-3.5 py-2 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold rounded-lg transition">Add to Bag</button>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 hover:shadow-lg transition">
        <div class="h-40 bg-gradient-to-tr from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white text-4xl font-black">
          SEO
        </div>
        <div>
          <h3 class="font-bold text-slate-900 text-base">Agency Landing Page</h3>
          <p class="text-xs text-slate-500 mt-1">Lightweight static bundle with Google Lighthouse 100 score.</p>
        </div>
        <div class="flex items-center justify-between pt-2 border-t border-slate-100">
          <span class="text-lg font-extrabold text-slate-900">$29</span>
          <button onclick="alert('Added Agency Landing Page to bag')" class="px-3.5 py-2 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold rounded-lg transition">Add to Bag</button>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 hover:shadow-lg transition">
        <div class="h-40 bg-gradient-to-tr from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white text-4xl font-black">
          DOCS
        </div>
        <div>
          <h3 class="font-bold text-slate-900 text-base">API Documentation Portal</h3>
          <p class="text-xs text-slate-500 mt-1">Includes live REST code snippet sandbox & search filter.</p>
        </div>
        <div class="flex items-center justify-between pt-2 border-t border-slate-100">
          <span class="text-lg font-extrabold text-slate-900">$22</span>
          <button onclick="alert('Added API Documentation Portal to bag')" class="px-3.5 py-2 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold rounded-lg transition">Add to Bag</button>
        </div>
      </div>
    </div>
  </main>
</body>
</html>`
  }
];
