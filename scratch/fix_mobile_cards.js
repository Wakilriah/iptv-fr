const fs = require('fs');

const file = 'src/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  /<div className="bg=\[#0d1929\] rounded-3xl p-6 border border-white\/5">\s*<div className="grid grid-cols-2 md:grid-cols-4 gap-4">/,
  `<div className="bg-[#0d1929] rounded-3xl p-6 border border-white/5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 px-4 sm:px-10 md:px-0 max-w-sm sm:max-w-md md:max-w-none mx-auto">`
);

fs.writeFileSync(file, content);
console.log('Successfully reduced mobile category cards size');
