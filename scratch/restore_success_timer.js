const fs = require('fs');

const file = 'src/components/OrderModal.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  /window\.open\(\`https:\/\/wa\.me\/\$\{WHATSAPP_NUMBER\}\?text=\$\{message\}\`,\s*"_blank"\)\s*onClose\(\)\s*setSubmitted\(false\)\s*setForm\(\{ fullname: "", email: "", phone: "" \}\)/,
  `setTimeout(() => {
      window.open(\`https://wa.me/\${WHATSAPP_NUMBER}?text=\${message}\`, "_blank")
      onClose()
      setSubmitted(false)
      setForm({ fullname: "", email: "", phone: "" })
    }, 2000)`
);

fs.writeFileSync(file, content);
console.log('Successfully restored success confirmation screen delay of 2 seconds');
