## 2024-05-14 - [Memoizing Filtered Lists]
**Learning:** Found multiple instances where lists were being filtered synchronously in the render body (`AdminBookingsPage` and `ExplorePage`). In `AdminBookingsPage`, string case conversion (`search.toLowerCase()`) was happening inside the filter loop, compounding the O(n) calculation on every render.
**Action:** Always wrap `.filter` and `.map` calculations on potentially large datasets in `useMemo`, and hoist static loop computations (like `.toLowerCase()` on the search term) outside the callback to optimize performance.
