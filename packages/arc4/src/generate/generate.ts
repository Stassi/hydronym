import { length } from '../array/length.js'
import schedule from '../schedule/schedule.js'
import swapIndices from '../octet/swapIndices.js'
import { truncate as truncateMaxOctet } from '../octet/maximum.js'
import { add, increment } from '../arithmetic/addition.js'

export default function generate({
  count,
  key,
}: {
  count: number
  key: string
}): Uint8Array {
  let i = 0
  let j = 0
  let s: Uint8Array = schedule(key)
  let k: Uint8Array = Uint8Array.from([])

  while (count !== length(k)) {
    i = truncateMaxOctet(increment(i))
    j = truncateMaxOctet(add(j, s[i]))
    s = swapIndices(s, i, j)
    k = Uint8Array.from([...k, s[truncateMaxOctet(add(s[i], s[j]))]])
  }

  return k
}
