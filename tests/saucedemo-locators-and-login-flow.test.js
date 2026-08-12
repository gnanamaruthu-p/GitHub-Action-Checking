// Locators 

//getByRole('button',{name : 'submit'});

//getByText('click me');

//getByPlaceholder('Enter email');

//getByLabel('username');

//locator('#username');  --> csss

//locator('xpath=//button[text()="Lo0gin"]');  -> xpath 


const URL = "https://www.saucedemo.com/";

const { test , expect } = require ('@playwright/test');

test('Open SauceDemo Homepage', async ({page})=>{

    await page.goto (URL);

    await expect(page).toHaveTitle('Swag Labs');

});

test('Verify Login Form Elements' , async ({page}) => {

    await page.goto(URL);

    await expect(page.getByRole('textbox' ,{name:'username'})).toBeVisible();
    await expect(page.getByRole('textbox' ,{name:'password'})).toBeVisible();
    await expect(page.getByRole('button' ,{name:'Login'})).toBeVisible();


});


test('Valid Login Flow', async ({page}) => {
    await page.goto(URL);

    await page.getByRole('textbox', { name: 'username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.inventory_item_name').first()).toBeVisible();
});


