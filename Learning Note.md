# Day 1 Summary

## Key Points

- `var`: can be redeclared and is visible outside `if` blocks.
- `let`: can be changed, but not declared again in the same scope.
- `const`: cannot be reassigned after it is set.
- Template literals: use backticks `` ` `` and `${}` to insert values into strings.
- `console.log()`: prints values to the terminal.

## Simple Examples

### `var`
```js
var city = "Mumbai";
var city = "India";
console.log(city); // India
```

### `var` block behavior
```js
if (true) {
  var tool = "playwright";
}
console.log(tool); // playwright
```

### `let`
```js
let score = 0;
score = 20;
console.log(score); // 20
```

### `const`
```js
const name = "jhon";
const city = "coimbatore";
console.log(`Name: ${name}, City: ${city}`);
```

## Short Summary

Day 1 was about JavaScript variables: `var`, `let`, `const`, and how to print values with `console.log()`.


#Day2 summary 

1. Total 7 day types available 
       
       1.string --> const testname = "Name"
       2.Number --> const timeout="3000;
       3.Boolean --> const isenable= true;
       4.Undefined --> let logresult; console.log(logresult); undefined. without value.
       5.Null   --> value assigned as null example : let apiresponse =null;
       6.Object --> const user ={username:"admin" , role:"tester"} ;
       7.Array --> const browser ["chrome","firefoxt","safari"];

2. typeof — Your Debugging Tool

// In API testing you will check types constantly
const response = {
  status:  200,
  success: true,
  message: "Login successful",
  data:    null,
  token:   "abc123xyz"
};

console.log(typeof response.status);   // number
console.log(typeof response.success);  // boolean
console.log(typeof response.message);  // string
console.log(typeof response.data);     // object ← null quirk
console.log(typeof response.token);    // string


3.Type Coercion — Common Bug Source

// JavaScript silently converts types — dangerous
console.log("5" + 5);    // "55"  ← string concat, not addition!
console.log("5" - 5);    // 0     ← converts string to number
console.log(true + 1);   // 2     ← true = 1
console.log(false + 1);  // 1     ← false = 0

// Always use === not == to avoid type coercion bugs
console.log(5 == "5");   // true  ← dangerous!
console.log(5 === "5");  // false ← safe! checks type AND value

#Day3 summary 

Array creation 

const browsers =["chrome","firfox","Edge"];
const testScores =[85,45,44,95];
const mixed=[1,"hello",true,null,{name:"test"}];


// Access by index (starts at 0)


console.log(browsers[0]); --> Chrome
console.log(browsers[2]); -->Safari
console.log(browsers[10]); -->undefined -index doesn't exist .


Array length

console.log(browsers.length);

Array methods 

const tests =["Login", "Logout", "Cart"];

push- add to end

test.push("checkout");

pop - Remove from end 

tests.pop();

shift-Remove from the START

tests.shift();

unshift- Add to START

tests.unshift("Home");

includes - check if exists

console.log(tests.include("login")); //false
console.log(tests.include("cart"));  // true 

indexOf - find position

console.log(tests.indexOf("Logout"));  1
console.log(tests.indexOf("Missing));  -1 (not found)


Join -combine into string

console.log(tests.join("->"));  //"Home->Logout->Cart"


ForEach -Loop Through Arrays

const browsers=["chrome","Firfox","Safari"];


// forEach with function

browsers.forEach(function(browser)){
  console.log("testing on:", browser);

}


// forEach with arrow function  ( modern way)

browsers.forEach(browser =>{

  console.log("Testing on:", browser)
});


//forEach with index

browsers.forEach((browser,index)=>{

  console.log(`Browser ${index}: ${browser}`);

});



# Day 4 summary 

Object the core of SDET 


object creation 

const testconfig ={

  browser:"Chrome",
  headless:false,
  timeout:3000,
  retries:2
};


// Access properties

console.log(testconfig.browser);  // chrome
console.log(testconfig["timeout"]);  //3000

// add new property 

testconfig.baseURL ="http://google.com";

// update property 

testconfig.browser="firefox" ; // chrome updated to firefox.

// delete property 

delete testconfig.retries;

console.log(testconfig ); ///{ browser: 'firefox' , headless :'false' , timeout:3000}


# Destructuring — Extract Values Cleanly

destructuring from object

const user ={
  username:"admin",
  password:"secret123",
  admin:"admin",
  email:"admin@gmail,com"
}

// Old way - verbose

const username =  user.username;
const role = user.admin;

// Destructuring way - clean 

const {username , role , email} = user;

console.log(username); //admin
console.log(email);  //admin@gmail.com

//destructuring with rename

const {username : userName , role = userRole } = user;

console.log (userName); // admin

// destructuing with default value

const {username ,phone ="123456"} = user;

console.log(phone);

Array destructuring 

const browser = ["chrome","firefox","edge"];

console.log(browserr[0]) ;  // chrome

console.log(browser[2]);   // edge


const [fistbrowser , secondbrowser] = browser;

console.log(firstbrowser);

const [chrome,,safari]=browser;

console.log(safari);

# spread operator (...)-  Expand objects/arrays

// Spread objects 

const baseconfig=   {

  browser:  "chrome",
  headless:true,
  timeout:3000
}


const prodconfig={
  ...baseconfig,  // copy all properties
  headless:false, // override headless
  timeout:6000     //override timeout

}


console.log(prodconfig);

// spread arrays

const arr1=[1,2,3];

const arr2=[4,5,6];

const combained =[...arr1, ...arr2];  // [1,2,3,4,5,6 ]

// copy array (doesn't affect original)

const original = ["chrom","firefox"];

const copy =[...original];

copy.push("safari");

console.log(original); // ["chrome","firefox"]

console.log(copy);  // ["chrome","firefox","safari"]




# Day 5 summary 

Regular Function 

  // basic function

  function greet(name){

    return `hello, ${name}!`;
  }

console.log ( greet("Maruthu")); // hello ,maruthu!

   // function with multiple parameters 

   function login ( username , password ){

    console.log(`logging in as  ${username}`);;

    return {username , token :"xyz123"};

   }

   // Function with default parameters
function runTest(testName, timeout = 30000) {
  console.log(`Running ${testName} with timeout ${timeout}ms`);
}

runTest("Login Test");              // uses default timeout 30000
runTest("Login Test", 45000);       // overrides default  45000



Arrow function -> modern way 

// Arrow function syntax 

const add = (a,b) => a+b;

console.log(add(3,5));  // 8

// Arrow function with block body 

const multiply =(a,b ) => {

  const result =a* b ;

  retrun result ;


}

// Arrow function with one parameter ( parentheses optional)


const double = num => num *2;

console.log(double(5));


// Arrow Function with no parameters 

const getTimesstamp =() => Date.now();

console.log(getTimesstamp());



// Arrow  testconfig = {
    
    name: "Login Test" ,

    run : (browser)=> {

      console.log(`Runing on ${browser}');
    }
}


 testconfig.run("chorme");  // Running on chrome .


  Higher-Order Functions & Callbacks

  // Function that takes another function as parameter

