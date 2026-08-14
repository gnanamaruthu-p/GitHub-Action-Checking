# Performance Baseline Report

## Test Information

| Item | Value |
|--------|--------|
| Date | 14-Aug-2026 |
| Environment | Local Machine |
| Browser | Chromium |
| Test Type | Baseline Performance Test |
| User Load | Single User |
| Network | Local Internet Connection |
| Application | SauceDemo |
| Tester | Gnana Maruthu |

---

## Measured Performance Metrics

| Test Scenario | Measured Time (ms) | Threshold (ms) | Status |
|--------------|-------------------:|---------------:|--------|
| Home Page Load | 1450 | 3000 | PASS |
| Login Navigation | 1250 | 5000 | PASS |
| Add To Cart Badge Update | 180 | 2000 | PASS |
| Open Cart Page | 240 | 3000 | PASS |
| Checkout Step One | 310 | 3000 | PASS |
| Customer Details Submission | 420 | 3000 | PASS |
| Finish Checkout | 350 | 3000 | PASS |
| Complete Checkout Flow | 2750 | 10000 | PASS |

---

## Detailed Results

### Home Page Load

- Measured Time: 1450 ms
- Threshold: 3000 ms
- Result: PASS

### Login Navigation

- Measured Time: 1250 ms
- Threshold: 5000 ms
- Result: PASS

### Add To Cart Badge Update

- Measured Time: 180 ms
- Threshold: 2000 ms
- Result: PASS

### Open Cart Page

- Measured Time: 240 ms
- Threshold: 3000 ms
- Result: PASS

### Checkout Step One

- Measured Time: 310 ms
- Threshold: 3000 ms
- Result: PASS

### Customer Details Submission

- Measured Time: 420 ms
- Threshold: 3000 ms
- Result: PASS

### Finish Checkout

- Measured Time: 350 ms
- Threshold: 3000 ms
- Result: PASS

### Complete Checkout Flow

- Measured Time: 2750 ms
- Threshold: 10000 ms
- Result: PASS

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

This baseline will be used for future comparison during:

- Load Testing
- Stress Testing
- Performance Regression Testing

Any future measurement exceeding the defined threshold should be investigated and compared against this baseline.