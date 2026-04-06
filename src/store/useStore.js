import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { INITIAL_TRANSACTIONS, getNextId } from '../data/mockData'
import {
  apiFetchTransactions,
  apiAddTransaction,
  apiUpdateTransaction,
  apiDeleteTransaction,
} from '../api/mockApi'

const useStore = create(
  persist(
    (set, get) => ({
      // ── Auth / Role ────────────────────────────────────────────────────────
      role: 'viewer',
      setRole: (role) => set({ role }),

      // ── Dark Mode ──────────────────────────────────────────────────────────
      darkMode: false,
      toggleDarkMode: () =>
        set((s) => {
          const next = !s.darkMode
          if (next) document.documentElement.classList.add('dark')
          else document.documentElement.classList.remove('dark')
          return { darkMode: next }
        }),

      // ── Transactions ───────────────────────────────────────────────────────
      transactions: INITIAL_TRANSACTIONS,
      loading: false,
      error: null,

      /** Simulates an initial API fetch (e.g. on app mount) */
      fetchTransactions: async () => {
        set({ loading: true, error: null })
        try {
          const data = await apiFetchTransactions(get().transactions)
          set({ transactions: data, loading: false })
        } catch (err) {
          set({ error: err.message || 'Failed to fetch transactions', loading: false })
        }
      },

      addTransaction: async (txn) => {
        set({ loading: true, error: null })
        try {
          const payload = { ...txn, id: getNextId() }
          const data = await apiAddTransaction(get().transactions, payload)
          set({ transactions: data, loading: false })
        } catch (err) {
          set({ error: err.message || 'Failed to add transaction', loading: false })
        }
      },

      updateTransaction: async (id, updates) => {
        set({ loading: true, error: null })
        try {
          const data = await apiUpdateTransaction(get().transactions, id, updates)
          set({ transactions: data, loading: false })
        } catch (err) {
          set({ error: err.message || 'Failed to update transaction', loading: false })
        }
      },

      deleteTransaction: async (id) => {
        set({ loading: true, error: null })
        try {
          const data = await apiDeleteTransaction(get().transactions, id)
          set({ transactions: data, loading: false })
        } catch (err) {
          set({ error: err.message || 'Failed to delete transaction', loading: false })
        }
      },

      clearError: () => set({ error: null }),

      // ── Filters ────────────────────────────────────────────────────────────
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
      // Don't persist loading/error – those are transient
      partialize: (s) => ({
        role: s.role,
        darkMode: s.darkMode,
        transactions: s.transactions,
        filters: s.filters,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.darkMode) document.documentElement.classList.add('dark')
      },
    }
  )
)

export default useStore
