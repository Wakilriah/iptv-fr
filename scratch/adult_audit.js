const fs = require('fs');
const path = require('path');

const projectRoot = "C:\\Users\\hp\\Desktop\\projects\\iptv-fr";
const searchDirs = ['src', 'public'];
const extensions = ['.tsx', '.ts', '.js', '.json', '.md', '.css'];

const regex = /\b(adult|18\+|xxx|erotic|porn|sex|sexy|hot|nude|nsfw|mature|onlyfans|escort|dating|romance|love|girls|women|private|exclusive|sensual|couple|adulte|érotique|erotique|pornographie|sexe|charme|18 ans|interdit aux mineurs|rencontre|sensuel)\b/i;
const filmRegex = /\b(Films|Movies|Séries|Catalogue|Premium Content|Unlimited Content)\b/gi;

function searchFiles(dir) {
  const results = [];
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        results.push(...searchFiles(filePath));
      }
    } else {
      const ext = path.extname(file);
      if (extensions.includes(ext)) {
        results.push(filePath);
      }
    }
  }
  return results;
}

const allFiles = [];
searchDirs.forEach(dir => {
  const fullPath = path.join(projectRoot, dir);
  if (fs.existsSync(fullPath)) {
    allFiles.push(...searchFiles(fullPath));
  }
});
allFiles.push(path.join(projectRoot, 'package.json'));

let logContent = "--- ADULT MATCHES ---\n";
let totalIssues = 0;

allFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    lines.forEach((line, index) => {
      if (file.endsWith('package.json') && line.includes('"private": true')) return;
      if (regex.test(line)) {
        logContent += `[ADULT MATCH] ${file}:${index + 1} -> ${line.trim()}\n`;
        totalIssues++;
      }
    });
  } catch (err) {}
});

logContent += "\n--- FILM/CATALOG MATCHES ---\n";
allFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    lines.forEach((line, index) => {
      const filmMatches = [...line.matchAll(filmRegex)];
      if (filmMatches.length > 0) {
        logContent += `[FILM MATCH] ${file}:${index + 1} -> ${line.trim()}\n`;
      }
    });
  } catch (err) {}
});

logContent += `\nTotal explicit adult keyword issues found: ${totalIssues}\n`;
fs.writeFileSync(path.join(projectRoot, 'scratch/adult_audit.log'), logContent);
console.log("Log saved to scratch/adult_audit.log");
