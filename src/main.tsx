import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// ── Capacitor native bridge (iOS / Android only) ──────────────────────────────
async function initNative() {
  // Only run on real Capacitor runtime (not in Electron or browser)
  if (!(window as any).Capacitor?.isNativePlatform?.()) return;

  try {
    const { StatusBar, Style } = await import('@capacitor/status-bar');
    // Dark-style status bar (white icons) to match Checkora's dark theme
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.setBackgroundColor({ color: '#000000' });
  } catch {
    // Plugin not available (e.g. web build), silently skip
  }

  try {
    const { SplashScreen } = await import('@capacitor/splash-screen');
    await SplashScreen.hide({ fadeOutDuration: 300 });
  } catch {
    // Silently skip
  }
}

initNative();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
