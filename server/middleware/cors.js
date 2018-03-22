"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function cors(_, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:1337');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
exports.cors = cors;
