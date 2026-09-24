const fs = require('fs');
let code = fs.readFileSync('src/components/admin/AdminMembersPage.jsx', 'utf8');

// Fix text corruption
code = code.replace(/dYY/g, "\u2022");
code = code.replace(/\?\{m\.balance/g, "\u20B9{m.balance");

// Add activate to Orange mutation
const activateOrangeHook = `
  const activateOrangeMutation = useMutation({
    mutationFn: (id) => adminApi.activateMemberToOrange(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-members'] });
      showToast('success', 'Member upgraded to ORANGE (Travel Agent)');
    },
    onError: (err) => {
      showToast('error', err.message || 'Failed to upgrade member');
    }
  });`;

// Find the existing useMutation and add the new one right after it
code = code.replace(/const activateMutation = useMutation\(\{[\s\S]*?\}\);/, match => match + "\n" + activateOrangeHook);

// Add the button for GREEN members
const greenButton = `
                      {m.status === 'GREEN' && (
                        <button
                          onClick={() => activateOrangeMutation.mutate(m.id)}
                          disabled={activateOrangeMutation.isLoading}
                          className="px-3 py-1.5 bg-orange-500 hover:bg-orange-400 text-white text-[10px] font-bold rounded-lg transition-colors flex items-center gap-1"
                        >
                          {activateOrangeMutation.isLoading ? 'Processing...' : 'Make Travel Agent (ORANGE)'}
                        </button>
                      )}
                      {m.status === 'INACTIVE' &&`;

code = code.replace(/\{m\.status === 'INACTIVE' &&/, greenButton);

fs.writeFileSync('src/components/admin/AdminMembersPage.jsx', code, 'utf8');

let dashboard = fs.readFileSync('src/components/admin/AdminDashboard.jsx', 'utf8');
dashboard = dashboard.replace(/<p className="text-3xl font-bold text-red-500">\?\{isLoading \? '\.\.\.' : metrics\.pendingPayouts\.toLocaleString\(\)\}<\/p>/, `<p className="text-3xl font-bold text-red-500">\u20B9{isLoading ? '...' : metrics.pendingPayouts.toLocaleString()}</p>`);
dashboard = dashboard.replace(/<span className="absolute left-4 top-1\/2 -translate-y-1\/2 font-bold text-slate-400">\?<\/span>/, `<span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">\u20B9</span>`);
dashboard = dashboard.replace(/<p className="text-3xl font-bold text-emerald-500">\?\{/, `<p className="text-3xl font-bold text-emerald-500">\u20B9{`);
fs.writeFileSync('src/components/admin/AdminDashboard.jsx', dashboard, 'utf8');

