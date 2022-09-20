import { divideBy } from '../arithmetic/division.js'
import { encode } from '../octet/transcode.js'
import { length } from '../array/length.js'

export default function indexedKey(key: string): (i: number) => number {
  const encoded = encode(key),
    divideByLength = divideBy(length(encoded))

  return function atKeyIndex(i: number): number {
    return encoded[divideByLength(i)]
  }
}
