"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
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
exports.default = model('User', UserSchema);
//# sourceMappingURL=User.model.js.map