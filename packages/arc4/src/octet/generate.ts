import { length } from '../array/length.js'
import schedule from '../schedule/schedule.js'
import swapIndices from './swapIndices.js'

export default function generate({
  count,
  key,
}: {
  count: number
  key: string
}): Uint8Array {
  let i = 0
  let j = 0
  let s = schedule(key)
  let k: Uint8Array = Uint8Array.from([])

  while (count !== length(k)) {
    i = (i + 1) % 256
    j = (j + s[i]) % 256
    s = swapIndices(s, i, j)
    k = Uint8Array.from([...k, s[(s[i] + s[j]) % 256]])
  }

  return k
}
