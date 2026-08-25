import fs from 'fs';
import path from 'path';

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const source = 'C:\\Users\\user\\Documents\\我的博客\\品牌测速与其它';
const destination = 'C:\\Users\\user\\Documents\\我的博客\\Claude Blog\\src\\assets\\speedtests';

try {
  copyDir(source, destination);
  console.log('Successfully copied speed test images!');
} catch (e) {
  console.error('Error copying:', e);
}
