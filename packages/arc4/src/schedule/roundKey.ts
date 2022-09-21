import { sum } from '../arithmetic/addition.js'
import { truncate } from '../octet/maximum.js'

type ScheduleRoundKey = {
  addTo: (...n: number[]) => ScheduleRoundKey
  state: number
}

export default function roundKey(state = 0): ScheduleRoundKey {
  return {
    state,
    addTo: function addTo(...n: number[]): ScheduleRoundKey {
      return roundKey(truncate(sum(state, ...n)))
    },
  }
}
