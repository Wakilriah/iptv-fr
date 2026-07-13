"use client"

import { useEffect, useState } from "react"

export function TopBanner() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Target date: July 19, 2026 23:59:59
    const targetDate = new Date("2026-07-19T23:59:59").getTime()

    const updateTimer = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true })
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)
        setTimeLeft({ days, hours, minutes, seconds, isExpired: false })
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!mounted) {
    // Return a static placeholder to avoid hydration mismatch
    return (
      <div className="w-full bg-white text-[#050505] py-2.5 px-4 border-b border-purple-100 font-bold text-center text-xs sm:text-sm select-none">
        Offre spéciale : Profitez d&apos;un contenu de haute qualité en choisissant le plan annuel – Profitez-en maintenant !
      </div>
    )
  }

  if (timeLeft.isExpired) {
    return null
  }

  return (
    <a
      href="#tarifs"
      className="block w-full bg-white text-[#050505] py-2.5 px-4 border-b border-purple-100 hover:bg-purple-50 transition-colors font-bold text-center text-xs sm:text-sm select-none relative z-50 cursor-pointer shadow-sm"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
        <span className="tracking-tight">
          🎁 Offre spéciale : Profitez d&apos;un contenu de haute qualité en choisissant le plan annuel – <span className="underline decoration-purple-500 decoration-2">Profitez-en maintenant !</span>
        </span>
        <div className="flex items-center flex-wrap justify-center gap-1 sm:gap-1.5 shrink-0 bg-[#050505] text-white px-3 py-1 rounded-full text-[10px] sm:text-xs tracking-wide shadow-md font-bold">
          <span>{timeLeft.days} {timeLeft.days > 1 ? "jours" : "jour"}</span>
          <span className="text-white/30">•</span>
          <span>{timeLeft.hours} {timeLeft.hours > 1 ? "heures" : "heure"}</span>
          <span className="text-white/30">•</span>
          <span>{timeLeft.minutes} {timeLeft.minutes > 1 ? "minutes" : "minute"}</span>
          <span className="text-white/30">•</span>
          <span className="text-[#a855f7]">{timeLeft.seconds} {timeLeft.seconds > 1 ? "secondes" : "seconde"}</span>
        </div>
      </div>
    </a>
  )
}
