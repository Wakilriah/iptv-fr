const fs = require('fs');
const path = require('path');

const srcDir = "C:\\Users\\hp\\Desktop\\projects\\project2";
const destDir = "C:\\Users\\hp\\Desktop\\project2";

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  console.log("Waiting 3 seconds for file locks to release...");
  await delay(3000);

  try {
    console.log(`Moving directory from ${srcDir} to ${destDir}...`);
    
    if (fs.existsSync(destDir)) {
      console.warn(`Destination directory ${destDir} already exists. Removing it first...`);
      fs.rmSync(destDir, { recursive: true, force: true });
    }
    
    fs.renameSync(srcDir, destDir);
    console.log(`Successfully moved project2 to Desktop: ${destDir}`);
  } catch (err) {
    console.error("Standard move failed. Falling back to copy-and-delete...");
    
    // Copy synchronosly
    try {
      function copyFolderSync(from, to) {
        if (!fs.existsSync(to)) {
          fs.mkdirSync(to, { recursive: true });
        }
        const items = fs.readdirSync(from);
        items.forEach(item => {
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
      
      copyFolderSync(srcDir, destDir);
      console.log("Copy complete. Removing original folder...");
      fs.rmSync(srcDir, { recursive: true, force: true });
      console.log("Original folder removed. Decoupling complete!");
    } catch (copyErr) {
      console.error("Robust copy/delete failed:", copyErr);
    }
  }
}

run();
