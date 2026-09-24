const fs = require('fs');
let code = fs.readFileSync('src/api/adminApi.ts', 'utf8');

code = code.replace(
  /activateMember:\s*async\s*\([^)]*\)\s*=>\s*apiClient\.post\([^)]*\)\.then\([^)]*\),/,
  `activateMember: async (memberId: string) => apiClient.post('/api/admin/members/activate', { memberId }).then(res => res.data),
  activateMemberToOrange: async (memberId: string) => apiClient.post('/api/admin/members/activate-orange', { memberId }).then(res => res.data),`
);

fs.writeFileSync('src/api/adminApi.ts', code, 'utf8');
