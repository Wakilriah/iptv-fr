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

  // 1. Color Contrast Fixes
  content = content.replace(/text-gray-400/g, 'text-gray-300');
  content = content.replace(/text-gray-500/g, 'text-gray-400');
  content = content.replace(/text-gray-600/g, 'text-gray-400');
  
  // Replace purple buttons background to pass 4.5:1
  content = content.replace(/bg-\[#a855f7\]/g, 'bg-[#9333ea]');
  content = content.replace(/hover:bg-\[#9333ea\]/g, 'hover:bg-[#7e22ce]');
  // Make sure FR badge bg is also updated if it was #a855f7
  // text-[#a855f7] is fine (5.6:1 on black) so we don't replace text color globally
  
  // Replace WhatsApp badge text to black for contrast
  content = content.replace(/bg-\[#25D366\](.*?)text-white/g, 'bg-[#25D366]$1text-[#050505]');
  
  // Replace DAZN BOXING and Netflix red to lighter red for contrast on black
  content = content.replace(/text-\[#E50914\]/g, 'text-[#ef4444]');
  
  // Replace LIGUE 1 blue
  content = content.replace(/text-\[#00a3ff\]/g, 'text-[#38bdf8]');
  
  // Replace green text to pass contrast
  content = content.replace(/text-green-400/g, 'text-green-300');

  // 2. Forms - Add autocomplete to OrderModal
  if (filepath.includes('OrderModal.tsx')) {
    content = content.replace(/name="fullname"/g, 'name="fullname" autoComplete="name"');
    content = content.replace(/name="email"/g, 'name="email" autoComplete="email"');
    content = content.replace(/name="phone"/g, 'name="phone" autoComplete="tel"');
  }

  // 3. Focus Indicators
  // Upgrade weak focus borders to thick focus rings
  content = content.replace(/focus:border-\[#a855f7\]\/60/g, 'focus:ring-2 focus:ring-[#9333ea] focus:border-transparent');
  content = content.replace(/focus:border-\[#a855f7\](?!\/)/g, 'focus:ring-2 focus:ring-[#9333ea] focus:border-transparent');

  if (content !== original) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Fixed A11y in ${filepath}`);
  }
});
