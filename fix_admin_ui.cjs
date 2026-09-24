const fs = require('fs');
let code = fs.readFileSync('src/components/admin/AdminDashboard.jsx', 'utf8');

const regex = /<div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">\s*<h3 className="font-semibold text-slate-700 mb-2">Pending Payouts<\/h3>\s*<p className="text-3xl font-bold text-red-500">?\{isLoading \? '\.\.\.' : metrics\.pendingPayouts\.toLocaleString\(\)\}<\/p>\s*<\/div>/;

const newHTML = `<div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-semibold text-slate-700 mb-2">Pending Payouts</h3>
            <p className="text-3xl font-bold text-red-500">?{isLoading ? '...' : metrics.pendingPayouts.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-semibold text-slate-700 mb-2">Total Global Bonus</h3>
            <p className="text-3xl font-bold text-emerald-500">?{isLoading ? '...' : (metrics.totalGlobalBonus || 0).toLocaleString()}</p>
          </div>`;

code = code.replace(regex, newHTML);
// Also change the grid from grid-cols-1 md:grid-cols-3 to grid-cols-1 md:grid-cols-4
code = code.replace("grid-cols-1 md:grid-cols-3 gap-6", "grid-cols-1 md:grid-cols-4 gap-6");

fs.writeFileSync('src/components/admin/AdminDashboard.jsx', code, 'utf8');
