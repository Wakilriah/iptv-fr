"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

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
    <section className="relative pt-32 pb-40 flex flex-col items-center justify-center min-h-[85vh] text-center px-4 overflow-hidden border-b border-white/5">
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
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#a855f7]/20 blur-[120px] rounded-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-5xl mx-auto flex flex-col items-center space-y-8 mt-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/50 bg-yellow-500/10 px-5 py-2 text-sm font-semibold text-yellow-400 backdrop-blur-sm">
            <Star className="w-4 h-4 fill-yellow-400" /> Meilleur IPTV Abonnement en France
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          variants={titleVariants}
          className="text-5xl md:text-8xl font-black tracking-tighter text-white drop-shadow-2xl"
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
          className="bg-white text-black px-8 py-3 rounded-2xl text-xl md:text-5xl font-black italic -rotate-2 transform shadow-xl shadow-white/10 cursor-default"
        >
          Le Monde IPTV Abonnement
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-300 max-w-3xl mt-8 leading-relaxed font-medium"
        >
          Découvrez le <strong className="text-white">Meilleur IPTV</strong> premium. Plus de 65 000 chaînes,
          films et séries VOD en <strong className="text-white">Full HD et 4K</strong>. Zapping ultra-rapide, sans coupure.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 mt-12"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Button
              onClick={onOrderClick}
              className="w-full bg-[#a855f7] hover:bg-[#9333ea] text-white rounded-full px-10 py-7 text-xl font-bold shadow-[0_0_40px_-10px_#a855f7] hover:shadow-[0_0_60px_-10px_#a855f7] transition-shadow"
            >
              Test Gratuit 1H
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <a href="#abonnements">
              <Button
                variant="outline"
                className="w-full rounded-full px-10 py-7 text-xl font-bold border-white/20 hover:bg-white/5 text-white bg-transparent backdrop-blur-sm"
              >
                Voir les Tarifs
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
