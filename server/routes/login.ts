import * as express from 'express';
import { Router } from 'express';
import { LoginValidation, validateLogin } from '../utils/BasicLoginValidation';
import { Login, User } from '../db/schema';
import { checkUser } from '../utils/LoginValidation';
import { ValidationError } from '../errors/ValidationError';
const loginRouter: Router = express.Router();

loginRouter
    .post('/', (req: express.Request, res: express.Response) => {
        const user: any = req.body;

        const loginValidation: LoginValidation | boolean = validateLogin(user);

        if (typeof loginValidation === 'boolean' && loginValidation === false) {
            return res.status(403).json({ reason: 'Please fill all the required fields before submitting the request' })
        } else {
            if ((loginValidation as LoginValidation).username && (loginValidation as LoginValidation).password) {
                const validUser: Login = user;

                checkUser(validUser)
                    .then(checked => {
                        if (!(checked instanceof Error)) {
                            return res.status(200).json({ message: 'Login approved!' });
                        } else {
                            if (checked instanceof ValidationError) {
                                return res.status(403).json({ reason: checked });
                            } else {
                                return res.status(404).json({ reason: checked });
                            }
                        }
                    })

            } else {
                return res.status(403).json({ reason: 'Invalid username / password combination' })
            }
        }
    })

export { loginRouter };