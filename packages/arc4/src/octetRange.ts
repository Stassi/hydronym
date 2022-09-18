export default function octetRange(end: number): Uint8Array {
  return Uint8Array.from(new Uint8Array(end).keys())
}
