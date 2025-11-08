import pkg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

let pool = null;

async function createPool(){
    const {Pool} = pkg

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Try to find .env in current or parent folder
    const localEnvPath = path.resolve(__dirname, '.env');
    const parentEnvPath = path.resolve(__dirname, '../.env');

    if (fs.existsSync(localEnvPath)) {
    dotenv.config({ path: localEnvPath });
    } else if (fs.existsSync(parentEnvPath)) {
    dotenv.config({ path: parentEnvPath });
    } else {
    console.warn('.env file not found using defaults');
    }

    const pool = new Pool({
        user: process.env.POSTGRES_USER,
        host: 'localhost',
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        port: 5433
    });

    return await pool;
}

export default async function query(queryText, params){
    if (!pool){
        pool = await createPool();
    }
    const client = await pool.connect();
    let result;
    try{
        await client.query('BEGIN');        
        result = await client.query(queryText, params);
        await client.query('COMMIT')
    }
    catch (err){
        await client.query('ROLLBACK')
    } finally {
        client.release();
    }
    return result;
}