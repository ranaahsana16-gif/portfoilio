"use client"

import Link from "next/link"
import { Linkedin, Mail } from "lucide-react"
import { motion } from "framer-motion"

import { SkillBadge } from "@/components/skill-badge"
import { Timeline } from "@/components/timeline"
import { CreativeHero } from "@/components/creative-hero"
import { FloatingNav } from "@/components/floating-nav"
import { MouseFollower } from "@/components/mouse-follower"
import { ScrollProgress } from "@/components/scroll-progress"
import { SectionHeading } from "@/components/section-heading"
import { GlassmorphicCard } from "@/components/glassmorphic-card"

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-white overflow-hidden">
      <MouseFollower />
      <ScrollProgress />
      <FloatingNav />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Soft background glows */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full filter blur-[120px] mix-blend-screen animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-pink-900/10 rounded-full filter blur-[120px] mix-blend-screen animate-pulse animation-delay-2000"></div>
        </div>

        {/* Global Particle Background for Desktop */}
        <div className="hidden lg:block absolute inset-0 z-0 pointer-events-none opacity-40">
          <CreativeHero isGlobalBackground={true} />
        </div>

        <div className="container px-6 relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto space-y-4 pt-16">
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-purple-400/80 uppercase"
          >
            Hello! I'm
          </motion.p>

          {/* Huge Centered Name */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-wider leading-[1.05] select-none flex flex-col items-center">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white"
            >
              NOOR
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-purple-400 filter drop-shadow-[0_0_20px_rgba(168,85,247,0.55)] mt-1"
            >
              IMRAN
            </motion.span>
          </h1>

          {/* Sub description */}
          <div className="space-y-2 pt-4">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-[10px] sm:text-xs font-bold tracking-[0.4em] text-zinc-500 uppercase"
            >
              A Creative
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg sm:text-2xl md:text-4xl font-bold tracking-[0.2em] text-purple-400 filter drop-shadow-[0_0_15px_rgba(168,85,247,0.35)] uppercase"
            >
              Innovator & Strategist
            </motion.h2>
          </div>
        </div>

        {/* Floating Social Icons (Left Side - Desktop Only) */}
        <div className="fixed left-8 bottom-12 z-40 hidden md:flex flex-col items-center gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col items-center gap-6"
          >
            <a
              href="https://www.linkedin.com/in/noor-i-a41251378/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-white transition-all hover:scale-110 duration-200"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:noorimran4462@gmail.com"
              className="text-zinc-500 hover:text-white transition-all hover:scale-110 duration-200"
            >
              <Mail className="h-5 w-5" />
            </a>
            {/* Vertical Line */}
            <div className="w-[1px] h-20 bg-zinc-800 mt-2"></div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-24 lg:py-32 relative scroll-mt-28">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container px-6 relative z-10">
          <SectionHeading title="About Me" subtitle="My background and journey" />

          <div className="mt-10 sm:mt-16 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <GlassmorphicCard>
                <p className="text-base sm:text-lg text-zinc-300">
                  Hi, I am Noor Imran. I am interested in Business Informatics and the intersection of business, technology, and data. Alongside my studies at Angels International College, I am developing skills in SEO, blogging, and content editing.
                </p>
                <p className="text-base sm:text-lg text-zinc-300 mt-4">
                  I am constantly exploring ways to combine business knowledge with modern digital solutions. As an innovator with an AI edge, I focus on driving business growth and leveraging new technologies.
                </p>
                <p className="text-base sm:text-lg text-zinc-300 mt-4">
                  I am open to Assistant, Associate, Administrative Assistant, Account Manager, and Editor roles, as well as paid editing and SEO opportunities.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 sm:mt-8">
                  <div className="space-y-1">
                    <div className="text-sm text-zinc-500">Name</div>
                    <div className="font-medium">Noor Imran</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-zinc-500">Email</div>
                    <div className="font-medium text-sm break-all">noorimran4462@gmail.com</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-zinc-500">Location</div>
                    <div className="font-medium">Faisalabad, Punjab, Pakistan</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-zinc-500">Availability</div>
                    <div className="font-medium text-green-500">Open to work</div>
                  </div>
                </div>
              </GlassmorphicCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 sm:py-24 lg:py-32 relative scroll-mt-28">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container px-6 relative z-10">
          <SectionHeading title="My Skills" subtitle="Technologies I work with" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-10 sm:mt-16">
            <SkillBadge name="SEO" level={95} />
            <SkillBadge name="Off-Page SEO" level={90} />
            <SkillBadge name="Content Editing" level={85} />
            <SkillBadge name="Blogging" level={85} />
            <SkillBadge name="Business Strategy" level={90} />
            <SkillBadge name="English (Native)" level={100} />
            <SkillBadge name="German (Elem.)" level={40} />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 sm:py-24 lg:py-32 relative scroll-mt-28">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container px-6 relative z-10">
          <SectionHeading title="Work Experience" subtitle="My professional journey" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-10 sm:mt-16"
          >
            <Timeline />
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 lg:py-32 relative scroll-mt-28">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container px-6 relative z-10">
          <SectionHeading title="Get In Touch" subtitle="Let's work together" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-10 sm:mt-16 max-w-2xl mx-auto"
          >
            <GlassmorphicCard>
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center">Contact Information</h3>
              <div className="space-y-4 flex flex-col items-center">
                <a href="mailto:noorimran4462@gmail.com" className="flex items-center gap-4 hover:bg-white/5 p-3 sm:p-4 rounded-xl transition-colors w-full">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-purple-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm text-zinc-500">Email</div>
                    <div className="font-medium text-sm sm:text-base break-all">noorimran4462@gmail.com</div>
                  </div>
                </a>
                <a href="https://www.linkedin.com/in/noor-i-a41251378/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:bg-white/5 p-3 sm:p-4 rounded-xl transition-colors w-full">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
                    <Linkedin className="h-5 w-5 text-purple-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm text-zinc-500">LinkedIn</div>
                    <div className="font-medium text-sm sm:text-base truncate">Noor Imran</div>
                  </div>
                </a>
              </div>

              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-zinc-800 flex justify-center">
                <div className="flex items-center gap-2 text-sm sm:text-base text-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shrink-0"></div>
                  <span>Available for freelance & full-time</span>
                </div>
              </div>
            </GlassmorphicCard>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 pt-10 pb-24 md:py-12">
        <div className="container px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <Link href="/" className="font-bold text-xl">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Noor</span>
              <span className="text-white"> Imran</span>
            </Link>
            <div className="text-sm text-zinc-500 mt-2 flex flex-col gap-1">
              <span>© {new Date().getFullYear()} tillnex.space. All rights reserved.</span>
              <span className="text-zinc-600">Developed by tillnex.space</span>
            </div>
          </div>
          <div className="flex gap-4">
            <a href="https://www.linkedin.com/in/noor-i-a41251378/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </footer>

      <a
        href="https://tillnex.space"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50 px-4 py-2 text-xs font-medium rounded-full bg-zinc-900/90 backdrop-blur-md border border-white/10 text-zinc-300 hover:text-white hover:border-white/30 hover:scale-105 transition-all shadow-xl flex items-center gap-2"
      >
        Developed by <span className="font-semibold text-white">tillnex.space</span>
      </a>
    </div>
  )
}
