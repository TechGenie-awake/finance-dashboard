import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import DashboardPage from './pages/Dashboard'
import TransactionsPage from './pages/Transactions'
import InsightsPage from './pages/Insights'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="insights" element={<InsightsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
