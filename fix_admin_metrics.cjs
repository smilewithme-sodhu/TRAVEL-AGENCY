const fs = require('fs');
let code = fs.readFileSync('server/src/controllers/admin.controller.ts', 'utf8');

const regex = /const pendingWithdrawals = await prisma\.withdrawal\.aggregate\(\{ _sum: \{ requestedAmount: true \}, where: \{ status: 'REQUESTED' \} \}\);\s*res\.json\(\{ success: true, data: \{ totalPackages, activeMembers, pendingPayouts: Number\(pendingWithdrawals\._sum\.requestedAmount \|\| 0\) \} \}\);/;

const newCalc = `const pendingWithdrawals = await prisma.withdrawal.aggregate({ _sum: { requestedAmount: true }, where: { status: 'REQUESTED' } });
      const globalBonusTransactions = await prisma.walletTransaction.aggregate({ _sum: { amount: true }, where: { transactionType: 'CREDIT_MANUAL_ADJUSTMENT' } });
      res.json({ success: true, data: { totalPackages, activeMembers, pendingPayouts: Number(pendingWithdrawals._sum.requestedAmount || 0), totalGlobalBonus: Number(globalBonusTransactions._sum.amount || 0) } });`;

code = code.replace(regex, newCalc);
fs.writeFileSync('server/src/controllers/admin.controller.ts', code, 'utf8');
