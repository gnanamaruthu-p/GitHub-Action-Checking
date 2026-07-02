function regularFunction (useName,password){

  return (useName  == password);
}


console.log(regularFunction("Test","Test"));



const generateTest= () => {

  return "Test_" + Math.floor(Math.random()*10000);
};

console.log(generateTest());



function executeTest(testName,callback){

    console.log(`Running : ${testName}`);

    callback();

    console.log(`Completed : ${ testName}`);
};

executeTest ("Login screen" ,()=>{


console.log("Calls callback");

}
);


function  executeTest2(LoginName , callback2){

  console.log("execute ;" ,LoginName);

  callback2();

  console.log("completed :" , LoginName);

}

const browsers =["chrome","firefox","edge"];

executeTest ("First Test" , ()=> {

  browsers.forEach(browser => {
    console.log("browser",browser);
    
  });
})

const browserrs =["brave ", "chrome","opera" , "Test"];


 function runonBrowser(...browserList){

  browserList.forEach(bb =>{

    console.log ("Testing on: " ,bb);
  });
};

runonBrowser(...browserrs);



