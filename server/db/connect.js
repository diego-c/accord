"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB,
    port: typeof process.env.DB_PORT === 'number' ? process.env.DB_PORT : 6000
});
exports.connect = (query, vals) => __awaiter(this, void 0, void 0, function* () {
    yield pool.connect();
    let res;
    try {
        res = yield pool.query(query, vals);
        return res;
    }
    catch (err) {
        throw new Error('Sorry, could not connect to the db server \n' + err);
    }
});
