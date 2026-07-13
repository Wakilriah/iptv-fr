const fs = require('fs');
const path = require('path');

const keywords = [
  'gratuit', 'illimité', 'unlimited', 'toutes les chaînes', 'tous les matchs', 
  'all channels', 'every match', 'garanti', 'guaranteed', 'lifetime', 'à vie'
];

const excludeDirs = ['node_modules', '.next', 'generated', 'scratch'];

function searchFiles(dir) {
  let results = [];
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (!excludeDirs.includes(file)) {
        results = results.concat(searchFiles(fullPath));
      }
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.js') || fullPath.endsWith('.css') || fullPath.endsWith('.md')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, index) => {
        keywords.forEach(keyword => {
          const regex = new RegExp(keyword, 'i');
          if (regex.test(line)) {
            results.push({
              file: fullPath,
              line: index + 1,
              keyword: keyword,
              text: line.trim().substring(0, 100)
            });
          }
        });
      });
    }
  }
  return results;
}

const findings = searchFiles('./src');
fs.writeFileSync('./scratch/audit_results_2.json', JSON.stringify(findings, null, 2));
console.log(`Found ${findings.length} occurrences.`);
