"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = require("../db/connect");
const HashPassword_1 = require("./HashPassword");
const UserNotFoundError_1 = require("../errors/UserNotFoundError");
const ValidationError_1 = require("../errors/ValidationError");
function checkUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = 'SELECT * FROM users WHERE username=$1;';
        let foundUser = null;
        return yield connect_1.connect(query, [user.username])
            .then((result) => {
            if (result.rowCount) {
                foundUser = result.rows[0];
                const validSalt = foundUser.salt;
                const validHash = foundUser.hash;
                if (HashPassword_1.hashPassword(user.password, validSalt).hash === validHash) {
                    return foundUser;
                }
                else {
                    throw new ValidationError_1.ValidationError('Invalid password');
                }
            }
            else {
                throw new UserNotFoundError_1.UserNotFoundError('User not found!');
            }
        })
            .catch((err) => {
            return err;
        });
        // return foundUser;
    });
}
exports.checkUser = checkUser;
