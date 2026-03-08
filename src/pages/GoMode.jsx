// GoMode: ultra-minimalist real-time guidance screen
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Camera, Headphones } from 'lucide-react';
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
    <div className="relative flex min-h-screen flex-col bg-transparent text-white">
      {/* Camera feed */}
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

      {/* top instruction card */}
      <div className="absolute top-4 left-4 right-4 z-20 rounded-[20px] bg-[rgba(20,30,50,0.75)] backdrop-blur-[12px] p-4 flex items-center gap-4">
        <svg
          viewBox="0 0 48 48"
          className="h-[40px] w-[40px] text-white"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <path
            d="M24 6l-9 18h6v12h6V24h6L24 6z"
            fill="currentColor"
          />
        </svg>
        <div className="flex-1">
          <p className="text-xs text-gray-400">Philip De Langes Allé 10</p>
          <p className="text-[32px] font-bold">15 m</p>
        </div>
      </div>

      {/* centered arrow + distance */}
      <div className="pointer-events-none fixed inset-0 z-10 flex items-center justify-center">
        <svg
          viewBox="0 0 48 48"
          className="h-[100px] w-[100px] text-white transition-transform duration-500 ease-out"
          style={{
            transform: `rotate(${rotation}deg)`,
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))',
          }}
        >
          <path d="M24 6l-9 18h6v12h6V24h6L24 6z" fill="currentColor" />
        </svg>
        <span className="absolute bottom-[calc(50%-50px)] right-1/2 translate-x-1/2 text-[24px] font-bold text-white">
          15m
        </span>
      </div>

      {/* sparkle button */}
      <button
        type="button"
        className="absolute right-4 bottom-[120px] flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[rgba(20,30,50,0.75)] text-white"
      >
        ✦
      </button>

      {/* bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center gap-3 bg-[rgba(10,15,30,0.85)] backdrop-blur-[16px] rounded-t-[24px] p-4">
        <button
          type="button"
          className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#2a3a4a] text-white"
        >
          <X className="h-6 w-6" />
        </button>
        <div className="flex-1 rounded-[50px] bg-[#2a3a4a] px-4 py-3">
          <p className="font-bold">Restaurant</p>
          <p className="text-xs text-gray-400">5:00&nbsp;&nbsp;Philip De Langes Allé 10</p>
        </div>
        <button
          type="button"
          className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#2a3a4a] text-white"
        >
          <Headphones className="h-6 w-6" />
        </button>
      </div>

      {/* map view placeholder if not live */}
      {!isLiveView && (
        <div className="absolute inset-0 bg-slate-800 flex items-center justify-center text-xs text-slate-500">
          Map preview (add VITE_GOOGLE_MAPS_KEY to enable)
        </div>
      )}
    </div>
  );
}

