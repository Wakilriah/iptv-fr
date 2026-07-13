const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function convertChannels() {
  const dir = 'public/channels';
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg'));
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const newFilePath = path.join(dir, file.replace('.jpg', '.webp'));
    
    await sharp(filePath)
      .webp({ quality: 80 })
      .toFile(newFilePath);
      
    console.log(`Converted ${file} to webp`);
  }
}

convertChannels().catch(console.error);
