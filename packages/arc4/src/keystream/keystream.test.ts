import { describe, expect, it } from '@jest/globals'
import keystream from './keystream.js'
import transcode from '../binary/transcode.js'

describe('keystream', () => {
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
          ...keystream({
            count,
            key: transcode({ encoding: 'latin1', text: key }).toUInt8Array(),
          }),
        ]).toStrictEqual(expected)
      })
    }
  )

  describe('key: "Key", count: 0', () => {
    it('should throw a range underflow error', () => {
      expect(() => [
        ...keystream({
          count: 0,
          key: transcode({ encoding: 'latin1', text: 'Key' }).toUInt8Array(),
        }),
      ]).toThrow()
    })
  })
})
