'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, X, Maximize2, Download } from 'lucide-react'
import { useOutsideClick } from '@/hooks/use-outside-click'

type Props = {
  photos: string[]          // URLs ya resueltas desde fetch (lh3 de Drive, etc.)
  open: boolean
  onClose: () => void
  title?: string
}

/* =========================================================
   Helpers: Drive fallbacks y proxys
   ========================================================= */

function getDriveId(url?: string): string | null {
  if (!url) return null
  return (
    url.match(/\/d\/([a-zA-Z0-9_-]+)/)?.[1] || // lh3.googleusercontent.com/d/<ID>
    url.match(/[?&]id=([a-zA-Z0-9_-]+)/)?.[1] || // ...id=<ID>
    url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)?.[1] || // drive/file/d/<ID>...
    null
  )
}

function uniq<T>(arr: T[]) {
  return Array.from(new Set(arr))
}

/** Para cada foto arma una lista de alternativas razonables */
function buildCandidates(u?: string): string[] {
  if (!u) return []

  const list: string[] = [u]

  // Si tenemos ID de drive, añadimos variantes útiles
  const id = getDriveId(u)
  if (id) {
    list.push(
      `https://lh3.googleusercontent.com/d/${id}=s1600`,
      `https://drive.google.com/uc?export=download&id=${id}`,
      `https://drive.google.com/thumbnail?id=${id}&sz=w1600`,
      `https://drive.google.com/uc?export=view&id=${id}`,
    )
  }

  // Proxy de último recurso (evita bloqueos de hotlink/Referer)
  try {
    const url = new URL(u)
    const raw = `${url.host}${url.pathname}${url.search}`
    list.push(`https://images.weserv.nl/?url=${encodeURIComponent(raw)}`)
  } catch {
    // ignorar si no es URL válida
  }

  return uniq(list).filter(Boolean)
}

/* =========================================================
   Componente
   ========================================================= */

