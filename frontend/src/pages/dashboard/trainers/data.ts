export interface Trainer {
    _id: string;
    name: string;
    email: string;
    password: string;
    profile: string;
    role: string;
    createdAt: string;
}

export interface getTrainersResponse {
    message: string;
    data: Trainer[];
}

export interface addressSchema {
    city: string;
    zip: string;
    state: string;
    street: string;
}
export interface createTrainerRequest {
    name: string;
    email: string;
    password: string;
    addresses: [addressSchema];
    bank: string;
    bankNumber: string;
    identificationNumber: string;
    phoneNumber: string;
    profile?: FileList | undefined;
}
