# Test Strategy

## 1. Objective
This project uses Playwright for automated web application testing with a focus on fast feedback, regression protection, and visible reporting. The strategy is designed to validate critical user journeys, detect functional regressions early, and provide reliable evidence for releases.

## 2. Scope
### In Scope (Project 1: SauceDemo)
- User login with valid and invalid credentials
- Product inventory page validation, including product listing and sorting
- Add to cart and remove from cart actions for multiple products
- Cart page verification, quantity checks, and checkout flow initiation
- Checkout information form validation and error handling
- Order completion confirmation page after successful purchase
- Navigation through the app menu and logout flow
- Browser-based regression checks for the core purchase journey

### Out of Scope
- Performance and load testing of the SauceDemo application, because the current objective is functional UI validation rather than capacity benchmarking
- Automated mobile app testing, because the project is focused on web browser behavior in a desktop environment
- API-level security or penetration testing, because this strategy is limited to UI automation and does not include backend vulnerability assessment
- Cross-browser/device matrix optimization beyond the configured Playwright environment, because the initial project scope is focused on stable core coverage and quick regression feedback
- Visual pixel-perfect testing for every page, because the priority is functional correctness and reliable business flow validation rather than detailed design comparison

These scope boundaries keep the project focused on the most valuable user journeys for Project 1 while avoiding unnecessary effort outside the intended automation objective.

### Risk Matrix (Project 1: SauceDemo)

| Feature | Business Impact | Complexity | Priority |
| --- | --- | --- | --- |
| Login with valid credentials | Critical | Low | P0 |
| Login with invalid credentials | Critical | Low | P0 |
| Product listing and inventory display | Critical | Medium | P0 |
| Product sorting/filtering | Medium | Medium | P1 |
| Add to cart | Critical | Low | P0 |
| Remove from cart | Medium | Low | P1 |
| Cart summary validation | Critical | Medium | P0 |
| Checkout form validation | Critical | Medium | P0 |
| Complete purchase flow | Critical | High | P0 |
| Order confirmation page | Critical | Low | P0 |
| Logout / session end | Medium | Low | P1 |
| Navigation menu and page switching | Medium | Medium | P1 |

### Risk Interpretation
- P0: Must be automated and validated in every release because a failure blocks core business use.
- P1: Important regression coverage; should be included in the standard suite and run for release validation.
- P2: Useful coverage, but not critical to the primary purchase path; can be run in extended or lower-priority cycles.

## 3. Testing Goals
- Verify that the application works correctly for primary user journeys
- Catch regressions before deployment
- Reduce manual effort in repetitive validation
- Ensure tests are maintainable, readable, and stable
- Provide actionable failure evidence through screenshots, traces, and reports

## 4. Test Levels
### 4.1 Smoke Tests
Purpose: Validate that the application starts correctly, loads the base page, and critical entry points function.

Examples:
- Application loads without crash
- Login or landing page renders correctly
- Basic navigation works

### 4.2 Functional Tests
Purpose: Validate the business behavior of the application.

Examples:
- User login flow
- Form submission and validation
- Add/edit/delete flows
- Data-driven movement between pages

### 4.3 Regression Tests
Purpose: Ensure previously fixed defects remain resolved and new changes do not break existing features.

These tests should run on every change and in CI before merge or deployment.

### 4.4 Negative and Validation Tests
Purpose: Confirm invalid inputs and error-handling scenarios behave correctly.

Examples:
- Blank required fields
- Invalid credentials
- Unsupported user interactions
- Boundary values

### 4.5 Accessibility and Quality Checks
Purpose: Improve usability and prevent preventable defects.

Recommended additions:
- Keyboard navigation checks
- Form label validation
- Color contrast and accessibility snapshot checks
- Basic ARIA usage validation

## 5. Test Approach
The project follows a layered test approach:

1. Unit-style logic checks where relevant
2. UI automation for critical flows
3. Regression suites for release confidence
4. Reporting and artifact collection for every run

The tests should be designed around real user behavior rather than implementation details.

## 6. Test Levels & Tools
### Effort Allocation
| Test Type | Approximate Effort | Why this allocation is appropriate |
| --- | --- | --- |
| UI Testing | 55% | The product is a browser-based e-commerce workflow, and the highest-value validation is at the user journey level. Playwright is optimized for this and catches real UI regressions quickly. |
| API / Integration Testing | 25% | API and service checks help validate contracts and backend consistency, but the current project is focused on end-user behavior rather than deep backend validation. |
| Integration Testing | 15% | This covers interactions between UI actions and app state or data updates, especially around cart, checkout, and session changes. |
| Non-functional Testing | 5% | This is intentionally limited at the start because performance, security, and resilience testing are slower and less critical than functional coverage for the current learning and regression stage. |

### Why this balance is correct
- UI testing provides the best coverage for the user-facing behavior of SauceDemo, which is the core business flow.
- The speed of Playwright makes UI automation ideal for early regression detection and fast feedback in CI.
- API and integration testing add confidence in data flow and contract correctness without requiring the full cost of a heavy backend test harness.
- Non-functional testing is kept low initially because it is slower to execute and harder to maintain, while the current project priority is validating business-critical user journeys with strong return on effort.
- This split optimizes the tradeoff between speed and coverage: the team gets the most defect detection value from UI-focused automation early, while still reserving a smaller percentage for supporting integration and quality checks.

### Tooling
- Playwright Test for UI automation and browser-level validation
- JavaScript/Node.js for test logic and execution
- HTML reporter for quick local reporting
- Allure reporter for detailed evidence and defect investigation
- dotenv for environment-based configuration
- Fixtures and test data files to support repeatable scenarios

