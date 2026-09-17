const fs = require('fs');
let code = fs.readFileSync('server/src/routes/admin.routes.ts', 'utf8');
code = code.replace("import { createPackage, updatePackage, deletePackage } from '../controllers/admin.controller';", "");
code = "import { createPackage, updatePackage, deletePackage } from '../controllers/admin.controller';\n" + code;
fs.writeFileSync('server/src/routes/admin.routes.ts', code);
