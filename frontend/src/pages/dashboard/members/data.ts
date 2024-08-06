import { addressSchema } from '../trainers/data';

export type Member = {
    _id: string;
    name: string;
    email: string;
    profile: string;
    role: string;
    memberDetail?: {
        gender: string;
        birthDate: string;
        phoneNumber: string;
        address: [
            {
                street: string;
                city: string;
                zip: string;
                state: string;
            }
        ];
        membership?: {
            _id: string;
            registerDate: string;
            expiresDate: string;
            membership: string;
            status: boolean;
        };
    };
    createdAt: string;
};

export interface getMembersResponseData {
    message: string;
    data: Member[];
}

export interface getMemberResponseData {
    message: string;
    data: Member;
}

export type updateMemberRequest = {
    name?: string;
    email?: string;
    dateOfBirth?: Date;
    gender?: string;
    image?: string;
    address?: string;
};

export type createMemberRequest = {
    name: string;
    email: string;
    password: string;
    birthDate: string;
    gender: 'male' | 'female';
    profile?: FileList | null;
    phoneNumber: string;
    addresses: [addressSchema];
};
