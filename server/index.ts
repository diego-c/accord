import * as path from 'path';
require('dotenv').config({ path: path.resolve(process.cwd(), '../.env') });
import express from 'express';
import { signUpRouter } from './routes/signup';
import { cors } from './middleware/cors';
import { loginRouter } from './routes/signin';

const app: express.Express = express();
const port: number | string = process.env.PORT || 3000;

app.use('/api/signup', cors, express.json(), signUpRouter);
app.use('/api/signin', cors, express.json(), loginRouter);

app.listen(port, () => console.log('listening on port ' + port + '...'));