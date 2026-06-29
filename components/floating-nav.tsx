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
      <div className="fixed top-6 left-0 w-full z-50 flex justify-center pointer-events-none">
        <motion.div
          className="pointer-events-auto"
          initial={{ y: -100, opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: 1,
            width: isMobile ? "92%" : "85%",
            maxWidth: "1200px"
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div 
            className="relative rounded-full bg-zinc-950/40 backdrop-blur-xl shadow-[0_12px_40px_0_rgba(0,0,0,0.6)] border border-white/10"
            animate={{ 
              padding: isScrolled ? "0.4rem 1.5rem" : "0.6rem 2rem",
            }}
            transition={{ 
              padding: { duration: 0.4, ease: "easeOut" }
            }}
          >
            {/* Inner liquid glass reflection */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-full opacity-50 pointer-events-none mix-blend-overlay"></div>

            {isMobile ? (
              <div className="relative flex items-center justify-between">
                <Link href="/" className="font-medium text-lg">
                  <span className="text-white">Noor Imran</span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-zinc-400 hover:text-white hover:bg-zinc-700/50 rounded-full"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            ) : (
              <div className="relative flex items-center justify-between w-full px-6 py-1">
                <Link href="/" className="font-normal text-white text-sm sm:text-base tracking-wide hover:opacity-80 transition-opacity z-10">
                  Noor Imran
                </Link>
                
                <a 
                  href="mailto:noorimran4462@gmail.com" 
                  className="absolute left-1/2 -translate-x-1/2 text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors tracking-wide z-10"
                >
                  noorimran4462@gmail.com
                </a>

                <div className="flex items-center gap-8 z-10">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-zinc-300 hover:text-white transition-colors uppercase"
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
