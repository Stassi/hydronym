import { describe, expect, it } from '@jest/globals'
import generateOctets from './generate.js'

describe('generate octets', () => {
  describe.each([
    {
      key: 'Key',
      count: 10,
      expected: [235, 159, 119, 129, 183, 52, 202, 114, 167, 25],
    },
    {
      key: 'Wiki',
      count: 6,
      expected: [96, 68, 219, 109, 65, 183],
    },
    {
      key: 'Secret',
      count: 8,
      expected: [4, 212, 107, 5, 60, 168, 123, 89],
    },
  ])(
    'key: "$key", count: $count',
    ({
      count,
      key,
      expected,
    }: {
      count: number
      key: string
      expected: number[]
    }) => {
      it('should generate pseudorandom octets of a given length', () => {
        expect([
          ...generateOctets({
            count,
            key,
          }),
        ]).toStrictEqual(expected)
      })
    }
  )

  describe('key: "Key", count: 0', () => {
    it('should throw a range underflow error', () => {
      expect(() => [
        ...generateOctets({
          count: 0,
          key: 'Key',
        }),
      ]).toThrow()
    })
  })
})
