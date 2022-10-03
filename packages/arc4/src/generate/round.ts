import { divideBy } from '../arithmetic/division.js'
import { length } from '../array/length.js'
import schedule from '../schedule/schedule.js'
import strictEquality from '../logic/strictEquality.js'
import swapIndices from '../octet/swapIndices.js'
import { truncate as truncateMaxOctet } from '../octet/maximum.js'
import { add, increment } from '../arithmetic/addition.js'

type GeneratorRoundState = {
  complete: boolean
} & Record<'i' | 'j' | 'subRound', number> &
  Record<'k' | 's', Uint8Array>

type GeneratorRound = {
  next: () => GeneratorRound
  state: GeneratorRoundState
}

const DEFAULT_NUMBER = 0

export default function round(
  {
    count,
    key,
  }: {
    count: number
    key: string
  },
  state: GeneratorRoundState = {
    complete: false,
    i: DEFAULT_NUMBER,
    j: DEFAULT_NUMBER,
    k: Uint8Array.from([]),
    s: schedule(key),
    subRound: DEFAULT_NUMBER,
  }
): GeneratorRound {
  const { i, j, k, s, subRound } = state,
    mutators: (() => Partial<GeneratorRoundState>)[] = [
      () => ({
        i: truncateMaxOctet(increment(i)),
      }),
      () => ({
        j: truncateMaxOctet(add(j, s[i])),
      }),
      () => ({
        s: swapIndices(s, i, j),
      }),
      () => ({
        k: Uint8Array.from([...k, s[truncateMaxOctet(add(s[i], s[j]))]]),
      }),
    ],
    mutatorsLength = length(mutators),
    truncateMutators: (dividend: number) => number = divideBy(mutatorsLength)

  return {
    state,
    next(): GeneratorRound {
      return round(
        { count, key },
        {
          ...state,
          ...mutators[subRound](),
          complete: strictEquality(count, length(k)),
          subRound: truncateMutators(increment(subRound)),
        }
      )
    },
  }
}
