import express from 'express';
import { getPackages, createPackage, updatePackage, deletePackage, getPendingPayouts, approvePayout, rejectPayout } from '../controllers/admin.controller';
import { getBookings, confirmBookingWithPoints, assignManualPoints, searchMembers } from '../controllers/admin.bookings';

export const adminRouter = express.Router();

// ---------------------------------------------------------------------------
// Payout Management
// ---------------------------------------------------------------------------
adminRouter.get('/payouts/pending', getPendingPayouts);
adminRouter.put('/payouts/:id/approve', approvePayout);
adminRouter.put('/payouts/:id/reject', rejectPayout);

// ---------------------------------------------------------------------------
// Package Management
// ---------------------------------------------------------------------------
adminRouter.get('/packages', getPackages);
adminRouter.post('/packages', createPackage);
adminRouter.put('/packages/:id', updatePackage);
adminRouter.delete('/packages/:id', deletePackage);

// ---------------------------------------------------------------------------
// Booking Management
// ---------------------------------------------------------------------------
adminRouter.get('/bookings', getBookings);
adminRouter.post('/bookings/:id/confirm-with-points', confirmBookingWithPoints);

// ---------------------------------------------------------------------------
// Member Management
// ---------------------------------------------------------------------------
adminRouter.post('/members/assign-points', assignManualPoints);
adminRouter.get('/members/search', searchMembers);
