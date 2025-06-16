'use client'

import { Globe } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

export default function Header() {
  const [language, setLanguage] = useState<'es' | 'en'>('es')

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'es' ? 'en' : 'es'))
  }

  return (
    <header className="bg-gradient-to-b from-black to-[#00008b] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Espacio izquierdo vacío para balance visual */}
        <div className="w-10"></div>

        {/* Logo + Título + Logo */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center gap-2">
            <Image
              src="/pictures/canaco.png"
              alt="Logo Canaco"
              width={36}
              height={36}
              className="rounded"
            />
            <h1
              className="text-3xl md:text-4xl font-extrabold text-[#d4af37] uppercase drop-shadow-sm transition-all"
              style={{ fontFamily: `'Georgia', serif` }}
            >
              MiPapantla
            </h1>
            <Image
              src="/pictures/canaco.png"
              alt="Logo Canaco"
              width={36}
              height={36}
              className="rounded"
            />
          </div>
          <p className="text-sm text-white mt-1 opacity-80 italic">
            {language === 'es' ? 'Donde la tradición cobra vida' : 'Where tradition comes to life'}
          </p>
        </div>

        {/* Language Toggle */}
        <button
          className="flex items-center gap-2 bg-[#814739] hover:bg-[#a05646] px-3 py-1 rounded text-sm font-medium transition-colors shadow"
          onClick={toggleLanguage}
        >
          <Globe size={16} />
          {language === 'es' ? 'ENG' : 'ESP'}
        </button>
      </div>

      {/* Decorative strip */}
      <div className="h-1 bg-gradient-to-r from-yellow-400 via-[#d4af37] to-yellow-400"></div>
    </header>
  )
}
