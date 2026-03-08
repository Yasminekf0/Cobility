// RouteBuilder: start/destination inputs with large tappable result cards
import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { useCobility } from '../context/CobilityContext.jsx';

export default function RouteBuilder() {
  const { currentRoute, setCurrentRoute, setStepsFromDirections } = useCobility();
  const [start, setStart] = useState(currentRoute.start || '');
  const [destination, setDestination] = useState(currentRoute.destination || '');
  const [isLoadingDirections, setIsLoadingDirections] = useState(false);
  const [directionsError, setDirectionsError] = useState('');

  const hasInputs = start.trim() !== '' && destination.trim() !== '';

  const mapsKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;

  const parseDirectionsSteps = (route) => {
    const leg = route?.legs?.[0];
    if (!leg || !Array.isArray(leg.steps)) return null;

    const rawSteps = leg.steps;
    const totalSeconds = rawSteps.reduce(
      (sum, step) => sum + (step.duration?.value || 0),
      0,
    );

    let accumulated = 0;

    return rawSteps.map((step, index) => {
      const durationValue = step.duration?.value || 0;
      const etaSeconds = Math.max(totalSeconds - accumulated, 0);
      const etaMinutes = Math.round(etaSeconds / 60);
      accumulated += durationValue;

      const travelMode = (step.travel_mode || '').toUpperCase();
      let kind = 'walk';
      if (travelMode === 'TRANSIT') {
        const vehicleType =
          step.transit_details?.line?.vehicle?.type?.toUpperCase() || '';
        if (vehicleType.includes('BUS')) kind = 'bus';
        else kind = 'train';
      } else if (travelMode === 'DRIVING') {
        kind = 'bus';
      }

      const htmlInstruction = step.html_instructions || '';
      const instruction = htmlInstruction.replace(/<[^>]+>/g, '');

      const distanceText = step.distance?.text || '';
      const durationText = step.duration?.text || '';

      const maneuver = (step.maneuver || '').toLowerCase();
      let direction = 'straight';
      if (maneuver.includes('left')) direction = 'left';
      if (maneuver.includes('right')) direction = 'right';

      const location = {
        lat: step.start_location?.lat,
        lng: step.start_location?.lng,
      };

      return {
        id: index + 1,
        kind,
        icon: kind,
        instruction: instruction || 'Continue',
        distance: distanceText,
        duration: durationText,
        direction,
        progress:
          totalSeconds > 0
            ? Math.round((accumulated / totalSeconds) * 100)
            : 0,
        eta: `${etaMinutes} min`,
        location,
        heading: 0,
      };
    });
  };

  const fetchDirections = async (origin, destinationText) => {
    if (!mapsKey) {
      setDirectionsError(
        'Add VITE_GOOGLE_MAPS_KEY in your .env to load live directions.',
      );
      return;
    }

    try {
      setIsLoadingDirections(true);
      setDirectionsError('');

      const params = new URLSearchParams({
        origin,
        destination: destinationText,
        mode: 'transit',
        alternatives: 'false',
        key: mapsKey,
      });

      const res = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?${params.toString()}`,
      );

      if (!res.ok) {
        throw new Error('Network error');
      }

      const data = await res.json();
      if (data.status !== 'OK' || !Array.isArray(data.routes) || !data.routes[0]) {
        throw new Error(data.error_message || 'No route found');
      }

      const parsedSteps = parseDirectionsSteps(data.routes[0]);
      if (!parsedSteps || parsedSteps.length === 0) {
        throw new Error('Could not read route steps');
      }

      setStepsFromDirections(parsedSteps);
    } catch (err) {
      setDirectionsError(
        'We could not load live directions right now. Showing the sample route instead.',
      );
    } finally {
      setIsLoadingDirections(false);
    }
  };

  const handleSelectRoute = async (label) => {
    if (!hasInputs) return;
    setCurrentRoute({
      start,
      destination,
      name: label,
    });
    await fetchDirections(start.trim(), destination.trim());
  };

  const routes = hasInputs
    ? [
      {
        id: 'calm',
        label: 'Calmest route',
        subtitle: 'Fewer changes, more walking',
        duration: '26 min',
      },
      {
        id: 'fast',
        label: 'Fastest route',
        subtitle: 'May be a little busier',
        duration: '19 min',
      },
      {
        id: 'predictable',
        label: 'Most predictable',
        subtitle: 'Extra buffer time built in',
        duration: '32 min',
      },
    ]
    : [];

  return (
    <div className="space-y-3 card">
      {/* Inputs */}
      <div className="space-y-2">
        <label className="block text-xs font-medium text-[var(--color-text)]">
          Start
          <input
            type="text"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            placeholder="Home, school, or a saved place"
            className="mt-1 input-bar"
          />
        </label>

        <label className="block text-xs font-medium text-[var(--color-text)]">
          Destination
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="A place you want to go"
            className="mt-1 input-bar"
          />
        </label>
      </div>

      {/* Mock route results */}
      <div className="mt-2 space-y-2">
        {routes.length === 0 && (
          <p className="text-xs text-slate-500">
            Once you add a start and destination, Cobility will suggest simple,
            predictable routes.
          </p>
        )}

        {hasInputs && isLoadingDirections && (
          <p className="text-xs text-slate-500">
            Fetching a calm, real route for you…
          </p>
        )}

        {hasInputs && directionsError && (
          <p className="text-xs text-amber-600">{directionsError}</p>
        )}

        {routes.map((route) => {
          const isSelected = currentRoute.name === route.label;
          return (
            <button
              key={route.id}
              type="button"
              onClick={() => handleSelectRoute(route.label)}
              className={`flex w-full items-center justify-between card text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isSelected ? 'ring-2 ring-[var(--color-primary)]' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                    isSelected ? 'bg-[var(--color-primary)]' : 'bg-sky-50'
                  }`}
                >
                  <MapPin
                    className={`h-5 w-5 ${
                      isSelected ? 'text-white' : 'text-[var(--color-primary)]'
                    }`}
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{route.label}</p>
                  <p className="text-xs text-slate-300">
                    {route.subtitle}
                  </p>
                </div>
              </div>
              <p className="text-sm font-semibold text-white">
                {route.duration}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

