"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
// import { connect } from '../db/connect';
// import { User, Login } from '../db/schema';
const router = express.Router();
exports.router = router;
router
    .post('/signup', (req, res) => {
    const user = req.body;
    console.log('New User: \n' + JSON.stringify(user, null, 2));
    res.json(user);
});
