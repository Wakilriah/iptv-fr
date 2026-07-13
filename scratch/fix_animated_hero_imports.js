const fs = require('fs');

const file = 'src/components/AnimatedHero.tsx';
let content = fs.readFileSync(file, 'utf8');

// Normalize line endings
content = content.replace(/\r\n/g, '\n');

// Insert import at the top
if (content.indexOf('import { useOrderModal }') === -1) {
  content = content.replace(
    '"use client"\n',
    '"use client"\n\nimport { useOrderModal } from "@/context/OrderModalContext"\n'
  );
}

fs.writeFileSync(file, content.replace(/\n/g, '\r\n'));
console.log("Successfully fixed useOrderModal import in AnimatedHero.tsx!");
