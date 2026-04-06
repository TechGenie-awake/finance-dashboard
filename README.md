# FinTrack – Finance Dashboard

A clean, interactive finance dashboard built with React, Tailwind CSS, Recharts, and Zustand.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Tech Stack

| Tool | Purpose |
|---|---|
| React + Vite | UI framework & dev server |
| Tailwind CSS v3 | Utility-first styling |
| Recharts | Charts (area, bar, pie) |
| Zustand | Global state management |
| React Router v6 | Client-side routing |
| Lucide React | Icons |

## Features

### Dashboard
- **4 Summary Cards** – Total Balance, Income, Expenses, Savings Rate (with trend indicator)
- **Monthly Overview Chart** – Area chart showing income, expenses, and running balance over time
- **Spending Breakdown** – Donut pie chart by category
- **Recent Transactions** – 5 latest transactions with quick link to full list

### Transactions
- Full transaction table with date, description, category, type, and amount
- **Search** – by description or category
- **Filter** – by type (income/expense) and category
- **Sort** – by date, amount, or description (ascending/descending)
- **Admin only**: Add, edit, delete transactions (delete requires double-click confirmation)

### Insights
- **Top Spending Category** with percentage share
- **Savings Rate** with health indicator (target: 20%+)
- **Month-over-Month** expense change
- **Average Monthly Expense** across all months
- **Monthly Income vs Expenses** grouped bar chart
- **Category Progress Bars** showing relative spend
- **Auto-generated Observations** based on your data patterns

### Role-Based UI
Switch roles via the dropdown in the header:
- **Viewer** – read-only access; no add/edit/delete controls visible
- **Admin** – full CRUD on transactions

### Dark Mode
Toggle with the moon/sun icon in the header. Preference is persisted via localStorage.

### Data Persistence
All transactions and settings are saved to `localStorage` via Zustand's persist middleware. Data survives page refreshes.

## Project Structure

```
src/
├── components/
│   ├── Dashboard/       # SummaryCards, BalanceTrendChart, SpendingBreakdownChart, RecentTransactions
│   ├── Layout/          # Sidebar, Header, Layout wrapper
│   └── Transactions/    # TransactionModal (add/edit form)
├── data/
│   └── mockData.js      # 50+ pre-loaded transactions across 4 months + category colors
├── pages/
│   ├── Dashboard.jsx
│   ├── Transactions.jsx
│   └── Insights.jsx
├── store/
│   └── useStore.js      # Zustand store: role, darkMode, transactions, filters
├── App.jsx              # Router setup
└── main.jsx
```

## Design Decisions

- **Zustand over Redux** – simpler API, less boilerplate for this scale; persist middleware covers localStorage with one line
- **Tailwind utility classes** with custom `@layer components` for repeated patterns (`.card`, `.btn-primary`, `.input`) – keeps JSX clean without a separate CSS file per component
- **Recharts** chosen for its declarative API and React-native feel; all tooltips are custom-rendered for dark mode compatibility
- **Double-confirm delete** – clicking delete once highlights the button red and gives 3 seconds to confirm, preventing accidental deletions
- **Empty state handling** – every chart and list renders a fallback when data is absent
