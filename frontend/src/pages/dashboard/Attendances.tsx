import { Code } from 'lucide-react';
import { Card } from '../../components/Card';
import Name from '../../components/Name';
import { Bar, Chart, Line } from 'react-chartjs-2';
import { LineChart } from '@tremor/react';

const Attendances = () => {
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
                    <p className="text-black font-bold text-2xl">20</p>
                </Card>
                <Card
                    title="Member checkIn"
                    description="Senin, 22 Januari 2022"
                    active={false}
                    alert={false}
                    Icon={Code}
                >
                    <p className="text-black font-bold text-2xl">20</p>
                </Card>
                <Card
                    title="Member still not checkout"
                    description="Senin, 22 Januari 2022"
                    active={false}
                    alert={false}
                    Icon={Code}
                >
                    <p className="text-black font-bold text-2xl">20</p>
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
                            <tr>
                                <td>1.</td>
                                <td>
                                    <Name
                                        name="Farhan"
                                        imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQae9FkVDq-pht9_nec324ZbRxcuV7juKPPvA&s"
                                    />
                                </td>
                                <td>08:00</td>
                                <td>09:00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="h-[400px] bg-white p-8 rounded border">
                    <h1 className="text-2xl text-black font-semibold">
                        Gym Traffic
                    </h1>
                    <LineChart
                        className=""
                        data={[
                            {
                                date: 'Aug 22',
                                SolarPanels: 2903,
                                Inverters: 2012,
                            },
                            {
                                date: 'Sep 22',
                                SolarPanels: 2643,
                                Inverters: 2342,
                            },
                            {
                                date: 'Oct 22',
                                SolarPanels: 2837,
                                Inverters: 2473,
                            },
                            {
                                date: 'Nov 22',
                                SolarPanels: 2954,
                                Inverters: 3848,
                            },
                            {
                                date: 'Dec 22',
                                SolarPanels: 3239,
                                Inverters: 3736,
                            },
                        ]}
                        index="date"
                        yAxisWidth={65}
                        categories={['SolarPanels', 'Inverters']}
                        colors={['red', 'blue']}
                    />
                </div>
            </div>
        </div>
    );
};

export default Attendances;
