const fs = require('fs');
const path = require('path');

const projectRoot = "C:\\Users\\hp\\Desktop\\projects\\iptv-fr";
const filesToUpdate = [
  'src/app/page.tsx',
  'src/components/AnimatedHero.tsx',
  'src/components/NeonChannelShowcase.tsx'
];

filesToUpdate.forEach(relativePath => {
  const filePath = path.join(projectRoot, relativePath);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace all instances of .jpg with .webp for logo_ and hero-
    const updatedContent = content
      .replace(/logo_sports\.jpg/g, 'logo_sports.webp')
      .replace(/logo_cinema\.jpg/g, 'logo_cinema.webp')
      .replace(/logo_series\.jpg/g, 'logo_series.webp')
      .replace(/logo_generaliste\.jpg/g, 'logo_generaliste.webp')
      .replace(/logo_info\.jpg/g, 'logo_info.webp')
      .replace(/logo_docs\.jpg/g, 'logo_docs.webp')
      .replace(/logo_jeunesse\.jpg/g, 'logo_jeunesse.webp')
      .replace(/logo_musique\.jpg/g, 'logo_musique.webp')
      .replace(/logo_sports_mobile\.jpg/g, 'logo_sports_mobile.webp')
      .replace(/logo_cinema_mobile\.jpg/g, 'logo_cinema_mobile.webp')
      .replace(/logo_series_mobile\.jpg/g, 'logo_series_mobile.webp')
      .replace(/logo_generaliste_mobile\.jpg/g, 'logo_generaliste_mobile.webp')
      .replace(/logo_info_mobile\.jpg/g, 'logo_info_mobile.webp')
      .replace(/logo_docs_mobile\.jpg/g, 'logo_docs_mobile.webp')
      .replace(/logo_jeunesse_mobile\.jpg/g, 'logo_jeunesse_mobile.webp')
      .replace(/logo_musique_mobile\.jpg/g, 'logo_musique_mobile.webp')
      .replace(/hero-mobile\.jpg/g, 'hero-mobile.webp');
      
    if (content !== updatedContent) {
      fs.writeFileSync(filePath, updatedContent);
      console.log(`Successfully updated image paths to .webp in ${relativePath}`);
    } else {
      console.log(`No changes needed in ${relativePath}`);
    }
  } else {
    console.log(`File not found: ${relativePath}`);
  }
});
