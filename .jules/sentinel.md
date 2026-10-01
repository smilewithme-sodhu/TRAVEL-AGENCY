## 2024-05-24 - [Missing Authorization on Admin Endpoints]
**Vulnerability:** Admin routes (`/api/admin` and `/api/admin/bookings`) in `app.ts` were missing authentication/authorization middleware completely, allowing unauthorized access to administrative functions.
**Learning:** Due to how routing was centralized in `app.ts` without applying global role checks to specific router modules, these sensitive endpoints were exposed to unauthenticated users.
**Prevention:** Always verify that route groups mapping to administrative or privileged namespaces have a robust authentication AND role-based authorization check applied at the router mounting point (or within the router itself).
