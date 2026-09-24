const fs = require("fs");
let code = fs.readFileSync("src/components/admin/AdminLayout.jsx", "utf8");
code = code.replace(
  "{ view: 'admin-dashboard', label: 'Overview', icon: <ShieldCheck className=\"w-4 h-4\" /> },",
  "{ view: 'admin-dashboard', label: 'Overview', icon: <ShieldCheck className=\"w-4 h-4\" /> },\n    { view: 'admin-packages', label: 'Manage Packages', icon: <Package className=\"w-4 h-4\" /> },"
);
fs.writeFileSync("src/components/admin/AdminLayout.jsx", code, "utf8");
