// src/app/contacto/page.tsx

import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'
import Image from 'next/image'

const socialLinks = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=61565112126161',
    icon: '/icons/ic_facebook.png'
  },
  {
    name: 'Sitio Web',
    url: 'https://www.mipapantla.com',
    icon: '/icons/ic_web.png'
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@MiPapantlaapp',
    icon: '/icons/ic_youtube.png'
  }
]

const contactGroups = [
  {
    name: 'Jóvenes Creadores MX',
    description: 'Innovación y tecnología al servicio de la cultura y el turismo',
    logo: '/icons/jovenes_icon.png',
    url: 'https://www.facebook.com/JovenesCreadoresMX'
  },
  {
    name: 'Papantours',
    description: 'La agencia de viaje que te brindará las mejores experiencias turísticas.',
    logo: '/icons/logo_papantours.png',
    url: 'https://www.facebook.com/Agenciadeviajespapantours'
  }
]

export default function Contacto() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6 pb-20">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-[#2c363b] mb-4">Contacto</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Esta aplicación fue creada por el Grupo Cultural Jóvenes Creadores MX, comprometidos con Papantla y el fortalecimiento del turismo cultural.
          </p>
        </div>

        {/* Redes Sociales */}
        <div className="flex justify-center gap-6 mb-10">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <Image src={social.icon} alt={social.name} width={48} height={48} />
            </a>
          ))}
        </div>

        {/* Grupos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {contactGroups.map((group) => (
            <a
              key={group.name}
              href={group.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center text-center"
            >
              <div
                className={`mb-4 rounded-full p-3 ${
                  group.name === 'Jóvenes Creadores MX' ? 'bg-gray-800' : ''
                }`}
              >
                <Image
                  src={group.logo}
                  alt={group.name}
                  width={100}
                  height={100}
                  className="rounded-full"
                />
              </div>
              <h2 className="text-xl font-bold text-[#2c363b] mb-2">{group.name}</h2>
              <p className="text-gray-600 text-sm">{group.description}</p>
            </a>
          ))}
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}
