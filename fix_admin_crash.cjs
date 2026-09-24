const fs = require('fs');
let code = fs.readFileSync('server/src/controllers/admin.controller.ts', 'utf8');

const newCountLogic = `
      let activeMembers = 0;
      try {
        activeMembers = await prisma.member.count({ where: { greenStatus: 'GREEN' } });
        const orangeMembers = await prisma.member.count({ where: { greenStatus: 'ORANGE' } });
        activeMembers += orangeMembers;
      } catch (e) {
        // Fallback if ORANGE is not yet migrated in Postgres enum
        console.warn('Could not count ORANGE members:', e.message);
      }
`;

code = code.replace(/const activeMembers = await prisma\.member\.count\(\{ where: \{ greenStatus: \{ in: \['GREEN', 'ORANGE'\] \} \} \}\);/, newCountLogic);

fs.writeFileSync('server/src/controllers/admin.controller.ts', code, 'utf8');
