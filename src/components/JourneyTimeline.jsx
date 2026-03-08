// JourneyTimeline: vertical list of journey steps with previews
import { Footprints, Bus, TrainFront } from 'lucide-react';
import { useCobility } from '../context/CobilityContext.jsx';
import StreetViewPreview from './StreetViewPreview.jsx';

function StepIcon({ kind }) {
  const common = 'h-4 w-4';
  if (kind === 'bus') return <Bus className={common} />;
  if (kind === 'train') return <TrainFront className={common} />;
  return <Footprints className={common} />;
}

export default function JourneyTimeline() {
  const { steps } = useCobility();

  return (
    <ol className="space-y-3">
      {steps.map((step, index) => (
        <li
          key={step.id}
          className="flex gap-3 rounded-2xl bg-white p-3 shadow-sm"
        >
          {/* Step number */}
          <div className="flex flex-col items-center pt-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs font-semibold text-white">
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div className="mt-1 h-full w-px flex-1 bg-slate-200" />
            )}
          </div>

          {/* Main content */}
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text)]">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100">
                    <StepIcon kind={step.kind} />
                  </span>
                  <span>{step.instruction}</span>
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {step.duration} • {step.distance}
                </p>
              </div>
            </div>

            {/* Preview thumbnail / Street View */}
            {step.kind === 'walk' ? (
              <StreetViewPreview
                lat={step.location.lat}
                lng={step.location.lng}
                heading={step.heading}
              />
            ) : (
              <div className="h-20 w-full rounded-xl bg-slate-100" />
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

