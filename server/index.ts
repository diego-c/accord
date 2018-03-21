import * as path from 'path';
require('dotenv').config({ path: path.resolve(process.cwd(), '../.env') });
import express, { Express, Request, Response } from 'express';
import { connect } from './db/connect';

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.get('/api/user', (req: Request, res: Response) => {
    const hostname: string = req.hostname;
    res.header('Access-Control-Allow-Origin', `http://${hostname}:1337`);

    connect('SELECT * FROM user_data')
        .then(result => result.rows.map(row => ({
            username: row.username,
            joined: row.joined
        })))
        .then(users => res.status(200).json(users))
        .catch(console.log)
})

app.listen(port, () => console.log('listening on port ' + port + '...'));