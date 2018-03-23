import * as express from 'express';
import { Validation, validateSignUp } from '../utils/SignUpValidation';
import { SignUp, User, Gender } from '../db/schema';
import { Hashed, hashPassword } from '../utils/HashPassword';
import { connect } from '../db/connect';
import { QueryResult } from 'pg';
const signUpRouter: express.Router = express.Router();

signUpRouter
    .post('/signup', (req: express.Request, res: express.Response) => {
        const user: any = req.body;

        const validation: boolean | Validation = validateSignUp(user);

        if (typeof validation === 'boolean' && validation === false) {
            return res.status(403).json({ reason: 'Please fill all the required fields before submitting the request' })
        } else {
            const valid: boolean = Object.keys(validation).every((key: string) => (validation as any)[key])

            if (valid) {
                const validInfo: SignUp = { ...user } as SignUp;

                const hashed: Hashed = hashPassword(validInfo.password);

                const validUser: User = {
                    username: validInfo.username,
                    email: validInfo.email,
                    hash: hashed.hash,
                    salt: hashed.salt,
                    birthdate: validInfo.birthdate,
                    gender: Gender[validInfo.gender as any]
                }

                const query: string = 'INSERT INTO users(email, username, hash, salt, gender, birthdate) VALUES($1, $2, $3, $4, $5, $6);'

                connect(query, [validUser.email, validUser.username, validUser.hash, validUser.salt, validUser.gender, validUser.birthdate])
                    .then((result: QueryResult) => {
                        return res.status(200).json({ result });
                    })
                    .catch((error: Error) => {
                        console.log('Got error: ' + error);
                        return res.status(500).json({ error });
                    })

            } else {
                return res
                    .status(403)
                    .json({
                        reason: 'One or more fields are invalid',
                        fields: validation
                    })
            }
        }
    });

export { signUpRouter };