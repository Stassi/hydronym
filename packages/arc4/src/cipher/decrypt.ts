import { decode as decodeLatin1 } from '../latin1/transcode.js'
import encrypt from './encrypt.js'

export default function decrypt({
  ciphertext,
  key,
}: {
  ciphertext: Uint8Array
  key: string
}): string {
  return decodeLatin1(
    encrypt({
      key,
      plaintext: decodeLatin1(ciphertext),
    })
  )
}
