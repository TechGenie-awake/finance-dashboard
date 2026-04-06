import { Menu, Moon, Sun, ChevronDown } from 'lucide-react'
import useStore from '../../store/useStore'

export default function Header({ onMenuClick }) {
  const { role, setRole, darkMode, toggleDarkMode } = useStore()

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700 px-4 py-3 flex items-center justify-between">
      <button
        className="lg:hidden text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white"
        onClick={onMenuClick}
      >
        <Menu size={22} />
      </button>

      <div className="flex-1 lg:flex-none" />

      <div className="flex items-center gap-3">
        {/* Role Switcher */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-1.5">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
            Role:
          </span>
          <div className="relative">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="text-sm font-medium bg-transparent text-slate-700 dark:text-slate-200 outline-none cursor-pointer pr-5 appearance-none"
            >
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>
            <ChevronDown
              size={14}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              role === 'admin'
                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400'
                : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
            }`}
          >
            {role === 'admin' ? 'Admin' : 'View only'}
          </span>
        </div>

        {/* Dark Mode */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  )
}
