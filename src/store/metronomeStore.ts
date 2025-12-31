import { create } from 'zustand'
import { clampBpm, BPM_DEFAULT } from '@/core/utils/bpm'

export type TimeSignature = '2/4' | '3/4' | '4/4' | '5/4' | '6/8' | '7/8' | '9/8' | '12/8'
export type Subdivision = 'half' | 'quarter' | 'eighth' | 'sixteenth'
export type SoundType = 'click' | 'wood'

interface MetronomeState {
  // Core state
  bpm: number
  isPlaying: boolean
  timeSignature: TimeSignature
  subdivision: Subdivision
  soundType: SoundType
  currentBeat: number
  accentEnabled: boolean

  // Actions
  setBpm: (bpm: number) => void
  incrementBpm: (step?: number) => void
  decrementBpm: (step?: number) => void
  togglePlay: () => void
  setTimeSignature: (timeSignature: TimeSignature) => void
  setSubdivision: (subdivision: Subdivision) => void
  setSoundType: (soundType: SoundType) => void
  setCurrentBeat: (beat: number) => void
  toggleAccent: () => void
}

export const useMetronomeStore = create<MetronomeState>((set) => ({
  // Initial state
  bpm: BPM_DEFAULT,
  isPlaying: false,
  timeSignature: '4/4',
  subdivision: 'quarter',
  soundType: 'click',
  currentBeat: 0,
  accentEnabled: true,

  // Actions
  setBpm: (bpm) =>
    set(() => ({
      bpm: clampBpm(bpm),
    })),

  incrementBpm: (step = 1) =>
    set((state) => ({
      bpm: clampBpm(state.bpm + step),
    })),

  decrementBpm: (step = 1) =>
    set((state) => ({
      bpm: clampBpm(state.bpm - step),
    })),

  togglePlay: () =>
    set((state) => ({
      isPlaying: !state.isPlaying,
      currentBeat: state.isPlaying ? state.currentBeat : 0,
    })),

  setTimeSignature: (timeSignature) =>
    set(() => ({
      timeSignature,
      currentBeat: 0,
    })),

  setSubdivision: (subdivision) =>
    set(() => ({
      subdivision,
    })),

  setSoundType: (soundType) =>
    set(() => ({
      soundType,
    })),

  setCurrentBeat: (currentBeat) =>
    set(() => ({
      currentBeat,
    })),

  toggleAccent: () =>
    set((state) => ({
      accentEnabled: !state.accentEnabled,
    })),
}))

// Selector hooks for common use cases
export const useBpm = () => useMetronomeStore((state) => state.bpm)
export const useIsPlaying = () => useMetronomeStore((state) => state.isPlaying)
export const useTimeSignature = () => useMetronomeStore((state) => state.timeSignature)
export const useSubdivision = () => useMetronomeStore((state) => state.subdivision)
export const useSoundType = () => useMetronomeStore((state) => state.soundType)
export const useCurrentBeat = () => useMetronomeStore((state) => state.currentBeat)
export const useAccentEnabled = () => useMetronomeStore((state) => state.accentEnabled)
