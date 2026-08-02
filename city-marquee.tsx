const ITEMS = [
  "Branding Street",
  "Content Café",
  "Social Media Station",
  "Ads Avenue",
  "Strategy Square",
  "Analytics Tower",
  "Fun Guaranteed",
  "Big Results",
]

export function CityMarquee() {
  const loop = [...ITEMS, ...ITEMS]

  return (
    <div className="relative overflow-hidden border-y border-border/70 bg-secondary/40 py-3">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
      <div className="animate-marquee flex w-max gap-8 whitespace-nowrap">
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center gap-3 font-display text-sm font-bold uppercase tracking-[0.18em] text-primary/70"
          >
            <span className="size-1.5 rounded-full bg-accent" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
