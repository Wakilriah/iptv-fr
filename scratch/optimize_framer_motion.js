const fs = require('fs');
const path = require('path');

const projectRoot = "C:\\Users\\hp\\Desktop\\projects\\iptv-fr";

// 1. Update MotionProvider.tsx
const motionProviderPath = path.join(projectRoot, 'src/components/MotionProvider.tsx');
if (fs.existsSync(motionProviderPath)) {
  const newMotionProviderCode = `"use client"

import { MotionConfig, LazyMotion, domAnimation } from "framer-motion"

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  )
}
`;
  fs.writeFileSync(motionProviderPath, newMotionProviderCode);
  console.log("Successfully updated MotionProvider.tsx to wrap app in LazyMotion provider.");
} else {
  console.error("MotionProvider.tsx not found!");
}

// 2. Files to convert motion -> m
const filesToConvert = [
  'src/app/admin/dashboard/page.tsx',
  'src/app/admin/login/page.tsx',
  'src/app/chaines/page.tsx',
  'src/app/page.tsx',
  'src/components/AnimatedHero.tsx',
  'src/components/NeonChannelShowcase.tsx',
  'src/components/OrderModal.tsx',
  'src/components/TrendingVOD.tsx',
  'src/components/ui/accordion.tsx'
];

filesToConvert.forEach(relativePath => {
  const filePath = path.join(projectRoot, relativePath);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace imports
    // case 1: import { motion, AnimatePresence } from "framer-motion"
    content = content.replace(/import\s*\{\s*motion\s*,\s*AnimatePresence\s*\}\s*from\s*"framer-motion"/g, 'import { m, AnimatePresence } from "framer-motion"');
    // case 2: import { motion } from "framer-motion"
    content = content.replace(/import\s*\{\s*motion\s*\}\s*from\s*"framer-motion"/g, 'import { m } from "framer-motion"');
    
    // Replace tags
    // <motion.div -> <m.div
    content = content.replace(/<motion\./g, '<m.');
    // </motion.div> -> </m.div>
    content = content.replace(/<\/motion\./g, '</m.');
    
    fs.writeFileSync(filePath, content);
    console.log(`Successfully converted ${relativePath} to use optimized 'm' component.`);
  } else {
    console.error(`File not found: ${relativePath}`);
  }
});
