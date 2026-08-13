const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'learning',
    port: Number(process.env.DB_PORT) || 3306,
};

async function main() {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM users');
    console.log(rows);
    await connection.end();
}

main().catch(err => {
    console.error('Error:', err);
});
