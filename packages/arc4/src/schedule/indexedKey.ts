import decodeKey from '../octet/decodeKey.js'
import { divideBy } from '../arithmetic/division.js'
import { length } from '../array/length.js'

export default function indexedKey(key: string): (i: number) => number {
  const decoded = decodeKey(key),
    divideByLength = divideBy(length(decoded))

  return function atKeyIndex(i: number): number {
    return decoded[divideByLength(i)]
  }
}
