import { motion, AnimatePresence } from 'framer-motion'
import { useMetronomeStore } from '@/store/metronomeStore'
import { getTempoName } from '@/core/utils/bpm'

export function TempoDisplay() {
  const bpm = useMetronomeStore((state) => state.bpm)
  const tempoName = getTempoName(bpm)

  return (
    <div className="text-center space-y-2">
      <AnimatePresence mode="wait">
        <motion.h2
          key={tempoName}
          data-testid="tempo-name"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="text-3xl font-semibold text-text-secondary"
        >
          {tempoName}
        </motion.h2>
      </AnimatePresence>

      <div className="flex items-baseline justify-center gap-2">
        <motion.span
          data-testid="tempo-bpm"
          key={bpm}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="text-7xl font-bold text-primary font-mono tracking-tight"
        >
          {bpm}
        </motion.span>
        <span className="text-xl text-text-muted font-medium">BPM</span>
      </div>
    </div>
  )
}
