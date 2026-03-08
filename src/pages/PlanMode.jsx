// PlanMode: calm, structured planning interface
import Navbar from '../components/Navbar.jsx';
import RouteBuilder from '../components/RouteBuilder.jsx';
import JourneyTimeline from '../components/JourneyTimeline.jsx';
import LockedRouteCard from '../components/LockedRouteCard.jsx';
import CalendarSync from '../components/CalendarSync.jsx';
import AIChatBubble from '../components/AIChatBubble.jsx';
import { useCobility } from '../context/CobilityContext.jsx';

export default function PlanMode() {
  const { currentRoute } = useCobility();

  return (
    <div className="flex min-h-screen flex-col pb-20">
      {/* Top navigation bar */}
      <Navbar />

      {/* Planning content */}
      <main className="flex-1 space-y-5 px-4 py-4">
        {/* Route builder */}
        <section aria-label="Plan your route" className="space-y-3">
          <h2 className="text-lg font-semibold text-[var(--color-text)]">
            Plan your journey
          </h2>
          <RouteBuilder />
        </section>

        {/* Journey timeline */}
        <section aria-label="Journey steps" className="space-y-3">
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-semibold text-[var(--color-text)]">
              Journey timeline
            </h2>
            <p className="text-xs text-slate-500">
              {currentRoute.start && currentRoute.destination
                ? `${currentRoute.start} → ${currentRoute.destination}`
                : 'Using a sample route for now'}
            </p>
          </div>
          <JourneyTimeline />
        </section>

        {/* Locked route and calendar sync */}
        <section aria-label="Saved route and calendar" className="space-y-3">
          <LockedRouteCard />
          <CalendarSync />
        </section>
      </main>

      {/* Floating AI assistant */}
      <AIChatBubble />
    </div>
  );
}

