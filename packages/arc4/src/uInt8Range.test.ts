import { describe, expect, it } from '@jest/globals'
import uInt8Range from './uInt8Range.js'

describe('uInt8Range', () => {
  describe('input: 4', () => {
    const input = 4

    it(`should return integer interval [0 ... ${input})`, () => {
      expect([...uInt8Range(input)]).toEqual([0, 1, 2, 3])
    })
  })

  describe('input: 8', () => {
    const input = 8

    it(`should return integer interval [0 ... ${input})`, () => {
      expect([...uInt8Range(input)]).toEqual([
        0, 1, 2, 3, 4, 5, 6, 7,
      ])
    })
  })
})
