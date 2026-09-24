## 2024-05-24 - Unprotected Admin Endpoints
**Vulnerability:** The `/api/admin` and `/api/admin/bookings` endpoints were unprotected, allowing unauthenticated or unauthorized users to access sensitive admin functionalities and metrics.
**Learning:** Security middleware for admin routes was missing from the central `app.ts` routing configuration, highlighting the need for a robust role-based access control (RBAC) implementation and its consistent application across all privileged routes.
**Prevention:** Always ensure that role-checking middleware (e.g., `requireAdmin`) is applied to all administrative or privileged endpoints at the router level in `app.ts`.
