const fs = require('fs');
const path = require('path');

const srcDir = "C:\\Users\\hp\\Desktop\\projects\\project2";
const destDir = "C:\\Users\\hp\\Desktop\\project2";

try {
  console.log(`Moving directory from ${srcDir} to ${destDir}...`);
  
  if (fs.existsSync(destDir)) {
    // If destination exists, remove it first or warning
    console.warn(`Destination directory ${destDir} already exists. Removing it first...`);
    fs.rmSync(destDir, { recursive: true, force: true });
  }
  
  fs.renameSync(srcDir, destDir);
  console.log(`Successfully moved project2 to Desktop: ${destDir}`);
} catch (err) {
  console.error("Failed to move directory:", err);
}
