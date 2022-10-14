import { divideBy } from '../arithmetic/division.js'
import { length } from '../array/length.js'

export default function indexedKey(key: Uint8Array): (i: number) => number {
  const divideByLength = divideBy(length(key))

  return function atKeyIndex(i: number): number {
    return key[divideByLength(i)]
  }
}
