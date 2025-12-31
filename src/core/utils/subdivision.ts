/**
 * Subdivision utilities
 * Handles note subdivision calculations
 */

export type Subdivision = 'half' | 'quarter' | 'eighth' | 'sixteenth'

export const SUBDIVISIONS: Subdivision[] = ['half', 'quarter', 'eighth', 'sixteenth']

const SUBDIVISION_MULTIPLIERS: Record<Subdivision, number> = {
  half: 0.5,      // 2 per measure beat
  quarter: 1,     // 1 per beat (default)
  eighth: 2,      // 2 per beat
  sixteenth: 4,   // 4 per beat
}

const SUBDIVISION_LABELS: Record<Subdivision, string> = {
  half: 'Half',
  quarter: 'Quarter',
  eighth: 'Eighth',
  sixteenth: 'Sixteenth',
}

/**
 * Get the multiplier for a subdivision
 * Used to calculate the effective BPM
 */
export function getSubdivisionMultiplier(subdivision: Subdivision): number {
  return SUBDIVISION_MULTIPLIERS[subdivision]
}

/**
 * Get the display label for a subdivision
 */
export function getSubdivisionLabel(subdivision: Subdivision): string {
  return SUBDIVISION_LABELS[subdivision]
}

/**
 * Calculate effective BPM based on subdivision
 */
export function calculateEffectiveBpm(bpm: number, subdivision: Subdivision): number {
  return bpm * getSubdivisionMultiplier(subdivision)
}
