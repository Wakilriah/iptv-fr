const fs = require('fs');

const file = 'src/app/globals.css';
let content = fs.readFileSync(file, 'utf8');

const responsiveCSS = `
/* Global responsive layout fixes */
html, body {
  overflow-x: hidden;
  max-width: 100%;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
  min-width: 0;
}

img {
  display: block;
  max-width: 100%;
  height: auto;
}
`;

if (!content.includes('/* Global responsive layout fixes */')) {
  content += '\n' + responsiveCSS;
  fs.writeFileSync(file, content);
  console.log('Successfully added responsive CSS to globals.css');
} else {
  console.log('Responsive CSS already present in globals.css');
}
