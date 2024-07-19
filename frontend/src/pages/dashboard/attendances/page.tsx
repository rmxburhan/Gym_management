import { Code } from 'lucide-react';
import { Card } from '../../../components/Card';
import Name from '../../../components/Name';
import useGet from '@/hooks/useGet';
import { getAttendances, getCodeResponse } from './data';

const AttendancesPage = () => {
    const { data: code } = useGet<getCodeResponse>('attendances/code');
    const { data: attendances } = useGet<getAttendances>(
        'attendances?today=true'
    );

    return (
        <div>
            <h2 className="text-black font-bold text-4xl mb-8 col-span-4">
                Attendances
            </h2>
            <div className="grid grid-rows-1 grid-cols-4 gap-6 mb-6">
                <Card
                    title="Attendance code"
                    description="Senin, 22 Januari 2022"
                    active={false}
                    alert={false}
                    Icon={Code}
                >
                    <p className="text-black font-bold text-2xl">
                        {code?.code.code}
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
                        {attendances?.todayCheckIn || 0}
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
                        {attendances?.todayUnCheckOut || 0}
                    </p>
                </Card>
                <div></div>
            </div>
            <div className="grid grid-rows-1 grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg border">
                    <h3 className="text-2xl font-semibold text-black mb-4">
                        List member
                    </h3>
                    <table className="table-auto w-full overflow-x-auto">
                        <thead className="bg-indigo-100 text-black">
                            <tr>
                                <th>No.</th>
                                <th>Name</th>
                                <th>Check In Time</th>
                                <th>Check Out Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendances?.attendances.map((x, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}.</td>
                                        <td>
                                            <Name
                                                name={
                                                    x.memberDetail
                                                        ? x.memberDetail[0].name
                                                        : ''
                                                }
                                                imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQae9FkVDq-pht9_nec324ZbRxcuV7juKPPvA&s"
                                            />
                                        </td>
                                        <td>
                                            {new Date(
                                                x.checkInTime
                                            ).toLocaleTimeString()}
                                        </td>
                                        <td>
                                            {x.checkOutTime
                                                ? new Date(
                                                      x.checkOutTime
                                                  ).toLocaleTimeString()
                                                : ''}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="h-[400px] bg-white p-8 rounded border">
                    <h1 className="text-2xl text-black font-semibold">
                        Gym Traffic (last 7 days)
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default AttendancesPage;
