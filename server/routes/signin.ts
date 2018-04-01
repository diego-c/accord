import * as express from 'express';
import { Router } from 'express';
import { LoginValidation, validateLogin } from '../utils/BasicLoginValidation';
import { Login } from '../db/schema';
import { checkUser } from '../utils/LoginValidation';
import { ValidationError } from '../errors/ValidationError';
import { UserNotFoundError } from '../errors/UserNotFoundError';
const loginRouter: Router = express.Router();
import { sign } from 'jsonwebtoken';
import { readFileSync } from 'fs';
import { resolve } from 'path';

loginRouter
    .post('/', (req: express.Request, res: express.Response) => {
        const user: any = req.body;

        const loginValidation: LoginValidation | boolean = validateLogin(user);

        if (typeof loginValidation === 'boolean' && loginValidation === false) {
            return res.status(403).json({ reason: 'ValidationError', message: 'Please fill all the required fields before submitting the request' })
        } else {
            if ((loginValidation as LoginValidation).username && (loginValidation as LoginValidation).password) {
                const validUser: Login = user;

                checkUser(validUser)
                    .then(checked => {
                        if (!(checked instanceof Error)) {
                            const publicKey = readFileSync(resolve(__dirname, typeof process.env.PUBLIC_KEY === 'string' ? process.env.PUBLIC_KEY : ''), {
                                encoding: 'utf8',
                                flag: 'r'
                            });

                            const privateKey = readFileSync(resolve(__dirname, typeof process.env.PRIVATE_KEY === 'string' ? process.env.PRIVATE_KEY : ''), {
                                encoding: 'utf8',
                                flag: 'r'
                            });

                            sign({
                                username: checked.username,
                                'global_role': checked.global_role
                            }, privateKey, {
                                    algorithm: 'RS512',
                                    expiresIn: '3 days'
                                }, (err: Error, token: any) => {

                                    if (err) return res.status(500).json({ reason: err.name, message: err.message });

                                    return res.status(200).json({ token, 'public_key': publicKey });
                                });
                        } else {
                            if (checked instanceof ValidationError) {
                                return res.status(403).json({ reason: checked.name, message: 'Invalid password' });
                            } else if (checked instanceof UserNotFoundError) {
                                return res.status(404).json({ reason: checked.name, message: 'No user with the specified username was found' });
                            } else {
                                return res.status(500).json({ reason: checked.name, message: checked.message });
                            }
                        }
                    })
                    .catch((err: Error) => {
                        return res.status(500).json({ reason: err.name, message: err.message });
                    })

            } else {
                return res.status(403).json({ reason: 'ValidationError', message: 'Invalid username / password combination' })
            }
        }
    })

export { loginRouter };