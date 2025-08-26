'use client'

import { useEffect, useMemo, useState, useCallback } from 'react'
import {
  MapPin, Clock, Phone, Navigation, ExternalLink, Star,
  ChevronLeft, ChevronRight, X, Maximize2
} from 'lucide-react'

interface NegocioData {
  nombre: string
  descripcion: string
  direccion: string
  precios: string
  horario: string
  pagos: string[]
  extras: string[]
  idiomas: string
  especial: string
  phoneDigits: string
  googleMaps: string
  redes: string
  accesible: boolean
  photo?: string
  photos?: string[]     // NUEVO: galería
}

interface Props {
  tituloTag?: string
  image?: string
  rating?: number
  negocio: NegocioData
}

/** Extrae el FILE_ID de un URL de Google Drive en varios formatos */
function getDriveId(url?: string): string | null {
  if (!url) return null
  return (
    url.match(/\/d\/([a-zA-Z0-9_-]+)/)?.[1] ||
    url.match(/[?&]id=([a-zA-Z0-9_-]+)/)?.[1] ||
    null
  )
}

/** Candidatos robustos para una imagen (Drive o no) */
function buildImageCandidates(photo?: string, fallback = '/pictures/ic_food.png'): string[] {
  if (!photo) return [fallback]
  const id = getDriveId(photo)
  if (id) {
    return [
      `https://lh3.googleusercontent.com/d/${id}=s1600`,
      `https://drive.google.com/uc?export=download&id=${id}`,
      `https://drive.google.com/thumbnail?id=${id}&sz=w1600`,
      `https://drive.google.com/uc?export=view&id=${id}`,
      photo,
      fallback,
    ]
  }
  return [photo, fallback]
}

