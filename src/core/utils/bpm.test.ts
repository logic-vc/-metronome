import { describe, it, expect } from 'vitest'
import { getTempoName, clampBpm, isValidBpm, BPM_MIN, BPM_MAX } from './bpm'

describe('BPM Utilities', () => {
  describe('getTempoName', () => {
    it('should return "Larghissimo" for BPM below 40', () => {
      expect(getTempoName(30)).toBe('Larghissimo')
      expect(getTempoName(39)).toBe('Larghissimo')
    })

    it('should return "Largo" for BPM 40-59', () => {
      expect(getTempoName(40)).toBe('Largo')
      expect(getTempoName(50)).toBe('Largo')
      expect(getTempoName(59)).toBe('Largo')
    })

    it('should return "Larghetto" for BPM 60-65', () => {
      expect(getTempoName(60)).toBe('Larghetto')
      expect(getTempoName(65)).toBe('Larghetto')
    })

    it('should return "Adagio" for BPM 66-75', () => {
      expect(getTempoName(66)).toBe('Adagio')
      expect(getTempoName(70)).toBe('Adagio')
      expect(getTempoName(75)).toBe('Adagio')
    })

    it('should return "Andante" for BPM 76-107', () => {
      expect(getTempoName(76)).toBe('Andante')
      expect(getTempoName(90)).toBe('Andante')
      expect(getTempoName(107)).toBe('Andante')
    })

    it('should return "Moderato" for BPM 108-119', () => {
      expect(getTempoName(108)).toBe('Moderato')
      expect(getTempoName(115)).toBe('Moderato')
      expect(getTempoName(119)).toBe('Moderato')
    })

    it('should return "Allegro" for BPM 120-167', () => {
      expect(getTempoName(120)).toBe('Allegro')
      expect(getTempoName(140)).toBe('Allegro')
      expect(getTempoName(167)).toBe('Allegro')
    })

    it('should return "Presto" for BPM 168-199', () => {
      expect(getTempoName(168)).toBe('Presto')
      expect(getTempoName(180)).toBe('Presto')
      expect(getTempoName(199)).toBe('Presto')
    })

    it('should return "Prestissimo" for BPM 200+', () => {
      expect(getTempoName(200)).toBe('Prestissimo')
      expect(getTempoName(250)).toBe('Prestissimo')
      expect(getTempoName(300)).toBe('Prestissimo')
    })
  })

  describe('clampBpm', () => {
    it('should return BPM_MIN for values below minimum', () => {
      expect(clampBpm(0)).toBe(BPM_MIN)
      expect(clampBpm(30)).toBe(BPM_MIN)
      expect(clampBpm(-100)).toBe(BPM_MIN)
    })

    it('should return BPM_MAX for values above maximum', () => {
      expect(clampBpm(400)).toBe(BPM_MAX)
      expect(clampBpm(1000)).toBe(BPM_MAX)
    })

    it('should return the same value for values within range', () => {
      expect(clampBpm(60)).toBe(60)
      expect(clampBpm(120)).toBe(120)
      expect(clampBpm(200)).toBe(200)
    })

    it('should return boundary values correctly', () => {
      expect(clampBpm(BPM_MIN)).toBe(BPM_MIN)
      expect(clampBpm(BPM_MAX)).toBe(BPM_MAX)
    })
  })

  describe('isValidBpm', () => {
    it('should return true for valid BPM values', () => {
      expect(isValidBpm(40)).toBe(true)
      expect(isValidBpm(120)).toBe(true)
      expect(isValidBpm(300)).toBe(true)
    })

    it('should return false for invalid BPM values', () => {
      expect(isValidBpm(39)).toBe(false)
      expect(isValidBpm(301)).toBe(false)
      expect(isValidBpm(0)).toBe(false)
      expect(isValidBpm(-1)).toBe(false)
    })

    it('should return false for non-integer values', () => {
      expect(isValidBpm(120.5)).toBe(false)
      expect(isValidBpm(100.1)).toBe(false)
    })

    it('should return false for NaN and Infinity', () => {
      expect(isValidBpm(NaN)).toBe(false)
      expect(isValidBpm(Infinity)).toBe(false)
      expect(isValidBpm(-Infinity)).toBe(false)
    })
  })

  describe('BPM Constants', () => {
    it('should have BPM_MIN as 40', () => {
      expect(BPM_MIN).toBe(40)
    })

    it('should have BPM_MAX as 300', () => {
      expect(BPM_MAX).toBe(300)
    })
  })
})
