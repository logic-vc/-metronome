/**
 * AudioEngine - Web Audio API based sound generation
 * Generates click and wood block sounds using oscillators and noise
 */

export type SoundType = 'click' | 'wood'

export class AudioEngine {
  private context: AudioContext | null = null
  private masterGain: GainNode | null = null
  private soundType: SoundType = 'click'
  private volume: number = 1
  private disposed: boolean = false
  private initialized: boolean = false

  constructor() {
    // Don't initialize AudioContext in constructor - wait for user interaction
  }

  private initContext(): void {
    if (this.disposed || this.initialized) return

    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioContextClass) {
        console.warn('Web Audio API not supported')
        return
      }
      this.context = new AudioContextClass()
      this.masterGain = this.context.createGain()
      this.masterGain.connect(this.context.destination)
      this.masterGain.gain.value = this.volume
      this.initialized = true
    } catch (e) {
      console.warn('Failed to initialize AudioContext:', e)
    }
  }

  /**
   * Get the AudioContext
   */
  getContext(): AudioContext | null {
    return this.context
  }

  /**
   * Resume the AudioContext (required after user interaction)
   * This also initializes the context if not already done
   */
  async resume(): Promise<void> {
    // Initialize context on first user interaction
    if (!this.initialized) {
      this.initContext()
    }

    if (this.context?.state === 'suspended') {
      await this.context.resume()
    }
  }

  /**
   * Check if AudioEngine is ready to play sounds
   */
  isReady(): boolean {
    return this.context?.state === 'running'
  }

  /**
   * Get list of supported sound types
   */
  getSupportedSoundTypes(): SoundType[] {
    return ['click', 'wood']
  }

  /**
   * Set the current sound type
   */
  setSoundType(type: SoundType): void {
    this.soundType = type
  }

  /**
   * Get the current sound type
   */
  getCurrentSoundType(): SoundType {
    return this.soundType
  }

  /**
   * Get current volume level
   */
  getVolume(): number {
    return this.volume
  }

  /**
   * Set volume level (0-1)
   */
  setVolume(level: number): void {
    this.volume = Math.max(0, Math.min(1, level))
    if (this.masterGain) {
      this.masterGain.gain.value = this.volume
    }
  }

  /**
   * Play a click sound
   * @param accent - Whether this is an accented beat (louder)
   */
  playClick(accent: boolean = false): void {
    if (!this.context || !this.masterGain || this.disposed) return

    const now = this.context.currentTime
    const accentMultiplier = accent ? 1.5 : 1

    if (this.soundType === 'click') {
      this.playClickSound(now, accentMultiplier)
    } else {
      this.playWoodSound(now, accentMultiplier)
    }
  }

  /**
   * Generate a sharp click sound using oscillator
   */
  private playClickSound(time: number, accentMultiplier: number): void {
    if (!this.context || !this.masterGain) return

    const isAccent = accentMultiplier > 1
    const osc = this.context.createOscillator()
    const gain = this.context.createGain()

    // Higher frequency for accent click
    osc.type = 'sine'
    osc.frequency.setValueAtTime(isAccent ? 1000 : 800, time)

    // Quick envelope for sharp attack
    gain.gain.setValueAtTime(0.5 * accentMultiplier, time)
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05)

    osc.connect(gain)
    gain.connect(this.masterGain)

    osc.start(time)
    osc.stop(time + 0.05)

    // Cleanup
    osc.onended = () => {
      osc.disconnect()
      gain.disconnect()
    }
  }

  /**
   * Generate a wood block sound using filtered noise
   */
  private playWoodSound(time: number, accentMultiplier: number): void {
    if (!this.context || !this.masterGain) return

    const isAccent = accentMultiplier > 1

    // Create a short burst of filtered noise for wood block effect
    const osc = this.context.createOscillator()
    const osc2 = this.context.createOscillator()
    const gain = this.context.createGain()
    const filter = this.context.createBiquadFilter()

    // Two detuned oscillators for richer sound
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(isAccent ? 700 : 600, time)

    osc2.type = 'triangle'
    osc2.frequency.setValueAtTime(isAccent ? 1400 : 1200, time)

    // Bandpass filter for wood-like resonance
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(1000, time)
    filter.Q.value = 2

    // Quick decay envelope
    gain.gain.setValueAtTime(0.4 * accentMultiplier, time)
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.08)

    osc.connect(filter)
    osc2.connect(filter)
    filter.connect(gain)
    gain.connect(this.masterGain)

    osc.start(time)
    osc2.start(time)
    osc.stop(time + 0.08)
    osc2.stop(time + 0.08)

    // Cleanup
    osc.onended = () => {
      osc.disconnect()
      osc2.disconnect()
      filter.disconnect()
      gain.disconnect()
    }
  }

  /**
   * Dispose of the audio engine and release resources
   */
  dispose(): void {
    this.disposed = true
    if (this.context && this.context.state !== 'closed') {
      this.context.close()
    }
    this.context = null
    this.masterGain = null
  }
}
