import { useState, useCallback, type KeyboardEvent, type ChangeEvent, type MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { useMetronomeStore } from '@/store/metronomeStore'

export function BPMControl() {
  const { bpm, setBpm, incrementBpm, decrementBpm } = useMetronomeStore()
  const [inputValue, setInputValue] = useState(bpm.toString())

  const handleIncrement = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const step = e.shiftKey ? 5 : 1
      incrementBpm(step)
    },
    [incrementBpm]
  )

  const handleDecrement = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const step = e.shiftKey ? 5 : 1
      decrementBpm(step)
    },
    [decrementBpm]
  )

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }, [])

  const handleInputCommit = useCallback(() => {
    const newBpm = parseInt(inputValue, 10)
    if (!isNaN(newBpm)) {
      setBpm(newBpm)
    }
    setInputValue(useMetronomeStore.getState().bpm.toString())
  }, [inputValue, setBpm])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleInputCommit()
      }
    },
    [handleInputCommit]
  )

  // Keep input in sync with store
  const handleFocus = useCallback(() => {
    setInputValue(bpm.toString())
  }, [bpm])

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Main BPM Display */}
      <div className="flex items-center gap-4">
        {/* Decrement Button */}
        <motion.button
          data-testid="bpm-decrement"
          onClick={handleDecrement}
          aria-label="Decrease BPM"
          className="w-12 h-12 rounded-full bg-bg-elevated border border-bg-card
                     flex items-center justify-center text-2xl text-text-secondary
                     hover:bg-bg-card hover:text-text-primary hover:border-primary/30
                     active:scale-95 transition-all duration-150
                     focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg-darker"
          whileTap={{ scale: 0.95 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </motion.button>

        {/* BPM Value Display */}
        <div className="text-center">
          <span
            data-testid="bpm-value"
            className="text-7xl font-bold text-primary font-mono tracking-tight"
          >
            {bpm}
          </span>
          <p className="text-text-muted text-sm mt-1">BPM</p>
        </div>

        {/* Increment Button */}
        <motion.button
          data-testid="bpm-increment"
          onClick={handleIncrement}
          aria-label="Increase BPM"
          className="w-12 h-12 rounded-full bg-bg-elevated border border-bg-card
                     flex items-center justify-center text-2xl text-text-secondary
                     hover:bg-bg-card hover:text-text-primary hover:border-primary/30
                     active:scale-95 transition-all duration-150
                     focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg-darker"
          whileTap={{ scale: 0.95 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </motion.button>
      </div>

      {/* Direct BPM Input */}
      <div className="flex items-center gap-2">
        <label htmlFor="bpm-direct-input" className="sr-only">
          BPM Input
        </label>
        <input
          id="bpm-direct-input"
          data-testid="bpm-input"
          type="number"
          min={40}
          max={300}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputCommit}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          aria-label="BPM value"
          className="w-24 px-3 py-2 text-center font-mono text-lg
                     bg-bg-elevated border border-bg-card rounded-lg
                     text-text-primary placeholder-text-muted
                     focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
                     [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <span className="text-text-muted text-sm">Tap to edit</span>
      </div>

      {/* Keyboard Hint */}
      <p className="text-text-muted text-xs">
        Hold <kbd className="px-1.5 py-0.5 rounded bg-bg-elevated text-text-secondary">Shift</kbd>{' '}
        for ±5 BPM
      </p>
    </div>
  )
}
