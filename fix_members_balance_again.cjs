const fs = require("fs");
let code = fs.readFileSync("server/src/controllers/admin.controller.ts", "utf8");

const target = `export const getAdminMembers = async (req: Request, res: Response): Promise<void> => {
  try {
    const members = await prisma.member.findMany({
      include: { user: true, wallet: true, _count: { select: { referralsGiven: true } } }
    });
    const mapped = members.map(m => ({
      id: m.id,
      name: m.user?.name || 'Unknown',
      code: m.memberId || m.referralCode,
      status: m.greenStatus,
      directSales: m._count?.referralsGiven || 0,
      balance: 0,
      joined: m.joinedAt.toISOString().split('T')[0]
    }));
    res.json({ success: true, data: mapped });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch members' });
  }
};`;

const replacement = `export const getAdminMembers = async (req: Request, res: Response): Promise<void> => {
  try {
    const members = await prisma.member.findMany({
      include: { user: true, wallet: { include: { transactions: true } }, _count: { select: { referralsGiven: true } } }
    });
    const mapped = members.map(m => {
      let balance = 0;
      if (m.wallet && m.wallet.transactions) {
        balance = m.wallet.transactions.reduce((sum, tx) => {
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
        balance: balance,
        joined: m.joinedAt.toISOString().split('T')[0]
      };
    });
    res.json({ success: true, data: mapped });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch members' });
  }
};`;

// replace ignores whitespace diffs by using a robust replace logic
const codeLines = code.split('\n');
const startIdx = codeLines.findIndex(l => l.includes('export const getAdminMembers'));
const endIdx = codeLines.findIndex((l, i) => i > startIdx && l.includes('Failed to fetch members'));

if (startIdx !== -1 && endIdx !== -1) {
    codeLines.splice(startIdx, endIdx - startIdx + 3, replacement);
    fs.writeFileSync("server/src/controllers/admin.controller.ts", codeLines.join('\n'), "utf8");
    console.log("REPLACED SUCCESSFULLY!");
} else {
    console.log("COULD NOT FIND INDEX");
}
