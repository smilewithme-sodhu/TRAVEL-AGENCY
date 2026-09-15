## 2026-09-12 - [Critical] Privilege Escalation via Firestore Rules
**Vulnerability:** The default `allow write: if request.auth != null && request.auth.uid == userId;` rule in `firestore.rules` allowed any user to arbitrarily modify their own document, including sensitive fields like `role`. This allowed standard users to elevate themselves to an `admin` role and gain access to manage packages and other restricted functionalities.
**Learning:** Broad `allow write` rules on user documents are dangerous when those documents contain authorization data like roles or privileges. Always split write permissions into granular `create`, `update`, and `delete` and restrict modifications to sensitive fields.
**Prevention:**
1. Use `allow create` and `allow update` instead of generic `allow write`.
2. Check `request.resource.data` to validate that sensitive fields are not being altered maliciously (e.g. `!('role' in request.resource.data) || request.resource.data.role == resource.data.role`).
