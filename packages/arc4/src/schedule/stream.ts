import { permutation } from '../octet/maximum.js'
import swapIndices from '../octet/swapIndices.js'

type ScheduleStream = {
  atIndex: (i: number) => number
  state: Uint8Array
  swapIndices: (x: number, y: number) => ScheduleStream
}

export default function stream(state: Uint8Array = permutation): ScheduleStream {
  return {
    state,
    atIndex: function (i: number): number {
      return state[i]
    },
    swapIndices: function (x: number, y: number): ScheduleStream {
      return stream(swapIndices(state, x, y))
    },
  }
}