export default function GalleryGrid({ photos, open, onClose, title = 'Galería' }: Props) {
  const modalRef = useRef<HTMLDivElement>(null)
  useOutsideClick(modalRef, () => onClose())

  // Candidatos por imagen
  const candidates = useMemo(() => photos.map((p) => buildCandidates(p)), [photos])

  // Estado de fallback por cada foto
  const [candIdx, setCandIdx] = useState<number[]>(() => candidates.map(() => 0))
  useEffect(() => {
    setCandIdx(candidates.map(() => 0))
  }, [candidates])

  // Lightbox
  const [lbOpen, setLbOpen] = useState(false)
  const [idx, setIdx] = useState(0)

  const openLbAt = useCallback((i: number) => {
    setIdx(i)
    setLbOpen(true)
  }, [])

  const closeLb = useCallback(() => setLbOpen(false), [])

  const next = useCallback(() => {
    setIdx((i) => (i + 1) % photos.length)
  }, [photos.length])

  const prev = useCallback(() => {
    setIdx((i) => (i - 1 + photos.length) % photos.length)
  }, [photos.length])

  // Bloquear scroll de body mientras el modal o lightbox están abiertos
  useEffect(() => {
    const lock = open || lbOpen
    document.body.style.overflow = lock ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [open, lbOpen])

  // Teclas: ESC cierra, flechas navegan
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lbOpen) closeLb()
        else onClose()
      } else if (lbOpen && e.key === 'ArrowRight') next()
      else if (lbOpen && e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, lbOpen, closeLb, onClose, next, prev])

  // Preload siguiente/anterior en lightbox (suave)
  useEffect(() => {
    if (!lbOpen || photos.length < 2) return
    const preload = (i: number) => {
      const src = candidates[i]?.[0]
      if (!src) return
      const img = new Image()
      img.src = src
    }
    preload((idx + 1) % photos.length)
    preload((idx - 1 + photos.length) % photos.length)
  }, [idx, lbOpen, photos.length, candidates])

  // Activo lightbox
  const activeCandList = candidates[idx] || []
  const activeCandIdx = candIdx[idx] ?? 0
  const activeSrc = activeCandList[activeCandIdx]

  // Si no hay fotos, render vacío amable
  if (open && photos.length === 0) {
    return (
      <AnimatePresence>
        <div className="fixed inset-0 z-[70]">
          <motion.div
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            ref={modalRef}
            className="relative z-[71] mx-auto w-full max-w-3xl h-[60vh] mt-[10vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center justify-center p-8 text-center"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
          >
            <div className="text-lg font-semibold mb-2">{title}</div>
            <p className="text-gray-600">Este negocio aún no tiene fotos disponibles.</p>
            <button
              onClick={onClose}
              className="mt-6 inline-flex items-center gap-2 rounded-lg px-4 py-2 bg-black/5 hover:bg-black/10"
            >
              <X size={16} /> Cerrar
            </button>
          </motion.div>
        </div>
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70]" aria-modal="true" role="dialog">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Contenedor */}
          <motion.div
            ref={modalRef}
            className="relative z-[71] mx-auto w-full max-w-6xl h-[92vh] mt-[4vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header sticky */}
            <div className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b">
              <div className="flex items-center justify-between px-4 py-3">
                <div className="font-semibold">
                  {title} <span className="text-gray-500">({photos.length})</span>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-full p-2 hover:bg-black/5"
                  aria-label="Cerrar galería"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Grid tipo Pinterest */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              <div className="columns-1 sm:columns-2 md:columns-3 gap-4 [column-fill:_balance]">
                {photos.map((_, i) => {
                  const currentIdx = candIdx[i] ?? 0
                  const primary = candidates[i][currentIdx] || candidates[i][0]
                  return (
                    <div key={i} className="relative mb-4 break-inside-avoid group">
                      <img
                        src={primary}
                        alt={`Foto ${i + 1}`}
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        referrerPolicy="no-referrer"
                        crossOrigin="anonymous"
                        className="w-full h-auto rounded-lg object-cover shadow-sm transition-transform duration-200 group-hover:scale-[1.01] cursor-zoom-in"
                        onClick={() => openLbAt(i)}
                        onError={(e) => {
                          setCandIdx((prev) => {
                            const next = [...prev]
                            const nextIndex = (next[i] ?? 0) + 1
                            next[i] = nextIndex
                            const altSrc = candidates[i][nextIndex]
                            if (altSrc) {
                              e.currentTarget.src = altSrc
                            } else {
                              // si ya no hay alternativas, ocultamos la tarjeta rota
                              e.currentTarget.style.display = 'none'
                            }
                            return next
                          })
                        }}
                      />

                      {/* Overlay hover con icono */}
                      <div
                        className="pointer-events-none absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity bg-black/20"
                        aria-hidden="true"
                      />
                      <div className="pointer-events-none absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-black/60 text-white rounded-full p-2">
                          <Maximize2 size={16} />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Lightbox */}
          <AnimatePresence>
            {lbOpen && activeSrc && (
              <div
                className="fixed inset-0 z-[80] bg-black/80 flex items-center justify-center p-4"
                onClick={closeLb}
              >
                <div
                  className="relative max-w-6xl w-full max-h-[90vh] flex items-center justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Zonas invisibles para navegar por clic lateral */}
                  {photos.length > 1 && (
                    <>
                      <button
                        onClick={prev}
                        className="absolute left-0 top-0 h-full w-1/3 cursor-w-resize bg-transparent"
                        aria-label="Anterior"
                      />
                      <button
                        onClick={next}
                        className="absolute right-0 top-0 h-full w-1/3 cursor-e-resize bg-transparent"
                        aria-label="Siguiente"
                      />
                    </>
                  )}

                  <img
                    src={activeSrc}
                    alt={`Imagen ampliada ${idx + 1}`}
                    className="max-h-[90vh] w-auto object-contain rounded-lg shadow-xl"
                    loading="eager"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    onError={() => {
                      setCandIdx((prev) => {
                        const next = [...prev]
                        next[idx] = (next[idx] ?? 0) + 1
                        return next
                      })
                    }}
                  />

                  {/* Controles */}
                  <div className="absolute top-2 left-2 text-xs px-2 py-1 rounded bg-black/60 text-white">
                    {idx + 1} / {photos.length}
                  </div>
                  <div className="absolute top-2 right-2 flex items-center gap-2">
                    {/* Descarga/abrir original (la primera url declarada por fila) */}
                    <a
                      href={photos[idx]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-full"
                      aria-label="Abrir original"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Download size={16} />
                    </a>
                    <button
                      onClick={closeLb}
                      className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-full"
                      aria-label="Cerrar"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Flechas visibles */}
                  {photos.length > 1 && (
                    <>
                      <button
                        onClick={prev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full"
                        aria-label="Anterior"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={next}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full"
                        aria-label="Siguiente"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  )
}
