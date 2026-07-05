"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { NeonChannelShowcase } from "@/components/NeonChannelShowcase"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring" as const, stiffness: 80, damping: 20 } }
}

const titleVariants = {
  hidden: { opacity: 0, scale: 0.85, filter: "blur(15px)", y: 30 },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } }
}

const bgVariants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: { opacity: 0.6, scale: 1, transition: { duration: 1.2, ease: "easeOut" as const } }
}

interface AnimatedHeroProps {
  onOrderClick?: () => void
}

export function AnimatedHero({ onOrderClick }: AnimatedHeroProps) {
  return (
    <section className="relative pt-20 md:pt-32 pb-20 md:pb-40 flex flex-col items-center justify-center min-h-[70vh] md:min-h-[85vh] text-center px-4 overflow-hidden border-b border-white/5">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0"
          variants={bgVariants}
          initial="hidden"
          animate="visible"
        >
          <Image
            src="/hero-psg.jpg"
            alt="Famille regardant un match PSG en IPTV"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-[#050505]/70 to-[#050505]" />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[900px] md:h-[900px] bg-[#a855f7]/25 blur-[150px] rounded-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center space-y-12 mt-12 px-4 md:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/50 bg-yellow-500/10 px-6 py-2.5 text-base font-bold text-yellow-400 backdrop-blur-sm shadow-[0_0_15px_rgba(234,179,8,0.15)]">
            <Star className="w-5 h-5 fill-yellow-400" /> Meilleur IPTV Abonnement en France
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          variants={titleVariants}
          className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter text-white drop-shadow-2xl leading-[1.05]"
        >
          L&apos;Expérience{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#d8b4fe]">
            Ultime
          </span>
        </motion.h1>

        {/* Subtitle pill */}
        <motion.div
          variants={itemVariants}
          whileHover={{ rotate: 0, scale: 1.05 }}
          className="bg-white text-black px-10 py-4 rounded-3xl text-2xl sm:text-4xl md:text-6xl font-black italic -rotate-2 transform shadow-2xl shadow-white/10 cursor-default"
        >
          Match Ce Soir Fr
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-2xl text-gray-300 max-w-5xl mt-8 md:mt-12 leading-relaxed font-medium px-2"
        >
          Découvrez le <strong className="text-white font-bold">Meilleur IPTV premium</strong> avec <strong className="text-[#a855f7] font-bold">Match Ce Soir Fr</strong>. Choisissez le forfait idéal parmi nos offres <strong className="text-white font-bold">Standard, Premium 4K &amp; VIP+</strong>, et profitez d&apos;un service d&apos;exception stable à 100% avec zapping ultra-rapide. Accédez à plus de 75 000 chaînes &amp; VOD et un support réactif 24/7. <strong className="text-[#a855f7] font-bold">Démarrez votre test gratuit de 1H dès maintenant !</strong>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 mt-12"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Button
              onClick={onOrderClick}
              className="w-full bg-[#a855f7] hover:bg-[#9333ea] text-white rounded-full px-6 sm:px-10 py-5 sm:py-7 text-lg sm:text-xl font-bold shadow-[0_0_40px_-10px_#a855f7] hover:shadow-[0_0_60px_-10px_#a855f7] transition-shadow"
            >
              Test Gratuit 1H
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <a href="#tarifs">
              <Button
                variant="outline"
                className="w-full rounded-full px-6 sm:px-10 py-5 sm:py-7 text-lg sm:text-xl font-bold border-white/20 hover:bg-white/5 text-white bg-transparent backdrop-blur-sm"
              >
                Voir les Tarifs
              </Button>
            </a>
          </motion.div>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center mt-2 text-sm"
        >
          {/* 7-day guarantee */}
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-sm rounded-full px-3 sm:px-5 py-2.5 text-gray-300 text-xs sm:text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span><strong className="text-white">Garantie 7 jours</strong> — Remboursement intégral si vous n&apos;êtes pas satisfait</span>
          </div>
        </motion.div>

        {/* Neon Channel Showcase */}
        <motion.div variants={itemVariants} className="w-full mt-8">
          <NeonChannelShowcase />
        </motion.div>
      </motion.div>
    </section>
  )
}
