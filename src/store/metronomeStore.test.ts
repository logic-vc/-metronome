import { describe, it, expect, beforeEach } from 'vitest'
import { useMetronomeStore } from './metronomeStore'

describe('MetronomeStore', () => {
  beforeEach(() => {
    // Reset store to initial state before each test
    useMetronomeStore.setState({
      bpm: 120,
      isPlaying: false,
      timeSignature: '4/4',
      subdivision: 'quarter',
      soundType: 'click',
      currentBeat: 0,
      accentEnabled: true,
    })
  })

  describe('initial state', () => {
    it('should have default BPM of 120', () => {
      const { bpm } = useMetronomeStore.getState()
      expect(bpm).toBe(120)
    })

    it('should not be playing initially', () => {
      const { isPlaying } = useMetronomeStore.getState()
      expect(isPlaying).toBe(false)
    })

    it('should have 4/4 time signature by default', () => {
      const { timeSignature } = useMetronomeStore.getState()
      expect(timeSignature).toBe('4/4')
    })

    it('should have quarter subdivision by default', () => {
      const { subdivision } = useMetronomeStore.getState()
      expect(subdivision).toBe('quarter')
    })

    it('should have click sound type by default', () => {
      const { soundType } = useMetronomeStore.getState()
      expect(soundType).toBe('click')
    })

    it('should have accent enabled by default', () => {
      const { accentEnabled } = useMetronomeStore.getState()
      expect(accentEnabled).toBe(true)
    })
  })

  describe('setBpm', () => {
    it('should update BPM value', () => {
      useMetronomeStore.getState().setBpm(100)
      expect(useMetronomeStore.getState().bpm).toBe(100)
    })

    it('should clamp BPM to minimum value', () => {
      useMetronomeStore.getState().setBpm(10)
      expect(useMetronomeStore.getState().bpm).toBe(40)
    })

    it('should clamp BPM to maximum value', () => {
      useMetronomeStore.getState().setBpm(500)
      expect(useMetronomeStore.getState().bpm).toBe(300)
    })
  })

  describe('incrementBpm', () => {
    it('should increase BPM by default step (1)', () => {
      useMetronomeStore.setState({ bpm: 100 })
      useMetronomeStore.getState().incrementBpm()
      expect(useMetronomeStore.getState().bpm).toBe(101)
    })

    it('should increase BPM by specified step', () => {
      useMetronomeStore.setState({ bpm: 100 })
      useMetronomeStore.getState().incrementBpm(5)
      expect(useMetronomeStore.getState().bpm).toBe(105)
    })

    it('should not exceed maximum BPM', () => {
      useMetronomeStore.setState({ bpm: 299 })
      useMetronomeStore.getState().incrementBpm(5)
      expect(useMetronomeStore.getState().bpm).toBe(300)
    })
  })

  describe('decrementBpm', () => {
    it('should decrease BPM by default step (1)', () => {
      useMetronomeStore.setState({ bpm: 100 })
      useMetronomeStore.getState().decrementBpm()
      expect(useMetronomeStore.getState().bpm).toBe(99)
    })

    it('should decrease BPM by specified step', () => {
      useMetronomeStore.setState({ bpm: 100 })
      useMetronomeStore.getState().decrementBpm(5)
      expect(useMetronomeStore.getState().bpm).toBe(95)
    })

    it('should not go below minimum BPM', () => {
      useMetronomeStore.setState({ bpm: 42 })
      useMetronomeStore.getState().decrementBpm(5)
      expect(useMetronomeStore.getState().bpm).toBe(40)
    })
  })

  describe('togglePlay', () => {
    it('should toggle isPlaying from false to true', () => {
      useMetronomeStore.getState().togglePlay()
      expect(useMetronomeStore.getState().isPlaying).toBe(true)
    })

    it('should toggle isPlaying from true to false', () => {
      useMetronomeStore.setState({ isPlaying: true })
      useMetronomeStore.getState().togglePlay()
      expect(useMetronomeStore.getState().isPlaying).toBe(false)
    })

    it('should reset currentBeat when starting', () => {
      useMetronomeStore.setState({ isPlaying: false, currentBeat: 3 })
      useMetronomeStore.getState().togglePlay()
      expect(useMetronomeStore.getState().currentBeat).toBe(0)
    })
  })

  describe('setTimeSignature', () => {
    it('should update time signature', () => {
      useMetronomeStore.getState().setTimeSignature('3/4')
      expect(useMetronomeStore.getState().timeSignature).toBe('3/4')
    })

    it('should reset currentBeat when changing time signature', () => {
      useMetronomeStore.setState({ currentBeat: 2 })
      useMetronomeStore.getState().setTimeSignature('6/8')
      expect(useMetronomeStore.getState().currentBeat).toBe(0)
    })
  })

  describe('setSubdivision', () => {
    it('should update subdivision', () => {
      useMetronomeStore.getState().setSubdivision('eighth')
      expect(useMetronomeStore.getState().subdivision).toBe('eighth')
    })
  })

  describe('setSoundType', () => {
    it('should update sound type', () => {
      useMetronomeStore.getState().setSoundType('wood')
      expect(useMetronomeStore.getState().soundType).toBe('wood')
    })
  })

  describe('setCurrentBeat', () => {
    it('should update current beat', () => {
      useMetronomeStore.getState().setCurrentBeat(2)
      expect(useMetronomeStore.getState().currentBeat).toBe(2)
    })
  })

  describe('toggleAccent', () => {
    it('should toggle accent from true to false', () => {
      useMetronomeStore.getState().toggleAccent()
      expect(useMetronomeStore.getState().accentEnabled).toBe(false)
    })

    it('should toggle accent from false to true', () => {
      useMetronomeStore.setState({ accentEnabled: false })
      useMetronomeStore.getState().toggleAccent()
      expect(useMetronomeStore.getState().accentEnabled).toBe(true)
    })
  })
})
