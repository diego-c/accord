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
const BasicLoginValidation_1 = require("../utils/BasicLoginValidation");
// import { QueryResult } from 'pg';
// import { hashPassword, Hashed } from '../utils/HashPassword';
const LoginValidation_1 = require("../utils/LoginValidation");
const loginRouter = express.Router();
exports.loginRouter = loginRouter;
loginRouter
    .post('/', (req, res) => {
    const user = req.body;
    const loginValidation = BasicLoginValidation_1.validateLogin(user);
    if (typeof loginValidation === 'boolean' && loginValidation === false) {
        return res.status(403).json({ reason: 'Please fill all the required fields before submitting the request' });
    }
    else {
        if (loginValidation.username && loginValidation.password) {
            const validUser = user;
            LoginValidation_1.checkUser(validUser);
            /* const query: string = 'SELECT * FROM users WHERE username= $1;';
            connect(query, [validUser.username])
                .then((result: QueryResult) => {
                    if (result.rowCount) {
                        console.log('Found user by username! \n' + JSON.stringify(result));
                        return res.status(200).json({ result });
                    }
                    return res.status(404).json({ reason: 'User not found' });
                })
                .catch((error: Error) => {
                    console.log('OOps! \n' + JSON.stringify(error));
                    return res.status(403).json({ error })
                }) */
        }
        else {
            return res.status(403).json({ reason: 'Invalid combination' });
        }
    }
});
