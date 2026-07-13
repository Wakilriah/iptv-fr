const fs = require('fs');

const file = 'src/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  /className="w-full h-full object-contain p-2 sm:p-4 group-hover:scale-110 transition-transform duration-500"/g,
  'className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"'
);

fs.writeFileSync(file, content);
console.log('Successfully reverted logos back to object-cover');
