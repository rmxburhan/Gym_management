export interface getCodeResponse {
    message: string;
    code: string;
}

export interface getAttendances {
    message: string;
    data: [
        {
            _id: string;
            userId: {
                _id: string;
                name: string;
                profile: string;
                email: string;
            };
            checkInTime: string;
            checkOutTime: string;
        }
    ];
}

export interface getCountsAttendance {
    message: string;
    data: {
        todayCheckIn: number;
        notCheckOut: number;
    };
}

export interface getStats {
    message: string;
    data: [
        {
            date: string;
            count: number;
        }
    ];
}
