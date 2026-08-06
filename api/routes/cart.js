const express = require('express');
const router = express.Router();

const cartStore = new Map();

const isPositiveInteger = value => {
    const number = Number(value);
    return Number.isInteger(number) && number > 0;
};

const validateCartPayload = (user_id, product_id, quantity) => {
    if (user_id === undefined || user_id === null || user_id === '') {
        return 'user_id is required and must be a positive integer.';
    }
    if (!isPositiveInteger(user_id)) {
        return 'user_id must be a positive integer.';
    }

    if (product_id === undefined || product_id === null || product_id === '') {
        return 'product_id is required and must be a positive integer.';
    }
    if (!isPositiveInteger(product_id)) {
        return 'product_id must be a positive integer.';
    }

    if (quantity === undefined || quantity === null || quantity === '') {
        return 'quantity is required and must be a positive integer between 1 and 999.';
    }
    if (!isPositiveInteger(quantity)) {
        return 'quantity must be a positive integer between 1 and 999.';
    }
    if (Number(quantity) > 999) {
        return 'quantity must be between 1 and 999.';
    }

    return null;
};

const getCart = userId => {
    if (!cartStore.has(userId)) {
        cartStore.set(userId, new Map());
    }
    return cartStore.get(userId);
};

const getCartItems = userId => {
    const cart = getCart(userId);
    return Array.from(cart.values());
};

const getCartSummary = userId => {
    const items = getCartItems(userId);
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    return {
        items,
        total_items: items.length,
        total_quantity: totalQuantity
    };
};

router.post('/items', (req, res) => {
    const { user_id, product_id, quantity } = req.body;

    const validationError = validateCartPayload(user_id, product_id, quantity);
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    const userId = Number(user_id);
    const productId = Number(product_id);
    const addQuantity = Number(quantity);

    const cart = getCart(userId);
    const existing = cart.get(productId);
    const newQuantity = (existing ? existing.quantity : 0) + addQuantity;

    if (newQuantity > 999) {
        return res.status(400).json({
            message: 'Total quantity for this product cannot exceed 999.'
        });
    }

    cart.set(productId, {
        user_id: userId,
        product_id: productId,
        quantity: newQuantity
    });

    return res.status(201).json({
        message: 'Product added to cart.',
        item: cart.get(productId),
        cart: getCartSummary(userId)
    });
});

router.get('/:user_id', (req, res) => {
    const { user_id } = req.params;

    if (!isPositiveInteger(user_id)) {
        return res.status(400).json({
            message: 'user_id must be a positive integer.'
        });
    }

    const userId = Number(user_id);
    return res.status(200).json(getCartSummary(userId));
});

router.patch('/:user_id/items/:product_id', (req, res) => {
    const { user_id, product_id } = req.params;
    const { quantity } = req.body;

    if (!isPositiveInteger(user_id) || !isPositiveInteger(product_id)) {
        return res.status(400).json({
            message: 'user_id and product_id must be positive integers.'
        });
    }
    if (quantity === undefined || quantity === null || quantity === '') {
        return res.status(400).json({
            message: 'quantity is required and must be a positive integer between 1 and 999.'
        });
    }
    if (!isPositiveInteger(quantity) || Number(quantity) > 999) {
        return res.status(400).json({
            message: 'quantity must be a positive integer between 1 and 999.'
        });
    }

    const userId = Number(user_id);
    const productId = Number(product_id);
    const cart = getCart(userId);

    if (!cart.has(productId)) {
        return res.status(404).json({
            message: 'Product not found in cart.'
        });
    }

    cart.set(productId, {
        user_id: userId,
        product_id: productId,
        quantity: Number(quantity)
    });

    return res.status(200).json({
        message: 'Cart item quantity updated.',
        item: cart.get(productId),
        cart: getCartSummary(userId)
    });
});

router.delete('/:user_id/items/:product_id', (req, res) => {
    const { user_id, product_id } = req.params;

    if (!isPositiveInteger(user_id) || !isPositiveInteger(product_id)) {
        return res.status(400).json({
            message: 'user_id and product_id must be positive integers.'
        });
    }

    const userId = Number(user_id);
    const productId = Number(product_id);
    const cart = getCart(userId);

    if (!cart.has(productId)) {
        return res.status(404).json({
            message: 'Product not found in cart.'
        });
    }

    cart.delete(productId);
    return res.status(200).json({
        message: 'Cart item removed.',
        cart: getCartSummary(userId)
    });
});

router.delete('/:user_id', (req, res) => {
    const { user_id } = req.params;

    if (!isPositiveInteger(user_id)) {
        return res.status(400).json({
            message: 'user_id must be a positive integer.'
        });
    }

    const userId = Number(user_id);
    cartStore.delete(userId);
    return res.status(200).json({
        message: 'Cart cleared.',
        cart: getCartSummary(userId)
    });
});

module.exports = router;
