import { describe, expect, it } from '@jest/globals'
import generateOctets from './generateOctets.js'

describe('generate octets', () => {
  describe.each([
    {
      key: 'Key',
      count: 0,
      expected: [],
    },
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
      it('should generate a pseudorandom octet', () => {
        expect([
          ...generateOctets({
            count,
            key,
          }),
        ]).toStrictEqual(expected)
      })
    }
  )
})
