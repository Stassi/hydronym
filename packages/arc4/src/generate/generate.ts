import not from '../logic/negate.js'
import round from './round.js'
import useState from '../state/useState.js'

export default function generate({
  count,
  key,
}: {
  count: number
  key: string
}): Uint8Array {
  const { get: getRound, set: setRound } = useState(round({ count, key }))

  while (not(getRound().state.complete)) {
    setRound(getRound().next())
  }

  return getRound().state.k
}
