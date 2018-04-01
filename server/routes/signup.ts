import * as express from 'express';
import { SignUpValidation, validateSignUp } from '../utils/BasicSignUpValidation';
import { signUpValidation } from '../utils/SignUpValidation';
import { ValidationError } from '../errors/ValidationError';
import { UsernameAlreadyInUseError } from '../errors/UsernameAlreadyInUseError';
import { BasicUser, SignUp, GlobalRole } from '../db/schema';
import { Hashed, hashPassword } from '../utils/HashPassword';
import { connect } from '../db/connect';
import { QueryResult } from 'pg';
import { EmailAlreadyInUseError } from '../errors/EmailAlreadyInUseError';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { sign } from 'jsonwebtoken';
const signUpRouter: express.Router = express.Router();

signUpRouter
    .post('/', (req: express.Request, res: express.Response) => {
        const user: any = req.body;

        const validation: boolean | SignUpValidation = validateSignUp(user);

        if (typeof validation === 'boolean' && validation === false) {
            return res.status(403).json({ reason: 'ValidationError', message: 'Please fill all the required fields before submitting the request' });
        } else {
            signUpValidation(user)
                .then(response => {
                    if (response instanceof ValidationError) {
                        console.log('OOps! One or more fields are invalid');
                        return res.status(403).json({ reason: response.name, message: response.message });
                    } else if (response instanceof UsernameAlreadyInUseError) {
                        return res.status(403).json({ reason: response.name, message: response.message });
                    } else if (response instanceof EmailAlreadyInUseError) {
                        return res.status(403).json({ reason: response.name, message: response.message });
                    } else if (response instanceof Error) {
                        return res.status(500).json({ reason: response.name, message: response.message });
                    } else {
                        const validInfo: SignUp = response as SignUp;

                        const hashed: Hashed = hashPassword(validInfo.password);
                        const validUser: BasicUser = {
                            username: validInfo.username,
                            email: validInfo.email,
                            hash: hashed.hash,
                            salt: hashed.salt,
                            birthdate: validInfo.birthdate,
                            gender: validInfo.gender
                        }

                        const query: string = 'INSERT INTO users(email, username, hash, salt, gender, birthdate) VALUES($1, $2, $3, $4, $5, $6);';

                        connect(query, [validUser.email, validUser.username, validUser.hash, validUser.salt, validUser.gender, validUser.birthdate])
                            .then((result: QueryResult) => {
                                const publicKey = readFileSync(resolve(__dirname, typeof process.env.PUBLIC_KEY === 'string' ? process.env.PUBLIC_KEY : ''), {
                                    encoding: 'utf8',
                                    flag: 'r'
                                });

                                const privateKey = readFileSync(resolve(__dirname, typeof process.env.PRIVATE_KEY === 'string' ? process.env.PRIVATE_KEY : ''), {
                                    encoding: 'utf8',
                                    flag: 'r'
                                });

                                sign({
                                    username: validUser.username,
                                    'global_role': GlobalRole.NOOB
                                }, privateKey, {
                                        algorithm: 'RS512',
                                        expiresIn: '3 days'
                                    }, (err: Error, token: any) => {

                                        if (err || !result.rowCount) return res.status(500).json({ reason: err.name, message: err.message });

                                        return res.status(200).json({ token, 'public_key': publicKey });
                                    });
                            })
                            .catch((err: Error) => {
                                return res.status(500).json({ reason: err.name, message: err.message });
                            })
                    }
                })
                .catch((err: Error) => {
                    if (err.name === 'ValidationError') {
                        return res.status(403).json({ reason: err.name, message: err.message });
                    } else {
                        return res.status(500).json({ reason: err.name, message: err.message })
                    }
                })
        }
    });

export { signUpRouter };