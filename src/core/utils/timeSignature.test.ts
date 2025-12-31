import { describe, it, expect } from 'vitest'
import {
  getBeatsPerMeasure,
  getNoteValue,
  parseTimeSignature,
  TIME_SIGNATURES,
  type TimeSignature,
} from './timeSignature'

describe('Time Signature Utilities', () => {
  describe('TIME_SIGNATURES', () => {
    it('should contain all supported time signatures', () => {
      const expected: TimeSignature[] = ['2/4', '3/4', '4/4', '5/4', '6/8', '7/8', '9/8', '12/8']
      expect(TIME_SIGNATURES).toEqual(expected)
    })
  })

  describe('getBeatsPerMeasure', () => {
    it('should return 2 for 2/4', () => {
      expect(getBeatsPerMeasure('2/4')).toBe(2)
    })

    it('should return 3 for 3/4', () => {
      expect(getBeatsPerMeasure('3/4')).toBe(3)
    })

    it('should return 4 for 4/4', () => {
      expect(getBeatsPerMeasure('4/4')).toBe(4)
    })

    it('should return 5 for 5/4', () => {
      expect(getBeatsPerMeasure('5/4')).toBe(5)
    })

    it('should return 6 for 6/8', () => {
      expect(getBeatsPerMeasure('6/8')).toBe(6)
    })

    it('should return 7 for 7/8', () => {
      expect(getBeatsPerMeasure('7/8')).toBe(7)
    })

    it('should return 9 for 9/8', () => {
      expect(getBeatsPerMeasure('9/8')).toBe(9)
    })

    it('should return 12 for 12/8', () => {
      expect(getBeatsPerMeasure('12/8')).toBe(12)
    })
  })

  describe('getNoteValue', () => {
    it('should return 4 for quarter note time signatures', () => {
      expect(getNoteValue('2/4')).toBe(4)
      expect(getNoteValue('3/4')).toBe(4)
      expect(getNoteValue('4/4')).toBe(4)
      expect(getNoteValue('5/4')).toBe(4)
    })

    it('should return 8 for eighth note time signatures', () => {
      expect(getNoteValue('6/8')).toBe(8)
      expect(getNoteValue('7/8')).toBe(8)
      expect(getNoteValue('9/8')).toBe(8)
      expect(getNoteValue('12/8')).toBe(8)
    })
  })

  describe('parseTimeSignature', () => {
    it('should parse 4/4 correctly', () => {
      const result = parseTimeSignature('4/4')
      expect(result).toEqual({ beatsPerMeasure: 4, noteValue: 4 })
    })

    it('should parse 6/8 correctly', () => {
      const result = parseTimeSignature('6/8')
      expect(result).toEqual({ beatsPerMeasure: 6, noteValue: 8 })
    })

    it('should parse all supported time signatures', () => {
      TIME_SIGNATURES.forEach((ts) => {
        const result = parseTimeSignature(ts)
        expect(result.beatsPerMeasure).toBe(getBeatsPerMeasure(ts))
        expect(result.noteValue).toBe(getNoteValue(ts))
      })
    })
  })
})
