// =============================================
// JavaScript Loops & Conditionals for SDET / Playwright
// =============================================

// =============================================
// 1. for loop - Execute tests on multiple browsers
// =============================================

const browsers = ["Chrome", "Firefox", "Edge"];

console.log("\n=== FOR LOOP ===");

for (let i = 0; i < browsers.length; i++) {
  console.log(`Running Login Test on ${browsers[i]}`);
}

// =============================================
// 2. while loop - Retry until success
// =============================================

console.log("\n=== WHILE LOOP ===");

let attempt = 1;
let maxRetries = 3;
let testPassed = false;

while (attempt <= maxRetries && !testPassed) {
  console.log(`Attempt ${attempt}`);

  if (attempt === 3) {
    testPassed = true;
    console.log("Test Passed");
  }

  attempt++;
}

// =============================================
// 3. forEach loop - Execute API validations
// =============================================

console.log("\n=== FOREACH LOOP ===");

const endpoints = [
  "/users",
  "/orders",
  "/products"
];

endpoints.forEach(endpoint => {
  console.log(`Validating API: ${endpoint}`);
});

// =============================================
// 4. if / else - Test validation
// =============================================

console.log("\n=== IF ELSE ===");

const statusCode = 200;

if (statusCode === 200) {
  console.log("API Test Passed");
} else {
  console.log("API Test Failed");
}

// =============================================
// 5. switch statement - Test status checking
// =============================================

console.log("\n=== SWITCH ===");

const testStatus = "passed";

switch (testStatus) {

  case "passed":
    console.log("Test Successful");
    break;

  case "failed":
    console.log("Investigate Defect");
    break;

  case "pending":
    console.log("Execution Pending");
    break;

  default:
    console.log("Unknown Status");
}

// =============================================
// 6. break - Stop when a browser fails
// =============================================

console.log("\n=== BREAK ===");

const browserList = [
  "Chrome",
  "Firefox",
  "Safari",
  "Edge"
];

for (const browser of browserList) {

  if (browser === "Safari") {
    console.log("Browser unsupported");
    break;
  }

  console.log(`Testing on ${browser}`);
}

// =============================================
// 7. continue - Skip unstable environments
// =============================================

console.log("\n=== CONTINUE ===");

const environments = [
  "QA",
  "UAT",
  "STAGING",
  "DEV"
];

for (const environment of environments) {

  if (environment === "DEV") {
    continue;
  }

  console.log(`Executing in ${environment}`);
}

// =============================================
// 8. Real SDET Example #1 - Execute test cases
// =============================================

console.log("\n=== SDET EXAMPLE 1 ===");

const testCases = [
  "Login",
  "Logout",
  "Profile Update"
];

testCases.forEach(test => {
  console.log(`Executing ${test}`);
});

// =============================================
// 9. Real SDET Example #2 - Validate response codes
// =============================================

console.log("\n=== SDET EXAMPLE 2 ===");

const responseCodes = [
  200,
  201,
  404,
  500
];

responseCodes.forEach(code => {

  if (code >= 200 && code < 300) {
    console.log(`${code} -> Success`);
  } else {
    console.log(`${code} -> Failure`);
  }

});

// =============================================
// 10. Real SDET Example #3 - Retry failed test
// =============================================

console.log("\n=== SDET EXAMPLE 3 ===");

function retryTest(testName, maxAttempts) {

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {

    console.log(`${testName} - Attempt ${attempt}`);

    if (attempt === 3) {
      console.log("Test Passed");
      break;
    }

  }

}

retryTest("Checkout Test", 5);

// =============================================
// 11. Real SDET Example #4 - Browser support validation
// =============================================

console.log("\n=== SDET EXAMPLE 4 ===");

const supportedBrowsers = [
  "Chrome",
  "Firefox",
  "Internet Explorer"
];

supportedBrowsers.forEach(browser => {

  if (browser === "Internet Explorer") {
    console.log(`${browser} is not supported`);
  } else {
    console.log(`${browser} is supported`);
  }

});

// =============================================
// 12. Real SDET Example #5 - Environment validation
// =============================================

console.log("\n=== SDET EXAMPLE 5 ===");

const currentEnvironment = "QA";

switch (currentEnvironment) {

  case "DEV":
    console.log("Developer environment");
    break;

  case "QA":
    console.log("Quality Assurance environment");
    break;

  case "UAT":
    console.log("User Acceptance environment");
    break;

  case "PROD":
    console.log("Production environment");
    break;

  default:
    console.log("Invalid environment");
}