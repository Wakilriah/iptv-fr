"use client"

import { useEffect, useState } from "react"
import { Star, Film, Tv, Play, AlertCircle, Sparkles, Flame, Shield, Clock, Compass, Zap, Crown, Smile } from "lucide-react"
import Image from "next/image"

interface VODItem {
  id: number
  title: string
  type: string
  rating: number
  poster: string | null
  year: string
  overview: string
  genre?: string
  gradient?: string
  icon?: string
}

const FALLBACK_MOVIES: VODItem[] = [
  { id: 1, title: "Le Comte de Monte-Cristo", type: "Film", rating: 8.5, poster: null, year: "2024", overview: "" },
  { id: 2, title: "Alien: Romulus", type: "Film", rating: 7.8, poster: null, year: "2024", overview: "" },
  { id: 3, title: "Dune: Deuxième Partie", type: "Film", rating: 8.4, poster: null, year: "2024", overview: "" },
  { id: 4, title: "Vice-Versa 2", type: "Film", rating: 8.0, poster: null, year: "2024", overview: "" },
  { id: 5, title: "Deadpool & Wolverine", type: "Film", rating: 8.1, poster: null, year: "2024", overview: "" },
  { id: 6, title: "Un P'tit Truc En Plus", type: "Film", rating: 7.9, poster: null, year: "2024", overview: "" },
]


const renderIcon = (iconName?: string) => {
  switch (iconName) {
    case "Sparkles": return <Sparkles className="w-8 h-8 text-yellow-400/80" />
    case "Flame": return <Flame className="w-8 h-8 text-orange-500/80" />
    case "Shield": return <Shield className="w-8 h-8 text-blue-400/80" />
    case "Clock": return <Clock className="w-8 h-8 text-stone-400/80" />
    case "Compass": return <Compass className="w-8 h-8 text-emerald-400/80" />
    case "Zap": return <Zap className="w-8 h-8 text-red-500/80" />
    case "Crown": return <Crown className="w-8 h-8 text-amber-400/80" />
    case "Smile": return <Smile className="w-8 h-8 text-fuchsia-400/80" />
    default: return <Film className="w-8 h-8 text-[#a855f7]/50" />
  }
}

