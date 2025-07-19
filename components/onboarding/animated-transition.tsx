"use client"

import { type ReactNode, useEffect, useState } from "react"
import { usePathname } from "next/navigation"

interface AnimatedTransitionProps {
  children: ReactNode
}

export function AnimatedTransition({ children }: AnimatedTransitionProps) {
  const pathname = usePathname()
  const [isAnimating, setIsAnimating] = useState(false)
  const [content, setContent] = useState(children)
  const [prevPathname, setPrevPathname] = useState(pathname)

  useEffect(() => {
    // If the pathname changes, trigger animation
    if (pathname !== prevPathname) {
      setIsAnimating(true)

      // After animation out completes, update content and animate in
      const timer = setTimeout(() => {
        setContent(children)
        setPrevPathname(pathname)

        // Small delay to ensure DOM updates before animating back in
        setTimeout(() => {
          setIsAnimating(false)
        }, 50)
      }, 300) // This should match the CSS transition time

      return () => clearTimeout(timer)
    }
  }, [pathname, children, prevPathname])

  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        isAnimating ? "opacity-0 translate-x-8" : "opacity-100 translate-x-0"
      }`}
    >
      {content}
    </div>
  )
}
