// src/app/transporte/page.tsx

import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'
import { PhoneCall } from 'lucide-react'

const taxiServices = [
  {
    name: 'Radio Taxi Naku',
    phone: '7848425872'
  },
  {
    name: 'Radio Taxi Papantla',
    phone: '7841046824'
  },
  {
    name: 'Radio Taxi Voladores',
    phone: '7848426606'
  },
  {
    name: 'Radio Taxi Express',
    phone: '7841046824'
  }
]

export default function Transporte() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow px-4 py-6 pb-20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#2c363b] mb-4">Transporte Local</h1>
          <p className="text-lg text-gray-600">
            Encuentra servicios de taxi disponibles en Papantla. Llama directamente desde la app.
          </p>
        </div>

        <div className="grid gap-6">
          {taxiServices.map((service, index) => (
            <a
              key={index}
              href={`tel:${service.phone}`}
              className="flex items-center justify-between bg-red-700 hover:bg-red-800 text-white text-lg font-semibold rounded-lg px-6 py-4 shadow-md transition-colors border-l-4 border-yellow-400"
            >
              <span>{service.name}</span>
              <PhoneCall size={24} />
            </a>
          ))}
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}
