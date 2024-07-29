export interface Trainer {
    _id: string;
    name: string;
    email: string;
    password: string;
    profile: string;
    role: string;
}

export interface getTrainersResponse {
    message: string;
    data: Trainer[];
}
