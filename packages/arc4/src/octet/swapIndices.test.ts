import { describe, expect, it } from '@jest/globals'
import swapIndices from './swapIndices.js'

describe('octet swap indices', () => {
  describe('octet := [0, 40)', () => {
    const octet = Uint8Array.from([0, 10, 20, 30])

    describe.each([
      {
        x: 0,
        y: 1,
        expected: [10, 0, 20, 30],
      },
      {
        x: 1,
        y: 0,
        expected: [10, 0, 20, 30],
      },
      {
        x: 1,
        y: 2,
        expected: [0, 20, 10, 30],
      },
      {
        x: 2,
        y: 3,
        expected: [0, 10, 30, 20],
      },
      {
        x: 0,
        y: 3,
        expected: [30, 10, 20, 0],
      },
    ])(
      'swap x: $x with y: $y',
      ({ x, y, expected }: { x: number; y: number; expected: number[] }) => {
        it(`should return ${expected}`, () => {
          expect([...swapIndices(octet, x, y)]).toStrictEqual(expected)
        })
      }
    )
  })
})
