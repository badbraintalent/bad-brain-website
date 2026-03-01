import Navigation from '@/components/layout/Navigation'
import ParallaxHero from '@/components/sections/ParallaxHero'
import SocialShowcase from '@/components/sections/SocialShowcase'
import ServicesOverview from '@/components/sections/ServicesOverview'
import Testimonials from '@/components/sections/Testimonials'
import ContactCTA from '@/components/sections/ContactCTA'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <main>
      <Navigation />
      <ParallaxHero />
      <SocialShowcase />
      <ServicesOverview />
      <Testimonials />
      <ContactCTA />
      <Footer />
    </main>
  );
}
