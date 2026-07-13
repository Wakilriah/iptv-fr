const fs = require('fs');

const file = 'src/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Normalize line endings
content = content.replace(/\r\n/g, '\n');

// 1. Purple glow (abonnements section)
content = content.replace(
  '<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#a855f7]/8 blur-[120px] rounded-full pointer-events-none" />',
  '<div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#a855f7]/8 blur-[120px] rounded-full pointer-events-none" />'
);

// 2. Red glow (abonnements-premium section)
content = content.replace(
  '<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#ef4444]/6 blur-[120px] rounded-full pointer-events-none" />',
  '<div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#ef4444]/6 blur-[120px] rounded-full pointer-events-none" />'
);

// 3. Amber glow (abonnement-vip section)
content = content.replace(
  '<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f59e0b]/5 blur-[120px] rounded-full pointer-events-none" />',
  '<div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f59e0b]/5 blur-[120px] rounded-full pointer-events-none" />'
);

// 4. Smaller glows
content = content.replace(
  '<div className="absolute top-0 right-0 w-72 h-72 bg-[#a855f7]/5 blur-[80px] rounded-full pointer-events-none" />',
  '<div className="hidden md:block absolute top-0 right-0 w-72 h-72 bg-[#a855f7]/5 blur-[80px] rounded-full pointer-events-none" />'
);

content = content.replace(
  '<div className="absolute top-0 right-0 w-48 h-48 bg-[#e11d48]/5 blur-3xl rounded-full pointer-events-none" />',
  '<div className="hidden md:block absolute top-0 right-0 w-48 h-48 bg-[#e11d48]/5 blur-3xl rounded-full pointer-events-none" />'
);

// Save back with system CRLF
fs.writeFileSync(file, content.replace(/\n/g, '\r\n'));
console.log("Successfully hidden heavy background blurs on mobile devices in page.tsx!");
