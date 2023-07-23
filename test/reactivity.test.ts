import { describe, expect, it } from 'vitest'
import { compute, computeMore, createEffect, createSignal } from '../src/index'

describe('Reactivity', () => {
  it('signal', async () => {
    const [cnt, setCnt] = createSignal(0)
    expect(cnt()).toBe(0)
    setCnt(cnt() + 10)
    expect(cnt()).toBe(10)
  })

  it('effect', async () => {
    const [cnt, setCnt] = createSignal(1)
    let sum = 0
    createEffect(() => sum += cnt())
    setCnt(2)
    expect(sum).toBe(3)
  })

  it('compute', async () => {
    const [cnt] = createSignal(0)
    expect(compute(cnt)).toBe(0)
    expect(compute(() => cnt() + 64)).toBe(64)
    expect(compute(100)).toBe(100)
  })

  it('computeMore', async () => {
    const [cnt1] = createSignal(0)
    const [cnt2] = createSignal(255)
    expect(computeMore(100)).toEqual({
      value: 100,
      isGetter: false,
      signalCount: 0,
    })
    expect(computeMore(() => 1024)).toEqual({
      value: 1024,
      isGetter: true,
      signalCount: 0,
    })
    expect(computeMore(() => cnt1() + 64)).toEqual({
      value: 64,
      isGetter: true,
      signalCount: 1,
    })
    expect(computeMore(() => cnt1() + cnt1() + cnt2())).toEqual({
      value: 255,
      isGetter: true,
      signalCount: 2,
    })
  })
})
