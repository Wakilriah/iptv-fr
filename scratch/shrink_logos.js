const fs = require('fs');

const file = 'src/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Update header logo
content = content.replace(
  /className="h-8 sm:h-10 md:h-16 w-auto object-contain shrink-0"/,
  'className="h-6 sm:h-8 md:h-16 w-auto object-contain shrink-0"'
);

// 2. Update footer logo
content = content.replace(
  /className="h-14 md:h-16 w-auto object-contain"/,
  'className="h-10 md:h-16 w-auto object-contain"'
);

fs.writeFileSync(file, content);
console.log('Successfully reduced header and footer logo sizes for mobile');
