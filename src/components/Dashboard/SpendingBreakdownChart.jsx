import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { CATEGORY_COLORS } from '../../data/mockData'

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-card-md p-3 text-xs">
      <p className="font-medium text-gray-700">{payload[0].name}</p>
      <p className="text-gray-500">${payload[0].value.toLocaleString()}</p>
    </div>
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
    .slice(0, 6)

  const total = data.reduce((s, d) => s + d.value, 0)

  if (data.length === 0) {
    return (
      <div className="card h-full flex items-center justify-center text-gray-400 text-sm">
        No expense data
      </div>
    )
  }

  return (
    <div className="card h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-800">Spending</h2>
        <button className="text-xs text-gray-400 hover:text-accent">View more</button>
      </div>

      <ResponsiveContainer width="100%" height={160}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={72}
            paddingAngle={2}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || '#6366f1'} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-3 space-y-2">
        {data.map((d) => (
          <div key={d.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: CATEGORY_COLORS[d.name] || '#6366f1' }}
              />
              <span className="text-xs text-gray-500 truncate max-w-[100px]">{d.name}</span>
            </div>
            <span className="text-xs font-medium text-gray-700">
              {Math.round((d.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
