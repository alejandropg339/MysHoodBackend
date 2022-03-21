import pkg from 'mongoose';
import bcrypt from "bcrypt";
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

UserSchema.pre<UserCreateRequestInterface>("save", async function (next) {
    const user = this;

    if (!user.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;

    next();
});

UserSchema.methods.comparePassword = async function (
    password: string
): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};


export default model<UserCreateRequestInterface>('User', UserSchema);