import { LineChart, Line, ResponsiveContainer } from 'recharts'

function buildSparkline(transactions, type) {
  const months = {}
  transactions
    .filter((t) => t.type === type)
    .forEach((t) => {
      const d = new Date(t.date)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
      months[key] = (months[key] || 0) + t.amount
    })
  return Object.entries(months)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, v]) => ({ v }))
}

function Sparkline({ data, color }) {
  return (
    <ResponsiveContainer width="100%" height={48}>
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={1.5}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

function AccountCard({ label, value, change, data, color }) {
  const positive = change >= 0
  return (
    <div className="card flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">{label}</span>
        <span className="text-xs font-medium text-gray-400 hover:text-accent cursor-pointer">
          View more
        </span>
      </div>
      <div>
        <p className="text-xl font-semibold text-gray-900">
          ${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
        <p className={`text-xs mt-0.5 font-medium ${positive ? 'text-accent' : 'text-red-500'}`}>
          {positive ? '+' : ''}{change}% vs last month
        </p>
      </div>
      <Sparkline data={data} color={positive ? '#22c55e' : '#ef4444'} />
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
  const savings = transactions
    .filter((t) => t.category === 'Investment')
    .reduce((s, t) => s + t.amount, 0)

  const incomeSparkline = buildSparkline(transactions, 'income')
  const expenseSparkline = buildSparkline(transactions, 'expense')

  // Simple MoM calc
  const getChange = (type) => {
    const byMonth = {}
    transactions.filter((t) => t.type === type).forEach((t) => {
      const d = new Date(t.date)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
      byMonth[key] = (byMonth[key] || 0) + t.amount
    })
    const sorted = Object.values(byMonth).sort()
    if (sorted.length < 2) return 0
    const [prev, curr] = sorted.slice(-2)
    return Math.round(((curr - prev) / prev) * 100)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <AccountCard
        label="Checking"
        value={balance * 0.35}
        change={getChange('income') - 4}
        data={incomeSparkline}
        color="#22c55e"
      />
      <AccountCard
        label="Savings"
        value={balance * 0.55}
        change={getChange('income') - 1}
        data={incomeSparkline}
        color="#22c55e"
      />
      <AccountCard
        label="Investment"
        value={savings || balance * 0.1}
        change={-2}
        data={expenseSparkline}
        color="#ef4444"
      />
    </div>
  )
}
