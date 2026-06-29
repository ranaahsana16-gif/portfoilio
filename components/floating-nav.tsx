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
            width: isMobile ? "92%" : (isScrolled ? "60%" : "75%"),
            maxWidth: isScrolled ? "700px" : "900px"
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div 
            className="relative rounded-full bg-white/5 backdrop-blur-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] ring-1 ring-white/10"
            animate={{ 
              padding: isScrolled ? "0.35rem 1.25rem" : "0.5rem 1.5rem",
            }}
            transition={{ 
              padding: { duration: 0.4, ease: "easeOut" }
            }}
          >
            {/* Inner liquid glass reflection */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-full opacity-50 pointer-events-none mix-blend-overlay"></div>

            {isMobile ? (
              <div className="relative flex items-center justify-between">
                <Link href="/" className="font-bold text-lg flex items-center">
                  <Logo />
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
                <Link href="/" className="font-bold text-lg z-10 flex items-center">
                  <Logo />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Noor</span>
                  <span className="text-white"> Imran</span>
                </Link>
                
                <div className="flex items-center gap-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors rounded-full hover:bg-white/10"
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
          className={`fixed inset-0 z-40 bg-black/90 backdrop-blur-md ${isOpen ? "block" : "hidden"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-center justify-center h-full">
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
          </div>
        </motion.div>
      )}
    </>
  )
}

function Logo() {
  return (
    <svg className="w-8 h-8 mr-2" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="url(#logo-grad)" opacity="0.15" stroke="url(#logo-grad)" strokeWidth="3"/>
      <polygon points="50,15 85,32.5 85,67.5 50,85 15,67.5 15,32.5" stroke="url(#logo-grad)" strokeWidth="2" strokeDasharray="4 2"/>
      <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="30" fontWeight="bold" fontFamily="system-ui, sans-serif">NI</text>
    </svg>
  )
}
