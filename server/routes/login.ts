import * as express from 'express';
import { Router } from 'express';
import { LoginValidation, validateLogin } from '../utils/LoginValidation';
import { connect } from '../db/connect';
import { Login } from '../db/schema';
import { QueryResult } from 'pg';
const loginRouter: Router = express.Router();

loginRouter
    .post('/', (req: express.Request, res: express.Response) => {
        const user: any = req.body;

        const loginValidation: LoginValidation | boolean = validateLogin(user);

        if (typeof loginValidation === 'boolean' && loginValidation === false) {
            return res.status(403).json({ reason: 'Please fill all the required fields before submitting the request' })
        } else {
            if ((loginValidation as LoginValidation).email && (loginValidation as LoginValidation).password) {
                const validUser: Login = user;
                const query: string = 'SELECT * FROM users WHERE email= $1;';
                connect(query, [validUser.email])
                    .then((result: QueryResult) => {
                        if (result.rowCount) {
                            console.log('Found user by email! \n' + JSON.stringify(result.fields));
                            return res.status(200).json({ result });
                        }
                        return res.status(404).json({ reason: 'User not found' });
                    })
                    .catch((error: Error) => {
                        console.log('OOps! \n' + JSON.stringify(error));
                        return res.status(403).json({ error })
                    })
            }
            else if ((loginValidation as LoginValidation).username && (loginValidation as LoginValidation).password) {
                const validUser: Login = user;
                const query: string = 'SELECT * FROM users WHERE username= $1;';
                connect(query, [validUser.username])
                    .then((result: QueryResult) => {
                        if (result.rowCount) {
                            console.log('Found user by username! \n' + JSON.stringify(result));
                            return res.status(200).json({ result });
                        }
                        return res.status(404).json({ reason: 'User not found' });
                    })
                    .catch((error: Error) => {
                        console.log('OOps! \n' + JSON.stringify(error));
                        return res.status(403).json({ error })
                    })
            } else {
                return res.status(403).json({ reason: 'Invalid combination' });
            }
        }
    })

export { loginRouter };