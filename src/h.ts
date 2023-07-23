import { createEffect } from './reactivity'
import type { Attrs, Child, Children } from './types'

export function h(
  comp: string,
  attrs?: Attrs | null,
  children?: Children | null,
) {
  const el = document.createElement(comp)
  let created = false

  // initialize
  handleAttrs()
  handleChildren()
  created = true

  function handleAttrs() {
    if (attrs) {
      for (const [k, v] of Object.entries(attrs)) {
        if (typeof v === 'function')
          createEffect(() => el.setAttribute(k, v()))
        else
          el.setAttribute(k, v)
      }
    }
  }

  function handleChildren() {
    if (children) {
      if (Array.isArray(children)) {
        children.forEach((child, index) => {
          handleChild(child, index)
        })
      }
      else {
        handleChild(children, 0)
      }
    }
  }

  function handleChild(child: Child, index: number) {
    if (typeof child === 'function') {
      createEffect(() => handleChild(child(), index))
    }
    else if (child instanceof HTMLElement) {
      if (created)
        el.childNodes[index].replaceWith(child)
      else
        el.appendChild(child)
    }
    else {
      if (created)
        el.childNodes[index].textContent = String(child)
      else
        el.appendChild(document.createTextNode(String(child)))
    }
  }

  return el
}
