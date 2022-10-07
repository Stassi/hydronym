import { describe, expect, it } from '@jest/globals'
import { permutation } from '../octet/maximum.js'
import { decode, encode } from './transcode.js'

describe('transcode Latin-1 (ISO-8859)', () => {
  describe.each([
    {
      latin1: 'Key',
      octets: [75, 101, 121],
    },
    {
      latin1: 'Wiki',
      octets: [87, 105, 107, 105],
    },
    {
      latin1: 'Secret',
      octets: [83, 101, 99, 114, 101, 116],
    },
    {
      latin1:
        '\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ',
      octets: [...permutation],
    },
  ])(
    '"$latin1" <=> $octets',
    ({ latin1, octets }: { latin1: string; octets: number[] }) => {
      describe('decode', () => {
        it('should convert octets to a string', () => {
          expect(decode(Uint8Array.from(octets))).toStrictEqual(latin1)
        })
      })

      describe('encode', () => {
        it('should convert a string to octets', () => {
          expect([...encode(latin1)]).toStrictEqual(octets)
        })
      })
    }
  )
})
