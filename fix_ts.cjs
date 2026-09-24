const fs = require('fs');
let code = fs.readFileSync('server/src/controllers/admin.controller.ts', 'utf8');
code = code.replace(/details: error\.message/g, 'details: (error as Error).message');
fs.writeFileSync('server/src/controllers/admin.controller.ts', code, 'utf8');
