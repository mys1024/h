/**
 * Getter.
 */
export type G<T> = () => T

/**
 * Setter.
 */
export type S<T> = (newVal: T) => void

/**
 * Value or getter.
 */
export type VG<T> = T | G<T>

/**
 * Signal.
 */
export type Signal<T> = [getter: G<T>, setter: S<T>]

/**
 * Effect.
 */
export interface Effect {
  fn: () => void
}

/**
 * Computer.
 */
export interface Computer {
  getters: Set<G<unknown>>
}

/**
 * HTMLElement's attributes.
 */
export type Attrs = Record<string, VG<string>>

/**
 * HTMLElement's child.
 */
export type Child = VG<HTMLElement | string | number | boolean>

/**
 * HTMLElement's children.
 */
export type Children = Child | Child[]

/**
 * Component.
 */
export type Component = () => HTMLElement
