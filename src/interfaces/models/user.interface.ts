export interface UserCreateRequestInterface {
    names: string;
    lastNames: string;
    phone: number;
    email: string;
    address: UserAdressInterface[],
    password: string;
}

interface UserAdressInterface {
    completeAddress: string;
    housingType: string;
    additionalInfo: string;
}

export interface UserCreateResponseInterface {
    state: number;
    message: string;
    data: any;
}