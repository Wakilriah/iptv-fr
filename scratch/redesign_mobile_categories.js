const fs = require('fs');

const file = 'src/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Redesign the grid container for mobile
content = content.replace(
  /<div className="bg=\[#0d1929\] rounded-3xl p-6 border border-white\/5">\s*<div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-2 sm:px-8 md:px-0 mx-auto max-w-\[320px\] sm:max-w-md md:max-w-none">/,
  `<div className="bg-[#0d1929] rounded-2xl md:rounded-3xl p-3 md:p-6 border border-white/5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-4">`
);

// 2. Redesign the cards and hide the text overlay on mobile
content = content.replace(
  /<div className="channel-card group relative bg-black rounded-2xl border border-white\/10 aspect-video flex items-center justify-center overflow-hidden cursor-pointer (.*?)">\s*<img src="(.*?)" alt="(.*?)" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" \/>\s*<div className="absolute inset-0 bg-gradient-to-t from-black\/90 via-black\/20 to-transparent flex items-end justify-center pb-2 md:pb-3 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">\s*<span className="text-white font-bold text-xs md:text-sm">(.*?)<\/span>\s*<\/div>\s*<\/div>/g,
  (match, hoverClass, src, alt, text) => {
    return `<div className="channel-card group relative bg-black rounded-xl md:rounded-2xl border border-white/10 aspect-video flex items-center justify-center overflow-hidden cursor-pointer ${hoverClass} shadow-md">
                <img src="${src}" alt="${alt}" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent hidden md:flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-bold text-sm">${text}</span>
                </div>
              </div>`;
  }
);

fs.writeFileSync(file, content);
console.log('Successfully redesigned category grid for mobile');
