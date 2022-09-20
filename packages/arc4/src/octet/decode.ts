export default function decode(o: Uint8Array): string {
  return Buffer.from(o).toString('latin1')
}
