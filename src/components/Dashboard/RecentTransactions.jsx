import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { CATEGORY_COLORS } from '../../data/mockData'

export default function RecentTransactions({ transactions }) {
  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6)

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-800">Recent Transactions</h2>
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5">
          <Search size={13} className="text-gray-400" />
          <input
            className="text-xs bg-transparent outline-none text-gray-600 placeholder-gray-400 w-32"
            placeholder="Search transactions"
            readOnly
            onClick={() => window.location.href = '/transactions'}
          />
        </div>
      </div>

      {recent.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">No transactions yet</p>
      ) : (
        <>
          {/* Table header */}
          <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] text-xs text-gray-400 pb-2 border-b border-gray-50 mb-1 px-2">
            <span>Date</span>
            <span>Merchant</span>
            <span className="hidden sm:block">Card</span>
            <span>Amount</span>
            <span>Status</span>
          </div>

          <div className="space-y-0.5">
            {recent.map((txn) => (
              <div
                key={txn.id}
                className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] items-center px-2 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-sm"
              >
                <span className="text-gray-400 text-xs">
                  {new Date(txn.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                    style={{ backgroundColor: CATEGORY_COLORS[txn.category] || '#6366f1' }}
                  >
                    {txn.description[0]}
                  </div>
                  <span className="text-gray-700 text-xs font-medium truncate max-w-[80px]">
                    {txn.description}
                  </span>
                </div>
                <span className="text-gray-400 text-xs hidden sm:block">
                  *** {Math.floor(1000 + Math.abs(txn.amount * 7)) % 9000 + 1000}
                </span>
                <span className={`text-sm font-semibold ${txn.type === 'income' ? 'text-accent' : 'text-gray-800'}`}>
                  {txn.type === 'income' ? '+' : ''} ${txn.amount.toLocaleString()}
                </span>
                <span className="text-accent text-xs font-medium">Success</span>
              </div>
            ))}
          </div>

          <div className="pt-3 text-center">
            <Link
              to="/transactions"
              className="text-xs text-gray-400 hover:text-accent transition-colors"
            >
              View all transactions →
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
