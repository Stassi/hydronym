import not from '../logic/negate.js'
import round from './round.js'
import useState from '../state/useState.js'

export default function keystream({
  count,
  key,
}: {
  count: number
  key: Uint8Array
}): Uint8Array {
  if (count < 1) throw new RangeError('Count must exceed 0')

  const { get: getRound, set: setRound } = useState(round({ count, key }))

  while (not(getRound().state.complete)) {
    setRound(getRound().next())
  }

  return getRound().state.k
}
