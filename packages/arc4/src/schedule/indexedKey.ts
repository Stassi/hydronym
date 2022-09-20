import encode from '../octet/encode.js'
import { divideBy } from '../arithmetic/division.js'
import { length } from '../array/length.js'

export default function indexedKey(key: string): (i: number) => number {
  const decoded = encode(key),
    divideByLength = divideBy(length(decoded))

  return function atKeyIndex(i: number): number {
    return decoded[divideByLength(i)]
  }
}
