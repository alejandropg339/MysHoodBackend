"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const verifyToken = (req, res, next) => {
    const commonError = {
        state: 0,
        message: 'Unauthorized'
    };
    if (!req.headers.authorization) {
        commonError.errorData = 'Missing authorization header';
        return res.status(401).json(commonError);
    }
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        commonError.errorData = 'Wrong token';
        return res.status(401).json(commonError);
    }
    try {
        const decodedJson = jsonwebtoken_1.default.verify(token, config_1.config.secret);
        req.userId = decodedJson.id;
        next();
    }
    catch (error) {
        commonError.errorData = error.message;
        return res.status(401).json(commonError);
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=authJWT.js.map