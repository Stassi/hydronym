import { divideBy } from './arithmetic/division.js'
import { length } from './array/length.js'
import octetKey from './octet/key.js'
import { sum } from './arithmetic/addition.js'
import swapIndices from './octet/swapIndices.js'
import { divideByMaxOctet, maxUIntOctet } from './octet/maximumOctet.js'

export default function schedule(key: string): Uint8Array {
  const k = octetKey(key),
    divideByKeyLength = divideBy(length(k))

  let j = 0,
    s: Uint8Array = maxUIntOctet

  maxUIntOctet.forEach((i: number) => {
    j = divideByMaxOctet(sum(j, s[i], k[divideByKeyLength(i)]))
    s = swapIndices(s, i, j)
  })

  return s
}
