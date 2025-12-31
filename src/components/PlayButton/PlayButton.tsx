import { useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMetronomeStore } from '@/store/metronomeStore'
import { metronomeController } from '@/core/MetronomeController'

export function PlayButton() {
  const isPlaying = useMetronomeStore((state) => state.isPlaying)

  const handleClick = useCallback(async () => {
    await metronomeController.toggle()
  }, [])

  return (
    <motion.button
      onClick={handleClick}
      data-playing={isPlaying}
      aria-label={isPlaying ? 'Stop metronome' : 'Start metronome'}
      className={`
        relative w-24 h-24 rounded-full
        flex items-center justify-center
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg-darker
        ${
          isPlaying
            ? 'bg-accent glow-accent'
            : 'bg-primary glow-primary hover:scale-105'
        }
      `}
      whileTap={{ scale: 0.95 }}
      animate={
        isPlaying
          ? {
              scale: [1, 1.02, 1],
              transition: { repeat: Infinity, duration: 0.5 },
            }
          : {}
      }
    >
      <AnimatePresence mode="wait">
        {isPlaying ? (
          <motion.svg
            key="pause"
            data-testid="pause-icon"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.15 }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-12 h-12 text-bg-darker"
          >
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </motion.svg>
        ) : (
          <motion.svg
            key="play"
            data-testid="play-icon"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.15 }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-12 h-12 text-bg-darker ml-1"
          >
            <path d="M8 5v14l11-7z" />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
