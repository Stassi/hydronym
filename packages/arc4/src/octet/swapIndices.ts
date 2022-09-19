import { increment } from '../arithmetic/addition.js'
import sortAscending from '../array/sortAscending.js'

export default function swapIndices(
  o: Uint8Array,
  x: number,
  y: number
): Uint8Array {
  const [lowIndex, highIndex] = sortAscending([x, y])

  return Uint8Array.from([
    ...o.subarray(0, lowIndex),
    o[highIndex],
    ...o.subarray(increment(lowIndex), highIndex),
    o[lowIndex],
    ...o.subarray(increment(highIndex)),
  ])
}
