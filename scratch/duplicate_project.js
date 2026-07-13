const fs = require('fs');
const path = require('path');

const srcDir = "C:\\Users\\hp\\Desktop\\projects\\iptv-fr";
const destDir = "C:\\Users\\hp\\Desktop\\projects\\project2";

const ignoreList = [
  'node_modules',
  '.next',
  '.git',
  'dist',
  'out',
  '.vercel'
];

function copyFolderSync(from, to) {
  if (!fs.existsSync(to)) {
    fs.mkdirSync(to, { recursive: true });
  }

  const items = fs.readdirSync(from);
  items.forEach(item => {
    // Check ignore list
    if (ignoreList.includes(item)) return;

    const fromPath = path.join(from, item);
    const toPath = path.join(to, item);
    const stat = fs.lstatSync(fromPath);

    if (stat.isDirectory()) {
      copyFolderSync(fromPath, toPath);
    } else {
      fs.copyFileSync(fromPath, toPath);
    }
  });
}

try {
  console.log(`Starting duplication from ${srcDir} to ${destDir}...`);
  copyFolderSync(srcDir, destDir);
  console.log("Successfully duplicated project structure (excluding node_modules, .next, and .git)!");
} catch (err) {
  console.error("Duplication failed:", err);
}
