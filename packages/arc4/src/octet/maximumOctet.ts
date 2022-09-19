import { divideBy } from '../arithmetic/division.js'
import range from './range.js'

const MAX_OCTET = 256

export const maxUIntOctet: Uint8Array = range(MAX_OCTET)

export const divideByMaxOctet: (dividend: number) => number =
  divideBy(MAX_OCTET)

export function forEachMaxUIntOctet(x: (i: number) => void): void {
  maxUIntOctet.forEach(x)
}
