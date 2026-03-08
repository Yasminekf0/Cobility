// GoMode: ultra-minimalist real-time guidance screen
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Camera } from 'lucide-react';
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
  const [isLiveView, setIsLiveView] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

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

  const handleToggleLiveView = async () => {
    if (isLiveView) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      setIsLiveView(false);
      setCameraError(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsLiveView(true);
      setCameraError(false);
    } catch (err) {
      setCameraError(true);
      setIsLiveView(false);
    }
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-transparent text-[var(--color-text)]">
      {/* Live View camera feed */}
      {isLiveView && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="fixed top-0 left-0 h-full w-full object-cover"
          style={{ zIndex: 0 }}
        />
      )}

      {/* Live View toggle button */}
      <button
        type="button"
        onClick={handleToggleLiveView}
        className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
        aria-label="Toggle Live View"
      >
        <Camera className="h-4 w-4" />
        <span>{isLiveView ? 'Map View' : 'Live View'}</span>
      </button>

      {/* Exit button */}
      <button
        type="button"
        onClick={() => navigate('/')}
        className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
        aria-label="Exit navigation"
      >
        <X className="h-4 w-4" />
      </button>

      {/* Camera error message */}
      {cameraError && (
        <div className="absolute left-1/2 top-20 z-20 -translate-x-1/2 rounded-2xl bg-amber-50 px-4 py-2 text-xs text-amber-800 shadow-md">
          Camera access needed for Live View. Using map mode instead.
        </div>
      )}

      {/* Live View AR overlay */}
      {isLiveView ? (
        <>
          {/* Centered directional arrow with drop shadow */}
          <div className="pointer-events-none fixed inset-0 z-10 flex items-center justify-center">
            <svg
              viewBox="0 0 48 48"
              className="h-[120px] w-[120px] text-white transition-transform duration-500 ease-out"
              style={{
                transform: `rotate(${rotation}deg)`,
                filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.8))',
              }}
            >
              <path
                d="M24 6l-9 18h6v12h6V24h6L24 6z"
                fill="currentColor"
              />
            </svg>
          </div>

          {/* Frosted glass info card at bottom */}
          <div
            className="fixed bottom-0 left-0 right-0 z-10 px-4 pb-6 pt-6"
            style={{
              backdropFilter: 'blur(12px)',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
            }}
          >
            <div className="space-y-3 text-center">
              <p className="text-2xl font-bold tracking-tight text-[var(--color-text)]">
                {currentStep?.instruction || 'Getting your next step…'}
              </p>
              <p className="text-sm text-slate-600">
                You&apos;ll arrive in {timeRemaining}
              </p>

              {/* Progress bar */}
              <div className="mx-auto w-full max-w-xs">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-300">
                  <div
                    className="h-full rounded-full bg-[var(--color-success)] transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Next step button */}
              {currentStepIndex < steps.length - 1 && (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="mx-auto mt-2 rounded-full bg-[var(--color-success)] px-6 py-2 text-sm font-semibold text-white shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-300"
                >
                  Next step
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        /* Map view (original layout) */
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
                  className="h-16 w-16 text-[var(--color-success)] transition-transform duration-500 ease-out"
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
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-[var(--color-success)] animate-pulse"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

