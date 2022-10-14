import not from '../logic/negate.js'
import round from './round.js'
import useState from '../state/useState.js'

export default function schedule(key: Uint8Array): Uint8Array {
  const { get: getRound, set: setRound } = useState(round(key))

  while (not(getRound().state.complete)) {
    setRound(getRound().next())
  }

  return getRound().state.s
}
