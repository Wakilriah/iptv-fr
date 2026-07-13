const fs = require('fs');

const file = 'src/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// The class for the text gradient overlay:
// original: absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300
// new: absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end justify-center pb-2 md:pb-3 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300

content = content.replace(
  /absolute inset-0 bg-gradient-to-t from-black\/80 to-transparent flex items-end justify-center pb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300/g,
  'absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end justify-center pb-2 md:pb-3 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300'
);

// I will also adjust the grid padding to be more balanced. 
// Previously: <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 px-4 sm:px-10 md:px-0 max-w-sm sm:max-w-md md:max-w-none mx-auto">
// Let's use: <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-4 px-2 sm:px-4 md:px-0 mx-auto">
content = content.replace(
  /<div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 px-4 sm:px-10 md:px-0 max-w-sm sm:max-w-md md:max-w-none mx-auto">/,
  '<div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-2 sm:px-8 md:px-0 mx-auto max-w-[320px] sm:max-w-md md:max-w-none">'
);

fs.writeFileSync(file, content);
console.log('Successfully optimized mobile channel cards for readability without hover');
