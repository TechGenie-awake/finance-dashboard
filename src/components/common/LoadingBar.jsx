import useStore from '../../store/useStore'

export default function LoadingBar() {
  const loading = useStore((s) => s.loading)

  if (!loading) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-slate-200 dark:bg-slate-700 overflow-hidden">
      <div className="h-full bg-indigo-500 animate-[loading_1.2s_ease-in-out_infinite]" />
      <style>{`
        @keyframes loading {
          0%   { width: 0%;   margin-left: 0; }
          50%  { width: 60%;  margin-left: 20%; }
          100% { width: 0%;   margin-left: 100%; }
        }
      `}</style>
    </div>
  )
}
