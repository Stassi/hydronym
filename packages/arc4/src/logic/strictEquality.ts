export default function strictEquality(a: number, b: number) {
  return a === b
}

export function strictEquals(a: number) {
  return (b: number): boolean => strictEquality(a, b)
}
