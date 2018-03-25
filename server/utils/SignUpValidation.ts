import { connect } from '../db/connect';
import { QueryResult } from 'pg';
import { SignUp, Gender, User } from '../db/schema';
import { validateSignUp, SignUpValidation } from './BasicSignUpValidation';
import { ValidationError } from '../errors/ValidationError';
import { UsernameAlreadyInUseError } from '../errors/UsernameAlreadyInUseError';
import { EmailAlreadyInUseError } from '../errors/EmailAlreadyInUseError';

export async function signUpValidation(user: any) {

    const validation: boolean | SignUpValidation = validateSignUp(user);

    if (typeof validation === 'boolean' && validation === false) {
        throw new ValidationError('Please fill all the required fields before submitting the request');
    } else {
        const valid: boolean = Object.keys(validation).every((key: string) => (validation as any)[key])

        if (valid) {
            const validInfo: SignUp =
                (Object
                    .keys(user)
                    .reduce((acc: any, field: string) => {
                        if (field === 'gender') {
                            switch (user[field]) {
                                case Gender.Female:
                                    acc[field] = 'F';
                                    return acc;
                                case Gender.Male:
                                    acc[field] = 'M';
                                    return acc;
                                default:
                                    acc[field] = null;
                                    return acc;
                            }
                        }
                        acc[field] = user[field];
                        return acc;
                    }, {})) as SignUp;

            const query: string = 'SELECT * FROM users WHERE username=$1 OR email=$2;';

            return await connect(query, [validInfo.username, validInfo.email])
                .then((result: QueryResult) => {
                    if (result.rowCount > 0) {
                        if (result.rows.some((row: User) => row.username === validInfo.username)) {
                            throw new UsernameAlreadyInUseError('The username is already in use');
                        } else if (result.rows.some((row: User) => row.email === validInfo.email)) {
                            throw new EmailAlreadyInUseError('The email is already in use');
                        }
                    } else {
                        return validInfo;
                    }
                })
                .catch(err => {
                    return err;
                })
        } else {
            throw new ValidationError('One or more fields are invalid');
        }
    }
}