import { describe, expect, it } from '@jest/globals'
import { fromLatin1 } from '../binary/transcode.js'
import transcrypt from './transcrypt.js'

describe('encrypt', () => {
  describe.each([
    {
      key: 'Key',
      plaintext: 'Plaintext',
      expected: [187, 243, 22, 232, 217, 64, 175, 10, 211],
    },
    {
      key: 'Wiki',
      plaintext: 'pedia',
      expected: [16, 33, 191, 4, 32],
    },
    {
      key: 'Secret',
      plaintext: 'Attack at dawn',
      expected: [69, 160, 31, 100, 95, 195, 91, 56, 53, 82, 84, 75, 155, 245],
    },
  ])(
    'key: "$key", plaintext: "$plaintext"',
    ({
      key,
      plaintext,
      expected,
    }: {
      expected: number[]
    } & Record<'key' | 'plaintext', string>) => {
      it('should return known ciphertext', () => {
        expect([
          ...transcrypt({
            key: fromLatin1(key).toUInt8Array(),
            text: fromLatin1(plaintext).toUInt8Array(),
          }),
        ]).toStrictEqual(expected)
      })
    }
  )
})
