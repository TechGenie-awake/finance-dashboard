import { useEffect } from 'react'
import { XCircle, X } from 'lucide-react'
import useStore from '../../store/useStore'

export default function ErrorToast() {
  const { error, clearError } = useStore()

  useEffect(() => {
    if (!error) return
    const t = setTimeout(clearError, 5000)
    return () => clearTimeout(t)
  }, [error, clearError])

  if (!error) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm flex items-start gap-3 bg-white dark:bg-slate-800 border border-rose-200 dark:border-rose-800 rounded-xl shadow-lg p-4">
      <XCircle size={18} className="text-rose-500 flex-shrink-0 mt-0.5" />
      <p className="text-sm text-slate-700 dark:text-slate-200 flex-1">{error}</p>
      <button
        onClick={clearError}
        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
      >
        <X size={16} />
      </button>
    </div>
  )
}
