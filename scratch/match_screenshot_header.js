const fs = require('fs');

const file = 'src/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Rewrite the Logo Link to match the screenshot layout
content = content.replace(
  /<a href="#hero" className="flex items-center gap-1 md:gap-2 text-sm sm:text-base md:text-2xl font-extrabold tracking-tight hover:opacity-90 transition-opacity shrink-0">([\s\S]*?)<\/a>/,
  `<a href="#hero" className="flex items-center gap-2.5 md:gap-3 text-base sm:text-lg md:text-xl font-bold tracking-tight hover:opacity-90 transition-opacity shrink-0">
            <img src="/logo.webp" alt="Match Ce Soir Fr Logo" className="h-9 sm:h-10 md:h-12 w-auto object-contain shrink-0" />
            <span className="text-white whitespace-nowrap">
              MATCH CE SOIR
            </span>
            <span className="text-[10px] md:text-xs bg-[#a855f7] text-white px-2.5 py-0.5 rounded-full font-bold shadow-[0_0_10px_rgba(168,85,247,0.3)] shrink-0">
              FR
            </span>
          </a>`
);

// 2. Rewrite the WhatsApp Button to be circular on mobile
content = content.replace(
  /<Button className="bg-\[#25D366\] hover:bg-\[#25D366\]\/90 text-white gap-2 rounded-full font-semibold shadow-\[0_0_15px_-3px_#25D366\] hover:shadow-\[0_0_25px_5px_#25D366\] transition-shadow duration-300">/,
  '<Button className="bg-[#25D366] hover:bg-[#25D366]/90 text-white w-10 h-10 sm:w-auto p-0 sm:px-5 sm:py-2.5 flex items-center justify-center gap-2 rounded-full font-semibold shadow-[0_0_15px_-3px_#25D366] hover:shadow-[0_0_25px_5px_#25D366] transition-shadow duration-300 shrink-0">'
);

fs.writeFileSync(file, content);
console.log('Successfully completed header design layout to match the screenshot');
