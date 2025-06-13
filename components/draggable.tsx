"use client"

import type React from "react"
import { useState, useRef, useEffect, type ReactNode } from "react"

interface DraggableProps {
  children: ReactNode
  localStorageKey?: string
  initialPosition?: "top-right" | "bottom-right" | { x: number; y: number }
  onDragStart?: () => void
  onDragEnd?: () => void
  disabled?: boolean
  bounds?: "parent" | "window" | { top?: number; right?: number; bottom?: number; left?: number }
  popupWidth?: number
  popupHeight?: number
  paddingFromEdge?: number
  animateFromBottom?: boolean
}

export function Draggable({
  children,
  localStorageKey = "draggable-position",
  initialPosition = "bottom-right",
  onDragStart,
  onDragEnd,
  disabled = false,
  bounds = "window",
  popupWidth = 384,
  popupHeight = 600,
  paddingFromEdge = 20,
  animateFromBottom = true,
}: DraggableProps) {
  const [position, setPosition] = useState(() => {
    if (typeof window === "undefined") {
      return { x: 0, y: 0 } // SSR fallback
    }

    // Check for saved position first
    if (localStorageKey) {
      const savedPosition = localStorage.getItem(localStorageKey)
      if (savedPosition) {
        try {
          const parsedPosition = JSON.parse(savedPosition)
          // Ensure saved position is within current window bounds
          const maxX = window.innerWidth - popupWidth
          const maxY = window.innerHeight - popupHeight

          return {
            x: Math.min(Math.max(0, parsedPosition.x), maxX),
            y: Math.min(Math.max(0, parsedPosition.y), maxY),
          }
        } catch (e) {
          console.error("Failed to parse saved position:", e)
        }
      }
    }

    // If no saved position or parsing failed, use default position
    if (typeof initialPosition === "object") {
      return initialPosition
    }

    // Calculate default position based on initialPosition
    if (initialPosition === "bottom-right") {
      return {
        x: window.innerWidth - popupWidth - paddingFromEdge,
        y: window.innerHeight - popupHeight - paddingFromEdge,
      }
    } else {
      // top-right
      return {
        x: window.innerWidth - popupWidth - paddingFromEdge,
        y: paddingFromEdge,
      }
    }
  })

  const [isAnimating, setIsAnimating] = useState(animateFromBottom)
  const [isDragging, setIsDragging] = useState(false)
  const [hasBeenDragged, setHasBeenDragged] = useState(false)
  const dragRef = useRef<HTMLDivElement>(null)
  const offset = useRef({ x: 0, y: 0 })

  // Check if position has been manually set (dragged) by comparing with default
  useEffect(() => {
    if (typeof window !== "undefined" && localStorageKey) {
      const savedPosition = localStorage.getItem(localStorageKey)
      if (savedPosition) {
        setHasBeenDragged(true)
      }
    }
  }, [localStorageKey])

  // Animation effect when component mounts
  useEffect(() => {
    if (animateFromBottom && isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false)
      }, 300) // Animation duration
      return () => clearTimeout(timer)
    }
  }, [animateFromBottom, isAnimating])

  // Recalculate position on window resize
  useEffect(() => {
    const handleResize = () => {
      setPosition((prevPosition) => {
        // If user has dragged the popup, try to maintain relative position
        if (hasBeenDragged) {
          const maxX = window.innerWidth - popupWidth
          const maxY = window.innerHeight - popupHeight

          return {
            x: Math.min(Math.max(0, prevPosition.x), maxX),
            y: Math.min(Math.max(0, prevPosition.y), maxY),
          }
        } else {
          // If not dragged, always use extreme right default position
          if (initialPosition === "bottom-right") {
            return {
              x: window.innerWidth - popupWidth - paddingFromEdge,
              y: window.innerHeight - popupHeight - paddingFromEdge,
            }
          } else {
            return {
              x: window.innerWidth - popupWidth - paddingFromEdge,
              y: paddingFromEdge,
            }
          }
        }
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [initialPosition, popupWidth, popupHeight, paddingFromEdge, hasBeenDragged])

  // Save position to localStorage when dragging ends
  useEffect(() => {
    if (localStorageKey && !isDragging && hasBeenDragged) {
      localStorage.setItem(localStorageKey, JSON.stringify(position))
    }
  }, [position, localStorageKey, isDragging, hasBeenDragged])

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !dragRef.current) return

    const target = e.target as HTMLElement
    if (!target.classList.contains("cursor-grab") && !target.closest(".cursor-grab")) {
      if (
        target.tagName === "INPUT" ||
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.closest('[role="tab"]')
      ) {
        return
      }
    }

    setIsDragging(true)
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    }
    if (onDragStart) onDragStart()
    document.body.style.userSelect = "none"
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || disabled || !dragRef.current) return

    let newX = e.clientX - offset.current.x
    let newY = e.clientY - offset.current.y

    const el = dragRef.current
    if (bounds === "window" || (typeof bounds === "object" && bounds !== null)) {
      const minX = typeof bounds === "object" && bounds.left !== undefined ? bounds.left : 0
      const minY = typeof bounds === "object" && bounds.top !== undefined ? bounds.top : 0
      const maxX =
        typeof bounds === "object" && bounds.right !== undefined
          ? window.innerWidth - el.offsetWidth - bounds.right
          : window.innerWidth - el.offsetWidth
      const maxY =
        typeof bounds === "object" && bounds.bottom !== undefined
          ? window.innerHeight - el.offsetHeight - bounds.bottom
          : window.innerHeight - el.offsetHeight

      newX = Math.max(minX, Math.min(newX, maxX))
      newY = Math.max(minY, Math.min(newY, maxY))
    }

    setPosition({ x: newX, y: newY })
  }

  const handleMouseUp = () => {
    if (disabled) return
    setIsDragging(false)
    setHasBeenDragged(true) // Mark as dragged once user moves it
    if (onDragEnd) onDragEnd()
    document.body.style.userSelect = ""
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    } else {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.style.userSelect = ""
    }
  }, [isDragging, disabled, bounds, popupWidth, paddingFromEdge])

  // Only animate the Y position and opacity, keep X fixed at calculated position
  const animationStyle = isAnimating
    ? {
        transform: "translateY(20px)",
        opacity: 0,
        transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
      }
    : {
        transform: "translateY(0)",
        opacity: 1,
        transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
      }

  return (
    <div
      ref={dragRef}
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 1000,
        ...animationStyle,
      }}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  )
}
