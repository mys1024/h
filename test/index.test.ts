import { describe, expect, it } from 'vitest'
import { createEffect, createSignal } from '../src/index'

describe('signal', () => {
  it('set and get', async () => {
    const [cnt, setCnt] = createSignal(0)
    expect(cnt()).toBe(0)
    setCnt(cnt() + 10)
    expect(cnt()).toBe(10)
  })
})

describe('effect', () => {
  it('tracking', async () => {
    const [cnt, setCnt] = createSignal(1)
    let sum = 0
    createEffect(() => {
      sum += cnt()
    })
    setCnt(2)
    expect(sum).toBe(3)
  })
})
