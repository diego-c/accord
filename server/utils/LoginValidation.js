"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = require("../db/connect");
const HashPassword_1 = require("./HashPassword");
function checkUser(user) {
    const query = 'SELECT * FROM users WHERE username=$1;';
    let foundUser = null;
    connect_1.connect(query, [user.username])
        .then((result) => {
        if (result.rowCount) {
            foundUser = result.rows[0];
            const validSalt = foundUser.salt;
            const validHash = foundUser.hash;
            if (HashPassword_1.hashPassword(user.password, validSalt).hash === validHash) {
                console.log('Valid user, authenticated as ' + foundUser.username + '...');
            }
            else {
                console.log('Invalid password, not authenticated!');
            }
        }
        else {
            console.log('User not found!');
        }
    })
        .catch((err) => {
        console.error('Oops, something went wrong \n' + JSON.stringify(err, null, 2));
    });
    return foundUser;
}
exports.checkUser = checkUser;
