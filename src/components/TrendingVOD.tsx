"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Film, Tv, Play, AlertCircle } from "lucide-react"

interface VODItem {
  id: number
  title: string
  type: string
  rating: number
  poster: string | null
  year: string
  overview: string
}

const FALLBACK_MOVIES: VODItem[] = [
  { id: 1, title: "Le Comte de Monte-Cristo", type: "Film", rating: 8.5, poster: null, year: "2024", overview: "" },
  { id: 2, title: "Alien: Romulus", type: "Film", rating: 7.8, poster: null, year: "2024", overview: "" },
  { id: 3, title: "Dune: Deuxième Partie", type: "Film", rating: 8.4, poster: null, year: "2024", overview: "" },
  { id: 4, title: "Vice-Versa 2", type: "Film", rating: 8.0, poster: null, year: "2024", overview: "" },
  { id: 5, title: "Deadpool & Wolverine", type: "Film", rating: 8.1, poster: null, year: "2024", overview: "" },
  { id: 6, title: "Un P'tit Truc En Plus", type: "Film", rating: 7.9, poster: null, year: "2024", overview: "" },
]

export function TrendingVOD() {
  const [activeTab, setActiveTab] = useState<"movies" | "series">("movies")
  const [movies, setMovies] = useState<VODItem[]>([])
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
        setMovies(data.movies || [])
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

  const currentItems = activeTab === "movies" ? (movies.length > 0 ? movies : FALLBACK_MOVIES) : series

  return (
    <div className="space-y-8 w-full">
      {/* Category Tabs */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setActiveTab("movies")}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold tracking-wide uppercase border transition-all cursor-pointer ${
            activeTab === "movies"
              ? "bg-[#a855f7] border-[#a855f7] text-white shadow-[0_0_20px_-5px_#a855f7]"
              : "bg-[#0d121f] border-white/5 text-gray-400 hover:text-white hover:border-white/10"
          }`}
        >
          <Film className="w-4 h-4" />
          Films Tendances VOD
        </button>
        <button
          onClick={() => setActiveTab("series")}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold tracking-wide uppercase border transition-all cursor-pointer ${
            activeTab === "series"
              ? "bg-[#a855f7] border-[#a855f7] text-white shadow-[0_0_20px_-5px_#a855f7]"
              : "bg-[#0d121f] border-white/5 text-gray-400 hover:text-white hover:border-white/10"
          }`}
        >
          <Tv className="w-4 h-4" />
          Séries Tendances VOD
        </button>
      </div>

      {/* Grid or Track View */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-10 h-10 border-4 border-t-[#a855f7] border-white/10 rounded-full animate-spin" />
          <p className="text-gray-400 text-sm font-medium">Chargement des nouveautés TMDB...</p>
        </div>
      ) : (
        <div className="relative group">
          {/* Subtle Ambient Background Glows */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[#a855f7]/5 to-transparent blur-3xl pointer-events-none rounded-3xl" />

          {/* Carousel Wrapper */}
          <div className="bg-[#0c101d] rounded-3xl p-6 sm:p-8 border border-white/5 overflow-x-auto scrollbar-hide">
            <div className="flex gap-6 min-w-max pb-2">
              <AnimatePresence mode="popLayout">
                {currentItems.map((item, idx) => (
                  <motion.div
                    key={item.id || idx}
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    transition={{ duration: 0.3, delay: Math.min(idx * 0.04, 0.4) }}
                    className="w-[180px] sm:w-[220px] flex flex-col gap-3 group/card cursor-pointer relative"
                  >
                    {/* Poster Card */}
                    <div className="aspect-[2/3] w-full rounded-2xl bg-[#0f172a] border border-white/5 relative overflow-hidden shadow-lg group-hover/card:border-[#a855f7]/40 transition-all duration-300">
                      {item.poster ? (
                        <img
                          src={item.poster}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#1a1c29] to-[#0d0e15] text-center gap-2">
                          <Film className="w-8 h-8 text-[#a855f7]/50" />
                          <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Affiche Indisponible</span>
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
                        <div className="w-12 h-12 rounded-full bg-[#a855f7] flex items-center justify-center text-white shadow-lg transform scale-90 group-hover/card:scale-100 transition-transform duration-300 shadow-[#a855f7]/30">
                          <Play className="w-5 h-5 fill-white ml-0.5" />
                        </div>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="px-1 space-y-1">
                      <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        <span>VOD Premium</span>
                        {item.year && <span>{item.year}</span>}
                      </div>
                      <h4 className="font-extrabold text-sm sm:text-base text-white truncate group-hover/card:text-[#a855f7] transition-colors leading-tight" title={item.title}>
                        {item.title}
                      </h4>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
