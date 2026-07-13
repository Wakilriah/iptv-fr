const fs = require('fs');

const file = 'src/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  /<!-- Channels -->\s*<section className="py-20 bg=\[#0a0a0a\] border-y border-white\/5">/,
  '<!-- Channels -->\n      <section className="py-12 md:py-20 bg-[#0a0a0a] border-y border-white/5">'
);

// Also replace the comment if it's `{/* Channels */}`
content = content.replace(
  /\{\/\* Channels \*\/}\s*<section className="py-20 bg=\[#0a0a0a\] border-y border-white\/5">/,
  '{/* Channels */}\n      <section className="py-12 md:py-20 bg-[#0a0a0a] border-y border-white/5">'
);

fs.writeFileSync(file, content);
console.log('Successfully reduced vertical padding for mobile Channels section');
