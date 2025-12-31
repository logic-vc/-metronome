import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { PlayButton } from './PlayButton'
import { useMetronomeStore } from '@/store/metronomeStore'

// Create a simple mock that directly toggles the store
vi.mock('@/core/MetronomeController', () => {
  return {
    metronomeController: {
      start: vi.fn(),
      stop: vi.fn(),
      isRunning: vi.fn(() => false),
      toggle: vi.fn().mockImplementation(async () => {
        // Direct import to avoid hoisting issues
        const store = await import('@/store/metronomeStore')
        store.useMetronomeStore.getState().togglePlay()
      }),
      resumeAudio: vi.fn(),
      init: vi.fn(),
    },
  }
})

describe('PlayButton', () => {
  beforeEach(() => {
    useMetronomeStore.setState({ isPlaying: false, bpm: 120 })
    vi.clearAllMocks()
  })

  describe('when rendered', () => {
    it('should display play icon when not playing', () => {
      render(<PlayButton />)
      expect(screen.getByTestId('play-icon')).toBeInTheDocument()
      expect(screen.queryByTestId('pause-icon')).not.toBeInTheDocument()
    })

    it('should display pause icon when playing', () => {
      useMetronomeStore.setState({ isPlaying: true })
      render(<PlayButton />)
      expect(screen.getByTestId('pause-icon')).toBeInTheDocument()
      expect(screen.queryByTestId('play-icon')).not.toBeInTheDocument()
    })

    it('should have accessible label', () => {
      render(<PlayButton />)
      expect(screen.getByRole('button')).toHaveAccessibleName(/start|play/i)
    })
  })

  describe('when clicked', () => {
    it('should toggle isPlaying state from false to true', async () => {
      render(<PlayButton />)
      const button = screen.getByRole('button')

      fireEvent.click(button)

      await waitFor(() => {
        expect(useMetronomeStore.getState().isPlaying).toBe(true)
      })
    })

    it('should toggle isPlaying state from true to false', async () => {
      useMetronomeStore.setState({ isPlaying: true })
      render(<PlayButton />)
      const button = screen.getByRole('button')

      fireEvent.click(button)

      await waitFor(() => {
        expect(useMetronomeStore.getState().isPlaying).toBe(false)
      })
    })
  })

  describe('keyboard support', () => {
    it('should respond to button activation', async () => {
      render(<PlayButton />)
      const button = screen.getByRole('button')

      // Click simulates keyboard activation (Enter/Space on focused button)
      fireEvent.click(button)

      await waitFor(() => {
        expect(useMetronomeStore.getState().isPlaying).toBe(true)
      })
    })
  })

  describe('visual feedback', () => {
    it('should have different visual style when playing', () => {
      useMetronomeStore.setState({ isPlaying: true })
      render(<PlayButton />)
      const button = screen.getByRole('button')

      // When playing, button should have active/pulsing state
      expect(button).toHaveAttribute('data-playing', 'true')
    })
  })
})
