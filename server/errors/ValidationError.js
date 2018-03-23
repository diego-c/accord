"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationError extends Error {
    constructor(msg) {
        super(msg);
        this.name = 'ValidationError';
    }
}
exports.ValidationError = ValidationError;
