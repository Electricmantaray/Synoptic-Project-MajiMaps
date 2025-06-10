import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

// Handles the interactions with database using postgresql
const { Pool } = pg;

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.on('connect', async (client) => {
    await client.query('SET search_path TO "MajiMaps"');
});
