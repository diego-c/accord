"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
require('dotenv').config({ path: path.resolve(process.cwd(), '../.env') });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes/routes");
const cors_1 = require("./middleware/cors");
// import { validateUser } from './middleware/validation';
// import { connect } from './db/connect';
const app = express_1.default();
const port = process.env.PORT || 3000;
app.use('/api', cors_1.cors, express_1.default.json(), routes_1.router);
app.listen(port, () => console.log('listening on port ' + port + '...'));
