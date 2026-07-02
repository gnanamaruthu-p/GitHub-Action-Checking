// =======================================================
// JavaScript Objects, Destructuring & Spread Operator
// Practical Examples for Playwright / SDET
// =======================================================

// =======================================================
// 1. Create 3 Test Configuration Objects
// =======================================================

const localConfig = {
  environment: "local",
  baseURL: "http://localhost:3000",
  browser: "Chrome",
  headless: false,
  timeout: 30000,
  retries: 1
};

const stagingConfig = {
  environment: "staging",
  baseURL: "https://staging.company.com",
  browser: "Chrome",
  headless: true,
  timeout: 45000,
  retries: 2
};

const productionConfig = {
  environment: "production",
  baseURL: "https://company.com",
  browser: "Chrome",
  headless: true,
  timeout: 60000,
  retries: 3
};

console.log("=================================");
console.log("1. Test Configurations");
console.log("=================================");

console.log(localConfig);
console.log(stagingConfig);
console.log(productionConfig);


// =======================================================
// 2. Destructuring Examples for Test Data
// =======================================================

const loginTestData = {
  username: "admin",
  password: "admin123",
  role: "administrator"
};

const { username, password, role } = loginTestData;

console.log("\n=================================");
console.log("2. Object Destructuring");
console.log("=================================");

console.log(username);
console.log(password);
console.log(role);


// =======================================================
// 3. Spread Operator - Merge Configurations
// =======================================================

const smokeTestConfig = {
  ...stagingConfig,
  timeout: 90000
};

const regressionConfig = {
  ...productionConfig,
  retries: 5
};

console.log("\n=================================");
console.log("3. Spread Operator");
console.log("=================================");

console.log(smokeTestConfig);

console.log(regressionConfig);


// =======================================================
// 4. Practical SDET Scenario #1
// Multiple Login Users
// =======================================================

const users = [
  {
    username: "admin",
    password: "admin123",
    role: "admin"
  },
  {
    username: "manager",
    password: "manager123",
    role: "manager"
  },
  {
    username: "user",
    password: "user123",
    role: "user"
  }
];

console.log("\n=================================");
console.log("4. Scenario 1 - Multiple Users");
console.log("=================================");

users.forEach(({ username, role }) => {
  console.log(`Execute login test for ${username} (${role})`);
});


// =======================================================
// Practical SDET Scenario #2
// API Response Handling
// =======================================================

const defaultApiResponse = {
  status: 200,
  message: "Success",
  data: null
};

const userApiResponse = {
  ...defaultApiResponse,
  data: {
    id: 101,
    name: "John"
  }
};

console.log("\n=================================");
console.log("5. Scenario 2 - API Response");
console.log("=================================");

console.log(userApiResponse);


// =======================================================
// Practical SDET Scenario #3
// Environment Selection
// =======================================================

const selectedEnv = productionConfig;

const {
  environment,
  baseURL,
  timeout
} = selectedEnv;

console.log("\n=================================");
console.log("6. Scenario 3 - Environment");
console.log("=================================");

console.log(`Environment : ${environment}`);
console.log(`Base URL    : ${baseURL}`);
console.log(`Timeout     : ${timeout}`);


// =======================================================
// Practical SDET Scenario #4
// Playwright Browser Launch Options
// =======================================================

const browserOptions = {
  browser: "Chrome",
  headless: true
};

const playwrightOptions = {
  ...browserOptions,
  slowMo: 500
};

console.log("\n=================================");
console.log("7. Scenario 4 - Browser Options");
console.log("=================================");

console.log(playwrightOptions);


// =======================================================
// Practical SDET Scenario #5
// Test Result Summary
// =======================================================

const testResult = {
  totalTests: 50,
  passed: 47,
  failed: 3,
  skipped: 0
};

const {
  totalTests,
  passed,
  failed,
  skipped
} = testResult;

console.log("\n=================================");
console.log("8. Scenario 5 - Test Summary");
console.log("=================================");

console.log(`Total Tests : ${totalTests}`);
console.log(`Passed      : ${passed}`);
console.log(`Failed      : ${failed}`);
console.log(`Skipped     : ${skipped}`);