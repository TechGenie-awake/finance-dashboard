import { Wallet, TrendingUp, TrendingDown, Activity } from 'lucide-react'

function Card({ title, value, subtitle, icon: Icon, color, trend }) {
  const colors = {
    indigo: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400',
    emerald: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400',
    rose: 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400',
    amber: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
  }

  return (
    <div className="card flex items-start gap-4">
      <div className={`p-3 rounded-xl ${colors[color]}`}>
        <Icon size={22} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-0.5">{title}</p>
        <p className="text-2xl font-semibold text-slate-800 dark:text-white">
          {value}
        </p>
        {subtitle && (
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{subtitle}</p>
        )}
      </div>
      {trend !== undefined && (
        <div
          className={`text-xs font-medium flex items-center gap-0.5 ${
            trend >= 0
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-rose-600 dark:text-rose-400'
          }`}
        >
          {trend >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {Math.abs(trend)}%
        </div>
      )}
    </div>
  )
}

export default function SummaryCards({ transactions }) {
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((s, t) => s + t.amount, 0)

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((s, t) => s + t.amount, 0)

  const balance = totalIncome - totalExpenses

  // Savings rate
  const savingsRate =
    totalIncome > 0 ? Math.round(((totalIncome - totalExpenses) / totalIncome) * 100) : 0

  const fmt = (n) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <Card
        title="Total Balance"
        value={fmt(balance)}
        subtitle="Income minus expenses"
        icon={Wallet}
        color="indigo"
        trend={savingsRate}
      />
      <Card
        title="Total Income"
        value={fmt(totalIncome)}
        subtitle="All time income"
        icon={TrendingUp}
        color="emerald"
      />
      <Card
        title="Total Expenses"
        value={fmt(totalExpenses)}
        subtitle="All time spending"
        icon={TrendingDown}
        color="rose"
      />
      <Card
        title="Savings Rate"
        value={`${savingsRate}%`}
        subtitle="Of income saved"
        icon={Activity}
        color="amber"
      />
    </div>
  )
}
