"use client"

import { useState } from "react"
import { m, AnimatePresence } from "framer-motion"
import { MessageCircle, Menu, X } from "lucide-react"
import * as tiktokPixel from "@/lib/tiktokPixel"

const WHATSAPP_NUMBER = "213781858983"
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#050505]/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2.5 md:gap-3 text-base sm:text-lg md:text-xl font-bold tracking-tight hover:opacity-90 transition-opacity shrink-0">
            <img src="/logo.webp?v=3" alt="Match Ce Soir Fr Logo" width={56} height={56} className="!h-12 sm:!h-13 md:!h-14 w-auto object-contain shrink-0" />
            <span className="text-white whitespace-nowrap">
              MATCH CE SOIR
            </span>
            <span className="text-[10px] md:text-xs bg-[#a855f7] text-white px-2.5 py-0.5 rounded-full font-bold shadow-[0_0_10px_rgba(168,85,247,0.3)] shrink-0">
              FR
            </span>
          </a>
          
          <nav className="hidden xl:flex items-center gap-5 text-xs xl:text-sm text-gray-400 font-medium">
            <a href="#hero" className="hover:text-white transition-colors">Accueil</a>
            <a href="#vidéos-series" className="hover:text-white transition-colors">Vidéos &amp; Programmes</a>
            <a href="/chaines" onClick={() => tiktokPixel.searchChannels()} className="hover:text-white transition-colors text-[#a855f7] font-semibold">Chaînes</a>
            <a href="#comment-installer" className="hover:text-white transition-colors">Installation</a>
            <a href="#abonnements" className="hover:text-white transition-colors">Nos Packs</a>
            <a href="#tarifs" className="hover:text-white transition-colors">Tarifs</a>
            <a href="#compatibilite" className="hover:text-white transition-colors">Compatibilité</a>
            <a href="#fonctionnalites" className="hover:text-white transition-colors">Avantages</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </nav>
          
          <div className="flex items-center gap-2">
            <m.a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="bg-[#25D366] hover:bg-[#25D366]/90 text-white w-10 h-10 sm:w-auto p-0 sm:px-5 sm:py-2.5 flex items-center justify-center gap-2 rounded-full font-semibold shadow-[0_0_15px_-3px_#25D366] hover:shadow-[0_0_25px_5px_#25D366] transition-shadow duration-300 shrink-0 cursor-pointer text-sm"
              aria-label="Contacter sur WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </m.a>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-gray-400 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <m.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 bottom-0 z-40 bg-[#050505]/95 backdrop-blur-lg xl:hidden overflow-y-auto"
          >
            <nav className="flex flex-col items-center gap-1 py-6 px-4">
              {[
                { label: "Accueil", href: "#hero" },
                { label: "Chaînes", href: "/chaines" },
                { label: "Vidéos & Programmes", href: "#vidéos-series" },
                { label: "Installation", href: "#comment-installer" },
                { label: "Nos Packs", href: "#abonnements" },
                { label: "Tarifs", href: "#tarifs" },
                { label: "Compatibilité", href: "#compatibilite" },
                { label: "Avantages", href: "#fonctionnalites" },
                { label: "FAQ", href: "#faq" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 text-lg text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors font-medium"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 w-full flex items-center justify-center bg-[#25D366] hover:bg-[#25D366]/90 text-white gap-2 rounded-full font-semibold shadow-[0_0_15px_-3px_#25D366] py-3 text-base cursor-pointer text-center"
                aria-label="Contacter sur WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
                Contactez-nous sur WhatsApp
              </a>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
