import { Code } from 'lucide-react';
import { Card } from '../../../components/Card';
import useGet from '@/hooks/useGet';
import {
    getAttendances,
    getCodeResponse,
    getCountsAttendance,
    getStats,
} from './data';
import UserList from '@/components/UserList';
import dayjs from 'dayjs';

const AttendancesPage = () => {
    const { data: code } = useGet<getCodeResponse>('attendances/code');
    const {
        data: attendances,
        error: errorAttendances,
        isLoading: isLoadingAttendances,
    } = useGet<getAttendances>('attendances?today=true');
    const {
        data: traffic,
        error: errorStats,
        isLoading: isLoadingStats,
    } = useGet<getStats>(
        `attendances/stats?startDate=${dayjs()
            .add(-6, 'day')
            .toDate()
            .toString()}&endDate=${new Date().toString()}`
    );
    const { data: count } = useGet<getCountsAttendance>('attendances/count');
    return (
        <div>
            <h2 className="text-black font-bold text-4xl mb-8 col-span-4">
                Attendances
            </h2>
            <div className="grid max-md:grid-cols-1 max-lg:grid-cols-2 max-xl:grid-cols-3 grid-cols-4 gap-4 max-xl:mb-0 md:mb-4 lg:mb-0 xl:mb-4 ">
                {/* <div className="flex flex-row"> */}
                <Card
                    title="Attendance code"
                    description="Senin, 22 Januari 2022"
                    active={false}
                    alert={false}
                    Icon={Code}
                >
                    <p className="text-black font-bold text-2xl">
                        {code?.code}
                    </p>
                </Card>
                <Card
                    title="Member checkIn"
                    description="Senin, 22 Januari 2022"
                    active={false}
                    alert={false}
                    Icon={Code}
                >
                    <p className="text-black font-bold text-2xl">
                        {count?.data.todayCheckIn || 0}
                    </p>
                </Card>
                <Card
                    title="Member still not checkout"
                    description="Senin, 22 Januari 2022"
                    active={false}
                    alert={false}
                    Icon={Code}
                >
                    <p className="text-black font-bold text-2xl">
                        {count?.data.notCheckOut || 0}
                    </p>
                </Card>
                <div></div>
            </div>
            <div className="grid lg:grid-cols-2 gap-4 max-h-[400px] h-[400px]">
                <div className="bg-white p-6 rounded-xl border ">
                    <h3 className="text-xl font-semibold text-black mb-4">
                        Member attendances
                    </h3>
                    {!isLoadingAttendances &&
                        attendances?.data.map((x) => {
                            return (
                                <UserList
                                    key={x._id}
                                    name={x.userId.name}
                                    id={x.userId._id}
                                    profile={x.userId.profile}
                                    memberId={x.userId.email}
                                    checkInTime={x.checkInTime}
                                    checkOutTime={x.checkOutTime}
                                />
                            );
                        })}
                    {isLoadingAttendances && (
                        <p className="w-full h-full text-center my-auto">
                            Loading...
                        </p>
                    )}
                    {errorAttendances && (
                        <p className="mx-auto text-white text-xs px-2 py-1 bg-red-500">
                            {errorAttendances}
                        </p>
                    )}
                </div>
                <div className="bg-white p-6 rounded-xl border">
                    <h1 className="text-xl text-black font-semibold">
                        Gym Traffic this week
                        {isLoadingStats && (
                            <p className="mx-auto">Loading...</p>
                        )}
                        {errorStats && (
                            <p className="mx-auto text-white text-xs px-2 py-1 bg-red-500">
                                {errorStats}
                            </p>
                        )}
                        {JSON.stringify(traffic)}
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default AttendancesPage;
