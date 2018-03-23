import crypto from 'crypto';

export interface Hashed {
    hash: string,
    salt: string
}

function generateSalt(len: number): string {
    let salt: Buffer;

    try {
        salt = crypto.randomBytes(len);
        return salt.toString('hex');
    } catch (err) {
        throw new Error('Error while attempting to generate salt: \n' + err);
    }
}

export function hashPassword(password: string): Hashed {
    let hashed: Hashed,
        salt = generateSalt(typeof process.env.SALTLEN === 'number' ? process.env.SALTLEN : 50),
        hash: Buffer;

    try {

        hash = crypto.pbkdf2Sync(password, salt, typeof process.env.ITERATIONS === 'number' ? process.env.ITERATIONS : 10000, typeof process.env.KEYLEN === 'number' ? process.env.KEYLEN : 256, 'sha512');

        hashed = {
            hash: hash.toString('hex'),
            salt
        }

        return hashed;

    } catch (err) {
        throw new Error('Error while attempting to hash password: \n' + err);
    }
}