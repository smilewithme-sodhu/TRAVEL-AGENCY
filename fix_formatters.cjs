const fs = require('fs');
let code = fs.readFileSync('src/utils/formatters.ts', 'utf8');

// The corrupted string is '?"'. In raw bytes it might be anything. 
// We'll just replace the entire if block since we know what it should look like.
const oldLine1 = "if (!dateString) return '\uFFFD?\"';";
const oldLine2 = "if (isNaN(date.getTime())) return '\uFFFD?\"';";

code = code.replace(/if \(!dateString\) return '.*';/, "if (!dateString) return '--';");
code = code.replace(/if \(isNaN\(date\.getTime\(\)\)\) return '.*';/, "if (isNaN(date.getTime())) return '--';");

fs.writeFileSync('src/utils/formatters.ts', code, 'utf8');
