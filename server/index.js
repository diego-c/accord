"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const port = process.env.PORT || 3000;
app.get('/api/user', (_, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:1337');
    res.json({
        user: {
            username: "diego",
            id: 5,
            message: 'haha'
        }
    });
});
app.listen(port, () => console.log('listening on port ' + port + '...'));
