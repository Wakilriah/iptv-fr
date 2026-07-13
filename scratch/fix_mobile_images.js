const fs = require('fs');

const file = 'src/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Logo size update
content = content.replace(
  /<img src="\/logo\.webp" alt="Match Ce Soir Fr Logo" className="h-9 w-auto object-contain" \/>/g,
  '<img src="/logo.webp" alt="Match Ce Soir Fr Logo" className="h-14 md:h-16 w-auto object-contain" />'
);

// 2. Object-contain for packs-banner and faq-couple
content = content.replace(
  /className="w-full h-auto object-cover rounded-3xl transition-transform duration-700 group-hover:scale-\[1\.02\]"/g,
  'className="w-full h-auto object-contain rounded-3xl transition-transform duration-700 group-hover:scale-[1.02]"'
);

content = content.replace(
  /className="w-full h-auto object-cover rounded-3xl border border-white\/10 shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-\[1\.02\]"/g,
  'className="w-full h-auto object-contain rounded-3xl border border-white/10 shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-[1.02]"'
);

fs.writeFileSync(file, content);
console.log('Successfully updated logo sizes and mobile images to object-contain');
