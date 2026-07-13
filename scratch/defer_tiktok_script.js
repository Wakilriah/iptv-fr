const fs = require('fs');

const file = 'src/components/TikTokPixel.tsx';
let content = fs.readFileSync(file, 'utf8');

// Normalize line endings
content = content.replace(/\r\n/g, '\n');

// Replace the strategy
content = content.replace(
  'strategy="afterInteractive"',
  'strategy="lazyOnload"'
);

fs.writeFileSync(file, content.replace(/\n/g, '\r\n'));
console.log("Successfully deferred TikTok Pixel script to lazyOnload!");
