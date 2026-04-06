export const CATEGORIES = [
  'Food & Dining',
  'Shopping',
  'Transport',
  'Utilities',
  'Entertainment',
  'Healthcare',
  'Salary',
  'Freelance',
  'Investment',
  'Rent',
  'Travel',
  'Education',
]

export const CATEGORY_COLORS = {
  'Food & Dining': '#f97316',
  Shopping: '#8b5cf6',
  Transport: '#3b82f6',
  Utilities: '#6b7280',
  Entertainment: '#ec4899',
  Healthcare: '#14b8a6',
  Salary: '#10b981',
  Freelance: '#22c55e',
  Investment: '#06b6d4',
  Rent: '#ef4444',
  Travel: '#f59e0b',
  Education: '#6366f1',
}

let idCounter = 1
const mkId = () => `txn-${idCounter++}`

const genDate = (year, month, day) =>
  new Date(year, month - 1, day).toISOString().split('T')[0]

export const INITIAL_TRANSACTIONS = [
  // January 2026
  { id: mkId(), date: genDate(2026, 1, 2), description: 'Monthly Salary', amount: 5500, category: 'Salary', type: 'income' },
  { id: mkId(), date: genDate(2026, 1, 3), description: 'Grocery Store', amount: 120, category: 'Food & Dining', type: 'expense' },
  { id: mkId(), date: genDate(2026, 1, 5), description: 'Electric Bill', amount: 85, category: 'Utilities', type: 'expense' },
  { id: mkId(), date: genDate(2026, 1, 7), description: 'Netflix', amount: 15, category: 'Entertainment', type: 'expense' },
  { id: mkId(), date: genDate(2026, 1, 10), description: 'Freelance Project', amount: 800, category: 'Freelance', type: 'income' },
  { id: mkId(), date: genDate(2026, 1, 12), description: 'Uber Eats', amount: 45, category: 'Food & Dining', type: 'expense' },
  { id: mkId(), date: genDate(2026, 1, 14), description: 'Bus Pass', amount: 60, category: 'Transport', type: 'expense' },
  { id: mkId(), date: genDate(2026, 1, 16), description: 'Apartment Rent', amount: 1200, category: 'Rent', type: 'expense' },
  { id: mkId(), date: genDate(2026, 1, 18), description: 'Online Shopping', amount: 230, category: 'Shopping', type: 'expense' },
  { id: mkId(), date: genDate(2026, 1, 20), description: 'Gym Membership', amount: 40, category: 'Healthcare', type: 'expense' },
  { id: mkId(), date: genDate(2026, 1, 22), description: 'Stock Dividend', amount: 150, category: 'Investment', type: 'income' },
  { id: mkId(), date: genDate(2026, 1, 25), description: 'Restaurant Dinner', amount: 90, category: 'Food & Dining', type: 'expense' },
  { id: mkId(), date: genDate(2026, 1, 28), description: 'Doctor Visit', amount: 75, category: 'Healthcare', type: 'expense' },

  // February 2026
  { id: mkId(), date: genDate(2026, 2, 1), description: 'Monthly Salary', amount: 5500, category: 'Salary', type: 'income' },
  { id: mkId(), date: genDate(2026, 2, 3), description: 'Grocery Store', amount: 140, category: 'Food & Dining', type: 'expense' },
  { id: mkId(), date: genDate(2026, 2, 5), description: 'Internet Bill', amount: 55, category: 'Utilities', type: 'expense' },
  { id: mkId(), date: genDate(2026, 2, 7), description: 'Spotify', amount: 10, category: 'Entertainment', type: 'expense' },
  { id: mkId(), date: genDate(2026, 2, 9), description: 'Freelance Design', amount: 1200, category: 'Freelance', type: 'income' },
  { id: mkId(), date: genDate(2026, 2, 12), description: 'Coffee Shop', amount: 35, category: 'Food & Dining', type: 'expense' },
  { id: mkId(), date: genDate(2026, 2, 14), description: "Valentine's Dinner", amount: 120, category: 'Food & Dining', type: 'expense' },
  { id: mkId(), date: genDate(2026, 2, 15), description: 'Apartment Rent', amount: 1200, category: 'Rent', type: 'expense' },
  { id: mkId(), date: genDate(2026, 2, 17), description: 'Clothes Shopping', amount: 180, category: 'Shopping', type: 'expense' },
  { id: mkId(), date: genDate(2026, 2, 20), description: 'Online Course', amount: 49, category: 'Education', type: 'expense' },
  { id: mkId(), date: genDate(2026, 2, 22), description: 'Taxi Rides', amount: 80, category: 'Transport', type: 'expense' },
  { id: mkId(), date: genDate(2026, 2, 25), description: 'ETF Dividend', amount: 200, category: 'Investment', type: 'income' },
  { id: mkId(), date: genDate(2026, 2, 28), description: 'Pharmacy', amount: 30, category: 'Healthcare', type: 'expense' },

  // March 2026
  { id: mkId(), date: genDate(2026, 3, 1), description: 'Monthly Salary', amount: 5500, category: 'Salary', type: 'income' },
  { id: mkId(), date: genDate(2026, 3, 2), description: 'Grocery Store', amount: 115, category: 'Food & Dining', type: 'expense' },
  { id: mkId(), date: genDate(2026, 3, 4), description: 'Electric Bill', amount: 90, category: 'Utilities', type: 'expense' },
  { id: mkId(), date: genDate(2026, 3, 6), description: 'Weekend Trip', amount: 350, category: 'Travel', type: 'expense' },
  { id: mkId(), date: genDate(2026, 3, 8), description: 'Freelance Writing', amount: 600, category: 'Freelance', type: 'income' },
  { id: mkId(), date: genDate(2026, 3, 10), description: 'Movie Night', amount: 25, category: 'Entertainment', type: 'expense' },
  { id: mkId(), date: genDate(2026, 3, 12), description: 'Sushi Restaurant', amount: 75, category: 'Food & Dining', type: 'expense' },
  { id: mkId(), date: genDate(2026, 3, 14), description: 'Car Insurance', amount: 120, category: 'Transport', type: 'expense' },
  { id: mkId(), date: genDate(2026, 3, 16), description: 'Apartment Rent', amount: 1200, category: 'Rent', type: 'expense' },
  { id: mkId(), date: genDate(2026, 3, 18), description: 'Amazon Shopping', amount: 160, category: 'Shopping', type: 'expense' },
  { id: mkId(), date: genDate(2026, 3, 20), description: 'Yoga Class', amount: 50, category: 'Healthcare', type: 'expense' },
  { id: mkId(), date: genDate(2026, 3, 22), description: 'Stock Dividend', amount: 180, category: 'Investment', type: 'income' },
  { id: mkId(), date: genDate(2026, 3, 24), description: 'Bookstore', amount: 45, category: 'Education', type: 'expense' },
  { id: mkId(), date: genDate(2026, 3, 27), description: 'Fast Food', amount: 28, category: 'Food & Dining', type: 'expense' },

  // April 2026 (partial - current month)
  { id: mkId(), date: genDate(2026, 4, 1), description: 'Monthly Salary', amount: 5500, category: 'Salary', type: 'income' },
  { id: mkId(), date: genDate(2026, 4, 2), description: 'Grocery Store', amount: 130, category: 'Food & Dining', type: 'expense' },
  { id: mkId(), date: genDate(2026, 4, 3), description: 'Freelance Project', amount: 950, category: 'Freelance', type: 'income' },
  { id: mkId(), date: genDate(2026, 4, 4), description: 'Electric Bill', amount: 88, category: 'Utilities', type: 'expense' },
  { id: mkId(), date: genDate(2026, 4, 5), description: 'Coffee & Snacks', amount: 22, category: 'Food & Dining', type: 'expense' },
  { id: mkId(), date: genDate(2026, 4, 6), description: 'Online Course', amount: 79, category: 'Education', type: 'expense' },
]

export const getNextId = () => `txn-${idCounter++}`
