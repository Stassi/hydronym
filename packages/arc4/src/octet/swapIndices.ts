import { increment } from '../arithmetic/addition.js'
import { ascending as sortAscending } from '../array/sort.js'
import strictEquality from '../logic/strictEquality.js'

export default function swapIndices(
  o: Uint8Array,
  x: number,
  y: number
): Uint8Array {
  if (strictEquality(x, y)) return o

  const [lowIndex, highIndex] = sortAscending([x, y])

  return Uint8Array.from([
    ...o.subarray(0, lowIndex),
    o[highIndex],
    ...o.subarray(increment(lowIndex), highIndex),
    o[lowIndex],
    ...o.subarray(increment(highIndex)),
  ])
}
