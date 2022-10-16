import decryptModule from './decrypt.js'
import encryptModule from './encrypt.js'

export default function cipher(key: string): {
  encrypt(plaintext: string): string
  decrypt(ciphertext: string): string
} {
  return {
    decrypt(ciphertext: string): string {
      return decryptModule({ ciphertext, key })
    },
    encrypt(plaintext: string): string {
      return encryptModule({ key, plaintext })
    },
  }
}
