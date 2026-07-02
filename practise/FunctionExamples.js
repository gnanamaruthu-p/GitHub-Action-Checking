// =============================================
// JavaScript Functions & Callbacks for SDET / Playwright
// =============================================

// =============================================
// 1. Regular Functions vs Arrow Functions
// =============================================

// Regular function
function launchBrowser(browserName) {
  console.log(`Launching ${browserName}`);
}

launchBrowser("Chrome");

// Arrow function
const openApplication = (url) => {
  console.log(`Opening ${url}`);
};

openApplication("https://example.com");

// =============================================
// 2. Callbacks and Higher-Order Functions
// =============================================

// Higher-order function
function executeTest(testName, callback) {
  console.log(`\n▶ Starting: ${testName}`);

  callback();

  console.log(`✓ Finished: ${testName}`);
}

// Callback function
executeTest("Login Test", () => {
  console.log("Entering username");
  console.log("Entering password");
  console.log("Clicking login button");
});

// =============================================
// 3. Rest Parameters for Flexible Test Runners
// =============================================

function runOnBrowsers(testName, ...browsers) {
  console.log(`\nRunning "${testName}"`);

  browsers.forEach(browser => {
    console.log(`Executing on ${browser}`);
  });
}

runOnBrowsers(
  "Checkout Test",
  "Chrome",
  "Firefox",
  "Safari"
);

// =============================================
// 4. Practical SDET Test Helper Examples
// =============================================

// Example 1: Environment setup helper

function setupEnvironment(environment, callback) {
  console.log(`\nSetting up ${environment}`);

  callback();

  console.log(`${environment} ready`);
}

setupEnvironment("QA", () => {
  console.log("Loading test data");
});


// ---------------------------------------------
// Example 2: API validator helper

const validateStatusCode = (actualStatus, expectedStatus) => {
  if (actualStatus === expectedStatus) {
    console.log("API validation passed");
  } else {
    console.log("API validation failed");
  }
};

validateStatusCode(200, 200);


// ---------------------------------------------
// Example 3: Login helper

const login = (username, password) => {
  console.log("\nExecuting Login");

  console.log(`Username: ${username}`);

  console.log(`Password: ${password}`);
};

login("admin", "admin123");


// ---------------------------------------------
// Example 4: Browser execution helper

const executeOnAllBrowsers = (...browsers) => {
  console.log("\nBrowser Execution");

  browsers.forEach(browser => {
    console.log(`Running on ${browser}`);
  });
};

executeOnAllBrowsers(
  "Chrome",
  "Firefox",
  "Edge"
);


// ---------------------------------------------
// Example 5: Retry helper

function retryTest(testName, retries, callback) {
  console.log(`\nRetry helper: ${testName}`);

  for (let attempt = 1; attempt <= retries; attempt++) {
    console.log(`Attempt ${attempt}`);

    callback();
  }

  console.log("Retry completed");
}

retryTest("Payment Test", 3, () => {
  console.log("Executing test steps");
});


// =============================================
// Example Output Flow (Reference)
// =============================================
//
// Launching Chrome
// Opening https://example.com
//
// ▶ Starting: Login Test
// Entering username
// Entering password
// Clicking login button
// ✓ Finished: Login Test
//
// Running "Checkout Test"
// Executing on Chrome
// Executing on Firefox
// Executing on Safari
//
// Setting up QA
// Loading test data
// QA ready
//
// API validation passed
//
// Executing Login
// Username: admin
// Password: admin123
//
// Browser Execution
// Running on Chrome
// Running on Firefox
// Running on Edge
//
// Retry helper: Payment Test
// Attempt 1
// Executing test steps
// Attempt 2
// Executing test steps
// Attempt 3
// Executing test steps
// Retry completed
//