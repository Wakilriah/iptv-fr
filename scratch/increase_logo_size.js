const fs = require('fs');

const file = 'src/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Update logo className in page.tsx header
content = content.replace(
  /className="h-9 sm:h-10 md:h-12 w-auto object-contain shrink-0"/,
  'className="h-12 sm:h-13 md:h-14 w-auto object-contain shrink-0"'
);

fs.writeFileSync(file, content);
console.log("Successfully increased rendered logo height to h-12 (52px on sm) on mobile");
