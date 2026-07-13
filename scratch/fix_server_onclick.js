const fs = require('fs');

const file = 'src/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Normalize line endings
content = content.replace(/\r\n/g, '\n');

// Replace the chaines link
content = content.replace(
  '<li><a href="/chaines" onClick={() => tiktokPixel.searchChannels()} className="hover:text-[#a855f7] transition-colors text-[#a855f7] font-semibold">Chaînes</a></li>',
  '<li><a href="/chaines" className="hover:text-[#a855f7] transition-colors text-[#a855f7] font-semibold">Chaînes</a></li>'
);

// Save back with system CRLF
fs.writeFileSync(file, content.replace(/\n/g, '\r\n'));
console.log("Successfully removed event handler from footer link in page.tsx!");
