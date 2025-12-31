import type { ReactNode } from 'react'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-bg-darker flex flex-col">
      <header className="w-full py-4 px-6 border-b border-bg-elevated">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-gradient">Metronome</h1>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-2xl">
          {children}
        </div>
      </main>

      <footer className="w-full py-4 px-6 border-t border-bg-elevated">
        <div className="max-w-4xl mx-auto text-center text-text-muted text-sm">
          Practice with precision
        </div>
      </footer>
    </div>
  )
}
