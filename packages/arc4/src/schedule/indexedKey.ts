import { divideBy } from '../arithmetic/division.js'
import { length } from '../array/length.js'
import transcode from '../binary/transcode.js'

export default function indexedKey(key: string): (i: number) => number {
  const encoded: Uint8Array = transcode({
      encoding: 'latin1',
      text: key,
    }).toUInt8Array(),
    divideByLength = divideBy(length(encoded))

  return function atKeyIndex(i: number): number {
    return encoded[divideByLength(i)]
  }
}
