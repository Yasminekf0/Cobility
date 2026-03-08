// LockedRouteCard: shows saved/locked route information
import { Lock } from 'lucide-react';
import { useCobility } from '../context/CobilityContext.jsx';

export default function LockedRouteCard() {
  const { currentRoute } = useCobility();

  const title =
    currentRoute && currentRoute.name
      ? currentRoute.name
      : 'Sample morning route';

  return (
    <div className="flex items-start gap-3 rounded-2xl bg-slate-900 px-4 py-3 text-white shadow-sm">
      <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-800">
        <Lock className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-1 text-xs text-slate-300">
          This route is protected — only smart delays will change it.
        </p>
      </div>
    </div>
  );
}

