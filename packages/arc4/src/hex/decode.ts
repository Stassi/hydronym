export default function decode(hex: string): Uint8Array {
  return Uint8Array.from(Buffer.from(hex, 'hex'))
}
