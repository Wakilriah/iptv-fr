const fs = require('fs');
const path = require('path');

const project2Dir = "C:\\Users\\hp\\Desktop\\project2";

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  console.log("Waiting 3 seconds for file locks on .next folder to release...");
  await delay(3000);

  const foldersToDelete = [
    '.next',
    'scratch'
  ];

  for (const folder of foldersToDelete) {
    const folderPath = path.join(project2Dir, folder);
    if (fs.existsSync(folderPath)) {
      try {
        fs.rmSync(folderPath, { recursive: true, force: true });
        console.log(`Successfully deleted folder recursively: ${folder}`);
      } catch (err) {
        console.warn(`Initial deletion failed for ${folder}, retrying with delay...`);
        await delay(2000);
        try {
          fs.rmSync(folderPath, { recursive: true, force: true });
          console.log(`Successfully deleted folder recursively on retry: ${folder}`);
        } catch (retryErr) {
          console.error(`Could not delete ${folder}:`, retryErr.message);
        }
      }
    }
  }

  console.log("Robust cleanup task finished.");
}

run();
