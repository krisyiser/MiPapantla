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
  {
    id: 'hospedaje',
    title: 'HOSPEDAJE',
    href: '/hoteles',
    image: '/pictures/hospedaje.jpg',
    size: 's3',
    labelPosition: 'br'
  },
  {
    id: 'experiencias',
    title: 'EXPERIENCIAS',
    href: '/promociones',
    image: '/pictures/experiencias.jpg',
    size: 's2',
    labelPosition: 'tl'
  },
  {
    id: 'restaurantes',
    title: 'RESTAURANTES',
    href: '/restaurantes',
    image: '/pictures/restaurantes.jpeg',
    size: 's2',
    labelPosition: 'tl'
  },
  {
    id: 'playas',
    title: 'PLAYAS',
    href: '/playas',
    image: '/pictures/playa.jpg',
    size: 's3',
    labelPosition: 'br'
  },
  {
    id: 'vida-nocturna',
    title: 'VIDA NOCTURNA',
    href: '/vida-nocturna',
    image: '/pictures/vida nocturna.jpg',
    size: 's2',
    labelPosition: 'bl'
  },
  {
    id: 'visitame',
    title: '¡VISÍTAME!',
    href: '/visitame',
    image: '/pictures/visitame.jpeg',
    size: 's3',
    labelPosition: 'tl'
  },
  {
    id: 'turismo-aventura',
    title: 'AGENCIAS DE TURISMO',
    href: '/turismo-aventura',
    image: '/pictures/turismo rural.jpg',
    size: 'fill',
    labelPosition: 'tl'
  },
  {
    id: 'eventos',
    title: 'EVENTOS',
    href: '/eventos',
    image: '/pictures/eventos.jpg',
    size: 's2',
    labelPosition: 'bl'
  },
  {
    id: 'mercados',
    title: 'MERCADOS',
    href: '/mercados',
    image: '/pictures/mercado.jpg',
    size: 's2',
    labelPosition: 'tr'
  }
]

const attractions = [
  {
    id: 'centro-artes',
    title: 'Centro de las Artes Indígenas',
    href: '/centro-artes',
    image: '/pictures/centro de las artes indigenas.jpg',
    size: 's3' as const,
    labelPosition: 'br' as const
  },
  {
    id: 'mural-totonaca',
    title: 'Mural Homenaje a la Cultura Totonaca',
    href: '/mural-totonaca',
    image: '/pictures/mural homenaje a la cultura totonaca.jpg',
    size: 's2' as const,
    labelPosition: 'tl' as const
  },
  {
    id: 'casa-cultura',
    title: 'Casa de Cultura Lázara Meldiú',
    href: '/casa-cultura',
    image: '/pictures/casa de cultura.png',
    size: 's2' as const,
    labelPosition: 'tl' as const
  },
  {
    id: 'monumento-volador',
    title: 'Monumento al Volador',
    href: '/monumento-volador',
    image: '/pictures/monumento al volador.jpg',
    size: 's3' as const,
    labelPosition: 'br' as const
  }
]

const specialSections = [
  {
    id: 'turismo-rural',
    title: 'TURISMO RURAL',
    href: '/turismo-rural',
    image: '/pictures/turismo rural.jpg',
    labelPosition: 'bl' as const
  },
  {
    id: 'vainilla',
    title: 'VAINILLA',
    href: '/vainilla',
    image: '/pictures/vainilla.jpg',
    labelPosition: 'bl' as const
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
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-2 space-y-4">
          <MosaicBlock block={mosaicData[0]} />
          <MosaicBlock block={mosaicData[1]} />
        </div>
        <div className="md:col-span-3 space-y-4">
          <MosaicBlock block={mosaicData[2]} />
          <MosaicBlock block={mosaicData[3]} />
        </div>
      </div>
      <div className="w-full">
        <MosaicBlock block={mosaicData[4]} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-2 space-y-4">
          <MosaicBlock block={mosaicData[5]} />
          <MosaicBlock block={mosaicData[6]} />
        </div>
        <div className="md:col-span-3 space-y-4">
          <MosaicBlock block={mosaicData[7]} />
          <MosaicBlock block={mosaicData[8]} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <MosaicBlock block={attractions[0]} />
          <MosaicBlock block={attractions[1]} />
        </div>
        <div className="space-y-4">
          <MosaicBlock block={attractions[2]} />
          <MosaicBlock block={attractions[3]} />
        </div>
      </div>
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
