"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const LoginValidation_1 = require("../utils/LoginValidation");
const connect_1 = require("../db/connect");
const loginRouter = express.Router();
exports.loginRouter = loginRouter;
loginRouter
    .post('/', (req, res) => {
    const user = req.body;
    const loginValidation = LoginValidation_1.validateLogin(user);
    if (typeof loginValidation === 'boolean' && loginValidation === false) {
        return res.status(403).json({ reason: 'Please fill all the required fields before submitting the request' });
    }
    else {
        if (loginValidation.username && loginValidation.password) {
            const validUser = user;
            const query = 'SELECT * FROM users WHERE username= $1;';
            connect_1.connect(query, [validUser.username])
                .then((result) => {
                if (result.rowCount) {
                    console.log('Found user by username! \n' + JSON.stringify(result));
                    return res.status(200).json({ result });
                }
                return res.status(404).json({ reason: 'User not found' });
            })
                .catch((error) => {
                console.log('OOps! \n' + JSON.stringify(error));
                return res.status(403).json({ error });
            });
        }
        else {
            return res.status(403).json({ reason: 'Invalid combination' });
        }
    }
});
