/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
  // background: removed old neutral backgrounds
      background: {
        100: '#ffffff', // harmonious lightest background
        95: '#f1f1f1',  // harmonious card background
        90: '#eeeeee',  // harmonious subtle card/section
    },
    text: {
      5: '#1E293B',   // heading/main text
      30: '#475569',  // muted/secondary text
    },
    primary: '#5D839A',      // medium professional blue - professional, not too dark, engaging, approachable
    secondary: '#7c3aed',    // purple-500
    accent: '#06b6d4',       // teal-400
    success: '#22c55e',      // green-500
    warning: '#f59e42',      // orange-400
    error: '#ef4444',        // red-500
    card: '#ffffff',         // card surface
    border: '#e5e7eb',       // border gray-200
    shadow: 'rgba(15,23,42,0.07)',
    tint: '#2563eb',
    icon: '#2563eb',
    tabIconDefault: '#64748b',
    tabIconSelected: '#2563eb',
  },
  dark: {
  // background: removed old neutral backgrounds
      background: {
        0: 'hsl(220, 8%, 12%)',   // harmonious main dark bg
        5: 'hsl(220, 8%, 16%)',   // harmonious card bg
        10: 'hsl(220, 8%, 22%)',  // harmonious elevated bg
    },
    text: {
      95: '#f1f5f9',  // heading/main text
      70: '#94a3b8',  // muted/secondary text
    },
    primary: '#3b82f6',      // blue-500
    secondary: '#a78bfa',    // purple-400
    accent: '#22d3ee',       // teal-300
    success: '#4ade80',      // green-400
    warning: '#fbbf24',      // orange-300
    error: '#f87171',        // red-400
    card: '#23272f',         // card surface
    border: '#334155',       // border gray-700
    shadow: 'rgba(0,0,0,0.25)',
    tint: '#3b82f6',
    icon: '#f1f5f9',
    tabIconDefault: '#94a3b8',
    tabIconSelected: '#3b82f6',
  },
  neutral: {
    white: '#ffffff',
    black: '#18181b',
    gray5: '#f1f5f9',
    gray10: '#e5e7eb',
    gray30: '#d1d5db',
    gray70: '#64748b',
    gray90: '#334155',
    gray95: '#0f172a',
  },
};
