const express = require('express');
const router = express.Router();
const db = require('../db');

/*
GET ALL ORDERS
GET /orders
*/
router.get('/', async (req, res) => {

    try {

        const [rows] = await db.execute(
            'SELECT * FROM orders'
        );

        res.status(200).json(rows);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

/*
GET ORDER BY ID
GET /orders/:id
*/
router.get('/:id', async (req, res) => {

    try {

        const id = req.params.id;

        const [rows] = await db.execute(
            'SELECT * FROM orders WHERE id = ?',
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: 'Order not found'
            });
        }

        res.status(200).json(rows[0]);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

/*
CREATE ORDER
POST /orders
*/
router.post('/', async (req, res) => {

    try {

        const { user_id, product_id, quantity } = req.body;

        const [result] = await db.execute(
            `INSERT INTO orders
            (user_id, product_id, quantity)
            VALUES (?, ?, ?)`,
            [user_id, product_id, quantity]
        );

        res.status(201).json({
            message: 'Order Created',
            id: result.insertId
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

/*
UPDATE ORDER
PUT /orders/:id
*/
router.put('/:id', async (req, res) => {

    try {

        const id = req.params.id;

        const { user_id, product_id, quantity } = req.body;

        const [result] = await db.execute(
            `UPDATE orders
             SET user_id=?, product_id=?, quantity=?
             WHERE id=?`,
            [user_id, product_id, quantity, id]
        );

        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: 'Order not found'
            });

        }

        res.json({
            message: 'Order Updated'
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

/*
PATCH ORDER
PATCH /orders/:id
*/
router.patch('/:id', async (req, res) => {

    try {

        const id = req.params.id;

        const fields = [];
        const values = [];

        for (const key in req.body) {
            fields.push(`${key}=?`);
            values.push(req.body[key]);
        }

        values.push(id);

        const sql = `UPDATE orders SET ${fields.join(', ')} WHERE id=?`;

        const [result] = await db.execute(sql, values);

        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: 'Order not found'
            });

        }

        res.json({
            message: 'Order Partially Updated'
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

/*
DELETE ORDER
DELETE /orders/:id
*/
router.delete('/:id', async (req, res) => {

    try {

        const id = req.params.id;

        const [result] = await db.execute(
            'DELETE FROM orders WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: 'Order not found'
            });

        }

        res.json({
            message: 'Order Deleted'
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;