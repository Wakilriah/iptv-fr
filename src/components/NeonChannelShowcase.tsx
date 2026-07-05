"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

const ALL_CHANNELS = [
  { name: "beIN Sports", color: "#ff6b00" },
  { name: "Canal+", color: "#00d4ff" },
  { name: "RMC Sport", color: "#e63946" },
  { name: "TF1", color: "#ff2d55" },
  { name: "France 2", color: "#f72585" },
  { name: "M6", color: "#ff9500" },
  { name: "BFM TV", color: "#00b4d8" },
  { name: "OCS", color: "#7b2ff7" },
  { name: "Arte", color: "#ff6f61" },
  { name: "Eurosport", color: "#3a86ff" },
]

function shuffleAndPick(arr: typeof ALL_CHANNELS, count: number): typeof ALL_CHANNELS {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
}

const badgeVariants = {
  hidden: {
    opacity: 0,
    scale: 0.6,
    filter: "blur(12px)",
    y: 10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 20,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.7,
    filter: "blur(10px)",
    y: -8,
    transition: {
      duration: 0.3,
      ease: "easeIn" as const,
    },
  },
}

export function NeonChannelShowcase() {
  const [visibleChannels, setVisibleChannels] = useState(() => shuffleAndPick(ALL_CHANNELS, 5))
  const [cycleKey, setCycleKey] = useState(0)

  const cycleChannels = useCallback(() => {
    setVisibleChannels(shuffleAndPick(ALL_CHANNELS, 5))
    setCycleKey((k) => k + 1)
  }, [])

  useEffect(() => {
    const interval = setInterval(cycleChannels, 3500)
    return () => clearInterval(interval)
  }, [cycleChannels])

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Label */}
      <p className="text-xs sm:text-sm text-gray-500 font-semibold uppercase tracking-[0.2em]">
        Chaînes populaires en France
      </p>

      {/* Channel Badges Container */}
      <div className="relative flex items-center justify-center min-h-[56px] sm:min-h-[64px] w-full max-w-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={cycleKey}
            className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {visibleChannels.map((channel) => (
              <motion.div
                key={channel.name}
                variants={badgeVariants}
                className="neon-badge relative"
                style={
                  {
                    "--neon-color": channel.color,
                  } as React.CSSProperties
                }
              >
                {/* Inner badge */}
                <div className="relative flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#0a0f1e]/80 border border-white/[0.08] backdrop-blur-md cursor-default select-none">
                  {/* Live dot */}
                  <span
                    className="w-2 h-2 rounded-full animate-pulse shrink-0"
                    style={{ backgroundColor: channel.color }}
                  />
                  {/* Channel name */}
                  <span className="text-xs sm:text-sm font-bold text-white whitespace-nowrap">
                    {channel.name}
                  </span>
                </div>

                {/* Neon glow layer (animated) */}
                <motion.div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 0.8, 0.4, 0.6, 0.4],
                  }}
                  transition={{
                    duration: 2.5,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  style={{
                    boxShadow: `0 0 8px ${channel.color}40, 0 0 20px ${channel.color}25, 0 0 40px ${channel.color}10, inset 0 0 12px ${channel.color}08`,
                    border: `1px solid ${channel.color}30`,
                    borderRadius: "9999px",
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CTA Link to channels page */}
      <Link href="/chaines">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#a855f7]/30 bg-[#a855f7]/5 backdrop-blur-sm text-sm font-bold text-[#c084fc] hover:text-white hover:bg-[#a855f7]/15 hover:border-[#a855f7]/50 hover:shadow-[0_0_25px_-5px_#a855f7] transition-all duration-300 cursor-pointer"
        >
          <span>Explorer toutes nos chaînes</span>
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </motion.div>
      </Link>
    </div>
  )
}
