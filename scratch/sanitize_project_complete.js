const fs = require('fs');
const path = require('path');

const projectRoot = "C:\\Users\\hp\\Desktop\\projects\\iptv-fr";

// Files to modify with custom replacements
const targetFiles = [
  'src/app/layout.tsx',
  'src/app/page.tsx',
  'src/app/chaines/page.tsx',
  'src/app/robots.ts',
  'src/app/sitemap.ts',
  'src/components/AnimatedHero.tsx',
  'src/components/OrderModal.tsx',
  'src/components/TrendingVOD.tsx',
  'src/app/admin/dashboard/page.tsx',
  'package.json'
];

targetFiles.forEach(relPath => {
  const filePath = path.join(projectRoot, relPath);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${relPath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/\r\n/g, '\n'); // Normalize line endings

  if (relPath === 'src/app/layout.tsx') {
    // URL replacements
    content = content.replace(/https:\/\/lemondeiptv\.fr/g, 'https://matchcesoir.fr');
    
    // Keywords
    const oldKeywords = `  keywords: [
    "IPTV France",
    "meilleur IPTV",
    "abonnement IPTV",
    "IPTV 4K",
    "IPTV français",
    "chaînes IPTV",
    "IPTV pas cher",
    "VOD IPTV",
    "IPTV streaming",
    "abonnement IPTV France",
  ],`;
    const newKeywords = `  keywords: [
    "Plateforme de divertissement",
    "Streaming premium",
    "Abonnement TV",
    "Divertissement 4K",
    "Films et Séries en direct",
    "Télévision numérique",
    "Streaming de sport",
    "Cinéma à la maison",
    "Catalogue multimédia",
    "Accès Premium France",
  ],`;
    content = content.replace(oldKeywords, newKeywords);

    // Title and description
    content = content.replace(
      'default: "Match Ce Soir Fr — Votre Portail de Divertissement VOD & TV en Full HD",',
      'default: "Match Ce Soir Fr — Votre Portail de Divertissement & Streaming Premium",'
    );
    content = content.replace(
      'title: "Match Ce Soir Fr — Votre Portail de Divertissement VOD & TV en Full HD",',
      'title: "Match Ce Soir Fr — Votre Portail de Divertissement & Streaming Premium",'
    );
    content = content.replace(
      'description:\n    "Match Ce Soir Fr — Votre Portail de Divertissement VOD & TV en Full HD & 4K. Support 24/7. Dès 25€.",',
      'description:\n    "Match Ce Soir Fr — Votre Portail de Divertissement & Streaming Premium en Full HD & 4K. Support 24/7. Dès 25€.",'
    );
    content = content.replace(
      '"Profitez de votre portail de divertissement avec Match Ce Soir Fr. Films et séries VOD en 4K. Support 24/7."',
      '"Profitez de votre portail de divertissement avec Match Ce Soir Fr. Films et séries en 4K. Support 24/7."'
    );
    content = content.replace(
      '"Vaste catalogue de VOD et TV en 4K. Abonnement dès 25€. Qualité Full HD. Support 24/7."',
      '"Vaste catalogue de films, séries et TV en 4K. Abonnement dès 25€. Qualité Full HD. Support 24/7."'
    );
  }

  if (relPath === 'src/app/page.tsx') {
    // 1. Title / Header replacements
    content = content.replace('Comment Installer Votre IPTV ?', "Guide d'Installation Simple");
    content = content.replace("codes d'accès IPTV par e-mail", "identifiants de connexion par e-mail");
    content = content.replace('NOS PACKS ABONNEMENT IPTV', 'NOS OFFRES DE DIVERTISSEMENT');
    content = content.replace('abonnement IPTV Premium 4K', 'abonnement Premium 4K');
    content = content.replace('Nos Packs Abonnement IPTV - Match Ce Soir Fr', 'Nos Packs Abonnement Premium - Match Ce Soir Fr');
    content = content.replace('Abonnement IPTV Standard', 'Abonnement Standard');
    content = content.replace('IPTV Standard {plan.name}', 'Standard {plan.name}');
    content = content.replace('planName={"IPTV Standard " + plan.name}', 'planName={"Standard " + plan.name}');
    content = content.replace('IPTV Premium 4K', 'Premium 4K');
    content = content.replace('IPTV Premium {plan.name}', 'Premium {plan.name}');
    content = content.replace('planName={"IPTV Premium " + plan.name}', 'planName={"Premium " + plan.name}');
    content = content.replace('IPTV VIP +', 'VIP +');
    content = content.replace('IPTV VIP+ (12 mois)', 'VIP+ (12 mois)');
    content = content.replace('planName="IPTV VIP+ (12 mois)"', 'planName="VIP+ (12 mois)"');
    content = content.replace('service IPTV', 'service de streaming');
    content = content.replace('service IPTV de référence', 'service de divertissement de référence');
    content = content.replace('notre service IPTV', 'notre service de divertissement');
    
    // FAQ replacements
    content = content.replace(
      `{ q: "Comment ça marche ?", a: "Après votre achat, vous recevez instantanément par email et WhatsApp vos identifiants de connexion. Il suffit de télécharger une application IPTV compatible (nous vous recommandons les meilleures), d'entrer vos identifiants, et de profiter de plus de 65 000 chaînes immédiatement." },`,
      `{ q: "Comment ça marche ?", a: "Après votre achat, vous recevez instantanément par email et WhatsApp vos identifiants de connexion. Il suffit de télécharger une application de lecture compatible (nous vous recommandons les meilleures), d'entrer vos identifiants, et de profiter de plus de 65 000 chaînes immédiatement." },`
    );
    content = content.replace(
      `{ q: "NOS ABONNEMENTS IPTV", a: "Nos abonnements vous donnent accès à plus de 75 000 chaînes en direct et une immense bibliothèque de VOD (films et séries) mis à jour quotidiennement en Full HD et 4K, sans engagement." },`,
      `{ q: "NOS OFFRES DE DIVERTISSEMENT", a: "Nos abonnements vous donnent accès à plus de 75 000 chaînes en direct et une immense bibliothèque de films et séries mis à jour quotidiennement en Full HD et 4K, sans engagement." },`
    );
    content = content.replace(
      `{ q: "Abonnement iptv Smart TV", a: "Compatible avec toutes les Smart TV (Samsung, LG, Sony, etc.). Il vous suffit d'installer une application comme Smart One IPTV, IBO Player ou IPTV Smarters Pro et d'entrer vos identifiants." },`,
      `{ q: "Compatibilité Smart TV", a: "Compatible avec toutes les Smart TV (Samsung, LG, Sony, etc.). Il vous suffit d'installer une application de lecture (comme Smart One, IBO Player ou similaires) et d'entrer vos identifiants." },`
    );
    
    // Footer / Footer-disclaimer replacements
    content = content.replace('Le service IPTV premium #1', 'Le service de streaming premium #1');
    content = content.replace('service de streaming IPTV légal', 'service de streaming légal');
    
    // VOD / Channels terms
    content = content.replace('Chaînes Et VOD', 'Chaînes, Films & Séries');
    content = content.replace('contenus en VOD (Films & Séries)', 'contenus multimédias (Films & Séries)');
    content = content.replace('bibliothèque VOD géante', 'bibliothèque de films et séries géante');
    content = content.replace('TV en direct et VOD en 4K/FHD', 'TV en direct et contenus en 4K/FHD');
    content = content.replace('+65K Chaînes & VOD', '+65K Chaînes, Films & Séries');
    content = content.replace('Notre VOD est mise à jour quotidiennement', 'Notre bibliothèque de films et séries est mise à jour quotidiennement');
    content = content.replace('href="#films-series" className="hover:text-[#a855f7] transition-colors">VOD</a>', 'href="#films-series" className="hover:text-[#a855f7] transition-colors">Films & Séries</a>');
  }

  if (relPath === 'src/app/chaines/page.tsx') {
    content = content.replace('CHAÎNES IPTV', 'CHAÎNES DE TÉLÉVISION');
    content = content.replace('chaînes & VOD dans toute', 'chaînes, films & séries dans toute');
  }

  if (relPath === 'src/app/robots.ts') {
    content = content.replace('lemondeiptv.fr', 'matchcesoir.fr');
  }

  if (relPath === 'src/app/sitemap.ts') {
    content = content.replace('lemondeiptv.fr', 'matchcesoir.fr');
  }

  if (relPath === 'src/components/AnimatedHero.tsx') {
    content = content.replace('regardant un match PSG en IPTV', 'regardant un match PSG en direct');
  }

  if (relPath === 'src/components/OrderModal.tsx') {
    content = content.replace('un abonnement IPTV.', 'un abonnement Premium.');
  }

  if (relPath === 'src/components/TrendingVOD.tsx') {
    content = content.replace('Films Tendances VOD', 'Films Tendances');
    content = content.replace('Séries Tendances VOD', 'Séries Tendances');
    content = content.replace('VOD Premium', 'Catalogue Premium');
  }

  if (relPath === 'src/app/admin/dashboard/page.tsx') {
    content = content.replace('subject=IPTV Match Ce Soir', 'subject=Premium Match Ce Soir');
    content = content.replace('subject=Abonnement IPTV Match Ce Soir', 'subject=Abonnement Premium Match Ce Soir');
  }

  if (relPath === 'package.json') {
    content = content.replace('"name": "iptv-fr"', '"name": "matchcesoir-fr"');
  }

  fs.writeFileSync(filePath, content.replace(/\n/g, '\r\n'));
  console.log(`Successfully sanitized: ${relPath}`);
});
