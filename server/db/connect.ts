import { Client, QueryResult } from 'pg';

const client: Client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB,
    port: typeof process.env.DB_PORT === 'number' ? process.env.DB_PORT : 6000
});

export const connect = async (query: string) => {
    await client.connect();
    let res: QueryResult;
    try {
        res = await client.query(query);
        return res;
    } catch (err) {
        throw new Error('Sorry, could not connect to the db server \n' + err);
    }
}