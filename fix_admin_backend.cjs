const fs = require('fs');

let controller = fs.readFileSync('server/src/controllers/admin.controller.ts', 'utf8');
const orangeMethod = `export const activateMemberToGreen = async (req: Request, res: Response): Promise<void> => {
    try {
      const { memberId } = req.body;
      const member = await prisma.member.findUnique({ where: { id: memberId } });
      if (!member) { res.status(404).json({ error: 'Member not found.' }); return; }
      await prisma.member.update({ where: { id: member.id }, data: { greenStatus: 'GREEN' } });
      res.json({ success: true, message: 'Member successfully upgraded to GREEN (Direct Bonus Qualified).' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  export const activateMemberToOrange = async (req: Request, res: Response): Promise<void> => {
    try {
      const { memberId } = req.body;
      const member = await prisma.member.findUnique({ where: { id: memberId } });
      if (!member) { res.status(404).json({ error: 'Member not found.' }); return; }
      await prisma.member.update({ where: { id: member.id }, data: { greenStatus: 'ORANGE' } });
      res.json({ success: true, message: 'Member successfully upgraded to ORANGE (Travel Agent, Binary/Team Qualified).' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };`;

controller = controller.replace(/export const activateMemberToGreen = async \(req: Request, res: Response\): Promise<void> => \{[\s\S]*?res\.status\(500\)\.json\(\{ error: 'Internal server error' \}\);\n\s*\}\n\s*\};/, orangeMethod);
fs.writeFileSync('server/src/controllers/admin.controller.ts', controller, 'utf8');

let routes = fs.readFileSync('server/src/routes/admin.routes.ts', 'utf8');
routes = routes.replace("import { getAdminDashboardMetrics, getAdminMembers, activateMemberToGreen, distributeGlobalBonus } from '../controllers/admin.controller';", "import { getAdminDashboardMetrics, getAdminMembers, activateMemberToGreen, activateMemberToOrange, distributeGlobalBonus } from '../controllers/admin.controller';");
routes = routes.replace("adminRouter.post('/members/activate', activateMemberToGreen);", "adminRouter.post('/members/activate', activateMemberToGreen);\nadminRouter.post('/members/activate-orange', activateMemberToOrange);");
fs.writeFileSync('server/src/routes/admin.routes.ts', routes, 'utf8');

