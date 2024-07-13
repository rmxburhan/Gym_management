import { Monitor } from 'lucide-react';
import { Card } from '../../components/Card';

function Dashboard() {
    return (
        <>
            <h1 className="font-bold text-2xl mb-4">Dashboard</h1>
            <div className="grid grid-cols-4 grid-rows-1 w-full gap-4">
                <Card
                    title="asd"
                    description="asd"
                    Icon={Monitor}
                    active={false}
                    alert={false}
                    key={1}
                ></Card>
                <Card
                    title="asd"
                    description="asd"
                    Icon={Monitor}
                    active={false}
                    alert={false}
                    key={1}
                ></Card>
                <Card
                    title="asd"
                    description="asd"
                    Icon={Monitor}
                    active={false}
                    alert={false}
                    key={1}
                ></Card>
                <Card
                    title="asd"
                    description="asd"
                    Icon={Monitor}
                    active={false}
                    alert={false}
                    key={1}
                ></Card>
            </div>
        </>
    );
}

export default Dashboard;
