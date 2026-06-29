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
      <div className="fixed top-4 left-0 w-full z-50 flex justify-center pointer-events-none">
        <motion.div
          className="pointer-events-auto"
          initial={{ y: -100, opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: 1,
            width: isMobile ? "92%" : (isScrolled ? "60%" : "75%"),
            maxWidth: isScrolled ? "700px" : "900px"
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div 
            className="relative rounded-full bg-zinc-950/40 backdrop-blur-xl shadow-[0_12px_40px_0_rgba(0,0,0,0.6)] border border-white/10"
            animate={{ 
              padding: isScrolled ? "0.25rem 1rem" : "0.35rem 1.25rem",
            }}
            transition={{ 
              padding: { duration: 0.4, ease: "easeOut" }
            }}
          >
            {/* Inner liquid glass reflection */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-full opacity-50 pointer-events-none mix-blend-overlay"></div>

            {isMobile ? (
              <div className="relative flex items-center justify-between">
                <Link href="/" className="font-bold text-lg">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Noor</span>
                  <span className="text-white"> Imran</span>
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
              <div className="relative flex items-center justify-between w-full">
                <Link href="/" className="font-bold text-lg z-10">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Noor</span>
                  <span className="text-white"> Imran</span>
                </Link>
                
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="px-3.5 py-1.5 text-sm font-medium text-zinc-300 hover:text-white transition-colors rounded-full hover:bg-white/10"
                      onClick={handleNavClick}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                <a
                  href="mailto:noorimran4462@gmail.com"
                  className="relative z-10 px-4 py-1.5 text-xs font-semibold rounded-full text-white overflow-hidden group shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/45"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 transition-transform duration-300 group-hover:scale-105" />
                  <span className="relative z-10">Contact Me</span>
                </a>
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
