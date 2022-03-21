"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
const User_model_1 = __importDefault(require("../../models/User.model"));
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { email, password } = body;
    const userFound = yield User_model_1.default.findOne({ email });
    if (!userFound) {
        return res.status(404).json({ message: 'User or password wrong' });
    }
    const matchPassword = yield userFound.comparePassword(password);
    if (!matchPassword) {
        return res.status(404).json({ message: 'User or password wrong' });
    }
    const token = jsonwebtoken_1.default.sign({ id: userFound._id }, config_1.config.secret, {
        expiresIn: 86400
    });
    const refreshThisToken = jsonwebtoken_1.default.sign({ id: userFound._id }, config_1.config.secretRrefersh, { expiresIn: 3.154e10 });
    const user = userFound._id;
    const name = userFound.names;
    return res.status(200).json({ token, user, email, name, refreshThisToken });
});
exports.signIn = signIn;
//# sourceMappingURL=auth.controller.js.map