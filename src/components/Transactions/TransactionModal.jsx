import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { CATEGORIES } from '../../data/mockData'
import useStore from '../../store/useStore'

const EMPTY = {
  description: '',
  amount: '',
  category: CATEGORIES[0],
  type: 'expense',
  date: new Date().toISOString().split('T')[0],
}

export default function TransactionModal({ open, onClose, editTxn }) {
  const { addTransaction, updateTransaction } = useStore()
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (editTxn) {
      setForm({ ...editTxn, amount: String(editTxn.amount) })
    } else {
      setForm(EMPTY)
    }
    setErrors({})
  }, [editTxn, open])

  if (!open) return null

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }))
    setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const validate = () => {
    const e = {}
    if (!form.description.trim()) e.description = 'Required'
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      e.amount = 'Must be a positive number'
    if (!form.date) e.date = 'Required'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) return setErrors(errs)

    const payload = { ...form, amount: parseFloat(form.amount) }
    if (editTxn) {
      updateTransaction(editTxn.id, payload)
    } else {
      addTransaction(payload)
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-card-md w-full max-w-md">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">
            {editTxn ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button onClick={onClose} className="text-gray-300 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Type toggle */}
          <div className="flex rounded-lg overflow-hidden border border-slate-200 dark:border-slate-600">
            {['expense', 'income'].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => set('type', t)}
                className={`flex-1 py-2 text-sm font-medium capitalize transition-colors ${
                  form.type === t
                    ? t === 'expense'
                      ? 'bg-red-500 text-white'
                      : 'bg-accent text-white'
                    : 'text-gray-400 hover:bg-gray-50'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Description
            </label>
            <input
              className="input"
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              placeholder="e.g. Coffee at Starbucks"
            />
            {errors.description && (
              <p className="text-xs text-rose-500 mt-1">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Amount ($)
              </label>
              <input
                className="input"
                type="number"
                min="0.01"
                step="0.01"
                value={form.amount}
                onChange={(e) => set('amount', e.target.value)}
                placeholder="0.00"
              />
              {errors.amount && (
                <p className="text-xs text-rose-500 mt-1">{errors.amount}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Date
              </label>
              <input
                className="input"
                type="date"
                value={form.date}
                onChange={(e) => set('date', e.target.value)}
              />
              {errors.date && (
                <p className="text-xs text-rose-500 mt-1">{errors.date}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Category
            </label>
            <select
              className="input"
              value={form.category}
              onChange={(e) => set('category', e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Cancel
            </button>
            <button type="submit" className="btn-primary flex-1">
              {editTxn ? 'Save Changes' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
