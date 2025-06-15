import Link from 'next/link'

interface MosaicBlock {
  id: string
  title: string
  href: string
  image: string
  size: 's2' | 's3' | 'fill'
  labelPosition: 'tl' | 'tr' | 'bl' | 'br'
}

const mosaicData: MosaicBlock[] = [
  // First Row
  {
    id: 'hospedaje',
    title: 'HOSPEDAJE',
    href: '/hoteles',
    image: 'https://ugc.same-assets.com/5Bw8hxZxcAXTHCyjTX6PezI4WSoGvPRg.jpeg',
    size: 's3',
    labelPosition: 'br'
  },
  {
    id: 'promociones',
    title: 'PROMOCIONES',
    href: '/promociones',
    image: 'https://ugc.same-assets.com/lEwVR2NqlZC_56eq5S-1K87hDRXCdnD3.jpeg',
    size: 's2',
    labelPosition: 'tl'
  },
  {
    id: 'restaurantes',
    title: 'RESTAURANTES',
    href: '/restaurantes',
    image: 'https://ugc.same-assets.com/gTk2W2RsUQF39naWUgkxh-yxnIQRQ3U-.jpeg',
    size: 's2',
    labelPosition: 'tl'
  },
  {
    id: 'playas',
    title: 'PLAYAS',
    href: '/playas',
    image: 'https://ugc.same-assets.com/1qQ1ZwpOYDqJx2RF9TvpigjsAQEB-_Kr.jpeg',
    size: 's3',
    labelPosition: 'br'
  },

  // Vida Nocturna - Full Width
  {
    id: 'vida-nocturna',
    title: 'VIDA NOCTURNA',
    href: '/vida-nocturna',
    image: 'https://ugc.same-assets.com/ou35V0qlzH_a76BybIwvUbbiyTAT4z5Y.jpeg',
    size: 's2',
    labelPosition: 'bl'
  },

  // Next Row
  {
    id: 'visitame',
    title: '¡VISÍTAME!',
    href: '/visitame',
    image: 'https://ugc.same-assets.com/TQ_s1GC7achOWmNUJIzijy0xkZ9c89Tt.jpeg',
    size: 's3',
    labelPosition: 'tl'
  },
  {
    id: 'turismo-aventura',
    title: 'AGENCIAS DE TURISMO',
    href: '/turismo-aventura',
    image: 'https://ugc.same-assets.com/Pq5hTeY6bHjnaAIYoQDDIwdrX2o_FNop.jpeg',
    size: 'fill',
    labelPosition: 'tl'
  },
  {
    id: 'eventos',
    title: 'EVENTOS',
    href: '/eventos',
    image: 'https://ugc.same-assets.com/-qTSj2wMaY-4Wgwe_KG-e-4mBpt-9EOX.jpeg',
    size: 's2',
    labelPosition: 'bl'
  },
  {
    id: 'mercados',
    title: 'MERCADOS Y CENTROS COMERCIALES',
    href: '/mercados',
    image: 'https://ugc.same-assets.com/HRawxe4t6hOX6_ZEbVS6DDChTit8-IqX.jpeg',
    size: 's2',
    labelPosition: 'tr'
  }
]

const attractions = [
  {
    id: 'acuario',
    title: 'Gran Acuario Mazatlán',
    href: '/acuario',
    image: 'https://ugc.same-assets.com/qcy8x-sF-VewrxttGU60J1vMpYOxdMp5.jpeg',
    size: 's3' as const,
    labelPosition: 'br' as const
  },
  {
    id: 'observatorio',
    title: 'Observatorio Mazatlán 1873',
    href: '/observatorio',
    image: 'https://ugc.same-assets.com/BToXS_U8FiCIfCI-s3nx8KeE48JpkASD.jpeg',
    size: 's2' as const,
    labelPosition: 'tl' as const
  },
  {
    id: 'cultural',
    title: 'Centro de Innovación Cultural Mazatlán',
    href: '/centro-cultural',
    image: 'https://ugc.same-assets.com/j7diHsQvARYH9ftLlvfXu6BqI5vQMqc9.jpeg',
    size: 's2' as const,
    labelPosition: 'tl' as const
  },
  {
    id: 'faro',
    title: 'Faro Mazatlán',
    href: '/faro',
    image: 'https://ugc.same-assets.com/B6-OZ8sHQ0WZFVHya0Jw6FoEUrDWzz_w.jpeg',
    size: 's3' as const,
    labelPosition: 'br' as const
  }
]

