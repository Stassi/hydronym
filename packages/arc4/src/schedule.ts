import divideBy from './arithmetic/divideBy.js'
import octetKey from './octet/key.js'
import range from './octet/range.js'
import { sum } from './arithmetic/addition.js'
import swapIndices from './octet/swapIndices.js'

const MAX_OCTET = 256,
  divideByMaxOctet = divideBy(MAX_OCTET),
  maxUIntOctet = range(MAX_OCTET)

export default function schedule(key: string): Uint8Array {
  const k = octetKey(key),
    { length: keyLength } = k,
    divideByKeyLength = divideBy(keyLength)

  let j = 0,
    s: Uint8Array = maxUIntOctet

  maxUIntOctet.forEach((i: number) => {
    j = divideByMaxOctet(sum(j, s[i], k[divideByKeyLength(i)]))
    s = swapIndices(s, i, j)
  })

  return s
}
