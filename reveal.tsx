"use client"

import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react"

export type RevealVariant = "up" | "left" | "right" | "scale" | "blur"

type RevealProps<T extends ElementType = "div"> = {
  children: ReactNode
  as?: T
  delay?: number
  className?: string
  variant?: RevealVariant
  once?: boolean
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">

export function Reveal<T extends ElementType = "div">({
  children,
  as,
  delay = 0,
  className = "",
  variant = "up",
  once = true,
  ...rest
}: RevealProps<T>) {
  const Tag = (as ?? "div") as ElementType
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            setVisible(false)
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [once])

  const { style, ...attrs } = rest as { style?: CSSProperties }

  return (
    <Tag
      ref={ref}
      className={`reveal reveal-${variant} ${visible ? "is-visible" : ""} ${className}`}
      style={{
        ...style,
        ...(delay ? { transitionDelay: `${delay}ms` } : null),
      }}
      {...attrs}
    >
      {children}
    </Tag>
  )
}
