const fs = require('fs');
const content = fs.readFileSync('d:\\Htech\\M.G-SCHOOL\\app\\admin\\dashboard\\page.tsx', 'utf8');
const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.toLowerCase().includes('pdf') || line.toLowerCase().includes('download')) {
    console.log(`${idx + 1}: ${line.trim()}`);
  }
});
