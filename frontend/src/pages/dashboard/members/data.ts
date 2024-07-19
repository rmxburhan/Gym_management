export interface getMembersResponseData {
    members: Member[];
}

export type Member = {
    name: string;
    email: string;
    dateOfBirth: Date;
    gender: string;
    image: string;
    address: string;
    role: string;
};

export type updateMemberRequest = {
    name?: string;
    email?: string;
    dateOfBirth?: Date;
    gender?: string;
    image?: string;
    address?: string;
};
