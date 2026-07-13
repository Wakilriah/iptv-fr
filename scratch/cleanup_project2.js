const fs = require('fs');
const path = require('path');

const project2Dir = "C:\\Users\\hp\\Desktop\\project2";

const filesToDelete = [
  'project_report.md',
  'tiktok_audit_report.md',
  'fix_a11y.js',
  'fix_buttons.js',
  'fix_colors2.js',
  'fix_svgs.js',
  'replace_jpg.js',
  'optimize.js',
  'optimize_channels.js'
];

const foldersToDelete = [
  '.next',
  'scratch'
];

// Delete individual files
filesToDelete.forEach(file => {
  const filePath = path.join(project2Dir, file);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`Deleted file: ${file}`);
  }
});

// Delete folders recursively
foldersToDelete.forEach(folder => {
  const folderPath = path.join(project2Dir, folder);
  if (fs.existsSync(folderPath)) {
    fs.rmSync(folderPath, { recursive: true, force: true });
    console.log(`Deleted folder recursively: ${folder}`);
  }
});

console.log("Cleanup complete! project2 is now fully independent and clean.");
