const fs = require('fs');

let c = fs.readFileSync('src/api/adminApi.ts', 'utf8');
c = c.replace('apiClient.put(/api/admin/payouts//approve', 'apiClient.put(/api/admin/payouts/\/approve');
fs.writeFileSync('src/api/adminApi.ts', c, 'utf8');

let d = fs.readFileSync('src/components/admin/AdminDashboard.jsx', 'utf8');
d = d.replace('confirm(\\Are you sure you want to distribute 10% of $\\ to all ORANGE members?\\)', 'confirm(Are you sure you want to distribute 10% of {totalEarnings} to all ORANGE members?)');
fs.writeFileSync('src/components/admin/AdminDashboard.jsx', d, 'utf8');
