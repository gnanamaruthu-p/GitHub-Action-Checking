const mysql = require('mysql2/promise');

async function main() {

const connection = await mysql.createConnection({

    host: '127.0.0.1',
    user: 'root',
    password:  'QDSQL',
    database: 'Learning'

});



const [rows] =await connection.execute('select * from Learning');

console.log(rows);


await connection.end();

}

main().catch(err => {   
    console.error('Error:', err);
});

