'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const navigationItems = [
  {
    id: 'turismo',
    title: 'TURISMO',
    href: '/',
    icon: '/icons/turismo_icon.png'
  },
  {
    id: 'seguridad',
    title: 'SEGURIDAD',
    href: '/seguridad',
    icon: '/icons/seguridad_icon.png'
  },
  {
    id: 'mapa',
    title: 'MAPA',
    href: '/mapa',
    icon: '/icons/mapa_icon.png'
  },
  {
    id: 'transporte',
    title: 'TRANSPORTE',
    href: '/transporte',
    icon: '/icons/transporte_icon.png'
  },
  {
    id: 'contacto',
    title: 'CONTACTO',
    href: '/contacto',
    icon: '/icons/contacto_icon.png'
  }
]

export default function BottomNavigation() {
  const pathname = usePathname()
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    const currentIndex = navigationItems.findIndex(item => item.href === pathname)
    const currentRef = itemRefs.current[currentIndex]
    if (currentRef) {
      setIndicatorStyle({
        left: currentRef.offsetLeft,
        width: currentRef.offsetWidth
      })
    }
  }, [pathname])

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black via-[#000050] to-[#00008b] border-t border-[#d4af37] shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative flex justify-around items-center py-2">
          {/* Indicador animado dorado */}
          <div
            className="absolute top-1 bottom-1 rounded-lg bg-[#d4af37] transition-all duration-300 ease-in-out z-0"
            style={{
              left: indicatorStyle.left,
              width: indicatorStyle.width
            }}
          />

          {/* Elementos de navegación */}
          {navigationItems.map((item, index) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.id}
                href={item.href}
                ref={(el) => void (itemRefs.current[index] = el)} // <- Corregido para evitar error de tipos
                className={`z-10 flex flex-col items-center py-2 px-3 rounded-lg transition-all flex-1 min-w-0 ${
                  isActive
                    ? 'text-[#2c363b]'
                    : 'text-white hover:text-[#d4af37]'
                }`}
              >
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={24}
                  height={24}
                  className="mb-1"
                />
                <span className="text-xs font-semibold tracking-wide text-center leading-tight">
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
