const fs = require('fs');

const file = 'src/components/OrderModal.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Update interface OrderModalProps
content = content.replace(
  /interface OrderModalProps \{\s*isOpen: boolean\s*onClose: \(\) => void\s*planName: string\s*planPrice: string\s*\}/,
  `interface OrderModalProps {
  isOpen: boolean
  onClose: () => void
  planName: string
  planPrice: string
  planDuration: string
}`
);

// 2. Update OrderModal function signature
content = content.replace(
  /export function OrderModal\(\{ isOpen, onClose, planName, planPrice \}: OrderModalProps\)/,
  'export function OrderModal({ isOpen, onClose, planName, planPrice, planDuration }: OrderModalProps)'
);

// 3. Update handleSubmit saving to DB if needed (keep planName and planPrice, but we can also save duration if we want, or just leave it)
// Let's see if we should save planDuration to database. The database orders schema might not have planDuration, so let's keep database body as is to avoid Prisma errors.

// 4. Update handleSubmit WhatsApp message format
// Match this block:
//     // Build WhatsApp message
//     const isTest = planPrice === "0" || planName.toLowerCase().includes("test")
//     const message = encodeURIComponent(
//       ...
//     )
//     setTimeout(() => { ... })

const targetWhatsappBlock = `    // Build WhatsApp message
    const isTest = planPrice === "0" || planName.toLowerCase().includes("test")
    const message = encodeURIComponent(
      isTest
        ? \`Bonjour Match Ce Soir Fr 👋\\n\\nJe souhaite demander un essai découverte de 1 heure :\\n\\n\` +
          \`📦 Forfait : \${planName}\\n\` +
          \`👤 Nom complet : \${form.fullname}\\n\` +
          \`📧 Email : \${form.email}\\n\` +
          \`📱 Téléphone : \${form.phone}\\n\\n\` +
          \`Merci de m'envoyer mes accès !\`
        : \`Bonjour Match Ce Soir Fr 👋\\n\\nJe souhaite commander l'abonnement suivant :\\n\\n\` +
          \`📦 Forfait : \${planName} (\${planPrice}€)\\n\` +
          \`👤 Nom complet : \${form.fullname}\\n\` +
          \`📧 Email : \${form.email}\\n\` +
          \`📱 Téléphone : \${form.phone}\\n\\n\` +
          \`Merci de confirmer ma commande !\`
    )`;

const replacementWhatsappBlock = `    // Build WhatsApp message
    const message = encodeURIComponent(
      \`Bonjour,\\n\\n\` +
      \`Je souhaite commander un abonnement IPTV.\\n\\n\` +
      \`📦 Abonnement choisi : \${planName}\\n\\n\` +
      \`💶 Prix : \${planPrice}\\n\\n\` +
      \`⏳ Durée : \${planDuration}\\n\\n\` +
      \`Merci.\`
    )`;

content = content.replace(targetWhatsappBlock, replacementWhatsappBlock);

fs.writeFileSync(file, content);
console.log('Successfully updated OrderModal WhatsApp message formatting');
