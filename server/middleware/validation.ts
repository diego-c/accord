import { Request, Response, NextFunction } from 'express';
// import { ValidationError } from '../errors/ValidationError';

export function validateUser(req: Request, _: Response, next: NextFunction) {
    console.log('Req.body from validation: ' + JSON.stringify(req.body, null, 2));
    const isValid = Boolean(req.body && req.body.username && req.body.email && req.body.password && req.body.birthdate);

    console.log('validation from validateUser middleware: ' + isValid);
    if (isValid) {
        next();
    } else {
        console.log('oops, not valid');
        // next(new ValidationError('Incorrect sign up info \n'))
    }
}