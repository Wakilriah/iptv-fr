const sharp = require('sharp');
const fs = require('fs');

async function convert() {
  await sharp('public/hero-psg.jpg')
    .webp({ quality: 80 })
    .toFile('public/hero-psg.webp');
  console.log('Converted hero-psg.jpg to webp');

  await sharp('public/logo.png')
    .resize(128, 128, { fit: 'inside' })
    .webp({ quality: 90 })
    .toFile('public/logo.webp');
  console.log('Converted and resized logo.png to webp');
}

convert().catch(console.error);
