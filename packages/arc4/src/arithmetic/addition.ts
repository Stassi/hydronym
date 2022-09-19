function add(a: number, b: number) {
  return a + b
}

function addTo(a: number) {
  return (b: number) => add(a, b)
}

export const increment = addTo(1)

export function sum(...n: number[]): number {
  return n.reduce(add)
}
