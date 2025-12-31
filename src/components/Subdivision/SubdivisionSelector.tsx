import { useCallback } from 'react'
import { motion } from 'framer-motion'
import { useMetronomeStore, type Subdivision } from '@/store/metronomeStore'
import { SUBDIVISIONS, getSubdivisionLabel } from '@/core/utils/subdivision'

export function SubdivisionSelector() {
  const { subdivision, setSubdivision } = useMetronomeStore()

  const handleSelect = useCallback(
    (sub: Subdivision) => {
      setSubdivision(sub)
    },
    [setSubdivision]
  )

  return (
    <div className="flex flex-col items-center gap-3">
      <label className="text-text-muted text-sm" id="subdivision-label">
        Subdivision
      </label>
      <div
        className="flex flex-wrap justify-center gap-2"
        role="radiogroup"
        aria-labelledby="subdivision-label"
      >
        {SUBDIVISIONS.map((sub) => (
          <motion.button
            key={sub}
            onClick={() => handleSelect(sub)}
            role="radio"
            aria-checked={subdivision === sub}
            data-testid={`subdivision-${sub}`}
            className={`
              px-3 py-2 rounded-lg font-medium text-sm
              border transition-all duration-150
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg-darker
              ${
                subdivision === sub
                  ? 'bg-accent text-bg-darker border-accent'
                  : 'bg-bg-elevated text-text-secondary border-bg-card hover:bg-bg-card hover:border-accent/30'
              }
            `}
            whileTap={{ scale: 0.95 }}
          >
            {getSubdivisionLabel(sub)}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
