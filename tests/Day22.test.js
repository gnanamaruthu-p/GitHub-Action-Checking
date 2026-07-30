const {test,expect} = require ('@playwright/test');


test.before ('Open Website', async ({page})=>{

    await page.goto('https://www.srcscbse.ac.in/');

    console.log('Home Page Loaded Successfully...');
});


