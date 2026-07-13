const fs = require('fs');

const file = 'src/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const targetStr = `                              <div className="bg-[#0d1929] rounded-3xl p-6 border border-white/5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="channel-card group relative bg-black rounded-xl md:rounded-2xl border border-white/10 aspect-video flex items-center justify-center overflow-hidden cursor-pointer hover:border-[#a855f7] transition-all duration-300 shadow-md">
                <img src="/channels/logo_sports.jpg" alt="Sports en Direct" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent hidden md:flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-bold text-sm">Sports en Direct</span>
                </div>
              </div>
              <div className="channel-card group relative bg-black rounded-xl md:rounded-2xl border border-white/10 aspect-video flex items-center justify-center overflow-hidden cursor-pointer hover:border-[#00d4ff] transition-all duration-300 shadow-md">
                <img src="/channels/logo_cinema.jpg" alt="Cinéma Premium" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent hidden md:flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-bold text-sm">Cinéma Premium</span>
                </div>
              </div>
              <div className="channel-card group relative bg-black rounded-xl md:rounded-2xl border border-white/10 aspect-video flex items-center justify-center overflow-hidden cursor-pointer hover:border-[#e63946] transition-all duration-300 shadow-md">
                <img src="/channels/logo_series.jpg" alt="Séries Internationales" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent hidden md:flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-bold text-sm">Séries</span>
                </div>
              </div>
              <div className="channel-card group relative bg-black rounded-xl md:rounded-2xl border border-white/10 aspect-video flex items-center justify-center overflow-hidden cursor-pointer hover:border-[#ff2d55] transition-all duration-300 shadow-md">
                <img src="/channels/logo_generaliste.jpg" alt="Généraliste" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent hidden md:flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-bold text-sm">Généraliste</span>
                </div>
              </div>
              <div className="channel-card group relative bg-black rounded-xl md:rounded-2xl border border-white/10 aspect-video flex items-center justify-center overflow-hidden cursor-pointer hover:border-[#f72585] transition-all duration-300 shadow-md">
                <img src="/channels/logo_info.jpg" alt="Information" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent hidden md:flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-bold text-sm">Information</span>
                </div>
              </div>
              <div className="channel-card group relative bg-black rounded-xl md:rounded-2xl border border-white/10 aspect-video flex items-center justify-center overflow-hidden cursor-pointer hover:border-[#ff9500] transition-all duration-300 shadow-md">
                <img src="/channels/logo_docs.jpg" alt="Documentaires" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent hidden md:flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-bold text-sm">Documentaires</span>
                </div>
              </div>
              <div className="channel-card group relative bg-black rounded-xl md:rounded-2xl border border-white/10 aspect-video flex items-center justify-center overflow-hidden cursor-pointer hover:border-[#00b4d8] transition-all duration-300 shadow-md">
                <img src="/channels/logo_jeunesse.jpg" alt="Jeunesse" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent hidden md:flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-bold text-sm">Jeunesse</span>
                </div>
              </div>
              <div className="channel-card group relative bg-black rounded-xl md:rounded-2xl border border-white/10 aspect-video flex items-center justify-center overflow-hidden cursor-pointer hover:border-[#7b2ff7] transition-all duration-300 shadow-md">
                <img src="/channels/logo_musique.jpg" alt="Musique" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent hidden md:flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-bold text-sm">Musique</span>
                </div>
              </div>
            </div>
          </div>`;

const replacementStr = `              {/* Desktop Category Grid */}
              <div className="hidden md:block bg-[#0d1929] rounded-3xl p-6 border border-white/5">
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { id: 'sports', name: 'Sports en Direct', color: '#a855f7', src: '/channels/logo_sports.jpg' },
                    { id: 'cinema', name: 'Cinéma Premium', color: '#00d4ff', src: '/channels/logo_cinema.jpg' },
                    { id: 'series', name: 'Séries', color: '#e63946', src: '/channels/logo_series.jpg' },
                    { id: 'general', name: 'Généraliste', color: '#ff2d55', src: '/channels/logo_generaliste.jpg' },
                    { id: 'info', name: 'Information', color: '#f72585', src: '/channels/logo_info.jpg' },
                    { id: 'docs', name: 'Documentaires', color: '#ff9500', src: '/channels/logo_docs.jpg' },
                    { id: 'jeunesse', name: 'Jeunesse', color: '#00b4d8', src: '/channels/logo_jeunesse.jpg' },
                    { id: 'musique', name: 'Musique', color: '#7b2ff7', src: '/channels/logo_musique.jpg' }
                  ].map((cat) => (
                    <div
                      key={cat.id}
                      className="channel-card group relative bg-black rounded-2xl border border-white/10 aspect-video flex items-center justify-center overflow-hidden cursor-pointer hover:border-dynamic transition-all duration-300 shadow-md"
                      style={{ '--hover-color': cat.color } as React.CSSProperties}
                    >
                      <img src={cat.src} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white font-bold text-sm">{cat.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Category Grid */}
              <div className="block md:hidden bg-[#0d1929] rounded-2xl p-3 border border-white/5 mx-2 shadow-inner">
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: 'sports', src: '/channels/logo_sports_mobile.jpg' },
                    { id: 'cinema', src: '/channels/logo_cinema_mobile.jpg' },
                    { id: 'series', src: '/channels/logo_series_mobile.jpg' },
                    { id: 'general', src: '/channels/logo_generaliste_mobile.jpg' },
                    { id: 'info', src: '/channels/logo_info_mobile.jpg' },
                    { id: 'docs', src: '/channels/logo_docs_mobile.jpg' },
                    { id: 'jeunesse', src: '/channels/logo_jeunesse_mobile.jpg' },
                    { id: 'musique', src: '/channels/logo_musique_mobile.jpg' }
                  ].map((cat) => (
                    <div
                      key={cat.id}
                      className="relative bg-[#0d121f] rounded-xl border border-white/10 aspect-square overflow-hidden shadow-lg"
                    >
                      <img
                        src={cat.src}
                        alt={cat.id}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>`;

if (content.includes(targetStr.replace(/\s+/g, ' '))) {
  console.log('Direct string match failed due to spacing, attempting simplified replacement');
}

// Let's do a more robust regex-based replace:
// Find `<div className="bg-[#0d1929] rounded-3xl p-6 border border-white/5">` up to the closing `</div>\s*</div>` (before explorer button)
const regex = /<div className="bg=\[#0d1929\] rounded-3xl p-6 border border-white\/5">([\s\S]*?)<\/div>\s*<\/div>\s*<div className="text-center mt-12">/;
content = content.replace(regex, `${replacementStr}\n          <div className="text-center mt-12">`);

fs.writeFileSync(file, content);
console.log('Successfully applied mobile & desktop separation for categories');
