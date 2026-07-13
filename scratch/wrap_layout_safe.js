const fs = require('fs');

const file = 'src/app/layout.tsx';
let content = fs.readFileSync(file, 'utf8');

// Normalize line endings to LF
content = content.replace(/\r\n/g, '\n');

// 1. Add import
if (content.indexOf('import { OrderModalProvider }') === -1) {
  content = content.replace(
    'import { MotionProvider } from "@/components/MotionProvider";',
    'import { MotionProvider } from "@/components/MotionProvider";\nimport { OrderModalProvider } from "@/context/OrderModalContext";'
  );
}

// 2. Wrap children
content = content.replace(
  '<MotionProvider>\n          {children}\n        </MotionProvider>',
  '<MotionProvider>\n          <OrderModalProvider>\n            {children}\n          </OrderModalProvider>\n        </MotionProvider>'
);

// Save back with system CRLF
fs.writeFileSync(file, content.replace(/\n/g, '\r\n'));
console.log("Successfully wrapped layout.tsx with OrderModalProvider");
