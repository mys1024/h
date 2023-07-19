export type G<T> = () => T
export type S<T> = (newVal: T) => void

export interface Effect {
  fn: () => void
}

export type NodeValue = HTMLElement | string | number | boolean
