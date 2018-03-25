"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UsernameAlreadyInUseError extends Error {
    constructor(msg) {
        super(msg);
        this.name = 'UsernameAlreadyInUseError';
    }
}
exports.UsernameAlreadyInUseError = UsernameAlreadyInUseError;
