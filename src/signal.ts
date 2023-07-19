import type { Effect, G, S } from './types'

let activeEffect: Effect | null = null

export function createEffect(fn: () => void) {
  const parentEffect = activeEffect
  const effect: Effect = { fn }
  activeEffect = effect
  fn()
  activeEffect = parentEffect
}

export function createSignal<T>(val: T): [getter: G<T>, setter: S<T>] {
  const effects = new Set<Effect>()

  return [
    () => {
      if (activeEffect)
        effects.add(activeEffect)
      return val
    },
    (newVal: T) => {
      val = newVal
      for (const effect of effects)
        effect.fn()
    },
  ]
}
