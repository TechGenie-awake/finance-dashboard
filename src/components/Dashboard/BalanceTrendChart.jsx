import { useState, useMemo } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { SlidersHorizontal } from 'lucide-react'

const PERIODS = ['1W', '1M', '6M', '1Y']

function buildData(transactions, period) {
  const now = new Date()
  let cutoff = new Date(0)
  if (period === '1W') cutoff = new Date(now - 7 * 86400000)
  else if (period === '1M') cutoff = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
  else if (period === '6M') cutoff = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate())
  else if (period === '1Y') cutoff = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())

  const filtered = transactions.filter((t) => new Date(t.date) >= cutoff)

  const months = {}
  filtered.forEach((t) => {
    const d = new Date(t.date)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    if (!months[key]) months[key] = { revenue: 0, spend: 0 }
    if (t.type === 'income') months[key].revenue += t.amount
    else months[key].spend += t.amount
  })

  return Object.entries(months)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, { revenue, spend }]) => {
      const [year, month] = key.split('-')
      return {
        label: new Date(Number(year), Number(month) - 1).toLocaleDateString('en-US', { month: 'short', year: period === '1Y' ? '2-digit' : undefined }),
        revenue,
        spend,
      }
    })
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-card-md p-3 text-xs">
      <p className="font-semibold text-gray-700 mb-1.5">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="flex items-center justify-between gap-5">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-gray-500 capitalize">{p.name}</span>
          </span>
          <span className="font-semibold text-gray-800">${p.value.toLocaleString()}</span>
        </p>
      ))}
    </div>
  )
}

export default function BalanceTrendChart({ transactions }) {
  const [period, setPeriod] = useState('6M')
  const data = useMemo(() => buildData(transactions, period), [transactions, period])

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-sm font-semibold text-gray-800">Spend Activity</h2>
        <div className="flex items-center gap-2">
          <div className="flex bg-gray-50 rounded-xl p-0.5">
            {PERIODS.map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  period === p
                    ? 'bg-white shadow-sm text-gray-800'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 border border-gray-200 rounded-xl px-3 py-1.5">
            <SlidersHorizontal size={12} /> Filter
          </button>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-gray-400 text-sm">
          No data for this period
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v >= 1000 ? `${v / 1000}k` : v}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke="#22c55e"
              strokeWidth={2}
              fill="url(#revGrad)"
              dot={false}
              activeDot={{ r: 4, fill: '#22c55e', stroke: 'white', strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="spend"
              name="Spend"
              stroke="#ef4444"
              strokeWidth={2}
              fill="url(#spendGrad)"
              dot={false}
              activeDot={{ r: 4, fill: '#ef4444', stroke: 'white', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
