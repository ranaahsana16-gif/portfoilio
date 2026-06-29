"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function CreativeHero({ isGlobalBackground = false }: { isGlobalBackground?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animFrameRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const isMob = typeof window !== "undefined" && window.innerWidth < 768
    let devicePixelRatio = (typeof window !== "undefined" && window.devicePixelRatio) || 1

    const setCanvasDimensions = () => {
      devicePixelRatio = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * devicePixelRatio
      canvas.height = rect.height * devicePixelRatio
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
    }

    setCanvasDimensions()

    // Attractor position (gentle hover glow effect on desktop)
    let mouseX = -1000
    let mouseY = -1000
    let targetX = -1000
    let targetY = -1000

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      targetX = e.clientX - rect.left
      targetY = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      targetX = -1000
      targetY = -1000
    }

    if (!isMob) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseleave", handleMouseLeave)
    }

    // Star Particle Class
    class Star {
      x: number
      y: number
      size: number
      color: string
      vx: number
      vy: number
      alpha: number
      alphaSpeed: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.size = Math.random() * (isMob ? 1.5 : 2.5) + 0.5
        this.vx = (Math.random() - 0.5) * 0.05
        this.vy = (Math.random() - 0.5) * 0.05
        this.alpha = Math.random() * 0.5 + 0.3
        this.alphaSpeed = (Math.random() - 0.5) * 0.005
        
        // Purple / pink / white stars
        const hues = [280, 320, 240, 0] // Purple, Pink, Blue, White
        const hue = hues[Math.floor(Math.random() * hues.length)]
        this.color = hue === 0 ? `rgba(255, 255, 255,` : `rgba(${hue === 280 ? "168, 85, 247" : hue === 320 ? "236, 72, 153" : "99, 102, 241"},`
      }

      update(w: number, h: number) {
        // Drift slowly
        this.x += this.vx
        this.y += this.vy

        // Wrap around borders
        if (this.x < 0) this.x = w
        if (this.x > w) this.x = 0
        if (this.y < 0) this.y = h
        if (this.y > h) this.y = 0

        // Soft twinkle
        this.alpha += this.alphaSpeed
        if (this.alpha < 0.2 || this.alpha > 0.8) {
          this.alphaSpeed = -this.alphaSpeed
        }

        // Push away slightly from mouse
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 80) {
          const force = (80 - dist) / 80
          this.x -= (dx / dist) * force * 0.5
          this.y -= (dy / dist) * force * 0.5
        }
      }

      draw() {
        ctx.fillStyle = this.color.includes("rgba") ? `${this.color} ${this.alpha})` : `${this.color} ${this.alpha})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const stars: Star[] = []
    const starCount = isMob ? 40 : 120 // Drastically optimized particle count for buttery 60fps

    function init() {
      stars.length = 0
      const w = canvas.width / devicePixelRatio
      const h = canvas.height / devicePixelRatio
      for (let i = 0; i < starCount; i++) {
        stars.push(new Star(Math.random() * w, Math.random() * h))
      }
    }

    init()

    const animate = () => {
      const w = canvas.width / devicePixelRatio
      const h = canvas.height / devicePixelRatio
      ctx.clearRect(0, 0, w, h)

      // Smooth mouse following
      mouseX += (targetX - mouseX) * 0.1
      mouseY += (targetY - mouseY) * 0.1

      for (let i = 0; i < stars.length; i++) {
        stars[i].update(w, h)
        stars[i].draw()
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
      window.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  return (
    <motion.div
      className={isGlobalBackground ? "w-full h-full" : "w-full h-[500px] relative pointer-events-none md:pointer-events-auto"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </motion.div>
  )
}
