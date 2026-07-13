const fs = require('fs');

const file = 'src/components/AnimatedHero.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add import
content = content.replace(
  `import { NeonChannelShowcase } from "./NeonChannelShowcase"`,
  `import { NeonChannelShowcase } from "./NeonChannelShowcase"\nimport { useOrderModal } from "@/context/OrderModalContext"`
);

// 2. Modify interface
content = content.replace(
  `interface AnimatedHeroProps {
  onOrderClick: () => void
}`,
  `// Interface kept for backwards compatibility but props are unused now`
);

// 3. Remove prop from component signature
content = content.replace(
  `export function AnimatedHero({ onOrderClick }: AnimatedHeroProps) {`,
  `export function AnimatedHero() {\n  const { openModal } = useOrderModal()`
);

// 4. Change onClick trigger
content = content.replace(
  `onClick={onOrderClick}`,
  `onClick={() => openModal("Essai Découverte 1H", "Gratuit", "1 heure")}`
);

fs.writeFileSync(file, content);
console.log("Successfully updated AnimatedHero.tsx to use OrderModalContext directly!");
