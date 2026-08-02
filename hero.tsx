"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowRight, Play, Heart, Sparkles } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { AnimatedText, Typewriter } from "@/components/animated-text"

const TYPEWRITER_PHRASES = ["smart ideas", "bold brands", "real growth", "fun marketing"]

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 14
      setOffset({ x, y })
    }
    section.addEventListener("mousemove", onMove)
    return () => section.removeEventListener("mousemove", onMove)
  }, [])

  return (
    <section id="home" ref={sectionRef} className="relative overflow-hidden bg-mesh">
      {/* Ambient blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 size-72 animate-blob bg-accent/15 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 bottom-0 size-80 animate-blob bg-gold/20 blur-2xl"
        style={{ animationDelay: "2s" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 size-40 animate-float-xy rounded-full bg-secondary/60 blur-xl"
      />

      {/* Floating sparkles */}
      <Sparkles
        aria-hidden="true"
        className="pointer-events-none absolute left-[12%] top-[18%] size-5 animate-twinkle text-gold"
      />
      <Sparkles
        aria-hidden="true"
        className="pointer-events-none absolute right-[18%] top-[28%] size-4 animate-twinkle text-accent"
        style={{ animationDelay: "1s" }}
      />
      <Heart
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[22%] left-[8%] size-4 animate-float text-accent/50"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 pb-10 pt-6 sm:gap-8 sm:pb-12 sm:pt-8 md:px-8 lg:grid-cols-2 lg:gap-4 lg:pb-20 lg:pt-14">
        <Reveal className="relative order-2 min-w-0 lg:order-1" variant="left">
          <p
            className={`flex items-center gap-2 font-display text-xl font-bold text-foreground transition-all duration-700 sm:text-2xl md:text-3xl ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Welcome to <Heart className="size-5 text-accent animate-heartbeat" aria-hidden="true" />
          </p>

          <h1 className="mt-1 font-display text-[2.65rem] font-extrabold leading-[0.95] text-primary sm:text-6xl md:text-7xl xl:text-8xl">
            <AnimatedText text="Marketing" delay={120} stagger={32} />
            <br />
            <span className="relative inline-block text-accent">
              <AnimatedText text="City" delay={420} stagger={40} className="text-accent" />
              <span
                aria-hidden="true"
                className={`absolute -bottom-1 left-0 h-2 w-full origin-left rounded-full bg-gold/50 transition-transform duration-700 ${
                  mounted ? "scale-x-100" : "scale-x-0"
                }`}
                style={{ transitionDelay: "900ms" }}
              />
            </span>
          </h1>

          <p className="mt-5 max-w-md text-base font-semibold text-foreground/90 text-pretty sm:text-lg">
            Where{" "}
            <Typewriter phrases={TYPEWRITER_PHRASES} className="text-accent" />{" "}
            meet big results{" "}
            <span className="text-muted-foreground">(and a little bit of </span>
            <span className="text-accent">fun!</span>
            <span className="text-muted-foreground">)</span>
          </p>

          <p
            className={`mt-3 max-w-sm leading-relaxed text-muted-foreground transition-all duration-700 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
            style={{ transitionDelay: "700ms" }}
          >
            Your one-stop hub for branding, content, social media, ads, strategy &amp; more.
          </p>

          <div
            className={`mt-7 flex flex-col gap-3 transition-all duration-700 min-[480px]:flex-row min-[480px]:flex-wrap ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: "900ms" }}
          >
            <a
              href="#explore"
              className="group inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-primary px-7 text-base font-medium text-primary-foreground transition-all hover:-translate-y-1 hover:scale-[1.02] hover:bg-primary/90 hover:shadow-lg min-[480px]:w-auto"
            >
              Explore the City
              <span className="flex size-6 items-center justify-center rounded-full bg-primary-foreground/20 transition-transform group-hover:translate-x-1">
                <ArrowRight className="size-3.5" />
              </span>
            </a>
            <a
              href="#stories"
              className="group inline-flex h-13 w-full items-center justify-center gap-2 rounded-full border-2 border-primary/20 bg-card px-7 text-base font-semibold text-primary transition-all hover:-translate-y-1 hover:scale-[1.02] hover:bg-secondary hover:shadow-md min-[480px]:w-auto"
            >
              Watch the Tour
              <span className="relative flex size-6 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform group-hover:scale-110">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent" />
                <Play className="relative size-3 fill-current" />
              </span>
            </a>
          </div>
        </Reveal>

        <div className="relative order-1 lg:order-2">
          <div
            className="group relative overflow-hidden rounded-4xl border-2 border-card bg-secondary/40 shadow-xl transition-transform duration-500 ease-out"
            style={{
              transform: `translate3d(${offset.x * 0.35}px, ${offset.y * 0.35}px, 0) rotate(${offset.x * 0.05}deg)`,
            }}
          >
            <div className="pointer-events-none absolute inset-0 z-10 animate-shimmer opacity-40" />
            <Image
              src="/hero-duo.png"
              alt="Nardeen and the Zaqzouqa mascot welcoming you to Marketing City"
              width={720}
              height={640}
              priority
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            />
          </div>

          <div
            className={`absolute -top-2 right-2 hidden max-w-[15rem] transition-all duration-700 md:block ${
              mounted ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
            }`}
            style={{
              transitionDelay: "1100ms",
              transform: mounted
                ? `translate3d(${offset.x * -0.6}px, ${offset.y * -0.5}px, 0)`
                : undefined,
            }}
          >
            <div className="animate-float rotate-2 rounded-3xl rounded-bl-sm border-2 border-accent/30 bg-card p-4 shadow-lg">
              <p className="text-sm font-semibold leading-relaxed text-foreground">
                Hi! I&apos;m Zaqzouqa! I run this city with my human, Nardeen!{" "}
                <Heart className="inline size-3.5 text-accent animate-heartbeat" />
              </p>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="absolute -bottom-3 left-4 hidden md:block"
            style={{ transform: `translate3d(${offset.x * 0.8}px, ${offset.y * 0.8}px, 0)` }}
          >
            <div className="size-16 animate-spin-slow rounded-full border-2 border-dashed border-gold/50" />
          </div>
        </div>
      </div>
    </section>
  )
}
