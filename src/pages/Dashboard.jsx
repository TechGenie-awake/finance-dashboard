import useStore from '../store/useStore'
import SummaryCards from '../components/Dashboard/SummaryCards'
import BalanceTrendChart from '../components/Dashboard/BalanceTrendChart'
import SpendingBreakdownChart from '../components/Dashboard/SpendingBreakdownChart'
import RecentTransactions from '../components/Dashboard/RecentTransactions'

export default function DashboardPage() {
  const transactions = useStore((s) => s.transactions)

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-semibold text-slate-800 dark:text-white">
          Dashboard
        </h1>
        <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">
          Your financial overview at a glance
        </p>
      </div>

      <SummaryCards transactions={transactions} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2">
          <BalanceTrendChart transactions={transactions} />
        </div>
        <div>
          <SpendingBreakdownChart transactions={transactions} />
        </div>
      </div>

      <RecentTransactions transactions={transactions} />
    </div>
  )
}
