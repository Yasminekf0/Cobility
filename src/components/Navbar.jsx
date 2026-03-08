// Navbar: shown only in Plan Mode
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-lg bg-[var(--color-primary)] text-white flex items-center justify-center text-xs font-semibold">
          cb
        </div>
        <span className="text-lg font-bold tracking-tight lowercase text-[var(--color-text)]">
          cobility
        </span>
      </div>

      {/* Go Mode toggle */}
      <button
        type="button"
        onClick={() => navigate('/go')}
        className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400"
      >
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>Go mode</span>
      </button>
    </header>
  );
}

