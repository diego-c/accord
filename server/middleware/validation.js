"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { ValidationError } from '../errors/ValidationError';
function validateUser(req, _, next) {
    console.log('Req.body from validation: ' + JSON.stringify(req.body, null, 2));
    const isValid = Boolean(req.body && req.body.username && req.body.email && req.body.password && req.body.birthdate);
    console.log('validation from validateUser middleware: ' + isValid);
    if (isValid) {
        next();
    }
    else {
        console.log('oops, not valid');
        // next(new ValidationError('Incorrect sign up info \n'))
    }
}
exports.validateUser = validateUser;
