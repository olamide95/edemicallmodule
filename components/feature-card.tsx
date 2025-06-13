import type { ReactNode } from "react"
import Link from "next/link"

interface FeatureCardProps {
  title: string
  icon: ReactNode
  href: string
}

export function FeatureCard({ title, icon, href }: FeatureCardProps) {
  return (
    <Link
      href={href}
      className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg shadow-[0_5px_11px_3px_rgba(0,0,0,0.15)] dark:shadow-[0_5px_11px_3px_rgba(0,0,0,0.3)] hover:shadow-[0_7px_14px_4px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_7px_14px_4px_rgba(0,0,0,0.4)] transition-shadow p-6 flex flex-col items-center justify-center gap-4 border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.05)]"
      style={{
        imageRendering: "crisp-edges",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        shapeRendering: "crispEdges",
        textRendering: "geometricPrecision",
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
        transform: "translateZ(0)",
      }}
    >
      <div className="flex items-center justify-center h-16 w-16 overflow-hidden">{icon}</div>
      <h3 className="text-center text-base font-bold text-light-text-primary dark:text-dark-text-primary antialiased">
        {title}
      </h3>
    </Link>
  )
}
