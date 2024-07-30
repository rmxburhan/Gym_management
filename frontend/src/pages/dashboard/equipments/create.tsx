import { useEffect, useState } from 'react';
import useHide from '@/context/SideBarState';
import { useParams } from 'react-router';
import { api } from '@/network/api';
import { getEquipmentResponse } from './data';
import EquipmentForm from './form';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns-logs';
import { Button } from '@/components/ui/button';
import Addlog from './add-log';

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
        <div className="px-4 text-xs">
            <h1 className="text-2xl font-semibold mb-4">
                {id ? 'Equipment detail' : 'Add equipment'}
            </h1>
            <div className="flex flex-row gap-4">
                <div className="max-w-[600px] w-full">
                    <EquipmentForm equipment={equipment?.data || null} />
                </div>
                <div className="w-full">
                    <div className="px-4 py-6 bg-white rounded-xl border w-full flex-col flex">
                        <div className="flex flex-row">
                            <h2 className="text-lg font-semibold">
                                Equipment log
                            </h2>
                            <Button
                                className="ms-auto mb-2"
                                onClick={() => {
                                    setAddLogVisibility(true);
                                }}
                            >
                                Add log
                            </Button>
                        </div>
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
