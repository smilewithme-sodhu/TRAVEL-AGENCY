const fs = require('fs');
let c = fs.readFileSync('server/src/controllers/admin.controller.ts', 'utf8');

c = c.replace(
  "balance: Number(m.wallet?.balance || 0),",
  "balance: 0,"
);
c = c.replace(
  "const pendingWithdrawals = await prisma.withdrawal.aggregate({ _sum: { amount: true }, where: { status: 'PENDING' } });",
  "const pendingWithdrawals = await prisma.withdrawal.aggregate({ _sum: { requestedAmount: true }, where: { status: 'REQUESTED' } });"
);
c = c.replace(
  "pendingPayouts: Number(pendingWithdrawals._sum.amount || 0)",
  "pendingPayouts: Number(pendingWithdrawals._sum.requestedAmount || 0)"
);

fs.writeFileSync('server/src/controllers/admin.controller.ts', c, 'utf8');
