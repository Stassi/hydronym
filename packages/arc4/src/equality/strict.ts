export default function strict(a: number) {
  return (b: number): boolean => a === b
}
