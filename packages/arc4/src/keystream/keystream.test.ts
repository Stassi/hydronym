import { describe, expect, it } from '@jest/globals'
import keystream from './keystream.js'
import transcode, { fromLatin1 } from '../binary/transcode.js'

describe('keystream', () => {
  describe.each([
    {
      key: 'Key',
      count: 0,
      expected: '',
    },
    {
      key: 'Key',
      count: 10,
      expected: 'eb9f7781b734ca72a719',
    },
    {
      key: 'Wiki',
      count: 6,
      expected: '6044db6d41b7',
    },
    {
      key: 'Secret',
      count: 8,
      expected: '04d46b053ca87b59',
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
      expected: string
    }) => {
      it('should generate pseudorandom octets of a given length', () => {
        expect(
          transcode(
            keystream({
              count,
              key: fromLatin1(key).toUInt8Array(),
            })
          ).toHex()
        ).toBe(expected)
      })
    }
  )
})
