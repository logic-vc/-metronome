import { useCallback } from 'react'
import { motion } from 'framer-motion'
import { useMetronomeStore, type TimeSignature } from '@/store/metronomeStore'
import { TIME_SIGNATURES } from '@/core/utils/timeSignature'

export function TimeSignatureSelector() {
  const { timeSignature, setTimeSignature } = useMetronomeStore()

  const handleSelect = useCallback(
    (ts: TimeSignature) => {
      setTimeSignature(ts)
    },
    [setTimeSignature]
  )

  return (
    <div className="flex flex-col items-center gap-3">
      <label className="text-text-muted text-sm" id="time-signature-label">
        Time Signature
      </label>
      <div
        className="flex flex-wrap justify-center gap-2"
        role="radiogroup"
        aria-labelledby="time-signature-label"
      >
        {TIME_SIGNATURES.map((ts) => (
          <motion.button
            key={ts}
            onClick={() => handleSelect(ts)}
            role="radio"
            aria-checked={timeSignature === ts}
            data-testid={`time-sig-${ts}`}
            className={`
              px-3 py-2 rounded-lg font-semibold text-sm
              border transition-all duration-150
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg-darker
              ${
                timeSignature === ts
                  ? 'bg-primary text-bg-darker border-primary'
                  : 'bg-bg-elevated text-text-secondary border-bg-card hover:bg-bg-card hover:border-primary/30'
              }
            `}
            whileTap={{ scale: 0.95 }}
          >
            {ts}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
