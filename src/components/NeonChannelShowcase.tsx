"use client"

import Link from "next/link"

const POPULAR_BRANDS = [
  {
    name: "beIN SPORTS",
    logo: (
      <div className="flex flex-col items-center">
        <span className="text-[#4b0082] font-black text-2xl sm:text-3xl tracking-tight leading-none italic">beIN</span>
        <span className="text-[#4b0082] font-black text-[9px] sm:text-[10px] tracking-[0.25em] leading-none mt-1">SPORTS</span>
      </div>
    )
  },
  {
    name: "RMC SPORT",
    logo: (
      <div className="flex flex-col items-center">
        <span className="text-[#e11d48] font-black text-2xl sm:text-3xl tracking-tight leading-none">RMC</span>
        <span className="text-[#1e3a8a] font-black text-[10px] sm:text-[11px] tracking-wider leading-none mt-0.5 border-t border-gray-200 pt-0.5">SPORT</span>
      </div>
    )
  },
  {
    name: "NETFLIX",
    logo: (
      <span className="text-[#E50914] font-black text-2xl sm:text-3xl tracking-tighter scale-y-110">NETFLIX</span>
    )
  },
  {
    name: "Disney+",
    logo: (
      <div className="relative flex items-center justify-center">
        <span className="text-[#0063e5] font-black text-2xl sm:text-3xl italic tracking-tight">Disney<span className="text-[#00a8e1]">+</span></span>
      </div>
    )
  },
  {
    name: "HBO max",
    logo: (
      <div className="flex items-center gap-0.5 font-sans">
        <span className="text-black font-black text-2xl sm:text-3xl tracking-tight">HBO</span>
        <span className="text-[#9933ff] font-extrabold text-2xl sm:text-3xl tracking-tighter">max</span>
      </div>
    )
  },
  {
    name: "Prime Video",
    logo: (
      <div className="flex flex-col items-center select-none">
        <span className="text-[#00a8e1] font-black text-2xl sm:text-3xl tracking-tight leading-none">prime</span>
        {/* Smile arrow */}
        <svg className="w-14 h-2.5 text-[#00a8e1] -mt-0.5" viewBox="0 0 50 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 2C15 7 35 7 45 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M41 1C43 2.5 45.5 2.5 45.5 2.5C45.5 2.5 44.5 5 43.5 6.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    )
  }
]

export function NeonChannelShowcase() {
  return (
    <div className="flex flex-col items-center gap-8 w-full">
      {/* Label */}
      <p className="text-sm sm:text-base text-gray-300 font-extrabold uppercase tracking-[0.25em] text-center">
        Chaînes populaires en France
      </p>

      {/* Channel Badges Container */}
      <div className="w-full max-w-5xl px-4">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {POPULAR_BRANDS.map((brand) => (
            <div
              key={brand.name}
              className="bg-white rounded-3xl py-6 px-8 flex items-center justify-center shadow-lg w-[140px] sm:w-[180px] h-[80px] sm:h-[90px] border border-gray-100 select-none"
            >
              {brand.logo}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Link to channels page */}
      <Link href="/chaines">
        <div
          className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-[#a855f7]/30 bg-[#9333ea]/5 backdrop-blur-sm text-sm sm:text-base font-extrabold text-[#c084fc] hover:text-white hover:bg-[#7e22ce]/15 hover:border-[#a855f7]/50 transition-all duration-300 cursor-pointer"
        >
          <span>Explorer toutes nos chaînes</span>
          <svg aria-hidden="true"
            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </Link>
    </div>
  )
}
