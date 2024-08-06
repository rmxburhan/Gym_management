import { Card } from '@/components/Card';
import useHide from '@/context/SideBarState';
import { BadgeDollarSign } from 'lucide-react';
import { useEffect } from 'react';
function Dashboard() {
    const { setActiveSideBar } = useHide();
    useEffect(() => setActiveSideBar('/dashboard'), []);
    return (
        <div className="px-4 pt-4">
            <h1 className="font-bold text-2xl mb-4">Dashboard</h1>
            <div className="grid-cols-4 grid w-full">
                <Card Icon={BadgeDollarSign} description="asd" title="Asd" />
                <Card Icon={BadgeDollarSign} description="asd" title="Asd" />
                <Card Icon={BadgeDollarSign} description="asd" title="Asd" />
                <Card Icon={BadgeDollarSign} description="asd" title="Asd" />
                <div className="col-span-2 row-span-2">
                    <Card
                        Icon={BadgeDollarSign}
                        description="asd"
                        title="Asd"
                    />
                </div>
                <div className="col-span-2 row-span-2">
                    <Card
                        Icon={BadgeDollarSign}
                        description="asd"
                        title="Asd"
                    />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
