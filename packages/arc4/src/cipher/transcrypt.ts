import keystream from '../keystream/keystream.js'
import { length } from '../array/length.js'
import { exclusive as xor } from '../logic/disjunction.js'

export default function transcrypt({
  key,
  text,
}: Record<'key' | 'text', Uint8Array>): Uint8Array {
  const k: Uint8Array = keystream({ key, count: length(text) })

  return text.map((n: number, index: number) => xor(n, k[index]))
}
