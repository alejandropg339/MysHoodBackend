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
exports.createUser = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { names, lastNames, phone, email, password, address } = body;
    const userRequest = new User_model_1.default({ names, lastNames, phone, email, password, address });
    try {
        const newUser = yield userRequest.save();
        console.log(newUser);
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
//# sourceMappingURL=users.controller.js.map