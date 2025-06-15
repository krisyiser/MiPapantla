import Link from 'next/link'
import { MapPin, Shield, Map as MapIcon, Car, Phone } from 'lucide-react'

const navigationItems = [
  {
    id: 'turismo',
    title: 'TURISMO',
    href: '/',
    icon: MapPin,
    active: true
  },
  {
    id: 'seguridad',
    title: 'SEGURIDAD',
    href: '/seguridad',
    icon: Shield,
    active: false
  },
  {
    id: 'mapa',
    title: 'MAPA',
    href: '/mapa',
    icon: MapIcon,
    active: false
  },
  {
    id: 'transporte',
    title: 'TRANSPORTE',
    href: '/transporte',
    icon: Car,
    active: false
  },
  {
    id: 'contacto',
    title: 'CONTACTO',
    href: '/contacto',
    icon: Phone,
    active: false
  }
]

export default function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#2c363b] border-t border-[#814739] z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around items-center py-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors min-w-0 flex-1 ${
                  item.active
                    ? 'bg-[#bb904d] text-white'
                    : 'text-[#8b9fab] hover:text-[#bb904d] hover:bg-[#814739]'
                }`}
              >
                <Icon size={20} className="mb-1 flex-shrink-0" />
                <span className="text-xs font-medium text-center leading-tight">
                  {item.title}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
