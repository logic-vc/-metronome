import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MainLayout } from './MainLayout'

describe('MainLayout', () => {
  describe('when rendered', () => {
    it('should render children content', () => {
      render(
        <MainLayout>
          <div data-testid="test-child">Test Content</div>
        </MainLayout>
      )
      expect(screen.getByTestId('test-child')).toBeInTheDocument()
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    it('should render the header with app title', () => {
      render(
        <MainLayout>
          <div>Content</div>
        </MainLayout>
      )
      expect(screen.getByText('Metronome')).toBeInTheDocument()
    })

    it('should render the footer with tagline', () => {
      render(
        <MainLayout>
          <div>Content</div>
        </MainLayout>
      )
      expect(screen.getByText('Practice with precision')).toBeInTheDocument()
    })

    it('should have proper semantic structure', () => {
      render(
        <MainLayout>
          <div>Content</div>
        </MainLayout>
      )
      // Check for header and footer elements
      const header = document.querySelector('header')
      const main = document.querySelector('main')
      const footer = document.querySelector('footer')

      expect(header).toBeInTheDocument()
      expect(main).toBeInTheDocument()
      expect(footer).toBeInTheDocument()
    })
  })
})
