export interface Class {
    id: string;
    name: string;
    description: string;
    date: string;
    maxParticipant: number;
    trainer: {
        id: string;
        name: string;
        profile: string;
    };
    participants: [];
    createdAt: string;
    updatedAt: string;
}

export interface getClassesResponse {
    message: string;
    data: Class[];
}
export interface getClassResponse {
    message: string;
    data: Class;
}

export interface postClassPayload {
    name: string;
    description: string;
    date: string;
    maxParticipant: number;
    trainer: string;
}
