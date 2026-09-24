const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace literal Rupee symbol with TP
  content = content.replace(/?/g, 'TP ');
  // Replace unicode Rupee symbol with TP
  content = content.replace(/\\u20B9/g, 'TP ');
  
  // Also rename formatINR to formatTP inside the content if it's there
  // Actually, formatINR is fine to keep as the function name to avoid breaking imports everywhere,
  // but let's make sure it returns TP.
  
  // Specific fix for formatters.ts
  if (filePath.endsWith('formatters.ts')) {
    content = content.replace(/return ',10';/g, "return '0 TP';");
    content = content.replace(/return `\$\{isNegative \? '-' : ''\},1\$\{formatted\}`;/g, "return `${isNegative ? '-' : ''}${formatted} TP`;");
    // Also fix the other corrupted strings
    content = content.replace(/\?"/g, '--');
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated ' + filePath);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      replaceInFile(fullPath);
    }
  }
}

walkDir('src');

