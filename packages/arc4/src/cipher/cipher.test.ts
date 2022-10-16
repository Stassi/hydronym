import { describe, expect, it } from '@jest/globals'
import cipher from './cipher.js'
import decrypt from './decrypt.js'
import encrypt from './encrypt.js'
import transcrypt from './transcrypt.js'
import transcode, { fromHex, fromLatin1 } from '../binary/transcode.js'

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
      describe('decryption', () => {
        describe('cipher()', () => {
          it('should decrypt ciphertext to plaintext', () => {
            expect(cipher(key).decrypt(ciphertext)).toBe(plaintext)
          })
        })

        describe('decrypt()', () => {
          it('should decrypt ciphertext to plaintext', () => {
            expect(decrypt({ ciphertext, key })).toBe(plaintext)
          })
        })

        describe('transcrypt()', () => {
          it('should decrypt ciphertext to plaintext', () => {
            expect(
              transcode(
                transcrypt({
                  key: fromLatin1(key).toUInt8Array(),
                  text: fromHex(ciphertext).toUInt8Array(),
                })
              ).toLatin1()
            ).toBe(plaintext)
          })
        })
      })

      describe('encryption', () => {
        describe('cipher()', () => {
          it('should encrypt plaintext to ciphertext', () => {
            expect(cipher(key).encrypt(plaintext)).toBe(ciphertext)
          })
        })

        describe('encrypt()', () => {
          it('should encrypt plaintext to ciphertext', () => {
            expect(encrypt({ key, plaintext })).toBe(ciphertext)
          })
        })

        describe('transcrypt()', () => {
          it('should encrypt plaintext to ciphertext', () => {
            expect(
              transcode(
                transcrypt({
                  key: fromLatin1(key).toUInt8Array(),
                  text: fromLatin1(plaintext).toUInt8Array(),
                })
              ).toHex()
            ).toBe(ciphertext)
          })
        })
      })
    }
  )
})
