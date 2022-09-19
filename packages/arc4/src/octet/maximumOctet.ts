import { divideBy } from '../arithmetic/division.js'
import range from './range.js'

const MAX_OCTET = 256

export const maxUIntOctet: Uint8Array = range(MAX_OCTET)

export const divideByMaxOctet: (dividend: number) => number =
  divideBy(MAX_OCTET)
