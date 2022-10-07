import { divideBy } from '../arithmetic/division.js'
import { encode as encodeLatin1 } from '../latin1/transcode.js'
import { length } from '../array/length.js'

export default function indexedKey(key: string): (i: number) => number {
  const encoded = encodeLatin1(key),
    divideByLength = divideBy(length(encoded))

  return function atKeyIndex(i: number): number {
    return encoded[divideByLength(i)]
  }
}
