import { Sequelize } from 'sequelize';
import mysql from 'mysql2/promise';
import initUserModel from '../users/user.model';
import config from '../config.json'; // Ensure correct path

interface DatabaseConfig {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
}

const db: any = {};

export default db;

async function initialize(): Promise<void> {
    // Extract database configuration
    const { host, port, user, password, database } = config.database;

    // Create database if it doesn't exist
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    await connection.end(); // Close connection after use

    // Connect to database
    const sequelize = new Sequelize(database, user, password, {
        host,
        port,
        dialect: 'mysql',
        logging: false, // Disable logging
    });

    // Initialize models
    db.User = initUserModel(sequelize);

    // Sync all models
    await sequelize.sync({ alter: true });
}

initialize().catch((err) => {
    console.error('Database initialization failed:', err);
});
