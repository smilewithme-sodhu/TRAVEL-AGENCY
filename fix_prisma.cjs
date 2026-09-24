const fs = require('fs');
let code = fs.readFileSync('prisma/schema.prisma', 'utf8');
code = code.replace(/url\s*=\s*env\("DATABASE_URL"\)/, 'url = env("DATABASE_URL")\n  directUrl = env("DIRECT_URL")');
fs.writeFileSync('prisma/schema.prisma', code, 'utf8');
