import * as Express from 'express';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const authRouter = Express.Router();

authRouter
    .post('/', (req: Express.Request, res: Express.Response) => {

        const publicKey = readFileSync(resolve(__dirname, typeof process.env.PUBLIC_KEY === 'string' ? process.env.PUBLIC_KEY : ''), {
            encoding: 'utf8',
            flag: 'r'
        });

        const reqPublicKey = req.body.publicKey;

        if (publicKey === reqPublicKey) {
            return res.status(200).json({ message: 'public key matches!' });
        } else {
            return res.status(403).json({ message: 'invalid public key' });
        }
    });

export { authRouter };