const fs = require('fs');

const file = 'src/components/OrderModal.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace window.open with window.location.href
content = content.replace(
  /window\.open\(\`https:\/\/wa\.me\/\$\{WHATSAPP_NUMBER\}\?text=\$\{message\}\`,\s*"_blank"\)/,
  'window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`'
);

fs.writeFileSync(file, content);
console.log('Successfully replaced window.open with window.location.href to bypass popup blocker');
