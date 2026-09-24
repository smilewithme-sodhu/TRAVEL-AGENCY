const fs = require("fs");
let code = fs.readFileSync("server/src/controllers/admin.controller.ts", "utf8");

code = code.replace(
  /export const getAdminMembers = async \(req: Request, res: Response\): Promise<void> => \{([\s\S]*?)res\.json\(\{ success: true, data: mapped \}\);\n    \} catch \(error\) \{/m,
  `export const getAdminMembers = async (req: Request, res: Response): Promise<void> => {
    try {
      const members = await prisma.member.findMany({
        include: { user: true, wallet: { include: { transactions: true } }, _count: { select: { referralsGiven: true } } }
      });
      const mapped = members.map(m => {
        let walletBalance = 0;
        if (m.wallet && m.wallet.transactions) {
          walletBalance = m.wallet.transactions.reduce((sum, tx) => {
            if (tx.transactionType.startsWith('CREDIT_')) return sum + Number(tx.amount || 0);
            if (tx.transactionType.startsWith('DEBIT_')) return sum - Number(tx.amount || 0);
            return sum;
          }, 0);
        }
        return {
          id: m.id,
          name: m.user?.name || 'Unknown',
          code: m.memberId || m.referralCode,
          status: m.greenStatus,
          directSales: m._count?.referralsGiven || 0,
          balance: walletBalance,
          joined: m.joinedAt.toISOString().split('T')[0]
        };
      });
      res.json({ success: true, data: mapped });
    } catch (error) {`
);

fs.writeFileSync("server/src/controllers/admin.controller.ts", code, "utf8");
