import indexedKey from './indexedKey.js'
import { sum } from '../arithmetic/addition.js'
import swapIndices from '../octet/swapIndices.js'
import {
  divideByMaxOctet,
  forEachMaxUIntOctet,
  maxUIntOctet,
} from '../octet/maximumOctet.js'

export default function schedule(key: string): Uint8Array {
  const atKeyIndex: (i: number) => number = indexedKey(key)

  let j = 0,
    s: Uint8Array = maxUIntOctet

  forEachMaxUIntOctet((i: number) => {
    j = divideByMaxOctet(sum(j, s[i], atKeyIndex(i)))
    s = swapIndices(s, i, j)
  })

  return s
}
