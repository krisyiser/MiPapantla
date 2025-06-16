'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const carouselImages = [
  {
    id: 'carrusel1',
    url: '/pictures/carrusel1.jpg',
    alt: 'Vista panorámica de Papantla'
  },
  {
    id: 'carrusel2',
    url: '/pictures/carrusel2.jpg',
    alt: 'Zona arqueológica El Tajín'
  },
  {
    id: 'carrusel3',
    url: '/pictures/carrusel3.jpg',
    alt: 'Voladores de Papantla en ritual'
  },
  {
    id: 'carrusel4',
    url: '/pictures/carrusel4.jpg',
    alt: 'Calles tradicionales de Papantla'
  },
  {
    id: 'carrusel5',
    url: '/pictures/carrusel5.jpg',
    alt: 'Naturaleza y cultura en armonía'
  },
  {
    id: 'carrusel6',
    url: '/pictures/carrusel6.jpg',
    alt: 'Celebraciones y tradiciones totonacas'
  }
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slideCountRef = useRef(carouselImages.length) // Captura fija y confiable de la longitud

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCountRef.current)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideCountRef.current)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideCountRef.current) % slideCountRef.current)
  }

  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden mb-6 group">
      {carouselImages.map((image, index) => (
        <div
          key={image.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image.url}
            alt={image.alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20" />
        </div>
      ))}

      {/* Flechas de navegación */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
