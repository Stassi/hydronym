import { Buffer } from 'node:buffer'

const LATIN_1 = 'latin1'

export function decode(o: Uint8Array): string {
  return Buffer.from(o).toString(LATIN_1)
}

export function encode(s: string): Uint8Array {
  return Uint8Array.from(Buffer.from(s, LATIN_1))
}
