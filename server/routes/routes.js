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
const SignUpValidation_1 = require("../utils/SignUpValidation");
const schema_1 = require("../db/schema");
const HashPassword_1 = require("../utils/HashPassword");
const connect_1 = require("../db/connect");
const router = express.Router();
exports.router = router;
router
    .post('/signup', (req, res) => {
    const user = req.body;
    const validation = SignUpValidation_1.validateSignUp(user);
    if (typeof validation === 'boolean' && validation === false) {
        return res.status(403).json({ reason: 'Please fill all the required fields before submitting the request' });
    }
    else {
        const valid = Object.keys(validation).every((key) => validation[key]);
        if (valid) {
            const validInfo = Object.assign({}, user);
            const hashed = HashPassword_1.hashPassword(validInfo.password);
            const validUser = {
                username: validInfo.username,
                email: validInfo.email,
                hash: hashed.hash,
                salt: hashed.salt,
                birthdate: validInfo.birthdate,
                gender: schema_1.Gender[validInfo.gender]
            };
            const query = 'INSERT INTO users(email, username, hash, salt, gender, birthdate) VALUES($1, $2, $3, $4, $5, $6);';
            connect_1.connect(query, [validUser.email, validUser.username, validUser.hash, validUser.salt, validUser.gender, validUser.birthdate])
                .then((result) => {
                return res.status(200).json({ result });
            })
                .catch((error) => {
                console.log('Got error: ' + error);
                return res.status(500).json({ error });
            });
        }
        else {
            return res
                .status(403)
                .json({
                reason: 'One or more fields are invalid',
                fields: validation
            });
        }
    }
});
