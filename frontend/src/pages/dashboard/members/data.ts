import { UserMembership } from '../membership/data';

export interface getMembersResponseData {
    members: Member[];
}

export type Member = {
    _id: string;
    name: string;
    email: string;
    dateOfBirth: Date;
    gender: string;
    image: string;
    address: string;
    role: string;
    membershipDetail: UserMembership[];
};

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
    dateOfBirth: string;
    gender: string;
    image?: string;
    address: string;
};
