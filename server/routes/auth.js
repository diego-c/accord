"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Express = __importStar(require("express"));
const fs_1 = require("fs");
const path_1 = require("path");
const authRouter = Express.Router();
exports.authRouter = authRouter;
authRouter
    .post('/', (req, res) => {
    const publicKey = fs_1.readFileSync(path_1.resolve(__dirname, typeof process.env.PUBLIC_KEY === 'string' ? process.env.PUBLIC_KEY : ''), {
        encoding: 'utf8',
        flag: 'r'
    });
    const reqPublicKey = req.body.publicKey;
    if (publicKey === reqPublicKey) {
        return res.status(200).json({ message: 'public key matches!' });
    }
    else {
        return res.status(403).json({ message: 'invalid public key' });
    }
});
