"use client"

import { useEffect, useState } from "react"
import { Menu, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Explore the City", href: "#explore" },
  { label: "Services", href: "#explore" },
  { label: "Packages", href: "#packages" },
  { label: "Success Stories", href: "#stories" },
  { label: "Resources", href: "#footer" },
  { label: "About Us", href: "#team" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-md transition-all duration-300 ${
        scrolled
          ? "border-border/80 bg-background/92 shadow-sm"
          : "border-border/40 bg-background/80"
      }`}
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-all duration-300 md:px-8 ${
          scrolled ? "py-2.5" : "py-3.5"
        }`}
      >
        <a href="#home" className="group flex flex-col leading-none">
          <span className="font-display text-2xl font-extrabold text-primary transition-transform duration-300 group-hover:scale-[1.02]">
            Zaqzouqa
          </span>
          <span className="text-[0.6rem] font-bold uppercase tracking-[0.25em] text-accent">
            Marketing City
          </span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative text-sm font-semibold text-foreground/80 transition-colors hover:text-accent after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-accent after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button className="group hidden h-11 gap-2 rounded-full bg-primary px-6 text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md md:inline-flex">
            Let&apos;s Talk
            <Send className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="relative flex size-11 items-center justify-center rounded-full text-primary transition-colors hover:bg-secondary lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <Menu
              className={`absolute size-6 transition-all duration-300 ${
                open ? "scale-50 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
              }`}
            />
            <X
              className={`absolute size-6 transition-all duration-300 ${
                open ? "scale-100 rotate-0 opacity-100" : "scale-50 -rotate-90 opacity-0"
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className={`border-t border-border/60 bg-background transition-all duration-300 ease-out lg:hidden ${
          open
            ? "max-h-[min(28rem,calc(100dvh-4.5rem))] overflow-y-auto opacity-100"
            : "max-h-0 overflow-hidden border-transparent opacity-0"
        }`}
      >
        <nav className="px-4 py-4" aria-label="Mobile">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link, i) => (
              <li
                key={link.label}
                className={`transition-all duration-300 ${
                  open ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${80 + i * 40}ms` : "0ms" }}
              >
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-base font-semibold text-foreground/90 transition-colors hover:bg-secondary hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li
              className={`mt-2 transition-all duration-300 ${
                open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
              style={{ transitionDelay: open ? "360ms" : "0ms" }}
            >
              <Button className="h-12 w-full gap-2 rounded-full bg-primary text-primary-foreground">
                Let&apos;s Talk
                <Send className="size-4" />
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
