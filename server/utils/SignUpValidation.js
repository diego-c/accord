"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validateSignUp(user) {
    if (validateUser(user)) {
        return {
            username: validateUsername(user.username),
            password: validatePassword(user.password),
            email: validateEmail(user.email),
            birthdate: validateBirthdate(user.birthdate)
        };
    }
    return false;
}
exports.validateSignUp = validateSignUp;
function validateUser(user) {
    return Boolean(user.username && user.password && user.email && user.birthdate);
}
function validateUsername(username) {
    return Boolean(username.trim() && (username.length <= 20));
}
function validatePassword(password) {
    return Boolean(password.trim() && (password.length >= 6) && (password.length <= 100));
}
function validateBirthdate(birthdate) {
    return Boolean(/\d{4}\-\d{2}\-\d{2}/.test(birthdate));
}
function validateEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
