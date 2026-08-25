import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'src/content/reviews');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));

let fixedCount = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  if (content.includes('testDate:')) {
    content = content.replace(/testDate:/g, 'date:');
    content = content.replace(/note:/g, 'conclusion:');
    fs.writeFileSync(filePath, content, 'utf-8');
    fixedCount++;
  }
}

console.log(`Fixed schema properties in ${fixedCount} files.`);
