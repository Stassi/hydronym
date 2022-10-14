import not from '../logic/negate.js'
import round from './round.js'
import { strictEquals } from '../logic/strictEquality.js'
import useState from '../state/useState.js'

const strictEqualsZero: (n: number) => boolean = strictEquals(0)

export default function keystream({
  count,
  key,
}: {
  count: number
  key: Uint8Array
}): Uint8Array {
  if (strictEqualsZero(count)) return Uint8Array.from([])

  const { get: getRound, set: setRound } = useState(round({ count, key }))

  while (not(getRound().state.complete)) {
    setRound(getRound().next())
  }

  return getRound().state.k
}
