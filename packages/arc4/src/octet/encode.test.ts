import { describe, expect, it } from '@jest/globals'
import encode from './encode.js'

describe('encode', () => {
  describe.each([
    {
      input: 'Key',
      expected: [75, 101, 121],
    },
    {
      input: 'Wiki',
      expected: [87, 105, 107, 105],
    },
    {
      input: 'Secret',
      expected: [83, 101, 99, 114, 101, 116],
    },
  ])(
    'input: $input',
    ({ input, expected }: { input: string; expected: number[] }) => {
      it('should convert strings to octets', () => {
        expect([...encode(input)]).toStrictEqual(expected)
      })
    }
  )
})
