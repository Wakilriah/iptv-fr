const fs = require('fs');

const filePath = 'src/app/page.tsx';
const lines = fs.readFileSync(filePath, 'utf8').split('\n');

const newGridLines = [
  '          <div className="bg-[#0d1929] rounded-3xl p-6 border border-white/5">',
  '            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">',
  '              <div className="channel-card group relative bg-[#1a1a2e] rounded-2xl border-4 border-white/80 aspect-video flex items-center justify-center overflow-hidden cursor-pointer">',
  '                <span className="text-white font-black text-sm md:text-base tracking-tight">Cinéma Premium</span>',
  '              </div>',
  '              <div className="channel-card group relative bg-gradient-to-br from-[#4a0080] to-[#2d0060] rounded-2xl border-4 border-[#a855f7] aspect-video flex flex-col items-center justify-center overflow-hidden shadow-[0_0_20px_-4px_#a855f7] hover:shadow-[0_0_30px_-4px_#a855f7] cursor-pointer">',
  '                <span className="relative text-white font-black text-sm md:text-base italic leading-none">Sports</span>',
  '                <span className="relative text-white font-black text-[10px] tracking-widest mt-1">EN DIRECT</span>',
  '              </div>',
  '              <div className="channel-card group relative bg-[#221111] rounded-2xl border-4 border-white/80 aspect-video flex items-center justify-center overflow-hidden cursor-pointer">',
  '                <span className="text-[#ef4444] font-black text-sm md:text-base tracking-tighter">Séries Int.</span>',
  '              </div>',
  '              <div className="channel-card group relative bg-[#001f5c] rounded-2xl border-4 border-white/80 aspect-video flex items-center justify-center overflow-hidden cursor-pointer">',
  '                <span className="text-white font-black text-sm md:text-base tracking-tight">Contenu Familial</span>',
  '              </div>',
  '              <div className="channel-card group relative bg-[#111] rounded-2xl border-4 border-white/80 aspect-video flex items-center justify-center overflow-hidden cursor-pointer">',
  '                <span className="text-white font-black text-sm md:text-base tracking-widest">Documentaires</span>',
  '              </div>',
  '              <div className="channel-card group relative bg-[#1a1a2e] rounded-2xl border-4 border-white/80 aspect-video flex items-center justify-center overflow-hidden cursor-pointer">',
  '                <span className="text-[#38bdf8] font-black text-sm md:text-base tracking-widest">Événements</span>',
  '              </div>',
  '              <div className="channel-card group relative bg-black rounded-2xl border-4 border-white/80 aspect-video flex flex-col items-center justify-center overflow-hidden cursor-pointer">',
  '                <span className="text-white font-black text-sm md:text-base tracking-widest">Infos en Continu</span>',
  '              </div>',
  '            </div>',
  '          </div>'
];

// In the original file, line 235 is: <div className="bg-[#0d1929] rounded-3xl p-6 border border-white/5">
// And line 338 is: </div> (which closes the bg-[#0d1929] div)
// Let's replace lines 234 to 337 (0-indexed) with the new lines

lines.splice(234, 104, ...newGridLines);
fs.writeFileSync(filePath, lines.join('\n'));
console.log("Successfully replaced the grid with line index precision");
