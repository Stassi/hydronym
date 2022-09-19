import { forEachMaxUIntOctet } from '../octet/maximumOctet.js'
import indexedKey from './indexedKey.js'
import { roundKey } from './roundKey.js'
import stream from './stream.js'

export default function schedule(key: string): Uint8Array {
  const atKeyIndex: (i: number) => number = indexedKey(key)

  let j = roundKey(),
    s = stream()

  forEachMaxUIntOctet((i: number) => {
    const { addTo: addToRoundKey } = j,
      { atIndex: atStreamIndex, swapIndices: swapStreamIndices } = s

    j = addToRoundKey(atStreamIndex(i), atKeyIndex(i))

    const { state: roundKeyState } = j

    s = swapStreamIndices(i, roundKeyState)
  })

  const { state: streamState } = s
  return streamState
}
