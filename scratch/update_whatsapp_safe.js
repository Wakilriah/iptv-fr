const fs = require('fs');

const file = 'src/components/OrderModal.tsx';
let content = fs.readFileSync(file, 'utf8');

// Find index of `// Build WhatsApp message`
const startIndex = content.indexOf('// Build WhatsApp message');

if (startIndex === -1) {
  console.error('Could not find WhatsApp block start!');
  process.exit(1);
}

// Find the index of `window.open` after that
const endIndex = content.indexOf('window.open', startIndex);

if (endIndex === -1) {
  console.error('Could not find WhatsApp block end!');
  process.exit(1);
}

// We want to replace from `const isTest` (which is right after Build WhatsApp message)
// up to `window.open`.
const beforeBlock = content.substring(0, startIndex);
const afterBlock = content.substring(endIndex);

const newWhatsappBlock = `// Build WhatsApp message
    const message = encodeURIComponent(
      \`Bonjour,\\n\\n\` +
      \`Je souhaite commander un abonnement IPTV.\\n\\n\` +
      \`📦 Abonnement choisi : \${planName}\\n\\n\` +
      \`💶 Prix : \${planPrice}\\n\\n\` +
      \`⏳ Durée : \${planDuration}\\n\\n\` +
      \`Merci.\`
    )

    `;

content = beforeBlock + newWhatsappBlock + afterBlock;
fs.writeFileSync(file, content);
console.log('Successfully updated OrderModal WhatsApp message formatting via safe index split');
