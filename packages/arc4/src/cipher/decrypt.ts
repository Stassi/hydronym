import encrypt from './encrypt.js'
import transcode from '../binary/transcode.js'

export default function decrypt({
  ciphertext,
  key,
}: {
  ciphertext: Uint8Array
  key: string
}): string {
  return transcode(
    encrypt({
      key,
      plaintext: transcode(ciphertext).toLatin1(),
    })
  ).toLatin1()
}
