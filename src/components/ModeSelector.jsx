// ModeSelector: home screen letting users choose Plan or Go mode
import { useNavigate } from 'react-router-dom';
import { Map, ArrowRight } from 'lucide-react';

function ModeCard({ title, description, color, icon: Icon, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left card mb-4 flex items-center gap-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
    >
      <div
        className="flex h-12 w-12 items-center justify-center rounded-2xl"
        style={{ backgroundColor: color }}
      >
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className="flex-1">
        <p className="text-base font-semibold text-[var(--color-text)]">
          {title}
        </p>
        <p className="mt-1 text-sm text-slate-600">{description}</p>
      </div>
    </button>
  );
}

export default function ModeSelector() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col px-4 py-6">
      {/* Branding / intro */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">
          cobility
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-[var(--color-text)]">
          How would you like to start?
        </h1>
      </div>

      {/* Mode cards */}
      <div className="flex flex-1 flex-col justify-start">
        <ModeCard
          title="Plan your journey"
          description="Set a calm, predictable route before you head out."
          color="#4A90D9"
          icon={Map}
          onClick={() => navigate('/plan')}
        />

        <ModeCard
          title="Start navigating"
          description="Get simple, step-by-step guidance right now."
          color="#5BB974"
          icon={ArrowRight}
          onClick={() => navigate('/go')}
        />
      </div>

      {/* Support copy */}
      <p className="mt-6 text-center text-xs text-slate-600">
        Cobility helps you move with confidence.
      </p>
    </div>
  );
}

