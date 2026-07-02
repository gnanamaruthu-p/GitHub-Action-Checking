class CartPage {

    constructor(page){
        this.page = page;
        this.cartCount = page.locator('.cart_item')
        this.cartItemName = page.locator('.inventory_item_name');
        this.removeItemButton = page.getByRole('button', { name: 'Remove' });
        this.checkOutbutton =  page.getByRole('button', { name: 'Checkout' });
}


async getCartItemCount(){

  return  await this.cartCount.count();
}

async getCartItemName(index){

   return await this.cartIcon.nth(index).click();
}

async removeItem(index){

    return await this.removeItemButton.nth(index).click();
}


}  