import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import { App } from './app/App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('No se encontró el elemento #root en el documento.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
