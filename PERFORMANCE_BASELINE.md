# Performance Baseline Report

## Test Information

| Item | Value |
|--------|--------|
| Date | 14-Aug-2026 |
| Environment | Local Machine |
| Browser | Chromium |
| Test Type | Baseline Performance Test |
| User Load | Single User |
| Application | SauceDemo |
---
## Measured Performance Metrics

| Test Scenario | Measured Time (ms) | Threshold (ms) | Status |
|--------------|-------------------:|---------------:|--------|
| Login Navigation (isolated test) | 99 | 5000 | PASS |
| Login (within full flow) | 364 | 5000 | PASS |
| Add To Cart Time | 46 | 2000 | PASS |
| Open Cart Time | 51 | 3000 | PASS |
| Customer Details Time | 74 | 3000 | PASS |
| Finish Checkout Time | 44 | 3000 | PASS |
| Complete Checkout Flow | 622 | 10000 | PASS |
| DOM Content Loaded | 497.6 | 3000 | PASS |
| Load Complete | 498.8 | 3000 | PASS |
| First Byte (TTFB) | 311.1 | N/A | INFO |


---

## Test Conditions

- Tests executed using Playwright.
- Measurements collected on a local machine.
- Single user execution.
- No concurrent users.
- Browser cache not intentionally cleared between runs.
- Results represent baseline performance only.
- Not a load or stress test.

---


## Notes

- Login Navigation (99 ms) was measured in an isolated login timing test.
- Login (364 ms) was measured as part of the full checkout flow.
- All tests were executed locally with a single user.
- These values serve as the baseline for future performance comparison.