## 7. Test Environment Strategy
### 7.1 Local Environment
Purpose: Provide fast feedback to developers while writing and debugging tests.

Guidelines:
- Run Playwright tests locally in headless mode for speed and consistency
- Use the default SauceDemo base URL unless a project-specific environment is configured
- Keep local credentials and sensitive values in environment variables rather than hardcoded into tests
- Use trace, screenshots, and video capture for failed runs to investigate UI issues quickly
- Validate new features locally before pushing changes to shared pipelines

### 7.2 CI Environment
Purpose: Enforce quality gates and run regression validation in a clean, repeatable environment.

Guidelines:
- Execute the main test suite in CI after code changes or pull requests
- Run smoke and critical regression tests before merging to protected branches
- Use retries for transient issues only when the failure pattern supports it
- Publish HTML and Allure reports as build artifacts for visibility and debugging
- Fail the pipeline when critical flows or smoke tests do not pass

### 7.3 Staging / Pre-Release Environment
Purpose: Validate application behavior in an environment that matches the release candidate as closely as possible.

Guidelines:
- Use a staging URL for final validation before deployment or release sign-off
- Re-run the critical user journey suite in staging to confirm production-like behavior
- Validate environment-specific configuration, such as login URLs, credentials, and feature flags
- Use staging to confirm that test automation remains stable under near-production conditions

### 7.4 Environment Controls
The current configuration already includes:
- Base URL defaulting to https://www.saucedemo.com
- Headless execution
- Screenshot capture on failure
- Video retention on failure
- Trace capture on first retry
- HTML and Allure reporting

This environment strategy balances speed, reliability, and release confidence by using local execution for fast iteration, CI for regression control, and staging for final validation before sign-off.

## 8. Test Data Strategy
- Store reusable data under the project testdata and fixtures folders
- Prefer deterministic data for repeatable runs
- Keep sensitive data outside source control where possible
- Use environment variables for runtime configuration

## 9. Execution Strategy
### Recommended Commands
- Run all tests:
  npm test

- Run with Allure report generation:
  npm run test:allure

### Execution Frequency
- On every code change in active development branches
- Before merging pull requests
- Before release or deployment
- During regression-wave testing as needed

## 10. Reporting and Defect Tracking
- Playwright HTML report provides quick test summary and failure details
- Allure report provides richer artifacts for troubleshooting
- Failures should capture:
  - screenshot
  - trace
  - video
  - console and error context

Every defect should include:
- reproduction steps
- expected vs. actual result
- environment details
- screenshot or trace reference

## 11. Entry & Exit Criteria
### Entry Criteria: When to start testing a feature
Testing should begin as soon as a feature is defined and the acceptance criteria are understood. In practice, the team should start testing when:
- the feature requirement or user story is clearly documented
- the expected behavior is known and testable
- the relevant page or workflow is available in a stable environment
- the test data and login state needed for the scenario are available
- the feature is ready for a smoke pass or initial functional validation

For this project, testing should begin early in the feature lifecycle so defects are found while the code is still easy to fix. Critical user journeys such as login, cart, checkout, and order confirmation should be tested at the earliest stage of development.

### Exit Criteria: When a feature is considered done
A feature is considered done only when all the following are true:
- the core happy-path scenario passes successfully
- negative and validation cases are covered where applicable
- regression checks for related workflows pass
- no open critical or high-priority defects remain for the feature
- the relevant test evidence is captured, including screenshots, traces, or failure logs when needed
- the feature behaves correctly in the configured browser environment and meets the acceptance criteria

For release readiness, the feature is complete only when it passes the project’s smoke and regression checks and the test results are reviewed before merge or deployment.

## 12. Risks and Mitigations
### Risk: Flaky tests
Mitigation:
- Avoid arbitrary waits
- Prefer deterministic selectors and explicit waits
- Keep test data isolated and stable

### Risk: Weak selectors
Mitigation:
- Use stable locators and accessible selectors where possible

### Risk: Environment-based failures
Mitigation:
- Centralize configuration in environment variables
- Validate required values before running the suite

### Risk: Overly broad test suites
Mitigation:
- Separate smoke, regression, and exploratory coverage
- Keep critical-user-path tests focused

## 13. Known Risks & Assumptions
### Known Risks
- Test flakiness caused by unstable selectors, slow page loads, or timing issues in dynamic UI elements
- Environment configuration drift between local, CI, and staging environments
- Application changes that alter existing user flows without updating the related automated tests
- Missing or incomplete test data that prevents validation of negative and edge-case scenarios
- Limited coverage of non-UI layers if the application behavior depends on backend services not included in the current suite

### Assumptions
- The application under test is a browser-based web app with a stable UI and accessible element selectors
- The key business functionality is centered on the SauceDemo login and purchase flow
- The API/backend services are available and behave consistently during test execution
- Test data can be created or reset through controlled setup steps without affecting production-like environments
- The project is primarily focused on functional UI validation, not full performance or security testing at this stage

These risks and assumptions should be reviewed regularly as the test suite grows and the application behavior evolves.

## 14. Continuous Improvement
This strategy should evolve as the application grows. New user journeys should be added as functional tests, flaky tests should be stabilized, and the suite should be reviewed periodically to remove redundant coverage.

## 15. Summary
The testing approach for this repository is centered on Playwright-based UI automation, release-focused regression coverage, and clear evidence generation through HTML and Allure reporting. This ensures that critical application behavior is validated consistently and efficiently.
