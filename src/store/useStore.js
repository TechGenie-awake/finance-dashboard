import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { INITIAL_TRANSACTIONS, getNextId } from '../data/mockData'

const useStore = create(
  persist(
    (set, get) => ({
      // Auth / Role
      role: 'viewer', // 'viewer' | 'admin'
      setRole: (role) => set({ role }),

      // Dark Mode
      darkMode: false,
      toggleDarkMode: () =>
        set((s) => {
          const next = !s.darkMode
          if (next) document.documentElement.classList.add('dark')
          else document.documentElement.classList.remove('dark')
          return { darkMode: next }
        }),

      // Transactions
      transactions: INITIAL_TRANSACTIONS,
      addTransaction: (txn) =>
        set((s) => ({
          transactions: [{ ...txn, id: getNextId() }, ...s.transactions],
        })),
      updateTransaction: (id, updates) =>
        set((s) => ({
          transactions: s.transactions.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        })),
      deleteTransaction: (id) =>
        set((s) => ({
          transactions: s.transactions.filter((t) => t.id !== id),
        })),

      // Filters
      filters: {
        search: '',
        type: 'all',
        category: 'all',
        sortBy: 'date-desc',
      },
      setFilter: (key, value) =>
        set((s) => ({ filters: { ...s.filters, [key]: value } })),
      resetFilters: () =>
        set({
          filters: { search: '', type: 'all', category: 'all', sortBy: 'date-desc' },
        }),
    }),
    {
      name: 'finance-store',
      onRehydrateStorage: () => (state) => {
        if (state?.darkMode) document.documentElement.classList.add('dark')
      },
    }
  )
)

export default useStore
