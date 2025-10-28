import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import Hero from "@/components/sections/hero"
import FeaturedProperties from "@/components/sections/featured-properties"
import Services from "@/components/sections/services"
import Testimonials from "@/components/sections/testimonials"
import Newsletter from "@/components/sections/newsletter"
import CTA from "@/components/sections/cta"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <FeaturedProperties />
      <Services />
      <Testimonials />
      <Newsletter />
      <CTA />
      <Footer />
    </main>
  )
}
