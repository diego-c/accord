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
            LoginValidation_1.checkUser(validUser)
                .then(checked => {
                if (!(checked instanceof Error)) {
                    return res.status(200).json({ message: 'Login approved!' });
                }
                else {
                    if (checked instanceof ValidationError_1.ValidationError) {
                        return res.status(403).json({ reason: checked });
                    }
                    else if (checked instanceof UserNotFoundError_1.UserNotFoundError) {
                        return res.status(404).json({ reason: checked });
                    }
                    else {
                        return res.status(500).json({ reason: checked });
                    }
                }
            })
                .catch(err => {
                return res.status(500).json({ reason: err });
            });
        }
        else {
            return res.status(403).json({ reason: 'Invalid username / password combination' });
        }
    }
});
