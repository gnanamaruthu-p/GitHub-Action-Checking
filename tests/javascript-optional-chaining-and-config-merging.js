const testConfig = {

    browser : "Chrome",
    timeout : 10000,
    retries : 3,
    environment :"QA" 
}

console.log("Test Config :" , testConfig?.timeout);

console.log("Test Config:" , testConfig?.environment );



const testcases = [
{ name : "Test1", priority : "high" , duration : 10000 , enabled : true },
{ name : "Test2", priority : "medium" , duration : 20000 , enabled : false },
{ name : "Test3", priority : "high" , duration : 30000 , enabled : true },
];

testcases.forEach(({name , priority , duration, enabled}) =>{
    
    if(!enabled){

        console.log(`Skipping ${name}`);
        return;
    }

    console.log(`
        Executing test 
        
        Name :${name}
        priority :${priority}
        Duration :${duration}
        status : Running `);

});


const testReport =` 

Test Report
-----------

test name: Login Test, 
status:passed, 
duration:30000, 
browser:chrome, 
environment:QA
`;

console.log(testReport);


let zero = 0;

let one = 1;

let two =null;

console.log("checking 1", zero || 3000);

console.log ("checking :", zero ?? 3000);

console.log ("checking :", one || 30000);

console.log ("checking :", one ?? 30000);

console.log ("checking :", two || 30000);

console.log ("checking :", two ?? 30000); 



const baseconfig = {

    basebrower : "Firefox",
    baseTime : 3000,
    BaseRetry : 3

};

const finalConfig = {

    finalbrowser:"Edged",
    FinalTime :4000,
    FinalRetry:4
};


function day7(baseconfig,finalConfig){

    const merge ={
        ...baseconfig,...finalConfig
    };

    console.log(merge);
};

day7(baseconfig,finalConfig);


const destructure = baseconfig?.BaseRetry;

const destructuring = finalConfig?.FinalTime;

console.log("first check:", destructure);

console.log("Second check:", destructuring);


const { finalbrowser, FinalRetry } = finalConfig;

console.log(finalbrowser);
    
// Task 6

function prepareTestExecution(baseConfig, overrideConfig) {

  // Spread operator - merge configurations
  const finalConfig = {
    ...baseConfig,
    ...overrideConfig
  };

  // Destructuring - extract values
  const {
    browser,
    timeout,
    retries,
    environment,
    reporter
  } = finalConfig;

  // Optional chaining - safely access nested properties
  const reporterType =
    reporter?.type ?? "Not Configured";

  const reportPath =
    reporter?.output?.path ?? "No Path";

  // Ternary operator - display status
  const status =
    finalConfig.headless
      ? "🤖 Headless Mode"
      : "🖥️ Headed Mode";

  console.log(`
========== TEST CONFIG ==========
Browser      : ${browser}
Timeout      : ${timeout}
Retries      : ${retries}
Environment  : ${environment}
Reporter     : ${reporterType}
Report Path  : ${reportPath}
Execution    : ${status}
=================================
`);

  return finalConfig;
}

// Example data

const baseConfig = {
  browser: "Chrome",
  timeout: 30000,
  retries: 2,
  environment: "QA",

  reporter: {
    type: "HTML",
    output: {
      path: "./reports"
    }
  },

  headless: true
};

const overrideConfig = {
  browser: "Edge",
  environment: "Staging",
  headless: false
};

// Function call

prepareTestExecution(
  baseConfig,
  overrideConfig
);


async function runTest() {

  console.log("Starting test execution...");

  const testName = "Login Test";

  console.log(`Executing: ${testName}`);

 
  return "Test Passed";
}



runTest();