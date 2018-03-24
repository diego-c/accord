"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserNotFoundError extends Error {
    constructor(msg) {
        super(msg);
        this.name = 'UserNotFoundError';
    }
}
exports.UserNotFoundError = UserNotFoundError;
