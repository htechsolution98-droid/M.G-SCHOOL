const fs = require('fs');

const content = fs.readFileSync('app/admin/dashboard/page.tsx', 'utf8');
const lines = content.split('\n');

lines.forEach((line, idx) => {
  if (line.includes('handleDownloadPDF') || line.includes('Download List PDF')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});
