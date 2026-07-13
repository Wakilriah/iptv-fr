const fs = require('fs');

const file = 'src/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// A safer way is to find the index of `<div className="bg-[#0d1929] rounded-3xl p-6 border border-white/5">`
// and replace up to `logo_musique.jpg` block's closing tags.
const startIndex = content.indexOf('<div className="bg-[#0d1929] rounded-3xl p-6 border border-white/5">');

if (startIndex === -1) {
  console.error('Could not find start element!');
  process.exit(1);
}

// We want to replace everything from startIndex up to the end of the cards container
// Let's find the closing tag. The block ends with the 8th card (logo_musique.jpg)
// and its closing </div>'s.
// We can search for the end pattern:
const endPattern = 'alt="Musique" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />\n                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent hidden md:flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">\n                  <span className="text-white font-bold text-sm">Musique</span>\n                </div>\n              </div>\n            </div>\n          </div>';

// Let's find the end of this block
const endIndex = content.indexOf('Musique</span>\n                </div>\n              </div>\n            </div>\n          </div>');

if (endIndex === -1) {
  console.error('Could not find end element!');
  process.exit(1);
}

// The exact substring to replace starts at startIndex and ends after the container closing tags
const actualEndIndex = endIndex + 'Musique</span>\n                </div>\n              </div>\n            </div>\n          </div>'.length;

const originalBlock = content.substring(startIndex, actualEndIndex);

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
                      className="channel-card group relative bg-black rounded-2xl border border-white/10 aspect-video flex items-center justify-center overflow-hidden cursor-pointer transition-all duration-300 shadow-md hover:border-[var(--hover-color)]"
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

content = content.replace(originalBlock, replacementStr);
fs.writeFileSync(file, content);
console.log('Successfully separated categories block');
