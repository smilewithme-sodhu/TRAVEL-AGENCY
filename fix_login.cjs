const fs = require('fs');
const file = 'src/components/auth/RegisterPage.jsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace('navigate(/login)', 'navigate("/login")');

fs.writeFileSync(file, content, 'utf8');
