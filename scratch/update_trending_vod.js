const fs = require('fs');

const file = 'src/components/TrendingVOD.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Update imports to include all lucide icons
content = content.replace(
  `import { Star, Film, Tv, Play, AlertCircle } from "lucide-react"`,
  `import { Star, Film, Tv, Play, AlertCircle, Sparkles, Flame, Shield, Clock, Compass, Zap, Crown, Smile } from "lucide-react"`
);

// 2. Add renderIcon helper function above TrendingVOD
const renderIconHelper = `
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
`;

content = content.replace(`export function TrendingVOD() {`, `${renderIconHelper}\nexport function TrendingVOD() {`);

// 3. Update VODItem interface to include optional custom fields
content = content.replace(
  `interface VODItem {
  id: number
  title: string
  type: string
  rating: number
  poster: string | null
  year: string
  overview: string
}`,
  `interface VODItem {
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
}`
);

// 4. Update the Fallback Movies array to be fictional compliant movies
const fallbackMovies = `const FALLBACK_MOVIES: VODItem[] = [
  {
    id: 101,
    title: "PROJECT GENESIS",
    type: "Film",
    rating: 8.6,
    poster: null,
    year: "2026",
    genre: "SCI-FI / ACTION",
    gradient: "from-[#1e1b4b] via-[#4c1d95] to-[#1e1b4b]",
    icon: "Sparkles",
    overview: ""
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
    icon: "Flame",
    overview: ""
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
    icon: "Shield",
    overview: ""
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
    icon: "Clock",
    overview: ""
  }
]`;

const fallbackRegex = /const FALLBACK_MOVIES: VODItem\[\] = \[\s*\{ id: 1,[\s\S]*?\}\s*\]/;
content = content.replace(fallbackRegex, fallbackMovies);

// 5. Replace poster block with custom fictional cover fallback
const oldPosterBlock = `{item.poster ? (
                      <Image
                        src={item.poster}
                        alt={item.title}
                        width={220}
                        height={330}
                        className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 180px, 220px"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#1a1c29] to-[#0d0e15] text-center gap-2">
                        <Film className="w-8 h-8 text-[#a855f7]/50" />
                        <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Affiche Indisponible</span>
                      </div>
                    )}`;

const newPosterBlock = `{item.poster ? (
                      <Image
                        src={item.poster}
                        alt={item.title}
                        width={220}
                        height={330}
                        className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 180px, 220px"
                      />
                    ) : (
                      <div className={\`w-full h-full flex flex-col justify-between p-5 bg-gradient-to-br \${item.gradient || 'from-[#1a1c29] to-[#0d0e15]'} relative overflow-hidden select-none\`}>
                        {/* Background glowing circle */}
                        <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/5 rounded-full blur-xl" />
                        <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-white/5 rounded-full blur-xl" />

                        {/* Top: Icon & Genre */}
                        <div className="flex items-center justify-between z-10">
                          {renderIcon(item.icon)}
                          <span className="text-[8px] font-black tracking-widest text-white/70 bg-white/10 px-2 py-0.5 rounded-full uppercase">
                            {item.genre || 'VOD'}
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
                    )}`;

content = content.replace(oldPosterBlock, newPosterBlock);

fs.writeFileSync(file, content);
console.log('Successfully updated TrendingVOD.tsx with beautiful HTML VOD covers!');
