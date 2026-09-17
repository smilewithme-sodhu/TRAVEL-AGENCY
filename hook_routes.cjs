const fs = require('fs');
let content = fs.readFileSync('server/src/routes/admin.routes.ts', 'utf8');

const importStr = import { getBookings, confirmBookingWithPoints } from '../controllers/admin.bookings';\n;
if (!content.includes('admin.bookings')) {
  content = importStr + content;
}

const routesStr = \n// Bookings\nadminRouter.get('/bookings', getBookings);\nadminRouter.post('/bookings/:id/confirm-with-points', confirmBookingWithPoints);\n;
if (!content.includes('/bookings/:id/confirm-with-points')) {
  content = content + routesStr;
}

fs.writeFileSync('server/src/routes/admin.routes.ts', content, 'utf8');
