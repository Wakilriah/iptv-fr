const fs = require('fs');

const file = 'src/components/AnimatedHero.tsx';
let content = fs.readFileSync(file, 'utf8');

// Normalize line endings
content = content.replace(/\r\n/g, '\n');

// 1. Optimize Desktop Image sizes
content = content.replace(
  `          <div className="hidden md:block absolute inset-0">
            <Image
              src="/hero-psg.webp"
              alt="Famille regardant un match PSG en IPTV"
              fill
              className="object-cover"
              priority
            />
          </div>`,
  `          <div className="hidden md:block absolute inset-0">
            <Image
              src="/hero-psg.webp"
              alt="Famille regardant un match PSG en IPTV"
              fill
              sizes="(max-width: 768px) 1px, 100vw"
              className="object-cover"
              priority
            />
          </div>`
);

// 2. Optimize Mobile Image sizes
content = content.replace(
  `          <div className="block md:hidden absolute inset-0">
            <Image
              src="/hero-mobile.webp"
              alt="Famille regardant la TV sur mobile"
              fill
              className="object-cover object-center"
              priority
            />
          </div>`,
  `          <div className="block md:hidden absolute inset-0">
            <Image
              src="/hero-mobile.webp"
              alt="Famille regardant la TV sur mobile"
              fill
              sizes="(max-width: 768px) 100vw, 1px"
              className="object-cover object-center"
              priority
            />
          </div>`
);

// 3. Optimize CSS Blur glow
content = content.replace(
  'blur-[60px] md:blur-[150px]',
  'blur-2xl md:blur-[150px]'
);

fs.writeFileSync(file, content.replace(/\n/g, '\r\n'));
console.log("Successfully optimized AnimatedHero.tsx for responsive images and mobile GPU load!");
