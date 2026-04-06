import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { TrendingDown, TrendingUp, Trophy, AlertCircle, Target } from 'lucide-react'
import { CATEGORY_COLORS } from '../data/mockData'
import useStore from '../store/useStore'

function getMonthlyTotals(transactions) {
  const months = {}
  transactions.forEach((t) => {
    const d = new Date(t.date)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    if (!months[key]) months[key] = { income: 0, expenses: 0, key }
    if (t.type === 'income') months[key].income += t.amount
    else months[key].expenses += t.amount
  })
  return Object.values(months)
    .sort((a, b) => a.key.localeCompare(b.key))
    .map(({ key, income, expenses }) => {
      const [year, month] = key.split('-')
      return {
        label: new Date(Number(year), Number(month) - 1).toLocaleDateString('en-US', {
          month: 'short',
          year: '2-digit',
        }),
        income,
        expenses,
        savings: income - expenses,
      }
    })
}

function getCategoryTotals(transactions) {
  const map = {}
  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      map[t.category] = (map[t.category] || 0) + t.amount
    })
  return Object.entries(map)
    .map(([name, amount]) => ({ name, amount }))
    .sort((a, b) => b.amount - a.amount)
}

const CustomBarTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  const fmt = (v) => `$${v.toLocaleString()}`
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg p-3 text-sm">
      <p className="font-semibold text-slate-700 dark:text-white mb-2">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.fill }} className="flex justify-between gap-6">
          <span className="capitalize">{p.name}</span>
          <span className="font-medium">{fmt(p.value)}</span>
        </p>
      ))}
    </div>
  )
}

