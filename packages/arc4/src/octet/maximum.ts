import { divideBy } from '../arithmetic/division.js'
import range from './range.js'

const MAX_OCTET = 256

export const truncate: (dividend: number) => number = divideBy(MAX_OCTET)

export const permutation: Uint8Array = range(MAX_OCTET)

export function forEachPermutation(x: (i: number) => void): void {
  permutation.forEach(x)
}
