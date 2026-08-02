import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { CityMarquee } from "@/components/city-marquee"
import { ExploreCity } from "@/components/explore-city"
import { CityStroll } from "@/components/city-stroll"
import { Team } from "@/components/team"
import { Pricing } from "@/components/pricing"
import { Testimonials } from "@/components/testimonials"
import { CtaBand } from "@/components/cta-band"
import { SiteFooter } from "@/components/site-footer"
import { ScrollProgress } from "@/components/scroll-progress"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <SiteHeader />
      <main>
        <Hero />
        <CityMarquee />
        <ExploreCity />
        <CityStroll />
        <Team />
        <Pricing />
        <Testimonials />
        <CtaBand />
      </main>
      <SiteFooter />
    </div>
  )
}
