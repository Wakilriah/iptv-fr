const fs = require('fs');

const file = 'src/app/chaines/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Optimize Logo Link
content = content.replace(
  /<a href="\/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight hover:opacity-90 transition-opacity" aria-label="Retour à l'accueil Match Ce Soir FR">([\s\S]*?)<\/a>/,
  `<a href="/" className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base md:text-xl font-extrabold tracking-tight hover:opacity-90 transition-opacity shrink-0" aria-label="Retour à l'accueil Match Ce Soir FR">
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 group-hover:text-white shrink-0" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 whitespace-nowrap">
              MATCH CE SOIR
            </span>
            <span className="text-[9px] md:text-xs bg-[#9333ea] text-white px-1.5 py-0.5 rounded-md font-black shadow-[0_0_10px_rgba(168,85,247,0.5)] shrink-0">
              FR
            </span>
          </a>`
);

// 2. Optimize Trial Button
content = content.replace(
  /<a\s+href="https:\/\/wa\.me\/213781858983"\s+target="_blank"\s+rel="noopener noreferrer"\s+className="bg-\[#25D366\] hover:bg-\[#25D366\]\/90 text-\[#050505\] gap-2 rounded-full font-semibold px-5 py-2.5 text-sm shadow-\[0_0_15px_-3px_#25D366\] hover:shadow-\[0_0_25px_5px_#25D366\] transition-all inline-flex items-center"\s+aria-label="Obtenir un essai d'une heure sur WhatsApp"\s*>\s*Essai Découverte 1H\s*<\/a>/,
  `<a 
            href="https://wa.me/213781858983" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#25D366]/90 text-[#050505] gap-1 sm:gap-2 rounded-full font-semibold px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm shadow-[0_0_15px_-3px_#25D366] hover:shadow-[0_0_25px_5px_#25D366] transition-all inline-flex items-center shrink-0"
            aria-label="Obtenir un essai d'une heure sur WhatsApp"
          >
            <span className="sm:hidden">Essai 1H</span>
            <span className="hidden sm:inline">Essai Découverte 1H</span>
          </a>`
);

fs.writeFileSync(file, content);
console.log('Successfully optimized chaines page header for mobile layout');
