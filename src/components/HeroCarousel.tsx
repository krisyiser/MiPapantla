'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type CarouselImage = {
  id: string
  url: string
  alt: string
}

export default function HeroCarousel() {
  const [images, setImages] = useState<CarouselImage[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const slideCountRef = useRef(0)

  useEffect(() => {
    // Intentar obtener de la API, pero manejar el caso de error (ej. exportación estática)
    fetch('/api/carrusel')
      .then((res) => {
        if (!res.ok) throw new Error('API not available');
        return res.json();
      })
      .then((data: CarouselImage[]) => {
        if (data && data.length > 0) {
          slideCountRef.current = data.length
          setImages(data)
        }
      })
      .catch((error) => {
        console.warn('API de carrusel no disponible (Normal en modo estático/USB). Intentando cargar local...', error);
        
        // Carga el fallback local generado por el script de preparación
        fetch('/carousel-offline.json')
          .then(res => res.json())
          .then((localData: CarouselImage[]) => {
            if (localData && localData.length > 0) {
              slideCountRef.current = localData.length;
              setImages(localData);
            }
          })
          .catch(() => console.error('No se encontró carrusel-offline.json. Por favor corre el script de preparación.'));
      });
  }, [])

  useEffect(() => {
    if (!images.length) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCountRef.current)
    }, 5000)
    return () => clearInterval(timer)
  }, [images])

  if (!images.length) return null

  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden mb-6 group">
      {images.map((img, index) => (
        <div
          key={img.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <Image
            src={img.url}
            alt={img.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 100vw"
            className="object-cover"
            priority={index === 0}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/placeholder.png'
            }}
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>
      ))}

      <button
        onClick={() =>
          setCurrentSlide((i) => (i - 1 + images.length) % images.length)
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={() =>
          setCurrentSlide((i) => (i + 1) % images.length)
        }
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-3 h-3 rounded-full ${i === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
          />
        ))}
      </div>
    </div>
  )
}
