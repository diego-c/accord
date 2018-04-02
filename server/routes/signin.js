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
const LoginValidation_1 = require("../utils/LoginValidation");
const ValidationError_1 = require("../errors/ValidationError");
const UserNotFoundError_1 = require("../errors/UserNotFoundError");
const loginRouter = express.Router();
exports.loginRouter = loginRouter;
const jsonwebtoken_1 = require("jsonwebtoken");
const fs_1 = require("fs");
const path_1 = require("path");
loginRouter
    .post('/signin', (req, res) => {
    const user = req.body;
    const loginValidation = BasicLoginValidation_1.validateLogin(user);
    if (typeof loginValidation === 'boolean' && loginValidation === false) {
        return res.status(403).json({ reason: 'ValidationError', message: 'Please fill all the required fields before submitting the request' });
    }
    else {
        if (loginValidation.username && loginValidation.password) {
            const validUser = user;
            LoginValidation_1.checkUser(validUser)
                .then(checked => {
                if (!(checked instanceof Error)) {
                    const publicKey = fs_1.readFileSync(path_1.resolve(__dirname, typeof process.env.PUBLIC_KEY === 'string' ? process.env.PUBLIC_KEY : ''), {
                        encoding: 'utf8',
                        flag: 'r'
                    });
                    const privateKey = fs_1.readFileSync(path_1.resolve(__dirname, typeof process.env.PRIVATE_KEY === 'string' ? process.env.PRIVATE_KEY : ''), {
                        encoding: 'utf8',
                        flag: 'r'
                    });
                    jsonwebtoken_1.sign({
                        username: checked.username,
                        'global_role': checked.global_role
                    }, privateKey, {
                        algorithm: 'RS512',
                        expiresIn: '3 days'
                    }, (err, token) => {
                        if (err)
                            return res.status(500).json({ reason: err.name, message: err.message });
                        return res.status(200).json({ token, 'public_key': publicKey });
                    });
                }
                else {
                    if (checked instanceof ValidationError_1.ValidationError) {
                        return res.status(403).json({ reason: checked.name, message: 'Invalid password' });
                    }
                    else if (checked instanceof UserNotFoundError_1.UserNotFoundError) {
                        return res.status(404).json({ reason: checked.name, message: 'No user with the specified username was found' });
                    }
                    else {
                        return res.status(500).json({ reason: checked.name, message: checked.message });
                    }
                }
            })
                .catch((err) => {
                return res.status(500).json({ reason: err.name, message: err.message });
            });
        }
        else {
            return res.status(403).json({ reason: 'ValidationError', message: 'Invalid username / password combination' });
        }
    }
});
