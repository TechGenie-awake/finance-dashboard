import useStore from '../store/useStore'
import BalanceCard from '../components/Dashboard/BalanceCard'
import CashflowCard from '../components/Dashboard/CashflowCard'
import SummaryCards from '../components/Dashboard/SummaryCards'
import BalanceTrendChart from '../components/Dashboard/BalanceTrendChart'
import SpendingBreakdownChart from '../components/Dashboard/SpendingBreakdownChart'
import RecentTransactions from '../components/Dashboard/RecentTransactions'

export default function DashboardPage() {
  const transactions = useStore((s) => s.transactions)

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      {/* Row 1: Balance + Cashflow */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <BalanceCard transactions={transactions} />
        </div>
        <div>
          <CashflowCard transactions={transactions} />
        </div>
      </div>

      {/* Row 2: Account cards */}
      <SummaryCards transactions={transactions} />

      {/* Row 3: Spend Activity + Spending breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <BalanceTrendChart transactions={transactions} />
        </div>
        <div>
          <SpendingBreakdownChart transactions={transactions} />
        </div>
      </div>

      {/* Row 4: Recent Transactions */}
      <RecentTransactions transactions={transactions} />
    </div>
  )
}
