"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
function validateLogin(user) {
    if (validateUser(user)) {
        return {
            username: validateUsername(user.username),
            email: validateEmail(user.email),
            password: validatePassword(user.password)
        };
    }
    return false;
}
exports.validateLogin = validateLogin;
function validateUser(user) {
    return Boolean((user.username || user.email) && user.password);
}
function validateUsername(username) {
    return Boolean((username.trim()) && (username.length <= 20));
}
function validateEmail(email) {
    return Boolean((/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) && (email.length <= 254));
}
function validatePassword(password) {
    return Boolean(password.trim() && (password.length >= 6) && (password.length <= 100));
}
