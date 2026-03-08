import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CobilityProvider } from './context/CobilityContext';
import ModeSelector from './components/ModeSelector';
import PlanMode from './pages/PlanMode';
import GoMode from './pages/GoMode';
import JourneyView from './pages/JourneyView';

function App() {
  return (
    <CobilityProvider>
      <BrowserRouter>
        <div style={{minHeight:'100vh',background:'#0d1117'}}>
          <Routes>
            <Route path="/" element={<ModeSelector />} />
            <Route path="/plan" element={<PlanMode />} />
            <Route path="/go" element={<GoMode />} />
            <Route path="/journey" element={<JourneyView />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CobilityProvider>
  );
}
export default App;
