// DBservice.js
import mysql2 from 'mysql2/promise';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from '../config.js';


const db = mysql2.createPool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 4,
    queueLimit: 0
});


async function bootstrapDB(app, port) {
    try {
        await db.getConnection();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
        console.log("Connected to the database successfully.");

    } catch (err) {
        console.error("Failed to connect to the database:", err);
    }
}

export { db, bootstrapDB };

