import { createEffect } from './signal'
import type { G, NodeValue } from './types'

function toString(val: Exclude<NodeValue, HTMLElement>) {
  return String(val)
}

export function h(
  comp: string,
  props?: Record<string, string> | null,
  children?: NodeValue | G<NodeValue> | (NodeValue | G<NodeValue>)[] | null,
) {
  const el = document.createElement(comp)
  let created = false

  handleProps()
  handleChildren()

  created = true

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

  function handleChild(child: NodeValue | G<NodeValue>, index: number) {
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
        el.childNodes[index].textContent = toString(child)
      else
        el.appendChild(document.createTextNode(toString(child)))
    }
  }

  function handleProps() {
    if (props) {
      for (const [k, v] of Object.entries(props))
        el.setAttribute(k, v)
    }
  }

  return el
}
