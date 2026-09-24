## 2024-05-19 - [Parallelize Backend Dashboard Queries]
**Learning:** Independent backend metric aggregations (such as Prisma count or aggregate queries that don't depend on each other) can become a significant performance bottleneck when executed sequentially.
**Action:** Always wrap independent backend queries using `Promise.all` to execute them concurrently, reducing total response latency.
