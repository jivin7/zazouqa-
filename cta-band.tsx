import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Reveal } from "@/components/reveal"

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-primary pb-0 pt-4 text-primary-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 animate-gradient opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, color-mix(in oklch, var(--accent) 35%, transparent), transparent 55%), radial-gradient(ellipse at 80% 20%, color-mix(in oklch, var(--gold) 25%, transparent), transparent 50%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-end gap-6 px-4 md:grid-cols-2 md:px-8">
        <Reveal className="pb-12 md:pb-16" variant="left">
          <h2 className="font-display text-3xl font-extrabold leading-tight text-balance sm:text-4xl md:text-5xl">
            Ready to Build Your Empire?
          </h2>
          <p className="mt-3 max-w-md leading-relaxed text-primary-foreground/80">
            Grab your map, bring your ideas, and let&apos;s build something unforgettable.
          </p>
          <a
            href="#packages"
            className="group mt-6 inline-flex h-13 w-full max-w-xs items-center justify-center gap-2 rounded-full bg-primary-foreground px-7 text-base font-medium text-primary transition-all hover:-translate-y-1 hover:scale-[1.03] hover:bg-primary-foreground/90 hover:shadow-xl min-[480px]:w-auto"
          >
            Let&apos;s Build My City
            <span className="flex size-6 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform group-hover:translate-x-1 group-hover:rotate-12">
              <ArrowRight className="size-3.5" />
            </span>
          </a>
        </Reveal>
        <div className="flex justify-center md:justify-end">
          <Image
            src="/cta-highfive.png"
            alt="Nardeen and Zaqzouqa celebrating with a high five"
            width={520}
            height={420}
            className="h-auto w-full max-w-md animate-float-slow object-contain transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>
    </section>
  )
}
