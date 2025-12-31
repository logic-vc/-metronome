import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TempoDisplay } from './TempoDisplay'
import { useMetronomeStore } from '@/store/metronomeStore'

describe('TempoDisplay', () => {
  beforeEach(() => {
    useMetronomeStore.setState({ bpm: 120 })
  })

  describe('when rendered', () => {
    it('should display the BPM value', () => {
      render(<TempoDisplay />)
      expect(screen.getByTestId('tempo-bpm')).toHaveTextContent('120')
    })

    it('should display the tempo name', () => {
      render(<TempoDisplay />)
      expect(screen.getByTestId('tempo-name')).toHaveTextContent('Allegro')
    })
  })

  describe('tempo names for different BPM values', () => {
    it('should display "Largo" for BPM 50', () => {
      useMetronomeStore.setState({ bpm: 50 })
      render(<TempoDisplay />)
      expect(screen.getByTestId('tempo-name')).toHaveTextContent('Largo')
    })

    it('should display "Adagio" for BPM 70', () => {
      useMetronomeStore.setState({ bpm: 70 })
      render(<TempoDisplay />)
      expect(screen.getByTestId('tempo-name')).toHaveTextContent('Adagio')
    })

    it('should display "Andante" for BPM 90', () => {
      useMetronomeStore.setState({ bpm: 90 })
      render(<TempoDisplay />)
      expect(screen.getByTestId('tempo-name')).toHaveTextContent('Andante')
    })

    it('should display "Moderato" for BPM 110', () => {
      useMetronomeStore.setState({ bpm: 110 })
      render(<TempoDisplay />)
      expect(screen.getByTestId('tempo-name')).toHaveTextContent('Moderato')
    })

    it('should display "Presto" for BPM 180', () => {
      useMetronomeStore.setState({ bpm: 180 })
      render(<TempoDisplay />)
      expect(screen.getByTestId('tempo-name')).toHaveTextContent('Presto')
    })

    it('should display "Prestissimo" for BPM 220', () => {
      useMetronomeStore.setState({ bpm: 220 })
      render(<TempoDisplay />)
      expect(screen.getByTestId('tempo-name')).toHaveTextContent('Prestissimo')
    })
  })

  describe('accessibility', () => {
    it('should have proper heading structure', () => {
      render(<TempoDisplay />)
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    })
  })
})
