import { forEachMaxUIntOctet } from '../octet/maximumOctet.js'
import indexedKey from './indexedKey.js'
import roundKey from './roundKey.js'
import stream from './stream.js'
import useState from '../state/useState.js'

export default function schedule(key: string): Uint8Array {
  const atKeyIndex = indexedKey(key),
    { get: getRoundKey, set: setRoundKey } = useState(roundKey()),
    { get: getStream, set: setStream } = useState(stream())

  forEachMaxUIntOctet((i: number): void => {
    setRoundKey(getRoundKey().addTo(atKeyIndex(i), getStream().atIndex(i)))
    setStream(getStream().swapIndices(i, getRoundKey().state))
  })

  return getStream().state
}
