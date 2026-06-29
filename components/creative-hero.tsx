"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function CreativeHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animFrameRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const isMob = window.innerWidth < 768

    let devicePixelRatio = window.devicePixelRatio || 1

    const setCanvasDimensions = () => {
      devicePixelRatio = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * devicePixelRatio
      canvas.height = rect.height * devicePixelRatio
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
    }

    setCanvasDimensions()

    // Attractor position
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      targetX = e.clientX - rect.left
      targetY = e.clientY - rect.top
    }

    if (!isMob) {
      window.addEventListener("mousemove", handleMouseMove)
    }

    // Particle
    class Particle {
      x: number
      y: number
      baseX: number
      baseY: number
      size: number
      density: number
      color: string

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.baseX = x
        this.baseY = y
        this.size = Math.random() * (isMob ? 2.5 : 5) + 1.5
        this.density = Math.random() * 30 + 1
        const hue = Math.random() * 60 + 270
        this.color = `hsl(${hue}, 70%, 60%)`
      }

      update() {
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const maxDist = isMob ? 80 : 100

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist
          this.x -= (dx / dist) * force * this.density
          this.y -= (dy / dist) * force * this.density
        } else {
          this.x -= (this.x - this.baseX) / 10
          this.y -= (this.y - this.baseY) / 10
        }
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const particles: Particle[] = []
    const grid = isMob ? 44 : 30

    function init() {
      particles.length = 0
      const w = canvas.width / devicePixelRatio
      const h = canvas.height / devicePixelRatio
      const nx = Math.floor(w / grid)
      const ny = Math.floor(h / grid)
      for (let y = 0; y < ny; y++) {
        for (let x = 0; x < nx; x++) {
          particles.push(new Particle(x * grid + grid / 2, y * grid + grid / 2))
        }
      }
    }

    init()

    const connDist = isMob ? 42 : 30

    const animate = (time: number) => {
      const w = canvas.width / devicePixelRatio
      const h = canvas.height / devicePixelRatio
      ctx.clearRect(0, 0, w, h)

      // Auto-drift on mobile
      if (isMob) {
        const r = Math.min(w, h) / 3
        targetX = w / 2 + Math.cos(time * 0.0007) * r
        targetY = h / 2 + Math.sin(time * 0.001) * r
      } else if (targetX === 0 && targetY === 0) {
        const r = Math.min(w, h) / 3
        targetX = w / 2 + Math.cos(time * 0.0007) * r
        targetY = h / 2 + Math.sin(time * 0.001) * r
      }

      mouseX += (targetX - mouseX) * 0.08
      mouseY += (targetY - mouseY) * 0.08

      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < connDist) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(180, 120, 255, ${0.15 - d / 200})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(animate)
    }

    animFrameRef.current = requestAnimationFrame(animate)

    const onResize = () => {
      setCanvasDimensions()
      init()
    }
    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("resize", onResize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  return (
    <motion.div
      className="w-full h-[250px] sm:h-[350px] md:h-[500px] relative pointer-events-none md:pointer-events-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </motion.div>
  )
}
