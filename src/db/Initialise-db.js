import { pool } from "./index-db.js"
import fs from "fs/promises";

const DDl_path = "src/db/DDL-db.sql";

const InitialiseDb = async () => {
    try {
        const ddl = await fs.readFile(DDl_path, 'utf-8');
        await pool.query(ddl);
        console.log('Database Created')
    } catch (err) {
        console.error(`Database creation failed: ${err}`)
    } finally {
        await pool.end();
    }
};

InitialiseDb()