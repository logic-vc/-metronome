import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BPMControl } from './BPMControl'
import { useMetronomeStore } from '@/store/metronomeStore'

describe('BPMControl', () => {
  beforeEach(() => {
    useMetronomeStore.setState({ bpm: 120 })
  })

  describe('when rendered', () => {
    it('should display the current BPM', () => {
      render(<BPMControl />)
      expect(screen.getByTestId('bpm-value')).toHaveTextContent('120')
    })

    it('should display increment and decrement buttons', () => {
      render(<BPMControl />)
      expect(screen.getByTestId('bpm-increment')).toBeInTheDocument()
      expect(screen.getByTestId('bpm-decrement')).toBeInTheDocument()
    })

    it('should have an input field for direct BPM entry', () => {
      render(<BPMControl />)
      expect(screen.getByTestId('bpm-input')).toBeInTheDocument()
    })
  })

  describe('when increment button is clicked', () => {
    it('should increase BPM by 1', async () => {
      render(<BPMControl />)
      const incrementBtn = screen.getByTestId('bpm-increment')

      await userEvent.click(incrementBtn)

      expect(useMetronomeStore.getState().bpm).toBe(121)
    })

    it('should increase BPM by 5 when holding shift', () => {
      render(<BPMControl />)
      const incrementBtn = screen.getByTestId('bpm-increment')

      // Use fireEvent with shiftKey for modifier key testing
      fireEvent.click(incrementBtn, { shiftKey: true })

      expect(useMetronomeStore.getState().bpm).toBe(125)
    })
  })

  describe('when decrement button is clicked', () => {
    it('should decrease BPM by 1', async () => {
      render(<BPMControl />)
      const decrementBtn = screen.getByTestId('bpm-decrement')

      await userEvent.click(decrementBtn)

      expect(useMetronomeStore.getState().bpm).toBe(119)
    })

    it('should decrease BPM by 5 when holding shift', () => {
      render(<BPMControl />)
      const decrementBtn = screen.getByTestId('bpm-decrement')

      // Use fireEvent with shiftKey for modifier key testing
      fireEvent.click(decrementBtn, { shiftKey: true })

      expect(useMetronomeStore.getState().bpm).toBe(115)
    })
  })

  describe('when BPM input is changed', () => {
    it('should update BPM on blur', async () => {
      render(<BPMControl />)
      const input = screen.getByTestId('bpm-input')

      await userEvent.clear(input)
      await userEvent.type(input, '100')
      fireEvent.blur(input)

      expect(useMetronomeStore.getState().bpm).toBe(100)
    })

    it('should update BPM on Enter key', async () => {
      render(<BPMControl />)
      const input = screen.getByTestId('bpm-input')

      await userEvent.clear(input)
      await userEvent.type(input, '150{Enter}')

      expect(useMetronomeStore.getState().bpm).toBe(150)
    })

    it('should clamp BPM to minimum on invalid low value', async () => {
      render(<BPMControl />)
      const input = screen.getByTestId('bpm-input')

      await userEvent.clear(input)
      await userEvent.type(input, '10{Enter}')

      expect(useMetronomeStore.getState().bpm).toBe(40)
    })

    it('should clamp BPM to maximum on invalid high value', async () => {
      render(<BPMControl />)
      const input = screen.getByTestId('bpm-input')

      await userEvent.clear(input)
      await userEvent.type(input, '500{Enter}')

      expect(useMetronomeStore.getState().bpm).toBe(300)
    })
  })

  describe('accessibility', () => {
    it('should have accessible labels for buttons', () => {
      render(<BPMControl />)
      expect(screen.getByTestId('bpm-increment')).toHaveAccessibleName(/increase/i)
      expect(screen.getByTestId('bpm-decrement')).toHaveAccessibleName(/decrease/i)
    })

    it('should have accessible label for input', () => {
      render(<BPMControl />)
      expect(screen.getByTestId('bpm-input')).toHaveAccessibleName(/bpm/i)
    })
  })
})
