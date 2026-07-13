const fs = require('fs');

const file = 'src/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Update header logo with important height classes and cache buster
content = content.replace(
  /<img src="\/logo\.webp" alt="Match Ce Soir Fr Logo" className="h-12 sm:h-13 md:h-14 w-auto object-contain shrink-0" \/>/,
  '<img src="/logo.webp?v=3" alt="Match Ce Soir Fr Logo" className="!h-12 sm:!h-13 md:!h-14 w-auto object-contain shrink-0" />'
);

// 2. Update footer logo with cache buster
content = content.replace(
  /<img src="\/logo\.webp" alt="Match Ce Soir Fr Logo" className="h-10 md:h-16 w-auto object-contain" \/>/,
  '<img src="/logo.webp?v=3" alt="Match Ce Soir Fr Logo" className="h-10 md:h-16 w-auto object-contain" />'
);

fs.writeFileSync(file, content);
console.log('Successfully updated logo image instances with !important classes and cache buster');
