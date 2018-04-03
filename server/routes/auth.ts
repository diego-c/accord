import * as Express from 'express';
import { verify } from 'jsonwebtoken';
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
        const reqToken = req.body.token;

        verify(reqToken, publicKey, {
            algorithms: ['RS512'],
            ignoreExpiration: false
        }, (err, decoded) => {
            if (err) return res.status(403).json({ reason: err.name, message: err.message });

            if (publicKey === reqPublicKey) {
                return res.status(200).json({ message: 'public key matches!', token: decoded });
            } else {
                return res.status(403).json({ message: 'invalid public key' });
            }
        })
    });


export { authRouter };