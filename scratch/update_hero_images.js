const fs = require('fs');

const file = 'src/components/AnimatedHero.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  /<Image\s+src="\/hero-psg\.webp"\s+alt="Famille regardant un match PSG en IPTV"\s+fill\s+className="object-cover"\s+priority\s+\/>/,
  `{/* Desktop Image */}
          <div className="hidden md:block absolute inset-0">
            <Image
              src="/hero-psg.webp"
              alt="Famille regardant un match PSG en IPTV"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Mobile Image */}
          <div className="block md:hidden absolute inset-0">
            <Image
              src="/hero-mobile.jpg"
              alt="Famille regardant la TV sur mobile"
              fill
              className="object-cover object-center"
              priority
            />
          </div>`
);

fs.writeFileSync(file, content);
console.log('Successfully updated AnimatedHero images');
