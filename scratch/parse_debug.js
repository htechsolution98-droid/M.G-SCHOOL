const fs = require('fs');

const data = JSON.parse(fs.readFileSync('scratch/debug.json', 'utf8'));
console.log("Block Name:", data.blockName);
console.log("Faculty Array Length:", data.faculty?.length);

const faculty = data.faculty || [];
faculty.forEach((member, index) => {
  console.log(`[${index}] Name: "${member.name}", Role: "${member.role}", Image length: ${member.image ? member.image.length : 0}`);
});
