// CobilityContext: shared route and navigation state
import { createContext, useContext, useState } from 'react';

const CobilityContext = createContext(null);

// Mock journey steps used by both Plan Mode and Go Mode
const MOCK_STEPS = [
  {
    id: 1,
    kind: 'walk',
    icon: 'walk',
    instruction: 'Walk to the main bus stop',
    distance: '120 m',
    duration: '2 min',
    direction: 'straight',
    progress: 10,
    eta: '24 min',
    location: { lat: 51.5074, lng: -0.1278 },
    heading: 90,
  },
  {
    id: 2,
    kind: 'bus',
    icon: 'bus',
    instruction: 'Take bus 24 towards Central Station',
    distance: '3.2 km',
    duration: '10 min',
    direction: 'straight',
    progress: 35,
    eta: '22 min',
    location: { lat: 51.509, lng: -0.135 },
    heading: 0,
  },
  {
    id: 3,
    kind: 'walk',
    icon: 'walk',
    instruction: 'Walk to the train platform',
    distance: '80 m',
    duration: '1 min',
    direction: 'right',
    progress: 50,
    eta: '12 min',
    location: { lat: 51.5033, lng: -0.1196 },
    heading: 45,
  },
  {
    id: 4,
    kind: 'train',
    icon: 'train',
    instruction: 'Take the train 2 stops',
    distance: '6.5 km',
    duration: '8 min',
    direction: 'straight',
    progress: 80,
    eta: '6 min',
    location: { lat: 51.515, lng: -0.09 },
    heading: 0,
  },
  {
    id: 5,
    kind: 'walk',
    icon: 'walk',
    instruction: 'Walk to your destination',
    distance: '250 m',
    duration: '4 min',
    direction: 'left',
    progress: 100,
    eta: '0 min',
    location: { lat: 51.52, lng: -0.08 },
    heading: -90,
  },
];

export function CobilityProvider({ children }) {
  // Current route / plan details
  const [currentRoute, setCurrentRoute] = useState({
    start: '',
    destination: '',
    name: 'Morning commute',
  });

  // Shared navigation steps
  const [steps, setSteps] = useState(MOCK_STEPS);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const resetNavigation = () => setCurrentStepIndex(0);

  const setStepsFromDirections = (nextSteps) => {
    if (!Array.isArray(nextSteps) || nextSteps.length === 0) return;
    setSteps(nextSteps);
    setCurrentStepIndex(0);
  };

  const value = {
    currentRoute,
    setCurrentRoute,
    steps,
    currentStepIndex,
    setCurrentStepIndex,
    setStepsFromDirections,
    resetNavigation,
  };

  return (
    <CobilityContext.Provider value={value}>{children}</CobilityContext.Provider>
  );
}

export function useCobility() {
  const ctx = useContext(CobilityContext);
  if (!ctx) {
    throw new Error('useCobility must be used within a CobilityProvider');
  }
  return ctx;
}

