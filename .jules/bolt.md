## 2024-06-25 - Prevent O(n) Search Re-renders
**Learning:** Components mapping over large lists (like `PackageCard` in `DestinationsCatalogPage`) re-render unnecessarily on every parent state change (e.g., typing in a search bar). This can lead to significant input lag and degraded UI performance, especially since search updates occur frequently.
**Action:** Always wrap heavily-mapped, pure list item components in `React.memo()` to ensure only the components whose props have changed are re-rendered.