function InsightCard({ icon: Icon, color, title, value, subtitle, highlight }) {
  const colorMap = {
    emerald: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30',
    rose: 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-900/30',
    amber: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/30',
    indigo: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/30',
  }
  const iconColor = {
    emerald: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400',
    rose: 'bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400',
    amber: 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400',
    indigo: 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400',
  }
  return (
    <div className={`rounded-2xl border p-5 ${colorMap[color]}`}>
      <div className="flex items-start gap-4">
        <div className={`p-2.5 rounded-xl ${iconColor[color]}`}>
          <Icon size={20} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium opacity-75">{title}</p>
          <p className="text-xl font-bold mt-0.5">{value}</p>
          {subtitle && <p className="text-xs mt-1 opacity-60">{subtitle}</p>}
          {highlight && (
            <span className="inline-block mt-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-white/60 dark:bg-white/10">
              {highlight}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default function InsightsPage() {
  const transactions = useStore((s) => s.transactions)

  const monthly = getMonthlyTotals(transactions)
  const categoryTotals = getCategoryTotals(transactions)

  if (transactions.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400 dark:text-slate-500">
        No data available. Add some transactions first.
      </div>
    )
  }

  const topCategory = categoryTotals[0]
  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((s, t) => s + t.amount, 0)
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((s, t) => s + t.amount, 0)
  const savingsRate = totalIncome > 0
    ? Math.round(((totalIncome - totalExpenses) / totalIncome) * 100)
    : 0

  const lastTwo = monthly.slice(-2)
  const momChange =
    lastTwo.length === 2
      ? Math.round(((lastTwo[1].expenses - lastTwo[0].expenses) / lastTwo[0].expenses) * 100)
      : null

  const avgMonthlyExpense = monthly.length
    ? Math.round(monthly.reduce((s, m) => s + m.expenses, 0) / monthly.length)
    : 0

  const fmt = (n) => `$${n.toLocaleString()}`

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Insights</h1>
        <p className="text-sm text-gray-400 mt-0.5">Smart observations from your financial data</p>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {topCategory && (
          <InsightCard
            icon={Trophy}
            color="rose"
            title="Top Spending Category"
            value={topCategory.name}
            subtitle={`${fmt(topCategory.amount)} total spent`}
            highlight={`${Math.round((topCategory.amount / totalExpenses) * 100)}% of expenses`}
          />
        )}
        <InsightCard
          icon={savingsRate >= 20 ? TrendingUp : TrendingDown}
          color={savingsRate >= 20 ? 'emerald' : 'amber'}
          title="Savings Rate"
          value={`${savingsRate}%`}
          subtitle="Of total income saved"
          highlight={savingsRate >= 20 ? 'On track!' : 'Aim for 20%+'}
        />
        {momChange !== null && (
          <InsightCard
            icon={momChange > 0 ? TrendingUp : TrendingDown}
            color={momChange > 0 ? 'rose' : 'emerald'}
            title="Month-over-Month"
            value={`${momChange > 0 ? '+' : ''}${momChange}%`}
            subtitle="Change in expenses"
            highlight={momChange > 0 ? 'Spending increased' : 'Spending decreased'}
          />
        )}
        <InsightCard
          icon={Target}
          color="indigo"
          title="Avg Monthly Expense"
          value={fmt(avgMonthlyExpense)}
          subtitle={`Across ${monthly.length} months`}
        />
      </div>

      {/* Month Comparison Bar Chart */}
      <div className="card">
        <h2 className="text-base font-semibold text-slate-700 dark:text-white mb-4">
          Monthly Income vs Expenses
        </h2>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={monthly} margin={{ top: 5, right: 10, left: 0, bottom: 0 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.5} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 12, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v / 1000}k`}
            />
            <Tooltip content={<CustomBarTooltip />} />
            <Bar dataKey="income" name="Income" fill="#22c55e" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expenses" name="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category breakdown */}
      <div className="card">
        <h2 className="text-base font-semibold text-slate-700 dark:text-white mb-4">
          Spending Breakdown by Category
        </h2>
        {categoryTotals.length === 0 ? (
          <p className="text-slate-400 dark:text-slate-500 text-sm text-center py-8">
            No expense data
          </p>
        ) : (
          <div className="space-y-3">
            {categoryTotals.map((cat) => {
              const pct = Math.round((cat.amount / totalExpenses) * 100)
              return (
                <div key={cat.name}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: CATEGORY_COLORS[cat.name] || '#6366f1' }}
                      />
                      <span className="text-slate-600 dark:text-slate-300">{cat.name}</span>
                    </span>
                    <span className="font-medium text-slate-700 dark:text-slate-200">
                      {fmt(cat.amount)}{' '}
                      <span className="text-xs text-slate-400">({pct}%)</span>
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: CATEGORY_COLORS[cat.name] || '#6366f1',
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Observations */}
      <div className="card">
        <h2 className="text-base font-semibold text-slate-700 dark:text-white mb-4">
          Observations
        </h2>
        <div className="space-y-3">
          {[
            topCategory &&
              `Your highest spending category is ${topCategory.name} at ${fmt(topCategory.amount)} (${Math.round((topCategory.amount / totalExpenses) * 100)}% of total expenses).`,
            savingsRate < 20 &&
              `Your savings rate is ${savingsRate}%. Financial experts recommend saving at least 20% of income.`,
            savingsRate >= 20 &&
              `Great job! You're saving ${savingsRate}% of your income, which exceeds the recommended 20%.`,
            momChange !== null && momChange > 15 &&
              `Spending jumped ${momChange}% last month. Review your recent expenses to identify areas to cut back.`,
            momChange !== null && momChange < -5 &&
              `You reduced spending by ${Math.abs(momChange)}% last month. Keep up the good work!`,
          ]
            .filter(Boolean)
            .map((obs, i) => (
              <div
                key={i}
                className="flex gap-3 p-3 bg-slate-50 dark:bg-slate-700/40 rounded-xl"
              >
                <AlertCircle
                  size={16}
                  className="text-indigo-500 dark:text-indigo-400 flex-shrink-0 mt-0.5"
                />
                <p className="text-sm text-slate-600 dark:text-slate-300">{obs}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
