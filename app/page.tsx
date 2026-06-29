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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background orbs */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
            animate={{ x: [0, 30, -20, 0], y: [0, -50, 20, 0], scale: [1, 1.1, 0.9, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
            animate={{ x: [0, -30, 20, 0], y: [0, 20, -40, 0], scale: [1, 0.9, 1.15, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div
            className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
            animate={{ x: [0, 40, -30, 0], y: [0, -30, 40, 0], scale: [1, 1.05, 0.95, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </div>

        {/* ========== MOBILE HERO ========== */}
        <div className="lg:hidden container px-6 relative z-10 flex flex-col items-center justify-center text-center pt-28 pb-16">
          {/* Animated border card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full max-w-sm"
          >
            {/* Rotating gradient border */}
            <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-60 blur-sm animate-pulse" />
            
            <div className="relative rounded-3xl bg-zinc-950/80 backdrop-blur-xl border border-white/5 p-8 flex flex-col items-center gap-6">
              {/* Avatar initials */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 200 }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl shadow-purple-500/30"
              >
                <span className="text-2xl font-black text-white tracking-wider">NI</span>
              </motion.div>

              {/* Name */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="space-y-1"
              >
                <h1 className="text-3xl font-bold tracking-tight">
                  <span className="text-white">Noor </span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Imran</span>
                </h1>
                <p className="text-sm text-zinc-500">Faisalabad, Pakistan</p>
              </motion.div>

              {/* Animated role pills */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="flex flex-wrap justify-center gap-2"
              >
                {["Innovator", "AI Edge", "SEO Expert", "Business Growth"].map((role, i) => (
                  <motion.span
                    key={role}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.8 + i * 0.1, type: "spring" }}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-zinc-300"
                  >
                    {role}
                  </motion.span>
                ))}
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="text-sm text-zinc-400 leading-relaxed"
              >
                Business Informatics student driving growth at the intersection of business, technology, and data.
              </motion.p>

              {/* Social buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 }}
                className="flex gap-3 w-full"
              >
                <a
                  href="https://www.linkedin.com/in/noor-i-a41251378/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:bg-purple-500/20 hover:border-purple-500/30 hover:text-white transition-all text-sm font-medium"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
                <a
                  href="mailto:noorimran4462@gmail.com"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all"
                >
                  <Mail className="h-4 w-4" />
                  Email Me
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="mt-10"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center items-start p-1.5"
            >
              <div className="w-1 h-2 rounded-full bg-white/50" />
            </motion.div>
          </motion.div>
        </div>

        {/* ========== DESKTOP HERO ========== */}
        <div className="hidden lg:grid container px-6 relative z-10 grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block"
            >
              <div className="relative px-3 py-1 text-sm font-medium rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <span className="relative z-10">Innovator with an AI Edge</span>
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 animate-pulse"></span>
              </div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-7xl font-bold tracking-tight leading-tight"
            >
              <span className="block">Hi, I'm</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                NOOR IMRAN
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-zinc-400 max-w-[600px]"
            >
              Driving Business Growth. I am interested in Business Informatics and the intersection of business, technology, and data.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex gap-4 pt-2"
            >
              <a href="https://www.linkedin.com/in/noor-i-a41251378/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="mailto:noorimran4462@gmail.com" className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </motion.div>
          </div>
          <div className="flex justify-center">
            <CreativeHero />
          </div>
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
