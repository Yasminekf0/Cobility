// App: top-level router and layout shell
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CobilityProvider } from './context/CobilityContext.jsx';
import ModeSelector from './components/ModeSelector.jsx';
import PlanMode from './pages/PlanMode.jsx';
import GoMode from './pages/GoMode.jsx';
import JourneyView from './pages/JourneyView.jsx';

function App() {
  return (
    <CobilityProvider>
      <BrowserRouter>
        <div className="cobility-shell">
          <div className="cobility-shell-inner flex flex-col">
            <Routes>
              <Route path="/" element={<ModeSelector />} />
              <Route path="/plan" element={<PlanMode />} />
              <Route path="/go" element={<GoMode />} />
              <Route path="/journey" element={<JourneyView />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </CobilityProvider>
  );
}

export default App;

