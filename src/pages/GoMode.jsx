// GoMode: ultra-minimalist real-time guidance screen
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useCobility } from '../context/CobilityContext.jsx';

const MAP_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY;

function getArrowRotation(direction) {
  if (direction === 'left') return -90;
  if (direction === 'right') return 90;
  return 0;
}

export default function GoMode() {
  const navigate = useNavigate();
  const { steps, currentStepIndex, setCurrentStepIndex } = useCobility();
  const currentStep = steps[currentStepIndex] ?? steps[0];

  const [isPortrait, setIsPortrait] = useState(true);
   const [userPosition, setUserPosition] = useState(null);
   const [geoHeading, setGeoHeading] = useState(null);

  // Detect orientation (portrait vs landscape)
  useEffect(() => {
    const updateOrientation = () => {
      if (typeof window === 'undefined') return;
      setIsPortrait(window.innerHeight >= window.innerWidth);
    };
    updateOrientation();
    window.addEventListener('resize', updateOrientation);
    return () => window.removeEventListener('resize', updateOrientation);
  }, []);

  // Track real user location + heading
  useEffect(() => {
    if (typeof window === 'undefined' || !('geolocation' in navigator)) {
      return undefined;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, heading } = position.coords;
        setUserPosition({ lat: latitude, lng: longitude });
        if (typeof heading === 'number' && !Number.isNaN(heading)) {
          setGeoHeading(heading);
        }
      },
      () => {
        // Silently fall back to mock route location if permission denied or unavailable
      },
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 10000,
      },
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  const centerLat = (userPosition?.lat ?? currentStep?.location?.lat) ?? 51.5074;
  const centerLng = (userPosition?.lng ?? currentStep?.location?.lng) ?? -0.1278;
  const mapSrc =
    MAP_API_KEY &&
    `https://www.google.com/maps/embed/v1/view?key=${MAP_API_KEY}&center=${centerLat},${centerLng}&zoom=16&maptype=roadmap`;

  const rotation =
    typeof geoHeading === 'number'
      ? geoHeading
      : getArrowRotation(currentStep?.direction);
  const timeRemaining = currentStep?.eta || 'a few minutes';
  const progress = currentStep?.progress ?? 0;

  const handleNextStep = () => {
    setCurrentStepIndex((prev) =>
      prev < steps.length - 1 ? prev + 1 : prev,
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-[var(--color-text)]">
      {/* Exit button only */}
      <button
        type="button"
        onClick={() => navigate('/')}
        className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
        aria-label="Exit navigation"
      >
        <X className="h-4 w-4" />
      </button>

      {/* Main layout: 60% map, 40% instructions */}
      <div className="flex flex-1 flex-col">
        {/* Top half: map + arrow */}
        <div
          className={`relative ${
            isPortrait ? 'flex-[3]' : 'flex-[3]'
          } bg-slate-100`}
        >
          {mapSrc ? (
            <iframe
              title="Navigation map"
              src={mapSrc}
              className="h-full w-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-100 text-xs text-slate-500">
              Map preview (add VITE_GOOGLE_MAPS_KEY to enable)
            </div>
          )}

          {/* Direction arrow overlay */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white/90 shadow-lg">
              <svg
                viewBox="0 0 48 48"
                className="h-16 w-16 text-[var(--color-success)]"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                <path
                  d="M24 6l-9 18h6v12h6V24h6L24 6z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom half: next instruction + progress */}
        <div className="flex flex-[2] flex-col justify-between border-t border-slate-100 bg-white px-4 pb-6 pt-4">
          <div className="space-y-2 text-center">
            <p className="text-4xl font-semibold tracking-tight">
              {currentStep?.instruction || 'Getting your next step…'}
            </p>
            <p className="text-base text-slate-500">
              You&apos;ll arrive in {timeRemaining}
            </p>
          </div>

          {/* Next step button for demo */}
          <div className="mt-4 flex flex-col items-center gap-4">
            {currentStepIndex < steps.length - 1 && (
              <button
                type="button"
                onClick={handleNextStep}
                className="rounded-full bg-[var(--color-success)] px-8 py-3 text-lg font-semibold text-white shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-300"
              >
                Next step
              </button>
            )}

            {/* Progress bar with soft pulse */}
            <div className="w-full">
              <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[var(--color-success)] animate-pulse"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

