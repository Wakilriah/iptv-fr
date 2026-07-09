"use client"

import { useState, useEffect, useCallback } from "react"
import { m, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

const ALL_CHANNELS = [
  { name: "Sports en Direct", color: "#ff6b00", logo: "/channels/logo_sports.webp" },
  { name: "Cinéma Premium", color: "#00d4ff", logo: "/channels/logo_cinema.webp" },
  { name: "Programmes", color: "#e63946", logo: "/channels/logo_series.webp" },
  { name: "Généraliste", color: "#ff2d55", logo: "/channels/logo_generaliste.webp" },
  { name: "Information", color: "#f72585", logo: "/channels/logo_info.webp" },
  { name: "Documentaires", color: "#ff9500", logo: "/channels/logo_docs.webp" },
  { name: "Jeunesse", color: "#00b4d8", logo: "/channels/logo_jeunesse.webp" },
  { name: "Musique", color: "#7b2ff7", logo: "/channels/logo_musique.webp" },
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
    y: 10,
  },
  visible: {
    opacity: 1,
    scale: 1,
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
    y: -8,
    transition: {
      duration: 0.3,
      ease: "easeIn" as const,
    },
  },
}

export function NeonChannelShowcase() {
  const [visibleChannels, setVisibleChannels] = useState(() => ALL_CHANNELS.slice(0, 6))
  const [cycleKey, setCycleKey] = useState(0)

  const cycleChannels = useCallback(() => {
    setVisibleChannels(shuffleAndPick(ALL_CHANNELS, 6))
    setCycleKey((k) => k + 1)
  }, [])

  useEffect(() => {
    // Shuffle on client-side mount to immediately show random channels
    setVisibleChannels(shuffleAndPick(ALL_CHANNELS, 6))
    const interval = setInterval(cycleChannels, 3500)
    return () => clearInterval(interval)
  }, [cycleChannels])

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      {/* Label */}
      <p className="text-sm sm:text-base text-gray-300 font-extrabold uppercase tracking-[0.25em]">
        Chaînes populaires en France
      </p>

      {/* Channel Badges Container */}
      <div className="relative flex items-center justify-center min-h-[70px] sm:min-h-[80px] w-full max-w-5xl">
        <AnimatePresence mode="wait">
          <m.div
            key={cycleKey}
            className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {visibleChannels.map((channel) => (
              <m.div
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
                <div className="relative flex items-center gap-3 px-5 py-3 sm:px-7 sm:py-3.5 rounded-full bg-[#0a0f1e]/90 border border-white/[0.1] backdrop-blur-md cursor-default select-none shadow-2xl">
                  {/* Channel logo image */}
                  <Image
                    src={channel.logo}
                    alt={channel.name}
                    width={32}
                    height={32}
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg object-cover border border-white/10 shrink-0 shadow-lg"
                  />
                  {/* Channel name */}
                  <span className="text-sm sm:text-base md:text-lg font-black text-white whitespace-nowrap tracking-wide">
                    {channel.name}
                  </span>
                </div>

                {/* Neon glow layer (animated) */}
                <m.div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 0.9, 0.5, 0.75, 0.5],
                  }}
                  transition={{
                    duration: 2.5,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  style={{
                    boxShadow: `0 0 12px ${channel.color}50, 0 0 28px ${channel.color}35, 0 0 55px ${channel.color}20, inset 0 0 16px ${channel.color}15`,
                    border: `1px solid ${channel.color}40`,
                    borderRadius: "9999px",
                  }}
                />
              </m.div>
            ))}
          </m.div>
        </AnimatePresence>
      </div>

      {/* CTA Link to channels page */}
      <Link href="/chaines">
        <m.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-[#a855f7]/30 bg-[#9333ea]/5 backdrop-blur-sm text-sm sm:text-base font-extrabold text-[#c084fc] hover:text-white hover:bg-[#7e22ce]/15 hover:border-[#a855f7]/50 hover:shadow-[0_0_30px_-5px_#a855f7] transition-all duration-300 cursor-pointer"
        >
          <span>Explorer toutes nos chaînes</span>
          <svg aria-hidden="true"
            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </m.div>
      </Link>
    </div>
  )
}
