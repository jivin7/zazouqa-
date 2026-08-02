"use client"

import { Rocket, Building2, Flag, Check, Star, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/reveal"
import { CountUp } from "@/components/count-up"

const PLANS = [
  {
    icon: Rocket,
    name: "Starter Explorer",
    tagline: "Perfect for getting started.",
    price: 899,
    features: ["Brand Basics", "Content Plan", "1 Social Platform", "Monthly Report"],
    cta: "Let's Start",
    featured: false,
  },
  {
    icon: Building2,
    name: "City Builder",
    tagline: "For brands ready to grow.",
    price: 2499,
    features: ["Branding + Strategy", "Content Creation", "Social Media Management", "Ad Campaigns"],
    cta: "Build My City",
    featured: true,
  },
  {
    icon: Flag,
    name: "Empire Maker",
    tagline: "For big dreams & big moves.",
    price: 4999,
    features: ["Full Marketing Strategy", "Multi-Platform Management", "Ads + Funnels", "Advanced Analytics"],
    cta: "Let's Build an Empire",
    featured: false,
  },
]

export function Pricing() {
  return (
    <section id="packages" className="relative overflow-hidden py-16 md:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 size-72 -translate-x-1/2 animate-blob bg-gold/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <Reveal className="text-center" variant="blur">
          <h2 className="font-display text-3xl font-extrabold text-balance text-primary sm:text-4xl md:text-5xl">
            Choose Your Adventure
          </h2>
          <p className="mt-2 text-muted-foreground">
            Simple packages. Serious results. Zero boring meetings.
          </p>
        </Reveal>

        <div className="mt-10 grid items-start gap-5 lg:grid-cols-4">
          {PLANS.map((plan, i) => (
            <Reveal
              key={plan.name}
              as="article"
              delay={i * 110}
              variant="up"
              className={`group relative flex h-full flex-col rounded-3xl border-2 p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                plan.featured
                  ? "border-accent bg-card shadow-xl lg:-mt-2 lg:hover:-mt-3"
                  : "border-border bg-card hover:border-accent/40"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-accent px-4 py-1 text-xs font-bold text-accent-foreground shadow-md animate-bounce-in">
                  <Star className="size-3 fill-current animate-twinkle" /> Most Popular
                </span>
              )}
              <span className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground group-hover:-rotate-12 group-hover:scale-110">
                <plan.icon className="size-6" />
              </span>
              <h3 className="mt-4 font-display text-xl font-extrabold text-primary">{plan.name}</h3>
              <p className="text-sm text-muted-foreground">{plan.tagline}</p>

              <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                {plan.features.map((f, fi) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-sm text-foreground/90 transition-transform duration-300 group-hover:translate-x-0.5"
                    style={{ transitionDelay: `${fi * 40}ms` }}
                  >
                    <span className="flex size-5 items-center justify-center rounded-full bg-secondary text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                      <Check className="size-3" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <p className="text-sm text-muted-foreground">
                  From{" "}
                  <CountUp
                    value={plan.price}
                    prefix="$"
                    className="font-display text-2xl font-extrabold text-primary"
                  />
                  <span className="text-xs">/month</span>
                </p>
                <Button
                  className={`mt-3 h-11 w-full rounded-full transition-all hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] ${
                    plan.featured
                      ? "bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-lg"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  {plan.cta}
                </Button>
              </div>
            </Reveal>
          ))}

          <Reveal
            as="aside"
            delay={PLANS.length * 110}
            variant="scale"
            className="group flex h-full flex-col justify-center rounded-3xl border-2 border-dashed border-gold/50 bg-secondary/50 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:bg-secondary/80 hover:shadow-lg"
          >
            <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-gold/20 text-primary transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">
              <MapPin className="size-6 animate-float" />
            </span>
            <h3 className="mt-4 font-display text-lg font-extrabold text-primary">Not sure yet?</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Let&apos;s chat and find the perfect path for you!
            </p>
            <Button
              variant="outline"
              className="mt-4 h-11 rounded-full border-2 border-primary/20 bg-card font-semibold text-primary transition-all hover:-translate-y-0.5 hover:bg-background hover:scale-[1.02]"
            >
              Talk to us
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
