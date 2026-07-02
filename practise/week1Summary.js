// week1-sdet-foundation.js
// Week 1 JavaScript + SDET Fundamentals (Playwright Ready)

// ======================================================
// 1. VARIABLES (const / let)
// ======================================================

const TEST_ENV = "QA";
const BASE_URL = "https://www.saucedemo.com";
const MAX_TIMEOUT = 30000;

let totalPassed = 0;
let totalFailed = 0;

// ======================================================
// 2. OBJECTS
// ======================================================

const testConfig = {
  browser: "Chrome",
  timeout: MAX_TIMEOUT,
  retries: 2,
  environment: TEST_ENV,
  headless: false,

  reporter: {
    type: "HTML",
    savePath: "./reports"
  }
};

// ======================================================
// 3. TEST CASES
// ======================================================

const testCases = [
  {
    id: 1,
    name: "Login Test",
    priority: "High",
    enabled: true
  },

  {
    id: 2,
    name: "Add To Cart Test",
    priority: "Medium",
    enabled: true
  },

  {
    id: 3,
    name: "Checkout Test",
    priority: "High",
    enabled: false
  }
];

// ======================================================
// 4. DESTRUCTURING
// ======================================================

const {
  browser,
  timeout,
  retries,
  environment,
  reporter
} = testConfig;

console.log(`\nEnvironment : ${environment}`);
console.log(`Browser     : ${browser}`);
console.log(`Reporter    : ${reporter.type}`);

// ======================================================
// 5. SPREAD OPERATOR
// ======================================================

const stagingConfig = {
  ...testConfig,
  environment: "STAGING"
};

console.log("\nStaging Config");
console.log(stagingConfig);

// ======================================================
// 6. ARROW FUNCTION
// ======================================================

const validateEmail = email => email.includes("@");

// ======================================================
// 7. REGULAR FUNCTION
// ======================================================

function validateUrl(url) {
  return url.startsWith("https");
}

// ======================================================
// 8. CLASS
// ======================================================

class LoginPage {
  constructor() {
    this.url = BASE_URL;
  }

  navigate() {
    console.log(`Navigating to ${this.url}`);
  }
}

// ======================================================
// 9. OPTIONAL CHAINING
// ======================================================

const apiResponse = {
  user: {
    profile: {
      name: "Maruthu"
    }
  }
};

console.log(
  "\nUser Name:",
  apiResponse?.user?.profile?.name
);

console.log(
  "Phone:",
  apiResponse?.user?.profile?.phone ?? "Not Available"
);

// ======================================================
// 10. TEMPLATE LITERALS
// ======================================================

console.log(`
=========================
TEST EXECUTION STARTED
Browser : ${browser}
Timeout : ${timeout}
=========================
`);

// ======================================================
// 11. ASYNC / AWAIT INTRO
// ======================================================

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function executeTest(testName, timeout) {
  console.log(`Executing: ${testName}`);

  await delay(500);

  return Math.random() > 0.3;
}

// ======================================================
// 12. RETRY LOGIC
// ======================================================

async function executeWithRetry(testName) {
  for (let attempt = 1; attempt <= retries + 1; attempt++) {
    const result = await executeTest(testName, timeout);

    if (result) {
      console.log(`Attempt ${attempt} : PASS`);
      return true;
    }

    console.log(`Attempt ${attempt} : FAIL`);

    if (attempt <= retries) {
      console.log("Retrying...");
    }
  }

  return false;
}

// ======================================================
// 13. COMPLETE TEST RUNNER
// ======================================================

async function runTests(config, tests) {
  console.log(`
Running tests on ${config.browser}
Environment : ${config.environment}
`);

  // FOR EACH LOOP

  for (const test of tests) {

    // IF / ELSE

    if (!test.enabled) {
      console.log(`Skipping ${test.name}`);
      continue;
    }

    const passed = await executeWithRetry(test.name);

    if (passed) {
      totalPassed++;
      console.log(`✅ ${test.name} PASSED\n`);
    } else {
      totalFailed++;
      console.log(`❌ ${test.name} FAILED\n`);
    }
  }

  generateSummary(tests);
}

// ======================================================
// 14. SUMMARY REPORT
// ======================================================

function generateSummary(tests) {

  console.log(`
=========================
EXECUTION SUMMARY
=========================
`);

  console.log(`Passed : ${totalPassed}`);
  console.log(`Failed : ${totalFailed}`);

  console.log(`Total  : ${
    tests.filter(test => test.enabled).length
  }`);

  // FOR LOOP

  console.log("\nExecuted Tests");

  for (let i = 0; i < tests.length; i++) {
    console.log(`${i + 1}. ${tests[i].name}`);
  }

  // WHILE LOOP

  console.log("\nHigh Priority Tests");

  let index = 0;

  while (index < tests.length) {

    if (tests[index].priority === "High") {
      console.log(tests[index].name);
    }

    index++;
  }
}

// ======================================================
// 15. SDET UTILITIES
// ======================================================

const testData = {
  email: "tester@example.com",
  password: "Password123"
};

function validateTestData(data) {

  const validations = {
    email: validateEmail(data.email),
    password: data.password.length >= 8
  };

  return validations;
}

console.log("\nValidation");
console.log(validateTestData(testData));

console.log(
  "URL Valid:",
  validateUrl(BASE_URL)
);

// ======================================================
// 16. PAGE OBJECT USAGE
// ======================================================

const loginPage = new LoginPage();

loginPage.navigate();

// ======================================================
// 17. START EXECUTION
// ======================================================

(async () => {

  try {

    await runTests(
      testConfig,
      testCases
    );

  } catch (error) {

    console.log(
      `Execution Failed: ${error.message}`
    );

  } finally {

    console.log("\nExecution Completed");

  }

})();