const fs = require('fs');
const path = require('path');

const keywords = [
  'earn', 'income', 'money', 'business', 'opportunity', 'reseller', 'affiliate', 
  'commission', 'become a reseller', 'investment', 'work from home', 'make money', 
  'passive income', 'profit', 'job', 'employment', 'recruitment', 'partner',
  'gagner', 'argent', 'revenu', 'revendeur', 'affilié', 'opportunité', 'travail', 
  'emploi', 'partenaire', 'investissement',
  'netflix', 'disney', 'canal', 'bein', 'rmc', 'uefa', 'fifa', 'premier league',
  'free forever', 'unlimited', 'guaranteed', 'every match'
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
          const regex = new RegExp(`\\b${keyword}\\b`, 'i');
          if (regex.test(line)) {
            // Check if it's just a variable name like "businessLogic"
            // Wait, \b matches boundaries, so it will match "business" in "my business".
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
fs.writeFileSync('./scratch/audit_results.json', JSON.stringify(findings, null, 2));
console.log(`Found ${findings.length} occurrences.`);
