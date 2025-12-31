import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  describe('when rendered', () => {
    it('should render the main layout with header', () => {
      render(<App />)
      expect(screen.getByText('Metronome')).toBeInTheDocument()
    })

    it('should render the BPM display', () => {
      render(<App />)
      expect(screen.getByTestId('tempo-bpm')).toBeInTheDocument()
    })

    it('should render the tempo name', () => {
      render(<App />)
      expect(screen.getByTestId('tempo-name')).toBeInTheDocument()
    })

    it('should render the beat display with 4 pads', () => {
      render(<App />)
      const beatDisplay = screen.getByTestId('beat-display')
      expect(beatDisplay).toBeInTheDocument()

      for (let i = 1; i <= 4; i++) {
        expect(screen.getByTestId(`beat-pad-${i}`)).toBeInTheDocument()
      }
    })

    it('should render the play button with accessible label', () => {
      render(<App />)
      const playButton = screen.getByTestId('play-button')
      expect(playButton).toBeInTheDocument()
      expect(playButton).toHaveAccessibleName('Start metronome')
    })

    it('should render the time signature display', () => {
      render(<App />)
      expect(screen.getByTestId('time-signature')).toBeInTheDocument()
      expect(screen.getByText('4/4')).toBeInTheDocument()
    })

    it('should render the subdivision display', () => {
      render(<App />)
      expect(screen.getByTestId('subdivision')).toBeInTheDocument()
      expect(screen.getByText('quarter')).toBeInTheDocument()
    })

    it('should render the footer', () => {
      render(<App />)
      expect(screen.getByText('Practice with precision')).toBeInTheDocument()
    })
  })
})
