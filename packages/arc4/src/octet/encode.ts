import { Buffer } from 'node:buffer'

export default function encode(s: string): Uint8Array {
  return Uint8Array.from(Buffer.from(s, 'latin1'))
}
