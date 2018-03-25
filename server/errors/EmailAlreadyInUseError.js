"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmailAlreadyInUseError extends Error {
    constructor(msg) {
        super(msg);
        this.name = 'EmailAlreadyInUseError';
    }
}
exports.EmailAlreadyInUseError = EmailAlreadyInUseError;
