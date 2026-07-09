"use client"

import { useState } from "react"
import { m, AnimatePresence } from "framer-motion"
import { Search, Globe, Tv, Film, Compass, User, ArrowLeft, Check, AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import channelsData from "@/data/channels.json"
import * as tiktokPixel from "@/lib/tiktokPixel"
import { useEffect } from "react"

const CHANNEL_LOGOS: Record<string, string> = {}

export default function ChannelsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("France")
  
  // Icon mapping for categories
  const categoryIcons: Record<string, React.ReactNode> = {
    sports: <Tv className="w-5 h-5 text-emerald-400" />,
    vidéos: <Film className="w-5 h-5 text-[#a855f7]" />,
    actualités: <Globe className="w-5 h-5 text-blue-400" />,
    divertissement: <Compass className="w-5 h-5 text-rose-400" />,
    documentaires: <Globe className="w-5 h-5 text-amber-400" />,
    enfants: <User className="w-5 h-5 text-sky-400" />
  }

  // Capitalize function
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

  // Find all countries
  const countries = channelsData.countries

  // Search filter handler
  const getSearchResults = () => {
    if (!searchTerm.trim()) return null

    const results: Array<{
      countryName: string
      categoryName: string
      channels: string[]
    }> = []

    countries.forEach(country => {
      Object.entries(country.channelTypes).forEach(([category, channels]) => {
        const matchingChannels = channels.filter(channel =>
          channel.toLowerCase().includes(searchTerm.toLowerCase())
        )
        if (matchingChannels.length > 0) {
          results.push({
            countryName: country.name,
            categoryName: category,
            channels: matchingChannels
          })
        }
      })
    })

    return results
  }

  const searchResults = getSearchResults()
  const currentCountryData = countries.find(c => c.name === selectedCountry)

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col relative overflow-hidden">
      {/* Background glow decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#9333ea]/5 blur-[80px] md:blur-[150px] rounded-full pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#050505]/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base md:text-xl font-extrabold tracking-tight hover:opacity-90 transition-opacity shrink-0" aria-label="Retour à l'accueil Match Ce Soir FR">
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 group-hover:text-white shrink-0" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 whitespace-nowrap">
              MATCH CE SOIR
            </span>
            <span className="text-[9px] md:text-xs bg-[#9333ea] text-white px-1.5 py-0.5 rounded-md font-black shadow-[0_0_10px_rgba(168,85,247,0.5)] shrink-0">
              FR
            </span>
          </a>
          
          <a 
            href="https://wa.me/213781858983" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#25D366]/90 text-[#050505] gap-1 sm:gap-2 rounded-full font-semibold px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm shadow-[0_0_15px_-3px_#25D366] hover:shadow-[0_0_25px_5px_#25D366] transition-all inline-flex items-center shrink-0"
            aria-label="Obtenir un essai d'une heure sur WhatsApp"
          >
            <span className="sm:hidden">Essai 1H</span>
            <span className="hidden sm:inline">Essai Découverte 1H</span>
          </a>
        </div>
      </header>

      <div className="flex-1 container mx-auto px-4 py-12 max-w-6xl relative z-10 space-y-12">
        {/* Title Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            LISTE DES <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#d8b4fe]">CHAÎNES DE TÉLÉVISION</span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
            Recherchez et explorez nos +50 000 chaînes internationales incluses dans tous nos forfaits d&apos;abonnement.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative group">
          <div className="absolute inset-0 bg-[#9333ea]/10 blur-xl rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <div className="relative flex items-center">
            <Search className="absolute left-5 text-gray-300 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher une chaîne (ex: Sports, Cinéma, Documentaires...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Rechercher une chaîne"
              className="w-full pl-14 pr-6 py-4 bg-[#0d121f] border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9333ea] focus:border-transparent focus:ring-1 focus:ring-[#a855f7] transition-all text-base font-semibold"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-5 text-gray-300 hover:text-white transition-colors"
                aria-label="Effacer la recherche"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Conditional rendering based on Search */}
        {searchResults !== null ? (
          /* Search results view */
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-200 flex items-center gap-2">
              Résultats de recherche pour <span className="text-[#a855f7]">&quot;{searchTerm}&quot;</span>
              <span className="text-xs bg-white/5 text-gray-300 px-3 py-1 rounded-full font-bold">
                {searchResults.reduce((sum, r) => sum + r.channels.length, 0)} chaînes trouvées
              </span>
            </h2>

            {searchResults.length === 0 ? (
              <div className="text-center py-20 text-gray-300 space-y-2">
                <AlertCircle className="w-10 h-10 mx-auto text-gray-300" />
                <p className="text-lg font-bold">Aucune chaîne correspondante</p>
                <p className="text-sm text-gray-300">Essayez d&apos;autres mots-clés ou parcourez par pays.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {searchResults.map((result, i) => (
                  <m.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#0d121f] border border-white/5 rounded-3xl p-6 space-y-4"
                  >
                    <div className="flex justify-between items-center pb-3 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        {categoryIcons[result.categoryName] || <Tv className="w-5 h-5 text-gray-300" />}
                        <span className="text-xs font-black uppercase text-gray-300 tracking-wider">
                          {capitalize(result.categoryName)}
                        </span>
                      </div>
                      <span className="text-xs font-black text-[#a855f7] bg-[#9333ea]/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                        🌎 {result.countryName}
                      </span>
                    </div>

                    <ul className="space-y-2.5">
                      {result.channels.map((chan, idx) => {
                        const logoUrl = CHANNEL_LOGOS[chan.toLowerCase()]
                        return (
                          <li key={idx} className="flex items-center gap-3 text-sm text-gray-200 font-semibold bg-black/20 p-2.5 rounded-xl border border-white/[0.02]">
                            {logoUrl ? (
                              <Image src={logoUrl} alt={chan} width={20} height={20} className="w-5 h-5 rounded-md object-cover border border-white/10 shrink-0" />
                            ) : (
                              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
                            )}
                            {chan}
                          </li>
                        )
                      })}
                    </ul>
                  </m.div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Normal country browser view */
          <div className="space-y-8">
            {/* Country Tabs - Horizontal Scrollable list */}
            <div className="flex overflow-x-auto gap-2.5 pb-3 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
              {countries.map(country => {
                const isActive = selectedCountry === country.name
                return (
                  <button
                    key={country.name}
                    onClick={() => setSelectedCountry(country.name)}
                    className={`px-6 py-3 rounded-full text-sm font-bold tracking-wide uppercase border shrink-0 transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#9333ea] border-[#a855f7] text-white shadow-[0_0_20px_-5px_#a855f7]"
                        : "bg-[#0d121f] border-white/5 text-gray-300 hover:text-white hover:border-white/10"
                    }`}
                  >
                    🌎 {country.name}
                  </button>
                )
              })}
            </div>

            {/* Categories and Channels Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentCountryData &&
                Object.entries(currentCountryData.channelTypes).map(([category, channels]) => (
                  <m.div
                    key={category}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#0d121f] border border-white/5 rounded-3xl p-6 space-y-4 hover:border-[#a855f7]/30 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between pb-4 border-b border-white/5">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-white/5 rounded-xl border border-white/5">
                          {categoryIcons[category] || <Tv className="w-5 h-5 text-gray-300" />}
                        </div>
                        <h2 className="font-black text-white text-base md:text-lg uppercase tracking-tight">
                          {capitalize(category)}
                        </h2>
                      </div>
                      <span className="text-xs bg-white/5 text-gray-300 font-bold px-2.5 py-1 rounded-full">
                        {channels.length} chaînes
                      </span>
                    </div>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                      {channels.map((channel, i) => {
                        const logoUrl = CHANNEL_LOGOS[channel.toLowerCase()]
                        return (
                          <li
                            key={i}
                            className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200 font-semibold bg-black/20 p-2.5 rounded-xl border border-white/[0.02]"
                          >
                            {logoUrl ? (
                              <Image src={logoUrl} alt={channel} width={20} height={20} className="w-5 h-5 rounded-md object-cover border border-white/10 shrink-0" />
                            ) : (
                              <div className="w-5 h-5 rounded-md bg-[#9333ea]/10 flex items-center justify-center shrink-0">
                                <Check className="w-3.5 h-3.5 text-[#a855f7]" />
                              </div>
                            )}
                            <span className="truncate" title={channel}>{channel}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </m.div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-[#0d121f] border-t border-white/10 py-8 text-center text-gray-300 text-xs mt-auto relative z-10">
        <p>Copyright © 2026 Match Ce Soir Fr. Tous droits réservés.</p>
        <p className="mt-1 text-gray-300">Plus de 65 000 chaînes &amp; VOD dans toute l&apos;Europe.</p>
      </footer>
    </main>
  )
}
