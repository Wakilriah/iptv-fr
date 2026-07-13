const fs = require('fs');

const file = 'src/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace the WHATSAPP_NUMBER constant in page.tsx
content = content.replace(
  /const WHATSAPP_NUMBER = "447848166907"/,
  'const WHATSAPP_NUMBER = "213781858983"'
);

fs.writeFileSync(file, content);
console.log('Successfully updated WHATSAPP_NUMBER in page.tsx');
