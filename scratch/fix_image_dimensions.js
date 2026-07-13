const fs = require('fs');

const file = 'src/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Header Logo
content = content.replace(
  '<img src="/logo.webp?v=3" alt="Match Ce Soir Fr Logo" className="!h-12 sm:!h-13 md:!h-14 w-auto object-contain shrink-0" />',
  '<img src="/logo.webp?v=3" alt="Match Ce Soir Fr Logo" width={56} height={56} className="!h-12 sm:!h-13 md:!h-14 w-auto object-contain shrink-0" />'
);

// 2. Desktop Category Images
content = content.replace(
  '<img src={cat.src} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />',
  '<img src={cat.src} alt={cat.name} width={400} height={225} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />'
);

// 3. Mobile Category Images
content = content.replace(
  `                      <img
                        src={cat.src}
                        alt={cat.id}
                        className="w-full h-full object-cover"
                      />`,
  `                      <img
                        src={cat.src}
                        alt={cat.id + " categorie"}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover"
                      />`
);

// 4. Packs Banner Image
content = content.replace(
  `              <img 
                src="/packs-banner.webp" 
                alt="Nos Packs Abonnement IPTV - Match Ce Soir Fr" 
                className="w-full h-auto object-contain rounded-3xl transition-transform duration-700 group-hover:scale-[1.02]"
              />`,
  `              <img 
                src="/packs-banner.webp" 
                alt="Nos Packs Abonnement IPTV - Match Ce Soir Fr" 
                width={640}
                height={360}
                className="w-full h-auto object-contain rounded-3xl transition-transform duration-700 group-hover:scale-[1.02]"
              />`
);

// 5. FAQ Image
content = content.replace(
  `              <img 
                src="/faq-couple.webp" 
                alt="Couple regardant confortablement la télévision" 
                className="w-full h-auto object-contain rounded-3xl border border-white/10 shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-[1.02]"
              />`,
  `              <img 
                src="/faq-couple.webp" 
                alt="Couple regardant confortablement la télévision" 
                width={500}
                height={350}
                className="w-full h-auto object-contain rounded-3xl border border-white/10 shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-[1.02]"
              />`
);

// 6. Footer Logo
content = content.replace(
  '<img src="/logo.webp?v=3" alt="Match Ce Soir Fr Logo" className="h-10 md:h-16 w-auto object-contain" />',
  '<img src="/logo.webp?v=3" alt="Match Ce Soir Fr Logo" width={64} height={64} className="h-10 md:h-16 w-auto object-contain" />'
);

fs.writeFileSync(file, content);
console.log("Successfully fixed all img tags by adding explicit width and height attributes!");
