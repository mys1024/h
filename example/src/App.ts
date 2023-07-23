import { createSignal, h } from '../../src/index'

import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'

function Counter() {
  const [cnt, setCnt] = createSignal(0)
  const el = h('button', { id: 'counter', type: 'button', class: () => `cnt-${cnt()}` }, cnt)
  el.addEventListener('click', () => setCnt(cnt() + 1))
  return el
}

export default function App() {
  return h('div', { id: 'app' }, [
    h('a', { href: 'https://vitejs.dev', target: '_blank' }, [
      h('img', { src: viteLogo, class: 'logo', alt: 'Vite logo' }),
    ]),
    h('a', { href: 'https://www.typescriptlang.org/', target: '_blank' }, [
      h('img', { src: typescriptLogo, class: 'logo vanilla', alt: 'TypeScript logo' }),
    ]),
    h('h1', null, 'Vite + TypeScript'),
    h('div', { class: 'card' }, Counter()),
    h('p', { class: 'read-the-docs' }, 'Click on the Vite and TypeScript logos to learn more'),
  ])
}
