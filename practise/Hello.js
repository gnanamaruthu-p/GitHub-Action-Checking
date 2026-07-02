// Three Rules you must never forget 

const never ="Never change the original code";

let willchange ="You can change the code but only if you know what you are doing";

// Var -> never use it again in your life 

// constant - ALL CAPS with underscores

const MAX_TIMEOUT=3000;

const BASE_URL="https://api.example.com";

//variable and functions - camelcase 

let browserName="chrome";

let testStatus="passed";

// class and page objects - PascalCase

class LoginPage {}
class CheckoutPage{}

// 2️⃣ Template Literals — The Right Way

const browser="chrome";
const url="https://www.example.com";
const timeout=3000;


// Bad - Messy String Concatenation

console.log("Lanching" + browser +"On" + url );

// Good - Template Literals

console.log(`lanching ${browser} on ${url} with timeout of ${timeout}ms`);

// Multi- line - very userful for test reports

const testReport = `
Test Summary :
browser:${browser}
url:${url}
timeout:${timeout}ms
`;

console.log(testReport);


const testConfig = {
  browser: "Chrome",
  timeout: 30000
};

testConfig.browser = "Firefox";
testConfig.newKey  = "added";
delete testConfig.timeout;

console.log(testConfig);