"use client"

import { useState, type MouseEvent } from "react"
import Image from "next/image"
import { Crown, Heart } from "lucide-react"
import { Reveal } from "@/components/reveal"

export function Team() {
  const [tilts, setTilts] = useState({ n: { x: 0, y: 0 }, z: { x: 0, y: 0 } })

  const onTilt = (key: "n" | "z", e: MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14
    setTilts((t) => ({ ...t, [key]: { x: y, y: x } }))
  }

  const reset = (key: "n" | "z") => setTilts((t) => ({ ...t, [key]: { x: 0, y: 0 } }))

  return (
    <section id="team" className="relative overflow-hidden bg-card py-16 md:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 size-56 animate-blob bg-gold/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <Reveal className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left" variant="left">
            <div
              className="size-40 shrink-0 overflow-hidden rounded-full border-4 border-background shadow-lg transition-transform duration-300 ease-out hover:shadow-xl"
              style={{ transform: `perspective(600px) rotateX(${tilts.n.x}deg) rotateY(${tilts.n.y}deg)` }}
              onMouseMove={(e) => onTilt("n", e)}
              onMouseLeave={() => reset("n")}
            >
              <Image
                src="/nardeen.png"
                alt="Nardeen, Chief Strategy & Creativity Officer"
                width={200}
                height={200}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="flex items-center justify-center gap-2 font-display text-2xl font-extrabold text-primary sm:justify-start">
                Nardeen <Crown className="size-5 text-gold animate-wiggle" aria-hidden="true" />
              </h3>
              <p className="text-sm font-bold uppercase tracking-wide text-accent">
                Chief Strategy &amp; Creativity Officer
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Part planner, part creative, 100% passionate about helping brands grow with heart
                and strategy.
              </p>
            </div>
          </Reveal>

          <Reveal
            delay={150}
            variant="right"
            className="flex flex-col items-center gap-6 text-center sm:flex-row-reverse sm:text-right"
          >
            <div
              className="size-40 shrink-0 overflow-hidden rounded-full border-4 border-background bg-secondary shadow-lg transition-transform duration-300 ease-out hover:shadow-xl"
              style={{ transform: `perspective(600px) rotateX(${tilts.z.x}deg) rotateY(${tilts.z.y}deg)` }}
              onMouseMove={(e) => onTilt("z", e)}
              onMouseLeave={() => reset("z")}
            >
              <Image
                src="/mascot.png"
                alt="Zaqzouqa, Chief Fun Officer"
                width={200}
                height={200}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-display text-2xl font-extrabold text-primary">Zaqzouqa</h3>
              <p className="text-sm font-bold uppercase tracking-wide text-accent">
                Chief Fun Officer
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Ideas, doodles, snacks, and tiny but mighty plans. I make marketing fun!
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal
          as="p"
          delay={200}
          variant="scale"
          className="mx-auto mt-10 flex max-w-md flex-wrap items-center justify-center gap-2 px-2 text-center font-display text-base font-bold text-primary sm:text-lg"
        >
          Together, we make magic (and marketing) happen.
          <Heart className="size-5 shrink-0 text-accent animate-heartbeat" aria-hidden="true" />
        </Reveal>
      </div>
    </section>
  )
}
