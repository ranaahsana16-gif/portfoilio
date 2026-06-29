"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

export function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const isMobile = useMobile()

  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ]

  const handleNavClick = () => {
    if (isMobile) {
      setIsOpen(false)
    }
  }

  return (
    <>
      <motion.div
        className="fixed z-50 flex items-center justify-between bg-zinc-950/40 backdrop-blur-xl pointer-events-auto"
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ 
          y: 0, 
          x: "-50%",
          opacity: 1,
          top: isMobile ? (isScrolled ? "10px" : "16px") : (isScrolled ? "16px" : "30px"),
          width: isMobile ? "calc(100% - 24px)" : "100%",
          maxWidth: isMobile 
            ? (isScrolled ? "360px" : "400px") 
            : (isScrolled ? "720px" : "820px"),
          height: isMobile 
            ? (isScrolled ? "44px" : "50px") 
            : (isScrolled ? "54px" : "60px"),
          padding: isMobile 
            ? "0 14px" 
            : (isScrolled ? "0 18px" : "0 24px"),
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          left: "50%",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderTop: "1.5px solid rgba(255, 255, 255, 0.25)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
          borderRadius: "100px",
          boxShadow: isScrolled 
            ? "0 8px 24px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 0 0 1px rgba(194, 164, 255, 0.06)"
            : "0 12px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.12), inset 0 -1px 0 rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(194, 164, 255, 0.03)"
        }}
      >
        {/* Inner liquid glass reflection */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-full opacity-50 pointer-events-none mix-blend-overlay"></div>

        <div className="relative flex items-center justify-between w-full">
          <Link href="/" className="font-semibold text-white text-xs sm:text-sm tracking-wide hover:opacity-80 transition-opacity z-10 shrink-0">
            Noor Imran
          </Link>

          {isMobile ? (
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-300 hover:text-white hover:bg-white/10 rounded-full h-8 w-8 z-10 border border-transparent hover:border-white/10"
              onClick={() => setIsOpen(true)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          ) : (
            <div className="flex items-center gap-2 z-10">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-[11px] sm:text-xs font-semibold tracking-widest text-zinc-300 hover:text-white transition-colors uppercase px-3 py-1.5 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10"
                  onClick={handleNavClick}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Mobile Expanding overlay menu */}
      {isMobile && isOpen && (
        <motion.div
          className="fixed inset-0 z-[9998] bg-[#0b080c]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Neon background blobs */}
          <div className="absolute top-1/4 left-1/4 w-[250px] h-[250px] bg-purple-900/20 rounded-full filter blur-[70px] pointer-events-none"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-pink-900/20 rounded-full filter blur-[70px] pointer-events-none"></div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-6 right-6 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full h-10 w-10 border border-white/10"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>

          <div className="flex flex-col items-center gap-6">
            {navItems.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
              >
                <Link
                  href={item.href}
                  className="text-2xl font-bold tracking-[0.2em] text-zinc-300 hover:text-white transition-colors uppercase py-2 px-6 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10 block"
                  onClick={handleNavClick}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </>
  )
}
