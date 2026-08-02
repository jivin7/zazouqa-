"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { Reveal } from "@/components/reveal"

const TESTIMONIALS = [
  {
    quote:
      "Zaqzouqa and Nardeen turned our tiny idea into a brand people actually love. We saw real growth (and had fun doing it).",
    name: "Lina M.",
    role: "Boutique Owner",
    avatar: "/avatar-lina.png",
  },
  {
    quote:
      "Their strategy is next level—and Zaqzouqa's creativity? Pure gold. Our social media has never looked this good!",
    name: "Omar K.",
    role: "Co-Founder",
    avatar: "/avatar-omar.png",
  },
  {
    quote:
      "From content to ads, everything just works. They feel like part of our team!",
    name: "Sara R.",
    role: "Online Store Owner",
    avatar: "/avatar-sara.png",
  },
]

function Card({ t, featured = false }: { t: (typeof TESTIMONIALS)[number]; featured?: boolean }) {
  return (
    <figure
      className={`flex h-full flex-col rounded-3xl bg-card p-6 text-card-foreground shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
        featured ? "ring-2 ring-gold/50" : ""
      }`}
    >
      <Quote className="size-7 text-accent transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
      <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-foreground/90">
        {t.quote}
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <Image
          src={t.avatar || "/placeholder.svg"}
          alt={t.name}
          width={44}
          height={44}
          className="size-11 rounded-full object-cover ring-2 ring-accent/20 transition-transform duration-300 hover:scale-110"
        />
        <div className="flex-1">
          <p className="font-display font-bold text-primary">{t.name}</p>
          <p className="text-xs text-muted-foreground">{t.role}</p>
        </div>
        <div className="flex gap-0.5 text-gold" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="size-3.5 fill-current animate-twinkle"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </figcaption>
    </figure>
  )
}

export function Testimonials() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % TESTIMONIALS.length)
    }, 4500)
    return () => window.clearInterval(id)
  }, [paused])

  const prev = () => setActive((a) => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  const next = () => setActive((a) => (a + 1) % TESTIMONIALS.length)

  return (
    <section
      id="stories"
      className="relative overflow-hidden bg-primary py-16 text-primary-foreground md:py-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 top-1/4 size-56 animate-blob rounded-full bg-accent/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 bottom-0 size-64 animate-float-xy rounded-full bg-gold/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <Reveal variant="blur">
          <h2 className="text-center font-display text-3xl font-extrabold text-balance sm:text-4xl md:text-5xl">
            Stories from Around the City
          </h2>
        </Reveal>

        <div className="relative mt-10">
          {/* Desktop grid */}
          <div className="hidden gap-5 md:grid md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 120} variant="up" className="group">
                <Card t={t} featured={i === 1} />
              </Reveal>
            ))}
          </div>

          {/* Mobile carousel */}
          <div className="md:hidden">
            <div key={active} className="animate-fade-swap">
              <Card t={TESTIMONIALS[active]} featured />
            </div>
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous story"
                className="flex size-11 items-center justify-center rounded-full bg-primary-foreground/15 text-primary-foreground transition-all hover:scale-110 hover:bg-primary-foreground/25 active:scale-95"
              >
                <ChevronLeft className="size-5" />
              </button>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to story ${i + 1}`}
                    onClick={() => setActive(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === active ? "w-6 bg-gold" : "w-2 bg-primary-foreground/30 hover:bg-primary-foreground/50"
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={next}
                aria-label="Next story"
                className="flex size-11 items-center justify-center rounded-full bg-primary-foreground/15 text-primary-foreground transition-all hover:scale-110 hover:bg-primary-foreground/25 active:scale-95"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