const specialSections = [
  {
    id: 'turismo-rural',
    title: 'TURISMO RURAL Y CIRCUITOS TURISTICOS',
    href: '/turismo-rural',
    image: 'https://ugc.same-assets.com/NsCIzvkcnp-AihFNBKA5Gqx_ubTqwKdk.jpeg',
    labelPosition: 'bl' as const
  },
  {
    id: 'tres-islas',
    title: 'Las 3 Islas',
    href: '/tres-islas',
    image: 'https://ugc.same-assets.com/qmEXg8cs9Z5CQyZEpQ0SWEYyiUO1dcjJ.jpeg',
    labelPosition: 'bl' as const
  },
  {
    id: 'sur-sinaloa',
    title: 'SUR DE SINALOA',
    href: '/sur-sinaloa',
    image: 'https://ugc.same-assets.com/ehB8HSnyN5OAmaAEt4lnsKVxpeDS6O4a.jpeg',
    labelPosition: 'br' as const
  }
]

function MosaicBlock({ block }: { block: MosaicBlock }) {
  const getSizeClasses = (size: string) => {
    switch (size) {
      case 's2':
        return 'h-40 md:h-48'
      case 's3':
        return 'h-56 md:h-64'
      case 'fill':
        return 'h-72 md:h-80'
      default:
        return 'h-40 md:h-48'
    }
  }

  const getLabelClasses = (position: string) => {
    switch (position) {
      case 'tl':
        return 'top-4 left-4'
      case 'tr':
        return 'top-4 right-4 text-right'
      case 'bl':
        return 'bottom-4 left-4'
      case 'br':
        return 'bottom-4 right-4 text-right'
      default:
        return 'bottom-4 left-4'
    }
  }

  return (
    <Link href={block.href} className="block group">
      <div className={`relative rounded-lg overflow-hidden ${getSizeClasses(block.size)} hover:scale-105 transition-transform duration-300`}>
        <img
          src={block.image}
          alt={block.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className={`absolute ${getLabelClasses(block.labelPosition)} text-white font-bold text-sm md:text-base lg:text-lg max-w-[70%] leading-tight`}>
          {block.title}
        </div>
      </div>
    </Link>
  )
}

export default function MosaicGrid() {
  return (
    <div className="space-y-4">
      {/* First Section - Main Tourism Categories */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Left Column - 40% */}
        <div className="md:col-span-2 space-y-4">
          <MosaicBlock block={mosaicData[0]} />
          <MosaicBlock block={mosaicData[1]} />
        </div>

        {/* Right Column - 60% */}
        <div className="md:col-span-3 space-y-4">
          <MosaicBlock block={mosaicData[2]} />
          <MosaicBlock block={mosaicData[3]} />
        </div>
      </div>

      {/* Full Width - Vida Nocturna */}
      <div className="w-full">
        <MosaicBlock block={mosaicData[4]} />
      </div>

      {/* Second Section */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Left Column - 47% */}
        <div className="md:col-span-2 space-y-4">
          <MosaicBlock block={mosaicData[5]} />
          <MosaicBlock block={mosaicData[6]} />
        </div>

        {/* Right Column - 53% */}
        <div className="md:col-span-3 space-y-4">
          <MosaicBlock block={mosaicData[7]} />
          <MosaicBlock block={mosaicData[8]} />
        </div>
      </div>

      {/* Attractions Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="space-y-4">
          <MosaicBlock block={attractions[0]} />
          <MosaicBlock block={attractions[1]} />
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <MosaicBlock block={attractions[2]} />
          <MosaicBlock block={attractions[3]} />
        </div>
      </div>

      {/* Special Sections - Full Width */}
      <div className="space-y-4">
        {specialSections.map((section) => (
          <Link key={section.id} href={section.href} className="block group">
            <div className="relative h-40 md:h-48 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
              <img
                src={section.image}
                alt={section.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className={`absolute ${section.labelPosition === 'bl' ? 'bottom-4 left-4' : 'bottom-4 right-4 text-right'} text-white font-bold text-sm md:text-base lg:text-lg`}>
                {section.title}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
