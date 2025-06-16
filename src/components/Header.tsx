'use client'

import { Phone, Globe } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [language, setLanguage] = useState<'es' | 'en'>('es')

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'es' ? 'en' : 'es'))

    // Aquí podrías usar cookies/localStorage o i18n real en un proyecto más grande
    // Por ahora solo simulamos que cambia el idioma
  }

  return (
    <header className="bg-[#00008b] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* SOS Button */}
        <a
          href="tel:911"
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm font-semibold shadow transition-colors"
        >
          <Phone size={16} />
          SOS
        </a>

        {/* Logo / Título */}
        <div className="flex-1 text-center">
          <h1
            className="text-3xl md:text-4xl font-extrabold text-[#d4af37] tracking-wide uppercase drop-shadow-sm transition-all"
            style={{ fontFamily: `'Georgia', serif` }}
          >
            MiPapantla
          </h1>
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
