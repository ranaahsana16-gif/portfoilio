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
      <div className="fixed left-0 w-full z-50 flex justify-center pointer-events-none">
        <motion.div
          className="pointer-events-auto"
          initial={{ y: -100, opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: 1,
            top: isMobile ? (isScrolled ? "10px" : "16px") : (isScrolled ? "16px" : "30px"),
            width: isMobile ? "calc(100% - 24px)" : "100%",
            maxWidth: isMobile 
              ? (isScrolled ? "360px" : "400px") 
              : (isScrolled ? "720px" : "820px"),
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'fixed', left: '50%', transform: 'translateX(-50%)' }}
        >
          <motion.div 
            className="relative rounded-full bg-zinc-950/40 backdrop-blur-xl border border-white/10 flex items-center justify-between"
            animate={{ 
              height: isMobile 
                ? (isScrolled ? "44px" : "50px") 
                : (isScrolled ? "54px" : "60px"),
              padding: isMobile 
                ? "0 14px" 
                : (isScrolled ? "0 18px" : "0 24px"),
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderTop: "1.5px solid rgba(255, 255, 255, 0.25)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
              boxShadow: isScrolled 
                ? "0 8px 24px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 0 0 1px rgba(194, 164, 255, 0.06)"
                : "0 12px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.12), inset 0 -1px 0 rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(194, 164, 255, 0.03)"
            }}
          >
            {/* Inner liquid glass reflection */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-full opacity-50 pointer-events-none mix-blend-overlay"></div>

            {isMobile ? (
              <div className="relative flex items-center justify-between w-full">
                <Link href="/" className="font-semibold text-white text-xs tracking-wide">
                  Noor Imran
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-zinc-400 hover:text-white hover:bg-zinc-700/50 rounded-full h-8 w-8"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </Button>
              </div>
            ) : (
              <div className="relative flex items-center justify-between w-full">
                <Link href="/" className="font-semibold text-white text-sm tracking-wide hover:opacity-80 transition-opacity z-10">
                  Noor Imran
                </Link>
                
                <a 
                  href="mailto:noorimran4462@gmail.com" 
                  className="absolute left-1/2 -translate-x-1/2 text-xs text-zinc-400 hover:text-white transition-colors tracking-wide z-10 hidden min-[900px]:block"
                >
                  noorimran4462@gmail.com
                </a>

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
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile menu */}
      {isMobile && (
        <motion.div
          className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl ${isOpen ? "block" : "hidden"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-center justify-center h-full gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-8 py-4 text-2xl font-medium text-white hover:text-purple-400 transition-colors"
                onClick={handleNavClick}
              >
                {item.name}
              </Link>
            ))}
            <a
              href="mailto:noorimran4462@gmail.com"
              className="mt-6 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-lg font-semibold rounded-full text-white shadow-lg shadow-purple-500/20"
              onClick={handleNavClick}
            >
              Contact Me
            </a>
          </div>
        </motion.div>
      )}
    </>
  )
}
