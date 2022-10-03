export function subtract(minuend: number, subtrahend: number): number {
  return minuend - subtrahend
}

export function subtractFrom(subtrahend: number) {
  return (minuend: number): number => subtract(minuend, subtrahend)
}

export const decrement: (minuend: number) => number = subtractFrom(1)
