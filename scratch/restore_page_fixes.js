const fs = require('fs');

const file = 'src/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace images
content = content.replace(/logo\.png/g, 'logo.webp');
content = content.replace(/hero-psg\.jpg/g, 'hero-psg.webp');
content = content.replace(/packs-banner\.png/g, 'packs-banner.webp');
content = content.replace(/faq-couple\.png/g, 'faq-couple.webp');

// Add tiktokPixel
if (!content.includes('import * as tiktokPixel')) {
  content = content.replace(/import Image from "next\/image"/, 'import Image from "next/image"\nimport * as tiktokPixel from "@/lib/tiktokPixel"');
}

// Add viewHome effect
if (!content.includes('tiktokPixel.viewHome()')) {
  const effectStr = `
  useEffect(() => {
    tiktokPixel.viewHome();
  }, [])
`;
  content = content.replace(/const openModal.*?\{[\s\S]*?\}/, match => match + effectStr);
}

// Add clickTestButton to openModal
if (!content.includes('tiktokPixel.clickTestButton')) {
  content = content.replace(/const openModal = \(name: string, price: string\) => \{/, 
`const openModal = (name: string, price: string) => {
    if (name === "Essai Découverte 1H" || price === "0" || name.toLowerCase().includes("essai")) {
      tiktokPixel.clickTestButton();
    } else {
      tiktokPixel.initiateCheckout(name, price);
    }`);
}

// Fix searchChannels in nav
content = content.replace(/href="\/chaines" className/g, 'href="/chaines" onClick={() => tiktokPixel.searchChannels()} className');
content = content.replace(/href="\/chaines" onClick=\{\(\) => setMobileMenuOpen\(false\)\}/g, 'href="/chaines" onClick={() => { setMobileMenuOpen(false); tiktokPixel.searchChannels(); }}');

// Contact
content = content.replace(/aria-label="Contactez-nous sur WhatsApp pour obtenir un essai ou de l'aide"/g, 'onClick={() => tiktokPixel.contact()} aria-label="Contactez-nous sur WhatsApp pour obtenir un essai ou de l\'aide"');

// Fix text strings for compliance
content = content.replace(/Test Gratuit 1H/g, 'Essai Découverte 1H');
content = content.replace(/Garantie satisfait ou remboursé 7 jours/g, 'Service client dédié 7j/7');
content = content.replace(/Garantie 7 jours/g, 'Support Client Réactif');
content = content.replace(/ACCÈS VIP ILLIMITÉ/g, 'ACCÈS VIP PREMIUM');
content = content.replace(/meilleur abonnement IPTV en France/g, 'abonnement de haute qualité');
content = content.replace(/Serveurs européens surpuissants garantissant un streaming sans coupure \(technologie anti-freeze avancée\)\./g, 'Serveurs européens performants offrant un streaming fluide pour une expérience optimale.');
content = content.replace(/Assistance gratuite/g, 'Assistance incluse');

fs.writeFileSync(file, content);
console.log('Restored page.tsx fixes!');
