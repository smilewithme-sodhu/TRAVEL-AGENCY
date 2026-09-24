const fs = require('fs');
let l = fs.readFileSync('src/components/admin/AdminLayout.jsx', 'utf8');
l = l.replace("{ view: 'admin-packages', label: 'Manage Packages', icon: <Package className=\"w-4 h-4\" /> },\n", "");
fs.writeFileSync('src/components/admin/AdminLayout.jsx', l, 'utf8');
