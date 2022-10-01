import { describe, expect, it } from '@jest/globals'
import swapIndices from './swapIndices.js'

describe('octet swap indices', () => {
  describe('octets: [0, 4)', () => {
    const octets = Uint8Array.from([0, 1, 2, 3])

    describe.each([
      {
        x: 0,
        y: 1,
        expected: [1, 0, 2, 3],
      },
      {
        x: 1,
        y: 0,
        expected: [1, 0, 2, 3],
      },
      {
        x: 1,
        y: 1,
        expected: [0, 1, 2, 3],
      },
      {
        x: 1,
        y: 2,
        expected: [0, 2, 1, 3],
      },
      {
        x: 2,
        y: 3,
        expected: [0, 1, 3, 2],
      },
      {
        x: 0,
        y: 3,
        expected: [3, 1, 2, 0],
      },
    ])(
      'swap ( x: $x, y: $y )',
      ({ x, y, expected }: { x: number; y: number; expected: number[] }) => {
        it(`should return [${expected}]`, () => {
          expect([...swapIndices(octets, x, y)]).toStrictEqual(expected)
        })
      }
    )
  })
})
