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

  // Add aria-label to close buttons
  content = content.replace(/<button([^>]*)onClick=\{\(\) => setToasts(.*?)\}([^>]*)>/g, '<button$1onClick={() => setToasts$2}$3 aria-label="Fermer">');
  content = content.replace(/<button([^>]*)onClick=\{\(\) => setIsAddModalOpen\(false\)\}([^>]*)>/g, '<button$1onClick={() => setIsAddModalOpen(false)}$2 aria-label="Fermer">');
  content = content.replace(/<button([^>]*)onClick=\{\(\) => setSelectedOrder\(null\)\}([^>]*)>/g, '<button$1onClick={() => setSelectedOrder(null)}$2 aria-label="Fermer">');
  content = content.replace(/<button([^>]*)onClick=\{onClose\}([^>]*)>/g, '<button$1onClick={onClose}$2 aria-label="Fermer">');
  
  // chaines/page.tsx clear search
  content = content.replace(/<button([^>]*)onClick=\{\(\) => setSearchQuery\(''\)\}([^>]*)>/g, '<button$1onClick={() => setSearchQuery(\'\')}$2 aria-label="Effacer la recherche">');

  if (content !== original) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Fixed buttons in ${filepath}`);
  }
});
