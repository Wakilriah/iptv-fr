const fs = require('fs');
const path = require('path');

const designBriefSrc = "C:\\Users\\hp\\.gemini\\antigravity-cli\\brain\\2d953664-2980-4403-a754-71d225e51904\\design_brief_midia4k.md";
const manualSrc = "C:\\Users\\hp\\.gemini\\antigravity-cli\\brain\\2d953664-2980-4403-a754-71d225e51904\\midia4k_architecture_and_design_manual.md";

const desktopDir = "C:\\Users\\hp\\Desktop";

const designBriefDest = path.join(desktopDir, 'design_brief_midia4k.md');
const manualDest = path.join(desktopDir, 'midia4k_architecture_and_design_manual.md');

try {
  if (fs.existsSync(designBriefSrc)) {
    fs.copyFileSync(designBriefSrc, designBriefDest);
    console.log(`Copied Design Brief to Desktop: ${designBriefDest}`);
  }
  
  if (fs.existsSync(manualSrc)) {
    fs.copyFileSync(manualSrc, manualDest);
    console.log(`Copied Technical Manual to Desktop: ${manualDest}`);
  }
} catch (err) {
  console.error("Failed to copy files to Desktop:", err);
}
