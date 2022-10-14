import { describe, expect, it } from '@jest/globals'
import transcrypt from './transcrypt.js'
import transcode, { fromLatin1 } from '../binary/transcode.js'

describe('decrypt', () => {
  describe.each([
    {
      ciphertext: [187, 243, 22, 232, 217, 64, 175, 10, 211],
      key: 'Key',
      expected: 'Plaintext',
    },
    {
      ciphertext: [16, 33, 191, 4, 32],
      key: 'Wiki',
      expected: 'pedia',
    },
    {
      ciphertext: [69, 160, 31, 100, 95, 195, 91, 56, 53, 82, 84, 75, 155, 245],
      key: 'Secret',
      expected: 'Attack at dawn',
    },
  ])(
    'key: "$key", ciphertext: $ciphertext',
    ({
      ciphertext,
      key,
      expected,
    }: {
      ciphertext: number[]
      key: string
      expected: string
    }) => {
      it('should return known plaintext', () => {
        expect(
          transcode(
            transcrypt({
              key: fromLatin1(key).toUInt8Array(),
              text: Uint8Array.from(ciphertext),
            })
          ).toLatin1()
        ).toBe(expected)
      })
    }
  )
})
