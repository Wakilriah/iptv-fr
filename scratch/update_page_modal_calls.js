const fs = require('fs');

const file = 'src/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Update selectedPlan state
content = content.replace(
  /const \[selectedPlan, setSelectedPlan\] = useState\(\{ name: "", price: "" \}\)/,
  'const [selectedPlan, setSelectedPlan] = useState({ name: "", price: "", duration: "" })'
);

// 2. Update openModal function definition
content = content.replace(
  /const openModal = \(name: string, price: string\) => \{([\s\S]*?)setSelectedPlan\(\{ name, price \}\)/,
  (match, inner) => {
    return `const openModal = (name: string, price: string, duration: string) => {${inner}setSelectedPlan({ name, price, duration })`;
  }
);

// 3. Update Trial button call in Hero
content = content.replace(
  /openModal\("Essai Découverte 1H", "0"\)/,
  'openModal("Essai Découverte 1H", "Gratuit", "1 heure")'
);

// 4. Update Standard pricing grid call
content = content.replace(
  /onClick=\{\(\) => openModal\(plan\.name, plan\.price\)\}/,
  'onClick={() => openModal("IPTV Standard " + plan.name, plan.price + " €", plan.duration)}'
);

// 5. Update Premium pricing grid call
// Since the string is the same, we need to replace the next occurrence as well. 
// Standard was the first occurrence of `onClick={() => openModal(plan.name, plan.price)}`, 
// Premium is the second.
content = content.replace(
  /onClick=\{\(\) => openModal\(plan\.name, plan\.price\)\}/,
  'onClick={() => openModal("IPTV Premium " + plan.name, plan.price + " €", plan.duration)}'
);

// 6. Update VIP pricing call
content = content.replace(
  /onClick=\{\(\) => openModal\("IPTV VIP\+ \(12 mois\)", "89\.99"\)\}/,
  'onClick={() => openModal("IPTV VIP+ (12 mois)", "89.99 €", "12 mois")}'
);

// 7. Update OrderModal instantiation props
content = content.replace(
  /<OrderModal\s+isOpen=\{modalOpen\}\s+onClose=\{\(\) => setModalOpen\(false\)\}\s+planName=\{\`Abonnement \$\{selectedPlan\.name\}\`\}\s+planPrice=\{selectedPlan\.price\}\s+\/>/,
  `<OrderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        planName={selectedPlan.name}
        planPrice={selectedPlan.price}
        planDuration={selectedPlan.duration}
      />`
);

fs.writeFileSync(file, content);
console.log('Successfully updated page.tsx openModal calls and modal props');
