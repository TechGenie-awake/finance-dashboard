/**
 * Triggers a file download in the browser.
 */
function download(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

/**
 * Export transactions as a CSV file.
 */
export function exportCSV(transactions) {
  const headers = ['Date', 'Description', 'Category', 'Type', 'Amount']
  const rows = transactions.map((t) => [
    t.date,
    `"${t.description.replace(/"/g, '""')}"`,
    t.category,
    t.type,
    t.amount,
  ])
  const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
  download('transactions.csv', csv, 'text/csv;charset=utf-8;')
}

/**
 * Export transactions as a formatted JSON file.
 */
export function exportJSON(transactions) {
  download(
    'transactions.json',
    JSON.stringify(transactions, null, 2),
    'application/json'
  )
}
