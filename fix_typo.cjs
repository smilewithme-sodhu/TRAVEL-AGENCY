const fs = require('fs');

let m = fs.readFileSync('src/components/admin/AdminMembersPage.jsx', 'utf8');
m = m.replace("className=\"py-4 px-5 font-bold text-white\">,1{m.balance.toLocaleString()}", "className=\"py-4 px-5 font-bold text-white\">?{m.balance.toLocaleString()}");
fs.writeFileSync('src/components/admin/AdminMembersPage.jsx', m, 'utf8');

let d = fs.readFileSync('src/components/admin/AdminDashboard.jsx', 'utf8');
d = d.replace("text-slate-400\">,1</span>", "text-slate-400\">?</span>");
d = d.replace("text-red-500\">,1{isLoading", "text-red-500\">?{isLoading");
fs.writeFileSync('src/components/admin/AdminDashboard.jsx', d, 'utf8');

