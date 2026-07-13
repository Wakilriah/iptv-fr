const fs = require('fs');

const file = 'src/components/OrderModal.tsx';
let content = fs.readFileSync(file, 'utf8');

// We want to replace from `// Build WhatsApp message` up to the end of the handleSubmit function `}`
const startIndex = content.indexOf('// Build WhatsApp message');

if (startIndex === -1) {
  console.error('Could not find start index!');
  process.exit(1);
}

// The handleSubmit function ends at the next `}` which precedes `return (`
// Let's find `return (`
const returnIndex = content.indexOf('return (', startIndex);

if (returnIndex === -1) {
  console.error('Could not find return index!');
  process.exit(1);
}

// Find the last closing brace `}` before `return (`
const closingBraceIndex = content.lastIndexOf('}', returnIndex);

const beforeBlock = content.substring(0, startIndex);
const afterBlock = content.substring(closingBraceIndex);

const newBlock = `// Build WhatsApp message
    const message = encodeURIComponent(
      \`Bonjour,\\n\\n\` +
      \`Je souhaite commander un abonnement IPTV.\\n\\n\` +
      \`📦 Abonnement choisi : \${planName}\\n\\n\` +
      \`💶 Prix : \${planPrice}\\n\\n\` +
      \`⏳ Durée : \${planDuration}\\n\\n\` +
      \`Merci.\`
    )

    // tracking
    if (planPrice.includes("Gratuit") || planName.toLowerCase().includes("essai")) {
      tiktokPixel.startTrial()
    } else {
      const numericPrice = parseFloat(planPrice.replace(/[^0-9.]/g, '')) || 0
      tiktokPixel.completePayment(planName, numericPrice.toString())
    }

    window.open(\`https://wa.me/\${WHATSAPP_NUMBER}?text=\${message}\`, "_blank")
    onClose()
    setSubmitted(false)
    setForm({ fullname: "", email: "", phone: "" })
  `;

content = beforeBlock + newBlock + afterBlock;
fs.writeFileSync(file, content);
console.log('Successfully fixed OrderModal syntax error and set instant redirect');
