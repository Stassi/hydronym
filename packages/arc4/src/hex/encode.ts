export default function encode(
  s: string | Uint8Array | readonly number[]
): string {
  return (
    typeof s === 'string' ? Buffer.from(s, 'latin1') : Buffer.from(s)
  ).toString('hex')
}
