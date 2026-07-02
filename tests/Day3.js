const testcases =[

    {id:1,Name:"Tiger",priority:"High",passed:true},

    {id:2,Name:"Lion",priority:"Low",passed:false},

    {id:3,Name:"Cat",priority:"Medium",passed:false},

    {id:4,Name:"Dog",priority:"High",passed:true},

    {id:5,Name:"Elephant",priority:"Low",passed:false},
];



console.log(testcases);

testcases.push({id:6,Name:"Monkey",priority:"Medium",passed:true}); // add in the last

console.log(testcases);

testcases.pop(); // remove the last element

console.log(testcases);

testcases.shift(); // remove the first element

console.log(testcases);

testcases.unshift({id:0,Name:"Giraffe",priority:"Low",passed:false}); // add in the first

console.log(testcases);


// check if the element is present or not

console.log(testcases.includes({id:3,Name:"Cat",priority:"Medium",passed:false})); 
// false because it's a different object reference


console.log(testcases.includes(testcases[1])); // true because it's the same object reference

testcases.forEach(testcase =>
    console.log(`testcase:${testcase.name},priority:${testcase.priority},passed:${testcase.passed}`)
);


const testNames = testcases.map(tc => tc.name);
console.log("All tests: " + testNames.join(", "));



