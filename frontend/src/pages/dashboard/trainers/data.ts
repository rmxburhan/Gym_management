export interface Trainer {
    _id: string;
    name: string;
    email: string;
    password: string;
    profile?: string;
    trainerDetail: {
        identificationNumber: string;
        phoneNumber: string;
        bank: string;
        bankNumber: string;
        address: [addressSchema];
    };
    role: string;
    createdAt: string;
}

export interface addressSchema {
    city: string;
    zip: string;
    state: string;
    street: string;
}

export interface getTrainersResponse {
    message: string;
    data: Trainer[];
}
export interface getTrainerResponse {
    message: string;
    data: Trainer;
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
