import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { CATEGORY_COLORS } from '../../data/mockData'

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const { name, value } = payload[0]
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg p-3 text-sm">
      <p className="font-medium text-slate-700 dark:text-white">{name}</p>
      <p className="text-slate-500 dark:text-slate-400">${value.toLocaleString()}</p>
    </div>
  )
}

const RADIAN = Math.PI / 180
const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.05) return null
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export default function SpendingBreakdownChart({ transactions }) {
  const expenseMap = {}
  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      expenseMap[t.category] = (expenseMap[t.category] || 0) + t.amount
    })

  const data = Object.entries(expenseMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)

  if (data.length === 0) {
    return (
      <div className="card h-72 flex items-center justify-center text-slate-400 dark:text-slate-500">
        No expense data
      </div>
    )
  }

  return (
    <div className="card">
      <h2 className="text-base font-semibold text-slate-700 dark:text-white mb-4">
        Spending by Category
      </h2>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            outerRadius={90}
            innerRadius={40}
            paddingAngle={2}
            dataKey="value"
            labelLine={false}
            label={renderLabel}
          >
            {data.map((entry) => (
              <Cell
                key={entry.name}
                fill={CATEGORY_COLORS[entry.name] || '#6366f1'}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
            formatter={(v) => (
              <span className="text-slate-600 dark:text-slate-400">{v}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
