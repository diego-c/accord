"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
function generateSalt(len) {
    let salt;
    try {
        salt = crypto_1.default.randomBytes(len);
        return salt.toString('hex');
    }
    catch (err) {
        throw new Error('Error while attempting to generate salt: \n' + err);
    }
}
function hashPassword(password) {
    let hashed, salt = generateSalt(typeof process.env.SALTLEN === 'number' ? process.env.SALTLEN : 50), hash;
    try {
        hash = crypto_1.default.pbkdf2Sync(password, salt, typeof process.env.ITERATIONS === 'number' ? process.env.ITERATIONS : 10000, typeof process.env.KEYLEN === 'number' ? process.env.KEYLEN : 256, 'sha512');
        hashed = {
            hash: hash.toString('hex'),
            salt
        };
        return hashed;
    }
    catch (err) {
        throw new Error('Error while attempting to hash password: \n' + err);
    }
}
exports.hashPassword = hashPassword;
