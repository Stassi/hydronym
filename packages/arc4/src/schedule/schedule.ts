import indexedKey from './indexedKey.js'
import stream from './stream.js'
import { sum } from '../arithmetic/addition.js'
import { divideByMaxOctet, forEachMaxUIntOctet } from '../octet/maximumOctet.js'

export default function schedule(key: string): Uint8Array {
  const atKeyIndex: (i: number) => number = indexedKey(key)

  let j = 0,
    s = stream()

  forEachMaxUIntOctet((i: number) => {
    const { atIndex: atStreamIndex, swapIndices: swapStreamIndices } = s

    j = divideByMaxOctet(sum(j, atStreamIndex(i), atKeyIndex(i)))
    s = swapStreamIndices(i, j)
  })

  const { state: streamState } = s
  return streamState
}
