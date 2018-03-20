import * as path from 'path';
require('dotenv').config({ path: path.resolve(process.cwd(), '../.env') });
import express, { Express, Request, Response } from 'express';
import { connect } from './db/connect';

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

const query = 'SELECT * FROM user_data';
connect(query)
    .then(res => res.rows.map(result => (
        { username: result.username, joined: result.joined }
    )), console.log)
    .then(console.log)

app.get('/api/user', (req: Request, res: Response) => {
    const hostname: string = req.hostname;
    res.header('Access-Control-Allow-Origin', `http://${hostname}:1337`);
    res.json({
        user: {
            username: "diego",
            id: 5,
            message: 'haha'
        }
    })
})

app.listen(port, () => console.log('listening on port ' + port + '...'));