export interface UserMembership {
    _id: string;
    memberId: string;
    membershipId: string;
    registeredDate: Date;
    expiresDate: Date;
    status: boolean;
}

export interface Membership {
    _id: string;
    name: string;
    description: string;
    duration: number;
    price: number;
    published: boolean;
    discountPrice?: number;
}

export interface getMembershipResponse {
    memberships: Membership[];
}

export interface createMembershipRequest {
    name: string;
    price: number;
    description: string;
    duration: number;
}
