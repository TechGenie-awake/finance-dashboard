import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import LoadingBar from '../common/LoadingBar'
import ErrorToast from '../common/ErrorToast'
import useStore from '../../store/useStore'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const fetchTransactions = useStore((s) => s.fetchTransactions)

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <LoadingBar />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
      <ErrorToast />
    </div>
  )
}
