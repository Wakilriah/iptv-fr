const fs = require('fs');

const file = 'src/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  /<section id="abonnements" className="py-24 bg=\[#050505\] relative scroll-mt-16">/g,
  '<section id="abonnements" className="py-24 bg-[#050505] relative scroll-mt-16 overflow-hidden">'
);

content = content.replace(
  /<section id="abonnements-premium" className="py-24 bg=\[#080808\] relative border-t border-white\/5">/g,
  '<section id="abonnements-premium" className="py-24 bg-[#080808] relative border-t border-white/5 overflow-hidden">'
);

content = content.replace(
  /<section id="abonnement-vip" className="py-24 bg=\[#040404\] relative border-t border-white\/5">/g,
  '<section id="abonnement-vip" className="py-24 bg-[#040404] relative border-t border-white/5 overflow-hidden">'
);

fs.writeFileSync(file, content);
console.log('Successfully added overflow-hidden to sections in page.tsx');
