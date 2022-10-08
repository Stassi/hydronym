import { describe, expect, it } from '@jest/globals'
import { permutation } from '../octet/maximum.js'
import encode from './encode.js'

describe('hexadecimal encoder', () => {
  describe.each([
    {
      latin1: 'Key',
      octets: [0x4b, 0x65, 0x79],
      hex: '4b6579',
    },
    {
      latin1: 'Wiki',
      octets: [0x57, 0x69, 0x6b, 0x69],
      hex: '57696b69',
    },
    {
      latin1: 'Secret',
      octets: [0x53, 0x65, 0x63, 0x72, 0x65, 0x74],
      hex: '536563726574',
    },
    {
      latin1:
        '\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ',
      octets: [...permutation],
      hex: '000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f202122232425262728292a2b2c2d2e2f303132333435363738393a3b3c3d3e3f404142434445464748494a4b4c4d4e4f505152535455565758595a5b5c5d5e5f606162636465666768696a6b6c6d6e6f707172737475767778797a7b7c7d7e7f808182838485868788898a8b8c8d8e8f909192939495969798999a9b9c9d9e9fa0a1a2a3a4a5a6a7a8a9aaabacadaeafb0b1b2b3b4b5b6b7b8b9babbbcbdbebfc0c1c2c3c4c5c6c7c8c9cacbcccdcecfd0d1d2d3d4d5d6d7d8d9dadbdcdddedfe0e1e2e3e4e5e6e7e8e9eaebecedeeeff0f1f2f3f4f5f6f7f8f9fafbfcfdfeff',
    },
  ])(
    'input: "$latin1"',
    ({
      hex,
      latin1,
      octets,
    }: {
      octets: number[]
    } & Record<'hex' | 'latin1', string>) => {
      describe('encode', () => {
        it('should convert Latin-1 (ISO-8859) to a hex string', () => {
          expect(encode(latin1)).toBe(hex)
        })

        it('should convert numbers to a hex string', () => {
          expect(encode(octets)).toBe(hex)
        })

        it('should convert octets to a hex string', () => {
          expect(encode(Uint8Array.from(octets))).toBe(hex)
        })
      })
    }
  )
})
