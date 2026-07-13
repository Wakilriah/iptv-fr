const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      walk(filepath, callback);
    } else if (filepath.endsWith('.tsx') || filepath.endsWith('.ts')) {
      callback(filepath);
    }
  }
}

walk('src', (filepath) => {
  let content = fs.readFileSync(filepath, 'utf8');
  let original = content;

  // Add aria-hidden="true" to SVGs if they don't have it
  content = content.replace(/<svg((?!aria-hidden)[^>]*)>/g, '<svg aria-hidden="true"$1>');

  if (content !== original) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Fixed SVGs in ${filepath}`);
  }
});
