const fs = require('fs');
let code = fs.readFileSync('server/src/controllers/admin.controller.ts', 'utf8');

const regex = /let activeMembers = 0;[\s\S]*?console\.warn\('Could not count ORANGE members:', e\.message\);\s*\}/m;
code = code.replace(regex, "const activeMembers = await prisma.member.count({ where: { greenStatus: { in: ['GREEN', 'ORANGE'] } } });");

fs.writeFileSync('server/src/controllers/admin.controller.ts', code, 'utf8');
