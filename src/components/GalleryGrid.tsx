'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, X, Maximize2, Download } from 'lucide-react'
import { useOutsideClick } from '@/hooks/use-outside-click'

/** Extrae FILE_ID si es Drive */
function getDriveId(url?: string): string | null {
  if (!url) return null
  return (
    url.match(/\/d\/([a-zA-Z0-9_-]+)/)?.[1] ||
    url.match(/[?&]id=([a-zA-Z0-9_-]+)/)?.[1] ||
    null
  )
}

/** Candidatos robustos (Drive + proxy opcional) */
function buildImageCandidates(photo?: string): string[] {
  const fallback = '/pictures/ic_food.png'
  if (!photo) return [fallback]

  const id = getDriveId(photo)
  if (id) {
    const raw = `lh3.googleusercontent.com/d/${id}=s1600`
    const proxied = `https://images.weserv.nl/?url=${encodeURIComponent(raw)}`
    return [
      `https://${raw}`,
      `https://drive.google.com/uc?export=download&id=${id}`,
      `https://drive.google.com/thumbnail?id=${id}&sz=w1600`,
      `https://drive.google.com/uc?export=view&id=${id}`,
      proxied,
      photo,
      fallback,
    ]
  }

  // No-Drive -> agrega proxy de último recurso
  try {
    const u = new URL(photo)
    const proxied = `https://images.weserv.nl/?url=${encodeURIComponent(`${u.host}${u.pathname}${u.search}`)}`
    return [photo, proxied, fallback]
  } catch {
    return [photo, fallback]
  }
}

interface GalleryGridProps {
  photos: string[]
  open: boolean
  onClose: () => void
}

/** Grid tipo Pinterest + Lightbox */
export default function GalleryGrid({ photos, open, onClose }: GalleryGridProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  // --- Estado lightbox ---
  const [lbOpen, setLbOpen] = useState(false)
  const [idx, setIdx] = useState(0)

  // ⛑️ No cierres el grid por “outside click” mientras el LB esté abierto
  useOutsideClick(modalRef, () => {
    if (lbOpen) return
    onClose()
  })

  // Candidatos por foto (fallbacks)
  const candidates = useMemo(() => photos.map(p => buildImageCandidates(p)), [photos])

  const [candIdx, setCandIdx] = useState<number[]>(() => candidates.map(() => 0))
  useEffect(() => {
    setCandIdx(candidates.map(() => 0))
  }, [candidates]) // <-- dependemos del arreglo completo

  const openLbAt = useCallback((i: number) => {
    setIdx(i)
    setLbOpen(true)
  }, [])
  const closeLb = useCallback(() => setLbOpen(false), [])

  const next = useCallback(
    () => setIdx(i => (i + 1) % photos.length),
    [photos.length]
  )
  const prev = useCallback(
    () => setIdx(i => (i - 1 + photos.length) % photos.length),
    [photos.length]
  )

  // Bloquea scroll cuando hay modal/lightbox
  useEffect(() => {
    const shouldLock = open || lbOpen
    document.body.style.overflow = shouldLock ? 'hidden' : 'auto'
    return () => { document.body.style.overflow = 'auto' }
  }, [open, lbOpen])

  // Teclas: ESC cierra LB (o grid); ←/→ navegan en LB
  useEffect(() => {
    if (!open && !lbOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') lbOpen ? closeLb() : onClose()
      else if (lbOpen && e.key === 'ArrowRight') next()
      else if (lbOpen && e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, lbOpen, next, prev, closeLb, onClose])

  // Preload siguiente/anterior en LB
  useEffect(() => {
    if (!lbOpen) return
    const preload = (i: number) => {
      const src = candidates[i]?.[0]
      if (!src) return
      const img = new Image()
      img.src = src
    }
    preload((idx + 1) % photos.length)
    preload((idx - 1 + photos.length) % photos.length)
  }, [idx, lbOpen, photos.length, candidates]) // <-- incluye candidates

  // Fuente activa LB
  const activeCandList = candidates[idx] || ['/pictures/ic_food.png']
  const activeCandIdx = candIdx[idx] ?? 0
  const activeSrc = activeCandList[activeCandIdx] || '/pictures/ic_food.png'

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70]" aria-modal="true" role="dialog">
          {/* Backdrop del GRID */}
          <motion.div
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !lbOpen && onClose()}
          />

          {/* Contenedor GRID */}
          <motion.div
            ref={modalRef}
            className="relative z-[71] mx-auto w-full max-w-6xl h-[92vh] mt-[4vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
          >
            {/* Header sticky */}
            <div className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b">
              <div className="flex items-center justify-between px-4 py-3">
                <div className="font-semibold">
                  Galería <span className="text-gray-500">({photos.length})</span>
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
                {photos.map((p, i) => {
                  const primary = candidates[i][0] || p
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
                          setCandIdx(prev => {
                            const copy = [...prev]
                            const nextIdx = (copy[i] ?? 0) + 1
                            copy[i] = nextIdx
                            const nextSrc = candidates[i][nextIdx] || '/pictures/ic_food.png'
                            const imgEl = e.currentTarget as HTMLImageElement
                            imgEl.src = nextSrc
                            return copy
                          })
                        }}
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity bg-black/20" />
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
            {lbOpen && (
              <div
                className="fixed inset-0 z-[80] bg-black/80 flex items-center justify-center p-4"
                onClick={closeLb}
              >
                <div
                  className="relative max-w-6xl w-full max-h-[90vh] flex items-center justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Zonas clicables para navegar */}
                  <button
                    onClick={(e) => { e.stopPropagation(); prev() }}
                    className="absolute left-0 top-0 h-full w-1/3 cursor-w-resize bg-transparent"
                    aria-label="Anterior"
                  />
                  <button
                    onClick={(e) => { e.stopPropagation(); next() }}
                    className="absolute right-0 top-0 h-full w-1/3 cursor-e-resize bg-transparent"
                    aria-label="Siguiente"
                  />

                  <img
                    src={activeSrc}
                    alt={`Imagen ampliada ${idx + 1}`}
                    className="max-h-[90vh] w-auto object-contain rounded-lg shadow-xl"
                    loading="eager"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    onError={() => {
                      setCandIdx(prev => {
                        const copy = [...prev]
                        copy[idx] = (copy[idx] ?? 0) + 1
                        return copy
                      })
                    }}
                  />

                  {/* Controles */}
                  <div className="absolute top-2 left-2 text-xs px-2 py-1 rounded bg-black/60 text-white">
                    {idx + 1} / {photos.length}
                  </div>
                  <div className="absolute top-2 right-2 flex items-center gap-2">
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
                      onClick={(e) => { e.stopPropagation(); closeLb() }}
                      className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-full"
                      aria-label="Cerrar"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Botones visibles */}
                  {photos.length > 1 && (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); prev() }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full"
                        aria-label="Anterior"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); next() }}
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
