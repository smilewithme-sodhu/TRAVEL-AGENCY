const fs = require('fs');
let routes = fs.readFileSync('server/src/routes/admin.routes.ts', 'utf8');
routes = routes.replace("activateMemberToGreen, getAdminMembers", "activateMemberToGreen, activateMemberToOrange, getAdminMembers");
fs.writeFileSync('server/src/routes/admin.routes.ts', routes, 'utf8');
