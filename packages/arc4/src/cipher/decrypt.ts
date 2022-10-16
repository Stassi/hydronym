import transcrypt from './transcrypt.js'
import transcode, { fromHex, fromLatin1 } from '../binary/transcode.js'

export default function decrypt({
  ciphertext,
  key,
}: Record<'ciphertext' | 'key', string>): string {
  return transcode(
    transcrypt({
      key: fromLatin1(key).toUInt8Array(),
      text: fromHex(ciphertext).toUInt8Array(),
    })
  ).toLatin1()
}
