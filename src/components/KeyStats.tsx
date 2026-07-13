import React from "react"

export function KeyStats() {
  const stats = [
    {
      number: "5+",
      title: "Années d'excellence IPTV",
      desc: "Plus de cinq ans à offrir une expérience IPTV premium."
    },
    {
      number: "3 200+",
      title: "Chaînes TV en direct",
      desc: "Profitez d'un vaste choix de chaînes du monde entier."
    },
    {
      number: "32+",
      title: "Pays desservis",
      desc: "Compatibilité mondiale pour répondre à tous vos besoins."
    },
    {
      number: "100%",
      title: "Disponibilité garantie",
      desc: "Un service IPTV fiable et stable, disponible 24h/24 et 7j/7."
    }
  ]

  return (
    <section className="py-24 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8 lg:gap-6 max-w-7xl mx-auto">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className="flex flex-col items-center text-center group hover:scale-[1.03] transition-transform duration-300 ease-out"
            >
              {/* Glowing Number */}
              <span className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-purple-400 drop-shadow-[0_0_20px_rgba(168,85,247,0.15)] group-hover:drop-shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all select-none">
                {stat.number}
              </span>
              
              {/* Gradient Divider Line */}
              <div className="w-28 h-[3px] bg-gradient-to-r from-transparent via-purple-500 to-transparent my-5 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Title */}
              <h3 className="text-white font-extrabold text-base sm:text-lg lg:text-xl tracking-tight mb-3">
                {stat.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-400 text-xs sm:text-sm lg:text-base leading-relaxed max-w-[280px] font-medium">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
