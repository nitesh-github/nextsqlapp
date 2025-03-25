import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

interface DbConfig {
    host: string;
    user: string;
    password: string;
    database: string;
    port: number;
}

const dbConfig: DbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'expadmin',
    port: Number(process.env.DB_PORT) || 3306
};

// Create a database pool connection
const db = mysql.createPool(dbConfig);

export default db;