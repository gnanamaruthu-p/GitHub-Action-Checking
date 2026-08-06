const express = require('express');
const orderRoutes = require('./routes/orders');
const cartRoutes = require('./routes/cart');
require('dotenv').config();

const userRoutes = require('./routes/users');

const app = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/cart', cartRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}); 


