export interface reportData {
    id: string;
    member: {
        name: string;
        profile: string;
    };
    membership: {
        name: string;
        duration: string;
    };
    paymentType: string;
    totalPayment: number;
    status: string;
    createdAt: string;
}

export interface getReports {
    message: string;
    data: reportData[];
}
