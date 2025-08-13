'use client'

import { useState, useMemo } from 'react'
import { MapPin, Clock, Phone, Navigation, ExternalLink, Star } from 'lucide-react'

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
  photo?: string        // URL desde el sheet (Drive u otro)
}

interface Props {
  tituloTag?: string
  image?: string        // placeholder por defecto
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

/** Dado un URL (o fileId si es de Drive), devuelve candidatos de imagen */
function buildImageCandidates(photo?: string, fallback = '/pictures/ic_food.png'): string[] {
  if (!photo) return [fallback]

  // Si es un link de Drive, generamos varias variantes conocidas
  const id = getDriveId(photo)
  if (id) {
    return [
      // 1) vista directa (a veces falla)
      `https://drive.google.com/uc?export=view&id=${id}`,
      // 2) descarga directa (suele servir para <img>)
      `https://drive.google.com/uc?export=download&id=${id}`,
      // 3) thumbnail (control de tamaño)
      `https://drive.google.com/thumbnail?id=${id}&sz=w1600`,
      // 4) usercontent (muy confiable para imágenes públicas)
      `https://lh3.googleusercontent.com/d/${id}=s1600`,
      // fallback final
      fallback,
    ]
  }

  // Si NO es de Drive, devolvemos la propia URL + fallback
  return [photo, fallback]
}

export default function BusinessCard({
  tituloTag = 'Negocio',
  image = '/pictures/ic_food.png',
  rating = 4,
  negocio
}: Props) {
  // Construimos la lista de candidatos una sola vez
  const candidates = useMemo(
    () => buildImageCandidates(negocio.photo?.trim(), image),
    [negocio.photo, image]
  )

  const [idx, setIdx] = useState(0)
  const img = candidates[idx] || image

  const chips: string[] = []
  if (negocio.accesible) chips.push('Accesible')
  if (negocio.idiomas)  chips.push(`Idiomas: ${negocio.idiomas}`)

  const pagos  = (negocio.pagos || []).slice(0, 3)
  const extras = (negocio.extras || []).slice(0, 4)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <img
          src={img}
          alt={negocio.nombre}
          className="w-full h-full object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
          onError={() => {
            // prueba el siguiente candidato hasta llegar al placeholder
            if (idx < candidates.length - 1) setIdx(i => i + 1)
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
    </div>
  )
}
