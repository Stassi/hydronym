import { describe, expect, it } from '@jest/globals'
import encode from './encode.js'
import { maxUIntOctet } from './maximumOctet.js'

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
    {
      input:
        '\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ',
      expected: [...maxUIntOctet],
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
