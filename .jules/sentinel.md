## 2024-05-15 - Hardcoded JWT Secret
**Vulnerability:** JWT token signing and verification fallback to a hardcoded 'secret' string if process.env.JWT_SECRET is missing.
**Learning:** Hardcoding secrets in code can compromise all tokens if the source code is exposed. Always throw an error if critical secrets are missing from the environment.
**Prevention:** Never use fallback default strings for cryptographic secrets.
