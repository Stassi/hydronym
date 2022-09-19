import { divideByMaxOctet } from '../octet/maximumOctet.js'
import { sum } from '../arithmetic/addition.js'

type ScheduleRoundKey = {
  addTo: (...n: number[]) => ScheduleRoundKey
  state: number
}

export function roundKey(state = 0): ScheduleRoundKey {
  return {
    state,
    addTo: function addTo(...n: number[]): ScheduleRoundKey {
      return roundKey(divideByMaxOctet(sum(state, ...n)))
    },
  }
}
