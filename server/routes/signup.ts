import * as express from 'express';
import { SignUpValidation, validateSignUp } from '../utils/BasicSignUpValidation';
import { SignUp, Gender, BasicUser } from '../db/schema';
import { Hashed, hashPassword } from '../utils/HashPassword';
import { connect } from '../db/connect';
import { QueryResult } from 'pg';
const signUpRouter: express.Router = express.Router();

signUpRouter
    .post('/', (req: express.Request, res: express.Response) => {
        const user: any = req.body;

        const validation: boolean | SignUpValidation = validateSignUp(user);

        if (typeof validation === 'boolean' && validation === false) {
            return res.status(403).json({ reason: 'Please fill all the required fields before submitting the request' })
        } else {
            const valid: boolean = Object.keys(validation).every((key: string) => (validation as any)[key])

            if (valid) {
                const validInfo: SignUp =
                    (Object
                        .keys(user)
                        .reduce((acc: any, field: string) => {
                            if (field === 'gender') {
                                switch (user[field]) {
                                    case Gender.Female:
                                        acc[field] = 'F';
                                        return acc;
                                    case Gender.Male:
                                        acc[field] = 'M';
                                        return acc;
                                    default:
                                        acc[field] = null;
                                        return acc;
                                }
                            }
                            acc[field] = user[field];
                            return acc;
                        }, {})) as SignUp

                const hashed: Hashed = hashPassword(validInfo.password);

                const validUser: BasicUser = {
                    username: validInfo.username,
                    email: validInfo.email,
                    hash: hashed.hash,
                    salt: hashed.salt,
                    birthdate: validInfo.birthdate,
                    gender: validInfo.gender
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