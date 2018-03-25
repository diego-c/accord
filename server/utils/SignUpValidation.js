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
const schema_1 = require("../db/schema");
const BasicSignUpValidation_1 = require("./BasicSignUpValidation");
const ValidationError_1 = require("../errors/ValidationError");
const UsernameAlreadyInUseError_1 = require("../errors/UsernameAlreadyInUseError");
const EmailAlreadyInUseError_1 = require("../errors/EmailAlreadyInUseError");
function signUpValidation(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const validation = BasicSignUpValidation_1.validateSignUp(user);
        if (typeof validation === 'boolean' && validation === false) {
            throw new ValidationError_1.ValidationError('Please fill all the required fields before submitting the request');
        }
        else {
            const valid = Object.keys(validation).every((key) => validation[key]);
            if (valid) {
                const validInfo = (Object
                    .keys(user)
                    .reduce((acc, field) => {
                    if (field === 'gender') {
                        switch (user[field]) {
                            case schema_1.Gender.Female:
                                acc[field] = 'F';
                                return acc;
                            case schema_1.Gender.Male:
                                acc[field] = 'M';
                                return acc;
                            default:
                                acc[field] = null;
                                return acc;
                        }
                    }
                    acc[field] = user[field];
                    return acc;
                }, {}));
                const query = 'SELECT * FROM users WHERE username=$1 OR email=$2;';
                return yield connect_1.connect(query, [validInfo.username, validInfo.email])
                    .then((result) => {
                    if (result.rowCount > 0) {
                        if (result.rows.some((row) => row.username === validInfo.username)) {
                            throw new UsernameAlreadyInUseError_1.UsernameAlreadyInUseError('The username is already in use');
                        }
                        else if (result.rows.some((row) => row.email === validInfo.email)) {
                            throw new EmailAlreadyInUseError_1.EmailAlreadyInUseError('The email is already in use');
                        }
                    }
                    else {
                        return validInfo;
                    }
                })
                    .catch(err => {
                    return err;
                });
            }
            else {
                throw new ValidationError_1.ValidationError('One or more fields are invalid');
            }
        }
    });
}
exports.signUpValidation = signUpValidation;