export function TrendingVOD() {
  const [activeTab, setActiveTab] = useState<"vidéos" | "series">("vidéos")
  const [vidéos, setMovies] = useState<VODItem[]>([])
  const [series, setSeries] = useState<VODItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchTrending() {
      try {
        setLoading(true)
        const res = await fetch("/api/vod/trending")
        if (!res.ok) throw new Error("API response error")
        const data = await res.json()
        if (data.error) throw new Error(data.error)
        setMovies(data.vidéos || [])
        setSeries(data.series || [])
        setError(false)
      } catch (err) {
        console.error("Error fetching TMDB trending VOD:", err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchTrending()
  }, [])

  const currentItems = activeTab === "vidéos" ? (vidéos.length > 0 ? vidéos : FALLBACK_MOVIES) : series
  const doubledItems = [...currentItems, ...currentItems]

  return (
    <div className="space-y-8 w-full">
      {/* Category Tabs */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setActiveTab("vidéos")}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold tracking-wide uppercase border transition-all cursor-pointer ${
            activeTab === "vidéos"
              ? "bg-[#9333ea] border-[#a855f7] text-white shadow-[0_0_20px_-5px_#a855f7]"
              : "bg-[#0d121f] border-white/5 text-gray-300 hover:text-white hover:border-white/10"
          }`}
        >
          <Film className="w-4 h-4" />
          Films Tendances
        </button>
        <button
          onClick={() => setActiveTab("series")}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold tracking-wide uppercase border transition-all cursor-pointer ${
            activeTab === "series"
              ? "bg-[#9333ea] border-[#a855f7] text-white shadow-[0_0_20px_-5px_#a855f7]"
              : "bg-[#0d121f] border-white/5 text-gray-300 hover:text-white hover:border-white/10"
          }`}
        >
          <Tv className="w-4 h-4" />
          Séries Tendances
        </button>
      </div>

      {/* Grid or Track View */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-10 h-10 border-4 border-t-[#a855f7] border-white/10 rounded-full animate-spin will-change-transform" />
          <p className="text-gray-300 text-sm font-medium">Chargement des nouveautés TMDB...</p>
        </div>
      ) : (
        <div className="relative group overflow-hidden">
          {/* Subtle Ambient Background Glows */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[#a855f7]/5 to-transparent blur-3xl pointer-events-none rounded-3xl" />

          {/* Carousel Wrapper */}
          <div className="bg-[#0c101d] rounded-3xl p-6 sm:p-8 border border-white/5 overflow-hidden">
            <style>{`
              @keyframes scrollVOD {
                0%   { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .vod-track {
                display: flex;
                gap: 1.5rem;
                width: max-content;
                animation: scrollVOD 45s linear infinite;
                will-change: transform;
                backface-visibility: hidden;
              }
              .vod-track:hover {
                animation-play-state: paused;
              }
            `}</style>
            
            <div className="vod-track pb-2">
              {doubledItems.map((item, idx) => (
                <div
                  key={`${item.id || idx}-${idx}`}
                  className="w-[180px] sm:w-[220px] flex flex-col gap-3 group/card cursor-pointer relative shrink-0"
                >
                  {/* Poster Card */}
                  <div className="aspect-[2/3] w-full rounded-2xl bg-[#0f172a] border border-white/5 relative overflow-hidden shadow-lg group-hover/card:border-[#a855f7]/40 transition-all duration-300">
                    {item.poster ? (
                      <Image
                        src={item.poster}
                        alt={item.title}
                        width={220}
                        height={330}
                        className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 180px, 220px"
                      />
                    ) : (
                      <div className={`w-full h-full flex flex-col justify-between p-5 bg-gradient-to-br ${item.gradient || 'from-[#1a1c29] to-[#0d0e15]'} relative overflow-hidden select-none`}>
                        {/* Background glowing circle */}
                        <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/5 rounded-full blur-xl" />
                        <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-white/5 rounded-full blur-xl" />

                        {/* Top: Icon & Genre */}
                        <div className="flex items-center justify-between z-10">
                          {renderIcon(item.icon)}
                          <span className="text-[8px] font-black tracking-widest text-white/70 bg-white/10 px-2 py-0.5 rounded-full uppercase">
                            {item.genre || 'Premium'}
                          </span>
                        </div>

                        {/* Middle: Fictional Title */}
                        <div className="flex flex-col items-center justify-center flex-1 text-center py-4 z-10">
                          <h3 className="text-base sm:text-lg font-black text-white tracking-tighter uppercase leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                            {item.title}
                          </h3>
                        </div>

                        {/* Bottom: Quality Tag */}
                        <div className="flex items-center justify-between border-t border-white/10 pt-2 z-10">
                          <span className="text-[8px] font-black uppercase text-yellow-400/90 tracking-widest">
                            {item.type}
                          </span>
                          <span className="text-[8px] font-bold text-white/50 tracking-widest">
                            ULTRA HD
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Top Overlay Badges */}
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10 pointer-events-none">
                      <span className="bg-black/60 backdrop-blur-md text-[10px] font-black uppercase text-gray-300 px-2.5 py-1 rounded-full border border-white/5 tracking-wider">
                        {item.type}
                      </span>
                      <div className="bg-black/60 backdrop-blur-md text-[10px] font-black text-yellow-400 px-2 py-0.5 rounded-full border border-yellow-400/20 flex items-center gap-1 shadow-md">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        {item.rating}
                      </div>
                    </div>

                    {/* Play Hover Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center gap-2 z-10 duration-300">
                      <div className="w-12 h-12 rounded-full bg-[#9333ea] flex items-center justify-center text-white shadow-lg transform scale-90 group-hover/card:scale-100 transition-transform duration-300 shadow-[#a855f7]/30">
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="px-1 space-y-1">
                    <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      <span>Sélection Premium</span>
                      {item.year && <span>{item.year}</span>}
                    </div>
                    <h4 className="font-extrabold text-sm sm:text-base text-white truncate group-hover/card:text-[#a855f7] transition-colors leading-tight" title={item.title}>
                      {item.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
