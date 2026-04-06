import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts'

function buildMonthlyBalance(transactions) {
  const months = {}
  transactions.forEach((t) => {
    const d = new Date(t.date)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    if (!months[key]) months[key] = { income: 0, expenses: 0 }
    if (t.type === 'income') months[key].income += t.amount
    else months[key].expenses += t.amount
  })
  let running = 0
  return Object.entries(months)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, { income, expenses }]) => {
      running += income - expenses
      const [year, month] = key.split('-')
      return {
        label: new Date(Number(year), Number(month) - 1).toLocaleDateString('en-US', { month: 'short' }),
        balance: running,
      }
    })
}

export default function BalanceCard({ transactions }) {
  const totalIncome = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const totalExpenses = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  const balance = totalIncome - totalExpenses
  const data = buildMonthlyBalance(transactions)

  // MoM balance change
  const lastTwo = data.slice(-2)
  const change = lastTwo.length === 2
    ? ((lastTwo[1].balance - lastTwo[0].balance) / Math.abs(lastTwo[0].balance) * 100).toFixed(2)
    : 0
  const positive = Number(change) >= 0

  return (
    <div className="card flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">Balance</p>
          <p className="text-3xl font-bold text-gray-900">
            ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            You've {positive ? 'increased' : 'decreased'} your balance by{' '}
            <span className={positive ? 'text-accent font-medium' : 'text-red-500 font-medium'}>
              ${Math.abs(lastTwo.length === 2 ? lastTwo[1].balance - lastTwo[0].balance : 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>{' '}
            this month
          </p>
        </div>
        <button className="text-xs text-gray-400 hover:text-accent">View more</button>
      </div>

      <ResponsiveContainer width="100%" height={80}>
        <AreaChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Tooltip
            contentStyle={{ display: 'none' }}
            cursor={{ stroke: '#22c55e', strokeWidth: 1, strokeDasharray: '4 2' }}
          />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="#22c55e"
            strokeWidth={2}
            fill="url(#balGrad)"
            dot={false}
            activeDot={{ r: 4, fill: '#22c55e', stroke: 'white', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
