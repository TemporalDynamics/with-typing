import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { createAdaptersForSurface } from './adapters';
import './index.css';

// Detectar superficie y crear adapters apropiados
const { hostAdapter, eventEmitter } = createAdaptersForSurface();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App 
      standalone={false} 
      hostAdapter={hostAdapter}
      eventEmitter={eventEmitter}
    />
  </StrictMode>,
);
