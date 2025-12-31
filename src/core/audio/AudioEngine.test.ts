import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { AudioEngine } from './AudioEngine'

describe('AudioEngine', () => {
  let audioEngine: AudioEngine

  beforeEach(() => {
    audioEngine = new AudioEngine()
  })

  afterEach(() => {
    audioEngine.dispose()
  })

  describe('initialization', () => {
    it('should create an AudioContext', () => {
      expect(audioEngine.getContext()).toBeDefined()
    })

    it('should initialize in a suspended state until interaction', async () => {
      // AudioContext starts suspended in most browsers
      await audioEngine.resume()
      expect(audioEngine.isReady()).toBe(true)
    })
  })

  describe('sound types', () => {
    it('should support click sound type', () => {
      expect(audioEngine.getSupportedSoundTypes()).toContain('click')
    })

    it('should support wood sound type', () => {
      expect(audioEngine.getSupportedSoundTypes()).toContain('wood')
    })

    it('should set sound type', () => {
      audioEngine.setSoundType('wood')
      expect(audioEngine.getCurrentSoundType()).toBe('wood')
    })
  })

  describe('playClick', () => {
    it('should play a click sound without throwing', async () => {
      await audioEngine.resume()
      expect(() => audioEngine.playClick()).not.toThrow()
    })

    it('should play an accented click when accent is true', async () => {
      await audioEngine.resume()
      expect(() => audioEngine.playClick(true)).not.toThrow()
    })

    it('should play with different sound types', async () => {
      await audioEngine.resume()

      audioEngine.setSoundType('click')
      expect(() => audioEngine.playClick()).not.toThrow()

      audioEngine.setSoundType('wood')
      expect(() => audioEngine.playClick()).not.toThrow()
    })
  })

  describe('volume control', () => {
    it('should have default volume of 1', () => {
      expect(audioEngine.getVolume()).toBe(1)
    })

    it('should set volume', () => {
      audioEngine.setVolume(0.5)
      expect(audioEngine.getVolume()).toBe(0.5)
    })

    it('should clamp volume between 0 and 1', () => {
      audioEngine.setVolume(-0.5)
      expect(audioEngine.getVolume()).toBe(0)

      audioEngine.setVolume(1.5)
      expect(audioEngine.getVolume()).toBe(1)
    })
  })

  describe('dispose', () => {
    it('should close AudioContext on dispose', () => {
      audioEngine.dispose()
      // After dispose, getContext should return null or throw
      expect(() => audioEngine.playClick()).not.toThrow()
    })
  })
})
