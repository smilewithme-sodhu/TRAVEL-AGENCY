const fs = require('fs');
const file = 'src/components/admin/AdminLayout.jsx';
let content = fs.readFileSync(file, 'utf8');

const target = { view: 'admin-dashboard', label: 'Overview', icon: <ShieldCheck className="w-4 h-4" /> },;
const addition = \n    { view: 'admin-bookings', label: 'Manage Bookings', icon: <Compass className="w-4 h-4" /> },;

if (content.includes(target)) {
  content = content.replace(target, target + addition);
  fs.writeFileSync(file, content, 'utf8');
}
