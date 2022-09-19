import { divideBy } from '../arithmetic/division.js'
import { length } from '../array/length.js'
import octetKey from '../octet/key.js'

export function indexedKey(key: string): (i: number) => number {
  const state = octetKey(key),
    divideByLength = divideBy(length(state))

  return function atKeyIndex(i: number): number {
    return state[divideByLength(i)]
  }
}
