import { describe, expect, it } from '@jest/globals'
import decode from './decode.js'
import { maxUIntOctet } from './maximumOctet.js'

describe('decode', () => {
  describe.each([
    {
      input: [75, 101, 121],
      expected: 'Key',
    },
    {
      input: [87, 105, 107, 105],
      expected: 'Wiki',
    },
    {
      input: [83, 101, 99, 114, 101, 116],
      expected: 'Secret',
    },
    {
      input: [...maxUIntOctet],
      expected:
        '\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ',
    },
  ])(
    'input: $input',
    ({ input, expected }: { input: number[]; expected: string }) => {
      it('should convert octets to strings', () => {
        expect(decode(Uint8Array.from(input))).toStrictEqual(expected)
      })
    }
  )
})
