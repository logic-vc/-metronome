import { motion } from 'framer-motion'
import { useMetronomeStore } from '@/store/metronomeStore'
import { getBeatsPerMeasure } from '@/core/utils/timeSignature'

export function BeatDisplay() {
  const { timeSignature, currentBeat, isPlaying, accentEnabled } = useMetronomeStore()
  const beatsPerMeasure = getBeatsPerMeasure(timeSignature)

  // Create array of beat indices
  const beats = Array.from({ length: beatsPerMeasure }, (_, i) => i)

  return (
    <div
      className="flex flex-wrap justify-center gap-3"
      data-testid="beat-display"
      role="group"
      aria-label="Beat indicator"
    >
      {beats.map((beatIndex) => {
        const isActive = isPlaying && currentBeat === beatIndex
        const isAccentBeat = beatIndex === 0 && accentEnabled

        return (
          <motion.div
            key={beatIndex}
            data-testid={`beat-pad-${beatIndex + 1}`}
            data-active={isActive}
            animate={{
              scale: isActive ? 1.15 : 1,
              backgroundColor: isActive
                ? isAccentBeat
                  ? '#FF00FF' // accent color
                  : '#00FFFF' // primary color
                : '#151A2A', // bg-elevated
            }}
            transition={{
              duration: 0.05,
              ease: 'easeOut',
            }}
            className={`
              w-12 h-12 md:w-14 md:h-14 rounded-xl
              border transition-colors duration-100
              ${
                isActive
                  ? isAccentBeat
                    ? 'border-accent shadow-[0_0_20px_rgba(255,0,255,0.5)]'
                    : 'border-primary shadow-[0_0_20px_rgba(0,255,255,0.5)]'
                  : 'border-bg-card'
              }
            `}
            aria-label={`Beat ${beatIndex + 1}${isAccentBeat ? ' (accent)' : ''}`}
          />
        )
      })}
    </div>
  )
}
