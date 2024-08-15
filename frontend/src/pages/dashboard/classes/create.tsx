import useHide from '@/context/SideBarState';
import { FC, useEffect, useState } from 'react';
import ClassForm from './form';
import { useParams } from 'react-router';
import { Class, getClassResponse } from './data';
import { api } from '@/network/api';
import { User2, UserPlus2, UsersRound, UsersRoundIcon } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';

const CreateClass: FC = () => {
    const { id } = useParams();
    const { setActiveSideBar } = useHide();
    const [classData, setClassData] = useState<Class | null>(null);

    const getClass = () => {
        api.get('classes/' + id)
            .then((response) => {
                if (response.status === 200) {
                    const data: getClassResponse = response.data;
                    setClassData(data.data);
                } else {
                }
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => setActiveSideBar('/dashboard/classes'), []);
    useEffect(() => {
        getClass();
    }, [id]);
    return (
        <div className="px-4 pt-4">
            <h2 className="text-2xl font-semibold mb-4">
                {id ? 'Class detail' : 'Add class'}
            </h2>
            <div className="flex flex-row gap-4">
                <ClassForm classData={classData} />
                <div className="flex flex-col flex-1 gap-2">
                    <div className="flex">
                        <div className="flex flex-row bg-white border rounded-md divide-x">
                            <button className="p-2 font-semibold text-sm flex flex-row items-center gap-2">
                                <UsersRoundIcon size={18} />
                                Participants data
                            </button>
                        </div>
                    </div>
                    <div className="p-4 flex flex-col bg-white rounded border">
                        <div className="flex flex-row"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateClass;
