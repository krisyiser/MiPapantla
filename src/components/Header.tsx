'use client'

import { Phone, Globe } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-[#2c363b] text-white py-2 px-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* SOS Button */}
        <a
          href="tel:6699868126"
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm font-medium transition-colors"
        >
          <Phone size={16} />
          SOS
        </a>

        {/* Logo */}
        <div className="flex-1 flex justify-center">
          <div className="text-[#bb904d] font-bold text-xl tracking-wide">
            MAZATLÁN
          </div>
        </div>

        {/* Language Toggle */}
        <button
          className="flex items-center gap-2 bg-[#814739] hover:bg-[#a05646] px-3 py-1 rounded text-sm font-medium transition-colors"
          onClick={() => {/* Language toggle functionality */}}
        >
          <Globe size={16} />
          ENG
        </button>
      </div>
    </header>
  )
}
