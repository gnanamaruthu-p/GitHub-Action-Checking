const express = require('express');
const router = express.Router();
const db = require('../db');

/*
GET ALL USERS
GET /users
*/
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.execute(
            'SELECT * FROM users'
        );

        res.status(200).json(rows);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

/*
GET USER BY ID
GET /users/:id
*/
router.get('/:id', async (req, res) => {

    try {

        const id = req.params.id;

        const [rows] = await db.execute(
            'SELECT * FROM users WHERE id = ?',
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: 'User not found'
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
CREATE USER
POST /users
*/
router.post('/', async (req, res) => {

    try {

        const { name, username, email } = req.body;

        const [result] = await db.execute(
            'INSERT INTO users(name, username, email) VALUES(?,?,?)',
            [name, username, email]
        );

        res.status(201).json({
            message: 'User Created',
            id: result.insertId
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

/*
UPDATE ENTIRE USER
PUT /users/:id
*/
router.put('/:id', async (req, res) => {

    try {

        const id = req.params.id;

        const { name, username, email } = req.body;

        const [result] = await db.execute(
            `UPDATE users
             SET name=?, username=?, email=?
             WHERE id=?`,
            [name, username, email, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.json({
            message: 'User Updated'
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

/*
PARTIAL UPDATE
PATCH /users/:id
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

        const sql = `UPDATE users SET ${fields.join(', ')} WHERE id=?`;

        const [result] = await db.execute(sql, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.json({
            message: 'User Partially Updated'
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

/*
DELETE USER
DELETE /users/:id
*/
router.delete('/:id', async (req, res) => {

    try {

        const id = req.params.id;

        const [result] = await db.execute(
            'DELETE FROM users WHERE id=?',
            [id]
        );

        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: 'User not found'
            });

        }

        res.json({
            message: 'User Deleted'
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;