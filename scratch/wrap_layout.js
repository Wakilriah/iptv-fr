const fs = require('fs');

const file = 'src/app/layout.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add import
content = content.replace(
  `import { MotionProvider } from "@/components/MotionProvider";`,
  `import { MotionProvider } from "@/components/MotionProvider";\nimport { OrderModalProvider } from "@/context/OrderModalContext";`
);

// 2. Wrap children
content = content.replace(
  `<MotionProvider>\n          {children}\n        </MotionProvider>`,
  `<MotionProvider>\n          <OrderModalProvider>\n            {children}\n          </OrderModalProvider>\n        </MotionProvider>`
);

fs.writeFileSync(file, content);
console.log("Successfully wrapped RootLayout with OrderModalProvider in layout.tsx");
