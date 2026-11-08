import { create } from 'zustand'

interface AppState {
  isLoaded: boolean
  activeSection: string
  scrollProgress: number
  setLoaded: (v: boolean) => void
  setActiveSection: (s: string) => void
  setScrollProgress: (p: number) => void
}

export const useStore = create<AppState>((set) => ({
  isLoaded: false,
  activeSection: 'hero',
  scrollProgress: 0,
  setLoaded: (v) => set({ isLoaded: v }),
  setActiveSection: (s) => set({ activeSection: s }),
  setScrollProgress: (p) => set({ scrollProgress: p }),
}))
