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
    id: 'restaurantes',
    title: 'RESTAURANTES',
    href: '/restaurantes',
    image: '/pictures/restaurantes.jpeg',
    size: 's2',
    labelPosition: 'tl'
  },
  {
    id: 'mercados',
    title: 'MERCADOS',
    href: '/mercados',
    image: '/pictures/mercado.jpg',
    size: 's2',
    labelPosition: 'tr'
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
    id: 'experiencias',
    title: 'EXPERIENCIAS',
    href: '/promociones',
    image: '/pictures/experiencias.jpg',
    size: 's2',
    labelPosition: 'tl'
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
    id: 'vainilla',
    title: 'VAINILLA',
    href: '/vainilla',
    image: '/pictures/vainilla.jpg',
    size: 's2',
    labelPosition: 'bl'
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
    id: 'eventos',
    title: 'EVENTOS',
    href: '/eventos',
    image: '/pictures/eventos.jpg',
    size: 's2',
    labelPosition: 'bl'
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
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-2 space-y-4">
          <MosaicBlock block={mosaicData[4]} />
          <MosaicBlock block={mosaicData[5]} />
        </div>
        <div className="md:col-span-3 space-y-4">
          <MosaicBlock block={mosaicData[6]} />
          <MosaicBlock block={mosaicData[7]} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-2 space-y-4">
          <MosaicBlock block={mosaicData[8]} />
          <MosaicBlock block={mosaicData[9]} />
        </div>
      </div>
    </div>
  )
}
