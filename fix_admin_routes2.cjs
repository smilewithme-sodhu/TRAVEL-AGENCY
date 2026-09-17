const fs = require('fs');
let code = fs.readFileSync('server/src/routes/admin.routes.ts', 'utf8');
code = code.replace(
  "import { createPackage, updatePackage, deletePackage } from '../controllers/admin.controller';", 
  "import { getPackages, createPackage, updatePackage, deletePackage } from '../controllers/admin.controller';"
);
code += "\nadminRouter.get('/packages', getPackages);\n";
fs.writeFileSync('server/src/routes/admin.routes.ts', code);
