import { Trainer } from '../trainers/data';

export interface getClassesResponse {
    classes: classData[];
}

export interface classData {
    _id: string;
    name: string;
    description: string;
    date: Date;
    maxParticipant: number;
    trainerDetails: Trainer[];
    createdAt: string;
    updatedAt: string;
}
