import { subtract } from '../arithmetic/subtraction.js'

export function ascending(n: number[]): number[] {
  return n.sort(subtract)
}
