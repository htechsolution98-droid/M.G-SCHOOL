const fs = require('fs');
const path = require('path');

const dirs = ['app', 'components'];

const mapping = {
  'lg:text-8xl': 'lg:text-6xl',
  'md:text-8xl': 'md:text-6xl',
  'text-8xl': 'text-5xl',
  
  'lg:text-7xl': 'lg:text-5xl',
  'md:text-7xl': 'md:text-5xl',
  'text-7xl': 'text-4xl',
  
  'lg:text-6xl': 'lg:text-5xl',
  'md:text-6xl': 'md:text-5xl',
  'text-6xl': 'text-4xl',
  
  'lg:text-5xl': 'lg:text-4xl',
  'md:text-5xl': 'md:text-4xl',
  'text-5xl': 'text-3xl',
};

// Use a single regex with word boundary to avoid partial matches
// Negative lookbehind (?<!-) avoids matching inside words like my-text-8xl
const regex = new RegExp(`(?<!-)(${Object.keys(mapping).join('|')})\\b`, 'g');

function processDir(dirPath) {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      content = content.replace(regex, (match) => {
        return mapping[match];
      });
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

for (const dir of dirs) {
  const fullDirPath = path.join(__dirname, dir);
  if (fs.existsSync(fullDirPath)) {
    processDir(fullDirPath);
  }
}
