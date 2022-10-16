import { describe, expect, it } from '@jest/globals'
import { permutation } from '../octet/maximum.js'
import schedule from './schedule.js'
import { ascending as sortAscending } from '../array/sort.js'
import transcode, { fromLatin1 } from '../binary/transcode.js'

describe('schedule', () => {
  describe.each([
    {
      key: 'Key',
      expected:
        '4b33849dc0c81da84af383e4127082905b8fec2229b9cc5cbfd8ba0e6e4d0823bc1b6789b6403b69d7f7ee7e8a1ae3371554684e8771ffac3859bb1c3e202d4124fb9874bd076c2ecaa29f531f9a0be76a0d00d914e566765255b061d69706048ef5863ce1a5032756655a7fc54875922fc32a8064fdaed119ef72dbf4eaa3beb7eb366299797b2628b4b38bcb4605182bc7e0d5d2dcadf11758c44ff23a09498da0c1b513e93f501e516fe2af96cfde1177e660475785c65fa99bd44231cd024c7325c23916dfb2100c5dedf021ce45359e940f7a88a1f6c92cab43b86dfc32aa91958c5eda9cd001814430fea4faa7f87db1a6e8786b63f9dd347c0ad33d93',
    },
    {
      key: 'Wiki',
      expected:
        '8ba02e9a20b15bbcbb1528a149f031c8aeaa35a2ea78c9d88c99f6dded90fc844e85b2e212a771b4afc55aeec2bdca1c4350ab3c51328201650d7cfb9f172b0300392a02473f77955ee65d07f2a80c7f1b48d3e48857be449c531f36e71dda6e34604fa4de22764d088e2410b0ba2fa62793e3ec250468e54b230bfa46cbbf9bb8138f583b70d62ca597611689d9b5d47380d71194593ee087d167d53a54f78ac1fedb725c7bcec3b31ea905df815f069d63264a0e62339845acd0f42d4041e969ff19f9926d180f526474c46f7529cf568d55f3b6dce1e8916a3d796b7a3038661a9eeff8eb0ab9cd6c7d4209fdc7b7147e9637a321f1c0add283f5c64c86cc',
    },
    {
      key: 'Secret',
      expected:
        '2eb51e93263fb871a5207a0e285b4dc30bb2d60818c102c57d22129ca32a1a03dd19b74fcab1077c99faf98196f6cb50c63bfe88ece46e603e2f558ac8985475095ff43143c78706117624e091cc250db9c47bef80dbf3bca70c74d5466dacea42fd5797d24adcf073f551334530c26b922bb6839094a4a6e83841011f1c952c133a37e68248d852bad3beae9d1b174cd4bda1edd1a061fb1d4e68bf9f56a8a2e9408c447faab3e2bb0aeb86cf53def20029344be739c07ece5a152d6c9e69f8b45eda05d9e389628f9a5cad4963f135b01678728dd7673d6f8b360f146aff65df6479321021eec9f77084663caf04278efcd059e1e5478558775dab23cda99b',
    },
  ])('key: "$key"', ({ key, expected }: Record<'expected' | 'key', string>) => {
    const result: Uint8Array = schedule(fromLatin1(key).toUInt8Array())

    it('should return a deterministic octet sequence', () => {
      expect(transcode(result).toHex()).toBe(expected)
    })

    it('should return an unsorted octet identity permutation', () => {
      expect(sortAscending([...result])).toStrictEqual([...permutation])
    })
  })
})
