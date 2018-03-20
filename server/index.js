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
const query = 'SELECT * FROM user_data';
connect_1.connect(query)
    .then(res => res.rows.map(result => ({ username: result.username, joined: result.joined })), console.log)
    .then(console.log);
app.get('/api/user', (req, res) => {
    const hostname = req.hostname;
    res.header('Access-Control-Allow-Origin', `http://${hostname}:1337`);
    res.json({
        user: {
            username: "diego",
            id: 5,
            message: 'haha'
        }
    });
});
app.listen(port, () => console.log('listening on port ' + port + '...'));
