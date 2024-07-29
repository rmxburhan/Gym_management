export interface getClassesResponse {
    message: string;
    data: Class[];
}

export interface Class {
    _id: string;
    name: string;
    description: string;
    date: string;
    maxParticipant: number;
    trainer: {
        _id: string;
        name: string;
        profile: string;
    };
    participants: [];
    createdAt: string;
    updatedAt: string;
}
