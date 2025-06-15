import Header from '@/components/Header'
import HeroCarousel from '@/components/HeroCarousel'
import MosaicGrid from '@/components/MosaicGrid'
import BottomNavigation from '@/components/BottomNavigation'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6 pb-20">
        <HeroCarousel />
        <MosaicGrid />
      </main>
      <BottomNavigation />
    </div>
  )
}
