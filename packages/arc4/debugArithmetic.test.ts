import { describe, expect, it } from '@jest/globals'
import { multiply } from './debugArithmetic'

describe('terrible multiplication (debug)', () => {
  it('should multiply 1 times 1 to equal 1', () => {
    expect(multiply(1, 1)).toBe(2)
  })
})
