import { describe, expect, it } from '@jest/globals'
import cipher from './cipher.js'
import decrypt from './decrypt.js'
import encrypt from './encrypt.js'
import transcrypt from './transcrypt.js'
import transcode, { fromHex, fromLatin1 } from '../binary/transcode.js'

type TranscryptionTest = {
  actual(): string
  name: string
}

describe('cipher', () => {
  describe.each([
    {
      key: 'Key',
      plaintext: 'Plaintext',
      ciphertext: 'bbf316e8d940af0ad3',
    },
    {
      key: 'Wiki',
      plaintext: 'pedia',
      ciphertext: '1021bf0420',
    },
    {
      key: 'Secret',
      plaintext: 'Attack at dawn',
      ciphertext: '45a01f645fc35b383552544b9bf5',
    },
  ])(
    'key: "$key", plaintext: "$plaintext"',
    ({
      ciphertext,
      key,
      plaintext,
    }: Record<'ciphertext' | 'key' | 'plaintext', string>) => {
      describe('encryption', () => {
        describe.each([
          {
            name: 'cipher()',
            actual: () => cipher(key).encrypt(plaintext),
          },
          {
            name: 'encrypt()',
            actual: () => encrypt({ key, plaintext }),
          },
          {
            name: 'transcrypt()',
            actual: () =>
              transcode(
                transcrypt({
                  key: fromLatin1(key).toUInt8Array(),
                  text: fromLatin1(plaintext).toUInt8Array(),
                })
              ).toHex(),
          },
        ])('$name', ({ actual }: TranscryptionTest) => {
          it('should encrypt plaintext to ciphertext', () => {
            expect(actual()).toBe(ciphertext)
          })
        })
      })

      describe('decryption', () => {
        describe.each([
          {
            name: 'cipher()',
            actual: () => cipher(key).decrypt(ciphertext),
          },
          {
            name: 'decrypt()',
            actual: () => decrypt({ ciphertext, key }),
          },
          {
            name: 'transcrypt()',
            actual: () =>
              transcode(
                transcrypt({
                  key: fromLatin1(key).toUInt8Array(),
                  text: fromHex(ciphertext).toUInt8Array(),
                })
              ).toLatin1(),
          },
        ])('$name', ({ actual }: TranscryptionTest) => {
          it('should decrypt ciphertext to plaintext', () => {
            expect(actual()).toBe(plaintext)
          })
        })
      })
    }
  )
})