function executTest (testName, callBack)
{

  console.log(`Starting: ${testName}`);

  callback();  // execute the callback

  console.log(`Finish : ${testName});


   
}


// pass a function as callback 

executeTest("Login Test" , ()=> {

  console.log("Test logic here");
});



// callback with parameters

  function processTestResult (results, processFunction){
    results.forEach(result =>{

      processFunction(result);
    })
  }


const testResults =[

  {name :"Login",passed:true},
  {name:"Logout",passed:false},
  {name:"cart",passed:true}
];

processTestResult(testResults, (result)=>{

   console.log(`${result.name}: ${result.passed ? "✅ PASSED" : "❌ FAILED"}`);
});

 Rest Parameters (...) — Accept Multiple Arguments

 // Rest parameter collects remaining arguments into array
function runMultipleTests(...testNames) {
  console.log(`Running ${testNames.length} tests`);
  testNames.forEach(name => console.log(`- ${name}`));
}

runMultipleTests("Login", "Logout", "Cart", "Checkout");
// Running 4 tests
// - Login
// - Logout
// - Cart
// - Checkout

// Mix regular and rest parameters
function generateReport(title, ...results) {
  console.log(`Report: ${title}`);
  console.log(`Total results: ${results.length}`);
}

generateReport("E2E Report", "passed", "failed", "pending");


1️⃣ for Loop — Classical Loop

// Basic for loop
for (let i = 0; i < 3; i++) {
  console.log("Iteration:", i);
}
// 0, 1, 2

// Loop through array
const browsers = ["Chrome", "Firefox", "Safari"];
for (let i = 0; i < browsers.length; i++) {
  console.log(`Browser ${i}: ${browsers[i]}`);
}

// Loop with condition
for (let i = 0; i < 10; i++) {
  if (i === 5) break;  // exit loop
  console.log(i);      // 0, 1, 2, 3, 4
}

// Skip iteration
for (let i = 0; i < 5; i++) {
  if (i === 2) continue;  // skip this iteration
  console.log(i);         // 0, 1, 3, 4
}

2️⃣ while Loop — Loop While Condition True

// Basic while loop
let count = 0;
while (count < 3) {
  console.log("Count:", count);
  count++;
}

// Retry logic (common in SDET)
let retries = 0;
let testPassed = false;

while (retries < 3 && !testPassed) {
  console.log(`Attempt ${retries + 1}`);
  // test logic
  testPassed = true;  // assume it passed
  retries++;
}

console.log("Test passed after", retries, "attempts");

3️⃣ forEach — Loop Through Arrays (Most Used in Tests)

const testCases = ["Login", "Logout", "Cart"];

testCases.forEach((testName, index) => {
  console.log(`${index}: ${testName}`);
});

// With objects
const users = [
  { username: "admin", role: "admin" },
  { username: "user", role: "user" }
];

users.forEach(user => {
  console.log(`${user.username} is ${user.role}`);
});

4️⃣ if/else — Conditional Execution

const testStatus = "passed";

if (testStatus === "passed") {
  console.log("✅ Test passed");
} else if (testStatus === "failed") {
  console.log("❌ Test failed");
} else {
  console.log("⏳ Test pending");
}

// Ternary operator (one-liner)
const message = testStatus === "passed" ? "✅ Passed" : "❌ Failed";
console.log(message);


5️⃣ switch — Multiple Conditions


const browser = "Firefox";

switch (browser) {
  case "Chrome":
    console.log("Opening Chrome");
    break;
  case "Firefox":
    console.log("Opening Firefox");
    break;
  case "Safari":
    console.log("Opening Safari");
    break;
  default:
    console.log("Unknown browser");
}


# Day 7 

1️⃣ Template Literals (Deep Dive)


// You learned this in Day 1, but now go deeper

// Multi-line strings (perfect for test reports)
const testReport = `
=================================
TEST EXECUTION REPORT
=================================
Test Name:    Login Test
Status:       PASSED
Duration:     2500ms
Browser:      Chrome
Environment:  QA
=================================
`;
console.log(testReport);

// Tagged template literals (advanced, nice-to-know)
function testTag(strings, ...values) {
  return strings[0] + values[0] + strings[1];
}

const testName = "Login";
const result = testTag`Test: ${testName} Status: PASSED`;
console.log(result);  // Test: Login Status: PASSED


2️⃣ Optional Chaining (?.) — Safe Property Access

// Without optional chaining (dangerous)
const user = { name: "John" };
console.log(user.profile.email);  // ❌ Error: Cannot read property 'email'

// With optional chaining (safe)
console.log(user?.profile?.email);  // undefined (no error)

// Real SDET use case
const apiResponse = {
  status: 200,
  data: {
    user: {
      username: "admin"
    }
  }
};

// Safe access without checking every level
console.log(apiResponse?.data?.user?.username);  // admin
console.log(apiResponse?.data?.missing?.field);  // undefined (safe)


3️⃣ Nullish Coalescing (??) — Default Values


// || vs ?? difference
const config = {
  timeout: 0,  // valid but falsy
  retries: null
};

console.log(config.timeout || 30000);   // 30000 (treats 0 as falsy)
console.log(config.timeout ?? 30000);   // 0 (only treats null/undefined as nullish)

console.log(config.retries || 3);       // 3
console.log(config.retries ?? 3);       // 3

// In SDET: Always use ?? for defaults
const maxRetries = config.retries ?? 3;  // correct


4️⃣ async/await — Introduction
This is critical for Playwright. Don't memorize now, just understand the concept.

// Promises (old way)
function getUser() {
  return fetch('/api/user').then(r => r.json());
}

// async/await (modern way)
async function getUser() {
  const response = await fetch('/api/user');
  const data = await response.json();
  return data;
}

// In Playwright, every test is async:
test('Login Test', async ({ page }) => {
  await page.goto('https://saucedemo.com');  // wait for navigation
  await page.fill('#username', 'admin');      // wait for input
  await page.click('#submit');                // wait for click
  await expect(page).toHaveURL('/inventory'); // wait for verification
});