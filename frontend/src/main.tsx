import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

const container = document.getElementById('root');

// Prevent multiple root creation in development with HMR
if (!container._reactRoot) {
  const root = createRoot(container);
  container._reactRoot = root;
  
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  // In case of HMR, just re-render
  container._reactRoot.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}