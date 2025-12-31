import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { TimingEngine } from './TimingEngine'

describe('TimingEngine', () => {
  let timingEngine: TimingEngine

  beforeEach(() => {
    vi.useFakeTimers()
    timingEngine = new TimingEngine()
  })

  afterEach(() => {
    timingEngine.stop()
    vi.useRealTimers()
  })

  describe('interval calculation', () => {
    it('should calculate 1000ms interval for 60 BPM', () => {
      expect(timingEngine.calculateIntervalMs(60)).toBe(1000)
    })

    it('should calculate 500ms interval for 120 BPM', () => {
      expect(timingEngine.calculateIntervalMs(120)).toBe(500)
    })

    it('should calculate 250ms interval for 240 BPM', () => {
      expect(timingEngine.calculateIntervalMs(240)).toBe(250)
    })

    it('should handle decimal BPM values', () => {
      expect(timingEngine.calculateIntervalMs(100)).toBe(600)
    })
  })

  describe('start and stop', () => {
    it('should be stopped initially', () => {
      expect(timingEngine.isRunning()).toBe(false)
    })

    it('should be running after start', () => {
      timingEngine.start(120, () => {})
      expect(timingEngine.isRunning()).toBe(true)
    })

    it('should be stopped after stop', () => {
      timingEngine.start(120, () => {})
      timingEngine.stop()
      expect(timingEngine.isRunning()).toBe(false)
    })
  })

  describe('callback invocation', () => {
    it('should call callback on each beat', () => {
      const callback = vi.fn()
      timingEngine.start(120, callback) // 500ms per beat

      vi.advanceTimersByTime(500)
      expect(callback).toHaveBeenCalledTimes(1)

      vi.advanceTimersByTime(500)
      expect(callback).toHaveBeenCalledTimes(2)

      vi.advanceTimersByTime(500)
      expect(callback).toHaveBeenCalledTimes(3)
    })

    it('should not call callback after stop', () => {
      const callback = vi.fn()
      timingEngine.start(120, callback)

      vi.advanceTimersByTime(500)
      expect(callback).toHaveBeenCalledTimes(1)

      timingEngine.stop()

      vi.advanceTimersByTime(1000)
      expect(callback).toHaveBeenCalledTimes(1)
    })
  })

  describe('BPM update', () => {
    it('should update interval when BPM changes', () => {
      const callback = vi.fn()
      timingEngine.start(60, callback) // 1000ms per beat

      vi.advanceTimersByTime(1000)
      expect(callback).toHaveBeenCalledTimes(1)

      timingEngine.setBpm(120) // 500ms per beat

      vi.advanceTimersByTime(500)
      expect(callback).toHaveBeenCalledTimes(2)
    })
  })
})
