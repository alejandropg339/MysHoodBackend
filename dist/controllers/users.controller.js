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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.personalData = exports.createUser = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { names, lastNames, phone, email, password, address } = body;
    const userRequest = new User_model_1.default({ names, lastNames, phone, email, password, address });
    try {
        const newUser = yield userRequest.save();
        if (newUser) {
            const succesResponse = {
                state: 1,
                message: 'User created successfully',
                data: newUser
            };
            return res.status(201).json(succesResponse);
        }
        const errorResponse = {
            state: 0,
            message: "Error while creating the new user",
        };
        return res.status(500).json(errorResponse);
    }
    catch (error) {
        const errorResponse = {
            state: 0,
            message: "Error while creating the new user",
            errorData: error.message
        };
        return res.status(501).json(errorResponse);
    }
});
exports.createUser = createUser;
const personalData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const infoUser = yield User_model_1.default.findOne({ _id: id }).lean();
        const errorReponse = {
            state: 0,
            message: 'User not found!'
        };
        if (!infoUser) {
            return res.status(404).json(errorReponse);
        }
        const { password } = infoUser, personalInfo = __rest(infoUser, ["password"]);
        res.status(200).json(personalInfo);
    }
    catch (error) {
        const errorReponse = {
            state: 0,
            message: 'Somethig goes wrong!',
            errorData: error.message
        };
        return res.status(500).json(errorReponse);
    }
});
exports.personalData = personalData;
//# sourceMappingURL=users.controller.js.map