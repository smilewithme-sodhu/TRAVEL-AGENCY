const fs = require('fs');
let code = fs.readFileSync('server/src/routes/member.routes.ts', 'utf8');

const regex = /let directBonus = 0;[\s\S]*?const totalEarned = directBonus \+ teamBonus \+ binaryMatch;/;

const newCalc = `let directBonus = 0;
      let teamBonus = 0;
      let binaryMatch = 0;
      
      earnedRewards.forEach(r => {
        const amt = Number(r.finalAmount || 0);
        if (r.rewardType === 'DIRECT') directBonus += amt;
        if (r.rewardType === 'TEAM') teamBonus += amt;
        if (r.rewardType === 'BINARY') binaryMatch += amt;
      });

      const globalBonusTransactions = await prisma.walletTransaction.aggregate({
        _sum: { amount: true },
        where: {
          walletId: member.wallet?.id,
          transactionType: 'CREDIT_MANUAL_ADJUSTMENT',
          status: 'AVAILABLE'
        }
      });
      const globalBonus = Number(globalBonusTransactions._sum.amount || 0);
      const totalEarned = directBonus + teamBonus + binaryMatch + globalBonus;`;

code = code.replace(regex, newCalc);
fs.writeFileSync('server/src/routes/member.routes.ts', code, 'utf8');
