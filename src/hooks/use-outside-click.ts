'use client'

import * as React from 'react'

type AnyEl = HTMLElement
type RefOne<T extends AnyEl> = React.RefObject<T>
type RefMany<T extends AnyEl> = Array<RefOne<T>>
type RefInput<T extends AnyEl> = RefOne<T> | RefMany<T>

function toArray<T extends AnyEl>(refOrRefs: RefInput<T>): RefMany<T> {
  return Array.isArray(refOrRefs) ? refOrRefs : [refOrRefs]
}

/**
 * Llama `callback` cuando se hace click/tap fuera de todos los `ref`s.
 * Usa `pointerdown` para evitar dobles eventos (mousedown + touchstart).
 */
export function useOutsideClick<T extends AnyEl>(
  refOrRefs: RefInput<T>,
  callback: (e: PointerEvent) => void
) {
  React.useEffect(() => {
    const refs = toArray(refOrRefs)

    const handler = (event: PointerEvent) => {
      const target = event.target as Node | null
      if (!target) return

      const clickedInside = refs.some((r) => {
        const el = r.current
        return el ? el.contains(target) : false
      })
      if (clickedInside) return

      callback(event)
    }

    // pointerdown: captura antes que onClick y evita duplicados
    document.addEventListener('pointerdown', handler, { passive: true })

    return () => {
      document.removeEventListener('pointerdown', handler)
    }
  }, [refOrRefs, callback])
}
