import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

function buildMonthlyData(transactions) {
  const months = {}

  transactions.forEach((t) => {
    const d = new Date(t.date)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    if (!months[key]) months[key] = { income: 0, expenses: 0 }
    if (t.type === 'income') months[key].income += t.amount
    else months[key].expenses += t.amount
  })

  const sorted = Object.entries(months).sort(([a], [b]) => a.localeCompare(b))

  let runningBalance = 0
  return sorted.map(([key, { income, expenses }]) => {
    runningBalance += income - expenses
    const [year, month] = key.split('-')
    const label = new Date(Number(year), Number(month) - 1).toLocaleDateString(
      'en-US',
      { month: 'short', year: '2-digit' }
    )
    return { month: label, income, expenses, balance: runningBalance }
  })
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  const fmt = (v) => `$${v.toLocaleString()}`
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg p-3 text-sm">
      <p className="font-semibold text-slate-700 dark:text-white mb-2">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.color }} className="flex justify-between gap-6">
          <span className="capitalize">{p.name}</span>
          <span className="font-medium">{fmt(p.value)}</span>
        </p>
      ))}
    </div>
  )
}

export default function BalanceTrendChart({ transactions }) {
  const data = buildMonthlyData(transactions)

  if (data.length === 0) {
    return (
      <div className="card h-72 flex items-center justify-center text-slate-400 dark:text-slate-500">
        No data to display
      </div>
    )
  }

  return (
    <div className="card">
      <h2 className="text-base font-semibold text-slate-700 dark:text-white mb-4">
        Monthly Overview
      </h2>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.5} />
          <XAxis
            dataKey="month"
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
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }}
            formatter={(v) => (
              <span className="text-slate-600 dark:text-slate-400 capitalize">{v}</span>
            )}
          />
          <Area
            type="monotone"
            dataKey="income"
            name="Income"
            stroke="#10b981"
            strokeWidth={2}
            fill="url(#colorIncome)"
          />
          <Area
            type="monotone"
            dataKey="expenses"
            name="Expenses"
            stroke="#ef4444"
            strokeWidth={2}
            fill="url(#colorExpenses)"
          />
          <Area
            type="monotone"
            dataKey="balance"
            name="Balance"
            stroke="#6366f1"
            strokeWidth={2}
            fill="url(#colorBalance)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
