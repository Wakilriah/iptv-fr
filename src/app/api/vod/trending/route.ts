import { NextResponse } from "next/server"

const vidéos = [
  {
    id: 101,
    title: "PROJECT GENESIS",
    type: "Film",
    rating: 8.6,
    poster: null,
    year: "2026",
    genre: "SCI-FI / ACTION",
    gradient: "from-[#1e1b4b] via-[#4c1d95] to-[#1e1b4b]",
    icon: "Sparkles"
  },
  {
    id: 102,
    title: "NEON HORIZON",
    type: "Film",
    rating: 8.1,
    poster: null,
    year: "2025",
    genre: "CYBERPUNK",
    gradient: "from-[#030712] via-[#be185d] to-[#030712]",
    icon: "Flame"
  },
  {
    id: 103,
    title: "BLOOD & EMPIRE",
    type: "Film",
    rating: 7.9,
    poster: null,
    year: "2025",
    genre: "HISTORIQUE",
    gradient: "from-[#1c1917] via-[#9a3412] to-[#1c1917]",
    icon: "Shield"
  },
  {
    id: 104,
    title: "CHRONOS EFFECT",
    type: "Film",
    rating: 8.4,
    poster: null,
    year: "2026",
    genre: "THRILLER",
    gradient: "from-[#0c0a09] via-[#78716c] to-[#0c0a09]",
    icon: "Clock"
  },
  {
    id: 105,
    title: "WILD DEPTHS",
    type: "Film",
    rating: 8.9,
    poster: null,
    year: "2025",
    genre: "DOCUMENTAIRE",
    gradient: "from-[#064e3b] via-[#047857] to-[#064e3b]",
    icon: "Compass"
  },
  {
    id: 106,
    title: "LAST LINE",
    type: "Film",
    rating: 8.2,
    poster: null,
    year: "2026",
    genre: "SPORTS / ACTION",
    gradient: "from-[#7c2d12] via-[#b91c1c] to-[#7c2d12]",
    icon: "Zap"
  },
  {
    id: 107,
    title: "MYSTIC OATH",
    type: "Film",
    rating: 8.0,
    poster: null,
    year: "2025",
    genre: "FANTAISIE",
    gradient: "from-[#172554] via-[#1d4ed8] to-[#172554]",
    icon: "Crown"
  },
  {
    id: 108,
    title: "COMÉDIE CLUB",
    type: "Film",
    rating: 7.5,
    poster: null,
    year: "2025",
    genre: "COMÉDIE",
    gradient: "from-[#701a75] via-[#a21caf] to-[#701a75]",
    icon: "Smile"
  }
]

const series = [
  {
    id: 201,
    title: "SATELLITE",
    type: "Série",
    rating: 8.7,
    poster: null,
    year: "2025",
    genre: "SCI-FI / DRAME",
    gradient: "from-[#0f172a] via-[#1e293b] to-[#0f172a]",
    icon: "Sparkles"
  },
  {
    id: 202,
    title: "THE SYNDICATE",
    type: "Série",
    rating: 8.5,
    poster: null,
    year: "2026",
    genre: "CRIME / DRAME",
    gradient: "from-[#030712] via-[#374151] to-[#030712]",
    icon: "Shield"
  },
  {
    id: 203,
    title: "RED GEAR",
    type: "Série",
    rating: 8.2,
    poster: null,
    year: "2025",
    genre: "COURSE / ACTION",
    gradient: "from-[#451a03] via-[#d97706] to-[#451a03]",
    icon: "Clock"
  },
  {
    id: 204,
    title: "ANCIENT SAGA",
    type: "Série",
    rating: 8.8,
    poster: null,
    year: "2025",
    genre: "HISTORIQUE",
    gradient: "from-[#1c1917] via-[#854d0e] to-[#1c1917]",
    icon: "Crown"
  },
  {
    id: 205,
    title: "CYBER PULSE",
    type: "Série",
    rating: 8.3,
    poster: null,
    year: "2026",
    genre: "CYBER / DRAME",
    gradient: "from-[#172554] via-[#0284c7] to-[#172554]",
    icon: "Flame"
  },
  {
    id: 206,
    title: "LOST KINGDOM",
    type: "Série",
    rating: 8.6,
    poster: null,
    year: "2026",
    genre: "ANIME / FANTAISIE",
    gradient: "from-[#3b0764] via-[#6b21a8] to-[#3b0764]",
    icon: "Crown"
  },
  {
    id: 207,
    title: "ECO-WORLDS",
    type: "Série",
    rating: 8.4,
    poster: null,
    year: "2025",
    genre: "NATURE / DOC",
    gradient: "from-[#022c22] via-[#15803d] to-[#022c22]",
    icon: "Compass"
  },
  {
    id: 208,
    title: "FINAL ROUND",
    type: "Série",
    rating: 8.0,
    poster: null,
    year: "2025",
    genre: "SPORTS / DRAME",
    gradient: "from-[#500724] via-[#9d174d] to-[#500724]",
    icon: "Zap"
  }
]

export async function GET() {
  try {
    return NextResponse.json({ vidéos, series })
  } catch (error) {
    return NextResponse.json({ error: "Failed to load VOD data" }, { status: 500 })
  }
}
