## 2026-09-20 - [Missing Authentication on Admin Routes]
**Vulnerability:** The admin endpoints (`/api/admin` and `/api/admin/bookings`) lacked authentication middleware, exposing sensitive operations like payout approvals and manual points assignments to the public.
**Learning:** The routing setup in `server/src/app.ts` attached routers without securing them with authentication or authorization middleware, which is a critical oversight for a system dealing with sensitive information and financials.
**Prevention:** Always verify that endpoints intended for privileged roles include authorization middleware when mounting the routes. Use tools like `requireAdmin` to enforce role-based access control.
