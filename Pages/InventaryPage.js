class InventoryPage {
    constructor(page) {
        this.page = page;
        this.url = 'https://www.saucedemo.com/inventory.html';
        this.products = page.locator('.inventory_item');
        this.productNames = page.locator('.inventory_item_name');
        this.addToCartButtons = page.getByRole('button', { name: /Add to cart/i });
        this.removeButtons = page.getByRole('button', { name: /Remove/i });
        this.cartBadge = page.locator('.shopping_cart_badge');
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async getProductCount() {
        return await this.products.count();
    }

    async getProductName(index) {
        return await this.productNames.nth(index).textContent();
    }

    async addToCart(index) {
        await this.addToCartButtons.nth(index).click();
    }

    async removeFromCart(index) {
        await this.removeButtons.nth(index).click();
    }

    async getCartCount() {
        if (await this.cartBadge.count() === 0) {
            return 0;
        }
        const value = await this.cartBadge.textContent();
        return value ? Number(value.trim()) : 0;
    }
}

module.exports = InventoryPage;