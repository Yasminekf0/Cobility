import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { CobilityProvider, useCobility } from './context/CobilityContext';
import ModeSelector from './components/ModeSelector';
import PlanMode from './pages/PlanMode';
import GoMode from './pages/GoMode';
import JourneyView from './pages/JourneyView';

function AppContent() {
  const { isGrayscale } = useCobility();

  useEffect(() => {
    if (isGrayscale) {
      document.documentElement.style.filter = 'grayscale(1)';
    } else {
      document.documentElement.style.filter = 'none';
    }
  }, [isGrayscale]);

  return (
    <div style={{minHeight:'100vh',background:'#0d1117'}}>
      <Routes>
        <Route path="/" element={<ModeSelector />} />
        <Route path="/plan" element={<PlanMode />} />
        <Route path="/go" element={<GoMode />} />
        <Route path="/journey" element={<JourneyView />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <CobilityProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </CobilityProvider>
  );
}
export default App;
