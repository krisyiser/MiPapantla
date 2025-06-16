'use client'

import Image from 'next/image'
import { Globe } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [language, setLanguage] = useState<'es' | 'en'>('es')

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'es' ? 'en' : 'es'))
  }

  return (
    <header className="bg-gradient-to-b from-black to-[#00008b] text-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        
        {/* Contenedor central: logos + título */}
        <div className="flex items-center justify-center flex-grow gap-2 md:gap-4 min-w-0">
          <Image
            src="/pictures/canaco.png"
            alt="Logo Canaco Izquierda"
            width={40}
            height={40}
            className="object-contain flex-shrink-0"
          />
          <div className="text-center flex-shrink overflow-hidden">
            <h1
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#d4af37] uppercase tracking-wide drop-shadow-sm whitespace-nowrap"
              style={{ fontFamily: `'Georgia', serif` }}
            >
              MiPapantla
            </h1>
            <p className="text-xs sm:text-sm mt-1 opacity-80 italic whitespace-nowrap">
              {language === 'es' ? 'Donde la tradición cobra vida' : 'Where tradition comes to life'}
            </p>
          </div>
          <Image
            src="/pictures/canaco.png"
            alt="Logo Canaco Derecha"
            width={40}
            height={40}
            className="object-contain flex-shrink-0"
          />
        </div>

        {/* Botón de idioma */}
        <div className="flex justify-end w-full md:w-auto">
          <button
            className="flex items-center gap-2 bg-[#814739] hover:bg-[#a05646] px-3 py-1 rounded text-sm font-medium transition-colors shadow"
            onClick={toggleLanguage}
          >
            <Globe size={16} />
            {language === 'es' ? 'ENG' : 'ESP'}
          </button>
        </div>
      </div>

      {/* Línea decorativa dorada */}
      <div className="h-1 bg-gradient-to-r from-yellow-400 via-[#d4af37] to-yellow-400" />
    </header>
  )
}
