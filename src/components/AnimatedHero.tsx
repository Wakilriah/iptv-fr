"use client"

import { useEffect, useState } from "react"
import { useOrderModal } from "@/context/OrderModalContext"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import dynamic from "next/dynamic"

const NeonChannelShowcase = dynamic(() => import("@/components/NeonChannelShowcase").then((mod) => mod.NeonChannelShowcase), { ssr: false })

export function AnimatedHero() {
  const { openModal } = useOrderModal()
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
  return (
    <section className="relative pt-12 md:pt-20 pb-12 md:pb-24 flex flex-col items-center justify-center min-h-[55vh] md:min-h-[70vh] text-center px-4 overflow-hidden border-b border-white/5">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0">
          {/* Desktop Image */}
          <div className="hidden md:block absolute inset-0">
            <Image
              src="/hero-psg-4k.jpg"
              alt="Famille regardant un match PSG en direct"
              fill
              sizes="(max-width: 768px) 1px, 100vw"
              className="object-cover"
              priority
            />
          </div>
          {/* Mobile Image */}
          <div className="block md:hidden absolute inset-0">
            <Image
              src="/hero-mobile.webp"
              alt="Famille regardant la TV sur mobile"
              fill
              sizes="(max-width: 768px) 100vw, 1px"
              className="object-cover object-center"
              priority
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-[#050505]/70 to-[#050505]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] md:w-[900px] md:h-[900px] bg-[#9333ea]/25 blur-2xl md:blur-[150px] rounded-full pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center space-y-6 mt-4 md:mt-6 px-4 md:px-8">
        {/* Special Offer Text with Live Timer */}
        {(!mounted || !timeLeft.isExpired) && (
          <div className="text-center font-bold text-xs sm:text-sm md:text-base text-yellow-400 bg-yellow-500/10 border border-yellow-500/25 px-5 py-3 rounded-2xl max-w-3xl mx-auto tracking-wide select-none shadow-[0_0_20px_rgba(234,179,8,0.15)] flex flex-col md:flex-row items-center justify-center gap-3">
            <span>
              🎁 Offre spéciale : Profitez d&apos;un contenu de haute qualité en choisissant le plan annuel – <strong className="underline decoration-yellow-500/60 decoration-2">Profitez-en maintenant !</strong>
            </span>
            {mounted ? (
              <div className="inline-flex items-center gap-1 bg-[#050505] border border-yellow-500/40 text-white px-3 py-1 rounded-full text-[10px] sm:text-xs font-black shadow-[0_0_12px_rgba(234,179,8,0.3)]">
                <span className="text-yellow-400 font-extrabold animate-pulse">⏳</span>
                <span className="text-yellow-300 drop-shadow-[0_0_5px_rgba(234,179,8,0.6)]">{timeLeft.days}j</span>
                <span className="text-white/40">:</span>
                <span className="text-yellow-300 drop-shadow-[0_0_5px_rgba(234,179,8,0.6)]">{timeLeft.hours.toString().padStart(2, "0")}h</span>
                <span className="text-white/40">:</span>
                <span className="text-yellow-300 drop-shadow-[0_0_5px_rgba(234,179,8,0.6)]">{timeLeft.minutes.toString().padStart(2, "0")}m</span>
                <span className="text-white/40">:</span>
                <span className="text-yellow-400 font-black drop-shadow-[0_0_8px_rgba(234,179,8,0.9)] animate-pulse">{timeLeft.seconds.toString().padStart(2, "0")}s</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1 bg-[#050505] border border-yellow-500/40 text-white px-3 py-1 rounded-full text-[10px] sm:text-xs font-black opacity-50">
                ⏳ --j : --h : --m : --s
              </div>
            )}
          </div>
        )}

        {/* Badge */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/50 bg-yellow-500/10 px-6 py-2.5 text-base font-bold text-yellow-400 backdrop-blur-sm shadow-[0_0_15px_rgba(234,179,8,0.15)]">
            <Star className="w-5 h-5 fill-yellow-400" /> Meilleur IPTV Abonnement en France
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter text-white drop-shadow-2xl leading-[1.05]">
          L&apos;Expérience{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#d8b4fe]">
            Ultime
          </span>
        </h1>

        {/* Subtitle pill */}
        <div className="bg-white text-black px-6 sm:px-10 py-3 sm:py-4 rounded-3xl text-xl sm:text-4xl md:text-6xl font-black italic -rotate-2 transform shadow-2xl shadow-white/10 cursor-default">
          Match Ce Soir Fr
        </div>

        <p className="text-lg md:text-2xl text-gray-300 max-w-5xl mt-8 md:mt-12 leading-relaxed font-medium px-2">
          Découvrez <strong className="text-white font-bold">Votre Portail de Divertissement en Famille</strong> avec <strong className="text-[#a855f7] font-black">Match Ce Soir Fr</strong>.<br />
          <strong className="text-white font-bold">Football, Sports en Direct, Films, et Séries TV</strong> réunis en un seul endroit. Profitez d'un <strong className="text-[#a855f7]">Streaming Haute Qualité</strong> avec une <strong>Activation Rapide</strong>, un <strong>Paiement Sécurisé</strong> et un <strong>Support 24/7</strong>. Demandez un essai dès maintenant !
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-12">
          <div className="flex flex-col items-center w-full sm:w-auto">
            <div className="w-full">
              <Button
                onClick={() => openModal("1 heure d'essai gratuit", "Gratuit", "1 heure")}
                className="w-full bg-[#9333ea] hover:bg-[#7e22ce] text-white rounded-full px-6 sm:px-10 py-5 sm:py-7 text-lg sm:text-xl font-bold shadow-[0_0_40px_-10px_#a855f7] hover:shadow-[0_0_60px_-10px_#a855f7] transition-shadow"
              >
                1 heure d'essai gratuit
              </Button>
            </div>
            <span className="text-[11px] sm:text-xs text-gray-400 mt-2.5 font-medium text-center">
              Testez le service gratuitement pendant 1 heure avant de vous abonner.
            </span>
          </div>
          <div className="w-full sm:w-auto">
            <a 
              href="#tarifs"
              className="inline-flex items-center justify-center w-full rounded-full border border-white/20 hover:bg-white/5 text-white bg-transparent backdrop-blur-sm px-6 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl font-bold transition-colors select-none text-center"
            >
              Choisir mon Abonnement
            </a>
          </div>
        </div>

        {/* Trust signals */}
        <div className="flex flex-col items-center gap-4 mt-2">
          {/* 7-day guarantee */}
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-sm rounded-full px-3 sm:px-5 py-2.5 text-gray-300 text-xs sm:text-sm">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span><strong className="text-white">Support Premium</strong> — Équipe technique à votre écoute 7j/7 pour vous assister.</span>
          </div>
          
          {/* Google Rating Badge */}
          <div className="flex justify-center items-center select-none">
            <Image 
              src="/google-rating.png" 
              alt="Google 4.9 avis clients" 
              width={260} 
              height={65} 
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </div>
        </div>

        {/* Neon Channel Showcase */}
        <div className="w-full mt-8">
          <NeonChannelShowcase />
        </div>
      </div>
    </section>
  )
}
