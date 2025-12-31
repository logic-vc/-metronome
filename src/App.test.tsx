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

    it('should render the beat display with 4 pads by default', () => {
      render(<App />)
      const beatDisplay = screen.getByTestId('beat-display')
      expect(beatDisplay).toBeInTheDocument()

      // Default time signature is 4/4, so 4 pads
      for (let i = 1; i <= 4; i++) {
        expect(screen.getByTestId(`beat-pad-${i}`)).toBeInTheDocument()
      }
    })

    it('should render the play button with accessible label', () => {
      render(<App />)
      const playButtonContainer = screen.getByTestId('play-button-container')
      expect(playButtonContainer).toBeInTheDocument()
      // PlayButton component should have play icon initially
      expect(screen.getByTestId('play-icon')).toBeInTheDocument()
    })

    it('should render time signature selector', () => {
      render(<App />)
      // Time signature selector should show all options
      expect(screen.getByTestId('time-sig-4/4')).toBeInTheDocument()
    })

    it('should render subdivision selector', () => {
      render(<App />)
      // Subdivision selector should show Quarter option
      expect(screen.getByTestId('subdivision-quarter')).toBeInTheDocument()
    })

    it('should render sound selector', () => {
      render(<App />)
      // Sound selector should show click and wood options
      expect(screen.getByTestId('sound-click')).toBeInTheDocument()
      expect(screen.getByTestId('sound-wood')).toBeInTheDocument()
    })

    it('should render the footer', () => {
      render(<App />)
      expect(screen.getByText('Practice with precision')).toBeInTheDocument()
    })
  })
})
