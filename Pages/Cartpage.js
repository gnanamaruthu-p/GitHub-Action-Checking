class CartPage {

    constructor(page) {
        this.page = page;
        this.cartCount = page.locator('.cart_item')
        this.cartItemName = page.locator('.inventory_item_name');
        this.removeItemButton = page.getByRole('button', { name: 'Remove' });
        this.checkOutbutton = page.getByRole('button', { name: 'Checkout' });
        this.firstNameField = page.getByRole('textbox', { name: 'First Name' });
        this.lastNameField = page.getByRole('textbox', { name: 'Last Name' });
        this.zipcode = page.getByRole('textbox', { name: 'Zip/Postal Code' });
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.finish = page.getByRole('button', { name: 'Finish' });
        this.confirmationMessage = page.getByText('Thank you for your order!');
    }


    async getCartItemCount() {

        return await this.cartCount.count();
    }

    async getCartItemName(index) {
        // Return the product name from the cart item list
        return await this.cartItemName.nth(index).textContent();
    }

    async removeItem(index) {

        return await this.removeItemButton.nth(index).click();
    }

    async checkOut() {
        // Wait for the checkout button to be visible before clicking it
        await this.checkOutbutton.waitFor({ state: 'visible' });
        await this.checkOutbutton.click();
    }

    async fillCheckoutForm(firstName, lastName, zipCode) {
        // Ensure the form fields are ready before entering values
        await this.firstNameField.waitFor({ state: 'visible' });
        await this.lastNameField.waitFor({ state: 'visible' });
        await this.zipcode.waitFor({ state: 'visible' });

        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
        await this.zipcode.fill(zipCode);
    }

    async continueCheckout() {
        // Move from the checkout form to the order overview page
        await this.continueButton.waitFor({ state: 'visible' });
        await this.continueButton.click();
        // Wait until the overview page is loaded before continuing
        await this.page.waitForURL(/checkout-step-two\.html/, { timeout: 10000 });
    }

    async finishCheckout() {
        // Wait for the Finish button to appear before clicking it
        await this.finish.waitFor({ state: 'visible', timeout: 10000 });
        await this.finish.click();
    }

    async getConfirmationMessage() {
        return await this.confirmationMessage.textContent();
    }

};

module.exports = CartPage;