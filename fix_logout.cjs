const fs = require('fs');
const file = 'src/components/member/MemberLayout.jsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(
  /const handleLogout = \(\) => \{\s*setIsLoggedIn\(false\);\s*showToast\('You have been securely signed out.', 'info'\);\s*navigateTo\('home'\);\s*\};/g,
  "const handleLogout = () => {\n    localStorage.removeItem('auth_token');\n    localStorage.removeItem('user');\n    setIsLoggedIn(false);\n    showToast('You have been securely signed out.', 'info');\n    navigateTo('home');\n  };"
);
fs.writeFileSync(file, content, 'utf8');
