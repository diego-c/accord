import * as express from 'express';
// import { connect } from '../db/connect';
// import { User, Login } from '../db/schema';
const router: express.Router = express.Router();

router
    .post('/signup', (req: express.Request, res: express.Response) => {
        const user = req.body;

        console.log('New User: \n' + JSON.stringify(user, null, 2));
        res.json(user);
    });

export { router };