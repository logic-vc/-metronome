import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TimeSignatureSelector } from './TimeSignatureSelector'
import { useMetronomeStore } from '@/store/metronomeStore'

describe('TimeSignatureSelector', () => {
  beforeEach(() => {
    useMetronomeStore.setState({ timeSignature: '4/4', currentBeat: 0 })
  })

  describe('when rendered', () => {
    it('should display all time signature options', () => {
      render(<TimeSignatureSelector />)

      const options = ['2/4', '3/4', '4/4', '5/4', '6/8', '7/8', '9/8', '12/8']
      for (const option of options) {
        expect(screen.getByTestId(`time-sig-${option}`)).toBeInTheDocument()
      }
    })

    it('should have the current time signature selected', () => {
      render(<TimeSignatureSelector />)

      const selectedButton = screen.getByTestId('time-sig-4/4')
      expect(selectedButton).toHaveAttribute('aria-checked', 'true')
    })

    it('should have an accessible radiogroup', () => {
      render(<TimeSignatureSelector />)
      expect(screen.getByRole('radiogroup')).toBeInTheDocument()
    })
  })

  describe('when selecting a different time signature', () => {
    it('should update the store with the new value', () => {
      render(<TimeSignatureSelector />)

      const option = screen.getByTestId('time-sig-3/4')
      fireEvent.click(option)

      expect(useMetronomeStore.getState().timeSignature).toBe('3/4')
    })

    it('should reset currentBeat to 0', () => {
      useMetronomeStore.setState({ currentBeat: 2 })
      render(<TimeSignatureSelector />)

      const option = screen.getByTestId('time-sig-6/8')
      fireEvent.click(option)

      expect(useMetronomeStore.getState().currentBeat).toBe(0)
    })

    it('should visually indicate the new selection', () => {
      render(<TimeSignatureSelector />)

      const option = screen.getByTestId('time-sig-5/4')
      fireEvent.click(option)

      expect(option).toHaveAttribute('aria-checked', 'true')
      expect(screen.getByTestId('time-sig-4/4')).toHaveAttribute('aria-checked', 'false')
    })
  })
})
