"use client"

import { useState } from "react"
import { Tag, Coffee, MessagesSquare, Megaphone, Crown, BarChart3, ArrowRight, X } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { Button } from "@/components/ui/button"

const DISTRICTS = [
  {
    icon: Tag,
    title: "Branding Street",
    desc: "We craft memorable brands that stand out and stick.",
    detail:
      "Logo systems, voice guidelines, and visual identity kits that make your brand instantly recognizable — and impossible to forget.",
    color: "bg-accent/15 text-accent",
  },
  {
    icon: Coffee,
    title: "Content Café",
    desc: "Content that tells your story & keeps people coming back.",
    detail:
      "From scroll-stopping posts to long-form stories, we brew content that tastes like your brand and keeps audiences hungry for more.",
    color: "bg-gold/20 text-primary",
  },
  {
    icon: MessagesSquare,
    title: "Social Media Station",
    desc: "Grow your community and spark real conversations.",
    detail:
      "Community management, content calendars, and engagement strategies that turn followers into fans — and fans into customers.",
    color: "bg-secondary text-accent",
  },
  {
    icon: Megaphone,
    title: "Ads Avenue",
    desc: "Smart ads for real results (without wasting your coins).",
    detail:
      "Targeted campaigns across Meta, Google, and more — optimized daily so every coin works harder than the last.",
    color: "bg-accent/20 text-accent",
  },
  {
    icon: Crown,
    title: "Strategy Square",
    desc: "Big picture thinking with a plan that actually works.",
    detail:
      "Roadmaps, positioning, and go-to-market plans that connect every district into one empire-building machine.",
    color: "bg-gold/25 text-primary",
  },
  {
    icon: BarChart3,
    title: "Analytics Tower",
    desc: "Data, insights & reports so you always know what's working.",
    detail:
      "Clear dashboards and monthly insights that show what's winning, what's wobbling, and where to double down.",
    color: "bg-secondary text-primary",
  },
]

export function ExploreCity() {
  const [active, setActive] = useState<number | null>(null)
  const selected = active !== null ? DISTRICTS[active] : null

  return (
    <section id="explore" className="relative overflow-hidden bg-card py-12 sm:py-16 md:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-10 size-64 animate-blob bg-accent/10 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal className="text-center" variant="blur">
          <h2 className="font-display text-3xl font-extrabold text-balance text-primary sm:text-4xl md:text-5xl">
            Explore the City
          </h2>
          <p className="mt-2 text-muted-foreground text-pretty">
            Pick a district and let&apos;s build something amazing together!
          </p>
        </Reveal>

        <div className="mt-8 grid gap-3 min-[480px]:grid-cols-2 sm:mt-10 sm:gap-4 lg:grid-cols-3 xl:grid-cols-6">
          {DISTRICTS.map((d, i) => {
            const isActive = active === i
            return (
              <Reveal
                key={d.title}
                as="button"
                type="button"
                delay={i * 80}
                variant="scale"
                onClick={() => setActive(isActive ? null : i)}
                className={`group flex w-full min-w-0 flex-col rounded-3xl border p-4 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl sm:p-5 ${
                  isActive
                    ? "-translate-y-2 border-accent bg-background shadow-xl ring-2 ring-accent/30"
                    : "border-border bg-background hover:border-accent/40"
                }`}
              >
                <span
                  className={`mx-auto flex size-14 items-center justify-center rounded-2xl transition-all duration-300 ${
                    isActive
                      ? "bg-accent text-accent-foreground scale-110 -rotate-6"
                      : `${d.color} group-hover:bg-accent group-hover:text-accent-foreground group-hover:-rotate-6 group-hover:scale-110`
                  }`}
                >
                  <d.icon className="size-7" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-balance text-primary">{d.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-pretty text-muted-foreground">{d.desc}</p>
                <span
                  className={`mx-auto mt-4 flex size-8 items-center justify-center rounded-full border transition-all ${
                    isActive
                      ? "border-accent bg-accent text-accent-foreground rotate-90"
                      : "border-border text-accent group-hover:bg-accent group-hover:text-accent-foreground group-hover:translate-x-0.5"
                  }`}
                >
                  <ArrowRight className="size-4" />
                </span>
              </Reveal>
            )
          })}
        </div>

        {selected && (
          <div
            key={selected.title}
            className="animate-fade-swap mt-8 overflow-hidden rounded-3xl border-2 border-accent/30 bg-background p-4 shadow-lg sm:p-6 md:p-8"
          >
            <div className="flex items-start justify-between gap-3 sm:gap-4">
              <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-foreground animate-bounce-in sm:size-14">
                  <selected.icon className="size-6 sm:size-7" />
                </span>
                <div className="min-w-0">
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-accent sm:text-xs sm:tracking-[0.2em]">
                    District unlocked
                  </p>
                  <h3 className="font-display text-xl font-extrabold text-balance text-primary sm:text-2xl">
                    {selected.title}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close district details"
                className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
              >
                <X className="size-4" />
              </button>
            </div>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{selected.detail}</p>
            <Button
              className="group mt-5 h-11 gap-2 rounded-full bg-primary px-6 text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90"
              onClick={() => {
                document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Build in this district
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
