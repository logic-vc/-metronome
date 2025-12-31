import { MainLayout } from './components/Layout'
import { TempoDisplay } from './components/TempoDisplay'
import { BPMControl } from './components/BPMControl'
import { PlayButton } from './components/PlayButton'
import { useMetronomeStore } from './store/metronomeStore'

function App() {
  const { timeSignature, subdivision } = useMetronomeStore()

  return (
    <MainLayout>
      <div className="card space-y-8">
        {/* Tempo Display */}
        <TempoDisplay />

        {/* Beat Display Placeholder - will be implemented in Phase 6 */}
        <div className="flex justify-center gap-3" data-testid="beat-display">
          {[1, 2, 3, 4].map((beat) => (
            <div
              key={beat}
              className="w-14 h-14 rounded-xl bg-bg-elevated border border-bg-card transition-all"
              data-testid={`beat-pad-${beat}`}
            />
          ))}
        </div>

        {/* Play Button */}
        <div className="flex justify-center" data-testid="play-button-container">
          <PlayButton />
        </div>

        {/* BPM Control */}
        <BPMControl />

        {/* Settings - will be fully implemented in Phase 4, 5 */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="card bg-bg-elevated">
            <p className="text-text-muted text-sm mb-1">Time Signature</p>
            <p className="text-lg font-semibold" data-testid="time-signature">{timeSignature}</p>
          </div>
          <div className="card bg-bg-elevated">
            <p className="text-text-muted text-sm mb-1">Subdivision</p>
            <p className="text-lg font-semibold capitalize" data-testid="subdivision">{subdivision}</p>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default App
