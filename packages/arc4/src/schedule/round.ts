import { divideBy } from '../arithmetic/division.js'
import indexedKey from './indexedKey.js'
import { length } from '../array/length.js'
import swapIndices from '../octet/swapIndices.js'
import { increment, sum } from '../arithmetic/addition.js'
import {
  permutation,
  strictEquals as strictEqualsMaxOctet,
  truncate as truncateMaxOctet,
} from '../octet/maximum.js'

const DEFAULT_NUMBER = 0

type ScheduleRoundState = {
  i: number
  j: number
  phase: number
  s: Uint8Array
}

type ScheduleRound = {
  isComplete: () => boolean
  next: () => ScheduleRound
  state: ScheduleRoundState
}

export default function round(
  key: string,
  atKeyIndex = indexedKey(key),
  state: ScheduleRoundState = {
    i: DEFAULT_NUMBER,
    j: DEFAULT_NUMBER,
    phase: DEFAULT_NUMBER,
    s: permutation,
  }
): ScheduleRound {
  const { i, j, phase, s } = state,
    mutators: (() => Partial<ScheduleRoundState>)[] = [
      () => ({
        j: truncateMaxOctet(sum(j, s[i], atKeyIndex(i))),
      }),
      () => ({
        s: swapIndices(s, i, j),
      }),
      () => ({
        i: increment(i),
      }),
    ],
    truncateMutators: (dividend: number) => number = divideBy(length(mutators))

  return {
    state,
    isComplete(): boolean {
      return strictEqualsMaxOctet(i)
    },
    next(): ScheduleRound {
      return round(key, atKeyIndex, {
        ...state,
        ...mutators[phase](),
        phase: truncateMutators(increment(phase)),
      })
    },
  }
}
