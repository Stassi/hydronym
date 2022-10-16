import transcrypt from './transcrypt.js'
import transcode, { fromLatin1 } from '../binary/transcode.js'

export default function encrypt({
  key,
  plaintext,
}: Record<'key' | 'plaintext', string>): string {
  return transcode(
    transcrypt({
      key: fromLatin1(key).toUInt8Array(),
      text: fromLatin1(plaintext).toUInt8Array(),
    })
  ).toHex()
}
