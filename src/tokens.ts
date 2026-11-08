/* ═══════════════════════════════════════════════════════════
   DESIGN TOKENS — Centralized
   Premium editorial × BuildOS amber. Light surface, dark text.
   ═══════════════════════════════════════════════════════════ */

export const tokens = {
  colors: {
    bg: '#FFFFFF',
    bgSecondary: '#F5F5F2',
    surface: '#FFFFFF',
    surfaceElevated: '#F5F5F2',
    surfaceCard: '#FFFFFF',
    text: '#252A30',
    textSecondary: '#697078',
    textMuted: '#697078',
    border: 'rgba(0, 0, 0, 0.08)',
    borderStrong: 'rgba(0, 0, 0, 0.14)',
    accent: '#FFB800',
    accentDeep: '#E09B00',
    accentDim: 'rgba(255, 184, 0, 0.15)',
    accentSoft: 'rgba(255, 184, 0, 0.08)',
    success: '#FFB800',
  },
  fonts: {
    display: '"Space Grotesk", system-ui, sans-serif',
    body: '"Inter", system-ui, sans-serif',
    mono: '"JetBrains Mono", "Fira Code", monospace',
  },
  animation: {
    fast: 150,
    normal: 300,
    slow: 500,
    slower: 700,
  },
} as const
