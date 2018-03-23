import * as path from 'path';
require('dotenv').config({ path: path.resolve(process.cwd(), '../.env') });
import express from 'express';
import { signUpRouter } from './routes/signup';
import { cors } from './middleware/cors';

const app: express.Express = express();
const port: number | string = process.env.PORT || 3000;

app.use('/api', cors, express.json(), signUpRouter);

app.listen(port, () => console.log('listening on port ' + port + '...'));