import { Menu, Bell, ChevronDown } from 'lucide-react'
import useStore from '../../store/useStore'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good Morning'
  if (h < 17) return 'Good Afternoon'
  return 'Good Evening'
}

const AVATARS = {
  admin: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin&backgroundColor=b6e3f4',
  viewer: 'https://api.dicebear.com/7.x/avataaars/svg?seed=viewer&backgroundColor=d1d4f9',
}

const NAMES = {
  admin: 'Alex Admin',
  viewer: 'Sam Viewer',
}

export default function Header({ onMenuClick }) {
  const { role, setRole } = useStore()

  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden text-gray-400 hover:text-gray-700"
          onClick={onMenuClick}
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-xl font-semibold text-gray-900 leading-tight">
            {getGreeting()}, {NAMES[role].split(' ')[0]}
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Role switcher */}
        <div className="relative flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5">
          <span className="text-xs text-gray-400">Role:</span>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="text-sm font-medium bg-transparent text-gray-700 outline-none cursor-pointer pr-4 appearance-none"
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
          <ChevronDown size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        {/* Notification */}
        <button className="relative p-2 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-gray-700 transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-accent rounded-full" />
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2.5 pl-1">
          <img
            src={AVATARS[role]}
            alt={NAMES[role]}
            className="w-8 h-8 rounded-full border border-gray-200 bg-gray-100"
          />
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-800 leading-tight">{NAMES[role]}</p>
            <p className="text-xs text-gray-400">{role}@fintrack.io</p>
          </div>
          <ChevronDown size={14} className="text-gray-400 hidden sm:block" />
        </div>
      </div>
    </header>
  )
}
