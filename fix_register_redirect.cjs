const fs = require('fs');
const file = 'src/components/auth/RegisterPage.jsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('import { useNavigate } from')) {
    content = content.replace(
        "import { Compass, ArrowRight, ArrowLeft, Mail, Lock, Phone, User, CheckCircle2, Tag } from 'lucide-react';",
        "import { Compass, ArrowRight, ArrowLeft, Mail, Lock, Phone, User, CheckCircle2, Tag } from 'lucide-react';\nimport { useNavigate } from 'react-router-dom';"
    );
}

if (!content.includes('const navigate = useNavigate();')) {
    content = content.replace(
        'const [isLocked, setIsLocked] = useState(false);',
        'const [isLocked, setIsLocked] = useState(false);\n  const navigate = useNavigate();'
    );
}

content = content.replace(
    'navigateTo("member-dashboard");',
    "navigate('/member');"
);

fs.writeFileSync(file, content, 'utf8');
