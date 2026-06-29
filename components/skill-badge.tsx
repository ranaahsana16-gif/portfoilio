"use client"

import { motion } from "framer-motion"
import { Search, Link as LinkIcon, Edit3, BookOpen, BarChart3, Globe } from "lucide-react"

interface SkillBadgeProps {
  name: string
  level: number
}

const getIcon = (name: string) => {
  const n = name.toLowerCase()
  if (n.includes("off-page")) return <LinkIcon className="h-6 w-6 text-pink-500" />
  if (n.includes("seo")) return <Search className="h-6 w-6 text-purple-500" />
  if (n.includes("edit")) return <Edit3 className="h-6 w-6 text-purple-500" />
  if (n.includes("blog")) return <BookOpen className="h-6 w-6 text-pink-500" />
  if (n.includes("strategy") || n.includes("business")) return <BarChart3 className="h-6 w-6 text-purple-500" />
  return <Globe className="h-6 w-6 text-pink-500" />
}

export function SkillBadge({ name, level }: SkillBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group h-full"
    >
      <div className="relative overflow-hidden rounded-2xl bg-zinc-900/40 backdrop-blur-md border border-white/5 p-6 h-full transition-all duration-300 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/10 flex flex-col justify-between gap-4">
        {/* Glow overlay */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-pink-500/0 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative flex flex-col h-full justify-between gap-4">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-purple-500/10 group-hover:border-purple-500/20 transition-colors">
              {getIcon(name)}
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 group-hover:text-purple-400 group-hover:border-purple-500/20 transition-all">
              {level}% Proficiency
            </span>
          </div>

          <div className="mt-2">
            <h3 className="font-bold text-lg text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-500 transition-all duration-300">
              {name}
            </h3>
            <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
              Advanced knowledge and application of {name.toLowerCase()} strategies.
            </p>
          </div>

          {/* Elegant customized progress line */}
          <div className="mt-4">
            <div className="relative h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${level}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                viewport={{ once: true }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
