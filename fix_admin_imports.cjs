const fs = require('fs');
let code = fs.readFileSync('server/src/controllers/admin.controller.ts', 'utf8');
code = code.replace("import { Prisma } from '@prisma/client';", "");
code = "import { Prisma } from '@prisma/client';\n" + code;
fs.writeFileSync('server/src/controllers/admin.controller.ts', code);
