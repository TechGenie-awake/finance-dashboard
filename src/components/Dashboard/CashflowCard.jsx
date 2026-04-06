export default function CashflowCard({ transactions }) {
  const totalIncome = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const totalExpenses = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  const cashflow = totalIncome - totalExpenses
  const inPct = totalIncome > 0 ? Math.round((totalIncome / (totalIncome + totalExpenses)) * 100) : 50

  return (
    <div className="card flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">Cashflow</p>
          <p className="text-3xl font-bold text-gray-900">
            ${cashflow.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <button className="text-xs text-gray-400 hover:text-accent">View more</button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-lg font-semibold text-gray-900">
            ${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-accent font-medium mt-0.5">+3% vs last month</p>
          <p className="text-xs text-gray-400 mt-2">{inPct}% money in</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-lg font-semibold text-gray-900">
            ${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-accent font-medium mt-0.5">+4% vs last month</p>
          <p className="text-xs text-gray-400 mt-2">{100 - inPct}% money out</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden flex">
        <div
          className="h-full bg-accent rounded-full transition-all duration-500"
          style={{ width: `${inPct}%` }}
        />
        <div
          className="h-full bg-red-200 rounded-full transition-all duration-500"
          style={{ width: `${100 - inPct}%` }}
        />
      </div>
    </div>
  )
}
