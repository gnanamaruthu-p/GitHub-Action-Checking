// 7 data types of variables in JavaScript

// 1.string

const testname ="Login Test";
const baseurl="https://google.com";


console.log(testname);
console.log(baseurl);


//2.number
const number=3000;
const reties=3;

console.log(number);
console.log(reties);

//3.boolean

const isHeadless=true;

const haspassed=false;

console.log(isHeadless);
console.log(haspassed);


//4.undefined

let username;

console.log(username);

//5.null

const password=null;

console.log(password);

//6.object

const user={name:"John",age:30,city:"New York"};

console.log(user);

//7.Array

const fruits=["apple","banana","orange"];

console.log(fruits);



//2. Typeof - your debugging tool

const response = { 

    status: 200,
    success: true,
    message: "Login successful",
    data: null,
    token:"2323feefe"

};

console.log(typeof response.status); // number
console.log(typeof response.success);// boolean
console.log(typeof response.message);// string
console.log(typeof response.data);// object  <- null quirk 
console.log(typeof response.token);// string


//3. Type Coercion — Common Bug Source

console.log("5" +5);  //55   <- String concatenation 
console.log("5" - 5);  //0   <- convert string to number
console.log(true +1); //2    <- true =1
console.log(false +1); //1   <- false=0 

    console.log(5=="5"); //true  <- type coercion
    console.log(5==="5"); //false <- safe! checks type AND value . 
    
console.log(typeof "30000");
console.log(typeof 30000);
console.log(typeof null);
console.log(typeof undefined);


console.log(typeof true);




 console.log("----day 2 tasks----");
// Tasks day 2

const MyName="John Doe";
const MyAge=30;
const isMarried=false;
let MyAddress=null;
let HeorShe=undefined;

const user1 ={oneperson:"John Doe",age:30};

const fruits2=["apple","banana","orange"];

console.log(MyName)
console.log(MyAge)
console.log(isMarried)
console.log(MyAddress)
console.log(HeorShe)
console.log(user1)
console.log(fruits2)


console.log(typeof MyName);
console.log(typeof MyAge);
console.log(typeof isMarried);  
console.log(typeof MyAddress);
console.log(typeof HeorShe);
console.log(typeof user1);
console.log(typeof fruits2);

const Namme="John Doe";
const MyAgee=30;

console.log("name"==Namme); //true
console.log("name"===Namme); //false
console.log(30==MyAgee); //true
console.log(30===MyAgee); //true

const data= require("./testData.json");
console.log(data[0].username);



