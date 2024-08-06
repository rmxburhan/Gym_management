import { useEffect, useState } from 'react';
import useHide from '@/context/SideBarState';
import { useParams } from 'react-router';
import { api } from '@/network/api';
import { getEquipmentResponse } from './data';
import EquipmentForm from './form';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns-logs';
import Addlog from './add-log';
import { Logs, PlusIcon } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

const CreateEquipment = () => {
    const { id } = useParams();
    const { setActiveSideBar } = useHide();
    const [equipment, setEquipment] = useState<getEquipmentResponse | null>(
        null
    );
    const [modalAddLogVisibility, setAddLogVisibility] =
        useState<boolean>(false);
    const getEquipment = () => {
        api.get('equipments/' + id, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    const data: getEquipmentResponse = response.data;
                    setEquipment(data);
                } else {
                }
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => setActiveSideBar('/dashboard/equipments'), []);
    useEffect(() => {
        getEquipment();
    }, [id]);
    return (
        <div className="px-4 pt-4">
            <h1 className="text-2xl font-semibold mb-4">
                {id ? 'Equipment detail' : 'Add equipment'}
            </h1>
            <div className="flex flex-row gap-4">
                <div className="max-w-[600px] w-full">
                    <EquipmentForm equipment={equipment?.data || null} />
                </div>
                <div className="w-full">
                    <div className="flex flex-row">
                        <div className="flex flex-row bg-white rounded-md border mb-2 divide-x overflow-hidden">
                            <button className="p-2 text-sm font-semibold flex flex-row gap-2 items-center">
                                <Logs size={18} />
                                Equipments log
                            </button>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button
                                            className="bg-slate-900 p-2 text-sm font-semibold gap-2 flex flex-row text-white items-center"
                                            onClick={() =>
                                                setAddLogVisibility(true)
                                            }
                                        >
                                            <PlusIcon size={18} />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Add equipment log</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg">
                        <DataTable
                            columns={columns}
                            data={equipment?.data.log || []}
                        />
                    </div>
                </div>
            </div>
            <Addlog
                visible={modalAddLogVisibility}
                onClose={() => {
                    setAddLogVisibility(false);
                    getEquipment();
                }}
                id={equipment?.data._id || ''}
            />
        </div>
    );
};

export default CreateEquipment;
