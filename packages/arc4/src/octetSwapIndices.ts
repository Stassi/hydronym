import increment from './increment.js'

export default function octetSwapIndices(
  o: Uint8Array,
  x: number,
  y: number
): Uint8Array {
  const [lowIndex, highIndex] = [...[x, y]].sort(
    (a: number, b: number) => a - b
  )

  return Uint8Array.from([
    ...o.subarray(0, lowIndex),
    o[highIndex],
    ...o.subarray(increment(lowIndex), highIndex),
    o[lowIndex],
    ...o.subarray(increment(highIndex)),
  ])
}
