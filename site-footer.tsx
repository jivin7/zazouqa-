"use client"

import type React from "react"
import { useState } from "react"
import { Camera, Briefcase, Play, Send, Check } from "lucide-react"
import { Reveal } from "@/components/reveal"

const COLUMNS = [
  {
    title: "Explore",
    links: ["Home", "Explore the City", "Services", "Packages", "Success Stories"],
  },
  {
    title: "Resources",
    links: ["Blog", "Free Guides", "Templates", "FAQs"],
  },
  {
    title: "Company",
    links: ["About Us", "Our Process", "Careers", "Contact Us"],
  },
]

export function SiteFooter() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  return (
    <footer id="footer" className="bg-primary pt-14 text-primary-foreground pb-[max(2.5rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto max-w-7xl px-4 pb-10 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_2fr_1.6fr]">
          <Reveal variant="up">
            <p className="font-display text-2xl font-extrabold">Zaqzouqa</p>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">
              Marketing City
            </p>
            <p className="mt-4 text-sm text-primary-foreground/70">
              Smart marketing. Big dreams. Made fun.
            </p>
            <div className="mt-5 flex gap-3">
              {[Camera, Briefcase, Play].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex size-10 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-gold hover:text-primary"
                  aria-label="Social media link"
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-x-4 gap-y-8 min-[480px]:gap-8 sm:grid-cols-3">
            {COLUMNS.map((col, ci) => (
              <Reveal key={col.title} delay={ci * 80} variant="up" className="min-w-0">
                <h3 className="font-display text-sm font-bold uppercase tracking-wide text-gold">
                  {col.title}
                </h3>
                <ul className="mt-3 space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="inline-block text-sm text-primary-foreground/70 transition-all hover:translate-x-1 hover:text-primary-foreground"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} variant="right">
            <h3 className="font-display text-lg font-bold">Stay in the Loop!</h3>
            <p className="mt-2 text-sm text-primary-foreground/70">
              Fun tips, clever ideas, and city updates.
            </p>
            <form
              onSubmit={(e: React.FormEvent) => {
                e.preventDefault()
                setEmail("")
                setSent(true)
                window.setTimeout(() => setSent(false), 2800)
              }}
              className="mt-4 flex items-center gap-2 rounded-full bg-primary-foreground p-1.5 pl-5 transition-shadow focus-within:shadow-[0_0_0_3px_color-mix(in_oklch,var(--gold)_45%,transparent)]"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email here..."
                aria-label="Email address"
                className="min-w-0 flex-1 bg-transparent text-base text-primary outline-none placeholder:text-primary/50 text-[16px]"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground transition-all hover:scale-110 hover:bg-accent/90 active:scale-95"
              >
                {sent ? <Check className="size-4 animate-bounce-in" /> : <Send className="size-4" />}
              </button>
            </form>
            {sent && (
              <p className="mt-2 animate-slide-in text-sm font-semibold text-gold">
                You&apos;re on the list — welcome to the city!
              </p>
            )}
          </Reveal>
        </div>

        <div className="mt-12 border-t border-primary-foreground/15 pt-6 text-center text-xs text-primary-foreground/60">
          © {new Date().getFullYear()} Zaqzouqa Marketing City. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
