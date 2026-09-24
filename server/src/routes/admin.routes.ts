import express from 'express';
import { 
  getPackages, createPackage, updatePackage, deletePackage, 
  getPendingPayouts, approvePayout, rejectPayout, injectWhatsAppBooking,
  activateMemberToGreen, activateMemberToOrange, setMemberStatus, getAdminMembers, getAdminDashboardMetrics, distributeGlobalBonus
} from '../controllers/admin.controller';
import { getBookings, confirmBookingWithPoints, assignManualPoints, searchMembers } from '../controllers/admin.bookings';

export const adminRouter = express.Router();

// ---------------------------------------------------------------------------
// Dashboard & Metrics
// ---------------------------------------------------------------------------
adminRouter.get('/dashboard/metrics', getAdminDashboardMetrics);
adminRouter.post('/bonuses/global', distributeGlobalBonus);

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
adminRouter.post('/bookings/whatsapp', injectWhatsAppBooking);

// ---------------------------------------------------------------------------
// Member Management
// ---------------------------------------------------------------------------
adminRouter.post('/members/assign-points', assignManualPoints);
adminRouter.get('/members/search', searchMembers);
adminRouter.get('/members', getAdminMembers);
adminRouter.post('/members/activate', activateMemberToGreen);
adminRouter.post('/members/activate-orange', activateMemberToOrange);
adminRouter.post('/members/set-status', setMemberStatus);
