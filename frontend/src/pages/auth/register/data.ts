export enum genderType {
    male,
    female,
}

export interface registerPayload {
    name: string;
    email: string;
    password: string;
    address: string;
    gender: genderType;
    dateOfBirth: string;
}
