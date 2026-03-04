// src/app/contacto/page.tsx

import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'

const contactCards = [
  {
    id: 'jovenes-creadores',
    name: 'Jóvenes Creadores MX',
    description: 'Innovación y diseño tecnológico al servicio de la cultura y el turismo.',
    logo: '/icons/jovenes_icon.png',
    bgLogoClass: 'bg-white', // Un fondo blanco lucirá bien
    gradient: 'from-[#ffffff] to-[#f3f6f8]', // Crema/azulado muy sutil
    mainUrl: 'https://www.facebook.com/JovenesCreadoresMX',
    socialLinks: [
      {
        name: 'Facebook',
        url: 'https://www.facebook.com/profile.php?id=61565112126161',
        icon: '/icons/ic_facebook.png',
      },
      {
        name: 'Sitio Web',
        url: 'https://www.mipapantla.com',
        icon: '/icons/ic_web.png',
      },
      {
        name: 'YouTube',
        url: 'https://www.youtube.com/@MiPapantlaapp',
        icon: '/icons/ic_youtube.png',
      },
    ],
  },
  {
    id: 'canaco',
    name: 'CANACO SERVYTUR',
    description: 'Cámara Nacional de Comercio, Servicios y Turismo de Papantla.',
    logo: '/icons/canaco.png',
    bgLogoClass: 'bg-white',
    gradient: 'from-[#ffffff] to-[#fcf4f2]', // Crema/rojizo muy sutil
    mainUrl: 'https://www.facebook.com/canacoservyturpapantla',
    socialLinks: [
      {
        name: 'Facebook Oficial',
        url: 'https://www.facebook.com/canacoservyturpapantla',
        icon: '/icons/ic_facebook.png',
      },
    ],
  },
]

export default function Contacto() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-10 pb-24">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#2c363b] tracking-tight mb-4">
            Contacto
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Conoce a las organizaciones detrás del desarrollo tecnológico y turístico de Papantla.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {contactCards.map((card) => (
            <div
              key={card.id}
              className={`relative bg-gradient-to-br ${card.gradient} rounded-2xl p-8 shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-2 transform transition-all duration-300 flex flex-col items-center text-center group`}
            >
              {/* Logo Flotante */}
              <a
                href={card.mainUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative w-28 h-28 ${card.bgLogoClass} rounded-full flex items-center justify-center mb-6 shadow-sm overflow-hidden border-4 border-white group-hover:border-gray-100 transition-colors`}
              >
                <Image
                  src={card.logo}
                  alt={card.name}
                  width={90}
                  height={90}
                  className="object-contain"
                />
              </a>

              {/* Título y Descripción */}
              <h2 className="text-2xl font-bold text-[#2c363b] mb-3">
                {card.name}
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 flex-grow">
                {card.description}
              </p>

              {/* Enlaces Sociales e inferiores */}
              <div className="flex items-center gap-4 mt-auto">
                {card.socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.name}
                    className="bg-white shadow-sm border border-gray-100 p-3 rounded-full hover:bg-gray-50 hover:scale-110 transition-all"
                  >
                    <Image
                      src={social.icon}
                      alt={social.name}
                      width={28}
                      height={28}
                      className="hover:opacity-90 grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </a>
                ))}
              </div>

              {/* Indicador de Action Hover */}
              <a
                href={card.mainUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 right-4 text-gray-300 group-hover:text-gray-500 transition-colors"
                title="Visitar página principal"
              >
                <ExternalLink size={20} />
              </a>
            </div>
          ))}
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}
