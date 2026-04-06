/**
 * Mock API – simulates network latency for all CRUD operations.
 * In a real app these would be fetch/axios calls to a backend.
 */

const BASE_DELAY = 400 // ms
const jitter = () => Math.random() * 200

const delay = (ms = BASE_DELAY) =>
  new Promise((resolve) => setTimeout(resolve, ms + jitter()))

// ─── Transactions ────────────────────────────────────────────────────────────

export async function apiFetchTransactions(transactions) {
  await delay()
  return [...transactions]
}

export async function apiAddTransaction(transactions, txn) {
  await delay()
  return [{ ...txn }, ...transactions]
}

export async function apiUpdateTransaction(transactions, id, updates) {
  await delay()
  return transactions.map((t) => (t.id === id ? { ...t, ...updates } : t))
}

export async function apiDeleteTransaction(transactions, id) {
  await delay()
  return transactions.filter((t) => t.id !== id)
}
