import { Buffer } from 'node:buffer'

type Encoding = 'hex' | 'latin1'

export default function transcode(
  param: number[] | Uint8Array | { encoding: Encoding; text: string }
): {
  toArray(): number[]
  toHex(): string
  toLatin1(): string
  toUInt8Array(): Uint8Array
} {
  const paramIsArray = Array.isArray(param),
    paramIsString = 'encoding' in param && 'text' in param,
    paramIsUInt8 = !(paramIsArray || paramIsString),
    toString = (encoding: Encoding) => (): string =>
      (paramIsUInt8 || paramIsArray
        ? Buffer.from(param)
        : Buffer.from(param.text, param.encoding)
      ).toString(encoding)

  return {
    toHex: toString('hex'),
    toLatin1: toString('latin1'),
    toArray(): number[] {
      return paramIsUInt8
        ? [...param]
        : paramIsArray
        ? param
        : [...Buffer.from(param.text, param.encoding)]
    },
    toUInt8Array(): Uint8Array {
      return paramIsUInt8
        ? param
        : Uint8Array.from(
            paramIsArray ? param : Buffer.from(param.text, param.encoding)
          )
    },
  }
}
