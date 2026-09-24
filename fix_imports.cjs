const fs = require('fs');
let code = fs.readFileSync('src/components/admin/AdminMembersPage.jsx', 'utf8');

if (!code.includes('import { showToast }')) {
  code = code.replace(
    /import React, \{ useState \} from 'react';/,
    `import React, { useState } from 'react';\nimport { showToast } from '../../components/ui/Toast';`
  );
  fs.writeFileSync('src/components/admin/AdminMembersPage.jsx', code, 'utf8');
}
