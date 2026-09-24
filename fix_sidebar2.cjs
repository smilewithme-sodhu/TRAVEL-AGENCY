const fs = require('fs');
let l = fs.readFileSync('src/components/admin/AdminLayout.jsx', 'utf8');
l = l.replace(/\s*\{\s*view:\s*'admin-packages',\s*label:\s*'Manage Packages'.*?\},/, "");
fs.writeFileSync('src/components/admin/AdminLayout.jsx', l, 'utf8');
