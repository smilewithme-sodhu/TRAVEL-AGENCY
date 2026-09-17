import express from 'express';
import { getPackages, createPackage, updatePackage, deletePackage } from '../controllers/admin.controller';
import { getPendingPayouts, approvePayout, rejectPayout } from '../controllers/admin.controller';

export const adminRouter = express.Router();

adminRouter.get('/payouts/pending', getPendingPayouts);
adminRouter.put('/payouts/:id/approve', approvePayout);
adminRouter.put('/payouts/:id/reject', rejectPayout);

// Inventory/Package Management
adminRouter.post('/packages', createPackage);
adminRouter.put('/packages/:id', updatePackage);
adminRouter.delete('/packages/:id', deletePackage);

adminRouter.get('/packages', getPackages);

import { getBookings, confirmBookingWithPoints, assignManualPoints, searchMembers } from '../controllers/admin.bookings';
adminRouter.get('/bookings', getBookings);
adminRouter.post('/members/assign-points', assignManualPoints);
adminRouter.post('/bookings/:id/confirm-with-points', confirmBookingWithPoints);

// Member search
adminRouter.get('/members/search', searchMembers);
