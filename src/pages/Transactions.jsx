import { useState, useMemo } from 'react'
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  ChevronUp,
  ChevronDown,
  RotateCcw,
} from 'lucide-react'
import useStore from '../store/useStore'
import { CATEGORIES, CATEGORY_COLORS } from '../data/mockData'
import TransactionModal from '../components/Transactions/TransactionModal'

function sortTransactions(list, sortBy) {
  const [field, dir] = sortBy.split('-')
  return [...list].sort((a, b) => {
    let av, bv
    if (field === 'date') { av = new Date(a.date); bv = new Date(b.date) }
    else if (field === 'amount') { av = a.amount; bv = b.amount }
    else { av = a.description.toLowerCase(); bv = b.description.toLowerCase() }
    if (av < bv) return dir === 'asc' ? -1 : 1
    if (av > bv) return dir === 'asc' ? 1 : -1
    return 0
  })
}

export default function TransactionsPage() {
  const { transactions, deleteTransaction, filters, setFilter, resetFilters, role } = useStore()
  const [modalOpen, setModalOpen] = useState(false)
  const [editTxn, setEditTxn] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const isAdmin = role === 'admin'

  const filtered = useMemo(() => {
    let list = transactions
    if (filters.search) {
      const q = filters.search.toLowerCase()
      list = list.filter(
        (t) =>
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      )
    }
    if (filters.type !== 'all') list = list.filter((t) => t.type === filters.type)
    if (filters.category !== 'all') list = list.filter((t) => t.category === filters.category)
    return sortTransactions(list, filters.sortBy)
  }, [transactions, filters])

  const handleDelete = (id) => {
    if (deleteConfirm === id) {
      deleteTransaction(id)
      setDeleteConfirm(null)
    } else {
      setDeleteConfirm(id)
      setTimeout(() => setDeleteConfirm(null), 3000)
    }
  }

  const SortBtn = ({ field, label }) => {
    const current = filters.sortBy
    const isAsc = current === `${field}-asc`
    const isDesc = current === `${field}-desc`
    const active = isAsc || isDesc
    return (
      <button
        onClick={() =>
          setFilter('sortBy', isDesc ? `${field}-asc` : `${field}-desc`)
        }
        className={`flex items-center gap-1 text-xs font-medium ${
          active
            ? 'text-indigo-600 dark:text-indigo-400'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
        }`}
      >
        {label}
        {active ? (
          isDesc ? <ChevronDown size={12} /> : <ChevronUp size={12} />
        ) : (
          <ChevronDown size={12} className="opacity-30" />
        )}
      </button>
    )
  }

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800 dark:text-white">
            Transactions
          </h1>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">
            {filtered.length} of {transactions.length} transactions
          </p>
        </div>
        {isAdmin && (
          <button
            onClick={() => { setEditTxn(null); setModalOpen(true) }}
            className="btn-primary flex items-center gap-2 flex-shrink-0"
          >
            <Plus size={16} /> Add Transaction
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-wrap gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-48">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              className="input pl-9"
              placeholder="Search transactions..."
              value={filters.search}
              onChange={(e) => setFilter('search', e.target.value)}
            />
          </div>

          {/* Type */}
          <select
            className="input w-auto"
            value={filters.type}
            onChange={(e) => setFilter('type', e.target.value)}
          >
            <option value="all">All types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          {/* Category */}
          <select
            className="input w-auto"
            value={filters.category}
            onChange={(e) => setFilter('category', e.target.value)}
          >
            <option value="all">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Reset */}
          {(filters.search || filters.type !== 'all' || filters.category !== 'all') && (
            <button
              onClick={resetFilters}
              className="btn-secondary flex items-center gap-1.5"
            >
              <RotateCcw size={14} /> Reset
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-400 dark:text-slate-500">
            <p className="text-lg mb-1">No transactions found</p>
            <p className="text-sm">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                  <th className="text-left px-4 py-3">
                    <SortBtn field="date" label="Date" />
                  </th>
                  <th className="text-left px-4 py-3">
                    <SortBtn field="description" label="Description" />
                  </th>
                  <th className="text-left px-4 py-3 hidden sm:table-cell">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      Category
                    </span>
                  </th>
                  <th className="text-left px-4 py-3 hidden md:table-cell">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      Type
                    </span>
                  </th>
                  <th className="text-right px-4 py-3">
                    <SortBtn field="amount" label="Amount" />
                  </th>
                  {isAdmin && (
                    <th className="text-right px-4 py-3">
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        Actions
                      </span>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filtered.map((txn, i) => (
                  <tr
                    key={txn.id}
                    className={`border-b border-slate-50 dark:border-slate-700/50 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors ${
                      i % 2 === 0 ? '' : 'bg-slate-50/30 dark:bg-slate-800/20'
                    }`}
                  >
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {new Date(txn.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-200 max-w-[180px] truncate">
                      {txn.description}
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: CATEGORY_COLORS[txn.category] || '#6366f1' }}
                        />
                        <span className="text-slate-500 dark:text-slate-400 text-xs">
                          {txn.category}
                        </span>
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className={txn.type === 'income' ? 'badge-income' : 'badge-expense'}>
                        {txn.type}
                      </span>
                    </td>
                    <td className={`px-4 py-3 text-right font-semibold whitespace-nowrap ${
                      txn.type === 'income'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-rose-600 dark:text-rose-400'
                    }`}>
                      {txn.type === 'income' ? '+' : '-'}${txn.amount.toLocaleString()}
                    </td>
                    {isAdmin && (
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => { setEditTxn(txn); setModalOpen(true) }}
                            className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(txn.id)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              deleteConfirm === txn.id
                                ? 'bg-rose-500 text-white'
                                : 'text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/30'
                            }`}
                            title={deleteConfirm === txn.id ? 'Click again to confirm' : 'Delete'}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <TransactionModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditTxn(null) }}
        editTxn={editTxn}
      />
    </div>
  )
}
