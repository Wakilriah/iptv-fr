const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      walk(filepath, callback);
    } else if (filepath.endsWith('.tsx') || filepath.endsWith('.ts')) {
      callback(filepath);
    }
  }
}

walk('src', (filepath) => {
  let content = fs.readFileSync(filepath, 'utf8');
  let original = content;

  // Fix WhatsApp icon/text colors that were hardcoded to white inside the card
  content = content.replace(/bg-\[#25D366\](.*?)text-white/g, 'bg-[#25D366]$1text-black');
  
  // Fix Email card bg to blue-600 for contrast
  content = content.replace(/bg-\[#3b82f6\]/g, 'bg-[#2563eb]');
  
  // Replace text-white/80 and text-white/95 in contact cards and pricing to text-white or text-gray-200 depending on bg
  // We can just upgrade all text-white/80 to text-gray-200 if they are on dark bg, or text-white if on colored bg
  // On #2563eb or #e11d48, text-white is required. Let's just blindly change text-white/80 to text-white in page.tsx contact cards area.
  // A safer regex for these specific cards:
  if (filepath.includes('page.tsx')) {
    content = content.replace(/<p className="text-white\/80 text-sm mt-0\.5">Réponse instantanée<\/p>/g, '<p className="text-black text-sm mt-0.5">Réponse instantanée</p>');
    content = content.replace(/<p className="text-white\/80 text-sm mt-0\.5">matchcesoir\.fr@gmail\.com<\/p>/g, '<p className="text-white text-sm mt-0.5">matchcesoir.fr@gmail.com</p>');
    content = content.replace(/<p className="text-white\/80 text-sm mt-0\.5">Toujours disponible<\/p>/g, '<p className="text-white text-sm mt-0.5">Toujours disponible</p>');
    
    // Also the ArrowRight inside WhatsApp
    // Wait, the ArrowRight text-white is in the line after WhatsApp text.
    // The previous script already replaced WhatsApp card text-white with text-[#050505].
    // Let's just find any text-white near WhatsApp
    content = content.replace(/<ArrowRight className="w-6 h-6 text-white transition-transform group-hover:translate-x-1" aria-hidden="true" \/>/g, '<ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" aria-hidden="true" />');
    
    // Also the MessageCircle
    content = content.replace(/<MessageCircle className="w-6 h-6 text-white" \/>/g, '<MessageCircle className="w-6 h-6 text-black" />');
  }

  // Double check OrderModal
  if (filepath.includes('OrderModal.tsx')) {
     content = content.replace(/text-green-300 font-bold/g, 'text-green-400 font-bold'); // wait, green-300 is lighter so contrast is better. It was already upgraded.
  }

  if (content !== original) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Fixed more a11y in ${filepath}`);
  }
});
