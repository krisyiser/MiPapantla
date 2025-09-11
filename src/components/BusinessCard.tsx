'use client'

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  MapPin, Clock, Phone, Navigation, ExternalLink, Star, X
} from 'lucide-react'
import { useOutsideClick } from '@/hooks/use-outside-click'
import GalleryGrid from '@/components/GalleryGrid'

interface NegocioData {
  nombre: string
  descripcion: string              // breve
  descripcionLarga?: string        // NUEVO: larga
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
  servicios?: string               // se muestra en expandida
  photo?: string
  photos?: string[]
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
  const uid = useId()

  // Fotos del negocio
  const photos = useMemo<string[]>(
    () => (negocio.photos && negocio.photos.length > 0)
      ? negocio.photos
      : (negocio.photo ? [negocio.photo] : [image]),
    [negocio.photos, negocio.photo, image]
  )

  // Portada con fallbacks
  const coverCandidates = useMemo(
    () => buildImageCandidates(photos[0], image),
    [photos, image]
  )
  const [coverIdx, setCoverIdx] = useState(0)
  useEffect(() => setCoverIdx(0), [coverCandidates.length])

  // Expandible (detalle)
  const [expanded, setExpanded] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  useOutsideClick(modalRef, () => setExpanded(false))
  const closeExpanded = useCallback(() => setExpanded(false), [])
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') closeExpanded() }
    if (expanded) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', onKeyDown)
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [expanded, closeExpanded])

  // Evitar que clicks en botones/links abran el modal
  const onCardClick = (e: React.MouseEvent) => {
    const tag = (e.target as HTMLElement).closest('a,button')
    if (tag) return
    setExpanded(true)
  }

  // Grid de galería (tipo Pinterest)
  const [gridOpen, setGridOpen] = useState(false)
  const openGrid = useCallback(() => setGridOpen(true), [])
  const closeGrid = useCallback(() => setGridOpen(false), [])

  // Descripciones según modo
  const descShort = negocio.descripcion || '' // ya viene breve desde fetch
  const fullDesc = negocio.descripcionLarga || negocio.descripcion || ''

  // ---------- VISTA COLAPSADA (resumen mínimo) ----------
  const Collapsed = (
    <motion.div
      layoutId={`card-${negocio.nombre}-${uid}`}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onCardClick}
    >
      {/* Portada */}
      <div className="relative h-48">
        <motion.img
          layoutId={`image-${negocio.nombre}-${uid}`}
          src={coverCandidates[coverIdx] || image}
          alt={`${negocio.nombre} - portada`}
          className="w-full h-full object-cover cursor-zoom-in"
          loading="lazy"
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
          onClick={(e) => { e.stopPropagation(); openGrid() }}
          onError={(e) => {
            const next = coverIdx + 1
            if (next < coverCandidates.length) {
              setCoverIdx(next)
              ;(e.target as HTMLImageElement).src = coverCandidates[next]
            }
          }}
        />
        <div className="absolute top-4 right-4 bg-[#bb904d] text-white px-2 py-1 rounded text-xs font-medium">
          {tituloTag}
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-1">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} size={16} className="text-yellow-400 fill-current" />
          ))}
        </div>
      </div>

      {/* Info mínima */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-[#2c363b] truncate" title={negocio.nombre}>
          {negocio.nombre || 'Sin nombre'}
        </h3>

        {descShort && (
          <p className="text-sm text-gray-700 mt-2 line-clamp-2">{descShort}</p>
        )}

        <div className="mt-3 space-y-2 text-sm text-gray-600">
          {negocio.direccion && (
            <div className="flex items-start gap-2">
              <MapPin size={16} className="shrink-0 mt-0.5" />
              <span className="truncate">{negocio.direccion}</span>
            </div>
          )}
          {negocio.horario && (
            <div className="flex items-start gap-2">
              <Clock size={16} className="shrink-0 mt-0.5" />
              <span><strong>Horario:</strong> {negocio.horario}</span>
            </div>
          )}
        </div>

        {/* CTA único */}
        <div className="mt-4">
          <button
            onClick={(e) => { e.stopPropagation(); setExpanded(true) }}
            className="w-full border border-gray-200 hover:border-[#bb904d] hover:bg-[#bb904d]/5 text-[#2c363b] py-2 rounded-md transition-colors"
            aria-label="Ver detalles"
          >
            Ver detalles
          </button>
        </div>
      </div>
    </motion.div>
  )

  // ---------- VISTA EXPANDIDA (detalle completo) ----------
  const Expanded = (
    <div className="fixed inset-0 grid place-items-center z-[60]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/30"
      />
      <motion.div
        ref={modalRef}
        layoutId={`card-${negocio.nombre}-${uid}`}
        className="relative w-full max-w-3xl max-h-[92vh] overflow-hidden bg-white rounded-3xl shadow-xl"
      >
        {/* Cerrar */}
        <button
          onClick={closeExpanded}
          className="absolute top-3 right-3 z-10 bg-white/90 hover:bg-white text-black rounded-full p-2 shadow"
          aria-label="Cerrar"
        >
          <X size={18} />
        </button>

        {/* Portada (abre galería) */}
        <div className="relative">
          <motion.img
            layoutId={`image-${negocio.nombre}-${uid}`}
            src={coverCandidates[coverIdx] || image}
            alt={`${negocio.nombre} - portada`}
            className="w-full h-80 object-cover cursor-zoom-in"
            onClick={(e) => { e.stopPropagation(); openGrid() }}
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
            onError={(e) => {
              const next = coverIdx + 1
              if (next < coverCandidates.length) {
                setCoverIdx(next)
                ;(e.target as HTMLImageElement).src = coverCandidates[next]
              }
            }}
          />
        </div>

        {/* Contenido detallado */}
        <div className="p-5 overflow-y-auto max-h-[calc(92vh-20rem)]">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-2xl font-bold text-[#2c363b]">{negocio.nombre}</h3>
            <div className="flex items-center gap-1">
              {[...Array(rating)].map((_, i) => (
                <Star key={i} size={18} className="text-yellow-400 fill-current" />
              ))}
            </div>
          </div>

          {fullDesc && (
            <p className="text-gray-700 mt-2 whitespace-pre-line">{fullDesc}</p>
          )}

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
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

          {/* Servicios / Productos */}
          {negocio.servicios && (
            <div className="mt-4">
              <h4 className="font-semibold text-[#2c363b] mb-1">Servicios / Productos</h4>
              <p className="text-sm text-gray-700 whitespace-pre-line">{negocio.servicios}</p>
            </div>
          )}

          {/* Chips completos */}
          {(negocio.pagos?.length || negocio.extras?.length || negocio.idiomas || negocio.accesible) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {negocio.accesible && (
                <span className="bg-[#f6f7f5] text-[#814739] px-2 py-0.5 rounded text-xs">Accesible</span>
              )}
              {negocio.idiomas && (
                <span className="bg-[#f6f7f5] text-[#814739] px-2 py-0.5 rounded text-xs">Idiomas: {negocio.idiomas}</span>
              )}
              {(negocio.pagos || []).map((p, i) => (
                <span key={`pg-${i}`} className="bg-[#f6f7f5] text-[#814739] px-2 py-0.5 rounded text-xs">{p}</span>
              ))}
              {(negocio.extras || []).map((e, i) => (
                <span key={`ex-${i}`} className="bg-[#bb904d]/10 text-[#814739] px-2 py-0.5 rounded text-xs">{e}</span>
              ))}
            </div>
          )}

          {negocio.especial && (
            <div className="mt-4 text-sm">
              <strong className="text-[#814739]">Especial:</strong> {negocio.especial}
            </div>
          )}

          {/* Acciones completas */}
          <div className="mt-6 grid grid-cols-2 gap-2">
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
      </motion.div>
    </div>
  )

  return (
    <>
      {/* Card colapsada */}
      {Collapsed}

      {/* Modal expandido */}
      <AnimatePresence>
        {expanded && Expanded}
      </AnimatePresence>

      {/* Galería tipo Pinterest */}
      <AnimatePresence>
        {gridOpen && (
          <GalleryGrid
            photos={photos}
            open={gridOpen}
            onClose={closeGrid}
          />
        )}
      </AnimatePresence>
    </>
  )
}
