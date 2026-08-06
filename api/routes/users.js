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

        // Handle duplicate entry from MySQL (unique constraint)
        if (error && (error.code === 'ER_DUP_ENTRY' || error.errno === 1062)) {
            return res.status(409).json({
                message: 'Username or email already exists'
            });
        }

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

        if (!name || !username) {
            return res.status(400).json({
                message: 'Name and username are required.'
            });
        }

        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        let finalEmail = email;

        // Treat missing or whitespace-only email as omitted (apply default)
        if (email === undefined || email === null || String(email).trim() === '') {
            finalEmail = `default-${Date.now()}@gmail.com`;
        } else {
            // validate trimmed email
            const trimmed = String(email).trim();
            if (!gmailRegex.test(trimmed)) {
                // log for debugging when invalid email is received
                console.log('POST /users - invalid email received:', JSON.stringify(req.body));
                return res.status(400).json({
                    message: 'Invalid email. Please provide a valid Gmail address.'
                });
            }
            finalEmail = trimmed;
        }

        // Check for existing username or email to enforce uniqueness at API level
        const [existingRows] = await db.execute(
            'SELECT id FROM users WHERE username = ? OR email = ?',
            [username, finalEmail]
        );

        if (existingRows.length > 0) {
            return res.status(409).json({
                message: 'Username or email already exists'
            });
        }

        const [result] = await db.execute(
            'INSERT INTO users(name, username, email) VALUES(?,?,?)',
            [name, username, finalEmail]
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