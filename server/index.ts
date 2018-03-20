import express, { Express, Response } from 'express';

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.get('/api/user', (_, res: Response) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:1337');
    res.json({
        user: {
            username: "diego",
            id: 5,
            message: 'haha'
        }
    })
})

app.listen(port, () => console.log('listening on port ' + port + '...'));