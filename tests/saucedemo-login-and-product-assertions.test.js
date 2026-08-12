const { test, expect } = require('@playwright/test');


test('valid and invalid Login', async ({ page }) => {


  await page.goto('https://www.saucedemo.com/');


  await page.getByRole('textbox', { name: 'Username' }).fill('');
  await page.getByRole('textbox', { name: 'Password' }).fill('');
  await page.getByRole('button', { name: 'Login' }).click();

  const errorMessage = await page.getByRole('heading', { name: 'Epic sadface: Username is required' });

  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText('Epic sadface: Username is required');
  //await expect(errorMessage).toContainText('username is required');
  await expect(errorMessage).toContainText('Username is required');

  await page.getByRole('textbox', { name: 'Username' }).fill('');
  await page.getByRole('textbox', { name: 'Password' }).fill('');



  await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
  await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');



});


test('Product Verification', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');
  await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
  await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  const productCount = await page.locator('.inventory_item');
  await expect(productCount).toHaveCount(6);


  const productName = await page.locator('.inventory_item_name').first();

  await expect(productName).toHaveText('Sauce Labs Backpack');

  await expect(productCount).toHaveCount(6);


});

test('Multiple Product Interaction', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');
  await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
  await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  const productCount = await page.locator('.inventory_item');
  await expect(productCount).toHaveCount(6);

  const productName = await page.locator('.inventory_item_name');


  await expect(productName).toHaveCount(6);

  const productNames = await productName.allTextContents();
  productNames.forEach((text) => {
    console.log(text.trim());
  });


  const addToCartButtons = page.getByRole('button', { name: 'Add to cart' });

  await addToCartButtons.nth(0).click();
  await addToCartButtons.nth(1).click();

  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
});

test('Advanced Assertions', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await expect(page).toHaveURL(/.*saucedemo\.com/);

  const usernameInput = page.getByRole('textbox', { name: 'Username' });
  await expect(usernameInput).toHaveAttribute('placeholder', 'Username');

  const loginButton = page.getByRole('button', { name: 'Login' });
  await expect(loginButton).toContainText('Login');

  await page.setContent('<button id="disabledBtn" disabled>Disabled Button</button>');

  const disabledButton = page.locator('#disabledBtn');
  await expect(disabledButton).toBeDisabled();
});

