export default function divideBy(divisor: number) {
  return (dividend: number): number => dividend % divisor
}
