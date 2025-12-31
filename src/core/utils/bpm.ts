/**
 * BPM (Beats Per Minute) utility functions
 * Handles tempo naming, validation, and clamping
 */

export const BPM_MIN = 40
export const BPM_MAX = 300
export const BPM_DEFAULT = 120

/**
 * Tempo marking names based on BPM ranges
 * Standard musical tempo markings from Italian terminology
 */
const TEMPO_RANGES = [
  { max: 40, name: 'Larghissimo' },   // Very, very slow
  { max: 60, name: 'Largo' },          // Broadly, slowly
  { max: 66, name: 'Larghetto' },      // Rather broadly
  { max: 76, name: 'Adagio' },         // Slow and stately
  { max: 108, name: 'Andante' },       // At a walking pace
  { max: 120, name: 'Moderato' },      // Moderately
  { max: 168, name: 'Allegro' },       // Fast, quickly
  { max: 200, name: 'Presto' },        // Very fast
  { max: Infinity, name: 'Prestissimo' }, // As fast as possible
] as const

export type TempoName = (typeof TEMPO_RANGES)[number]['name']

/**
 * Get the musical tempo name for a given BPM
 * @param bpm - Beats per minute
 * @returns The tempo marking name (e.g., "Allegro", "Andante")
 */
export function getTempoName(bpm: number): TempoName {
  for (const { max, name } of TEMPO_RANGES) {
    if (bpm < max) {
      return name
    }
  }
  return 'Prestissimo'
}

/**
 * Clamp a BPM value to the valid range
 * @param bpm - The BPM value to clamp
 * @returns BPM value clamped between BPM_MIN and BPM_MAX
 */
export function clampBpm(bpm: number): number {
  return Math.max(BPM_MIN, Math.min(BPM_MAX, bpm))
}

/**
 * Check if a BPM value is valid
 * @param bpm - The BPM value to validate
 * @returns true if the BPM is a valid integer within range
 */
export function isValidBpm(bpm: number): boolean {
  if (!Number.isFinite(bpm)) return false
  if (!Number.isInteger(bpm)) return false
  return bpm >= BPM_MIN && bpm <= BPM_MAX
}

/**
 * Calculate milliseconds per beat from BPM
 * @param bpm - Beats per minute
 * @returns Milliseconds per beat
 */
export function bpmToMs(bpm: number): number {
  return (60 / bpm) * 1000
}

/**
 * Calculate seconds per beat from BPM
 * @param bpm - Beats per minute
 * @returns Seconds per beat
 */
export function bpmToSeconds(bpm: number): number {
  return 60 / bpm
}
