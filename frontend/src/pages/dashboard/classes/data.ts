import useDelete from '@/hooks/useDelete';
import usePost from '@/hooks/usePost';

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

export interface getClassesResponse {
    message: string;
    data: Class[];
}

export interface postClassPayload {
    name: string;
    description: string;
    date: string;
    maxParticipant: number;
    trainer: string;
}
