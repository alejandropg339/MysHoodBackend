import { Document } from 'mongoose';

export interface UserInterface {
    names: string;
    lastNames: string;
    phone: number;
    email: string;
    address: UserAdressInterface[],
    password: string;
}

export interface UserCreateRequestInterface extends Document {
    names: string;
    lastNames: string;
    phone: number;
    email: string;
    address: UserAdressInterface[],
    password: string;
    comparePassword: (password: string) => Promise<boolean>}

interface UserAdressInterface {
    completeAddress: string;
    housingType: string;
    additionalInfo: string;
}

export interface UserCreateResponseInterface {
    state: number;
    message: string;
    data: UserInterface;
}

