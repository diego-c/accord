"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
require('dotenv').config({ path: path.resolve(process.cwd(), '../.env') });
const express_1 = __importDefault(require("express"));
const signup_1 = require("./routes/signup");
const cors_1 = require("./middleware/cors");
const login_1 = require("./routes/login");
const app = express_1.default();
const port = process.env.PORT || 3000;
app.use('/api/signup', cors_1.cors, express_1.default.json(), signup_1.signUpRouter);
app.use('/api/login', cors_1.cors, express_1.default.json(), login_1.loginRouter);
app.listen(port, () => console.log('listening on port ' + port + '...'));
