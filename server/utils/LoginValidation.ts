import { connect } from '../db/connect';
import { Login, User } from '../db/schema';
import { QueryResult } from 'pg';
import { hashPassword } from './HashPassword';
import { UserNotFoundError } from '../errors/UserNotFoundError';
import { ValidationError } from '../errors/ValidationError';

export async function checkUser(user: Login) {
    const query: string = 'SELECT * FROM users WHERE username=$1;';
    let foundUser: User | null = null;

    return await connect(query, [user.username])
        .then((result: QueryResult) => {
            if (result.rowCount) {
                foundUser = (result.rows[0] as User);
                const validSalt: string = foundUser.salt;
                const validHash: string = foundUser.hash;

                if (hashPassword(user.password, validSalt).hash === validHash) {
                    return foundUser;
                } else {
                    throw new ValidationError('Invalid password');
                }
            } else {
                throw new UserNotFoundError('User not found!')
            }
        })
        .catch((err: Error) => {
            return err;
        })

    // return foundUser;
}
