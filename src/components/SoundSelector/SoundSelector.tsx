import { useCallback } from 'react'
import { motion } from 'framer-motion'
import { useMetronomeStore, type SoundType } from '@/store/metronomeStore'

const SOUND_TYPES: { value: SoundType; label: string }[] = [
  { value: 'click', label: 'Click' },
  { value: 'wood', label: 'Wood' },
]

export function SoundSelector() {
  const { soundType, setSoundType } = useMetronomeStore()

  const handleSelect = useCallback(
    (type: SoundType) => {
      setSoundType(type)
    },
    [setSoundType]
  )

  return (
    <div className="flex flex-col items-center gap-3">
      <label className="text-text-muted text-sm" id="sound-label">
        Sound
      </label>
      <div
        className="flex gap-2"
        role="radiogroup"
        aria-labelledby="sound-label"
      >
        {SOUND_TYPES.map(({ value, label }) => (
          <motion.button
            key={value}
            onClick={() => handleSelect(value)}
            role="radio"
            aria-checked={soundType === value}
            data-testid={`sound-${value}`}
            className={`
              px-4 py-2 rounded-lg font-medium text-sm
              border transition-all duration-150
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg-darker
              ${
                soundType === value
                  ? 'bg-primary text-bg-darker border-primary'
                  : 'bg-bg-elevated text-text-secondary border-bg-card hover:bg-bg-card hover:border-primary/30'
              }
            `}
            whileTap={{ scale: 0.95 }}
          >
            {label}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
