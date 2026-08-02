"use client"

import { useEffect, useState } from "react"

type AnimatedTextProps = {
  text: string
  className?: string
  delay?: number
  stagger?: number
  as?: "span" | "h1" | "h2" | "p"
}

export function AnimatedText({
  text,
  className = "",
  delay = 0,
  stagger = 28,
  as: Tag = "span",
}: AnimatedTextProps) {
  const [visible, setVisible] = useState(false)
  const chars = Array.from(text)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true)
      return
    }
    const id = window.setTimeout(() => setVisible(true), delay)
    return () => window.clearTimeout(id)
  }, [delay])

  return (
    <Tag className={className} aria-label={text}>
      {chars.map((char, i) => (
        <span
          key={`${char}-${i}`}
          aria-hidden="true"
          className={`char-reveal ${visible ? "is-visible" : ""}`}
          style={{ transitionDelay: `${delay + i * stagger}ms`, whiteSpace: char === " " ? "pre" : undefined }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </Tag>
  )
}

type TypewriterProps = {
  phrases: string[]
  className?: string
}

export function Typewriter({ phrases, className = "" }: TypewriterProps) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState("")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(phrases[0] ?? "")
      return
    }

    const current = phrases[index % phrases.length] ?? ""
    const speed = deleting ? 36 : 58
    const pause = deleting && text === "" ? 400 : !deleting && text === current ? 1600 : speed

    const id = window.setTimeout(() => {
      if (!deleting && text === current) {
        setDeleting(true)
        return
      }
      if (deleting && text === "") {
        setDeleting(false)
        setIndex((i) => (i + 1) % phrases.length)
        return
      }
      setText(current.slice(0, text.length + (deleting ? -1 : 1)))
    }, pause)

    return () => window.clearTimeout(id)
  }, [text, deleting, index, phrases])

  return (
    <span className={className}>
      {text}
      <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-current align-middle" style={{ height: "1em" }} />
    </span>
  )
}
