import * as path from 'path';
require('dotenv').config({ path: path.resolve(process.cwd(), '../.env') });
import express from 'express';
import { router } from './routes/routes';
import { cors } from './middleware/cors';
// import { connect } from './db/connect';

const app: express.Express = express();
const port: number | string = process.env.PORT || 3000;

app.use('/api', cors, express.json(), router);

app.listen(port, () => console.log('listening on port ' + port + '...'));