const fs = require('fs');

const file = 'src/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const newGrid = `          <div className="bg-[#0d1929] rounded-3xl p-6 border border-white/5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="channel-card group relative bg-black rounded-2xl border border-white/10 aspect-video flex items-center justify-center overflow-hidden cursor-pointer hover:border-[#a855f7] transition-all duration-300">
                <img src="/channels/logo_sports.jpg" alt="Sports en Direct" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-bold text-xs md:text-sm">Sports en Direct</span>
                </div>
              </div>
              <div className="channel-card group relative bg-black rounded-2xl border border-white/10 aspect-video flex items-center justify-center overflow-hidden cursor-pointer hover:border-[#00d4ff] transition-all duration-300">
                <img src="/channels/logo_cinema.jpg" alt="Cinéma Premium" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-bold text-xs md:text-sm">Cinéma Premium</span>
                </div>
              </div>
              <div className="channel-card group relative bg-black rounded-2xl border border-white/10 aspect-video flex items-center justify-center overflow-hidden cursor-pointer hover:border-[#e63946] transition-all duration-300">
                <img src="/channels/logo_series.jpg" alt="Séries Internationales" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-bold text-xs md:text-sm">Séries</span>
                </div>
              </div>
              <div className="channel-card group relative bg-black rounded-2xl border border-white/10 aspect-video flex items-center justify-center overflow-hidden cursor-pointer hover:border-[#ff2d55] transition-all duration-300">
                <img src="/channels/logo_generaliste.jpg" alt="Généraliste" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-bold text-xs md:text-sm">Généraliste</span>
                </div>
              </div>
              <div className="channel-card group relative bg-black rounded-2xl border border-white/10 aspect-video flex items-center justify-center overflow-hidden cursor-pointer hover:border-[#f72585] transition-all duration-300">
                <img src="/channels/logo_info.jpg" alt="Information" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-bold text-xs md:text-sm">Information</span>
                </div>
              </div>
              <div className="channel-card group relative bg-black rounded-2xl border border-white/10 aspect-video flex items-center justify-center overflow-hidden cursor-pointer hover:border-[#ff9500] transition-all duration-300">
                <img src="/channels/logo_docs.jpg" alt="Documentaires" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-bold text-xs md:text-sm">Documentaires</span>
                </div>
              </div>
              <div className="channel-card group relative bg-black rounded-2xl border border-white/10 aspect-video flex items-center justify-center overflow-hidden cursor-pointer hover:border-[#00b4d8] transition-all duration-300">
                <img src="/channels/logo_jeunesse.jpg" alt="Jeunesse" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-bold text-xs md:text-sm">Jeunesse</span>
                </div>
              </div>
              <div className="channel-card group relative bg-black rounded-2xl border border-white/10 aspect-video flex items-center justify-center overflow-hidden cursor-pointer hover:border-[#7b2ff7] transition-all duration-300">
                <img src="/channels/logo_musique.jpg" alt="Musique" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-bold text-xs md:text-sm">Musique</span>
                </div>
              </div>
            </div>
          </div>`;

const gridRegex = /<div className="bg-\[#0d1929\] rounded-3xl p-6 border border-white\/5">.*?<\/div>\s*<\/div>\s*<\/div>/s;

content = content.replace(gridRegex, newGrid);

fs.writeFileSync(file, content);
console.log('Successfully replaced static grid with 8 image logos');
