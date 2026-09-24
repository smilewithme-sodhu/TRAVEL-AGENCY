const fs = require('fs');
let code = fs.readFileSync('server/src/controllers/admin.controller.ts', 'utf8');

code = code.replace(/res\.status\(500\)\.json\(\{ error: 'Failed' \}\);/, 'console.error("ADMIN METRICS ERROR:", error); res.status(500).json({ error: "Failed", details: error.message });');

fs.writeFileSync('server/src/controllers/admin.controller.ts', code, 'utf8');
