import { divideBy } from '../arithmetic/division.js'
import range from './range.js'
import { strictEquals as strictEqualsCurried } from '../logic/strictEquality.js'

const MAX_OCTET = 256

export const truncate: (dividend: number) => number = divideBy(MAX_OCTET)

export const permutation: Uint8Array = range(MAX_OCTET)

export const strictEquals: (n: number) => boolean =
  strictEqualsCurried(MAX_OCTET)
