## 2024-05-14 - Unprotected Admin Endpoints
**Vulnerability:** The entire `/api/admin` and `/api/admin/bookings` routes were mounted in `app.ts` without any authentication or authorization middleware, allowing unauthenticated access to critical administrative functions like payout approvals and manual points assignments.
**Learning:** Route-level middleware MUST be explicitly applied at the router mounting point in the main application file or within the router itself. Relying on implicit or controller-level checks is error-prone.
**Prevention:** Always verify that sensitive router instances (like `adminRouter`) have authentication middleware applied during the `app.use()` declaration or globally within the router instance before defining routes.
