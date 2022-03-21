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
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const { Schema, model } = mongoose_1.default;
const UserSchema = new Schema({
    names: { type: String, required: true },
    lastNames: { type: String, required: true },
    phone: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true, sparse: true },
    address: {
        type: [{
                completeAddress: { type: String, required: true },
                housingType: { type: String, required: true },
                additionalInfo: { type: String }
            }], required: true, validate: (v) => Array.isArray(v) && v.length > 0
    },
    password: { type: String, required: true }
}, {
    versionKey: false,
    timestamps: true
});
// Method to encrypt password
// UserSchema.statics.encryptPassword = async (password: string) => {
//     // genero salt ejecutando 10 veces algoritmo, es aceptable para no consumir muchos recursos de servidor
//     const salt = await bcrypt.genSalt(10);
//     return await bcrypt.hash(password, salt);
// };
// Static method to verify compare the passwords
// UserSchema.statics.comparePassword = async (
//     receivedPassword: string,
//     actualPassword: string
// ) => {
//     return await bcrypt.compare(receivedPassword, actualPassword);
// };
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (!user.isModified("password"))
            return next();
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(user.password, salt);
        user.password = hash;
        next();
    });
});
UserSchema.methods.comparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(password, this.password);
    });
};
exports.default = model('User', UserSchema);
//# sourceMappingURL=User.model.js.map