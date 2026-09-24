const fs = require('fs');
let code = fs.readFileSync('src/components/member/dashboard/EarningsOverview.jsx', 'utf8');
code = code.replace("Direct: {formatINR(earnings.direct)}<br />\n          Team: {formatINR(earnings.team)}", "Direct: {formatINR(earnings.direct)}<br />\n          Team: {formatINR(earnings.team)}<br />\n          Global: {formatINR(earnings.global || 0)}");
fs.writeFileSync('src/components/member/dashboard/EarningsOverview.jsx', code, 'utf8');

let dashboard = fs.readFileSync('src/components/member/MemberDashboard.jsx', 'utf8');
dashboard = dashboard.replace("pending: data?.overview?.pendingRewards || 0", "pending: data?.overview?.pendingRewards || 0,\n      global: data?.overview?.globalBonus || 0");
fs.writeFileSync('src/components/member/MemberDashboard.jsx', dashboard, 'utf8');
