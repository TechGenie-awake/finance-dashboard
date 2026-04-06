import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { CATEGORY_COLORS } from '../../data/mockData'

export default function RecentTransactions({ transactions }) {
  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)

  if (recent.length === 0) {
    return (
      <div className="card">
        <h2 className="text-base font-semibold text-slate-700 dark:text-white mb-4">
          Recent Transactions
        </h2>
        <p className="text-slate-400 dark:text-slate-500 text-sm text-center py-8">
          No transactions yet
        </p>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-slate-700 dark:text-white">
          Recent Transactions
        </h2>
        <Link
          to="/transactions"
          className="text-indigo-600 dark:text-indigo-400 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
        >
          View all <ArrowRight size={14} />
        </Link>
      </div>
      <div className="space-y-3">
        {recent.map((txn) => (
          <div
            key={txn.id}
            className="flex items-center gap-3 py-2 border-b border-slate-50 dark:border-slate-700/50 last:border-0"
          >
            <div
              className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold"
              style={{ backgroundColor: CATEGORY_COLORS[txn.category] || '#6366f1' }}
            >
              {txn.category[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
                {txn.description}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                {txn.category} &middot;{' '}
                {new Date(txn.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            </div>
            <span
              className={`text-sm font-semibold flex-shrink-0 ${
                txn.type === 'income'
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-rose-600 dark:text-rose-400'
              }`}
            >
              {txn.type === 'income' ? '+' : '-'}$
              {txn.amount.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
