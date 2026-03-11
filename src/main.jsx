import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/tokens.css';
import './styles/ripple.css';
import './index.css';
import App from './App.jsx';
import ClickIndicator from './components/ClickIndicator.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ClickIndicator />
  </StrictMode>,
);
