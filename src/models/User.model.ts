import pkg from 'mongoose';
import { UserCreateRequestInterface } from '../interfaces/models/user.interface';
const { Schema, model } = pkg;

const UserSchema = new Schema<UserCreateRequestInterface>({
    names: { type: String, required: true },
    lastNames: { type: String, required: true },
    phone: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true, sparse: true },
    address: {
        type: [{
            completeAddress: { type: String, required: true },
            housingType: { type: String, required: true },
            additionalInfo: { type: String }
        }], required: true, validate: (v: string | any[]) => Array.isArray(v) && v.length > 0
    },
    password: { type: String, required: true }
},
    {
        versionKey: false,
        timestamps: true
    });

export default model('User', UserSchema);