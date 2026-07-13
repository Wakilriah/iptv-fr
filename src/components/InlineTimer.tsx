"use client"

import { useEffect, useState } from "react"

export function InlineTimer() {
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

  if (!mounted || timeLeft.isExpired) {
    return null
  }

  return (
    <div className="flex flex-col items-center justify-center mb-8 select-none">
      <span className="text-xs uppercase tracking-widest text-[#a855f7] font-black mb-3">
        ⏳ L&apos;OFFRE EXPIRE DANS :
      </span>
      <div className="flex items-center flex-wrap justify-center gap-1.5 sm:gap-2.5 bg-white/5 border border-white/10 text-white px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold shadow-lg">
        <span className="text-white font-extrabold">{timeLeft.days} {timeLeft.days > 1 ? "jours" : "jour"}</span>
        <span className="text-white/30">•</span>
        <span className="text-white font-extrabold">{timeLeft.hours} {timeLeft.hours > 1 ? "heures" : "heure"}</span>
        <span className="text-white/30">•</span>
        <span className="text-white font-extrabold">{timeLeft.minutes} {timeLeft.minutes > 1 ? "minutes" : "minute"}</span>
        <span className="text-white/30">•</span>
        <span className="text-[#a855f7] font-extrabold">{timeLeft.seconds} {timeLeft.seconds > 1 ? "secondes" : "seconde"}</span>
      </div>
    </div>
  )
}
