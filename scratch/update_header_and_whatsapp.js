const fs = require('fs');

const file = 'src/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Update the header logo and text wrapper for mobile centering & sizing
content = content.replace(
  /<a href="#hero" className="flex items-center gap-2 text-lg md:text-2xl font-extrabold tracking-tight hover:opacity-90 transition-opacity">\s*<img src="\/logo\.webp" alt="Match Ce Soir Fr Logo" className="h-14 md:h-16 w-auto object-contain" \/>\s*<span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">\s*MATCH CE SOIR\s*<\/span>\s*<span className="text-xs bg-\[#a855f7\] text-white px-2 py-0.5 rounded-md font-black shadow-\[0_0_10px_rgba\(168,85,247,0.5\)\]">\s*FR\s*<\/span>\s*<\/a>/,
  `<a href="#hero" className="flex items-center gap-1.5 md:gap-2 text-base md:text-2xl font-extrabold tracking-tight hover:opacity-90 transition-opacity shrink-0">
            <img src="/logo.webp" alt="Match Ce Soir Fr Logo" className="h-9 md:h-16 w-auto object-contain shrink-0" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 whitespace-nowrap">
              MATCH CE SOIR
            </span>
            <span className="text-[10px] md:text-xs bg-[#a855f7] text-white px-1.5 md:px-2 py-0.5 rounded-md font-black shadow-[0_0_10px_rgba(168,85,247,0.5)] shrink-0">
              FR
            </span>
          </a>`
);

// 2. Update the old WhatsApp phone number in the footer
content = content.replace(
  /\+44 7848 166907/,
  '+213 781 858 983'
);

fs.writeFileSync(file, content);
console.log('Successfully completed header mobile optimization and WhatsApp number replacement');
