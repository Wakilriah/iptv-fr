const fs = require('fs');

const file = 'src/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Update header logo link for ultra-small mobile screens
content = content.replace(
  /<a href="#hero" className="flex items-center gap-1\.5 md:gap-2 text-base md:text-2xl font-extrabold tracking-tight hover:opacity-90 transition-opacity shrink-0">([\s\S]*?)<\/a>/,
  `<a href="#hero" className="flex items-center gap-1 md:gap-2 text-sm sm:text-base md:text-2xl font-extrabold tracking-tight hover:opacity-90 transition-opacity shrink-0">
            <img src="/logo.webp" alt="Match Ce Soir Fr Logo" className="h-8 sm:h-10 md:h-16 w-auto object-contain shrink-0" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 whitespace-nowrap">
              MATCH CE SOIR
            </span>
            <span className="text-[9px] md:text-xs bg-[#a855f7] text-white px-1 sm:px-2 py-0.5 rounded-md font-black shadow-[0_0_10px_rgba(168,85,247,0.5)] shrink-0">
              FR
            </span>
          </a>`
);

fs.writeFileSync(file, content);
console.log('Successfully refined mobile logo sizing in page.tsx');
