const fs = require('fs');
const file = 'src/components/admin/AdminBookingsPage.tsx';
let content = fs.readFileSync(file, 'utf8');

// Fix b.customer.firstName to b.member?.user?.name
content = content.replace(/b\.customer\?\.firstName/g, 'b.member?.user?.name');
content = content.replace(/booking\.customer\?\.firstName/g, 'booking.member?.user?.name');
content = content.replace(/booking\.customer\?\.lastName/g, ''); // just remove it or replace with empty
content = content.replace(/\{booking\.member\?\.user\?\.name\} \{booking\.customer\?\.lastName\}/g, '{booking.member?.user?.name}');
content = content.replace(/\{booking\.customer\?\.email\}/g, '{booking.member?.user?.email}');
content = content.replace(/\{booking\.customer\?\.phone\}/g, '{booking.member?.user?.phone}');

fs.writeFileSync(file, content, 'utf8');
