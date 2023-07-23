import type { Computer, Effect, G, Signal, VG } from './types'

let activeEffect: Effect | undefined
let activeComputer: Computer | undefined

export function createSignal<T>(val: T): Signal<T> {
  const effects = new Set<Effect>()

  const getter = () => {
    if (activeEffect)
      effects.add(activeEffect)
    if (activeComputer)
      activeComputer.getters.add(getter)
    return val
  }

  const setter = (newVal: T) => {
    val = newVal
    for (const effect of effects)
      effect.fn()
  }

  return [getter, setter]
}

export function createEffect(fn: () => void): Effect {
  const parentEffect = activeEffect
  const effect: Effect = { fn }

  activeEffect = effect
  fn()
  activeEffect = parentEffect

  return effect
}

export function compute<T>(vg: VG<T>) {
  const isGetter = typeof vg === 'function'
  return isGetter ? (vg as G<T>)() : vg
}

export function computeMore<T>(vg: VG<T>) {
  const isGetter = typeof vg === 'function'
  let value: T
  let signalCount = 0

  if (isGetter) {
    const parentComputer = activeComputer
    activeComputer = { getters: new Set() }
    value = (vg as G<T>)()
    signalCount = activeComputer.getters.size
    activeComputer = parentComputer
  }
  else {
    value = vg
  }

  return {
    value,
    isGetter,
    signalCount,
  }
}
