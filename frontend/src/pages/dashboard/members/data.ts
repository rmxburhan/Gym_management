export interface getMembersResponseData {
    message: string;
    data: Member[];
}

export type Member = {
    _id: string;
    name: string;
    email: string;
    profile: string;
    role: string;
    memberDetail?: {
        gender: string;
        birthDate: string;
        address: {
            street: string;
            city: string;
            zip: string;
            state: string;
        };
        membership?: {
            _id: string;
            registerDate: string;
            expiresDate: string;
            membership: string;
            status: boolean;
        };
    };
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
