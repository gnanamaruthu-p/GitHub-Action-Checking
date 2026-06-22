const testCases = [

    { name:"Test1", timeout : 1000, passed : true},
    { name:"Test2", timeout : 2000, passed : false},
    { name:"Test3", timeout : 3000, passed : true},
    { name:"Test4", timeout : 4000, passed : false},
    { name:"Test5", timeout : 5000, passed : true},
];

for (let i=0 ; i<testCases.length;i++){

    if (testCases[i].passed){
        console.log(`✅ ${testCases[i].name} - ${testCases[i].timeout}ms`);
    }
}

let i = 0;

while (i<3){
    console.log("Attempt X");
    i++;
}


testCases.forEach(testcase => {
    if (testcase.passed == true){
        console.log("passed:",testcase.name);
    }else{

        console.log("Failed:",testcase.name);
    }
});


const testStatus = "passed";

switch (testStatus) {
    case "passed":
        console.log("Executed successfully");
        break;

    case "failed":
        console.log("Test Failed");
        break;

    case "pending":
        console.log("Test skipped");
        break;

    default:
        console.log("invalid tests");
}

let testpassed = false;

console.log(testpassed ? "passed" : "failed");


let testfailed = false ;

let attempt =0;

let retry = 3;

while (!testfailed && attempt < retry){

    attempt ++;
    console.log(`Attempt ${attempt}`);

}