export default function BusinessCard({
  tituloTag = 'Negocio',
  image = '/pictures/ic_food.png',
  rating = 4,
  negocio
}: Props) {
  // Galería efectiva: usa negocio.photos si existen; si no, intenta con photo; si no, placeholder
  const gallery = useMemo<string[]>(
    () => (negocio.photos && negocio.photos.length > 0)
      ? negocio.photos
      : (negocio.photo ? [negocio.photo] : [image]),
    [negocio.photos, negocio.photo, image]
  )

  // Para cada foto, preparamos sus candidatos (para fallbacks)
  const galleryCandidates = useMemo<string[][]>(
    () => gallery.map(p => buildImageCandidates(p, image)),
    [gallery, image]
  )

  // Índices: slide actual y candidato actual por foto
  const [slide, setSlide] = useState(0)
  const [candIdx, setCandIdx] = useState<number[]>(() => galleryCandidates.map(() => 0))

  useEffect(() => {
    // Si cambia el tamaño de la galería, re-sincronizamos
    setSlide(0)
    setCandIdx(galleryCandidates.map(() => 0))
  }, [galleryCandidates.length])

  const activeCandidates = galleryCandidates[slide] || [image]
  const activeIdx = candIdx[slide] ?? 0
  const activeSrc = activeCandidates[activeIdx] || image

  const gotoPrev = () => setSlide(s => (s - 1 + gallery.length) % gallery.length)
  const gotoNext = () => setSlide(s => (s + 1) % gallery.length)

  const chips: string[] = []
  if (negocio.accesible) chips.push('Accesible')
  if (negocio.idiomas)  chips.push(`Idiomas: ${negocio.idiomas}`)

  const pagos  = (negocio.pagos || []).slice(0, 3)
  const extras = (negocio.extras || []).slice(0, 4)

  // === Lightbox ===
  const [open, setOpen] = useState(false)
  const [lightIdx, setLightIdx] = useState(0)

  const openLightbox = () => { setLightIdx(slide); setOpen(true) }
  const closeLightbox = useCallback(() => setOpen(false), [])

  const lightNext = useCallback(
    () => setLightIdx(i => (i + 1) % gallery.length),
    [gallery.length]
  )
  const lightPrev = useCallback(
    () => setLightIdx(i => (i - 1 + gallery.length) % gallery.length),
    [gallery.length]
  )

  const lbCandidates = galleryCandidates[lightIdx] || [image]
  const [lbCandIdx, setLbCandIdx] = useState<number[]>(() => galleryCandidates.map(() => 0))

  useEffect(() => {
    // sincroniza tamaño si cambia la galería
    setLbCandIdx(galleryCandidates.map(() => 0))
  }, [galleryCandidates.length])

  const lbSrc = lbCandidates[lbCandIdx[lightIdx] ?? 0] || image

  // Teclado: Esc / ← / →
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      else if (e.key === 'ArrowRight') lightNext()
      else if (e.key === 'ArrowLeft') lightPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, lightNext, lightPrev, closeLightbox])

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Carrusel */}
      <div className="relative h-48">
        <img
          src={activeSrc}
          alt={`${negocio.nombre} - foto ${slide + 1}`}
          className="w-full h-full object-cover cursor-pointer"
          loading="lazy"
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
          onClick={openLightbox}
          onError={() => {
            setCandIdx(prev => {
              const copy = [...prev]
              const nextCand = (copy[slide] ?? 0) + 1
              copy[slide] = nextCand
              return copy
            })
          }}
        />

        {/* etiqueta */}
        <div className="absolute top-4 right-4 bg-[#bb904d] text-white px-2 py-1 rounded text-xs font-medium">
          {tituloTag}
        </div>

        {/* rating */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} size={16} className="text-yellow-400 fill-current" />
          ))}
        </div>

        {/* controles carrusel */}
        {gallery.length > 1 && (
          <>
            <button
              onClick={gotoPrev}
              className="absolute top-1/2 -translate-y-1/2 left-2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
              aria-label="Imagen anterior"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={gotoNext}
              className="absolute top-1/2 -translate-y-1/2 right-2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
              aria-label="Imagen siguiente"
            >
              <ChevronRight size={18} />
            </button>

            <button
              onClick={openLightbox}
              className="absolute top-2 left-2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
              aria-label="Ampliar"
              title="Ver en grande"
            >
              <Maximize2 size={16} />
            </button>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {gallery.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  className={`h-2 w-2 rounded-full transition-all ${i === slide ? 'bg-white w-4' : 'bg-white/60 hover:bg-white/80'}`}
                  aria-label={`Ir a la imagen ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Contenido */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-[#2c363b] truncate" title={negocio.nombre}>
          {negocio.nombre || 'Sin nombre'}
        </h3>

        {negocio.descripcion && (
          <p className="text-sm text-gray-700 mt-2 line-clamp-3">{negocio.descripcion}</p>
        )}

        <div className="mt-3 space-y-2 text-sm text-gray-600">
          {negocio.direccion && (
            <div className="flex items-start gap-2">
              <MapPin size={16} className="shrink-0 mt-0.5" />
              <span>{negocio.direccion}</span>
            </div>
          )}
          {(negocio.horario || negocio.precios) && (
            <div className="flex items-start gap-2">
              <Clock size={16} className="shrink-0 mt-0.5" />
              <span>
                {negocio.horario && <span><strong>Horario:</strong> {negocio.horario}</span>}
                {negocio.horario && negocio.precios ? ' · ' : ''}
                {negocio.precios && <span><strong>Precios:</strong> {negocio.precios}</span>}
              </span>
            </div>
          )}
        </div>

        {(chips.length || pagos.length || extras.length) && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {chips.map((c, i) => (
              <span key={`c-${i}`} className="bg-[#f6f7f5] text-[#814739] px-2 py-0.5 rounded text-xs">{c}</span>
            ))}
            {pagos.map((p, i) => (
              <span key={`p-${i}`} className="bg-[#f6f7f5] text-[#814739] px-2 py-0.5 rounded text-xs">{p}</span>
            ))}
            {extras.map((e, i) => (
              <span key={`e-${i}`} className="bg-[#bb904d]/10 text-[#814739] px-2 py-0.5 rounded text-xs">{e}</span>
            ))}
          </div>
        )}

        {negocio.especial && (
          <div className="mt-3 text-sm">
            <strong className="text-[#814739]">Especial:</strong> {negocio.especial}
          </div>
        )}

        <div className="mt-4 grid grid-cols-2 gap-2">
          {negocio.phoneDigits && (
            <a href={`tel:${negocio.phoneDigits}`} className="flex items-center justify-center gap-2 bg-[#bb904d] hover:bg-[#814739] text-white py-2 rounded-md transition-colors">
              <Phone size={16} /> Llamar
            </a>
          )}
          {negocio.googleMaps && (
            <a href={negocio.googleMaps} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#f6f7f5] hover:bg-[#e7e7e7] text-[#2c363b] py-2 rounded-md transition-colors">
              <Navigation size={16} /> Cómo llegar
            </a>
          )}
          {negocio.phoneDigits && (
            <a href={`https://wa.me/${negocio.phoneDigits}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#f6f7f5] hover:bg-[#e7e7e7] text-[#2c363b] py-2 rounded-md transition-colors">
              <ExternalLink size={16} /> WhatsApp
            </a>
          )}
          {negocio.redes && (
            <a href={negocio.redes} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#f6f7f5] hover:bg-[#e7e7e7] text-[#2c363b] py-2 rounded-md transition-colors">
              <ExternalLink size={16} /> Redes / Sitio
            </a>
          )}
        </div>
      </div>

      {/* Lightbox modal */}
      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-6xl w-full max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lbSrc}
              alt={`${negocio.nombre} - imagen ampliada ${lightIdx + 1}`}
              className="max-h-[90vh] w-auto object-contain rounded-lg"
              loading="eager"
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
              onError={() => {
                setLbCandIdx(prev => {
                  const copy = [...prev]
                  copy[lightIdx] = (copy[lightIdx] ?? 0) + 1
                  return copy
                })
              }}
            />

            {/* Cerrar */}
            <button
              onClick={closeLightbox}
              className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full"
              aria-label="Cerrar"
            >
              <X size={18} />
            </button>

            {/* Prev/Next */}
            {gallery.length > 1 && (
              <>
                <button
                  onClick={lightPrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full"
                  aria-label="Anterior"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={lightNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full"
                  aria-label="Siguiente"
                >
                  <ChevronRight size={20} />
                </button>

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                  {gallery.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setLightIdx(i)}
                      className={`h-2 w-2 rounded-full ${i === lightIdx ? 'bg-white w-4' : 'bg-white/60 hover:bg-white/80'}`}
                      aria-label={`Imagen ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
