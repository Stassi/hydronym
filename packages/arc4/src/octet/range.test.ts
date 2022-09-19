import { describe, expect, it } from '@jest/globals'
import range from './range.js'

describe('octet range', () => {
  describe('input: 4', () => {
    const input = 4

    it(`should return integer interval [0 ... ${input})`, () => {
      expect([...range(input)]).toEqual([0, 1, 2, 3])
    })
  })

  describe('input: 8', () => {
    const input = 8

    it(`should return integer interval [0 ... ${input})`, () => {
      expect([...range(input)]).toEqual([
        0, 1, 2, 3, 4, 5, 6, 7,
      ])
    })
  })
})
