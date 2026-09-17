const fs = require('fs');
let content = fs.readFileSync('server/src/routes/admin.routes.ts', 'utf8');

// Remove the import
content = content.replace(import { getBookings, confirmBookingWithPoints } from '../controllers/admin.bookings';\n, '');

// Remove the routes
content = content.replace(\n// Bookings\nadminRouter.get('/bookings', getBookings);\nadminRouter.post('/bookings/:id/confirm-with-points', confirmBookingWithPoints);\n, '');

fs.writeFileSync('server/src/routes/admin.routes.ts', content, 'utf8');
