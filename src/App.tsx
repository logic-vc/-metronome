import { MainLayout } from './components/Layout'
import { TempoDisplay } from './components/TempoDisplay'
import { BPMControl } from './components/BPMControl'
import { PlayButton } from './components/PlayButton'
import { BeatDisplay } from './components/BeatDisplay'
import { TimeSignatureSelector } from './components/TimeSignature'
import { SubdivisionSelector } from './components/Subdivision'
import { SoundSelector } from './components/SoundSelector'

function App() {
  return (
    <MainLayout>
      <div className="card space-y-8">
        {/* Tempo Display */}
        <TempoDisplay />

        {/* Beat Display */}
        <BeatDisplay />

        {/* Play Button */}
        <div className="flex justify-center" data-testid="play-button-container">
          <PlayButton />
        </div>

        {/* BPM Control */}
        <BPMControl />

        {/* Settings Section */}
        <div className="space-y-6 pt-4 border-t border-bg-elevated">
          {/* Time Signature Selector */}
          <TimeSignatureSelector />

          {/* Subdivision Selector */}
          <SubdivisionSelector />

          {/* Sound Selector */}
          <SoundSelector />
        </div>
      </div>
    </MainLayout>
  )
}

export default App
