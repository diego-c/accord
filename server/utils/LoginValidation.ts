import { connect } from '../db/connect';
import { Login, User } from '../db/schema';
import { QueryResult } from 'pg';
import { hashPassword } from './HashPassword';

export function checkUser(user: Login): User | null {
    const query: string = 'SELECT * FROM users WHERE username=$1;';
    let foundUser: User | null = null;

    connect(query, [user.username])
        .then((result: QueryResult) => {
            if (result.rowCount) {
                foundUser = (result.rows[0] as User);
                const validSalt: string = foundUser.salt;
                const validHash: string = foundUser.hash;

                if (hashPassword(user.password, validSalt).hash === validHash) {
                    console.log('Valid user, authenticated as ' + foundUser.username + '...');
                } else {
                    console.log('Invalid password, not authenticated!');
                }
            } else {
                console.log('User not found!')
            }
        })
        .catch((err: Error) => {
            console.error('Oops, something went wrong \n' + JSON.stringify(err, null, 2));
        })

    return foundUser;
}
