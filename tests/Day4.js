const localconfig={

    browser: "chrome",
    timeout: 300000
}

const stagingconfig={

    browser: "firefox",
    timeout: 45000
}

const productionconfig={
    browser: "safari",
    timeout: 60000
}

const {browser,timeout}=productionconfig;

console.log(browser);
console.log(timeout);

const {browser:browser2, timeout:timeout2}=stagingconfig;
console.log(browser2);
console.log(timeout2);

const {browser:browser3 , timeout:timeout3}=localconfig;
console.log(browser3);
console.log(timeout3);

const customConfig={
    ...localconfig,
    timeout: 50000,

}


const user=[
    {
   username: "John",
   password: "secret123",
   role: "admin"
    },

    {
   username: "Mike",
   password: "user123",
   role: "user"
 },

 {
   username: "Sara",
   password: "manager123",
   role: "manager"
 }
];

user.forEach(({username,password,role}) =>{

    console.log(
  `${username} | ${password} | ${role}`
 );

});


const defaultResponse ={

    Name : "Unknown",
    Age : 0,
    Country : "Unknown"
}

const apiResponse ={
    Name : "Alice",
    Age : 30,
    Country : "USA"
}

const finalResponse = {...defaultResponse,...apiResponse};

console.log(finalResponse);

