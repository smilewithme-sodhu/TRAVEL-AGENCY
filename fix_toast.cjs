const fs = require('fs');

let c = fs.readFileSync('src/components/admin/AdminDashboard.jsx', 'utf8');
c = c.replace("import { toast } from 'react-hot-toast';", "");
c = c.replace(/toast\.success/g, "alert");
c = c.replace(/toast\.error/g, "alert");
fs.writeFileSync('src/components/admin/AdminDashboard.jsx', c, 'utf8');

let m = fs.readFileSync('src/components/admin/AdminMembersPage.jsx', 'utf8');
m = m.replace("import { toast } from 'react-hot-toast';", "");
m = m.replace(/toast\.success/g, "alert");
m = m.replace(/toast\.error/g, "alert");
fs.writeFileSync('src/components/admin/AdminMembersPage.jsx', m, 'utf8');
