import { subtract } from '../arithmetic/subtraction.js'

export default function sortAscending(n: number[]): number[] {
  return n.sort(subtract)
}
