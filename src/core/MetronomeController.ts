/**
 * MetronomeController - Orchestrates timing and audio engines
 * Connects to the Zustand store for state management
 */

import { TimingEngine } from './timing/TimingEngine'
import { AudioEngine } from './audio/AudioEngine'
import { useMetronomeStore, type TimeSignature } from '@/store/metronomeStore'

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
        this.timingEngine.setBpm(state.bpm)
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
    const { bpm, timeSignature, accentEnabled } = useMetronomeStore.getState()
    const beatsPerMeasure = TIME_SIGNATURE_BEATS[timeSignature]

    this.currentBeat = 0

    this.timingEngine.start(bpm, () => {
      const isAccent = accentEnabled && this.currentBeat === 0
      this.audioEngine.playClick(isAccent)

      // Update store with current beat
      useMetronomeStore.getState().setCurrentBeat(this.currentBeat)

      // Advance beat counter
      this.currentBeat = (this.currentBeat + 1) % beatsPerMeasure
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
  metronomeController.init()
}
