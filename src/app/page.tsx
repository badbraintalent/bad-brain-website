import Navigation from '@/components/layout/Navigation'
import Hero from '@/components/sections/Hero'
import AboutSection from '@/components/sections/AboutSection'
import ServicesOverview from '@/components/sections/ServicesOverview'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <AboutSection />
      <ServicesOverview />
      <Footer />
    </main>
  );
}
