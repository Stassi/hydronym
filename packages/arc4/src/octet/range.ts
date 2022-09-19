export default function range(end: number): Uint8Array {
  return Uint8Array.from(new Uint8Array(end).keys())
}
