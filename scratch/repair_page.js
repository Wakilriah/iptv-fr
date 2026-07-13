const fs = require('fs');

const file = 'src/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Grid Replacement
const newGrid = `          <div className="bg-[#0d1929] rounded-3xl p-6 border border-white/5">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <div className="channel-card group relative bg-black rounded-2xl border-4 border-white/80 aspect-video flex items-center justify-center overflow-hidden cursor-pointer">
                <span className="text-white font-black text-sm md:text-base tracking-tight">Cinéma Premium</span>
              </div>
              <div className="channel-card group relative bg-gradient-to-br from-[#4a0080] to-[#2d0060] rounded-2xl border-4 border-[#a855f7] aspect-video flex flex-col items-center justify-center overflow-hidden shadow-[0_0_20px_-4px_#a855f7] hover:shadow-[0_0_30px_-4px_#a855f7] cursor-pointer">
                <span className="relative text-white font-black text-sm md:text-base italic leading-none">Sports</span>
                <span className="relative text-white font-black text-[10px] tracking-widest mt-1">EN DIRECT</span>
              </div>
              <div className="channel-card group relative bg-[#221111] rounded-2xl border-4 border-white/80 aspect-video flex items-center justify-center overflow-hidden cursor-pointer">
                <span className="text-[#ef4444] font-black text-sm md:text-base tracking-tighter">Séries Int.</span>
              </div>
              <div className="channel-card group relative bg-[#001f5c] rounded-2xl border-4 border-white/80 aspect-video flex items-center justify-center overflow-hidden cursor-pointer">
                <span className="text-white font-black text-sm md:text-base tracking-tight">Contenu Familial</span>
              </div>
              <div className="channel-card group relative bg-[#111] rounded-2xl border-4 border-white/80 aspect-video flex items-center justify-center overflow-hidden cursor-pointer">
                <span className="text-white font-black text-sm md:text-base tracking-widest">Documentaires</span>
              </div>
              <div className="channel-card group relative bg-[#1a1a2e] rounded-2xl border-4 border-white/80 aspect-video flex items-center justify-center overflow-hidden cursor-pointer">
                <span className="text-[#38bdf8] font-black text-sm md:text-base tracking-widest">Événements</span>
              </div>
              <div className="channel-card group relative bg-black rounded-2xl border-4 border-white/80 aspect-video flex flex-col items-center justify-center overflow-hidden cursor-pointer">
                <span className="text-white font-black text-sm md:text-base tracking-widest">Infos en Continu</span>
              </div>
            </div>
          </div>`;

const gridRegex = /<div className="bg-\[#0d1929\] rounded-3xl p-6 border border-white\/5">.*?<div className="text-center mt-12">/s;
content = content.replace(gridRegex, newGrid + '\n          <div className="text-center mt-12">');

// 2. Images .png/.jpg -> .webp
content = content.replace(/logo\.png/g, 'logo.webp');
content = content.replace(/hero-psg\.jpg/g, 'hero-psg.webp');
content = content.replace(/packs-banner\.png/g, 'packs-banner.webp');
content = content.replace(/faq-couple\.png/g, 'faq-couple.webp');

// 3. Marketing text compliance
content = content.replace(/Test Gratuit 1H/g, 'Essai Découverte 1H');
content = content.replace(/Garantie satisfait ou remboursé 7 jours/g, 'Service client dédié 7j/7');
content = content.replace(/Garantie 7 jours/g, 'Support Client Réactif');
content = content.replace(/ACCÈS VIP ILLIMITÉ/g, 'ACCÈS VIP PREMIUM');
content = content.replace(/meilleur abonnement IPTV en France/g, 'abonnement de haute qualité');
content = content.replace(/Serveurs européens surpuissants garantissant un streaming sans coupure \(technologie anti-freeze avancée\)\./g, 'Serveurs européens performants offrant un streaming fluide pour une expérience optimale.');
content = content.replace(/Assistance gratuite/g, 'Assistance incluse');
content = content.replace(/text-black/g, 'text-white'); // WhatsApp button fix

// 4. TikTok Pixel Implementation

// Add imports
if (!content.includes('import * as tiktokPixel')) {
  content = content.replace(
    'import { TrendingVOD } from "@/components/TrendingVOD"', 
    'import { TrendingVOD } from "@/components/TrendingVOD"\nimport * as tiktokPixel from "@/lib/tiktokPixel"'
  );
}
content = content.replace('import { useState } from "react"', 'import { useState, useRef, useEffect } from "react"');

const effectStr = `
  useEffect(() => {
    tiktokPixel.viewHome();
  }, [])
`;
if (!content.includes('tiktokPixel.viewHome()')) {
  content = content.replace(/const openModal = \(name: string, price: string\) => \{/, 
    effectStr + '\n  const openModal = (name: string, price: string) => {'
  );
}

if (!content.includes('tiktokPixel.clickTestButton')) {
  content = content.replace(
    /const openModal = \(name: string, price: string\) => \{\s*setSelectedPlan\(\{ name, price \}\)\s*setModalOpen\(true\)\s*\}/,
    `const openModal = (name: string, price: string) => {
    if (name === "Essai Découverte 1H" || price === "0" || name.toLowerCase().includes("essai")) {
      tiktokPixel.clickTestButton();
    } else {
      tiktokPixel.initiateCheckout(name, price);
    }
    setSelectedPlan({ name, price })
    setModalOpen(true)
  }`
  );
}

// Nav links
content = content.replace(/href="\/chaines" className/g, 'href="/chaines" onClick={() => tiktokPixel.searchChannels()} className');
content = content.replace(/href="\/chaines" onClick=\{\(\) => setMobileMenuOpen\(false\)\}/g, 'href="/chaines" onClick={() => { setMobileMenuOpen(false); tiktokPixel.searchChannels(); }}');

// Contact
content = content.replace(/aria-label="Contactez-nous sur WhatsApp pour obtenir un essai ou de l'aide"/g, 'onClick={() => tiktokPixel.contact()} aria-label="Contactez-nous sur WhatsApp pour obtenir un essai ou de l\'aide"');
content = content.replace(/aria-label="Contactez-nous sur WhatsApp"/g, 'onClick={() => tiktokPixel.contact()} aria-label="Contactez-nous sur WhatsApp"');

fs.writeFileSync(file, content);
console.log('Successfully fully repaired page.tsx');
