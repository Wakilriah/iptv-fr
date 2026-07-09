"use client"

import { useOrderModal } from "@/context/OrderModalContext"

import { m } from "framer-motion"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import dynamic from "next/dynamic"

const NeonChannelShowcase = dynamic(() => import("@/components/NeonChannelShowcase").then((mod) => mod.NeonChannelShowcase), { ssr: false })

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80, damping: 20 } }
}

const titleVariants = {
  hidden: { opacity: 1, scale: 0.85, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } }
}

const bgVariants = {
  hidden: { opacity: 0.6, scale: 1.1 },
  visible: { opacity: 0.6, scale: 1, transition: { duration: 1.2, ease: "easeOut" as const } }
}

interface AnimatedHeroProps {
  onOrderClick?: () => void
}

export function AnimatedHero() {
  const { openModal } = useOrderModal()
  return (
    <section className="relative pt-20 md:pt-32 pb-20 md:pb-40 flex flex-col items-center justify-center min-h-[70vh] md:min-h-[85vh] text-center px-4 overflow-hidden border-b border-white/5">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <m.div
          className="absolute inset-0"
          variants={bgVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Desktop Image */}
          <div className="hidden md:block absolute inset-0">
            <Image
              src="/hero-psg.webp"
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
        </m.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-[#050505]/70 to-[#050505]" />
        <m.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] md:w-[900px] md:h-[900px] bg-[#9333ea]/25 blur-2xl md:blur-[150px] rounded-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
      </div>

      <m.div
        className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center space-y-12 mt-12 px-4 md:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <m.div variants={itemVariants}>
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/50 bg-yellow-500/10 px-6 py-2.5 text-base font-bold text-yellow-400 backdrop-blur-sm shadow-[0_0_15px_rgba(234,179,8,0.15)]">
            <Star className="w-5 h-5 fill-yellow-400" /> Essai Découverte
          </div>
        </m.div>

        {/* Main Title */}
        <m.h1
          variants={titleVariants}
          className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter text-white drop-shadow-2xl leading-[1.05]"
        >
          L&apos;Expérience{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#d8b4fe]">
            Ultime
          </span>
        </m.h1>

        {/* Subtitle pill */}
        <m.div
          variants={itemVariants}
          whileHover={{ rotate: 0, scale: 1.05 }}
          className="bg-white text-black px-6 sm:px-10 py-3 sm:py-4 rounded-3xl text-xl sm:text-4xl md:text-6xl font-black italic -rotate-2 transform shadow-2xl shadow-white/10 cursor-default"
        >
          Match Ce Soir Fr
        </m.div>

        {/* Description */}
        <m.p
          variants={itemVariants}
          className="text-lg md:text-2xl text-gray-300 max-w-5xl mt-8 md:mt-12 leading-relaxed font-medium px-2"
        >
          Découvrez <strong className="text-white font-bold">Votre Portail Divertissement</strong> avec <strong className="text-[#a855f7] font-black">Match Ce Soir Fr</strong>.<br />
          Vidéos, programmes, et événements en direct réunis en un seul endroit. Explorez nos forfaits <strong className="text-white font-bold">Standard, Premium 4K &amp; VIP+</strong>, et profitez d&apos;un service d&apos;exception avec zapping rapide. Un vaste sélection et un support réactif 24/7. <strong className="text-[#a855f7] font-bold">Demandez un essai dès maintenant !</strong>
        </m.p>

        {/* CTA Buttons */}
        <m.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 mt-12"
        >
          <div className="flex flex-col items-center w-full sm:w-auto">
            <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="w-full">
              <Button
                onClick={() => openModal("Essai Découverte 1H", "Gratuit", "1 heure")}
                className="w-full bg-[#9333ea] hover:bg-[#7e22ce] text-white rounded-full px-6 sm:px-10 py-5 sm:py-7 text-lg sm:text-xl font-bold shadow-[0_0_40px_-10px_#a855f7] hover:shadow-[0_0_60px_-10px_#a855f7] transition-shadow"
              >
                Essai Découverte 1H
              </Button>
            </m.div>
            <span className="text-[11px] sm:text-xs text-gray-400 mt-2.5 font-medium text-center">
              Testez le service gratuitement pendant 1 heure avant de vous abonner.
            </span>
          </div>
          <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
            <a 
              href="#tarifs"
              className="inline-flex items-center justify-center w-full rounded-full border border-white/20 hover:bg-white/5 text-white bg-transparent backdrop-blur-sm px-6 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl font-bold transition-colors select-none text-center"
            >
              Voir les Tarifs
            </a>
          </m.div>
        </m.div>

        {/* Trust signals */}
        <m.div
          variants={itemVariants}
          className="flex items-center justify-center mt-2 text-sm"
        >
          {/* 7-day guarantee */}
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-sm rounded-full px-3 sm:px-5 py-2.5 text-gray-300 text-xs sm:text-sm">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span><strong className="text-white">Support Premium</strong> — Équipe technique à votre écoute 7j/7 pour vous assister.</span>
          </div>
        </m.div>

        {/* Neon Channel Showcase */}
        <m.div variants={itemVariants} className="w-full mt-8">
          <NeonChannelShowcase />
        </m.div>
      </m.div>
    </section>
  )
}
