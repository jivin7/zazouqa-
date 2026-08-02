import Image from "next/image"
import { ArrowRight, Heart } from "lucide-react"
import { Reveal } from "@/components/reveal"

export function CityStroll() {
  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 left-10 size-48 animate-float-xy rounded-full bg-accent/10 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid items-center gap-8 rounded-4xl border border-border bg-card p-6 shadow-sm transition-shadow duration-500 hover:shadow-lg md:p-10 lg:grid-cols-[1fr_1.6fr]">
          <Reveal variant="left">
            <h2 className="flex items-start gap-2 font-display text-3xl font-extrabold leading-tight text-balance text-primary sm:text-4xl md:text-5xl">
              Take a stroll through Marketing City
              <Heart className="mt-2 size-6 shrink-0 text-accent animate-heartbeat" aria-hidden="true" />
            </h2>
            <p className="mt-4 max-w-sm leading-relaxed text-muted-foreground">
              Every district has a purpose. Together, they build your brand empire.
            </p>
            <a
              href="#explore"
              className="group mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-1 hover:scale-[1.02] hover:bg-primary/90 hover:shadow-md"
            >
              Take the Tour
              <span className="flex size-6 items-center justify-center rounded-full bg-primary-foreground/20 transition-transform group-hover:translate-x-1">
                <ArrowRight className="size-3.5" />
              </span>
            </a>
          </Reveal>

          <Reveal delay={150} variant="right" className="relative">
            <div className="group overflow-hidden rounded-3xl border border-border bg-background">
              <Image
                src="/city-map.png"
                alt="Illustrated map of Marketing City showing every district"
                width={900}
                height={620}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
            <aside className="mt-4 max-w-xs animate-float-slow rounded-3xl border-2 border-gold/40 bg-secondary/60 p-4 backdrop-blur-sm transition-transform duration-300 hover:scale-105 lg:absolute lg:-right-2 lg:bottom-4 lg:mt-0">
              <p className="font-display font-bold text-primary">Fun fact!</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Zaqzouqa knows every shortcut in the city. Shhh!
              </p>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
