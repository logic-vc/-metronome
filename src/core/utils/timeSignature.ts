/**
 * Time Signature utilities
 * Handles parsing and operations on musical time signatures
 */

export type TimeSignature = '2/4' | '3/4' | '4/4' | '5/4' | '6/8' | '7/8' | '9/8' | '12/8'

export const TIME_SIGNATURES: TimeSignature[] = [
  '2/4',
  '3/4',
  '4/4',
  '5/4',
  '6/8',
  '7/8',
  '9/8',
  '12/8',
]

interface TimeSignatureInfo {
  beatsPerMeasure: number
  noteValue: number
}

const TIME_SIGNATURE_DATA: Record<TimeSignature, TimeSignatureInfo> = {
  '2/4': { beatsPerMeasure: 2, noteValue: 4 },
  '3/4': { beatsPerMeasure: 3, noteValue: 4 },
  '4/4': { beatsPerMeasure: 4, noteValue: 4 },
  '5/4': { beatsPerMeasure: 5, noteValue: 4 },
  '6/8': { beatsPerMeasure: 6, noteValue: 8 },
  '7/8': { beatsPerMeasure: 7, noteValue: 8 },
  '9/8': { beatsPerMeasure: 9, noteValue: 8 },
  '12/8': { beatsPerMeasure: 12, noteValue: 8 },
}

/**
 * Get the number of beats per measure for a time signature
 */
export function getBeatsPerMeasure(timeSignature: TimeSignature): number {
  return TIME_SIGNATURE_DATA[timeSignature].beatsPerMeasure
}

/**
 * Get the note value (denominator) for a time signature
 * 4 = quarter note, 8 = eighth note
 */
export function getNoteValue(timeSignature: TimeSignature): number {
  return TIME_SIGNATURE_DATA[timeSignature].noteValue
}

/**
 * Parse a time signature string into its components
 */
export function parseTimeSignature(timeSignature: TimeSignature): TimeSignatureInfo {
  return TIME_SIGNATURE_DATA[timeSignature]
}

/**
 * Check if a time signature is compound (divisible by 3, like 6/8, 9/8, 12/8)
 */
export function isCompoundTimeSignature(timeSignature: TimeSignature): boolean {
  const { beatsPerMeasure, noteValue } = TIME_SIGNATURE_DATA[timeSignature]
  return noteValue === 8 && beatsPerMeasure % 3 === 0
}

/**
 * Get display name for a time signature
 */
export function getTimeSignatureDisplayName(timeSignature: TimeSignature): string {
  return timeSignature
}
