const fs = require('fs');

const file = 'src/components/TrendingVOD.tsx';
let content = fs.readFileSync(file, 'utf8');

// Normalize line endings
content = content.replace(/\r\n/g, '\n');

// Replace VOD label in tabs
content = content.replace(
  'Films Tendances <span className="hidden sm:inline">VOD</span>',
  'Films Tendances'
);
content = content.replace(
  'Séries Tendances <span className="hidden sm:inline">VOD</span>',
  'Séries Tendances'
);

// Replace fallback genre
content = content.replace(
  "item.genre || 'VOD'",
  "item.genre || 'Premium'"
);

// Save back with system CRLF
fs.writeFileSync(file, content.replace(/\n/g, '\r\n'));
console.log("Successfully cleaned user-facing VOD text inside TrendingVOD.tsx!");
