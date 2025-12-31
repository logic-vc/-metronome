/**
 * TimingEngine - Handles precise metronome timing using setInterval
 * For web audio, we'll use a lookahead scheduler for better accuracy
 */

export type BeatCallback = () => void

export class TimingEngine {
  private intervalId: ReturnType<typeof setInterval> | null = null
  private bpm: number = 120
  private callback: BeatCallback | null = null
  private running: boolean = false

  /**
   * Calculate interval in milliseconds for a given BPM
   */
  calculateIntervalMs(bpm: number): number {
    return (60 / bpm) * 1000
  }

  /**
   * Check if the timing engine is currently running
   */
  isRunning(): boolean {
    return this.running
  }

  /**
   * Start the timing engine with the specified BPM
   * @param bpm - Beats per minute
   * @param callback - Function to call on each beat
   */
  start(bpm: number, callback: BeatCallback): void {
    this.stop() // Stop any existing timer

    this.bpm = bpm
    this.callback = callback
    this.running = true

    const intervalMs = this.calculateIntervalMs(bpm)

    this.intervalId = setInterval(() => {
      if (this.callback && this.running) {
        this.callback()
      }
    }, intervalMs)
  }

  /**
   * Stop the timing engine
   */
  stop(): void {
    this.running = false

    if (this.intervalId !== null) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }

  /**
   * Update the BPM while running
   * @param bpm - New BPM value
   */
  setBpm(bpm: number): void {
    if (!this.running || !this.callback) return

    this.bpm = bpm
    // Restart with new BPM
    this.start(bpm, this.callback)
  }

  /**
   * Get current BPM
   */
  getBpm(): number {
    return this.bpm
  }
}
