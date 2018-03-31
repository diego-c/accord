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
const BasicSignUpValidation_1 = require("../utils/BasicSignUpValidation");
const SignUpValidation_1 = require("../utils/SignUpValidation");
const ValidationError_1 = require("../errors/ValidationError");
const UsernameAlreadyInUseError_1 = require("../errors/UsernameAlreadyInUseError");
const HashPassword_1 = require("../utils/HashPassword");
const connect_1 = require("../db/connect");
const EmailAlreadyInUseError_1 = require("../errors/EmailAlreadyInUseError");
const signUpRouter = express.Router();
exports.signUpRouter = signUpRouter;
signUpRouter
    .post('/', (req, res) => {
    const user = req.body;
    const validation = BasicSignUpValidation_1.validateSignUp(user);
    if (typeof validation === 'boolean' && validation === false) {
        return res.status(403).json({ reason: 'ValidationError', message: 'Please fill all the required fields before submitting the request' });
    }
    else {
        SignUpValidation_1.signUpValidation(user)
            .then(response => {
            if (response instanceof ValidationError_1.ValidationError) {
                console.log('OOps! One or more fields are invalid');
                return res.status(403).json({ reason: response.name, message: response.message });
            }
            else if (response instanceof UsernameAlreadyInUseError_1.UsernameAlreadyInUseError) {
                return res.status(403).json({ reason: response.name, message: response.message });
            }
            else if (response instanceof EmailAlreadyInUseError_1.EmailAlreadyInUseError) {
                return res.status(403).json({ reason: response.name, message: response.message });
            }
            else if (response instanceof Error) {
                return res.status(500).json({ reason: response.name, message: response.message });
            }
            else {
                const validInfo = response;
                const hashed = HashPassword_1.hashPassword(validInfo.password);
                const validUser = {
                    username: validInfo.username,
                    email: validInfo.email,
                    hash: hashed.hash,
                    salt: hashed.salt,
                    birthdate: validInfo.birthdate,
                    gender: validInfo.gender
                };
                const query = 'INSERT INTO users(email, username, hash, salt, gender, birthdate) VALUES($1, $2, $3, $4, $5, $6);';
                connect_1.connect(query, [validUser.email, validUser.username, validUser.hash, validUser.salt, validUser.gender, validUser.birthdate])
                    .then((result) => {
                    return res.status(200).json(result);
                })
                    .catch((err) => {
                    return res.status(500).json({ reason: err.name, message: err.message });
                });
            }
        })
            .catch((err) => {
            if (err.name === 'ValidationError') {
                return res.status(403).json({ reason: err.name, message: err.message });
            }
            else {
                return res.status(500).json({ reason: err.name, message: err.message });
            }
        });
    }
});
