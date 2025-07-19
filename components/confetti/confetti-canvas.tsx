"use client"

import { useEffect, useRef } from "react"

interface ConfettiParticle {
  color: string
  x: number
  y: number
  diameter: number
  tilt: number
  tiltAngleIncrement: number
  tiltAngle: number
  particleSpeed: number
  waveAngle: number
  opacity: number
}

export function ConfettiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number>()
  const particles = useRef<ConfettiParticle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Confetti colors
    const colors = ["#8C57FF", "#56CA00", "#16B1FF", "#FFB400", "#FF4C51"]

    // Create particles
    const createParticles = () => {
      particles.current = []
      const particleCount = Math.min(Math.floor(canvas.width / 10), 150) // Adjust based on screen width

      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          color: colors[Math.floor(Math.random() * colors.length)],
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height - canvas.height,
          diameter: Math.random() * 10 + 5,
          tilt: Math.random() * 10 - 10,
          tiltAngleIncrement: Math.random() * 0.07 + 0.05,
          tiltAngle: 0,
          particleSpeed: Math.random() + 1,
          waveAngle: 0,
          opacity: 1,
        })
      }
    }

    createParticles()

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.current.forEach((particle, index) => {
        particle.tiltAngle += particle.tiltAngleIncrement
        particle.y += (Math.cos(particle.waveAngle) + particle.particleSpeed) * 2
        particle.tilt = Math.sin(particle.tiltAngle) * 15
        particle.waveAngle += 0.01

        // Fade out as particles fall
        if (particle.y > canvas.height * 0.7) {
          particle.opacity = Math.max(0, particle.opacity - 0.01)
        }

        // Draw particle
        ctx.beginPath()
        ctx.lineWidth = particle.diameter
        ctx.strokeStyle = `rgba(${hexToRgb(particle.color)}, ${particle.opacity})`

        const x1 = particle.x
        const y1 = particle.y
        const x2 = particle.x + particle.tilt
        const y2 = particle.y + particle.tilt

        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()

        // Reset particle if it's off screen or fully transparent
        if (particle.y > canvas.height || particle.opacity <= 0) {
          particles.current[index] = {
            ...particle,
            x: Math.random() * canvas.width,
            y: 0 - particle.diameter,
            opacity: 1,
          }
        }
      })

      animationFrameId.current = requestAnimationFrame(animate)
    }

    // Helper function to convert hex to rgb
    const hexToRgb = (hex: string): string => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result
        ? `${Number.parseInt(result[1], 16)}, ${Number.parseInt(result[2], 16)}, ${Number.parseInt(result[3], 16)}`
        : "255, 255, 255"
    }

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />
}
