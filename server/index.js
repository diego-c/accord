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
const connect_1 = require("./db/connect");
const app = express_1.default();
const port = process.env.PORT || 3000;
app.get('/api/user', (req, res) => {
    const hostname = req.hostname;
    res.header('Access-Control-Allow-Origin', `http://${hostname}:1337`);
    connect_1.connect('SELECT * FROM user_data')
        .then(result => result.rows.map(row => ({
        username: row.username,
        joined: row.joined
    })))
        .then(users => res.status(200).json(users))
        .catch(console.log);
});
app.listen(port, () => console.log('listening on port ' + port + '...'));
