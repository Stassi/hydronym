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

type ScheduleRoundState = {
  complete: boolean
  s: Uint8Array
} & Record<'i' | 'j' | 'subRound', number>

type ScheduleRound = {
  next: () => ScheduleRound
  state: ScheduleRoundState
}

const DEFAULT_NUMBER = 0

export default function round(
  key: string,
  atKeyIndex = indexedKey(key),
  state: ScheduleRoundState = {
    complete: false,
    i: DEFAULT_NUMBER,
    j: DEFAULT_NUMBER,
    s: permutation,
    subRound: DEFAULT_NUMBER,
  }
): ScheduleRound {
  const { i, j, s, subRound } = state,
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
    next(): ScheduleRound {
      return round(key, atKeyIndex, {
        ...state,
        ...mutators[subRound](),
        complete: strictEqualsMaxOctet(i),
        subRound: truncateMutators(increment(subRound)),
      })
    },
  }
}
