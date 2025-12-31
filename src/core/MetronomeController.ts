/**
 * MetronomeController - Orchestrates timing and audio engines
 * Connects to the Zustand store for state management
 */

import { TimingEngine } from './timing/TimingEngine'
import { AudioEngine } from './audio/AudioEngine'
import { useMetronomeStore, type TimeSignature } from '@/store/metronomeStore'
import { getSubdivisionMultiplier } from './utils/subdivision'

// Time signature to beats per measure mapping
const TIME_SIGNATURE_BEATS: Record<TimeSignature, number> = {
  '2/4': 2,
  '3/4': 3,
  '4/4': 4,
  '5/4': 5,
  '6/8': 6,
  '7/8': 7,
  '9/8': 9,
  '12/8': 12,
}

class MetronomeControllerClass {
  private timingEngine: TimingEngine
  private audioEngine: AudioEngine
  private currentBeat: number = 0
  private currentSubBeat: number = 0
  private unsubscribe: (() => void) | null = null

  constructor() {
    this.timingEngine = new TimingEngine()
    this.audioEngine = new AudioEngine()
  }

  /**
   * Initialize the controller and subscribe to store changes
   */
  init(): void {
    // Subscribe to store changes
    this.unsubscribe = useMetronomeStore.subscribe((state, prevState) => {
      // Handle isPlaying changes
      if (state.isPlaying !== prevState.isPlaying) {
        if (state.isPlaying) {
          this.startInternal()
        } else {
          this.stopInternal()
        }
      }

      // Handle BPM changes while playing
      if (state.isPlaying && state.bpm !== prevState.bpm) {
        const multiplier = getSubdivisionMultiplier(state.subdivision)
        this.timingEngine.setBpm(state.bpm * multiplier)
      }

      // Handle subdivision changes while playing
      if (state.isPlaying && state.subdivision !== prevState.subdivision) {
        const multiplier = getSubdivisionMultiplier(state.subdivision)
        this.timingEngine.setBpm(state.bpm * multiplier)
        this.currentSubBeat = 0
      }

      // Handle sound type changes
      if (state.soundType !== prevState.soundType) {
        this.audioEngine.setSoundType(state.soundType)
      }
    })
  }

  /**
   * Start the metronome
   */
  async start(): Promise<void> {
    await this.audioEngine.resume()
    useMetronomeStore.getState().togglePlay()
  }

  private startInternal(): void {
    const { bpm, timeSignature, subdivision, accentEnabled } = useMetronomeStore.getState()
    const beatsPerMeasure = TIME_SIGNATURE_BEATS[timeSignature]
    const multiplier = getSubdivisionMultiplier(subdivision)
    const effectiveBpm = bpm * multiplier

    this.currentBeat = 0
    this.currentSubBeat = 0

    this.timingEngine.start(effectiveBpm, () => {
      // Check if this is a main beat (not a subdivision)
      const isMainBeat = this.currentSubBeat === 0
      // Accent only on first beat of measure AND first sub-beat
      const isAccent = accentEnabled && this.currentBeat === 0 && isMainBeat

      // Play click - main beats are louder than subdivisions
      if (isMainBeat) {
        this.audioEngine.playClick(isAccent)
        // Update store with current beat (only on main beats)
        useMetronomeStore.getState().setCurrentBeat(this.currentBeat)
      } else {
        // Subdivision click (softer)
        this.audioEngine.playClick(false)
      }

      // Advance sub-beat counter
      this.currentSubBeat = (this.currentSubBeat + 1) % multiplier

      // Advance main beat counter when sub-beats complete
      if (this.currentSubBeat === 0) {
        this.currentBeat = (this.currentBeat + 1) % beatsPerMeasure
      }
    })
  }

  /**
   * Stop the metronome
   */
  stop(): void {
    if (useMetronomeStore.getState().isPlaying) {
      useMetronomeStore.getState().togglePlay()
    }
  }

  private stopInternal(): void {
    this.timingEngine.stop()
    this.currentBeat = 0
    this.currentSubBeat = 0
  }

  /**
   * Toggle play/stop
   */
  async toggle(): Promise<void> {
    if (useMetronomeStore.getState().isPlaying) {
      this.stop()
    } else {
      await this.start()
    }
  }

  /**
   * Check if metronome is currently running
   */
  isRunning(): boolean {
    return this.timingEngine.isRunning()
  }

  /**
   * Resume audio context (required after user interaction)
   */
  async resumeAudio(): Promise<void> {
    await this.audioEngine.resume()
  }

  /**
   * Check if audio is ready
   */
  isAudioReady(): boolean {
    return this.audioEngine.isReady()
  }

  /**
   * Cleanup and dispose resources
   */
  dispose(): void {
    this.stopInternal()
    this.audioEngine.dispose()
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }
}

// Export singleton instance
export const metronomeController = new MetronomeControllerClass()

// Initialize on first import (will be lazy loaded)
if (typeof window !== 'undefined') {
  try {
    metronomeController.init()
  } catch (e) {
    console.error('Failed to initialize MetronomeController:', e)
  }
}
