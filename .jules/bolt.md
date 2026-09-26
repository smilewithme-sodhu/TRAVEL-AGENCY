## 2024-05-24 - React.memo() Performance Win
**Learning:** Found an opportunity to optimize performance by reducing unnecessary re-renders in React components. The `PackageCard` component is rendering multiple times, especially when the active tab or search query changes in `DestinationsCatalogPage` or when the filter changes in `ExploreJourneysSection`.
**Action:** Wrap the `PackageCard` component in `React.memo()` to prevent re-rendering when its props haven't changed. Provide a custom comparison function to only check for changes in the `pkg` prop.
