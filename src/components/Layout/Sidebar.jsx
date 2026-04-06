import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  ArrowLeftRight,
  Lightbulb,
  TrendingUp,
  X,
  HelpCircle,
  Settings,
} from 'lucide-react'

const mainNav = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { to: '/insights', label: 'Insights', icon: Lightbulb },
]

const bottomNav = [
  { label: 'Help Center', icon: HelpCircle },
  { label: 'Settings', icon: Settings },
]

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full z-30 w-56
          bg-sidebar flex flex-col transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto lg:h-auto
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <TrendingUp size={15} className="text-sidebar" />
            </div>
            <span className="font-semibold text-white text-base tracking-tight">
              FinTrack
            </span>
          </div>
          <button
            className="lg:hidden text-gray-500 hover:text-white"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        {/* Main Nav */}
        <nav className="flex-1 px-3 pt-2 space-y-0.5">
          {mainNav.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-sidebar-active text-white'
                    : 'text-gray-400 hover:bg-sidebar-hover hover:text-white'
                }`
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Nav */}
        <div className="px-3 pb-5 space-y-0.5">
          {bottomNav.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-sidebar-hover hover:text-white transition-colors"
            >
              <Icon size={17} />
              {label}
            </button>
          ))}
        </div>
      </aside>
    </>
  )
}
