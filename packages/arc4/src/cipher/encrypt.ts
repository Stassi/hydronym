import { encode as encodeLatin1 } from '../latin1/transcode.js'
import keystream from '../keystream/keystream.js'
import { length } from '../array/length.js'
import { exclusive as xor } from '../logic/disjunction.js'

export default function encrypt({
  key,
  plaintext,
}: Record<'key' | 'plaintext', string>): Uint8Array {
  const p: Uint8Array = encodeLatin1(plaintext),
    k: Uint8Array = keystream({ key, count: length(p) })

  return p.map((n: number, index: number) => xor(n, k[index]))
}
