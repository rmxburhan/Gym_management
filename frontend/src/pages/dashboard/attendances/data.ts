import { Member } from '../members/data';

export interface Attendance {
    _id: string;
    userId: string;
    checkInTime: Date;
    checkOutTime?: Date;
    memberDetail?: Member[];
}

export interface AttendanceCode {
    _id: string;
    code: string;
    createdIn: Date;
    expiresIn: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface getCodeResponse {
    code: AttendanceCode;
}

export interface getAttendances {
    todayCheckIn: number;
    todayUnCheckOut: number;
    attendances: Attendance[];
}
